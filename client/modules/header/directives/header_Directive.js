header.directive("headerDirective", function() {
    return {
       templateUrl : "client/modules/header/partials/partial_header.html",
	   controller: "Ctrl_header",
	   controllerAs: "CtrlAs_header"
    };
});

/* <sample-Directive></sample-Directive> */