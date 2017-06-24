(function() {
  angular.module('NALP')
  .controller('searchCtrl', searchCtrl)

  searchCtrl.$inject = ['plan_fac', '$state', 'store'];

  function searchCtrl(plan_fac, $state, store) {
    var vm = this;

    vm.search = {};
    vm.plans = [];

    vm.searchByCity = function(cityName) {
      console.log('SUBMITTED', cityName.city)
      plan_fac.getPlansByCity('city/' + cityName.city)
      .then((plans) => {
        console.log('plans = ', plans)
        vm.data = plans.data.plans;
      })
      .catch((err) => {
        console.log('error getting plans', err);
      })
    }

    vm.clickGetPlans = function() {
      console.log('clicked')
      plan_fac.getAllPlans()
      .then((plans) => {
        console.log(plans.data.plans)
        vm.data = plans.data.plans;
      }).catch((err) => {
        console.log('error getting plans', err);
      })
    }
    vm.goToPlan = function(p_id) {
      $state.go('plan', { plan_id: p_id });
      store.set('plan_id', p_id);
    }
  }
})()