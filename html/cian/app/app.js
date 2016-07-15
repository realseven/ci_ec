(function() {

  'use strict';

  angular
    .module('ecApp', ['ngMessages', 'ngRoute', 'ui.bootstrap', 'ui.router', 'ui.validate', 'pascalprecht.translate',
                      'angularUtils.directives.dirPagination',
                      'app.directives', 'app.util',
                      'app.auth.controller', 'app.item'])
    .config(RouterConfig)
    .config(TranslateConfig)
    .run(ConfigRun);
    //.factory('HttpInterceptor', HttpInterceptor)
    //.factory('AuthInterceptor', AuthInterceptor)

  RouterConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function RouterConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('base', {
        abstract: true,
        url: '/base',
        views: {
          '': {
            templateUrl: 'app/layout/base.html'
          },
          'login@base': {
            templateUrl: 'app/auth/login.html'
          }
        }
      })
      .state('admin-base', {
        abstract: true,
        parent: 'base',
        url: '/admin',
        views: {
          '': {
            templateUrl: 'app/layout/admin-base.html'
          }
        }
      })
      .state('public-base', {
        abstract: true,
        parent: 'base',
        url: '/public',
        views: {
          '': {
            templateUrl: 'app/layout/public-base.html'
          }
        }
      })
      .state('home', {
        parent: 'public-base',
        url: '^/home',
        views: {
          '': {
            templateUrl: 'app/layout/home.html'
          }
        }
      });
  }

  TranslateConfig.$inject = ['$translateProvider'];

  function TranslateConfig($translateProvider) {
    // ensures the output will be escaped correctly
    $translateProvider.useSanitizeValueStrategy('escaped');

    $translateProvider.useStaticFilesLoader({
      prefix: 'app/static/i18n/',
      suffix: '.json'
    });

    $translateProvider.preferredLanguage('zh').fallbackLanguage('zh');
  }

  ConfigRun.$inject = ['$rootScope', '$state', '$stateParams', '$translate'];

  function ConfigRun($rootScope, $state, $stateParams, $translate) {
    // to access them from any scope within applications. eg: ng-class="{active: $state.includes('compute')}"
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      //HttpRequestService.cancelRequests();
    });

    run.$inject = ['$rootScope', '$location', ];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

    //everytime browser refresh, get language settings from token and set.
    //var token = UserSession.getToken();
    //token && token.user && token.user.language && $translate.use(token.user.language);
  }

  HttpInterceptor.$inject = ['$q', 'HttpRequestService'];

  function HttpInterceptor($q, HttpRequestService) {
    return {
      request: function(config) {
        HttpRequestService.setTimeout(config);
        return config || $q.when(config);
      },
      responseError: function(rejection) {
        var timeout = rejection.config.timeout;
        if (timeout && timeout.isGloballyCancelled) {
          return $q.defer().promise;
        }
        return $q.reject(rejection);
      }
    };
  }

  AuthInterceptor.$inject = ['$injector', '$location', '$q', 'UserSession', 'Notice'];

  /**
   * Don't use ui-router $state, it would cause circular dependency.
   * $location.path('/signin') doesn't work.
   */
  function AuthInterceptor($injector, $location, $q, UserSession, Notice) {
    return {
      request: function(config) {
        // add a token header to all AngularJS http requests
        var token = UserSession.getToken();
        if (token && token.id) {
          config.headers['X-Auth-Token'] = token.id;
        }
        return config || $q.when(config);
      },
      responseError: function(rejection) {
        // if unauthorized (status=401), redirect to signin page
        // use $location.url() instead of rejection.config.url(ajax call url) for redirecting only one time 
        if (rejection.status === 401 && $location.url() !== '/signin') {
          UserSession.clear();
          Notice.alert(rejection.data);
          $injector.get('$state').go('signin', {url: $location.url()});
        }
        return $q.reject(rejection);
      }
    };
  }

})();