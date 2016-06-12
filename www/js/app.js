// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
	'ionic',
	'ngCordova',
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'firebase.ref',
    'firebase.auth',
    'angularMoment',
    'ui.router',
    'lr.upload'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.run(["$rootScope", "$state", function($rootScope, $state) {
	$rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
	  // We can catch the error thrown when the $requireAuth promise is rejected
	  // and redirect the user back to the home page
	  if (error === "AUTH_REQUIRED") {
		$state.go("login");
	  }
	});
}])
.run(["$rootScope", "$state", function($rootScope, $state) {
	$rootScope.previousState;
	$rootScope.currentState;
	$rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
	  $rootScope.previousState = from.name;
	  $rootScope.currentState = to.name;
	  console.log('Previous state:'+$rootScope.previousState);
	  console.log('Current state:'+$rootScope.currentState);
	});
}])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('feed', {
      url: '/feed',
      templateUrl: 'templates/main.html',
      controller: 'MainCtrl',
      resolve: {
        // controller will not be loaded until $waitForAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        "currentAuth": ["Auth", function(Auth) {
          // $waitForAuth returns a promise so the resolve waits for it to complete
          return Auth.$waitForAuth();
        }]
      }
    })
    .state('product', {
      url: '/product/:itemID',
        templateUrl: 'templates/product.html',
        controller: 'ProductCtrl',
        resolve: {
          // controller will not be loaded until $waitForAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          "currentAuth": ["Auth", function(Auth) {
            // $waitForAuth returns a promise so the resolve waits for it to complete
            return Auth.$waitForAuth();
          }]
        }
    })
    .state('listItem', {
      url: '/listItem',
      cache: false, //required
        templateUrl: 'templates/listItem.html',
        controller: 'listItemCtrl',
        resolve: {
          // controller will not be loaded until $requireAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          "currentAuth": ["Auth", function(Auth) {
            // $requireAuth returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireAuth();
          }]
        }
    })
    .state('login', {
      url: '/login/',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl',
        resolve: {
          // controller will not be loaded until $waitForAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          "currentAuth": ["Auth", function(Auth) {
            // $waitForAuth returns a promise so the resolve waits for it to complete
            return Auth.$waitForAuth();
          }]
        }
    })
    .state('account', {
      url: '/account',
        templateUrl: 'templates/account.html',
        controller: 'AccountCtrl',
        resolve: {
          // controller will not be loaded until $requireAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          "currentAuth": ["Auth", function(Auth) {
            // $requireAuth returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireAuth();
          }]
        }
    })
    .state('chat', {
      url: '/chat',
        templateUrl: 'templates/chat.html',
        controller: 'ChatCtrl',
        resolve: {
          // controller will not be loaded until $requireAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          "currentAuth": ["Auth", function(Auth) {
            // $requireAuth returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireAuth();
          }]
        }
    })
    .state('chatSingle', {
      url: '/chat/:conversationId',
        templateUrl: 'templates/chatSingle.html',
        controller: 'ChatSingleCtrl',
        resolve: {
          // controller will not be loaded until $requireAuth resolves
          // Auth refers to our $firebaseAuth wrapper in the example above
          "currentAuth": ["Auth", function(Auth) {
            // $requireAuth returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireAuth();
          }]
        }
    });



  $urlRouterProvider.otherwise('/feed');

});
