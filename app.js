
/**
 * Module dependencies.
 */
require('./db');
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var engine = require('ejs-locals');
var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('ejs',engine)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/create', routes.create);
app.get('/destroy/:id', routes.destroy);
//app.get('edit/:id', routes.edit);
app.post('update/:id', routes.update);

/*if(!module.parent){
	app.listen(app.get('port'), host, function () {
		console.log("Express server listeningon port %d in %s mode", 
			app.address().port, 
			app.settings.env);
	});
}*/


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
