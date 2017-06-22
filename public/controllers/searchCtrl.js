(function() {
  angular.module('NALP')
  .controller('searchCtrl', searchCtrl)

  searchCtrl.$inject = [];

  function searchCtrl() {
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
    
  }
})()