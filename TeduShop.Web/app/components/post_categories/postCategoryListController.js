(function (app) {
    app.controller('postCategoryListController', postCategoryListController);

    postCategoryListController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox', '$filter'];

    function postCategoryListController($scope, apiService, notificationService, $ngBootbox, $filter) {

        $scope.postCategories = [];
        $scope.page = 0;
        $scope.pagesCount = 0;        
        $scope.getPostCategories = getPostCategories;
        $scope.keyword = '';

        $scope.search = search;

        $scope.deletePostCategory = deletePostCategory;

        $scope.selectAll = selectAll;

        $scope.deleteMultiple = deleteMultiple;

        function deleteMultiple() {
            var listId = [];
            $.each($scope.selected, function (i, item) {
                listId.push(item.ID);
            });
            var config = {
                params: {
                    checkedPostCategories: JSON.stringify(listId)
                }
            }
            apiService.del('api/postcategory/deletemulti', config, function (result) {
                notificationService.displaySuccess('Xóa thành công' + result.data + ' bản ghi.');
                getPostCategories();
            }, function (error) {
                notificationService.displayError('Xóa không thành công.');
            });
        }

        $scope.isAll = false;
        function selectAll() {
            if ($scope.isAll === false) {
                angular.forEach($scope.postCategories, function (item) {
                    item.checked = true;
                });
                $scope.isAll = true;
            } else {
                angular.forEach($scope.postCategories, function (item) {
                    item.checked = false;
                });
                $scope.isAll = false;
            }
        }
        
        $scope.$watch("postCategories", function (n, o) {
            var checked = $filter("filter")(n, { checked: true });
            if(checked.length){
                $scope.selected = checked;
                $('#btnDelete').removeAttr('disabled');
            } else {
                $('#btnDelete').attr('disabled', 'disabled');
            }
        }, true);

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