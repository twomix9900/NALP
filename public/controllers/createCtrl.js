(function() {
  angular.module('NALP', [])
  .controller('createCtrl', function($scope) {
    $scope.create = {
      text: 'some title',
      location: 'some place'
    };
  })

  // createCtrl.$inject = ['$scope', function($scope) {
  //   $scope.create = {
  //     text: '',
  //     location: ''
  //   }
  // }];

  function createCtrl() {
    
  }
})()