var feUserLogIn = angular.module('Mod_feUserLogIn', ['ui.router']);

feUserLogIn.controller('Ctrl_feUserLogIn', function(auth, userSession, $rootScope, $location, loginAuthOperation, $http /*, $state, $stateParams, feUserRegister_Factory, $parse */){
	
	var ctrl = this;
	ctrl.show = false;
	ctrl.sessionCheck = function(){
		// {#--- SESSION AUTHENTICATION 
		userSession.publicPages(auth, ctrl);
    	// SESSION AUTHENTICATION ---#}
	}

	if (typeof(Storage) !== "undefined") {
		if(localStorage.getItem("remember_me")){
			ctrl.rememberMeValue = localStorage.getItem('remember_me');
			if(localStorage.getItem('username') != null && localStorage.getItem('token') != null){
				var loginCredentials = [{
					username : localStorage.getItem('username'),
					token : localStorage.getItem('token'),
				}];
				$http({
		            method : "JSON",
		            data : loginCredentials[0],
		            url : $rootScope.apiURL + "person/remember_Me.php",
		            headers: {'Content-Type' : 'application/json'}
		        })
		        .then(function success(response) {
		        	if(response.data.message == '1'){
                        $location.url('/dashboard');
		            }
		            else{
						ctrl.sessionCheck();
		            }
		        }, function error(response) {});
			}
			else{
				ctrl.sessionCheck();
			}
		}
		else if(!localStorage.getItem("remember_me")){
			ctrl.sessionCheck();
		}
	}
	else{
		ctrl.rememberMeValue = "";
	}
	
	if (typeof(Storage) !== "undefined") {
		if (localStorage.getItem("username")){
        	ctrl.email = localStorage.getItem("username");
        }
        else {
        	localStorage.removeItem('token');
    	}
    } 

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

    ctrl.rememberMe = function(){
    	if (typeof(Storage) !== "undefined") {
    		if (ctrl.rememberMeValue == "1"){
            	localStorage.setItem("remember_me", "1");
            }
            else {
            	localStorage.removeItem('remember_me');
            	localStorage.removeItem('token');
        	}
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