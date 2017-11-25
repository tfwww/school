define(function(require, exports, module) {
    var debug = true
    var log = debug ? console.log.bind(console) : function() {}

    layui.use(['element', 'carousel', 'jquery', 'laypage',], function(){
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
                log('obj', obj.curr * obj.limit - obj.limit)
                log('obj 2', obj.limit)
                var jumpData = data.slice((obj.curr - 1) * obj.limit, obj.limit * obj.curr)
                log('data', data)
                log('jumpData', jumpData)
                renderData('#result-list', '#list-tpl', jumpData)
            },
        })

        function renderData(container, tpl, data) {
            $(container).empty().append(juicer($(tpl)[0].text, {data: data}));
        }

        function eventBind() {
            $('header').on('submit', '#search',function(e){
                var event = e || window.event
                if(event.preventDefault){
                    event.preventDefault();
                }else{
                    event.returnValue = false;
                }
                showSearchPage()
            });
        }

        function showSearchPage() {
            $('.index').hide()
            $('.search').show()
        }
        eventBind()
    })
})
