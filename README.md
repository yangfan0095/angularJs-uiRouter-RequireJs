# angularJs-uiRouter-RequireJsDemo
 angularJs-uiRouter-RequireJs  demo  实现模块按需求加载  路由配置 按需求加载 欢迎交流。
 这个是我在本地写的一个demo  可以直接运行

首先我的项目采用angularJS +requireJS + ui-router
实现了 动态按需求加载html 和controller 以及动态配置路由
本人文笔有限 直接说我是怎样实现的。

首先在 mian.js中初始化模块
require(["domReady!",'app'],function( document){
   angular.bootstrap(document, ['myModule'])
})
初始化模块以后 需要重新注册各项服务 关于为何要这样 可以详细看答案 各位大神已经详细说明了
AngularJS按需动态加载template和controller? 
AngularJS按需动态加载template和controller? - 前端开发框架和库
var app = angular.module("myModule", ['ui.router']);
app.config(function($controllerProvider,$compileProvider,$filterProvider,$provide,$stateProvider){
   app.register = {
      //得到$controllerProvider的引用
      controller : $controllerProvider.register,
      //同样的，这里也可以保存directive／filter／service的引用
      directive: $compileProvider.directive,
      filter: $filterProvider.register,
      service: $provide.service,
      factory:$provide.factory,
           stateProvider:$stateProvider
   };
这个文件返回 app 对象， 在另外一个文件中单独返回app.register , 这样 其他需要使用这些服务的 就不用写 app.register.controller("balabala 反正我是这样写的 。

define(["app"],function(app){
    return app.register;
}) 


在另一个文件中写了一个公共方法 作为ui-router 配置的公共调用方法
代码如下

这里return 了一个routerState 方法 ，外部可以调用这个方法对其传参 这个方法可以实现自动配置路由
关键是调用这个方法 这个是在register 里面配置了的app.stateProvider.state（）

define(["config/appregister"],function(app) {
    return {
        routerState:function(state,url,ctrl,params) {
            if(!angular.isString(state)||!angular.isString(url) || !angular.isString(ctrl)){
                return
            }
            var strurl = ctrl;
           var ctrlName = strurl.substring(strurl.lastIndexOf('/')+1);
            //todo  字符串匹配校验待做！
            app.stateProvider.state(state,{
                    url:"/"+ state,
                    controller: ctrlName,
                    templateUrl: url,
                    resolve: {
                        loadCtrl: ["$q", function($q) {
                            var deferred = $q.defer();
                            //异步加载controller／directive/filter/service
                            require([
                               ctrl
                            ], function() { deferred.resolve(); });
                            return deferred.promise;
                        }]
                    }
                })
            }
        }


})
这样 写好了公共文件 。现在加入我的业务分成几个模块 
我要实现 当用户 点击具体模块的时候再 加载器对应的模块下的路由配置

