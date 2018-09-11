app.controller('homeController',function($state,$scope,$http){

  var userString = localStorage.getItem("user");
  $scope.contractValues = [3000,5000,8000,10000];
  $scope.userModel = JSON.parse(userString);
  if($scope.userModel.role != "exporter"){
    $scope.contractButton=true;
  }

  $scope.goToCurrentTransaction = function(){
    $state.go('home.currentTransaction');
  }

  $scope.goToCreateContract = function(){
    $scope.contractExporterId=$scope.userModel.accountNumber;
    $state.go('home.createContract');
  }

  $scope.goToBalanceInfo = function(){

   let balancedata ={};
   let getBalanceUrl ='http://localhost:8080/user/getBalance';
   let config = {
     headers : {
                  'Content-Type': 'application/json',
                  'token':localStorage.getItem("token")
              }
   }

   $http.post(getBalanceUrl,balancedata,config).then(
     function(response){
       console.log("success")
       console.log(response);
       var currentBalanceJson = response.data;
    $scope.userModel.balance = currentBalanceJson.balance;
    console.log($scope.userModel.balance);
     },
     function(reason){
       console.log("failed");
       console.log(reason);
       $state.go('login');
     }

   );

    $state.go('home.balance');
  }

  $scope.goToAllContracts = function(){
    $state.go('home.history');
  }


});
