/* Core Module */
var mainApp = angular.module('coreAppModule', 
	[
	'ui.router', 
	'Mod_feUserLogIn',
	'Mod_feUserRegister'
	]);

/* Core Controller */
mainApp.controller('coreAppController', function(){
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
			auth : function($location, MyService){
				if(MyService.method1()){
					$location.url('/dashboard');
				}
				//$location.url('/login');
			}
		}
    })
    .state("feUserRegister", {
        url: "/signup",
        templateUrl: "client/views/feUserRegister.html",
		controller: "Ctrl_feUserRegister",
		controllerAs: "CtrlAs_feUserRegister",
		resolve: {
			auth : function($location, MyService){
				if(MyService.method1()){
					$location.url('/dashboard');
				}
				//$location.url('/login');
			}
		}
    })
    .state("dashboard", {
        url: "/dashboard",
        /*templateUrl: "client/views/feUserRegister.html",
		controller: "Ctrl_feUserRegister",
		controllerAs: "CtrlAs_feUserRegister",*/
		resolve: {
			auth : function($location){
				if(!localStorage.currentLoggedInUser){
					$location.url('/login');
				}
				//$location.url('/login');
			}
		}
    });
        
	// HTML5 Mode	
	$locationProvider.html5Mode(true);

});


mainApp.factory('MyService', function() {
	
	var factory = {}; 

	factory.method1 = function() {
			if(localStorage.currentLoggedInUser){
				return true;
			}
		}

	factory.method2 = function() {
			//..
		}

	return factory;
});
	
/* APPLICATION RUN (Main Method) */

mainApp.run(function($rootScope, $location, $state, /*feUserLogIn_Factory*/){

	// Permission to page access 
	var routePermission = [];
	
	// For state change event
	$rootScope.$on("$stateChangeStart", function(){
		
	});
	
});