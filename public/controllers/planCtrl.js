(function () {
  angular.module('NALP')
    .controller('planCtrl', planCtrl)

  planCtrl.$inject = ['selectedPlans_fac', '$state', 'plan_fac', "$stateParams", 'store'];

  function planCtrl(selectedPlans_fac, $state, plan_fac, $stateParams, store) {

    document.body.style.backgroundImage = "";
    
    var vm = this;
    vm.title = 'plan view title'
    vm.some_user_id = store.get('current_user_id');
    vm.addedEvents = [];
    vm.totalCost = 0;
    vm.isNotComplete;
    vm.isBookmarked;
    vm.showButtons = false;

    var err_callback = function (err) {
      console.log('err >>', err);
    }

    plan_fac
      .show($stateParams.plan_id)
      .then(success_call, err_callback)

    function success_call(res) {
      vm.totalCompleted = res.data.plan.ratings.length;
      vm.addedEvents = res.data.plan.events;
      vm.currentPlanId = res.data.plan._id;
      vm.currentPlanUserId = res.data.plan.created_by_id;
      vm.ratings = res.data.plan.ratings.length;
      vm.bookmarks = res.data.plan.bookmarks.length;

      for (let i = 0; i < vm.addedEvents.length; i++) {
        vm.totalCost += parseFloat(vm.addedEvents[i].cost);
      }

      if (res.data.plan.ratings.indexOf(vm.some_user_id) !== -1) {
        vm.isNotComplete = true;    // flag to show whether undo complete/complete button is shown
      }

      if (res.data.plan.bookmarks.indexOf(vm.some_user_id) === -1) {
        vm.isBookmarked = true;  // flag to show whether undo bookmark/bookmkar button is shown
      }

      if (vm.some_user_id) {
        vm.showButtons = true;  // flag to show buttons when user is logged in/out
      }


    }

    vm.userDidClickMarkAsComplete = function () {
      vm.option = 'completed';
      plan_fac
        .mark_plan_complete(vm.currentPlanId, {
          user_id: vm.some_user_id,
          completed: true
        })
        .then(mark_com_res, err_callback)
    }

    function mark_com_res(res) {
      vm.isNotComplete = true;
      vm.ratings = res.data.plan.ratings.length;
    }

    vm.userDidClickMarkAsIncomplete = function () {
      plan_fac
        .mark_plan_incomplete(vm.currentPlanId, {
          user_id: vm.some_user_id,
          completed: false
        })
        .then(mark_incomplete_res, err_callback)
    }

    function mark_incomplete_res(res) {
      vm.isNotComplete = false;
      vm.ratings = res.data.plan.ratings.length;
    }

    vm.userDidClickBookmark = function () {
      plan_fac
        .bookmark(vm.currentPlanId, {
          user_id: vm.some_user_id,
          bookmark: true
        })
        .then(bookmark_res, err_callback)
    }

    function bookmark_res(res) {
      vm.isBookmarked = false;
      vm.bookmarks = res.data.plan.bookmarks.length; // the length of the array determines how many people completed or bookmarked a plan (each bookmark/completion pushes the user ID into bookmarks/completion array)
    }

    vm.userDidClickRemoveBookmark = function () {
      plan_fac
        .bookmark(vm.currentPlanId, {
          user_id: vm.some_user_id,
          bookmark: false
        })
        .then(remove_bookmark_res, err_callback)
    }

    function remove_bookmark_res(res) {
      vm.isBookmarked = true;
      vm.bookmarks = res.data.plan.bookmarks.length;
    }

  }
})()