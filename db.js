//몽고DB 모듈로드
const MongoClinet = require('mongodb').MongoClient;

exports.getDB = class Database
{
    constructor()
    {
        this.databaseURL = "mongodb://localhost:27017/local";
        this.database = null;
    }

    connectDB()
    {
        MongoClinet.connect(this.databaseURL, (err, db)=>{
            if(err) throw err;
    
            console.log("SUCCESS DB CONNECT " + this.databaseURL);
            //3.0이상부터 db이름 명시
            this.database = db.db('local');
        });
    }

    
    
}