(function () {
  angular.module('NALP')
    .controller('createCtrl', createCtrl)

  // createCtrl.$inject = ['$scope', function($scope) {
  //   $scope.create = {
  //     text: '',
  //     location: ''
  //   }
  // }];

  createCtrl.$inject = ['plan_fac', '$http', '$state', 'store'];

  function createCtrl(plan_fac, $http, $state, store) {
    var vm = this;
    vm.title = 'create plan view title'
    vm.some_user_id = store.get('current_user_id');
    vm.newEventInfo = {};
    vm.newPlanInfo = {};
    vm.addedEvents = [];
    vm.cityLoc = {};
    vm.findEventName = {};
    vm.isShowingDataList = false;
    window.yelp_data_list = document.querySelector('#suggest-from-yelp-list');

    //  $(document).ready(function(){
    //   $('.parallax').parallax();
    // });

    var err_callback = function (err) {
      console.log('err >>', err);
    }

    $("#address-input-tag").autocomplete({
      source: function (req, response) {
        plan_fac
          .auto_suggest({ search_term: vm.newEventInfo.address, search_location: vm.newPlanInfo.city })
          .then(function (res) {
            console.log(res.data.results, '<< success from yelp api test')
            vm.allPlaceSuggestions = res.data.results.businesses;
            // response(vm.allPlaceSuggestions)
            var suggestions_list = [];
            
            for (var i = 0; i < vm.allPlaceSuggestions.length; i++) {
              var element = vm.allPlaceSuggestions[i];
              suggestions_list.push(element.name + ', ' + element.location.display_address[1]);
              var el = element.name + ', ' + element.location.display_address[1];
              vm.findEventName[el] = element.name
            }
            response(suggestions_list)
            // vm.allPlaceSuggestions.forEach(function (val) {
            //   var option = document.createElement('option');
            //   option.value = val.name + ', ' + val.location.display_address[1];
            //   yelp_data_list.appendChild(option);
            // })



          }, err_callback)
      }
    });

    vm.showAutoSuggestions = function () {
      // console.log(vm.allPlaceSuggestions, '<<<< all place suggestions')
      // console.log(vm.newPlanInfo.city, '<< city')
      // plan_fac
      //   .auto_suggest({ search_term: vm.newEventInfo.address, search_location: vm.newPlanInfo.city })
      //   .then(function (res) {
      //     console.log(res.data.results, '<< success from yelp api test')
      //     vm.allPlaceSuggestions = res.data.results.businesses;

      //     // vm.allPlaceSuggestions.forEach(function (val) {
      //     //   var option = document.createElement('option');
      //     //   option.value = val.name + ', ' + val.location.display_address[1];
      //     //   yelp_data_list.appendChild(option);
      //     // })



      //   }, err_callback)
      // $http.get('https://api.yelp.com/v3/businesses/search?term=' + vm.newEventInfo.address + '&location=' + vm.newPlanInfo.city, {headers: {"Authorization": "Bearer 3AzZB1KiGE5YLQPGCNBu6kW6JmSAwRVF6YzmYBiXbDnAG6by-I2Zhg5Jdq5av1ugKKkssNPsasUGS9Ja9k0oly8FTK9yvWru6tHqubcryaW1bpGoQdlJRxH01vlKWXYx"}})
      //   .then(function(res) {
      //     console.log(res, '<< success from yelp api')  
      //   }, err_callback)
    }

    vm.userClickedGetSuggestions = function () {
      console.log('clicked!')
    }



    // timepicker for start time input
    $('#start_time_input').timepicker();
    // $('#start_time_input').timepicker('setTime', new Date());

    $('#google-address-input').css('width', '350px')
    //  $('#added-events-address-p').css('width', '350px')



    vm.userDidClickAddEvent = function () {
      console.log(vm.newEventInfo);
      var event = {};
      for (var key in vm.newEventInfo) {
        event[key] = vm.newEventInfo[key]
      }
      event['address'] = $('#address-input-tag').val();
      console.log(vm.findEventName[event.address], '<< event name test')
      event.name = vm.findEventName[event.address];
      plan_fac
        .auto_suggest({ search_term: vm.findEventName[event.address], search_location: vm.newPlanInfo.city })
        .then(function (res) {
          console.log(res.data.results, '<< success from yelp api test')
          vm.current_place_img = res.data.results.businesses[0].image_url;
          console.log('>> place address from yelp', res.data.results.businesses[0].location.display_address.join(' '))
          event.photo = vm.current_place_img;
          event.address = res.data.results.businesses[0].location.display_address.join(' ');
          vm.addedEvents.push(event);
          vm.newEventInfo = {};
          vm.findEventName = {};
          vm.current_place_img = '';
        }, err_callback)

    };
    vm.userDidClickMakePlan = function () {
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
      $state.go('plan', { plan_id: res.data.plan._id })
      // Materialize.toast('Saved!! Plan successfully created!!', 50000000, 'alert-complete');
    }

    vm.userDidClickRemoveFromAddedEvents = function (event) {
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