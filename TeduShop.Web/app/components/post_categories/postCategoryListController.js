(function (app) {
    app.controller('postCategoryListController', postCategoryListController);

    postCategoryListController.$inject = ['$scope', 'apiService'];

    function postCategoryListController($scope, apiService) {

        $scope.postCategories = [];
        $scope.page = 0;
        $scope.pagesCount = 0;
        $scope.getPostCategories = getPostCategories;

        function getPostCategories(page) {
            page = page || 0;
            var config = {
                params: {
                    page: page,
                    pageSize: 2
                }
            }

            apiService.get('/api/postcategory/getall', config, function (result) {
                $scope.postCategories = result.data.Items;
                $scope.page = result.data.Page;
                $scope.pagesCount = result.data.TotalPage;
                $scope.totalCount = result.data.TotalCount;
            }, function (error) {
                console.log('Load postcategory failed.');
            });
        }

        $scope.getPostCategories();
    }

})(angular.module('tedushop.post_categories'));