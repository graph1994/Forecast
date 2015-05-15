
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource'])


// ROUTES
weatherApp.config(function ($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })
    
    .when('/forecast', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
    
});
weatherApp.service('cityService', function() {
   
    this.city = "";
    this.days = 2;
    
});

// CONTROLLERS
weatherApp.controller('homeController', ['$scope','$location', 'cityService', function($scope,$location, cityService) {
    
    $scope.city = cityService.city;
    $scope.days = cityService.days;
    $scope.$watch('city', function() {
       cityService.city = $scope.city; 
    });
    $scope.$watch('days', function() {
       cityService.days = $scope.days; 
    });

    $scope.submit = function(){
    	$location.path("/forecast");
    	sessionStorage.setItem('city', $scope.city);
    	
    };
    
}]);

weatherApp.controller('forecastController', ['$scope','$location', '$resource','cityService', function($scope, $location, $resource,cityService) {
    cityService.city = sessionStorage.getItem('city');
    $scope.city = cityService.city;
    $scope.days = cityService.days;
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {
    	callback:"JSON_CALLBACK"},{get:{method:"JSONP"}});
    
    $scope.weatherResult = $scope.weatherAPI.get({q:$scope.city, cnt:$scope.days});
    $scope.convertToF = function(degK){
    	return Math.round((1.8 * (degK-273)) + 32);
    }
    $scope.convertToDate = function(dt){
    	return new Date(dt * 1000);
    }
}]);
 
/*weatherApp.directive("weatherPanel",function(){
	return{
		templateUrl:'pages/weatherPanel.html',
		replace:true,
		scope:{
			weatherDay: "="
		}
	}
});
*/