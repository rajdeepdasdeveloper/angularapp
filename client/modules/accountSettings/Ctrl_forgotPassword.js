var accountSettings = angular.module('Mod_forgotPassword', ['ui.router']);

feUserRegister.controller('Ctrl_forgotPassword', function($rootScope, auth, userSession, $http, $state, $location, $timeout /*sendPasswordRecoveryLink, $stateParams, feUserRegister_Factory, $parse */){
	
	var ctrl = this;
	ctrl.show = false;

	// {#--- SESSION AUTHENTICATION 
	userSession.publicPages(auth, ctrl);
    // SESSION AUTHENTICATION ---#}

	ctrl.email = "";
	ctrl.spam_protection = "";
	ctrl.status = "";
	ctrl.disabled = false;
	ctrl.currStep = false;
	ctrl.nextStep = false;

	var sessionCredentials = [{
		usernameSession : 'forgotPasswordUsername'
	}];

	$http({
	    method : "JSON",
	    data : sessionCredentials[0],
	    url : $rootScope.apiURL + "sessionManagement/forgotPasswordSessionCheck.php",
	    headers: {'Content-Type' : 'application/json'}
	})
	.then(function success(response) {
	    if(response.data){
	        if(typeof response.data.message === 'object'){
	            if (typeof(Storage) !== "undefined") {
	                ctrl.email = response.data.message.username;
	                ctrl.nextStep = true;
				}
	        }
	        else{
	        	ctrl.currStep = true;
	        }
	    }
	}, function error(response) {
	    alert("Something went wrong. Please check your internet connction and try again.");
	});

	ctrl.sendPasswordRecoveryMail = function(){
		ctrl.disabled = true;
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
	    		ctrl.status = response.data.message;
	    		if(response.data.message == "1"){ // Successful
	    			ctrl.nextStep = true;
	    			ctrl.currStep = false;
	    		}
	    		else if(response.data.message == "2"){ // Unsuccessful (Username does not exist)
	    			ctrl.nextStep = false;
	    		}
	    		else if(response.data.message == "3"){ // Unsuccessful (Inactive User)
	    			ctrl.nextStep = false;
	    		}
	    		else if(response.data.message == "0"){ //  Unsuccessful (Server Problem)
	    			ctrl.nextStep = false;
	    		}
	        }
	        ctrl.disabled = false;
	    }, 
	    function error(response) {
	    	ctrl.nextStep = false;
	    	ctrl.status = "0";
	    });	

      // sendPasswordRecoveryLink.sendPasswordRecoveryLink(passwordInfo, ctrl);
    }

    ctrl.recoveryCode = "";
    reNewForgotPassword = "";
	ctrl.reNewForgotPassword = "";
	ctrl.spam_protection = "";

    ctrl.updatePasswordSettings = function(){

    	var sessionCredentials = [{
    		username : ctrl.email,
			recoveryCode : ctrl.recoveryCode,
			newForgotPassword : ctrl.reNewForgotPassword,
			spam_protection : ctrl.spam_protection
		}];

    	$http({
            method : "JSON",
            data : sessionCredentials[0],
            url : $rootScope.apiURL + "accountSettings/changeForgotPassword.php",
            headers: {'Content-Type' : 'application/json'}
        })
        .then(function success(response) {
            if(response.data){
                ctrl.status = response.data.message;
                if(response.data.message == "1"){
                    ctrl.recoveryCode = "";
				    ctrl.reNewForgotPassword = "";
					ctrl.reNewForgotPassword = "";
					ctrl.changeForgotPasswordForm.recoveryCode.$setPristine();
					ctrl.changeForgotPasswordForm.password.$setPristine();
					ctrl.changeForgotPasswordForm.repassword.$setPristine();
					ctrl.status = response.data.message;
					$timeout(function(){
						$location.url('/sign-in');
					}, 2000);
                }
                else if(response.data.message == "0"){
                	ctrl.status = response.data.message;
                	ctrl.recoveryCode = "";
                	ctrl.changeForgotPasswordForm.recoveryCode.$setPristine();
                }
                else if(response.data.message == "2"){
                	alert("There might be something wrong with the server. Please try again after sometime.");
                	window.location = $rootScope.baseUrl + "sign-in";
                }
            }
            else{
                alert("Something went wrong. Please check your internet connction and try again.");
                window.location = $rootScope.baseUrl + "sign-in";
            }
        }, function error(response) {
            alert("Something went wrong. Please check your internet connction and try again.");
            window.location = $rootScope.baseUrl + "sign-in";
        });
    }

    ctrl.toggleShowPassword = function(){
      if(!ctrl.showPassword){
        ctrl.showPassword = true;
      }
      else{
        ctrl.showPassword = false;
      }
    }

    ctrl.refreshStatus = function(){
      ctrl.status = "";
    }

});