'use strict';

/**
 * @ngdoc function
 * @name starter.controller:ListItemCtrl
 * @description
 * # ListItemCtrl
 * Controller of the starter
 */
angular.module('starter')
  .controller('listItemCtrl', function ($scope, $state, Ref, $firebaseArray, $timeout, $cordovaCamera, $stateParams) {
    var geerItems = $firebaseArray(Ref.child('products'));
	var authData = Ref.getAuth();
    var options = {
		quality : 75,
		destinationType : Camera.DestinationType.DATA_URL,
		sourceType : Camera.PictureSourceType.CAMERA,
		allowEdit : true,
		encodingType: Camera.EncodingType.JPEG,
		popoverOptions: CameraPopoverOptions,
		targetWidth: 500,
		targetHeight: 500,
		saveToPhotoAlbum: false
		};
		
	$scope.images = [];
	
	$scope.addItem = function(newItem) {
	geerItems.$add({ owner: authData.uid }).then(function(ref) {
		var id = ref.key();
		console.log("added record with id " + id);
		var ref = new Firebase('https://blistering-torch-3665.firebaseio.com/products/' + id);
		// var images = ref.child('images');
		
		
		  if( newItem ) {
			// push a message to the end of the array
			ref.update({
			  name: newItem.name,
			  price: newItem.price,
			  description: newItem.description,
			  tags: newItem.tags,
			  images: $scope.images
			});
			$state.transitionTo('product', {itemID:id}, { reload: true, inherit: true, notify: true });
		  }
		
		
		

	});
	};
	
	$scope.upload = function() {
        $cordovaCamera.getPicture(options).then(function(imageData) {
	
				$scope.images.push(imageData);
				// images.push({image: imageData});
			}, function(error) {
					console.error(error);
			});
		};
  });
