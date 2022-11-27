var express = require('express');   //node_modules에 있는 express에 관련된 함수 모듈을 가져옴(객체는 아님. 반환값 함수)
var app = express();    
var router = express.Router();      //라우터
var path = require('path');         //상대경로로 편리하게 이동할 수 있는 객체
var mysql = require('mysql');

/* 데이터베이스 세팅 */
var connection = mysql.createConnection({     //mysql connection 생성 
  host : 'localhost',
  port : 3306,
  user : 'root',
  password : 'kksshh1735',
  database : 'node_prac'        //데이터베이스 이름
});
connection.connect();       //mysql 연동

/* 라우터 */
router.get('/', function(req, res){    //url에 /form으로 요청 들어오면
  res.sendFile(path.join(__dirname, "../public/join.html"));    
})

router.post('/', function(req, res){
  var body = req.body;
  var email = body.email;
  var name = body.name;
  var password = body.password;

  var sql = {email : email, name : name, pw : password};
  var query = connection.query("insert into user set ?" , sql, function(err, rows){
    if(err) throw err;
    else{
      res.render('welcome.ejs', {'name' : name, 'id' : rows.insertId});
    }
    
  })
})

module.exports = router;    //다른 파일에서 router를 통하여 main.js를 사용할 수 있도록 export 함. 