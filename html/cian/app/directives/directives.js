(function() {

  'use strict';

  angular.module('app.directives', [])
    .directive('bsModal', bsModal)
    .directive('labelTip', labelTip)
    .directive('btnTip', btnTip)
    .directive('dropdownTip', dropdownTip);

  function bsModal() {
    var directive = {
      restrict: 'E',
      transclude: true,
      scope: {
        modalId: '@',
        modalTitle: '@',
        size: '@',
        hideBtns: '@',
        disableOkBtn: '=',
        okId: '@',
        okTxt: '@',
        okFn: '&',
        cancelTxt: '@',
        cancelFn: '&',
        hideModal: '=',
        showSpinner: '=',
        onShow: '&',
        onHide: '&'
      },
      link: link,
      templateUrl: 'app/directives/bs-modal.html'
    };
    return directive;

    function link(scope, element, attrs) {
      var model = $(element.children()[0]);

      model.off('hidden.bs.modal').on('hidden.bs.modal', function(e) {
        if (attrs['onHide']) {
          scope.onHide();
        }
      });

      model.off('show.bs.modal').on('show.bs.modal', function(e) {
        if (attrs['onShow']) {
          scope.onShow();
        }
      });

      scope.$watch(
        'hideModal',
        function(newValue, oldValue, scope) {
          if (newValue) {
            model.modal('hide');
          }
        }
      );

      if (attrs['hideModal']) {
        // hide modal manually
        scope.dataDismiss = '';
      } else {
        // hide modal automatically
        scope.dataDismiss = 'modal';
      }

      // if there is no okId and okFn, hide 'ok' button
      if (!scope.hideBtns) {
        if (!scope.okId && !attrs['okFn']) {
          scope.hideOkBtn = true;
        }
      }

      // if size is not set, use default size 'md'(just assign a value no effect)
      if (!scope.size) {
        scope.size = 'md';
      }

      // add default 'hide' function to avoid changing button position due to displaying validation error message
      if (!attrs['cancelFn']) {
        scope.cancelFn = function() { model.modal('hide'); };
      }
    }
  }

  function labelTip() {
    var directive = {
      restrict: 'A',
      transclude: true,
      scope: {
        labelTip: '@',
        labelText: '@'
      },
      templateUrl: 'app/directives/label-tip.html'
    };
    return directive;
  }

  function btnTip($compile) {
    var directive = {
      restrict: 'A',
      scope: {
        btnTip: '@',
      },
      link: function(scope, element, attrs, ctrl, transclude) {
        var wrapper = angular.element('<div class="tip-wrapper btn-tip" uib-tooltip="{{btnTip}}" tooltip-placement="bottom" tooltip-popup-delay="300"></div>');
        $compile(wrapper)(scope);
        element.after(wrapper);
        wrapper.prepend(element);
      }
    };
    return directive;
  }

  function dropdownTip($compile) {
    var directive = {
      restruct: 'A',
      terminal: true,
      link: link
    };

    function link(scope, element, attrs) {
      element.attr('uib-tooltip', element.attr('dropdown-tip'));
      element.attr('tooltip-placement', 'bottom');
      element.attr('tooltip-popup-delay', '300');
      element.removeAttr("dropdown-tip");
      $compile(element)(scope);
    }
    return directive;
  }


})();
