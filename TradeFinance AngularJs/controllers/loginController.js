app.controller('loginController', function($scope, $state , $http ,$mdToast ,$document , $stateParams) {


  //show toast on login failure
  $scope.showToastAccountVerify = function() {
     $mdToast.show (
        $mdToast.simple()
        .textContent('Check your email to verify your account')
        .hideDelay(3000)
     );
   }


   $scope.showToastForResetSuccess = function() {
      $mdToast.show (
         $mdToast.simple()
         .textContent('Your has been reset sucessfully ..')
         .hideDelay(3500)
      );
    }

   $scope.showToastAccountExist = function() {
      $mdToast.show (
         $mdToast.simple()
         .textContent('you are an existing user')
         .hideDelay(3000)
      );
    }

   $scope.showToast = function() {
      $mdToast.show (
         $mdToast.simple()
         .textContent('Login failed ..your email or password is wrong')
         .hideDelay(3000)
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
            $state.go('home');
          },
          function(reason){
            console.log(reason);
          $scope.loginFailed=true;
          }
        );
    }

    $scope.goToRegisteration = function(){
      $state.go('register');
    }

    var rolesArray =['Importer','Exporter','Customer'];
    $scope.roles=rolesArray;

    $scope.confirmPassword=false;



    $scope.getRegistered = function(){

      if($scope.registerPassword==$scope.registerConfirmPassword){
        var registerFormData = {

          "name":$scope.registerUsername,
          "email":$scope.registerEmail,
          "password":$scope.registerPassword,
          "mobileNo":$scope.registerMobileNo,
          "city":$scope.registerCity,
          "role":$scope.registerRole,

        }

        var registerUrl = 'http://localhost:8080/user/register';
        $http.post(registerUrl,registerFormData).then( function(response){
          console.log(response);
          $state.go('login');
          $scope.showToastAccountVerify();
        } ,function(reason){
          console.log(reason);
          $scope.showToastAccountExist();
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


      $scope.resetFormPasswordMsg=false;
    $scope.submitResetPassword = function(){

      if($scope.resetFormPassword==$scope.resetFormConfirmPassword){

        console.log($stateParams.id);
        var resetPasswordData = {

          newPassword:$scope.resetFormPassword,
          uuid:$stateParams.id

        };
        var resetPasswordUrl ='http://localhost:8080/user/resetPassword';
        $http.post(resetPasswordUrl,resetPasswordData).then(
          function(response){
            console.log(response);
            $state.go('login');
            $scope.showToastForResetSuccess();
          }
          ,function(reason){
            console.log(reason);
            $state.go('sessionOut');
          });


      }else{
        $scope.resetFormPasswordMsg=true;
      }




    }



});
