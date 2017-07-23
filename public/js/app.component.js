(function() {
  'use strict'

  angular.module('app')
    .component('app', {
      templateUrl: './js/app.template.html',
      controller: controller
    })

    controller.$inject = ['API_BASE_URL', '$http', '$stateParams', '$state', 'SessionsService', 'UsersService', 'itemListService']
    function controller(baseUrl, $http, $stateParams, $state, SessionsService, UsersService, itemListService) {
      const vm = this
      vm.user = {}
      vm.$onInit = onInit
      vm.toggleItemForm = toggleItemForm
      vm.buttonSymbol = '+'
      vm.message_ = 'Yeeeeeeeeee!';

      UsersService.show(SessionsService.user.id)
      .then(function (result) { vm.user = result.data.user })
      .catch(function (result) {
        $state.go('/', { notification: 'You do not have access to that page.' })
      })

      function onInit () {
        vm.addingItem = false

        $http.get(`${baseUrl}/api/item_locations`)
        .then(response => {
          vm.itemLocations = response.data
        })
        .catch(err => {
          console.log(err)
        })
      }

      vm.getMessage = function () {
        return vm.message_
      }


      function toggleItemForm () {
        vm.addingItem = !vm.addingItem

        if (vm.addingItem) {
          vm.buttonSymbol = '–'
          $state.go('itemsForm')
        } else {
          $state.go('app')
          vm.buttonSymbol = '+'
        }
      }

    }

}())
