'use strict';

/**
 * @ngdoc function
 * @name starter.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the starter
 */
angular.module('starter')
  .controller('MainCtrl', function ($scope, $state, Ref, $firebaseArray, $timeout) {
    // synchronize a read-only, synchronized array of geerItem, limit to most recent 10
     $scope.products = $firebaseArray(Ref.child('products'));
    // var testt = $firebaseArray(Ref);
    // display any errors

    // // provide a method for adding a message
    // $scope.addMessage = function(newMessage) {
    //   if( newMessage ) {
    //     // push a message to the end of the array
    //     $scope.messages.$add({text: newMessage})
    //       // display any errors
    //       .catch(alert);
    //   }
    // };
    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
    $scope.images = [];
    
    // $scope.getImage = function (productId) {
    //   // Get a database reference to our posts
    //   var ref = new Firebase('https://blistering-torch-3665.firebaseio.firebaseio.com/products/' + productId + '/images');
    //   // Attach an asynchronous callback to read the data at our posts reference
    //   ref.limitToLast(1).on("value", function(snapshot) {
    //     console.log(snapshot.val());
    //     $scope.images[productId] = snapshot.val();
    //   }, function (errorObject) {
    //     console.log("The read failed: " + errorObject.code);
    //   });
    // };
    
    
  });
