/**
 * Created by Administrator on 2016/8/12.
 */
define(['config/appregister',"business/services/httpServices"],function(app){
   app.controller("showDataCtrl",function($scope,$stateParams,$http,getProducts){
      $scope.params = $stateParams;
       console.log($scope.params);
       var requestion ={
           type:"GET",
           url:"products"
       }
       getProducts.getData(requestion).success(function(data){
           console.log(data);
       }).error(function(){
           console.log("bad Requestion")
       })
   })
})

