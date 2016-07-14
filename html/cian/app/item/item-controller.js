(function() {

  'use strict';

  angular
    .module('app.item.controller', ['app.item.service'])
    .controller('AdminCtrl', AdminCtrl)
    .controller('ItemCtrl', ItemCtrl);

  AdminCtrl.$inject = ['$rootScope', '$scope', '$http'];

  function AdminCtrl($rootScope, $scope, $http) {

    $scope.pools = [];

  }

  ItemCtrl.$inject = ['$rootScope', '$scope', '$http', 'dataFactory'];

  function ItemCtrl($rootScope, $scope, $http, dataFactory) {

    $scope.data = [];
    $scope.pageNumber = 1;
    $scope.libraryTemp = {};
    $scope.totalItemsTemp = {};

    $scope.totalItems = 0;
    $scope.pageChanged = function(newPage) {
      getResultsPage(newPage);
    };

    getResultsPage(1);

    function getResultsPage(pageNumber) {
      if (!$.isEmptyObject($scope.libraryTemp)) {
        dataFactory.httpRequest('/cian/items?search=' + $scope.searchText + '&page=' + pageNumber).then(function(data) {
          $scope.data = data.data;
          $scope.totalItems = data.total;
          $scope.pageNumber = pageNumber;
        });
      } else {
        dataFactory.httpRequest('/cian/items?page=' + pageNumber).then(function(data) {
          $scope.data = data.data;
          $scope.totalItems = data.total;
          $scope.pageNumber = pageNumber;
        });
      }
    }

    $scope.searchDB = function() {
      if ($scope.searchText.length >= 3) {
        if ($.isEmptyObject($scope.libraryTemp)) {
          $scope.libraryTemp = $scope.data;
          $scope.totalItemsTemp = $scope.totalItems;
          $scope.data = {};
        }
        getResultsPage(1);
      } else {
        if (!$.isEmptyObject($scope.libraryTemp)) {
          $scope.data = $scope.libraryTemp;
          $scope.totalItems = $scope.totalItemsTemp;
          $scope.libraryTemp = {};
        }
      }
    };

    $scope.saveAdd = function() {
      dataFactory.httpRequest('itemsCreate', 'POST', {}, $scope.form).then(function(data) {
        $scope.data.push(data);
        $(".modal").modal("hide");
      });
    };

    $scope.edit = function(id) {
      dataFactory.httpRequest('itemsEdit/' + id).then(function(data) {
        console.log(data);
        $scope.form = data;
      });
    };

    $scope.saveEdit = function() {
      dataFactory.httpRequest('itemsUpdate/' + $scope.form.id, 'PUT', {}, $scope.form).then(function(data) {
        $(".modal").modal("hide");
        $scope.data = apiModifyTable($scope.data, data.id, data);
      });
    };

    $scope.remove = function(item, index) {
      var result = confirm("Are you sure delete this item?");
      if (result) {
        dataFactory.httpRequest('itemsDelete/' + item.id, 'DELETE').then(function(data) {
          $scope.data.splice(index, 1);
        });
      }
    };


  }




})();