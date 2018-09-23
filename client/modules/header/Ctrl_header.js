var header = angular.module('Mod_header', []);

header.controller('Ctrl_header', function($scope, logout_Factory /* $http, $location, $state, $stateParams, feUserRegister_Factory, $parse */){
	
	var ctrl = this;

	ctrl.logout = function(){
		logout_Factory.deleteUserSession();
	}

});