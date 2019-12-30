const express = require("express");
const app = express();
const port = 3000;
//xlsx 모듈로드
const xlsx = require("xlsx");
//db 파일로드
const database = require("./db");
const server = require("mongodb").server;
// 미들웨어
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
//json 파싱
app.use(bodyParser.json());

let dbInstance = null;

app.listen(port, ()=>{
    
    dbInstance = new database.getDB();
    dbInstance.connectDB();

});

app.get("/", (req, res)=>{

    const dbData = dbInstance.database;
    let   cursor = dbData.collection('users').find();
    
    let dataArr = [];
    cursor.each((error, data) => {
        console.log("----------------DataREAD--------------------------");
        if(error) console.log(error);
        else console.log(data);
        console.log("----------------DataREAD--------------------------");

    });
    res.send(dataArr);

});


// 파일 읽는부분
app.get("/init", (req, res)=>{

    let filename = "./컴프매_선수 데이터_1910.xlsx"
    const excelData = xlsx.readFile(filename);
    // 타자
    let BatterName = excelData.SheetNames[0];
    let BatterData = excelData.Sheets[BatterName];

    // 투수
    let pitcherSheetName = excelData.SheetNames[1];
    let pitcherData = excelData.Sheets[pitcherSheetName];

    let row = 2;
    let playerObj = {};
    while(BatterData['A' + row] !== undefined)
    {
        for(i=65;i<89;i++)
        {
            let column = String.fromCharCode(i);
            let columnName = BatterData[column + 1];
            let playerColumn = BatterData[column + row];

            if(playerColumn === undefined) continue;
            playerObj[columnName.v] = playerColumn.v;
        }
        console.log(playerObj);
        playerObj = {};
        row++;
    }



});