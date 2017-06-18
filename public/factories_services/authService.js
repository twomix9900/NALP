(function() {
  angular.module('NALP')
  .service('authService', authService)

  authService.$inject = ['$state', 'angularAuth0', '$timeout' ];

  function authService($state, angularAuth0, $timeout) {
    function login() {
      angularAuth0.authorize();
    }

    function handleAuthentication() {
      angularAuth0.parseHash(function(err, authResult) {
        if(authResult && authResult.accessToken && authResult.idToken) {
          setSession(authResult);
          $state.go('search');
        } else if (err) {
          $timeout(function() {
            $state.go('search');
          });
          console.log(err);
        }
      })
    }

    function setSession(authResult) {
      //sets time access token will expire
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
    }
    
    function logout() {
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
    }

    function isAuthenticated() {
      //check if token is past expire time
      let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() > expiresAt;
    }


    return { 
      login: login,
      handleAuthentication: handleAuthentication,
      setSession: setSession,
      logout: logout,
      isAuthenticated: isAuthenticated
    };
  }

})();