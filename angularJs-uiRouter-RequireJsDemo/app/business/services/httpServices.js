/**
 * Created by Administrator on 2016/8/12.
 */
define(['config/appregister'],function(app){
    app.factory("getProducts",function($http){
        var baseUrl = "http://localhost:2403";
        return {
            getData : function(requestion) {
                return  $http({
                    method: requestion.type,
                    url:baseUrl+"/"+ requestion.url
                })
            }
        }
    })
})
