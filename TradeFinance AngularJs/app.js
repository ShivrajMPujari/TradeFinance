var app = angular.module("MyApp",['ngMessages', 'ngMaterial','ui.router']);

app.config(function($stateProvider,$urlRouterProvider){

    $stateProvider.state('login',{

        url:'/login',
        templateUrl:'templates/login.html',
        controller:'loginController'
                                  }
      )
      .state('register',{

        url:'/register',
        templateUrl:'templates/register.html',
        controller:'loginController'
      }
      )
      .state('home',{
        url:'/home',
        templateUrl:'templates/home.html',
        controller:'homeController'
      }
      )

      .state('home.accountInfo',{
        url:'',
        templateUrl:'templates/accountInfo.html',
        controller:'homeController'
      }
      )

      .state('home.createContract',{
        url:'/home/createContract',
        templateUrl:'templates/contractForm.html',
        controller:'homeController'
      }
      )

      .state('home.currentTransaction',{
        url:'/home/createContract',
        templateUrl:'templates/currentTransaction.html',
        controller:'homeController'
      }
      )

      .state('home.history',{
        url:'/home/history',
        templateUrl:'templates/allContract.html',
        controller:'homeController'
      }
      )

      .state('sessionOut',{
        url:'/session-out',
        templateUrl:'templates/sessionOut.html',
        controller:'loginController'
      } )

      .state('forgotPassword',{
        url:'/forgot_password',
        templateUrl:'templates/ForgotPassword.html',
        controller:'loginController'
      } )

      .state('resetPassword',{
        url:'/reset_password/:',
        templateUrl:'templates/resetPassword.html',
        controller:'loginController'
      })
      ;

      $urlRouterProvider.otherwise('/login');

});
