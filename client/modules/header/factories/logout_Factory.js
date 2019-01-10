header.factory('logout_Factory', function($rootScope, $http, $location) {

    var factory = {}; 

    factory.deleteUserSession = function() {

    	var sessionCredentials = [{
			username : localStorage.getItem("username"),
			token : localStorage.getItem("token")
		}];

		$http({
	        method : "JSON",
	        data : sessionCredentials[0],
	        url : $rootScope.apiURL + "sessionManagement/sessionDestroy.php",
	        headers: {'Content-Type' : 'application/json'}
	    })
	    .then(function success(response) {
	        if(response.data){
	            if(response.data.message == "1"){
	            	localStorage.removeItem('token');
	            	$location.url('/login');
	       		}
	       		else if(response.data.message == "0"){
	       			$location.url('/login');
	       		}
	        }
	    }, 
	    function error(response) {
	       $location.url('/login');
	    });
	};

    return factory;
});