(function(){
  angular.module('NALP')
    .factory('plan_fac', plan_fac)

    plan_fac.$inject = ['$http'];

    function plan_fac($http) {
      var api = '/plans/';
      var service = {
        createPlan: createPlan,
        getAllPlans: getAllPlans,
        getPlansByCity: getPlansByCity,
        auto_suggest: auto_suggest,
        show: show,
        mark_plan_complete: mark_plan_complete,
        mark_plan_incomplete: mark_plan_incomplete,
        bookmark: bookmark
      }
      function createPlan(id, data) {
        return $http.post(api + id, data);
      }
      function getAllPlans() {
        return $http.get(api);
      }
      function getPlansByCity(params) {
        return $http.get(api + params);
      }
      function auto_suggest(data) {
        return $http.post('/yelpapi', data);
      }
      function show(id) {
        return $http.get(api + id);
      }
      function mark_plan_complete(id, data) {
        return $http.post(api + '/mark-complete/' + id, data)
      }
      function mark_plan_incomplete(id, data) {
        return $http.post(api + '/mark-incomplete/' + id, data);
      }
      function bookmark(id, data) {
        return $http.post(api + '/bookmark/' + id, data);
      }
      return service;
    }
})()