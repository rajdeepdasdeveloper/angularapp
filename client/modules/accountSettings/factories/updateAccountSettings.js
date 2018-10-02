accountSettings.factory('updateAccountSettings', function($rootScope, $http, $location, $timeout) {

    var factory = {};
    factory.updateBasicAccountSettings = function(basicUserInfo, ctrl) {

    	basicUserInfo.username = localStorage.getItem("username");
		basicUserInfo.token = localStorage.getItem("token");
		basicUserInfo.first_name = ctrl.firstname;
		basicUserInfo.last_name = ctrl.lastname;
		basicUserInfo.password = ctrl.password;
		basicUserInfo.spam_protection = ctrl.spam_protection;

    	$http({
            method : "JSON",
            data : basicUserInfo,
            url : $rootScope.apiURL + "accountSettings/updateAccountSettings.php",
            headers: {'Content-Type' : 'application/json'}
        })
        .then(function success(response) {
            if(response.data){
                ctrl.status = response.data.message;
                if(response.data.message == "2"){
                	alert("There might be something wrong with the server. Please try again after sometime.");
                	window.location = $rootScope.baseUrl + "sign-in";
                }
                if(response.data.message == "3"){
                	ctrl.password = "";
                }
            }
            else{
                alert("Something went wrong. Please check your internet connction and try again");
                window.location = $rootScope.baseUrl + "sign-in";
            }
        }, function error(response) {
            alert("Something went wrong. Please check your internet connction and try again");
            window.location = $rootScope.baseUrl + "sign-in";
        });
    }

    return factory;
});