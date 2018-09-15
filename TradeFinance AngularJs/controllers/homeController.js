app.controller('homeController',function($state,$scope,$http,$mdDialog){

  var userString = localStorage.getItem("user");
  $scope.contractValues = [3000,5000,8000,10000];
  $scope.userModel = JSON.parse(userString);
  if($scope.userModel.role != "exporter"){
    $scope.contractButton=true;
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


$scope.logout = function(){

$state.go('login');

}

  $scope.createContract = function(){

    let contractData = {

    contractId :  $scope.contractFormID,
    contractDescription:$scope.contractFormDescription,
      importerId:$scope.contractImporterAccountId,
      exporterId:$scope.userModel.accountNumber,
      customId:$scope.contractCustomAccountId,
      importerBankId:$scope.contractImporterBankAccountId,
      insuranceId:$scope.contractInsuranceId,
      value:$scope.contractFormValue,
      portOfLoading:$scope.contractPortOfLoading,
      portOfEntry:$scope.contractPortOfEntry

    };

    let contractCreationUrl = 'http://localhost:8080/user/createContract';

    let config = {
      headers : {
                   'Content-Type': 'application/json',
                   'token':localStorage.getItem("token")
               }
    };

    $http.post(contractCreationUrl,contractData,config).then(
      function(response){
        console.log("success")
        console.log(response);
  //      localStorage.setItem("contractId",response.data.contract.contractId);
      },
      function(reason){
        console.log("failed");
        console.log(reason);
        $state.go('login');
      }

    );

  }

  // $scope.goToAllContracts = function(){
  //   $state.go('home.history');
  // }
  $scope.goToCurrentTransaction = function(){

    let mydata = {};
    let urlAllContracts = 'http://localhost:8080/user/getAllContract';

    let config = {
      headers : {
                   'Content-Type': 'application/json',
                   'token':localStorage.getItem("token")
               }
    };

    $http.post(urlAllContracts,mydata,config).then(function(response){

      console.log("success");
      console.log(response);
      $scope.allContracts = response.data.contracts;
        $state.go('home.currentTransaction');
    },

    function(reason){
      console.log("failed");
      console.log(reason);
      $state.go('login');

    }

  );

  }



  $scope.goToAllContracts = function (){

      let mydata = {};
      let urlAllContracts = 'http://localhost:8080/user/getAllContract';

      let config = {
        headers : {
                     'Content-Type': 'application/json',
                     'token':localStorage.getItem("token")
                 }
      };

      $http.post( urlAllContracts,mydata,config ).then(

        function(response){
          console.log("success");
          console.log(response);
          $scope.allContracts = response.data.contracts;
          $state.go('home.history');

        },
        function(reason){
          console.log("failed");

          console.log(reason);
          $state.go('login');
        }

      );

  }


  $scope.showAdvanced = function(ev, item) {
    $mdDialog.show({
        controller: DialogController,
        templateUrl: 'templates/contractRead.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        locals: {
            items: item
        },
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
};

function DialogController($scope, items) {
    $scope.contract = items;
    // $scope.star=stars;

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.hide = function() {
        $mdDialog.hide();
    };
}



});
