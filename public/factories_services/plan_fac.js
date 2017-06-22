(function(){
  angular.module('NALP')
    .factory('plan_fac', plan_fac)

    plan_fac.$inject = ['$http'];

    function plan_fac($http) {
      var api = '/plans/';
      var service = {
        createPlan: createPlan,
        getAllPlans: getAllPlans
      }
      function createPlan(id, data) {
        return $http.post(api + id, data);
      }
      function getAllPlans() {
        return $http.get(api);
      }
      return service;
    }
})()