(function (app) {
    app.controller('postCategoryAddController', postCategoryAddController);

    function postCategoryAddController() {
        $scope.postCategory = new {
            CreatedDate: new date()

        }
    }

})(angular.module('tedushop.post_categories'));