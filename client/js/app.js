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

/* Default State Controller */
mainApp.controller('defaultController', function(auth, $timeout, $location){
	var coreAppCtrl = this;
	if(!auth.status){
		$timeout(function(){
	        $location.url(auth.failure);
	    },1);
	}
	else if(auth.promise.message == "0"){
		$timeout(function(){
	        $location.url(auth.failure);
	    },1);
	}
	else if(auth.promise.message == "1"){
		$timeout(function(){
	        $location.url(auth.success);
	    },1);
	}
});

/* App Configuration */
mainApp.config(function($stateProvider, $urlRouterProvider, $locationProvider){
        
	// Default
	$urlRouterProvider.otherwise('/');
	
	// Page Tree
    $stateProvider
    .state("default", {
        url: "/",
        template: "",
		controller: "defaultController",
		controllerAs: "CtrlAs_defaultController",
		resolve: {
			'auth' : function(userSession){
				return userSession.exists('/dashboard', '/sign-in');
			}
		}
    })
	.state("login", {
        url: "/sign-in",
        templateUrl: "client/views/feUserLogIn.html",
		controller: "Ctrl_feUserLogIn",
		controllerAs: "CtrlAs_feUserLogIn",
		resolve: {
			'auth' : function(userSession){
				return userSession.exists('/dashboard', '/sign-in');
			}
		}
    })
    .state("forgotPassword", {
        url: "/forgot-password",
        templateUrl: "client/views/view_forgotPassword.html",
		controller: "Ctrl_forgotPassword",
		controllerAs: "CtrlAs_forgotPassword",
		resolve: {
			'auth' : function(userSession){
				return userSession.exists('/dashboard', '/forgot-password');
			}
		}
    })
    .state("forgotPassword.changeForgotPassword", {
        url: "/change-password",
        templateUrl: "client/views/view_changeForgotPassword.html",
		controller: "Ctrl_forgotPassword",
		controllerAs: "CtrlAs_forgotPassword",
		resolve: {
			'auth' : function(userSession){
			 	return userSession.exists('/dashboard', '/forgot-password/change-password');
			}
		}
    })
    .state("registration", {
        url: "/sign-up",
        templateUrl: "client/views/feUserRegister.html",
		controller: "Ctrl_feUserRegister",
		controllerAs: "CtrlAs_feUserRegister",
		resolve: {
			'auth' : function(userSession){
				return userSession.exists('/dashboard', '/sign-up');
			}
		}
    })
    .state("dashboard", {
        url: "/dashboard",
        templateUrl: "client/views/view_dashboard.html",
		controller: "Ctrl_dashboard",
		controllerAs: "CtrlAs_dashboard",
		resolve: {
			'auth' : function(userSession){
				return userSession.exists('/dashboard', '/sign-in');
			}
		}
    })
    .state("accountSettings", {
        url: "/account-settings",
        templateUrl: "client/views/view_accountSettings.html",
		controller: "Ctrl_accountSettings",
		controllerAs: "CtrlAs_accountSettings",
		resolve: {
			'auth' : function(userSession){
				return userSession.exists('/account-settings', '/sign-in');
			}
		}
    })
    .state("accountSettings.changePassword", {
        url: "/change-password",
        templateUrl: "client/views/view_changePassword.html",
		controller: "Ctrl_changePassword",
		controllerAs: "CtrlAs_changePassword",
		resolve: {
			'auth' : function(userSession){
				return userSession.exists('/account-settings/change-password', '/sign-in');
			}
		}
    });
        
	// HTML5 Mode	
	$locationProvider.html5Mode(true);

});

/* SESSION CHECKING */
mainApp.factory('userSession', function($rootScope, $http, $location, $timeout) {
	
	var factory = {}
	factory.exists = function(success, failure) {
		var returnValue = {};
		if(success){
			returnValue.success = success;
		}
		if(failure){
			returnValue.failure = failure;
		}
		if(localStorage.getItem("username") == null || localStorage.getItem("token") == null){
			returnValue.status = false;
			return returnValue;
		}
		else{
			var sessionCredentials = [{
				username : localStorage.getItem("username"),
				token : localStorage.getItem("token")
			}];
			return $http({
		        method : "JSON",
		        data : sessionCredentials[0],
		        url : $rootScope.apiURL + "sessionManagement/sessionCheck.php",
		        headers: {'Content-Type' : 'application/json'}
		    })
		    .then(function success(response) {
		    	if(response.data){
		    		returnValue.status = true;
		       		returnValue.promise = response.data;
		       		return returnValue;
		        }
		    }, 
		    function error(response) {
		    	returnValue.status = false;
				return returnValue;
		    });	
		}
	}

	factory.publicPages = function(authPromise, thisController){
		if(!authPromise.status){
			thisController.show = true;
			$timeout(function(){
		        $location.url(authPromise.failure);
		    },1);
		}
		else if(authPromise.promise.message == "0"){
			thisController.show = true;
			$timeout(function(){
		        $location.url(authPromise.failure);
		    },1);
		}
		else if(authPromise.promise.message == "1"){
			thisController.show = false;
			$timeout(function(){
		        $location.url(authPromise.success);
		    },1);
		}
	}

	factory.privatePages = function(authPromise, thisController){
		if(!authPromise.status){
			thisController.show = false;
			$timeout(function(){
		        $location.url(authPromise.failure);
		    },1);
		}
		else if(authPromise.promise.message == "0"){
			thisController.show = false;
			$timeout(function(){
		        $location.url(authPromise.failure);
		    },1);
		}
		else if(authPromise.promise.message == "1"){
			thisController.show = true;
			$timeout(function(){
		        $location.url(authPromise.success);
		    },1);
		}
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