 作者：花剌子模
 链接：https://www.zhihu.com/question/33251004/answer/116589753
 来源：知乎
 著作权归作者所有，转载请联系作者获得授权。

 这个问题我遇到过 我来说说我的解决方案
 首先我的项目采用angularJS +requireJS + ui-router
 实现了 动态按需求加载html 和controller 以及动态配置路由
 本人文笔有限 直接说我是怎样实现的。

  首先在 mian.js中初始化模块
 `require(["domReady!",'app'],function( document){
  angular.bootstrap(document, ['myModule'])
 })`
 初始化模块以后 需要重新注册各项服务 关于为何要这样 可以详细看答案 各位大神已经详细说明了
 AngularJS按需动态加载template和controller? 
AngularJS按需动态加载template和controller? - 前端开发框架和库
`var app = angular.module("myModule", ['ui.router']);
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
   };`
这个文件返回 app 对象， 在另外一个文件中单独返回app.register , 这样 其他需要使用这些服务的 就不用写 app.register.controller("balabala 反正我是这样写的 。

`define(["app"],function(app){
    return app.register;
}) `


在另一个文件中写了一个公共方法 作为ui-router 配置的公共调用方法
代码如下

这里return 了一个routerState 方法 ，外部可以调用这个方法对其传参 这个方法可以实现自动配置路由
关键是调用这个方法 这个是在register 里面配置了的app.stateProvider.state（）

`define(["config/appregister"],function(app) {
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


})`
这样 写好了公共文件 。现在加入我的业务分成几个模块 
我要实现 当用户 点击具体模块的时候再 加载器对应的模块下的路由配置


看到这里其实就讲完了 下面的唠叨可以不看了 `-` `-` `-` `-` `-` `-` `-` `-` `-` `-` `-`

下面在业务模块中写了个方法具体来调用上面的方法 实现路由配置




我做的demo 目录大概是这样的
下面这个文件是我一个业务的模块的主文件， 在加载这个主文件的时候 ， 先调用上面的方法生成该业务下的路由 。


代码如下：
先调用上面的routerState 方法 对其传参 ，执行完以后就配置好了 。
`define(['config/routerconfig'],function(router){
     router.routerState("routertest","app/business/home/partials/routertest.html","business/home/controllers/routertestCtrl");
})`

在配置好了以后 点击上面配置的路由 可以跳转到刚配好的路由上去 
`define(["business/home/config/routerconfig",'config/appregister'],function(routercongfig,app){
   app
      .controller('localCtrl',function($scope,$state){
         $scope.str = '作为主文件同时配置home 业务模块下的细分模块';
         $scope.state = function(){
            $state.go("routertest");
         }

      })

})`


先写到这儿 ，现在项目才立项 ，刚好昨天实现了这个 后面有优化方案 再来填坑吧 
------------------------------------2016/8/13



补充一点 ，  1   之前有朋友下载了我的demo 打包出现问题 解释一下 ，因为angularJS控制器里面是注入服务多数情况下不是严格的 ["$scope",function($scope){}] 按照这种方式来写的 ，二是直接写成 app.controller(function($scope,$q,balabala){}) , 这种推断注入在项目运行时框架内可以识别 但是打包后 都变成 a ,b , c 了 所以最后会报注入错误， 项目打包的时候需要先用ngAnnotate  处理一下注入问题， 我是用的 gulp 工具做的处理  方法如下var gulp = require('gulp');var ngAnnotate = require('gulp-ng-annotate');gulp.task('default', function () {    return gulp.src('dashboard/app/**/*.js')        .pipe(ngAnnotate())        .pipe(gulp.dest('dist'));}); 通过这个任务流处理以后 就可以将原来推断注入全部转换成显式注入 然后呢  ，就可以愉快的打包了 。2 ,项目后期可以做通过控制路由来配置角色权限 以及其他操作 `$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    $rootScope.routerToStateName = toState.name;
if(toState.name =="login"){
        auth.setFormState(fromState.name);
    }
if(fromState.name.indexOf("search")>-1&&toState.name.indexOf("search")<0){
        $rootScope.GLOBALKEYWORD = ""
    }
//鉴别当前角色是否具有路由访问权限
    if( !auth.isAccessUrl(toState.name)){
        $state.go("indexCtrl");
        event.preventDefault();
    }`
。。。
我把代码贴到我的github上面去了 欢迎交流GitHub - yangfan0095/angularJs-uiRouter-RequireJsDemo: angularJs-uiRouter-RequireJs  demo  实现模块按需求加载  路由配置 按需求加载 欢迎交流。
