(function() {
  angular.module('NALP')
  .controller('planCtrl', createCtrl)

  createCtrl.$inject = ['plan_fac', '$stateParams'];

  function createCtrl(plan_fac, $stateParams) {
    var vm = this;
    vm.title = 'create plan view title'
    vm.some_user_id = '5945a92adf00070c767a0592'; 
    vm.newEventInfo = {};
    vm.newPlanInfo = {};
    vm.addedEvents = [];
    var err_callback = function(err) {
      console.log('err >>', err);
    }

    plan_fac
      .show($stateParams.plan_id)
      .then(success_call, err_callback)

    function success_call(res) {
      console.log(res.data.plan.events)
    }

    vm.userDidClickAddEvent = function() {
      console.log(vm.newEventInfo);
      var event = {};
      for (var key in vm.newEventInfo) {
        event[key] = vm.newEventInfo[key]
      }
      vm.addedEvents.push(event);
      vm.newEventInfo = {};
    };
    vm.userDidClickMakePlan = function() {
      var plan = {
        title: vm.newPlanInfo.title,
        city: vm.newPlanInfo.city,
        events: vm.addedEvents
      }
      console.log(plan)
      plan_fac
        .createPlan(vm.some_user_id, plan)
        .then(make_plan_res, err_callback)
    }

    function make_plan_res(res) {
      console.log(res, 'success');
      vm.addedEvents = [];
      vm.newPlanInfo = {};

    }

    vm.userDidClickRemoveFromAddedEvents = function(event) {
      vm.addedEvents.splice(vm.addedEvents.indexOf(event), 1);
    }
  }
})()