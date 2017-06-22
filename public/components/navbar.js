(function() {
  angular.module('NALP')
  .directive('navbar', navbar);

  function navbar() {
    return {
      templateUrl: 'partials/navbar.html',
      controller: navbarCtrl,
      controllerAs: 'navbar_ctrl'
    }
  }

  navbarCtrl.$inject = ['auth', 'store', '$location'];
  
  function navbarCtrl(auth, store, $location) {
    var vm = this;
    vm.login = login;
    vm.logout = logout;
    vm.auth = auth;

    function login() {
      auth.signin({}, function(profile, token) {
        store.set('profile', profile);
        store.set('id_token', token);
        $location.path('/search');
      }, function(error) {
        console.log('login error: ', error);
      });
    }

    function logout() {
      store.remove('profile');
      store.remove('id_token');
      auth.signout();
      $location.path('/search');
    }
    
  }
    
  
})()