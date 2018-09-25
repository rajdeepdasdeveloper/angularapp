var dashboard = angular.module('Mod_dashboard', ['ui.router']);

dashboard.controller('Ctrl_dashboard', function($scope, $http, $location /*, $state, $stateParams, feUserRegister_Factory, $parse */){
	
	var ctrl = this;
	ctrl.basicUserInfo = "";
	ctrl.show = false;

		var sessionCredentials = [{
			username : localStorage.getItem("username"),
			token : localStorage.getItem("token")
		}];
		$http({
	        method : "JSON",
	        data : sessionCredentials[0],
	        url : "http://angularapp.nickosys.com/api/modules/person/get_Basic.php",
	        headers: {'Content-Type' : 'application/json'}
	    })
	    .then(function success(response) {
	        if(response.data){
	            if(typeof response.data.message === 'object'){
	               	ctrl.basicUserInfo = response.data.message;
	               	ctrl.show = true;
	       		}
	       		else if(response.data.message == "0"){
	       			$location.url('/login');
	       		}
	        }
	    }, 
	    function error(response) {
	       $location.url('/login');
	    });
	

});