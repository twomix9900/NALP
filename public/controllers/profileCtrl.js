(function() {
  angular.module('NALP')
  .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$http', 'store', 'auth_fac'];

  function profileCtrl($http, store, auth_fac) {

    document.body.style.backgroundImage = "";
    
    auth_fac.private();
    
    var vm = this;
    vm.getMessage = getMessage;
    vm.getSecretMessage = getSecretMessage;
    vm.message;

    vm.profile = store.get('profile');

    function getMessage() {
      console.log('clicked')
      $http.get('http://localhost:3002/api/public', {
        skipAuthorization: true
      })
      .then((res) => {
        console.log('results = ', res)
        vm.message = res.data.message;
      });
    }

    function getSecretMessage() {
      $http.get('http://localhost:3002/api/private')
      .then((res) => {
        vm.message = res.data.message
      });
    }

  }
})()