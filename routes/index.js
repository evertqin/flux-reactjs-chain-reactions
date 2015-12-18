var express = require('express');
var url = require('url');
var querystring = require('querystring');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var HOME = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/Analysis/MethodTypes', function(req, res, next) {
  fs.readdir(HOME, function(err, files) {
    if (err) {
      res.send([]);
      return;
    }

    if (files) {
      files = files.filter(function(item) {
        return fs.lstatSync(path.join(HOME, item)).isDirectory();
      });
      res.send(files);
    } else {
      res.send([]);
    }
  });
});

router.get('/Analysis/FilesForProcessing', function(req, res, next) {
  var selected = req.query.methodType;
  fs.readdir(path.join(HOME, selected), function(err, files) {
    if (err) {
      res.send([]);
      return;
    }
    if (files) {
      files = files.filter(function(item) {
        return fs.lstatSync(path.join(HOME, selected, item)).isDirectory();
      });
      res.send(files);
    } else {
      res.send([]);
    }
  });
});

router.get('/Analysis/DemoList', function(req, res, next) {
  var methodType = req.query.methodType;
  var filename = req.query.filename;

  fs.readdir(path.join(HOME, methodType, filename), function(err, files) {
    if (err) {
      res.send([]);
    } else {
      res.send(files);
    }
  });
});

module.exports = router;
