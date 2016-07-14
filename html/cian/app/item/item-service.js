(function() {

  'use strict';

  angular
    .module('app.item.service', ['ngResource'])
    .factory('dataFactory', dataFactory);

  /*  ApplicationService.$inject = ['$resource'];

    function ApplicationService($resource) {
      return $resource(
          '/applications/:id',
          {id: '@id'},
          {
            'update': {method: 'PUT'},
            'getAppInstances': {url: '/applications/instances', isArray: true}
          }
      );
    }
  */

  dataFactory.$inject = ['$http'];

  function dataFactory($http) {

    var myService = {
      httpRequest: function(url, method, params, dataPost, upload) {
        var passParameters = {};
        passParameters.url = url;

        if (typeof method == 'undefined') {
          passParameters.method = 'GET';
        } else {
          passParameters.method = method;
        }

        if (typeof params != 'undefined') {
          passParameters.params = params;
          passParameters.params = params;
        }

        if (typeof dataPost != 'undefined') {
          passParameters.data = dataPost;
        }

        if (typeof upload != 'undefined') {
          passParameters.upload = upload;
        }
        // passParameters.headers = {'Content-Type': 'application/x-www-form-urlencoded'};
        console.log(passParameters);
        var promise = $http(passParameters).then(function(response) {
          if (typeof response.data == 'string' && response.data != 1) {
            if (response.data.substr('loginMark')) {
              location.reload();
              return;
            }
            $.gritter.add({
              title: 'Application',
              text: response.data
            });
            return false;
          }
          if (response.data.jsMessage) {
            $.gritter.add({
              title: response.data.jsTitle,
              text: response.data.jsMessage
            });
          }
          return response.data;
        }, function() {

          $.gritter.add({
            title: 'Application',
            text: 'An error occured while processing your request.'
          });
        });
        return promise;
      }
    };
    return myService;

  }


})();
