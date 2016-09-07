(function () {
  'use strict';

  angular.module('ng.jGrowl', [])
    .provider('jGrowl', [function () {
      this.defaults = function (options) {
        angular.extend(angular.element.jGrowl.defaults, options || {});
      };

      this.$get = function () {
        return {}
      }
    }])
    .factory('jGrowlNotify', ['$q', function ($q) {
      var show = function (a, options, theme) {
        var message,
          header,
          executeOptions = {},
          def = $q.defer();

        switch (a.length) {
          case 1:
            message = a[0];
            header = '';
            break;
          case 2:
            header = a[0];
            message = a[1];
            break;
          default:
            def.reject();
            return def.promise;
        }

        angular.extend(executeOptions, (options || {}), {
          header: header,
          themeState: theme,
          close: function () {
            def.resolve();
          }
        });

        angular.element.jGrowl(message, executeOptions);

        return def.promise;
      };

      return function (options) {
        this.success = function () {
          return show(arguments, options, 'success')
        };

        this.error = function () {
          return show(arguments, options, 'error')
        };

        this.warn = function () {
          return show(arguments, options, 'warn')
        };

        this.info = function () {
          return show(arguments, options, 'info')
        };
      };
    }]);
})();