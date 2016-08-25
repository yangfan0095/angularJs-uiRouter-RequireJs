define(['config/appregister',"business/home/services/booksService","business/services/httpServices"],function(app,booksService){
	app.controller('homeCtrl', function($scope,$state,booksService){
		$scope.str = 'home page';
        $scope.sex = 0;
        $scope.state = {
            "local":"local",
            "test":"test",
            "home":"home",
            "preView":"preView",
            "httpTest":"httpTest",
            "showData":{
                state:"showData",
                toParams:{city:"shanghai",parts:"pudong",id:3456,username:"jackMa"}
            }
        }
        $scope.routerChange = function(state){
            if(angular.isObject(state.toParams)){
                $state.go(state.state,state.toParams);
            }else{
                $state.go(state);
            }
        }
        $scope.books = booksService.books;
        console.log($scope.books)
	})

    app.filter('sexFilter', function(){
        return function(sex){
            return ['男','女'][sex];
        }
    })
    app.directive('myDirective', function(){
        return {
            restrict: "E",
            replace: true,
            template: "<div><span>指令测试</span></div>"
        }
    })
})