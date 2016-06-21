'use strict';
/**
 * @ngdoc function
 * @name starter.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
 /*global angular*/
angular.module('starter')
  .controller('ChatSingleCtrl', function ($scope, Ref, $state, $stateParams, $firebaseObject, $firebaseArray, $timeout, Firebase) {
    var params = $stateParams;
    var authData = Ref.getAuth();
    // var addConversationRef = $firebaseArray(Ref.child('conversations/' + params.conversationId + '/messages'));
    var conversation = $firebaseArray(Ref.child('conversations').child(params.conversationId).child('messages'));
    $scope.messages = [];
    
    conversation.$loaded()
      .then(function(data) {
        angular.forEach(data, function(value, key) {
          $scope.messages.push(value);
          // $scope.messages.push(value);
              var userRef = new Firebase('https://blistering-torch-3665.firebaseio.com/profile/' + value.author);
              userRef.once('value', function(snap) {
                $scope.messages[key].userName = snap.val().userName;
                $scope.messages[key].gravatar = snap.val().gravatar;
              });
      });
    });


    // provide a method for adding a message
    $scope.addConversation = function(newMessage) {
      if( newMessage ) {
        // push a message to the end of the array
        conversation.$add({
          author: authData.uid,
          body: newMessage,
          time: Date.now()
        })
          // display any errors
          .catch(alert);
      }
    };
    

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });
