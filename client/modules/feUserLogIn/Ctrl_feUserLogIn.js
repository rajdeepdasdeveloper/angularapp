var feUserLogIn = angular.module('Mod_feUserLogIn', ['ui.router']);

feUserLogIn.controller('Ctrl_feUserLogIn', function($scope,$location, loginAuthOperation, $http, $location /*, $state, $stateParams, feUserRegister_Factory, $parse */){
	
	var ctrl = this;

	ctrl.show = false;
	var sessionCredentials = [{
		username : localStorage.getItem("username"),
		token : localStorage.getItem("token")
	}];
	$http({
        method : "JSON",
        data : sessionCredentials[0],
        url : "http://angularapp.nickosys.com/api/modules/sessionManagement/sessionCheck.php",
        headers: {'Content-Type' : 'application/json'}
    })
    .then(function success(response) {
        if(response.data){
            if(response.data.message == "1"){
               	$location.url('/dashboard');
       		}
       		else if(response.data.message == "0"){
       			ctrl.show = true;
       		}
        }
    }, 
    function error(response) {
       ctrl.show = true;
    });

	ctrl.email = "";
	ctrl.password = "";
	ctrl.spam_protection = "";
	ctrl.status = "";

	ctrl.login = function(){

		var loginCredentials = [{
			username : ctrl.email,
			password : ctrl.password,
			spam_protection : ctrl.spam_protection
		}];

		loginAuthOperation.loginAuth(loginCredentials, ctrl);

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
	}
});