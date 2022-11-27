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
//form.html에서 submit을 하면 /email_post로 body에 정보가 담겨서 옴. 
router.post('/form', function(req, res){
  var email = req.body.email;       //form의 name=""의 값
  // res.send("<h1>welcome!! " + email);              //변수 값을 화면에 띄움. 모든 html의 요소들을 이렇게 send에 직접 쳐서 보낼 수 없음. 이를 해결하기 위해 ejs 사용
  res.render('email.ejs', {email : email});     //email.ejs에 email이라는 변수에 값 담아서 전송 <%= %> 안에 있는 변수의 이름과 같아야 함. 
})

//from.html에서 ajax로 json 데이터를 보냄.
router.post('/ajax', function(req, res){
  var email = req.body.email;       //전송받은 json의 key를 써줘야 함. 
  // var responseData = {'result' : 'ok', 'email' : email};      //json 데이터를 만들고
  var responseData = {};

  var query = connection.query("select name from user where email='" + email + "';", function(err, rows){
    if(err) return err;
    else{
      if(rows[0]){
        responseData.result = "ok";
        responseData.name = rows[0].name;
        console.log(responseData);
      }
      else{
        responseData.result = "none";
        responseData.name = "";
        console.log(responseData);
      }
    }
    res.json(responseData);   //json으로 변환하여 response함. 
  })                                 
})

module.exports = router;    //다른 파일에서 router를 통하여 main.js를 사용할 수 있도록 export 함. 