/**
 * Created by Administrator on 2016/8/11.
 */
define(["require",'config/appregister',"jquery","domReady"],function(require,app){
    app.controller('testCtrl',function($scope){
            $scope.name = 'angularJS 异步按需求加载 controller 和view';

            var doc = document.getElementById("123");
            require(['domReady!'], function (doc) {
                $("#123").css({"background":"#666"});
            });
        })
})

