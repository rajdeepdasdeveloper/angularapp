feUserLogIn.factory('loginAuthOperation', function($rootScope, $http, $location, $timeout) {

    var factory = {}; 
    factory.loginAuth = function(loginCredentials, ctrl) {
        ctrl.disabled = true;
		$http({
            method : "JSON",
            data : loginCredentials[0],
            url : $rootScope.apiURL + "person/login.php",
            headers: {'Content-Type' : 'application/json'}
        })
        .then(function success(response) {
            if(response.data){
                if(response.data.message == "1"){
                    ctrl.status = "Invalid Username.";
                    ctrl.disabled = false;
                }
                else if(response.data.message == "0"){
                    ctrl.status = "User is inactive, please activate your account by clicking on the link which is we have sent you.";
                    ctrl.disabled = false;
                }
                else if(response.data.message == "2"){
                    ctrl.status = "Invalid Username or Password.";
                    ctrl.disabled = false;
                }
                else if(response.data.message == "3"){
                    ctrl.status = "Opps! There must be something wrong with the server. Please try again in sometime.";
                    ctrl.disabled = false;
                }
                else if(response.data.message == "4"){
                    ctrl.status = "Fields can not be empty.";
                    ctrl.disabled = false;
                }
                else if(typeof response.data.message === 'object'){
                    if (typeof(Storage) !== "undefined") {
                        localStorage.setItem("username", response.data.message.username);
                        localStorage.setItem("token", response.data.message.token);
                        ctrl.status = "Login Success."; 
                        $timeout(function(){ 
                           $location.url('/dashboard');
                        }, 2000);
                        
                    } else {
                        ctrl.status = "Sorry! You don't seem to be running this application in an updated browser. Please update your browser or try a differnt one.";
                        ctrl.disabled = false;
                    }
                }
            }
            else{
                alert("Something went wrong. Please check your internet connction and try again.");
                window.location = $rootScope.baseUrl + "sign-in";
            }
        }, function error(response) {
            alert("Something went wrong. Please check your internet connction and try again.");
            window.location = $rootScope.baseUrl + "sign-in";
        });
	}

    return factory;
});