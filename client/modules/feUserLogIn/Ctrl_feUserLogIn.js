var feUserLogIn = angular.module('Mod_feUserLogIn', ['ui.router']);

feUserLogIn.controller('Ctrl_feUserLogIn', function(auth, userSession, $rootScope, $location, loginAuthOperation, $http, $location /*, $state, $stateParams, feUserRegister_Factory, $parse */){
	
	var ctrl = this;
	ctrl.show = false;

	// {#--- SESSION AUTHENTICATION 
	userSession.publicPages(auth, ctrl);
    // SESSION AUTHENTICATION ---#}

	ctrl.email = "";
	ctrl.password = "";
	ctrl.spam_protection = "";
	ctrl.disabled = false;
	ctrl.showPassword = false;
	ctrl.status = "";

	ctrl.login = function(){

		var loginCredentials = [{
			username : ctrl.email,
			password : ctrl.password,
			spam_protection : ctrl.spam_protection
		}];

		loginAuthOperation.loginAuth(loginCredentials, ctrl);
	}

	ctrl.toggleShowPassword = function(){
      if(!ctrl.showPassword){
        ctrl.showPassword = true;
      }
      else{
        ctrl.showPassword = false;
      }
    }

	/*if(localStorage.feUser){
		var feUsers = localStorage.feUser;
		feUsers = "[" + feUsers + "]";
		feUsers = JSON.parse(feUsers);
		userAuth = false;
		for(i=0; i < feUsers.length; i++){
			if(feUsers[i].email == ctrl.email && feUsers[i].password == ctrl.password){
				localStorage.setItem("currentLoggedInUser", feUsers[i].email);
				userAuth = true;
				alert("Login Successful");
				$location.path('/dashboard');
				break;
			}
		}
		if(!userAuth){
			alert("Login Failed");
		}
	}
	else{
		alert("User is not registered");
	}*/
});