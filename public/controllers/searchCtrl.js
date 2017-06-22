(function() {
  angular.module('NALP')
  .controller('searchCtrl', searchCtrl)

  searchCtrl.$inject = ['plan_fac', '$state'];

  function searchCtrl(plan_fac, $state) {
    var vm = this;

    vm.plans = [];

    vm.clickGetPlans = function() {
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
    }
  }
})()