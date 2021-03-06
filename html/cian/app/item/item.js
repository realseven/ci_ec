(function() {

  'use strict';

  angular
    .module('app.item', ['app.item.controller'])
    .config(RouterConfig);

  RouterConfig.$inject = ['$stateProvider'];

  function RouterConfig($stateProvider) {
    $stateProvider
      .state('item', {
        parent: 'public-base',
        url: '^/item',
        templateUrl: 'app/item/items.html',
        controller: 'ItemCtrl as ItemController'
      });
  }
})();