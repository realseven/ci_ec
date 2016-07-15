(function() {

  'use strict';

  angular
    .module('app.auth.controller', ['app.auth.service'])
    .controller('AuthCtrl', AuthCtrl);

  AuthCtrl.$inject = ['$state', 'AuthService', 'Notice'];

  function AuthCtrl($state, AuthService, Notice) {
    var vm = this;

    vm.login = login;

    /*(function initController() {
      // reset login status
      AuthService.clearCredentials();
    })();*/

    function login() {
      Notice.success('login');
      vm.dataLoading = true;
      vm.isSuccess = false;
      AuthService.login(vm.username, vm.password, function(response) {
        if (response.success) {
          AuthService.setCredentials(vm.username, vm.password);
          $state.reload();
          vm.dataLoading = false;
          vm.isSuccess = true;
        } else {
          Notice.error(response.message);
          vm.dataLoading = false;
          vm.isSuccess = false;
        }
      });
    }
  }

})();
