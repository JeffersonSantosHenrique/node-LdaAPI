var _appController = require('../business/components/app.controller');

function AppService(app){

	//LOAD CONTROLLER
	var appController = new _appController();

	//CONFIGURE SERVICE ROUTES
	app.post('/app', appController.postApp);
	
}

module.exports = AppService;