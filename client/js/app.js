var auth = false;
/* Core Module */
var mainApp = angular.module('coreAppModule', 
	[
	'ui.router',
	'angular-loading-bar',
	'Mod_feUserLogIn',
	'Mod_feUserRegister',
	'Mod_header',
	'Mod_dashboard'
	]);

/* Core Controller */
mainApp.controller('coreAppController', function(userSession, $http){
	var coreAppCtrl = this;
	coreAppCtrl.baseUrl = "http://angularapp.local/";

});

/* App Configuration */
mainApp.config(function($stateProvider, $urlRouterProvider, $locationProvider){
        
	// Default
	$urlRouterProvider.otherwise('/login');
	
	// Page Tree
    $stateProvider
	.state("feUserlogIn", {
        url: "/login",
        templateUrl: "client/views/feUserLogIn.html",
		controller: "Ctrl_feUserLogIn",
		controllerAs: "CtrlAs_feUserLogIn",
		resolve: {
			'check' : function($location, userSession, $http, $state){
				if(localStorage.getItem("username") =="" || localStorage.getItem("token") ==""){
					$location.url('/login');
				}
				else{
					var sessionCredentials = [{
						username : localStorage.getItem("username"),
						token : localStorage.getItem("token")
					}];
					$http({
				        method : "JSON",
				        data : sessionCredentials[0],
				        url : "http://angularapp.local/api/modules/sessionManagement/sessionCheck.php",
				        headers: {'Content-Type' : 'application/json'}
				    })
				    .then(function success(response) {
				        if(response.data){
				            if(response.data.message == "1"){
				               	$state.go('dashboard');
				       		}
				       		else if(response.data.message == "0"){
				       			$location.url('/login');
				       		}
				        }
				    }, 
				    function error(response) {
				       $location.url('/login');
				    });
				}
			}
		}
    })
    .state("feUserRegister", {
        url: "/signup",
        templateUrl: "client/views/feUserRegister.html",
		controller: "Ctrl_feUserRegister",
		controllerAs: "CtrlAs_feUserRegister",
		resolve: {
			'check' : function($location, userSession, $http, $state){
				if(localStorage.getItem("username") =="" || localStorage.getItem("token") ==""){
					$location.url('/signup');
				}
				else{
					var sessionCredentials = [{
						username : localStorage.getItem("username"),
						token : localStorage.getItem("token")
					}];
					$http({
				        method : "JSON",
				        data : sessionCredentials[0],
				        url : "http://angularapp.local/api/modules/sessionManagement/sessionCheck.php",
				        headers: {'Content-Type' : 'application/json'}
				    })
				    .then(function success(response) {
				        if(response.data){
				            if(response.data.message == "1"){
				               	//$location.url('/dashboard');.
				               	$state.go('dashboard');
				       		}
				       		else if(response.data.message == "0"){
				       			$location.url('/signup');
				       		}
				        }
				    }, 
				    function error(response) {
				       $location.url('/login');
				    });
				}
			}
		}
    })
    .state("dashboard", {
        url: "/dashboard",
        templateUrl: "client/views/view_dashboard.html",
		controller: "Ctrl_dashboard",
		controllerAs: "CtrlAs_dashboard",
		resolve: {
			'check' : function($location, userSession, $http, $timeout, $state){
				if(localStorage.getItem("username") =="" && localStorage.getItem("token") ==""){
					alert("sss");
				 	$location.url('/login');
			 	}
			 	else{
					var sessionCredentials = [{
						username : localStorage.getItem("username"),
						token : localStorage.getItem("token")
					}];
					$http({
				        method : "JSON",
				        data : sessionCredentials[0],
				        url : "http://angularapp.local/api/modules/sessionManagement/sessionCheck.php",
				        headers: {'Content-Type' : 'application/json'}
				    })
				    .then(function success(response) {
				    	//alert("success");
				        if(response.data){
				            if(response.data.message == "0"){
				             	$timeout(function(){
				             		$location.url('/login');
				             	},1);
				       		}
				            else if(response.data.message == "1"){
				            	$timeout(function(){
				             		$location.url('/dashboard');
				             	},1);
				       			
				            }
				        }
				    }, 
				    function error(response) {
				       	$timeout(function(){
				             $location.url('/login');
				        },1);
				    });
				}
			}
		}
    });
        
	// HTML5 Mode	
	$locationProvider.html5Mode(true);

});

/* SESSION CHECKING */
mainApp.factory('userSession', function($http) {
	
	var factory = {}
	factory.exists = function() {
		var status = false;
		if(localStorage.getItem("username") && localStorage.getItem("token")){
			var sessionCredentials = [{
				username : localStorage.getItem("username"),
				token : localStorage.getItem("token")
			}];
			$http({
		        method : "JSON",
		        data : sessionCredentials[0],
		        url : "http://angularapp.local/api/modules/sessionManagement/sessionCheck.php",
		        headers: {'Content-Type' : 'application/json'}
		    })
		    .then(function success(response) {
		        if(response.data){
		            if(response.data.message == "1"){
		            	status = true;
		       		}
		            else if(response.data.message == "0"){
		            	status = false;
		            }
		        }
		    }, 
		    function error(response) {
		    	status = false;
		    });	
		}
		else{
			status = false;
		}
		return status;
	}

	return factory;
});
	
/* APPLICATION RUN (Main Method) */

mainApp.run(function($rootScope, $location, $state){

	// Permission to page access 
	var routePermission = [];
	
	// For state change event
	$rootScope.$on("$stateChangeStart", function(){
		
	});


	
});