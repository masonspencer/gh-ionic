'use strict';

/**
 * @ngdoc function
 * @name starter.controller:FeeditemCtrl
 * @description
 * # FeeditemCtrl
 * Controller of the starter
 */
angular.module('starter')
  .controller('ProductCtrl', function ($scope, $state, Ref, $stateParams, $firebaseArray, $timeout, Firebase) {
    var params = $stateParams.itemID;
    console.log(params);
    var authData = Ref.getAuth();
    
    // synchronize a read-only, synchronized array of geerItem, limit to most recent 10
    // var geerItems = $firebaseArray(Ref.child('products'));
    var conversations = $firebaseArray(Ref.child('conversations'));
    var products = $firebaseArray(Ref.child('products'));

    products.$loaded().then(function(x) {
        $scope.product = x.$getRecord(params);

    }).catch(function(error) {
        console.log("Error:", error);
    });
  
  
  $scope.newConversation = function() {
    var authData = Ref.getAuth();
    if (authData != null) {
      conversations.$add({
        productRef: params,
        members: [$scope.product.owner, authData.uid],
        
      }).then(function(ref) {
        var id = ref.key();
        console.log("added record with id " + id);
        conversations.$indexFor(id); // returns location in the array
        var profileConversations = new Firebase('https://blistering-torch-3665.firebaseio.com/profile/' + authData.uid + '/conversations/');
        var conversation = {}; 
        conversation[id] = true; 
          profileConversations.update(conversation);
        
        
        var ownerProfileConversations = new Firebase('https://blistering-torch-3665.firebaseio.com/profile/' + $scope.product.owner + '/conversations/');
        var ownerProfileConversation = {}; 
        ownerProfileConversation[id] = true; 
        ownerProfileConversations.update(ownerProfileConversation);
        
        $state.transitionTo('chatSingle', {conversationId: id}, { reload: true, inherit: false, notify: true });
        // $location.path('/chatSingle/' + id);
      });
  }
  else {
    $state.go("login");
  }
};

  });
