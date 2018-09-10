app.controller('homeController',function($state,$scope){

  var userString = localStorage.getItem("user");
  $scope.userModel = JSON.parse(userString);

  

});
