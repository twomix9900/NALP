(function() {
  angular.module('NALP')
  .controller('activitiesCtrl', activitiesCtrl)

  activitiesCtrl.$inject = ['selectedPlans_fac'];

  function activitiesCtrl(selectedPlans_fac) {
    var vm = this;

    vm.userClickBookmarked = function(){
      console.log('i got bookmarked');
    };

    vm.userClickCreated = function() {
      console.log('i got created');
    };

    vm.userClickCompleted = function() {
      console.log('i got rated');
    };

    vm.userHover = function() {
    // highlight selection  
    };
    //dummy data
    var option = 'bookmarked'
    var id = '594ae6c148ec2d34688f7c87'

    selectedPlans_fac.getPlans(option, id)
      .then(renderPlans, function(err) {
        if (err) throw err;
      });

    function renderPlans(res) {
      console.log('res data ', res);
      vm.plans = res.data.plans;
    }
  
  }

})();