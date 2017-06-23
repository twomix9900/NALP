(function () {
  angular.module('NALP')
    .directive('navbar', navbar);

  function navbar() {
    return {
      templateUrl: 'partials/navbar.html',
      controller: navbarCtrl,
      controllerAs: 'navbar_ctrl'
    }
  }

  navbarCtrl.$inject = ['auth', 'store', '$location', '$http'];

  function navbarCtrl(auth, store, $location, $http) {
    var vm = this;
    vm.login = login;
    vm.logout = logout;
    vm.auth = auth;


    function login() {
      var api = '/users/';
      auth.signin({}, function (profile, token) {
        store.set('profile', profile);
        store.set('id_token', token);

        $http.post(api, {
            email: profile.email
          })
          .then((newUser) => {
            store.set('current_user_id', newUser.data.user._id);
            console.log('new user : ', newUser);
          }, function (err) {
            var profile = store.get('profile');
            console.log('profile = ', profile)

          })
          .catch((err) => {
            console.log('couldnt post user', err);
            $http.get(api + 'email/' + profile.email)
              .then((user) => {
                console.log('existing user', user);
                store.set('current_user_id', user.data.user._id);
              }, function (err) {
                console.log('testing err happended while getting user ', err)
              })
            console.log('testing err happended')
          })
        $location.path('/search');
      }, function (error) {
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