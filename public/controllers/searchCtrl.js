(function() {
  angular.module('NALP')
  .controller('searchCtrl', searchCtrl)

  searchCtrl.$inject = ['plan_fac', '$state', 'store'];


  function searchCtrl(plan_fac, $state, store) {

    var vm = this;
    vm.search = {};
    vm.cityPlans = [];
    vm.allPlans  = [];

    vm.searchByCity = function(cityName) {
      console.log('SUBMITTED', cityName.city)
      plan_fac.getPlansByCity('city/' + cityName.city)
      .then((plans) => {
        console.log('plans = ', plans)
        vm.cityPlans = plans.data.plans;
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
        vm.allPlans = plans.data.plans;
      }).catch((err) => {
        console.log('error getting plans', err);
      })
    }
   
    var err_callback = function(err) {
      console.log('err >>', err);
    }

    vm.goToPlan = function(p_id) {
      plan_fac
        .show(p_id)
        .then(function(res) {
          console.log(res.data, '<< success')
          $state.go('plan', {plan_id: res.data.plan._id})
        }, err_callback)
      // $state.go('plan', { plan_id: p_id });
      // store.set('plan_id', p_id);
    }
  }
})()