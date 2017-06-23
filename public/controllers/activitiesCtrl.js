(function() {
  angular.module('NALP')
  .controller('activitiesCtrl', activitiesCtrl)

  activitiesCtrl.$inject = ['selectedPlans_fac', '$state', 'store'];

  function activitiesCtrl(selectedPlans_fac, $state, store) {
    var vm = this;
    vm.option = 'bookmarked';

    vm.SOME_USER_ID = store.get('current_user_id');

    vm.userClickBookmarked = function(){
      console.log('i got bookmarked');
      vm.option = 'bookmarked';
      selectedPlans_fac.getPlans(vm.option, vm.SOME_USER_ID)
      .then(renderPlans, function(err) {
        if (err) throw err;
      });
    };

    vm.userClickCreated = function() {
      console.log('i got created');
      vm.option = 'created';
      selectedPlans_fac.getPlans(vm.option, vm.SOME_USER_ID)
      .then(renderPlans, function(err) {
        if (err) throw err;
      });
    };

    vm.userClickCompleted = function() {
      console.log('i got completed');
      vm.option = 'completed';
      selectedPlans_fac.getPlans(vm.option, vm.SOME_USER_ID)
      .then(renderPlans, function(err) {
        if (err) throw err;
      });
    };

    vm.userMouseEnter = function() {
      vm.highlight = true;
    };

    vm.userMouseExit = function() {
      vm.highlight = false;
    }
    
    vm.userClickPlanEntry = function(p_id) {
      console.log('i want to view this entry', p_id);
      $state.go('plan', { plan_id: p_id})
    }


    // initialize view
    selectedPlans_fac.getPlans(vm.option, vm.SOME_USER_ID)
      .then(renderPlans, function(err) {
        if (err) throw err;
      });

    function renderPlans(res) {
      console.log('res data ', res);
      vm.plans = res.data.plans;
    }
  }
})();
