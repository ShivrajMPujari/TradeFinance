app.controller('loginController', function($scope, $state , $http ,$mdToast ,$document , $stateParams,loginService) {

    $scope.showToastCommon = function(message) {
       $mdToast.show (
          $mdToast.simple()
          .textContent(message)
          .hideDelay(4000)
       );
     }

   $scope.loginFailed=false;
    $scope.submitLoginForm = function() {
        console.log($scope.userEmail);
        console.log($scope.userPassword);
        var formData = {
          email:$scope.userEmail,
          password:$scope.userPassword
        }

        var loginUrl ='http://localhost:8080/user/login';
        var responseObj={};

        $http.post(loginUrl,formData).then(
          function(response){
            console.log(response);
            userObj = loginService.clearStorageOnLogin("user");
            userObj=response.data.user;
            console.log(userObj);
              userJsonString = JSON.stringify(userObj);
              localStorage.setItem("user",userJsonString);
            $scope.showToastCommon(response.data.message);
            $state.go('home');
          },
          function(reason){
            console.log(reason.data.message);
              $scope.showToastCommon(reason.data.message);
          $scope.loginFailed=true;
          }
        );
    }

    $scope.goToRegisteration = function(){
      $state.go('register');
    }

    var rolesArray =['Importer','Exporter','Custom','ImporterBank','ExporterBank'];
    $scope.roles=rolesArray;

    $scope.confirmPassword=false;

    var bankArray =['SBI','BOI','CANARA'];
    $scope.banks = bankArray;

    $scope.getRegistered = function(){

      if($scope.registerPassword==$scope.registerConfirmPassword){
        let roleStr= $scope.registerRole;
        var registerFormData = {

          "name":$scope.registerUsername,
          "email":$scope.registerEmail,
          "password":$scope.registerPassword,
          "mobileNo":$scope.registerMobileNo,
          "city":$scope.registerCity,
          "role":roleStr.toLowerCase(),
          "bank":$scope.registerBank,
        }

        var registerUrl = 'http://localhost:8080/user/register';
        $http.post(registerUrl,registerFormData).then( function(response){
          console.log(response);
          $state.go('login');
          $scope.showToastCommon(response.data.message);
        } ,function(reason){
          console.log(reason);
          $scope.showToastCommon(reason.data.message);
        } );
      }else{
        $scope.confirmPassword=true;
        return;
      }

    }

    $scope.goToLogin = function(){
      $state.go('login');
    }

    $scope.goToForgotPassword = function(){
      $state.go('forgotPassword');
    }




    $scope.forgotPassword= function (){

      var data ={
        email:$scope.emailForForgotPassword
      }

      var forgotPasswordUrl = 'http://localhost:8080/user/forgotPassword';

      $http.post(forgotPasswordUrl,data).then(function(response){
        console.log(response);
        if(response.data.code==200){
            $scope.showToastCommon(response.data.message);
            $state.go('login');
        }
      },
      function(reason){
        console.log(reason);
        $scope.showToastCommon(reason.data.message);
      }
    );

    }

  $scope.resetFormPasswordMsg=false;
  $scope.submitResetPassword = function(){

    if($scope.resetFormPassword==$scope.resetFormConfirmPassword){

      console.log($stateParams.id);
      var resetPasswordData = {

        newPassword:$scope.resetFormPassword,
        uuid:$stateParams.id

      }
      var resetPasswordUrl ='http://localhost:8080/user/resetPassword';
      $http.post(resetPasswordUrl,resetPasswordData).then(
        function(response){
          console.log(response);
          $state.go('login');
          $scope.showToastCommon(response.data.message);
        }
        ,function(reason){
          console.log(reason);
          $state.go('sessionOut');
            $scope.showToastCommon(reason.data.message);
        });


    }else{
      $scope.resetFormPasswordMsg=true;
    }

  }



});
