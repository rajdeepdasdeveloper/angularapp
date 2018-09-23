feUserRegister.factory('registerOperation', function($http) {

    var factory = {}; 

    factory.register = function(newUser, ctrl) {

    	$http({
            method : "JSON",
            data : newUser[0],
            url : "http://angularapp.local/api/modules/person/register.php",
            headers: {'Content-Type' : 'application/json'}
        })
        .then(function success(response) {
            if(response.data){
                ctrl.status = response.data.message;
                //alert(response.data.message);
            }
            else{
                alert("Something went wrong. Please check your internet connction and try again. su");
                window.location = "http://angularapp.nickosys.com/signup";
            }
        }, function error(response) {
            alert("Something went wrong. Please check your internet connction and try again. fa");
            window.location = "http://angularapp.nickosys.com/signup";
        });
    }

    return factory;
});