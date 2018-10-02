var feUserRegister = angular.module('Mod_feUserRegister', ['ui.router']);

feUserRegister.controller('Ctrl_feUserRegister', function($rootScope, $location, registerOperation, $http, $state /*, $stateParams, feUserRegister_Factory, $parse */){
	
	var ctrl = this;

	// {#--- SESSION AUTHENTICATION 
	ctrl.show = false;
	var sessionCredentials = [{
		username : localStorage.getItem("username"),
		token : localStorage.getItem("token")
	}];
	$http({
        method : "JSON",
        data : sessionCredentials[0],
        url : $rootScope.apiURL + "sessionManagement/sessionCheck.php",
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
    // SESSION AUTHENTICATION ---#}

	ctrl.first_name = "";
	ctrl.last_name = "";
	ctrl.email = "";
	ctrl.password = "";
	ctrl.spam_protection = "";
	ctrl.status = "";

	var first_Name = ctrl.first_name;
	var last_Name = ctrl.last_name;
	var email = ctrl.email;
	var password = ctrl.password;
	//alert(coreAppCtrl.baseUrl);
	ctrl.register = function(){
		var newUser = [{
			username : ctrl.email,
			password : ctrl.password,
			first_name : ctrl.first_name,
			last_name : ctrl.last_name,
			spam_protection : ctrl.spam_protection
		}];
		
		registerOperation.register(newUser, ctrl);
		
		

		/*newUser = JSON.stringify(newUser);
		if(!localStorage.feUser){
			localStorage.setItem("feUser", newUser);
		}
		else{
			localStorage.setItem("feUser", localStorage.feUser + ", " +newUser);
		}
		$location.path('/dashboard');*/
	}
});