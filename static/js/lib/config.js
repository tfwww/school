window.__mainDirname = location.href;
/*sea.js 配置*/
seajs.config({
	charset: 'utf-8',
	base: window.__mainDirname+"/static/js",
    alias: {
        'layui': 'layui/layui.js',
    },
});
