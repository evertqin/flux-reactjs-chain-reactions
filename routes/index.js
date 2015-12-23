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

router.get('/Analysis/root', function(req, res, next) {
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

router.get('/Analysis/level0', function(req, res, next) {
  var selected = req.query.root;
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

router.get('/Analysis/level1', function(req, res, next) {
  var root = req.query.root;
  var level0 = req.query.level0;

  fs.readdir(path.join(HOME, root, level0), function(err, files) {
    if (err) {
      res.send([]);
    } else {
      res.send(files);
    }
  });
});

module.exports = router;
