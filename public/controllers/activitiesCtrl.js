(function() {
  angular.module('NALP')
  .controller('activitiesCtrl', activitiesCtrl)

  activitiesCtrl.$inject = ['selectedPlans_fac', '$state', 'store', 'auth_fac'];

  function activitiesCtrl(selectedPlans_fac, $state, store, auth_fac) {
    auth_fac.private();
    
    document.body.background = "https://cdn.pixabay.com/photo/2014/07/01/12/25/roller-skates-381216_960_720.jpg";
    
    var vm = this;
    var viewtitle = '';
    var viewcity = '';
    var viewcost = '';

    vm.option = 'bookmarked';
    vm.user_id = store.get('current_user_id');

    vm.userClickBookmarked = function(){
      vm.option = 'bookmarked';
      selectedPlans_fac.getPlans(vm.option, vm.user_id)
      .then(renderPlans, function(err) {
        if (err) throw err;
      });
    };

    vm.userClickCreated = function() {
      vm.option = 'created';
      selectedPlans_fac.getPlans(vm.option, vm.user_id)
      .then(renderPlans, function(err) {
        if (err) throw err;
      });
    };

    vm.userClickCompleted = function() {
      vm.option = 'completed';
      selectedPlans_fac.getPlans(vm.option, vm.user_id)
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
      $state.go('plan', { plan_id: p_id})
    }


    // initialize view
    selectedPlans_fac.getPlans(vm.option, vm.user_id)
      .then(renderPlans, function(err) {
        if (err) throw err;
      });

    function renderPlans(res) {
      vm.plans = res.data.plans;
    }
  }
})();
