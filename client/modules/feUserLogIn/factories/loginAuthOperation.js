feUserLogIn.factory('loginAuthOperation', function($rootScope, $http, $location, $timeout) {

    var factory = {}; 

    factory.loginAuth = function(loginCredentials, ctrl) {
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
                }
                else if(response.data.message == "0"){
                    ctrl.status = "User is inactive, please activate your account by clicking on the link which is we have sent you.";
                }
                else if(response.data.message == "2"){
                    ctrl.status = "Invalid Username or Password.";
                }
                else if(response.data.message == "3"){
                    ctrl.status = "Opps! There must be something wrong with the server. Please try again in sometime.";
                }
                else if(response.data.message == "4"){
                    ctrl.status = "Fields can not be empty.";
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
                    }
                }
            }
            else{
                alert("Something went wrong. Please check your internet connction and try again. su");
                window.location = "http://angularapp.nickosys.com/sign-in";
            }
        }, function error(response) {
            alert("Something went wrong. Please check your internet connction and try again. fa");
            window.location = "http://angularapp.nickosys.com/sign-in";
        });
	}

    return factory;
});