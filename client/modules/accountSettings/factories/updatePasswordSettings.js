accountSettings.factory('updatePasswordSettings', function($rootScope, $http, $location, $timeout) {

    var factory = {};
    factory.updatePasswordSettings = function(passwordInfo, ctrl) {

    	passwordInfo.username = localStorage.getItem("username");
		passwordInfo.token = localStorage.getItem("token");
		passwordInfo.oldPassword = ctrl.oldPassword;
		passwordInfo.newPassword = ctrl.newPassword;
		passwordInfo.spam_protection = ctrl.spam_protection;

    	$http({
            method : "JSON",
            data : passwordInfo,
            url : $rootScope.apiURL + "accountSettings/updatePasswordSettings.php",
            headers: {'Content-Type' : 'application/json'}
        })
        .then(function success(response) {
            if(response.data){
                ctrl.status = response.data.message;
                if(response.data.message == "1"){ // Successfull
                    ctrl.oldPassword = ""
                    ctrl.newPassword = "";
                    ctrl.rePassword = "";
                    ctrl.changePasswordForm.password.$setPristine();
                    ctrl.changePasswordForm.newPassword.$setPristine();
                    ctrl.changePasswordForm.rePassword.$setPristine();
                }
                else if(response.data.message == "2"){ // Unsccessfull
                	alert("There might be something wrong with the server. Please try again after sometime.");
                	window.location = $rootScope.baseUrl + "sign-in";
                }
                else if(response.data.message == "3"){ // Wrong Password
                	ctrl.oldPassword = "";
                    ctrl.changePasswordForm.password.$setPristine();
                }
            }
            else{
                alert("Something went wrong. Please check your internet connction and try again");
                window.location = $rootScope.baseUrl + "sign-in";
            }
        }, function error(response) {
            alert("Something went wrong. Please check your internet connction and try again.");
            window.location = $rootScope.baseUrl + "sign-in";
        });
    }

    return factory;
});