/**
 * Created by Administrator on 2016/8/12.
 */
define(['config/appregister',"jquery","domReady","jqueryMedia"],function(app,$,doc){
    app
        .controller('preViewCtrl',function($scope){
            $scope.str = 'preView page';
            $scope.pdfPath = "resources/pdf/webguifan.pdf";
            var screenWidth = screen.width;
            var screenHeight = screen.height;
            var preView = {
                width:screenWidth-80,
                height:screenHeight-20
            }
            //考虑到移动端情况 暂时设置为200px
            if(screenWidth>200){
              //...
             }
            doc(function(){
                $('.media').media({width: preView.width, height: preView.height});
                $('.pdfContainer' ).css({width: preView.width, height: preView.height,margin:"0 auto"});
            })
        })
})