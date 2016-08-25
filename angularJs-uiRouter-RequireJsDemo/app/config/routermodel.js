/**
 * Created by Administrator on 2016/8/13.
 */
define([], function () {
/*
* 定义angularJS 初始化之前配置好的路由
* */
    var ret = [
        {state:"home",url:"app/business/home/partials/home.html",ctrl:"business/home/controllers/homeCtrl"},
        {state:"local",url:"app/business/home/partials/local.html",ctrl:"business/home/controllers/localCtrl"},
        {state:"test",url:"app/business/home/partials/test.html",ctrl:"business/home/controllers/testCtrl"},
        {state:"showData",url:"app/business/home/partials/showData.html",ctrl:"business/home/controllers/showDataCtrl"},
        {state:"httpTest",url:"app/business/home/partials/httpTest.html",ctrl:"business/home/controllers/httpTestCtrl"},
        {state:"preView",url:"app/business/home/partials/preView.html",ctrl:"business/home/controllers/preViewCtrl"}
    ];
    return ret;
})