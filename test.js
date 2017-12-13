console.log("Hello World!");
/*
var express = require('express')
var app = express();
app.get('/home', function(req, res) {
  res.end('Hello World!')
})
app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});
*/


var fs = require('fs');
var express = require('express');
var app = express();

app.use('/public', express.static(process.cwd() + '/public'));
app.route('/test2')
    .get(function(req, res) {
		  res.end('Hello World 2');
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