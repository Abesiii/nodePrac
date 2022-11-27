var express = require('express');   //node_modules에 있는 express에 관련된 함수 모듈을 가져옴(객체는 아님. 반환값 함수)
var app = express();        
var bodyParser = require('body-parser');        
var router = require('./router/index');

app.listen(3000, function(){             //콜백함수는 비동기. 서버 켜질때까지 기다렸다가 실행되는 것 아니고, 다음 코드 먼저 실행되고 그 다음에 콜백함수 실행됨. 
  console.log("3000포트로 서버 시작");    //node의 디폴트 포트는 3000
})

app.use(express.static('public'));       //static 디렉토리 저장
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));    //인코딩된 url
//view engine은 서버에서 넘겨준 값을 html에 삽입하여 화면에 출력할 수 있게 해주는 엔진으로, 정적인 html을 동적으로 만들어준다. 
app.set('view engine', 'ejs');           //ejs view engine 

app.use(router);      //라우터. index.js가 모든 라우팅을 컨트롤함. 


