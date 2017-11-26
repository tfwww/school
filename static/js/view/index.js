define(function(require, exports, module) {
    var debug = true
    var log = debug ? console.log.bind(console) : function() {}

    layui.use(['element', 'carousel', 'jquery', 'laypage', 'form'], function(){
        var $ = layui.$

        // 轮播图
        var carousel = layui.carousel
        carousel.render({
            elem: '#slide',
            width: '650px',//设置容器宽度,
            height: '450px',
            arrow: 'always', //始终显示箭头
        })

        var laypage = layui.laypage
        var tpl = ''
        laypage.render({
            elem: 'page',
            count: data.length,
            limit: 5,
            jump: function(obj) {
                var jumpData = data.slice((obj.curr - 1) * obj.limit, obj.limit * obj.curr)
                renderData('#result-list', '#list-tpl', jumpData)
            },
        })

        var moreLaypage = layui.laypage
        var tpl = ''
        moreLaypage.render({
            elem: 'more-page',
            count: data.length,
            limit: 5,
            jump: function(obj) {
                var jumpData = data.slice((obj.curr - 1) * obj.limit, obj.limit * obj.curr)
                renderData('#more-list', '#more-tpl', jumpData)
            },
        })

        var form = layui.form
        form.on('submit(*)', function(data){
            showPage('.search')
            return false;
        })

        var element = layui.element
        element.on('nav(nav)', function(ele){
            var target = $(ele)
            log('nav', target)
        })

        function renderData(container, tpl, data) {
            $(container).empty().append(juicer($(tpl)[0].text, {data: data}));
        }

        // 要显示的元素选择器，如 '.search'
        function showPage(ele) {
            $('.index').hide()
            $(ele).show()
        }

    })
})
