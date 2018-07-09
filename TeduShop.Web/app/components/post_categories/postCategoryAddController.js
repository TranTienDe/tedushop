(function (app) {
    app.controller('postCategoryAddController', postCategoryAddController);

    postCategoryAddController.$inject = ['apiService', '$scope', 'notificationService', '$state'];

    function postCategoryAddController(apiService, $scope, notificationService, $state) {
        $scope.postCategory = {
            CreatedDate: new Date(),
            Status: true,
            Name: "Danh mục 1"
        }

        $scope.AddPostCategory = AddPostCategory;
        function AddPostCategory() {
            apiService.post('api/postcategory/create', $scope.postCategory, function (result) {
                notificationService.displaySuccess(result.data.Name + ' đã được thêm mới.')
                $state.go('post_categories');
            }, function (error) {
                notificationService.displayError('Thêm mới chưa thành công.');
            });
        }

        function loadParentCategories() {
            apiService.get('api/postcategory/getallparents', null, function (result) {
                $scope.parentCategories = result.data;
            }, function (error) {
                console.log('Cannot get list parent.');
            });
        }

        loadParentCategories();
    }
    
})(angular.module('tedushop.post_categories'));