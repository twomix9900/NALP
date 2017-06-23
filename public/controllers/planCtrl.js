(function () {
  angular.module('NALP')
  .controller('planCtrl', planCtrl)

  planCtrl.$inject = ['selectedPlans_fac', '$state', 'plan_fac', "$stateParams"];

  function planCtrl(selectedPlans_fac, $state, plan_fac, $stateParams) {
    var vm = this;
    vm.title = 'plan view title'
    vm.some_user_id = '5945a92adf00070c767a0592';
    vm.addedEvents = [];
    vm.totalCost = 0;

    var err_callback = function (err) {
      console.log('err >>', err);
    }

    plan_fac
      .show($stateParams.plan_id)
      .then(success_call, err_callback)

    function success_call(res) {
      vm.addedEvents = res.data.plan.events;
      for (let i = 0; i < vm.addedEvents.length; i++) {
        vm.totalCost += parseFloat(vm.addedEvents[i].cost);
        console.log('vm total cost = ', vm.totalCost)
      }
    }

    vm.userDidClickMarkAsComplete = function () {
      console.log('button clicked!');
      vm.option = 'completed';
      selectedPlans_fac.getPlans(vm.option, vm.SOME_USER_ID)
        .then(renderPlans, function (err) {
          if (err) throw err;
        });
    }

  }
})()