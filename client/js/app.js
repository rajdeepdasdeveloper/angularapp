/* Core Module */
var mainApp = angular.module('coreAppModule', 
	[
	'ui.router',
	'angular-loading-bar',
	'Mod_feUserLogIn',
	'Mod_feUserRegister',
	'Mod_accountSettings',
	'Mod_header',
	'Mod_dashboard'
	]
);

/* Core Controller */
mainApp.controller('coreAppController', function($scope, $rootScope, $http){
	var coreAppCtrl = this;
	$rootScope.baseUrl = "http://angularapp.nickosys.com/";
	$rootScope.apiURL = "http://angularapp.nickosys.com/api/modules/";
});

/* App Configuration */
mainApp.config(function($stateProvider, $urlRouterProvider, $locationProvider){
        
	// Default
	$urlRouterProvider.otherwise('/sign-in');
	
	// Page Tree
    $stateProvider
	.state("login", {
        url: "/sign-in",
        templateUrl: "client/views/feUserLogIn.html",
		controller: "Ctrl_feUserLogIn",
		controllerAs: "CtrlAs_feUserLogIn",
		resolve: {
			'check' : function($rootScope, $location, $http, $state){
				if(localStorage.getItem("username") =="" || localStorage.getItem("token") ==""){
					$location.url('/sign-in');
				}
				else{
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
				               	$state.go('dashboard');
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
			}
		}
    })
    .state("registration", {
        url: "/sign-up",
        templateUrl: "client/views/feUserRegister.html",
		controller: "Ctrl_feUserRegister",
		controllerAs: "CtrlAs_feUserRegister",
		resolve: {
			'check' : function($rootScope, $location, userSession, $http, $state){
				if(localStorage.getItem("username") =="" || localStorage.getItem("token") ==""){
					$location.url('/sign-up');
				}
				else{
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
				               	$state.go('dashboard');
				       		}
				       		else if(response.data.message == "0"){
				       			$location.url('/sign-up');
				       		}
				        }
				    }, 
				    function error(response) {
				       $location.url('/sign-up');
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
			'check' : function($rootScope, $location, userSession, $http, $timeout, $state){
				if(localStorage.getItem("username") =="" && localStorage.getItem("token") ==""){
				 	$location.url('/sign-in');
			 	}
			 	else{
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
				            if(response.data.message == "0"){
				             	$timeout(function(){
				             		$location.url('/sign-in');
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
				             $location.url('/sign-in');
				        },1);
				    });
				}
			}
		}
    })
    .state("accountSettings", {
        url: "/account-settings",
        templateUrl: "client/views/view_accountSettings.html",
		controller: "Ctrl_accountSettings",
		controllerAs: "CtrlAs_accountSettings",
		resolve: {
			'check' : function($rootScope, $location, userSession, $http, $timeout, $state){
				if(localStorage.getItem("username") =="" && localStorage.getItem("token") ==""){
				 	$location.url('/sign-in');
			 	}
			 	else{
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
				            if(response.data.message == "0"){
				             	$timeout(function(){
				             		$location.url('/sign-in');
				             	},1);
				       		}
				            else if(response.data.message == "1"){
				            	$timeout(function(){
				             		$location.url('/account-settings');
				             	},1);
				            }
				        }
				    }, 
				    function error(response) {
				       	$timeout(function(){
				             $location.url('/sign-in');
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
mainApp.factory('userSession', function($http, $rootScope) {
	
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
		        url : $rootScope.apiURL + "sessionManagement/sessionCheck.php",
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