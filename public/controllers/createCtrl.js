(function() {
  angular.module('NALP')
  .controller('createCtrl', createCtrl)

  // createCtrl.$inject = ['$scope', function($scope) {
  //   $scope.create = {
  //     text: '',
  //     location: ''
  //   }
  // }];

  createCtrl.$inject = ['plan_fac'];

  function createCtrl(plan_fac) {
    var vm = this;
    vm.title = 'create plan view title'
    vm.some_user_id = '5945a92adf00070c767a0592'; // current: bob@gmail.com
    vm.newEventInfo = {};
    vm.newPlanInfo = {};
    vm.addedEvents = [];

    // timepicker for start time input
    $('#start_time_input').timepicker();
    // $('#start_time_input').timepicker('setTime', new Date());

   $('#google-address-input').css('width', '350px')
  //  $('#added-events-address-p').css('width', '350px')


    var err_callback = function(err) {
      console.log('err >>', err);
    }
    vm.userDidClickAddEvent = function() {
      console.log(vm.newEventInfo);
      var event = {};
      for (var key in vm.newEventInfo) {
        event[key] = vm.newEventInfo[key]
      }
      event['address'] = $('#google-address-input').val();
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
      // Materialize.toast('Saved!! Plan successfully created!!', 50000000, 'alert-complete');
    }

    vm.userDidClickRemoveFromAddedEvents = function(event) {
      vm.addedEvents.splice(vm.addedEvents.indexOf(event), 1);
    }
  }
})()



// function($scope) {
//     $scope.create = {
//       text: 'some title',
//       location: 'some place'
//     };
//   }