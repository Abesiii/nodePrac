var express = require('express');   //node_modules에 있는 express에 관련된 함수 모듈을 가져옴(객체는 아님. 반환값 함수)
var app = express();        
var bodyParser = require('body-parser');        
var mysql = require('mysql');

var connection = mysql.createConnection({     //mysql connection 생성 
  host : 'localhost',
  port : 3306,
  user : 'root',
  password : 'kksshh1735',
  database : 'node_prac'        //데이터베이스 이름
});
connection.connect();       //mysql 연동


app.listen(3000, function(){             //콜백함수는 비동기. 서버 켜질때까지 기다렸다가 실행되는 것 아니고, 다음 코드 먼저 실행되고 그 다음에 콜백함수 실행됨. 
  console.log("3000포트로 서버 시작");    //node의 디폴트 포트는 3000
})

app.use(express.static('public'));       //static 디렉토리 저장
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));    //인코딩된 url
app.set('view engine', 'ejs');           //ejs view engine 
//view engine은 서버에서 넘겨준 값을 html에 삽입하여 화면에 출력할 수 있게 해주는 엔진으로, 정적인 html을 동적으로 만들어준다. 

app.get('/', function(req, res){         //url에 /로 요청 들어오면 
  res.sendFile(__dirname + "/public/main.html");
})

app.get('/main', function(req, res){    //url에 /main으로 요청 들어오면
  res.sendFile(__dirname + "/public/main.html");    
})

app.get('/form', function(req, res){    //url에 /form으로 요청 들어오면
  res.sendFile(__dirname + "/public/form.html");    
})

//form.html에서 submit을 하면 /email_post로 body에 정보가 담겨서 옴. 
app.post('/email_post', function(req, res){
  var email = req.body.email;       //form의 name=""의 값
  // res.send("<h1>welcome!! " + email);              //변수 값을 화면에 띄움. 모든 html의 요소들을 이렇게 send에 직접 쳐서 보낼 수 없음. 이를 해결하기 위해 ejs 사용
  res.render('email.ejs', {email : email});     //email.ejs에 email이라는 변수에 값 담아서 전송 <%= %> 안에 있는 변수의 이름과 같아야 함. 
})

//from.html에서 ajax로 json 데이터를 보냄.
app.post('/ajax_send_email', function(req, res){
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