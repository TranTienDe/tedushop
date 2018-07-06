(function (app) {

    app.filter('statusFilter', function () {

        return function (input) {
            return input ? 'Kích hoạt' : 'Đã khóa'
        }

    });

})(angular.module('tedushop.common'));