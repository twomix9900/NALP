(function(){
  angular.module('NALP')
    .factory('selectedPlans_fac', selectedPlans_fac)

    selectedPlans_fac.$inject = ['$http'];

    function plan_fac($http) {
      var api = '/activities/';
      var service = {
        getPlans: getPlans
      }
      function getPlans(option, id) {
        return $http.get(api + option + '/' + id);
      }
      return service;
    }
})()