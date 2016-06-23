var _restController = require('./rest.controller');
var lda = require('lda');

function AppController(){ 

	console.log('## AppController');

}

AppController.prototype.postApp = function(req, res) {

	console.log('## Begin AppController.prototype.postApp');

	var restController = new _restController();

	//GET BODY DATA	
	var data = {		
		text : req.body.text
	};

	console.log('## data', data);

	//VALIDATE REQUEST
	if (data.text === undefined || data.text === '') 
		restController.response.errors.push( 'Texto inválido!');	

	if (restController.response.errors.length === 0 ){

		var documents = data.text.match(/[^\.!\?]+[\.!\?]+/g);
		// var documents = data.text;	

		console.log('## documents', documents);

		var result = lda(documents, 1, 10);

		for (var i in result) {

			var row = result[i];
			console.log('Topic ' + (parseInt(i) + 1));			
			
			for (var j in row) {
				var term = row[j];
				console.log(term.term + ' (' + term.probability + '%)');
			}
			
			console.log('');
		}

		restController.response.success = true;
		restController.response.result = result;
		restController.finalizeWithResponse(res);

	} else {
		restController.finalizeWithResponse(res);
	}

};

module.exports = AppController;