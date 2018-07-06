(function (app) {
    app.controller('postCategoryListController', postCategoryListController);

    postCategoryListController.$inject = ['$scope', 'apiService'];

    function postCategoryListController($scope, apiService) {

        $scope.postCategories = [];

        $scope.getPostCategories = getPostCategories;

        function getPostCategories() {
            apiService.get('/api/postcategory/getall', null, function (result) {
                $scope.postCategories = result.data;
            }, function (error) {
                console.log('Load postcategory failed.');
            });
        }

        $scope.getPostCategories();
    }

})(angular.module('tedushop.post_categories'));