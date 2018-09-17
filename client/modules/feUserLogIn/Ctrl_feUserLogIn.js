var feUserLogIn = angular.module('Mod_feUserLogIn', ['ui.router']);

feUserLogIn.controller('Ctrl_feUserLogIn', function($scope,$location /* $http, $location, $state, $stateParams, feUserRegister_Factory, $parse */){
	
	var ctrl = this;

	ctrl.email = "";
	ctrl.password = "";

	ctrl.login = function(){
		if(localStorage.feUser){
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
		}
	}
});