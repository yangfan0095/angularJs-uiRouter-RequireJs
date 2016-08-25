/**
 * Created by Administrator on 2016/8/12.
 */
define(["config/appregister"],function(app,routermodel) {
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