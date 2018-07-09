(function (app) {
    app.controller('postCategoryListController', postCategoryListController);

    postCategoryListController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox'];

    function postCategoryListController($scope, apiService, notificationService, $ngBootbox) {

        $scope.postCategories = [];
        $scope.page = 0;
        $scope.pagesCount = 0;        
        $scope.getPostCategories = getPostCategories;
        $scope.keyword = '';
        $scope.search = search;
        $scope.deletePostCategory = deletePostCategory;

        function deletePostCategory(id) {
            $ngBootbox.confirm('Bạn có chắc muốn xóa?').then(function () {
                var config = {
                    params: {
                        id: id
                    }
                }
                apiService.del('api/postcategory/delete', config, function (result) {
                    notificationService.displaySuccess('Xóa thành công.');
                    getPostCategories();
                }, function (error) {
                    notificationService.displayError('Xóa không thành công.');
                });

            }, function () {
                notificationService.displayWarning('Hủy quá trình xóa.');
            });
        }

        function search() {
            getPostCategories();
        }

        function getPostCategories(page) {
            page = page || 0;
            var config = {
                params: {
                    keyword: $scope.keyword,
                    page: page,
                    pageSize: 2
                }
            }

            apiService.get('/api/postcategory/getall', config, function (result) {
                if(result.data.TotalCount == 0){
                    notificationService.displayWarning('Không có bản ghi nào được tìm thấy.');
                }
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