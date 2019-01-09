var activateAccount = angular.module('Mod_activateAccount', ['ui.router']);

activateAccount.controller('Ctrl_activateAccount', function($scope, auth, userSession, $rootScope, $location, $http, $state /* $http, $location, $state, $stateParams, feUserRegister_Factory, $parse */){
	
	var ctrl = this;
	ctrl.show = false;
	ctrl.email = "";
  	ctrl.activisionCode = "";
  	ctrl.spam_protection = "";

	// {#--- SESSION AUTHENTICATION 
	userSession.publicPages(auth, ctrl);
    // SESSION AUTHENTICATION ---#}

    ctrl.resendActivisionCode = function(){
    	var resendActivisionDetails = [{
			username : ctrl.email,
			spam_protection : ctrl.spam_protection
		}];
    	$http({
        method : "JSON",
        data : resendActivisionDetails[0],
        url : $rootScope.apiURL + "activateAccount/resendActivisionCode.php",
        headers: {'Content-Type' : 'application/json'}
	    })
	    .then(function success(response) {
	      	if(response.data){
				if(response.data.message == "1"){
				 	//ctrl.accountInfo = response.data.message;
				 	alert("success");
				}
				else if(response.data.message == "3"){
					alert("User is aleardy active");
				}
				else if(response.data.message == "0"){
					$location.url('/sign-in');
				}
	      	}
	    }, 
	    function error(response) {
	       $location.url('/sign-in');
	    });
    }

    ctrl.activateAccount = function(){

    }
});