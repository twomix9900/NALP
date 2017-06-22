(function() {
  angular.module('NALP')
  .controller('activitiesCtrl', activitiesCtrl)

  activitiesCtrl.$inject = ['plans_fac'];

  function activitiesCtrl(plans_fac) {
    var vm = this;

    vm.userClick = function(){



    };
    
    plans_fac.getPlans




  }










})();