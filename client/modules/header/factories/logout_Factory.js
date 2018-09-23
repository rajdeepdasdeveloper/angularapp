header.factory('logout_Factory', function($http, $location) {

    var factory = {}; 

    factory.deleteUserSession = function() {

    	var sessionCredentials = [{
			username : localStorage.getItem("username"),
			token : localStorage.getItem("token")
		}];

		$http({
	        method : "JSON",
	        data : sessionCredentials[0],
	        url : "http://angularapp.local/api/modules/sessionManagement/sessionDestroy.php",
	        headers: {'Content-Type' : 'application/json'}
	    })
	    .then(function success(response) {
	        if(response.data){
	            if(response.data.message == "1"){
	            	localStorage.clear();
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