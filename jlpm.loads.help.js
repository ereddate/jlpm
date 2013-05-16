jlpmLoads.extend("help", {
  readme:"jlpmLoads 是一个以引导为主的JS小型框架。\r\n它提供了动态加载、JSONP远程数据请求、内外部扩展、函数顺序执行等功能外，\r\n还提供了多文件加载、对象类型判断、多框架同存等功能。\r\n大大方便了开发人员的快速开发。",
	"0": "当前获取到的对象",
	content: "当前对象的父对象",
	len: "当前对象的长度",
	aid: "辅助器",
	ver: "框架版本",
	fn: {
		ready: "ready \r\n document 对象onload事件 \r\n jlpmLoads(function(){});",
		noConflict:"noConflict \r\n 多框架共存 \r\n jlpmLoads.noConflict([true]);"
	},
	config: "配置外部插件 \r\n jlpmLoads.config({aaa:{url:url, callback:function(){}, bbb:{url:url, callback:function(){}});",
	use: "执行配置 \r\n jlpmLoads.use('aaa',function(){});",
	Exec: "Exec \r\n 文本执行，替换eval \r\n jlpmLoads.Exec(text);",
	callbacks: "callbacks \r\n 函数顺序执行 \r\n jlpmLoads.callbacks().add(function(){}).defer([function(){}, ]1000).fire();",
	each: "each \r\n for循环 \r\n jlpmLoads.each(array||hash, function(){});",
	extend: "extend \r\n jlpmLoads扩展 \r\n jlpmLoads.extend('name'||object, {}||function(){});",
	isEmpty: "isEmpty \r\n 判断对象是否为空 \r\n jlpmLoads.isEmpty(object); \r\n 返回 true||false",
	isEmptyObject: "isEmptyObject \r\n 判断是否为空对象 \r\n jlpmLoads.isEmptyObject(object) \r\n 返回 true||false",
	implement: "implement \r\n jlpmLoads.prototype扩展 \r\n jlpmLoads.implement('name'||object, {}||function(){});",
	isFunction: "isFunction \r\n 判断对象是否为function \r\n jlpmLoads.isFunction(object); \r\n 返回 true||false",
	isNumeric: "isNumeric \r\n 判断对象是否为数字 \r\n jlpmLoads.isNumeric(object); \r\n 返回 true||false",
	isParentObject: "isParentObject \r\n 判断对象是否是父对象 \r\n jlpmLoads.isParentObject(object); \r\n 返回 true||false",
	jsonp: "jsonp \r\n jsonp远程请求 \r\n jlpmLoads.jsonp(url, function(){}, {callbackReplacer:'cb||callback', id:'callback_name'});",
	loadCss: "loadCss \r\n 动态加载CSS \r\n jlpmLoads.loadCss(url, function(){}, {async:async, id:name, ...});",
	loadJs: "loadJs \r\n 动态加载javascript \r\n jlpmLoads.loadJs(url, function(){}, {async:async, id:name, ...});",
	random: "random \r\n 随机数 \r\n jlpmLoads.random(1000,10);",
	trim: "trim \r\n 清空格 \r\n jlpmLoads.trim(text);",
	multiload: "multiload \r\n 多文件顺序加载 \r\n jlpmLoads.multiload('../sss.js ../sss.css');",
	ua: "ua \r\n 获取浏览器、flash及设备等信息 \r\n jlpmLoads.ua().browser 或 jlpmLoads.ua().flashver",
	hasAttr: "hasAttr \r\n 判断对象是否此属性 jlpmLoads.hasAttr(name, object); \r\n 返回true||false"
});
