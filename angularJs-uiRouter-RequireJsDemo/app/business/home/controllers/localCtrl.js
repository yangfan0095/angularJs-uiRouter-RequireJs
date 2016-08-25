define(["business/home/config/routerconfig",'config/appregister'],function(routercongfig,app){
	app
		.controller('localCtrl',function($scope,$state){
			$scope.str = '作为主文件同时配置home 业务模块下的细分模块';
			$scope.state = function(){
				$state.go("routertest");
			}

		})

})