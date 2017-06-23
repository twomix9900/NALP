(function () {
  angular.module('NALP')
    .controller('planCtrl', planCtrl)

  planCtrl.$inject = ['plan_fac', '$stateParams', '$http'];

  function planCtrl(plan_fac, $stateParams, $http) {
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
      // var plan = {
      //   title: vm.newPlanInfo.title,
      //   city: vm.newPlanInfo.city,
      //   events: vm.addedEvents
      // }
      // console.log(plan)
      // plan_fac
      //   .createPlan(vm.some_user_id, plan)
      //   .then(make_plan_res, err_callback)
    }

  }
})()