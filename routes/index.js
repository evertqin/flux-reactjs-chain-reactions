var express = require('express');
var url = require('url');
var querystring = require('querystring');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res){
  res.render('index', {title:'Express'});
});

router.get('/Analysis/MethodTypes', function(req, res, next){
  var methodTypes = ['Type0', 'Type1', 'Type2', 'Type3'];

  res.send({methodTypes: methodTypes});
});

router.get('/Analysis/FilesForProcessing', function(req, res, next){

  var files = {
    Type0:["AAAA", "ABDSD", ],
    Type1:["AAAA", "ABDSD","AAAA", "ABDSD","AAAA", "ABDSD","CCCC"],
    Type2: ["DSDSDSDSDSDS"],
    Type3:["Hello", "This is good"]
  };

  var methodType = req.query.methodType;
  res.send({files: files[methodType]});
});

router.get('/Analysis/DemoList', function(req, res, next){
  
});

module.exports = router;
