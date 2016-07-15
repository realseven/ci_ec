(function() {

  'use strict';

  angular
    .module('app.util', [])
    .service('Notice', Notice);

  Notice.$inject = ['$timeout'];

  function Notice($timeout) {

    var NOTICE_TYPE = {
      INFO:'alert-info',
      SUCCESS:'alert-success',
      WARNING:'alert-warning',
      ERROR:'alert-danger',
    };

    /**
     * @name notify
     * @desc Pop-up an notify message and fade-out in few seconds.
     * @param {String} message - notification message.
     * @param {String} type - message type/style.
     * @param {integer} fadeOutDelay - delay miliseconds to fade out, if fadeOutDelay = 0, don't fadeout.
     */
    this.notify = function(message, type, fadeOutDelay) {
      type = type || NOTICE_TYPE.INFO;

      var noticeTpl = '<div class="alert alert-dismissible ' + type + '" role="alert">' +
        '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
        message + '</div>';
      var notice = $(noticeTpl).appendTo($('.main-notice'));
      console.log('[' + type + '] ' + JSON.stringify(message));

      if(fadeOutDelay > 0) {
        var promise = $timeout(function() {
            notice.fadeOut(1000, 'swing', function() {
              $(this).remove();
            });
          }, fadeOutDelay);
      }
    };

    this.info = function(message, isKeep) {
      var fadeOutDelay = isKeep? 0 : 5000;
      this.notify(message, NOTICE_TYPE.INFO, fadeOutDelay);
    };

    this.success = function(message, isKeep) {
      var fadeOutDelay = isKeep? 0 : 5000;
      this.notify(message, NOTICE_TYPE.SUCCESS, fadeOutDelay);
    };

    this.warn = function(message, isKeep) {
      var fadeOutDelay = isKeep? 0 : 10000;
      this.notify(message, NOTICE_TYPE.WARNING, fadeOutDelay);
    };

    this.error = function(message, isKeep) {
      var fadeOutDelay = isKeep? 0 : 15000;
      this.notify(message, NOTICE_TYPE.ERROR, fadeOutDelay);
    };

    this.successNotice = function(message, isKeep) {
      var fadeOutDelay = isKeep? 0 : 5000;
      this.notify(message, NOTICE_TYPE.SUCCESS + ' notice', fadeOutDelay);
    };

    this.errorNotice = function(message, isKeep) {
      var fadeOutDelay = isKeep? 0 : 15000;
      this.notify(message, NOTICE_TYPE.SUCCESS + ' notice', fadeOutDelay);
    };

    /**
     * Backend will response AppError when something wrong.
     */
    this.alert = function(error, appendMsg, isKeep) {
      if (!error) {
        this.error(appendMsg || 'Error');
        return;
      }
      if (error.code >= 500) {
        this.error(appendMsg || 'Error');
        return;
      }
      var message = '';
      if(appendMsg && appendMsg.length > 1) { //make msg capitalize
        appendMsg = appendMsg.charAt(0).toUpperCase() + appendMsg.substr(1);
      }
      appendMsg && (message += '<p><strong>' + appendMsg + '</strong></p>');
      error.code && (message += '<strong>Code:</strong> ' + error.code + '<br/>');
      error.type && (message += '<strong>Type:</strong> ' + error.type + '<br/>');
      error.message && (message += '<strong>Message:</strong> <br/>' + formatJson(error.message));
      error.details && (message += '<strong>Details:</strong> <br/><p>' + error.details + '</p>');
      this.error(message, isKeep);

      function formatJson(str) { //some response format is JSON
        try {
          JSON.parse(str);
        } catch (e) {
          return '<p>' + str + '</p>';
        }
        var jsonStr = JSON.stringify(JSON.parse(str),null,"  ");
        jsonStr = jsonStr.replace(/{/g, " ").replace(/}/g, " "); //replace '{' and '}' to whitespaces.
        return '<div><pre>' + jsonStr + '</pre></div>';
      }

    };
  }
})();