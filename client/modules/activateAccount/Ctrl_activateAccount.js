var activateAccount = angular.module('Mod_activateAccount', ['ui.router']);

activateAccount.controller('Ctrl_activateAccount', function($scope, auth, userSession, $rootScope, $location, $http, $state, $timeout /* $http, $location, $state, $stateParams, feUserRegister_Factory, $parse */){
	
	var ctrl = this;
	ctrl.show = false;
	ctrl.status = "10";
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
				if(response.data){
				if(response.data.message == "5"){ // Code Sent successfully
				 	ctrl.status = response.data.message;
				}
				else if(response.data.message == "3"){ // Username Doesnt Exists
					ctrl.status = response.data.message;
				}
				else if(response.data.message == "4"){
					alert("Something went wrong, must be a server error!!!")
					$location.url('/sign-in');
				}
	      	}
	      	}
	    }, 
	    function error(response) {
	       $location.url('/sign-in');
	    });
    }

    ctrl.activateAccount = function(){
    	var accountActivisionDetails = [{
			username : ctrl.email,
			activisionCode : ctrl.activisionCode,
			spam_protection : ctrl.spam_protection
		}];
    	$http({
        method : "JSON",
        data : accountActivisionDetails[0],
        url : $rootScope.apiURL + "activateAccount/activateAccount.php",
        headers: {'Content-Type' : 'application/json'}
	    })
	    .then(function success(response) {
	      	if(response.data){
	      		if(response.data.message == "0"){ // Invalid Activision Code
					ctrl.status = response.data.message;
				}
				else if(response.data.message == "1"){ // Activision Successful
				 	ctrl.status = response.data.message;
				 	$timeout(function(){ 
                        $location.url('/sign-in');
                    }, 2000);
				}
				else if(response.data.message == "2"){ // Username is Already Active
					ctrl.status = response.data.message;
				}
				else if(response.data.message == "3"){ // Username Doesnt Exists
					ctrl.status = response.data.message;
				}
				else if(response.data.message == "4"){  // Server Error
					alert("Something went wrong, must be a server error!!!")
					$location.url('/sign-in');
				}
	      	}
	    }, 
	    function error(response) {
	       $location.url('/sign-in');
	    });
    }
});