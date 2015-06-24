
var appPort =  process.env.PORT || 3000;

var express = require('express'), 
    bodyParser =  require( 'body-parser' ),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    fs = require('fs'),
    util = require('util'),
    log;

app.use(express.static(__dirname + '/public'));

app.get("/log", function(req, res){
  res.send(log);
});

app.get("/:url", function(req, res){
  writeToLog(req, res).redirect('http://google.com');
});

app.get("/", function(req, res){
  writeToLog(req, res).redirect('http://google.com');
});

function writeToLog(req, res) {
  log = util.inspect(req, { showHidden: true, depth: 20 });
  console.log('Redirect logged!', new Date());
  return res;
}

server.listen(appPort);

console.log('Listening on port: '+appPort);
