var express = require('express');   //node_modules에 있는 express에 관련된 함수 모듈을 가져옴(객체는 아님. 반환값 함수)
var app = express();    
var router = express.Router();      //라우터
var path = require('path');         //상대경로로 편리하게 이동할 수 있는 객체

router.get('/', function(req, res){    //url에 /form으로 요청 들어오면
  res.sendFile(path.join(__dirname, "../public/form.html"));    
})

module.exports = router;    //다른 파일에서 router를 통하여 main.js를 사용할 수 있도록 export 함. 