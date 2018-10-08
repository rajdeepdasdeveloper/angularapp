accountSettings.controller('Ctrl_changePassword', function(auth, userSession, $rootScope, $http, $location, updatePasswordSettings, $state, $timeout /*,, $stateParams, feUserRegister_Factory, $parse */){
	
	var ctrl = this;
	ctrl.show = false;
	ctrl.oldPassword = "";
	ctrl.newPassword = "";
  ctrl.rePassword = "";
	ctrl.spam_protection = "";
	ctrl.status = "";
	ctrl.showPassword = false;

	userSession.privatePages(auth, ctrl);

    var passwordInfo = {};
    ctrl.updatePasswordSettings = function(){
      updatePasswordSettings.updatePasswordSettings(passwordInfo, ctrl);
    }

    ctrl.refreshStatus = function(){
      ctrl.status = "";
    }

    ctrl.toggleShowPassword = function(){
      if(!ctrl.showPassword){
        ctrl.showPassword = true;
      }
      else{
        ctrl.showPassword = false;
      }
    }
});