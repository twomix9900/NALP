(function(){
  angular.module('NALP')
  .factory('auth_fac', auth_fac)

  auth_fac.$inject = ['auth', '$state'];

  function auth_fac(auth, $state) {
    var service = {
      private: private
    }
    function private() {
      if(!auth.isAuthenticated) {
        $state.go('home')
      }
    }

    return service;
  }
})()