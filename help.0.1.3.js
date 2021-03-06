_$().config({
	help: {
		browser: "浏览器识别 \r\n _$().browser.firefox([true]); \r\n 参数：true 返回版本号 \r\n 返回 true|false",
		cache:"本地存储 localStorage 设置 \r\n _$().cache(key,value); \r\n 参数 value 为空，返回对应的值。key 为空，返回长度。key 为数字，返回索引对应的名称。全不为空，设置对应的值。",
		cacheRemove:"本地存储 localStorage 删除 \r\n _$().cacheRemove(key); \r\n 参数 key 为空，清空。不为空，删除指定项值。",
		device: "设备类型识别 \r\n _$().device.desktop([true]); \r\n 参数: true 返回设备模式32|64位 \r\n 返回 true|false",
		events: "简易事件 \r\n _$(selector).click(function(){});",
		os: "系统识别 \r\n _$().os.chromeos([true]); \r\n 参数：true 返回版本号 \r\n 返回 true|false",
		ver: "框架内部版本 \r\n _$().ver",
		ajax:{
			get:'ajax get方法 \r\n _$(selector).Ajax([{oninit:function(){console.log(data);return {status:true,info:"测试错误"};},...}]).get([""]); \r\n []内为可选参数',
			post:'ajax post方法 \r\n _$(selector).Ajax([{oninit:function(){console.log(data);return {status:true,info:"测试错误"};},...}]).post([""]); \r\n []内为可选参数'
		},
		jsonp: "jsonp调用 \r\n _$().jsonp(url,function(){},{id:id,oncomplete:function(){});",
		addClass: "追加CLASS类 \r\n _$(selector).addClass('classname classname ...'); \r\n 参数支持空格多名",
		after: "当前标签后插入 \r\n _$(selector).after(element);", 
		append: "当前标签内追加 \r\n _$(selector).append(element);",
		attr: "设置或获取标签属性值 \r\n _$(selector).attr('name'[,'value']); 或 _$(selector).attr({name:value,name:value,...}); \r\n 参数只属性名称，返回该属性值",
		before: "当前标签前插入 \r\n _$(selector).before(element);",
		bind: "事件设置 \r\n _$(selector).bing('click',function(){});",
		bottom: "bottom值 \r\n _$(selector).bottom();",
		ce: "创建标签 \r\n _$(selector).ce('meta');",
		childNodes: "获取标签内所有子标签,包括textnode \r\n _$(selector).childNodes();",
		children: "获取标签内所有子标签,不包括textnode \r\n _$(selector).children();",
		config: "配置外部插件 \r\n _$().config({aaa:function(){},bbb:{ccc:function(){}}});",
		crDom: "创建标签,功能同ce() \r\n _$().crDom('<span></span>');",
		css: "设置或获取标签样式值 \r\n _$(selector).css(''[,'']); 或 _$(selector).css({name:value,name:value,...}); \r\n 参数只样式名称，返回该样式值",
		cutover: "当前使用的标签和之前使用的标签，使用时互换 \r\n _$(selector).cutover(); \r\n 互换后将操作换后的标签",
		dispose: "清空数组或对象 \r\n _$(array|object).dispose([array|object,]function(){});",
		datetime: "返回格式性的时间 \r\n _$().datetime('a'[,12]); \r\n 可选参数为24小时或12小时",
		delay: "等待执行 \r\n _$().delay(function(){},1000);",
		delegate: "事件代理 \r\n _$(selector).delegate('li','click',function(){});",
		domFind: "标签选择器 \r\n _$(selector).domFind(selector).click(function(){}); \r\n 例子中第一个selector被第二个代替",
		each: "循环,类似于for循环 \r\n _$(selector).each([array|object,]function(){});",
		empty: "清空标签中的子标签 \r\n _$(selector).empty();",
		extend: "jlpm扩展功能 \r\n _$().extend(function(){},name); 或 _$().extend({aaa:function(){}});",
		elems:"获取当前标签的同父下一个标签和上一个标签及所有标签、标签内第一个标签和最后一个标签及所有标签、所有父标签 \r\n _$(selector).elems([selector]).parents; \r\n 返回标签或标签集",
		first: "取标签中的第一个标签 \r\n _$(selector).first();",
		gWin: "获取标签的window \r\n _$(selector).gWin();",
		get: "获取对象中符合条件的子对象 \r\n _$(selector).get(0); 或 _$(selector).get(selector);",
		grep: "除去了不需要的元素，生成新的对象 \r\n _$(selector).grep(function(){});",
		hasAttr: "判断对象是否包含当前属性 \r\n _$(selector).hasAttr('name'); \r\n 返回 true|false",
		hasClass: "判断对象是否包含当前样式类 \r\n _$(selector).hasClass('name'); \r\n 返回 true|false",
		hasNode: "判断对象是否包含当前标签 \r\n _$(selector).hasNode(element); \r\n 返回 true|false",
		hasParent: "判断对象是否等于当对象的父标签 \r\n _$(selector).hasParent(element); \r\n 返回 true|false",
		hasData: "判断对象是否包含在当前对象内 \r\n _$(selector).hasData(object); \r\n 返回 true|false",
		height: "获取对象的高度值 \r\n _$(selector).height();",
		hide: "隐藏对象 \r\n _$(selector).hide();",
		html: "设置或获取标签的HTML代码 \r\n _$(selector).html([code]); \r\n 可选参数未传入时返回对象内部的HTML代码,反之设置",
		isLocalStorage:"获取浏览器是否支持HTML5LocalStorage \r\n _$().isLocalStorage() \r\n 返回 true|false",
		inArray: "获取对象在数组中的索引 \r\n _$().inArray(element,array);",
		index: "当前标签的组中INDEX或组总长度 \r\n _$(array).index([value]); \r\n 可选参数未传入时返回长度，反之取索引值",
		info: "取设备、浏览器等信息 \r\n _$().info().bs;",
		innerHeight: "获取对象内部高度 \r\n _$(selector).innerHeight();",
		innerWidth: "获取对象内部宽度 \r\n _$(selector).innerWidth();",
		isArray: "是否为数组 \r\n _$().isArray(value); \r\n 返回 true|false",
		isDate: "是否为日期 \r\n _$().isDate(value); \r\n 返回 true|false",
		isElement: "是否为标签 \r\n _$().isElement(value); \r\n 返回 true|false",
		isEmpty: "是否为空 \r\n _$().isEmpty(value); \r\n 返回 true|false",
		isEmptyObject: "是否为空对象 \r\n _$().isEmptyObject(value); \r\n 返回 true|false",
		isFunction: "是否为function \r\n _$().isFunction(value); \r\n 返回 true|false",
		isHash: "是否为hash \r\n _$().isHash(value); \r\n 返回 true|false",
		isHidden: "是否为隐藏 \r\n _$().isHidden(value); \r\n 返回 true|false",
		isNaN: "是否为NaN \r\n _$().isNaN(value); \r\n 返回 true|false",
		isNative: "方法或函数是否本地所有 \r\n _$().isNative(value); \r\n 返回 true|false",
		isNodeList: "是否为NodeList \r\n _$().isNodeList(value); \r\n 返回 true|false",
		isNumeric: "是否为数字 \r\n _$().isNumeric(value); \r\n 返回 true|false",
		isObject: "是否为对象 \r\n _$().isObject(value); \r\n 返回 true|false",
		isObjectList: "是否为对象列表 \r\n _$().isObjectList(value); \r\n 返回 true|false",
		isOnff: "HTML5检测是否在线 \r\n _$().isOnff(); \r\n 返回 true|false",
		isPO: "是否为原型的对象 \r\n _$().isPO(value); \r\n 返回 true|false",
		isSingle: "是否为单一对象 \r\n _$().isSingle(value); \r\n 返回 true|false",
		isString: "是否为字符串 \r\n _$().isString(value); \r\n 返回 true|false",
		isVisible: "是否为显示 \r\n _$().isVisible(value); \r\n 返回 true|false",
		isWin: "是否为window \r\n _$().isWin(value); \r\n 返回 true|false",
		keys: "枚举出的属性的列表 \r\n _$(selector).keys();",
		last: "获取标签内最后的子标签 \r\n _$(selector).last();",
		left: "获取对象的LEFT值 \r\n _$(selector).left();",
		loadon: "加载javascript文件或css样式文件 \r\n _$().loadon(url,function(){},{}); \r\n JS文件加载完成后执行参数中的function回调函数",
		map: "把每个元素通过函数传递到当前匹配集合中生成新的对象 \r\n _$(selector).map(function(){});",
		merge: "合并两个数组，生成一个新的数组 \r\n _$(selector).merge(array[,array]);",
		next: "获取标签的同父下一标签 \r\n _$(selector).next();",
		nextAll: "获取标签的同父后面的所有标签 \r\n _$(selector).nextAll();",
		oddevenInt: "获取奇偶对象 \r\n _$(selector).oddevenInt('odd|even');",
		off: "取消事件或事件代理 \r\n _$(selector).off('click'[,'li']); \r\n 可选参数未传入时取消事件，反之取消事件代理",
		on: "设置事件或事件代理 \r\n _$(selector).on('click'[,'li'],function(){}); \r\n 可选参数未传入时设置事件，反之设置事件代理",
		orderExec: "顺序执行",
		outerHeight: "获取对象外部高度 \r\n _$(selector).outerHeight();",
		outerWidth: "获取对象外部宽度 \r\n _$(selector).outerWidth();",
		parent: "获取标签的父标签 \r\n _$(selector).parent();",
		parents: "获取标签所有的父标签 \r\n _$(selector).parents([selector]); \r\n 可选参数未传入时返回所有父标签，反之返回符合条件的父标签",
		prepend: "标签内插入首标签 \r\n _$(selector).prepend(element);",
		prev: "获取标签的同父上一个标签 \r\n _$(selector).prev();",
		prevAll: "获取标签的同父前面所有的标签 \r\n _$(selector).prevAll();",
		random: "获取随机数 \r\n _$().random();",
		ready: "页面标签加载完成后执行 \r\n _$(document).ready(function(){});",
		remove: "删除标签 \r\n _$(selector).remove([element]); \r\n 可选参数未传入时删除selector本身，反之删除selector内的参数element",
		removeAttr: "删除属性 \r\n _$(selector).removeAttr('name');",
		removeClass: "删除样式类 \r\n _$(selector).removeClass('name name ...'); \r\n 可删除例子中格式多样式类",
		replace: "替换标签 \r\n _$(selector).replace(element);",
		replaceRN: "替换 \/r\/n 字符 \r\n _$().replaceRN('string');",
		replaceText: "替换文本 \r\n _$().replaceText('string',替换条件 ,替换为的文本, 范围true|false);",
		right: "获取对象的right值 \r\n _$(selector).right();",
		scrollHeight: "获取对象的scrollHeight值 \r\n _$(selector).scrollHeight();",
		scrollLeft: "获取对象的scrollLeft值 \r\n _$(selector).scrollLeft();",
		scrollTop: "获取对象的scrollTop值 \r\n _$(selector).scrollTop();",
		scrollWidth: "获取对象的scrollWidth值 \r\n _$(selector).scrollWidth();",
		show: "显示对象 \r\n _$(selector).show();",
		siblings: "获取标签的同父所有的标签 \r\n _$(selector).siblings();",
		size: "获取对象的width、height、top、left的值 \r\n _$(selector).size().left;",
		split: "字符串数组化 \r\n _$().split(原始文本, 间隔符[,索引]);",
		textValue: "设置或获取标签的value或文本 \r\n _$(selector).textValue([value]); \r\n 可选参数未传入时返回标签的值，反之设置标签的值",
		toArray: "对象数组化 \r\n _$().toArray(value);",
		toggle: "隐藏和显示切换 \r\n _$(selector).toggle();",
		toggleClass: "样式类切换 \r\n _$(selector).toggleClass('name name ...'); \r\n 如果已经包含样式类将删除样式类",
		top: "获取对象的top值 \r\n _$(selector).top();",
		trim: "删除字符串的空格 \r\n _$().trim(string,位置);",
		type: "返回对象类型 \r\n _$().type(object);",
		unbind: "取消事件 \r\n _$(selector).unbind('name');",
		undelegate: "取消事件代理 \r\n _$(selector).undelegate('li','click');",
		values: "枚举出的属性值的列表 \r\n _$(selector).values();",
		width: "获取对象的width值 \r\n _$(selector).width();",
		wrap: "包裹标签 \r\n _$(selector).wrap(element,包裹类型in|df);"
	},
	touchHelp:{
		touch:"左右上下单指滑动 \r\n _$(selector).touch({callback:function(dir,scrollX){}}); \r\n dir返回方向,scrollX提供滚动条进度值",
		tap:"点击TAP \r\n _$(selector).tap(function(event,touch,type){}); \r\n type返回点击类型，双击或单击",
		isScrollShow:"是否有滚动条 \r\n _$(selector).isScrollShow(); \r\n 返回true|false",
		doubletap:"双击TAP \r\n _$(selector).doubletap(function(event,touch,type){});",
		singletap:"单击TAP \r\n _$(selector).singletap(function(event,touch,type){});"
	},
	qaniHelp:{
		custom:"自定义动画，包括CSS3Transform动画 \r\n $(selector).custom({left:'0',top:'0'}[,'slow','elasticInOut']).play(); \r\n 或者 $(selector).custom({addClass:'classNameA'[,removeClass:'classNameB']}).play(); \r\n 或者 $(selector).custom({time:'1000'[,width:'200px',...]}).play();",
		defer:"暂缓执行动画并同时可完成一个任务 \r\n $(selector).custom({left:'0',top:'0'}).defer([function(){},]1000).play();",
		stop:"取消下一动画的执行 \r\n $(selector).stop();",
		show:"显示动画 \r\n $(selector).show();",
		hide:"隐藏动画 \r\n $(selector).hide();",
		toggle:"显示和隐藏动画切换 \r\n $(selector).hide().toggle();"
	}
});
