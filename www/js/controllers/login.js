'use strict';
/**
 * @ngdoc function
 * @name starter.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('starter')
  .controller('LoginCtrl', function ($scope, Auth, $state, $q, Ref, $firebaseArray, $timeout, $ionicPopup, Firebase, $rootScope, $ionicHistory) {
    $scope.oauthLogin = function(provider) {
      $scope.err = null;
      Auth.$authWithOAuthPopup(provider, {rememberMe: true}).then(redirect, showError);
    };

    $scope.anonymousLogin = function() {
      $scope.err = null;
      Auth.$authAnonymously({rememberMe: true}).then(redirect, showError);
    };

    $scope.passwordLogin = function(email, pass) {
      if( !email ) {
        $scope.err = 'Please enter an email.';
        $ionicPopup.alert({
          title: 'Email Invalid',
          template: 'Please enter a valid email.'});
      }
      else if( !pass ) {
        $scope.err = 'Please enter a password.';
        $ionicPopup.alert({
          title: 'Password Empty',
          template: 'Please enter a password'});
      }
      else {
        $scope.err = null;
        Auth.$authWithPassword({email: email, password: pass}, {rememberMe: true}).then(
          redirect, showError
        );
      }
    };

    $scope.createAccount = function(email, pass, confirm, firstName, lastName, userName, termsConditions) {
      $scope.err = null;
      if( !email ) {
        $scope.err = 'Please enter an email.';
        $ionicPopup.alert({
          title: 'Email Invalid',
          template: 'Please enter a valid email.'});
      }
      else if( !pass ) {
        $scope.err = 'Please enter a password.';
        $ionicPopup.alert({
          title: 'Password Empty',
          template: 'Please enter a password'});
      }
      else if( pass !== confirm ) {
        $scope.err = 'Passwords do not match.';
        $ionicPopup.alert({
          title: 'Password Confirmation Invalid',
          template: 'Passwords do not match.'});
      }
      else if( !firstName ) {
        $scope.err = 'Please enter a first name.';
        $ionicPopup.alert({
          title: 'Firstname Empty',
          template: 'Please enter a first name.'});
      }
      else if( !lastName ) {
        $scope.err = 'Please enter a last name.';
        $ionicPopup.alert({
          title: 'Last Name Empty',
          template: 'Please enter a last name.'});
      }
      else if( !userName ) {
        $scope.err = 'Please enter a user name.';
        $ionicPopup.alert({
          title: 'Username Empty',
          template: 'Please enter a user name.'});
      }
      else if( !termsConditions ) {
        $scope.err = 'Please accept the Terms and Conditions.';
        $ionicPopup.alert({
          title: 'Terms and Conditions',
          template: 'Please read and accept the Terms and Conditions'});
      }
      else {
        Auth.$createUser({email: email, password: pass})
          .then(function () {
            // authenticate so we have permission to write to Firebase
            return Auth.$authWithPassword({email: email, password: pass}, {rememberMe: true});
          })
          .then(function(authData) {
            console.log(authData.uid); //should log new uid.
            return createProfile(authData);
          })
          // .then(createProfile)
          .then(redirect, showError);
      }

      function createProfile(authData) {
        var profile = new Firebase('https://blistering-torch-3665.firebaseio.com/profile/' + authData.uid);
        // var profile = $firebaseArray(Ref.child('profile/' + authData.uid));
        profile.set({
          email: email,
          gravatar: authData.password.profileImageURL,
          provider: authData.provider,
          firstName: firstName,
          lastName: lastName,
          userName: userName
        });
      }
    };

    function firstPartOfEmail(email) {
      return ucfirst(email.substr(0, email.indexOf('@'))||'');
    }

    function ucfirst (str) {
      // inspired by: http://kevin.vanzonneveld.net
      str += '';
      var f = str.charAt(0).toUpperCase();
      return f + str.substr(1);
    }

  

    function redirect() {
      if ($rootScope.previousState != null) {
		    $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go($rootScope.previousState, {}, {location: "replace", reload: true});
      }
      else {
        $state.go('feed');
      }
    }

    function showError(err) {
      $scope.err = err;
    }


  });
