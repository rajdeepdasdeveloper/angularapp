var accountSettings = angular.module('Mod_forgotPassword', ['ui.router']);

feUserRegister.controller('Ctrl_forgotPassword', function($rootScope, auth, userSession, $http/*sendPasswordRecoveryLink /*, $stateParams, feUserRegister_Factory, $parse */){
	
	var ctrl = this;
	ctrl.show = false;

	// {#--- SESSION AUTHENTICATION 
	userSession.publicPages(auth, ctrl);
    // SESSION AUTHENTICATION ---#}

	ctrl.email = "";
	ctrl.spam_protection = "";
	ctrl.status = "";
	ctrl.disabled = false;
	ctrl.recoveryLink = false;

	ctrl.sendPasswordRecoveryLink = function(){
		var sessionCredentials = [{
			username : ctrl.email,
			spam_protection : ctrl.spam_protection
		}];
		$http({
	        method : "JSON",
	        data : sessionCredentials[0],
	        url : $rootScope.apiURL + "accountSettings/forgotPassword.php",
	        headers: {'Content-Type' : 'application/json'}
    	})
	    .then(function success(response) {
	    	if(response.data){
	    		if(response.data.message == "1"){
	    			ctrl.recoveryLink = true;
	    		}
	    		else if(response.data.message == "0"){
	    			ctrl.recoveryLink = false;
	    		}
	        }
	    }, 
	    function error(response) {
	    	ctrl.recoveryLink = false;
	    });	
      // sendPasswordRecoveryLink.sendPasswordRecoveryLink(passwordInfo, ctrl);
    }
});