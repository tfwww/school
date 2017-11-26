define(function(require, exports, module){
	var url = {};

	url.getParam = function( name, url){
		//参数：变量名，url为空则表从当前页面的url中取
        var u  = arguments[1] || window.location.search,
            reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"),
            r = u.substr(u.indexOf("\?")+1).match(reg);
        return r!=null?r[2]:"";
	};
	/*
	** IE下 a标签对象实现不一致
	** 为保障IE下兼容url 为全路径
	*/
	url.join = function( url, obj){
		var a,name,value,old_arr,param_arr = [],p,i=0,host="";
		var get = /([^&]+)=([^&]+)/,
			reg_url = /^((http|https|ftp)\:\/\/)?(((?:\w+\.){2,4}\w+)?(\:[0-9]{1,4})?)?([a-zA-Z0-9_\-\.\/~]+)?(\?[\w&%~\-\=\{\}\[\]\@\:\(\)\. ]+)?(#[\w&%~\-\=\{\}\[\]\@\:\(\)\. ]+)?/,
			url = url+"",result;
		//正则结果[url,protocol://,protocol,host,hostname,:port,path,search,host]
		result = url.match(reg_url);
		host = result[3] || location.host || "";
		if(result[7]){
			old_arr = result[7].replace("?","").split("&");
			for(;i<old_arr.length;i++){
				var param = old_arr[i].match(get);
				if(param && !obj[param[1]] ){
					obj[param[1]] = param[2];
				}
			}
		}
		if( !(obj instanceof Object || typeof url !== "string") ){return;}
		for(name in obj){
			if(obj.hasOwnProperty(name)){
				value = obj[name];
				if(value && typeof value === "object"){
					param_arr.push(name+"="+JSON.stringify(value));
				}else if(typeof value === "number" || typeof value ==="string"){
					param_arr.push(name+"="+value);
				}
			}
		}
		return "https://"+ host + result[6] + "?" + param_arr.join("&");
	};
	module.exports = url;
});
