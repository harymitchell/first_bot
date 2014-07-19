/**
 * Module dependencies.
*/

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var https= require('https');
var path = require('path');
var fs = require('fs');
var routes = require('./routes');
var privateKey  = fs.readFileSync('sslcert/key.pem', 'utf8');
var certificate = fs.readFileSync('sslcert/cert.pem', 'utf8');
var options = {
    key: privateKey,
    cert: certificate
};
var app = express();
var httpServer = http.createServer(app);
var httpsServer = https.createServer(options, app);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
//app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var s = fs.readFileSync("search.html", "utf-8");

app.get('/', function(request, response) {
    response.send(s);
});

app.post('/comment', function(req, res){

});

app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

httpsServer.listen(8443, function(){
    console.log('Express server listening on port 8443 https');
});
