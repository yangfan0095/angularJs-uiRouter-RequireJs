/**
 * Created by Administrator on 2016/8/12.
 */
define(['config/appregister'],function(app){
    app. controller("httpTestCtrl",function($scope,$http,$state,getProducts ){
        $scope.displayMode = "list";
        $scope.currentProduct = null;
        $scope.constant = {
            create :"create",
            preview:"preView"
        }
        //todo
        $scope.listProducts = function(){
            var requestion ={
                type:"GET",
                url:"products"
            }
            getProducts.getData(requestion).success(function(data){
                $scope.products = data;
            });
        }
        $scope.deleteProduct = function(product){
            $http({
                method:"DELETE",
                url:baseUrl+product.id
            }).success(function(){
                $scope.products.splice($scope.products.indexOf(product),1);
            })
        }
        $scope.createProduct = function(product){
            //  $scope.products.push(product);
            $http.post(baseUrl,product).success(function(newProduct){
                $scope.products.push(newProduct);
            })
        }
        $scope.updateProduct = function(product){
            $http({
                url:baseUrl + product.id,
                method:"PUT",
                data:product
            }).success(function(modifiedProduct){
                for(var i = 0 ; i<$scope.products.length;i++){
                    if($scope.products[i].id == modifiedProduct.id){
                        $scope.products[i] = modifiedProduct;
                        break;
                    }
                }
            })
        }
        $scope.editOrCreateProduct = function(product){
            $scope.currentProduct = product?angular.copy(product):{};
            $scope.displayMode = "edit";
        }
        $scope.saveEdit = function(product){
            if(angular.isDefined(product.id)){
                $scope.updateProduct(product);
            }else{
                $scope.createProduct(product);
            }
        }
        $scope.canelEdit = function(){
            $scope.currentProduct = {};
            $scope.displayMode = "list";
        }
        $scope.listProducts();
        $scope.location = function(path){
            //var path = "create";
            $state.go(path);
        }

    })
})