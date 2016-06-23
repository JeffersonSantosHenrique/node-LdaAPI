var bodyParser = require('body-parser');
var express = require('express');
var app = express();

function API(){

	app.get('/', function (req, res) { res.sendStatus(404) });

	app.use(bodyParser.urlencoded({ extended: false }))
	app.use(bodyParser.json());

	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});

	//CALL ALL SERVICES
	require('./services/app.service')(app);

	var port = process.env.PORT || 3000;
	app.listen(port, function () {
		console.log('PushAPI is runing in port ' + port + '!');
	});

}

module.exports = new API();