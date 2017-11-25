define(function(require, exports, module) {
    var debug = true
    var log = debug ? console.log.bind(console) : function() {}
    log(layui)
    layui.use('carousel', function(){
        var carousel = layui.carousel;
        //建造实例
        carousel.render({
            elem: '#slide',
            width: '650px',//设置容器宽度,
            height: '450px',
            arrow: 'always', //始终显示箭头
        })
    })
})
