const express = require("express");
const app = express();
const port = 3000;
//xlsx 모듈로드
const xlsx = require("xlsx");
//db 파일로드
const database = require("./db");
// 미들웨어
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
//json 파싱
app.use(bodyParser.json());
// 정적데이터 제공
app.use("/", express.static("./public"));
app.use("/node_modules", express.static("./node_modules"));
app.use("/public/imgs", express.static("./public/imgs"));

let dbInstance = null;

app.listen(port, ()=>{
    
    dbInstance = new database.getDB();
    dbInstance.connectDB();

});

//서버 처음 가동시에만 실행할것을 권장함
function readExcelFile(Filename)
{
    const excelData = xlsx.readFile(Filename);

    for(let i=0;i<excelData.SheetNames.length;i++)
    {
        // 맨 처음 시트이름과 시트의 데이터를 추출함
        let sheetName = excelData.SheetNames[i];

        let sheetDatas = excelData.Sheets[sheetName];

        // 컬렉션 이름이 곧 sheet이름 (테이블) 이었으나 (sheetName) 한글때문에 수정
        let cursor = dbInstance.database.collection("players");
        
        let row = 2;
        let playerObj = {};
        // 시트 A필드에 값 없을 경우 자동 종료
        while(sheetDatas['A' + row] !== undefined)
        {
            for(let j=65;j<89;j++)
            {
                let column = String.fromCharCode(j); // 알파벳 추출
                let columnName = sheetDatas[column + 1]; // 맨 처음 컬럼 네임 추출
                let playerColumn = sheetDatas[column + row];

                // 플레이어의 컬럼이 없을 경우 다음 컬럼으로 이동, 있다면 해당 속성이름에 값을 넣음
                if(playerColumn === undefined) continue;
                playerObj[columnName.v] = playerColumn.v;
            }
            // DB INSERT
            cursor.insertOne(playerObj);
            playerObj = {};
            row ++;
        }
    }

}

// 파일 읽는부분
app.get("/com2usfileinit", (req, res)=>{

    let filename = "./컴프매_선수 데이터_1910.xlsx";
    readExcelFile(filename);
    res.send('complete');

});


// 검색 RESTAPI
app.get("/search/:type", (req, res)=>{

    let typeName = req.params.type;
    let searchType = req.query.key;
    let searchValue = req.query.value;

    let cursor = dbInstance.database.collection(typeName);

    let jsonObj = new Object();
    jsonObj.data = new Array();
    jsonObj.cnt = 0;

    console.log(searchType + " : " + searchValue);

    let key;
    switch(searchType.toLowerCase())
    {
        case "team" :
            key = "팀";
            break;
        case "name" :
            key = "이름";
            break;
        case "years" :
            key = "연도"; 
            break;
        case "grade" :
            key = "선수등급"; 
            break;
        default : 
            key = "팀";
            break;
    }

    cursor.find({[key] : searchValue}).each((err, value)=>{
        
        if(err) throw err;

        if(value !== null) 
        {
            jsonObj.data.push(value);
            jsonObj.cnt ++;
        }else res.send(jsonObj); 
    });


});