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

      var show = function (a, theme) {
        var message, header;
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

        angular.element.jGrowl(message, {
          header: header,
          themeState: theme,
          close: function () {
            def.resolve();
          }
        });

        return def.promise;
      };

      return function (options) {
        angular.extend(jGrowlOptions, options || {});

        this.success = function () {
          return show(arguments, 'success')
        };

        this.error = function () {
          return show(arguments, 'error')
        };

        this.warn = function () {
          return show(arguments, 'warn')
        };

        this.info = function () {
          return show(arguments, 'info')
        };
      };
    }]);
})();