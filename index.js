 /******************************************************
Copied from server.js
 * ***************************************************/

'use strict';

var fs = require('fs');
var express = require('express');
var app = express();

if (!process.env.DISABLE_XORIGIN) {
  app.use(function(req, res, next) {
    var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
    var origin = req.headers.origin || '*';
    if(!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1){
         console.log(origin);
         res.setHeader('Access-Control-Allow-Origin', origin);
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    next();
  });
}

app.use('/public', express.static(process.cwd() + '/public'));

app.route('/_api/package.json')
  .get(function(req, res, next) {
    console.log('requested');
    fs.readFile(__dirname + '/package.json', function(err, data) {
      if(err) return next(err);
      res.type('txt').send(data.toString());
    });
  });
  
app.route('/')
    .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
    })

app.route('/test2')
    .get(function(req, res) {
		  res.end('Hello World 2!!!');
    })

app.get('/:timestamp', function(req, res) {
  //console.log(req.query);
  //res.send(req.params.timestamp);
  //res.writeHead(200, { 'Content-Type': 'application/json' });
  //res.end(toWrite);
  if(isNaN(new Date(req.params.timestamp))){
    console.log(req.params.timestamp);
    if (isNumber(req.params.timestamp)){
      console.log('NaN Found');
    }
    
  }
  res.send(convertTime(req.params.timestamp));
})

// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})

app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});

function convertTime(timeString){
  var timeObj={"unix":new Date(timeString).getTime(), "natural":new Date(timeString)};
  return JSON.stringify(timeObj);
}

