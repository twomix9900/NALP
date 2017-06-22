(function() {
  angular.module('NALP')
  .controller('searchCtrl', searchCtrl)

  searchCtrl.$inject = ['plan_fac'];

  function searchCtrl(plan_fac) {
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
      console.log('clicked!!')
      plan_fac.getAllPlans()
      .then((plans) => {
        console.log(plans.data.plans)
        vm.dummydata = plans.data.plans;
      }).catch((err) => {
        console.log('error getting plans', err);
      })
    }
  }
})()