define(function(require, exports, module) {
    var debug = true
    var log = debug ? console.log.bind(console) : function() {}
    var url = require("../module/url.js")
    var pageId = url.getParam("pageId") || '',
        pageMapper = {
            1: {channel: '机构设置', list: [{title: '岗位职责', clicked: true,}, {title: '管理规定', clicked: false,}],},
            2: {channel: '机构设置', list: [{title: '岗位职责', clicked: false,}, {title: '管理规定', clicked: true,}],},
            3: {channel: '教学运行', list: [{title: '通知公告', clicked: true,}, {title: '教学动态', clicked: false,}],},
            4: {channel: '教学运行', list: [{title: '通知公告', clicked: false,}, {title: '教学动态', clicked: true,}],},
            5: {channel: '实践创新', list: [{title: '实践教学', clicked: true,}, {title: '毕业论文', clicked: false,}, {title: '学科竞赛', clicked: false,}],},
            6: {channel: '实践创新', list: [{title: '实践教学', clicked: false,}, {title: '毕业论文', clicked: true,}, {title: '学科竞赛', clicked: false,}],},
            7: {channel: '实践创新', list: [{title: '实践教学', clicked: false,}, {title: '毕业论文', clicked: false,}, {title: '学科竞赛', clicked: true,}],},
            8: {channel: '招生考试', list: [{title: '英语考试', clicked: true,}, {title: '教师资格', clicked: false,}, {title: '语言文字', clicked: false,}],},
            9: {channel: '招生考试', list: [{title: '英语考试', clicked: false,}, {title: '教师资格', clicked: true,}, {title: '语言文字', clicked: false,}],},
            10: {channel: '招生考试', list: [{title: '英语考试', clicked: false,}, {title: '教师资格', clicked: false,}, {title: '语言文字', clicked: true,}],},
        }

    layui.use(['element', 'carousel', 'jquery', 'laypage', 'form'], function(){
        var $ = layui.$

        __main()

        function __main() {
            showFocusTab()
            renderData('#content', '#content-tpl', pageMapper[pageId])
        }

        // 激活导航栏选中颜色
        function showFocusTab() {
            var channel = pageMapper[pageId]['channel']
            var itemEles = $('.layui-nav-item')
            for (var i = 0; i < itemEles.length; i++) {
                var ele = $(itemEles[i]),
                    eleChild = $(ele.children()[0])
                log('ele', eleChild)
                if (eleChild.text() === channel) {
                    eleChild.addClass('blue-bg')
                    break
                }
            }
        }

        var laypage = layui.laypage
        var tpl = ''
        laypage.render({
            elem: 'page',
            count: data.length,
            limit: 5,
            theme: '#FF5722',
            jump: function(obj) {
                var jumpData = data.slice((obj.curr - 1) * obj.limit, obj.limit * obj.curr)
                renderData('#result-list', '#list-tpl', jumpData)
            },
        })

        var form = layui.form
        form.on('submit(*)', function(data){
            showPage('.search')
            return false;
        })

        function renderData(container, tpl, data) {
            $(container).empty().append(juicer($(tpl)[0].text, {data: data}));
        }

        // 要显示的元素选择器，如 '.search'
        function showPage(ele) {
            $('.index').hide()
            $(ele).show()
        }

         // 鼠标 hover 显示三角形箭头
         $('.layui-nav-item').hover(function(event){
            log('eve', event.target)
            var target = $(event.target).find('span')
            log('in')
            target.show('fast')
        },function(event){
            log('out')
            var target = $(event.target).find('span')
            target.hide('fast')
        })
    })
})
