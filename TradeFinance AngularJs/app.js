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

      .state('home.createContract',{
        url:'/createContract',
        templateUrl:'templates/contractForm.html',
        controller:'homeController'
      }
      )

      .state('home.balance',{
        url:'/balanceInfo',
        templateUrl:'templates/balanceInfo.html',
        controller:'homeController'
      }
      )

      .state('home.currentTransaction',{
        url:'/currentTransaction',
        templateUrl:'templates/currentTransaction.html',
        controller:'homeController'
      }
      )

      .state('home.history',{
        url:'/history',
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
