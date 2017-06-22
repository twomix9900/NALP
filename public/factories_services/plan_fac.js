(function(){
  angular.module('NALP')
    .factory('plan_fac', plan_fac)

    plan_fac.$inject = ['$http'];

    function plan_fac($http) {
      var api = '/plans/';
      var service = {
        createPlan: createPlan
      }
      function createPlan(id, data) {
        return $http.post(api + id, data);
      }
      return service;
    }
})()