var dashboard = angular.module('Mod_dashboard', ['ui.router']);

dashboard.controller('Ctrl_dashboard', function(auth, userSession, $scope, $rootScope, $http, $location /*, $state, $stateParams, feUserRegister_Factory, $parse */){
	
	var ctrl = this;
	ctrl.basicUserInfo = "";
	ctrl.show = false;

  userSession.privatePages(auth, ctrl);

  if(ctrl.show){
  	var sessionCredentials = [{
  		username : localStorage.getItem("username"),
  		token : localStorage.getItem("token")
  	}];
  	$http({
          method : "JSON",
          data : sessionCredentials[0],
          url : $rootScope.apiURL + "person/get_Basic.php",
          headers: {'Content-Type' : 'application/json'}
      })
      .then(function success(response) {
          if(response.data){
              if(typeof response.data.message === 'object'){
                 	ctrl.basicUserInfo = response.data.message;
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
    }
});