var accountSettings = angular.module('Mod_accountSettings', ['ui.router']);

accountSettings.controller('Ctrl_accountSettings', function($rootScope, $http, $location, updateAccountSettings /*, $state, $stateParams, feUserRegister_Factory, $parse */){
	
	var ctrl = this;
	ctrl.accountInfo = "";
	ctrl.show = false;
  ctrl.firstname = "";
  ctrl.lastname = "";
  ctrl.password = "";
  ctrl.spam_protection = "";
  ctrl.status = "";

	var sessionCredentials = [{
		username : localStorage.getItem("username"),
		token : localStorage.getItem("token")
	}];
	$http({
        method : "JSON",
        data : sessionCredentials[0],
        url : $rootScope.apiURL + "accountSettings/getAccountSettings.php",
        headers: {'Content-Type' : 'application/json'}
    })
    .then(function success(response) {
        if(response.data){
            if(typeof response.data.message === 'object'){
               	ctrl.accountInfo = response.data.message;
                ctrl.firstname = ctrl.accountInfo.firstname;
                ctrl.lastname = ctrl.accountInfo.lastname;
               	ctrl.show = true;
       		}
       		else if(response.data.message == "0"){
       			$location.url('/sign-in');
       		}
        }
    }, 
    function error(response) {
       $location.url('/sign-in');
    });
    
    var basicUserInfo = {};
    ctrl.updateBasicAccountSettings = function(){
      updateAccountSettings.updateBasicAccountSettings(basicUserInfo, ctrl);
    }
    ctrl.refreshStatus = function(){
      ctrl.status = "";
    }

});