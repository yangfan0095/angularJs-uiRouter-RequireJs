define(['app'],function(app){
    //Service比较特殊，加载后还需要手动注入控制器
    app.register.service('booksService', function(){
        this.books = [
            {
                id: 0,
                name: 'book1'
            },
            {
                id: 1,
                name: 'book2'
            }
        ];
        return this;
    })
})