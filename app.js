/**
 * Module dependencies.
*/

var express = require('express');
var http = require('http');
var https= require('https');
var path = require('path');
var fs = require('fs');
var privateKey = fs.readFileSync('sslcert/key.pem', 'utf8');
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
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var s = fs.readFileSync("search.html", "utf-8");

app.get('/', function(request, response) {
    response.render('index');
});

app.post('/comment', function(req, res){

});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

httpsServer.listen(8443, function(){
    console.log('Express server listening on port 8443 https');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;