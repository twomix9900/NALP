(function(){
  angular.module('NALP')
    .factory('selectedPlans_fac', selectedPlans_fac)

    selectedPlans_fac.$inject = ['$http'];

    function selectedPlans_fac($http) {
      console.log('initializing selectedPlans...');
      var api = '/activities/';
      var service = {
        getPlans: getPlans
      }
      function getPlans(option, id) {
        console.log('what to get: ', api + option + '/' + id);
        return $http.get(api + option + '/' + id);
      }
      return service;
    }
})()