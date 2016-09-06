(function () {
  'use strict';

  angular.module('ng.jGrowl', [])
    .provider('jGrowl', [function () {
      var jGrowlOptions = angular.element.jGrowl.defaults;

      this.defaults = function (options) {
        angular.extend(jGrowlOptions, options || {});
      };

      this.$get = function () {
        return {}
      }
    }])
    .factory('jGrowlNotify', ['$q', function ($q) {
      var def = $q.defer();
      var jGrowlOptions = angular.element.jGrowl.defaults;

      var show = function (message, theme) {
        angular.element.jGrowl(message, {
          themeState: theme,
          close: function () {
            def.resolve();
          }
        });

        return def.promise;
      };

      return function (options) {
        angular.extend(jGrowlOptions, options || {});

        this.success = function (message) {
          return show(message, 'success')
        };

        this.error = function (message) {
          return show(message, 'error')
        };

        this.warn = function (message) {
          return show(message, 'warn')
        };

        this.info = function (message) {
          return show(message, 'info')
        };
      };
    }]);
})();