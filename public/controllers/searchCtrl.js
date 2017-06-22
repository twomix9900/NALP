(function() {
  angular.module('NALP')
  .controller('searchCtrl', searchCtrl)

  searchCtrl.$inject = ['plan_fac', '$state'];

  function searchCtrl(plan_fac, $state) {
    var vm = this;

    vm.dummydata = [
      {title: 'Best LA'},
      {title: 'Best NYC'},
      {title: 'Best Japan'},
      {title: 'Best Miami'},
      {title: 'Food it up'},
      {title: 'yeezy'},
      {title: 'hypebeast'},
    ];
    vm.clickGetPlans = function() {
      plan_fac.getAllPlans()
      .then((plans) => {
        console.log(plans.data.plans)
        vm.dummydata = plans.data.plans;
      }).catch((err) => {
        console.log('error getting plans', err);
      })
    }
    vm.goToPlan = function(p_id) {
      console.log('p_id', p_id)
      
      $state.go('plan', { id: p_id });
    }
  }
})()