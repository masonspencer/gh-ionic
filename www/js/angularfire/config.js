angular.module('firebase.config', [])
  .constant('FBURL', 'https://blistering-torch-3665.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password','facebook','google','twitter','github'])

  .constant('loginRedirectPath', '/login');
