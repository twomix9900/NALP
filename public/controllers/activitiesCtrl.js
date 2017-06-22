(function() {
  angular.module('NALP')
  .controller('activitiesCtrl', activitiesCtrl)

  activitiesCtrl.$inject = ['selectedPlans_fac'];

  function activitiesCtrl(selectedPlans_fac) {
    var vm = this;
    vm.option = 'bookmarked';
    //dummy data
    vm.SOME_USER_ID = '594ae6c148ec2d34688f7c87';

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

    vm.userHover = function() {
    // highlight selection  
    };

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
