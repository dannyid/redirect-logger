
var appPort =  process.env.PORT || 3000;

var express = require('express'), 
    bodyParser =  require( 'body-parser' ),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    fs = require('fs'),
    util = require('util');

app.use(express.static(__dirname + '/public'));

app.get("/:url", function(req, res){
  writeToLog(req, res).redirect('http://google.com');
});

app.get("/", function(req, res){
  writeToLog(req, res).redirect('http://google.com');
});

function writeToLog(req, res) {
  var json = util.inspect(req, { showHidden: true, depth: 20 });
  fs.unlinkSync('public/log.txt');
  fs.appendFile('public/log.txt', json, function (err) {
    if (err) { console.log('Something blew up:', err); }
  });
  console.log('Redirect logged!', new Date());
  return res;
}

server.listen(appPort);

console.log('Listening on port: '+appPort);
