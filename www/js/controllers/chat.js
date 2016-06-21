'use strict';

/**
 * @ngdoc function
 * @name starter.controller:Chat2Ctrl
 * @description
 * # Chat2Ctrl
 * Controller of the starter
 */
angular.module('starter')
  .controller('ChatCtrl', function ($scope, $state, Ref, $firebaseObject, $firebaseArray, $timeout, Firebase) {
 
 var authData = Ref.getAuth();
 var userID = authData.uid;
 var usersConversations = $firebaseArray(Ref.child('profile').child(userID).child('conversations'));
 $scope.conversations = [];
 var i = '';
 
 
  usersConversations.$loaded()
    .then(function(data) {
      angular.forEach(data, function(value, key) {
       
        $firebaseArray(Ref.child('conversations').child(value.$id).child('messages').limitToLast(1)).$loaded().then(function(data) {
           $scope.conversations.push(data);
           $scope.conversations[key].push(value.$id);
        });
        
        // console.log(key);
        $firebaseArray(Ref.child('conversations').child(value.$id).child('members')).$loaded().then(function(data) {
          // console.log(data);
          for (i = 0; i < data.length; i++) { 
            if (data[i].$value === userID) {
              console.log('me');
            }
            else {
              var userRef = new Firebase('https://blistering-torch-3665.firebaseio.firebaseio.com/profile/' + data[i].$value);
              userRef.once('value', function(snap) {
                console.log(snap.val().userName);
                $scope.conversations[key].push(snap.val().userName);
                $scope.conversations[key].push(snap.val().gravatar);
              });
            }
          }
          
        });        
      
      });
      
      
    });
 

 
 
  });
