//이 파일이 모든 js 파일을 컨트롤하는 컨트롤러임.

var express = require('express');   //node_modules에 있는 express에 관련된 함수 모듈을 가져옴(객체는 아님. 반환값 함수)
var app = express();    
var router = express.Router();      //라우터
var path = require('path');         //상대경로로 편리하게 이동할 수 있는 객체

var main = require('./main/main');
var email = require('./email/email');
var form = require('./form/form');

router.use('/main', main);   //url에서 main으로 들어오면 main에 대한 라우터 사용 
router.use('/email', email);   //url에서 email로 들어오면 email에 대한 라우터 사용 
router.use('/form', form);   //url에서 email로 들어오면 email에 대한 라우터 사용 

router.get('/', function(req, res){         //url에 /로 요청 들어오면 
  res.sendFile(path.join(__dirname, "../public/main.html"));
})

module.exports = router;