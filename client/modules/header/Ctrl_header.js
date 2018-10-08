var header = angular.module('Mod_header', []);

header.controller('Ctrl_header', function($rootScope, $scope, logout_Factory, $state /* $http, $location, $stateParams, feUserRegister_Factory, $parse */){
	
	var ctrl = this;

	ctrl.logout = function(){
		logout_Factory.deleteUserSession();
	}

	ctrl.current = $state.current.name;
	$rootScope.$on("$stateChangeSuccess", function(){
		ctrl.current = $state.current.name;
	});

});