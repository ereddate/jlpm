;
(function(win) {
  var doc = win.document,
		_toString = Object.prototype.toString,
		hasOwn = Object.prototype.hasOwnProperty,
		docElem = doc.documentElement,
		indexOf = Array.prototype.indexOf,
		slice = Array.prototype.slice,
		_jlpm = win.jlpm,
		_$$ = win._$,
		_trim = "".trim,
		DOMContentLoaded = function() {
			if (doc.addEventListener) {
				doc.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
			} else if (doc.readyState === "complete") {
				doc.detachEvent("onreadystatechange", DOMContentLoaded);
			}
		},
		jlpm = function(selector, content) {
			return new jlpm.fn.init(selector, content);
		},
		isArraylike = function(obj) {
			var length = obj.length,
				type = typeof obj;
			if (typeof obj === "object" && "setInterval" in obj) {
				return false;
			}
			if (obj.nodeType === 1 && length) {
				return true;
			}
			return type === "array" || type !== "function" && (length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj);
		};
	jlpm.fn = jlpm.prototype = {
		constructor: jlpm,
		init: function(selector, content) {
			return this.domFind(selector, content);
		},
		domFind: function(selector, content) {
			if (!selector) return this;
			var elem = undefined;
			if (!jlpm.isString(selector)) {
				jlpm.record(undefined, jlpm.isSingle(selector) ? selector[0] : selector, content, (selector.nodeType ? 1 : selector.length ? selector.length : 0), undefined);
				return this;
			} else {
				if ( !! jlpm.Doms[selector] && !content) {
					elem = jlpm.Doms[selector];
				} else if ( !! doc.querySelectorAll) {
					try {
						elem = (content && content.nodeType) ? content.querySelectorAll(selector) : doc.querySelectorAll(selector);
					} catch (e) {
						elem = undefined;
					};
				} else {
					elem = jlpm.find ? content != undefined ? jlpm.find(selector, content || doc) : jlpm.find(selector) : undefined;
				}
				jlpm.record(undefined, jlpm.isSingle(elem) ? elem[0] : elem, content, (elem.nodeType ? 1 : elem.length ? elem.length : 0), undefined);
				return this;
			}
		},
		each: function(obj, callback, args) {
			jlpm.each(obj, callback, args);
			return this;
		},
		isString: function(v) {
			return (v != null) ? typeof v === "string" || v.constructor == String && _toString.call(v) === '[object String]' : false;
		},
		isFunction: function(v) {
			return (v != null) ? typeof v === "function" && typeof v.call != 'undefined' && _toString.call(v) === '[object Function]' : false;
		}
	};

	jlpm.fn.init.prototype = jlpm.fn;

	jlpm.extend = jlpm.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
		i = 1,
			length = arguments.length,
			deep = false;
		if (typeof target === "boolean") {
			deep = target;
			target = arguments[1] || {};
			i = 2;
		}
		if (typeof target !== "object" && !jlpm.fn.isFunction(target)) {
			target = {};
		}
		if (length === i) {
			target = this;
			--i;
		}
		if (jlpm.fn.isFunction(arguments[1]) && jlpm.fn.isString(arguments[0])) {
			target = this;
			target[arguments[0]] = arguments[1];
		} else if (jlpm.fn.isFunction(arguments[1]) && jlpm.isPO(arguments[0])) {
			target = this;
			for (name in arguments[0]) {
				if (!target[name]) target[name] = {};
				target[name][arguments[0][name]] = arguments[1];
			}
		} else {
			for (; i < length; i++) {
				if ((options = arguments[i]) != null) {
					for (name in options) {
						src = target[name];
						copy = options[name];
						if (target === copy) {
							continue;
						}
						if (deep && copy && (jlpm.isPO(copy) || (copyIsArray = jlpm.isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && jlpm.isArray(src) ? src : [];
							} else {
								clone = src && jlpm.isPO(src) ? src : {};
							}
							target[name] = jlpm.extend(deep, clone, copy);
						} else if (copy !== undefined) {
							target[name] = copy;
						}
					}
				}
			}
		}
		return target;
	};
	jlpm.extend({
		Doms: [],
		_domID: 0,
		isReady: false,
		ver: "0.1.201304231005",
		propfx: { //字段修复
			tabindex: "tabIndex",
			readonly: "readOnly",
			"for": "htmlFor",
			"class": "className",
			maxlength: "maxLength",
			cellspacing: "cellSpacing",
			cellpadding: "cellPadding",
			rowspan: "rowSpan",
			colspan: "colSpan",
			usemap: "useMap",
			frameborder: "frameBorder",
			contenteditable: "contentEditable",
			width: "Width",
			height: "Height",
			left: "Left",
			top: "Top",
			cssExpand: ["Top", "Right", "Bottom", "Left"],
			cssShow: {
				position: "absolute",
				visibility: "hidden",
				display: "block"
			}
		},
		emptyFn: function() {},
		sMatch: { //正则表达式
			rnotwhite: /\S+/g,
			rurl: /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
			rcss: /(^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)|)((([\/]|)((?:[\w\u00c0-\uFFFF\-])+))+).css((([\?|\&]+)((?:[\w\u00c0-\uFFFF\-])+)([\=]+)((?:[\w\u00c0-\uFFFF\-\.])+|))+|)$/,
			rvalidchars: /^[\],:{}\s]*$/,
			rvalidescape: /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
			rvalidtokens: /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
			rvalidbraces: /(?:^|:|,)(?:\s*\[)+/g,
			rnative: /\{\s*\[native code\]\s*\}/,
			rxhtmlTag: /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
			rboolean: /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
			rbrace: /^(?:\{.*\}|\[.*\])$/,
			rmultiDash: /([a-z])([A-Z])/g,
			ralpha: /alpha\([^)]*\)/i,
			ropacity: /opacity=([^)]*)/,
			rtrim: /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
			/*repTrim: /^\s+|^(&nbsp;)+/gi,
			repTrimA: /(^\s+|^(&nbsp;)+)|(\s+$|(&nbsp;)+$)/gi,
			repTrimB: /^[\s\uFEFF\xA0]+|^[(&nbsp;)\uFEFF\xA0]+/g,
			repTrimC: /[\s\uFEFF\xA0]+$|[(&nbsp;)\uFEFF\xA0]+$/g,
			repTrimD: /^([\s\uFEFF\xA0]+|[(&nbsp;)\uFEFF\xA0]+)|([\s\uFEFF\xA0]+|[(&nbsp;)\uFEFF\xA0]+)$/g,*/
			rmsPrefix: /^-ms-/,
			rdashAlpha: /-([a-z])/ig,
			rdisplayswap: /^(none|table(?!-c[ea]).+)/,
			ID: /^:id=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*/,
			CLASS: /^:class=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*/,
			NAME: /^:name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*/,
			TYPE: /^:type=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*/,
			ATTR: /^:attr=\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?:)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*/,
			TAG: /^:tag=((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
			CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
			POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
			PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/,
			rdigit: /\d/,
			//rurl: /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
			rlocalProtocol: /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
			rclass: /[\n\t\r]/g,
			rspace: /\s+/,
			cen: /^[A-Z u4E00-u9FA5]+$/,
			cen2: /^[a-z A-Z u4E00-u9FA5]+$/,
			cn: /^[1-9]d{5}(?!d)/,
			cn2: /^[u4e00-u9fa5]+$/,
			en: /^[A-Z]+$/,
			en2: /^[a-z A-Z]+$/,
			empty: /^\s*$/,
			url: /^[a-zA-z]+:\/\/*/,
			number: /^[0-9]+$/,
			date: /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/,
			time: /^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/,
			datetime: /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/,
			ip: /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g,
			email: /^(?:[a-zA-Z0-9]+[_\-\+\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$/,
			zipcode: /^[1-9]{1}[0-9]{5}$/,
			qq: /^[1-9][0-9]{4,}/,
			pwd: /^[0-9a-zA-Z]{6,15}/,
			usname: /^[a-zA-Z][a-zA-Z0-9_]{6,15}$/,
			tel: /^[+]{0,1}(\d){1,4}[ ]{0,1}([-]{0,1}((\d)|[ ]){1,12})+$/,
			mtel: /^[0-9]{11}$/,
			mcard: /^\d{19}$/g,
			decimal: /^[-]{0,1}(\d+)[\.]+(\d+)$/,
			money: /^[0-9]+[\.][0-9]{0,3}$/,
			big0num: /^\d+$/,
			rsingleTag: /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
			ScriptFragment: /<script[^>]*>([\\S\\s]*?)<\/script>/
		},
		class2type: {},
		type: function(v) {
			return v == null ? String(v) : this.class2type[_toString.call(v)] || "object";
		},
		record: function(old, ev, content, length, selector) {
			var df = {
				oldElement: old != undefined ? old : this[0] != undefined ? this[0] : doc,
				content: content != undefined ? content : ev.parentNode ? ev.parentNode : doc,
				length: length != undefined ? length : ev.length ? ev.length : 0,
				"0": selector ? this.crid(ev, selector) : this.crid(ev)
			};
			jlpm.fn.extend(df);
			jlpm.extend(df);
			return this;
		},
		reid: function(v) {
			var dom = typeof v == "string" ? this.Doms["JLDom_" + escape(v).replace(/[- _ . ! ~ * ' ( )]/g, /\$0/)] : this.hasAttr("_domID", v) ? this.Doms[v._domID] : false;
			return dom;
		},
		crid: function(v, t) {
			if (v) {
				if (this.Doms._count >= 50) {
					this.Doms = this.dispose(this.Doms);
					this.Doms._count = 0;
				}
				if (v.nodeType || typeof t === "string") {
					var id = this.hasAttr("_domID", v) ? v._domID : t && typeof t == "string" ? escape(t).replace(/[- _ . ! ~ * ' ( )]/g, /\$0/) : this._domID++;
					if (!this.hasAttr("_domID", v)) this.Doms._count += 1;
					try {
						v._domID = (id + "").indexOf("JLDom_") > -1 ? id : "JLDom_" + id;
					} catch (e) {}
					this.Doms[((id + "").indexOf("JLDom_") > -1 ? id : "JLDom_" + id)] = v;
				}
			}
			return v;
		},
		each: function(obj, callback, args) {
			if (this.isFunction(obj)) {
				callback = obj;
				obj = this[0];
			}
			var value, i = 0,
				length = obj.length,
				isArray = isArraylike(obj);
			if (obj && (typeof obj == "string" || obj.nodeType || obj == win || obj == doc)) {
				return callback.call(obj, 0, obj);
			}
			if (args) {
				if (isArray) {
					for (; i < length; i++) {
						value = callback.apply(obj[i], args);
						if (value === false) {
							break;
						}
					}
				} else {
					for (i in obj) {
						value = callback.apply(obj[i], args);
						if (value === false) {
							break;
						}
					}
				}
			} else {
				if (isArray) {
					for (; i < length; i++) {
						value = callback.call(obj[i], i, obj[i]);
						if (value === false) {
							break;
						}
					}
				} else {
					for (i in obj) {
						value = callback.call(obj[i], i, obj[i]);
						if (value === false) {
							break;
						}
					}
				}
			}
			return this;
		},
		loadon: function(url, callback, options) {
			options = options || {};
			var head = doc.getElementsByTagName('head')[0] || docElem,
				type = /(^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)|)((([\/]|)((?:[\w\u00c0-\uFFFF\-])+))+).css((([\?|\&]+)((?:[\w\u00c0-\uFFFF\-])+)([\=]+)((?:[\w\u00c0-\uFFFF\-\.])+|))+|)$/.test(url),
				dom = doc.createElement(!type ? 'script' : 'link'),
				done = false;
			options.id = options.id ? options.id : (type ? "jlpm_loadCss" : "jlpm_loadJs") + this.random(10000, 0);
			if (!type) {
				if ("async" in dom) {
					options.async = options["async"] || "";
				}
				options.src = url + (/\?/.test(url) ? "&" : "?") + "random=" + this.random(10000, 0);
				this.each(options, function(attr, value) {
					dom[attr] = value || "";
				});
				dom.onerror = dom.onload = dom.onreadystatechange = function() {
					if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
						done = true;
						if (callback) {
							callback();
						}
						dom.onerror = dom.onload = dom.onreadystatechange = null;
						head.removeChild(dom);
					}
				};
			} else {
				this.each({
					rel: 'stylesheet',
					type: 'text/css',
					href: url,
					id: 'jlpm_loadCss' + this.random(10000, 0)
				}, function(attr, value) {
					dom[attr] = value;
				});
			}
			head.insertBefore(dom, head.firstChild);
			return this;
		},
		configs:{_count:0},
		config: function() { //配置外部插件
			var target = arguments[1] || this,
				obj = arguments[0] || {},
				callback;
			if (this.isFunction(target)) {
				callback = target;
				target = this;
			} else {
				target = this;
			}
			jlpm.each(obj, function(name, value) {
				jlpm.configs[name] = value;
				jlpm.configs[name]["status"] = false;
				jlpm.configs._count +=1;
			});
			if (callback) callback();
			return target;
		},
		execConfig: function(name,callback){
			if (jlpm.configs[name]&&!jlpm[name]){
				jlpm.extend(name, function(callback){
					jlpm[name]&&jlpm.configs[name]["status"] ? (function(){
						if (jlpm.configs[name]["callback"]) jlpm.configs[name]["callback"]();
						if (callback) callback();
					})() : (function(){
						jlpm.loadon(jlpm.configs[name]["url"] ? jlpm.configs[name]["url"] : "", function(){
							jlpm.configs[name]["status"] = true;
							if (jlpm.configs[name]["callback"]) jlpm.configs[name]["callback"]();
							if (callback) callback();
						});
					})();
				});
			}
			jlpm[name](callback);
		},
		hasAttr: function(name, m) { //是否包含此属性
			var m = m ? m : this[0];
			return m ? hasOwn.call(m, name) ? true : m[name] != undefined ? true : false : false;
		},
		trim: _trim && !_trim.call("\uFEFF\xA0") ? function(text) {
			return text == null ? "" : _trim.call(text);
		} : function(text) {
			return text == null ? "" : (text + "").replace(this.sMatch.rtrim, "");
		},
		isPO: function(v) {
			var obj = v ? v : null;
			if (!obj || typeof obj !== "object" || obj.nodeType || typeof obj === "object" && "setInterval" in obj) {
				return false;
			}
			try {
				if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
					return false;
				}
			} catch (e) {
				return false;
			}
			var key;
			for (key in obj) {}
			return key === undefined || hasOwn.call(obj, key);
		},
		isEmpty: function(v) {
			return v == undefined || v == null || v == "" || ((this.isArray(v) || this.isNodeList(v)) && v.length == 0) || (typeof v == "object" && this.isEmptyObject(v)) ? true : this.isString(v) ? /^\s*$/.test(v) : false;
		},
		isEmptyObject: function(obj) {
			var obj = obj ? obj : this[0];
			for (var name in obj) {
				return false;
			}
			return true;
		},
		isNative: function(fn) { //方法或函数是否本地所有
			return this.sMatch.rnative.test(fn + "");
		},
		isNumeric: function(v) {
			return v != null ? !isNaN(parseFloat(v)) && isFinite(v) || typeof v === "number" && _toString.call(v) === '[object Number]' : false;
		},
		isNodeList: function(v) {
			var v = v ? v : null;
			return /NodeList|HTMLCollection/.test(_toString.call(v));
		},
		isNaN: function(v) {
			return v == null || !(/\d/.test(v)) || isNaN(v);
		},
		isSingle: function(v) {
			return v && (this.isArray(v) || this.isNodeList(v)) && !this.isEmpty(v) && v.length == 1 ? true : false;
		},
		isElement: function(v) {
			var nodecol = ",a,abbr,acronym,address,applet,area,b,base,basefont,bdo,big,blockquote,body,br,button,caption,center,cite,code,col,colgroup,dd,del,dir,div,dfn,dl,dt,em,fieldset,font,form,frame,frameset,h1,h2,h3,h4,h5,h6,head,hr,html,i,iframe,img,input,ins,isindex,kbd,label,legend,li,link,map,menu,meta,noframes,noscript,object,ol,optgroup,option,p,param,pre,q,s,samp,script,select,small,span,strike,strong,style,sub,sup,table,tbody,td,textarea,tfoot,th, thead,title,tr,tt,u,ul,var,item,pubDate,author,description,";
			nodecol += "abbr,figcaption,mark,output,summary,article,aside,audio,canvas,command,hgroup,datagrid,datalist,datatemplate,details,dialog,embed,event-source,figure,footer,header,m,meter,nav,nest,output,progress,rule,section,time,video,", isNbool = false;
			return v ? this.isString(v) && nodecol.indexOf("," + v.toLowerCase() + ",") > -1 && v.nodeType == 1 || v.nodeType == 1 || v == doc || v == win ? true : false : false;
		},
		isHash: function(v) {
			var m = m ? m : this[0];
			return v instanceof m;
		},
		isDate: function(v) {
			return _toString.call(v) === '[object Date]';
		},
		isString: function(v) {
			return jlpm.fn.isString(v);
		},
		isFunction: function(v) {
			return jlpm.fn.isFunction(v);
		},
		isArray: function(v) {
			return (v != null) ? (v.constructor == Array) ? true : false : false;
		},
		random: function(mx, mi) { //随机数
			return (mx) ? Math.floor(Math.random() * (mx - (mi || 0) + 1) + (mi || 0)) : 0;
		},
		dispose: function(obj, callback) { //数据清除
			var self = this,
				obj = obj ? obj : this[0];
			if (this.isFunction(obj)) {
				callback = obj;
				obj = this[0];
			}
			if (this.isArray(obj)) {
				callback ? callback(obj, name, value) : true;
				obj.length = 0;
			} else {
				this.each(obj, function(name, value) {
					callback ? callback(obj, name, value) : true;
					if (self.isArray(obj[name])) {
						self.dispose(obj[name]);
					} else {
						obj[name] = null;
					}
					try {
						delete obj[name];
					} catch (e) {
						obj.removeAttribute(name);
					}
				});
			}
			return obj;
		},
		inArray: function(elem, array) {
			var elem = elem,
				array = array ? array : this[0],
				len, i;
			if (array) {
				if (indexOf) {
					len = null;
					return indexOf.call(array, elem, i);
				}
				len = array.length;
				i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
				for (; i < len; i++) {
					if (i in array && array[i] === elem) {
						return i;
					}
				}
			}
			return -1;
		},
		merge: function(first, second) {
			var first = first,
				second = second ? second : this[0],
				i = first.length,
				j = 0;
			if (typeof second.length === "number") {
				for (var l = second.length; j < l; j++) {
					first[i++] = second[j];
				}
			} else {
				while (second[j] !== undefined) {
					first[i++] = second[j++];
				}
			}
			first.length = i;
			return first;
		},
		map: function(elems, callback, arg) {
			var value, key, ret = [],
				elems = elems ? elems : this[0],
				callback = callback,
				arg = arg,
				i = 0,
				length = elems.length,
				isArray = length !== undefined && typeof length === "number" && ((length > 0 && elems[0] && elems[length - 1]) || length === 0 || this.isArray(elems));
			// Go through the array, translating each of the items to their
			if (isArray) {
				for (; i < length; i++) {
					value = callback(elems[i], i, arg);
					if (value != null) {
						ret[ret.length] = value;
					}
				}
				// Go through every key on the object,
			} else {
				for (key in elems) {
					value = callback(elems[key], key, arg);
					if (value != null) {
						ret[ret.length] = value;
					}
				}
			}
			// Flatten any nested arrays
			return ret.concat.apply([], ret);
		},
		grep: function(elems, callback, inv) {
			var ret = [],
				retVal, elems = elems ? elems : this[0],
				callback = callback,
				inv = inv;
			inv = !! inv;
			// Go through the array, only saving the items
			// that pass the validator function
			for (var i = 0, length = elems.length; i < length; i++) {
				retVal = !! callback(elems[i], i);
				if (inv !== retVal) {
					ret.push(elems[i]);
				}
			}
			return ret;
		},
		hasData: function(value, data) {
			if (value == undefined) return false;
			var data = data ? data : this[0];
			return this.inArray(value, data) > -1 ? true : false;
		},
		datetime: function(type) { //获取日期及时间
			var dateTime = function(type) {
				var today = new Date(),
					initArray = function() {
						this.length = initArray.arguments.length;
						for (var i = 0; i < this.length; i++) {
							this[i + 1] = initArray.arguments[i];
						}
					},
					hours = today.getHours(),
					minutes = today.getMinutes(),
					seconds = today.getSeconds(),
					timeslot = "" + ((hours >= 12) ? "下午" : "上午"),
					timeValue = "" + timeslot + " ";
				timeValue += ((type == 12) ? ((hours > 12) ? hours - 12 : hours) : hours);
				timeValue += ((minutes < 10) ? ":0" : ":") + minutes;
				timeValue += ((seconds < 10) ? ":0" : ":") + seconds;
				var fyear = today.getFullYear(),
					fmonth = (today.getMonth() + 1),
					fdate = today.getDate(),
					d = new initArray("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"),
					datev = today.getFullYear() + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日" + d[today.getDay() + 1],
					stime = ((type == 12) ? ((hours > 12) ? hours - 12 : hours) : hours) + ((minutes < 10) ? ":0" : ":") + minutes + ((seconds < 10) ? ":0" : ":") + seconds,
					sdate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(),
					timev = timeValue;
				/*gdt = (arge == "all") ? datev + " " + timev : ((arge == "date") ? datev : ((arge == "time") ? timev : ((arge == "short") ? sdate + " " + stime : ((arge == "shortdate") ? sdate : ((arge == "shorttime") ? stime : datev + " " + timev))))),
					gdt = (arge == "year") ? fyear : (arge == "month") ? fmonth : (arge == "day") ? fdate : (arge == "hours") ? hours : (arge == "minutes") ? minutes : (arge == "seconds") ? seconds : (age == "num") ? (sdate + " " + stime).replace(/-|:| /g, "") : (gdt != null) ? gdt : datev + " " + timev;*/
				return {
					all: datev + " " + timev,
					date: datev,
					time: timev,
					shortall: sdate + " " + stime,
					shortdate: sdate,
					shorttime: stime,
					year: fyear,
					month: fmonth,
					day: fdate,
					timeslot: timeslot,
					hour: hours,
					minute: minutes,
					second: seconds,
					number: (sdate + " " + stime).replace(/-|:| /g, "")
				};
			};
			return dateTime.call(this, type);
		},
		replaceRN: function(text) { //替换\r\n为空
			return this.replaceText(text, (this.ua().browser == "msie" && /6|7|8|9/.test(this.ua().browserver) ? '\r\n' : '\n'), "", 1);
		},
		replaceText: function(text, reallyDo, replaceWith, ignoreCase) { //替换文本
			return text.replace(((!RegExp.prototype.isPrototypeOf(reallyDo)) ? new RegExp(reallyDo, (ignoreCase ? "gi" : "g")) : reallyDo), replaceWith);
		},
		parseJSON: function(data) { //生成JSON
			var data = data ? data : this[0];
			if (typeof data !== "string" || !data) {
				return null;
			}
			// Make sure leading/trailing whitespace is removed (IE can't handle it)
			data = this.trim(data, "all");
			data = this.replaceRN(data);
			//alert(data);
			// Attempt to parse using the native JSON parser first
			if (win.JSON && win.JSON.parse) {
				return win.JSON.parse(data);
			}
			// Make sure the incoming data is actual JSON
			// Logic borrowed from http://json.org/json2.js
			if (this.sMatch.rvalidchars.test(data.replace(this.sMatch.rvalidescape, "@").replace(this.sMatch.rvalidtokens, "]").replace(this.sMatch.rvalidbraces, ""))) {
				return (new Function("return " + data))();
			}
			//alert( "Invalid JSON: " + data );
		},
		parseXML: function(data, xml, tmp) { //生成XML
			var data = data ? data : this[0]
			if (win.DOMParser) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString(data, "text/xml");
			} else { // IE
				xml = new ActiveXObject("Microsoft.XMLDOM");
				xml.async = "false";
				xml.loadXML(data);
			}
			tmp = xml.documentElement;
			if (!tmp || !tmp.nodeName || tmp.nodeName === "parsererror") {
				alert("Invalid XML: " + data);
			}
			return xml;
		},
		cutover: function(m) { //新旧切换
			var gold = m ? m : this[0];
			if (this.oldElement) {
				this.record(gold, this.oldElement, null, null);
			}
			return this;
		}
	});

	//回调列表
	jlpm.extend({
		_callbacks: [],
		_callbackLen: 0,
		_callbacksFireNum: 0,
		callbacks:function(){
			var orderExec = function() {
				return new orderExec.fn.init(arguments);
			};
			orderExec.fn = orderExec.prototype = {
				constructor: orderExec,
				init: function() {
					var options = arguments||{};
					this.orderExecSto = undefined;
					this.time = 400;
					if (options) jlpm.extend(this, options);
					return this;
				},
				_add: function(callback) {
					callback = callback ? callback : function() {};
					jlpm._callbacks.push(function(fn) {
						callback();
						fn();
					});
					jlpm._callbackLen += 1;
					return this;
				},
				add: function() {
					return this._add.apply(this,arguments);
				},
				sto: function(callback, time) {
					clearTimeout(this.orderExecSto);
					this.orderExecSto = setTimeout(callback, time);
				},
				defer: function(callback, time) {
					if (jlpm.isFunction(callback)) {
						time = time ? time : 600;
					}
					if (callback == undefined || jlpm.isNumeric(callback)) {
						time = callback ? callback : 600;
					}
					jlpm._callbacks.splice(jlpm._callbackLen, 0, function() {
						var self = this;
						if (jlpm.isFunction(callback)) {
							callback();
						}
						self.sto(function() {
							self.nextto((jlpm._callbacksFireNum + 1 > jlpm._callbackLen ? 0 : jlpm._callbacksFireNum + 1), self.orderExecfnNext);
						}, time);
					});
					jlpm._callbackLen += 1;
					return this;
				},
				orderExecfnNext: function(i) {
					if (i + 1 < jlpm._callbackLen) {
						this.nextto(i + 1, this.orderExecfnNext);
					}else{
						this.clear();
					}
				},
				fire: function() {
					if (jlpm._callbackLen > 0) {
						this.nextto(0, this.orderExecfnNext);
					}
					return this;
				},
				nextto: function(i, callback) {
					var self = this;
					jlpm._callbacksFireNum = i;
					self.sto(function() {
						if (jlpm._callbackLen > 0) {
							if (jlpm._callbacks[i]) {
								jlpm._callbacks[i].call(self, function() {
									callback.call(self, i);
								});
							}
						}
					}, i==0 ? 0 : self.time);
				},
				clear: function() {
					jlpm._callbacks = [];
					jlpm._callbackLen = 0;
					jlpm._callbacksFireNum = 0;
					return this;
				}
			};
			orderExec.fn.init.prototype = orderExec.fn;
			return orderExec.call(this, arguments);
		}
	});

	jlpm.Doms._count = 0;
	jlpm.sMatch.core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
	jlpm.sMatch.rnumnonpx = (function(v) {
		return new RegExp("^(" + v + ")(?!px)[a-z%]+$", "i");
	})(jlpm.sMatch.core_pnum);
	jlpm.sMatch.rnumsplit = (function(v) {
		return new RegExp("^(" + v + ")(.*)$", "i");
	})(jlpm.sMatch.core_pnum);
	jlpm.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
		jlpm.class2type["[object " + name + "]"] = name.toLowerCase();
	});

	jlpm.fn.extend({
		ready: function(callback) {
			var self = this;

			function ready() {
				if (doc.addEventListener) {
					doc.removeEventListener("load", ready, false);
				} else if (doc.readyState === "complete") {
					doc.detachEvent("onload", ready);
				}
				jlpm.isReady = true;
				callback.call(self);
			}
			if (doc.readyState === "complete") {
				setTimeout(ready, 1);
			} else if (doc.addEventListener) {
				doc.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
				win.addEventListener("load", ready, false);
			} else {
				doc.attachEvent("onreadystatechange", DOMContentLoaded);
				win.attachEvent("onload", ready);
				var top = false;
				try {
					top = win.frameElement == null && docElem;
				} catch (e) {}
				if (top && top.doScroll) {
					(function doScrollCheck() {
						if (!jlpm.isReady) {
							try {
								top.doScroll("left");
							} catch (e) {
								return setTimeout(doScrollCheck, 50);
							}
							ready();
						}
					})();
				}
			}
			return this;
		},
		noConflict: function(deep) {
			if (win._$ === jlpm) {
				win._$ = _$$;
			}
			if (deep && win.jlpm === jlpm) {
				win.jlpm = _jlpm;
			}
			return jlpm;
		}
	});

	//ajax
	var ajaxLocation;
	try {
		ajaxLocation = location.href;
	} catch (e) {
		ajaxLocation = doc.createElement("a");
		ajaxLocation.href = "";
		ajaxLocation = ajaxLocation.href;
	}
	jlpm.extend({
		_ajaxID: 0,
		ajaxhandlers: {
			_count: 0
		},
		ajaxLocParts: jlpm.sMatch.rurl.exec(ajaxLocation.toLowerCase()) || [],
		isCdomain: function(value) { //是否跨域
			var parts = this.sMatch.rurl.exec(value.toLowerCase());
			return !!(parts && (parts[1] != this.ajaxLocParts[1] || parts[2] != this.ajaxLocParts[2] || (parts[3] || (parts[1] === "http:" ? 80 : 443)) != (this.ajaxLocParts[3] || (this.ajaxLocParts[1] === "http:" ? 80 : 443))));
		},
		isLocal: function() { //是否本地
			return this.sMatch.rlocalProtocol.test(this.ajaxLocParts[1]);
		},
		formtojson: function(data) {
			var elems = [];
			jlpm(data).children().each(function(i, el) {
				var name = el.name;
				if (el.disabled || !name) {
					return true;
				}
				switch (el.type) {
					case "text":
					case "hidden":
					case "password":
					case "textarea":
						elems.push(encodeURIComponent(name) + "=" + encodeURIComponent(el.value));
						break;
					case "radio":
					case "checkbox":
						if (el.checked) {
							elems.push(encodeURIComponent(name) + "=" + encodeURIComponent(el.value));
						}
						break;
					case "select-one":
						if (el.selectedIndex > -1) {
							elems.push(encodeURIComponent(name) + "=" + encodeURIComponent(el.value));
						}
						break;
					case "select-multiple":
						var opts = el.options;
						for (var j = 0; j < opts.length; ++j) {
							if (opts[j].selected) {
								elems.push(encodeURIComponent(name) + "=" + encodeURIComponent(opts[j].value));
							}
						}
						break;
				}
			});
			return elems.join('&');
		},
		tourl: function(data) {
			var elems = [];
			jlpm(data).each(function(name, value) {
				if (jlpm.isEmpty(value)) value = "";
				if (jlpm.isArray(data[name])) {
					jlpm(data[name]).each(function(i, svalue) {
						elems.push(encodeURIComponent(name) + "=" + encodeURIComponent(svalue));
					});
				} else {
					elems.push(encodeURIComponent(name) + "=" + encodeURIComponent(value));
				}
			});
			return elems.join('&');
		},
		urltojson: function(data) {
			var elems = {};
			jlpm(data.split('&')).each(function(i, obj) {
				var array = obj.split('='),
					value = !array[1] ? "" : array[1];
				elems[array[0]] = value;
			});
			return elems;
		}
	}).extend({
		Ajax: function(options) {
			var jlpmfn = this,
				ajax = function(options) {
					return ajax.fn.init(options);
				},
				allTypes = "*/".concat("*"),
				standardXHR = function() {
					try {
						return new win.XMLHttpRequest();
					} catch (e) {
						return false;
					}
				},
				activeXHR = function() {
					var versions = ajax.fn.defaultXHR;
					while (versions.length > 0) {
						try {
							return new ActiveXObject(versions[0]);
						} catch (ex) {
							versions.shift();
						}
					}
				};
			ajax.fn = ajax.prototype = {
				constructor: ajax,
				init: function(options) {
					return this._init(options);
				},
				defaultHeaders: {
					'Content-type': 'application/x-www-form-urlencoded UTF-8', //最常用配置
					'X-Requested-With': 'XMLHttpRequest'
				},
				accepts: {
					"*": allTypes,
					text: "text/plain",
					html: "text/html",
					xml: "application/xml, text/xml",
					json: "application/json, text/javascript"
				},
				fields: {
					xml: "responseXML",
					text: "responseText"
				},
				defaultXHR: ["Msxml4.XMLHttp", "Msxml3.XMLHttp", "Msxml2.XMLHttp", "Microsoft.XMLHttp", 'MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp.5.0', 'MSXML2.XMLHttp.4.0'],
				_init: function(options) {
					this.config = {};
					this.config.xhr = this.xhr = win.ActiveXObject ? (!jlpm.isLocal() && standardXHR() || activeXHR()) : standardXHR();
					this.config.url = this.url = '';
					this.config.method = this.method = 'get';
					this.config.async = this.async = true;
					this.config.user = this.user = '';
					this.config.pwd = this.pwd = '';
					this.config.requestHeaders = this.requestHeaders = null;
					this.config.isJson = this.isJson = true,
					this.config.data = this.data = '';
					this.config.timeout = this.timeout = 30000;
					this.config.dataType = this.dataType = 'json';
					this.config.xmlItem = this.xmlItem = '';
					this.config.xmlsItem = this.xmlsItem = '';
					this.config.oninit = this.oninit = function(data) {
						return {
							status: true,
							info: undefined
						};
					};
					this.config.onerror = this.onerror = function(info) {
						try {
							console.log(info ? info : "err!");
						} catch (e) {
							alert(info ? info : "err!");
						}
					};
					this.config.ontimeout = this.ontimeout = function() {};
					this.config.onsucceed = this.onsucceed = function() {};
					this.config.oncomplete = this.oncomplete = function(response, status) {
						console.log(response);
					};
					jlpm.extend(this, options);
					jlpm.extend(this.config, options);
					this.requestHeaders = jlpm.extend(this.defaultHeaders, this.requestHeaders || {});
					return this;
				},
				_sto: function(callback, time) {
					clearTimeout(this.ajaxTimeout);
					this.ajaxTimeout = setTimeout(callback, time);
				},
				_readyStateChange: function(type) {
					if (type == "timeout") {
						this.ontimeout("timeout", 408);
						return false;
					} else {
						var self = this,
							callback = function() {
								self.xhr.onreadystatechange = null;
								var status = (self.xhr.status) ? parseFloat(self.xhr.status) || 0 : 0;
								if (status === 1223) {
									status = 204;
								}
								if (status >= 200 && status < 300 || status == 304) {
									var result = self.xhr[self.fields[type] ? self.fields[type] : "responseText"];
									self.oncomplete({
										result: (this.isJson ? (function() {
											try {
												return jlpm.sMatch.rbrace.test(result) ? jlpm.parseJSON(result) : eval("(" + result + ")");
											} catch (e) {
												try {
													return jlpm.readXmlNode(self.xmlItem, self.xmlsItem, jlpm.parseXML(self.xhr.responseText));
												} catch (e) {
													return e.message;
												}
											}
										})() : !jlpm.isEmpty(self.xmlItem) && !jlpm.isEmpty(self.xmlsItem) ? jlpm.readXmlNode(self.xmlItem, self.xmlsItem, result) : result)
									}, "ok", status);
								} else {
									self.onerror("err", status);
								}
							};
						if (!self.async) {
							callback();
						} else if (self.xhr.readyState == 0 && self.oninit) {
							self.oninit();
						} else if (self.xhr.readyState == 2 && self.onsucceed) {
							self.onsucceed();
						} else if (self.xhr.readyState == 4) {
							setTimeout(callback);
						}
					}
				},
				send: function(url, method, callback) {
					var self = this;
					url = url ? url : self.url;
					url = url.split('#')[0];
					method = method ? method : self.method;
					var data = jlpm.isEmpty(self.data) ? undefined : self.data;
					if (jlpm.type(data) == "object") {
						data = data.tagName && data.tagName.toLowerCase() == "form" ? jlpm.formtojson(data) : jlpm.tourl(data);
					}
					if (jlpm.type(data) == "string" && method != 'post') {
						url += (url.indexOf('?') != -1 ? '&' : '?') + data;
					}
					self.oncomplete = callback ? callback : self.oncomplete;
					var dataType = this.dataType,
						newConfig = {
							url: url,
							method: method,
							data: data
						},
						result = self.oninit(data ? jlpm.urltojson(data) : data);
					if (result.status && !jlpm.isCdomain(url) && !jlpm.isEmpty(url)) {
						jlpm.extend(self.config, newConfig);
						var id = jlpm._ajaxID++;
						if (jlpm.type(data) == "string" && method != 'post') {
							url += (url.indexOf('?') != -1 ? '&' : '?') + "ajaxid=jlpm_ajax" + id;
							self.config.url = url;
						}
						jlpm.ajaxhandlers["jlpm_ajax" + id] = self.config;
						jlpm.ajaxhandlers._count += 1;
						!jlpm.isEmpty(self.user) ? self.xhr.open(method, url, self.async, self.user, self.pwd) : self.xhr.open(method, url, self.async);
						for (var i in self.requestHeaders) {
							self.xhr.setRequestHeader(i, self.requestHeaders[i]);
						}
						var dataTypes = jlpm.trim(dataType || undefined).toLowerCase().match(jlpm.sMatch.rnotwhite) || [""];
						self.xhr.setRequestHeader("Accept", dataTypes[0] && self.accepts[dataTypes[0]] ? self.accepts[dataTypes[0]] + (dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : self.accepts["*"]);
						self.xhr.onreadystatechange = function() {
							self._readyStateChange(dataTypes[0]);
						};
						data && method != "get" ? self.xhr.send(data) : self.xhr.send();
						if (self.async && self.timeout > 0) {
							self._sto(function() {
								self.cancel("timeout");
							}, self.timeout);
						}
					} else {
						self.onerror(jlpm.isCdomain(url) ? "cross domain error!" : result.info, 0);
					}
					return jlpmfn;
				},
				isWork: function() {
					var state = this.xhr ? this.xhr.readyState : 0;
					return state > 0 && state < 4;
				},
				cancel: function(info) {
					if (this.xhr && this.isWork()) {
						this.xhr.onreadystatechange = null;
						this.xhr.abort();
						this._readyStateChange(info);
						return true;
					}
					return false;
				},
				get: function(url, callback, options) {
					if (options) {
						return jlpm.Ajax(options).send(url, "get", callback);
					} else {
						return this.send(url, "get", callback);
					}
				},
				post: function(url, callback, options) {
					if (options) {
						return jlpm.Ajax(options).send(url, "post", callback);
					} else {
						return this.send(url, "post", callback);
					}
				}
			};
			ajax.fn.init.prototype = ajax.fn;
			return ajax(options);
		},
		jsonp: function(url, callback, options) {
			options = options || {};
			var funName = "jlpm_loadJsonp" + this.random(10000, 0),
				callbackReplacer = options.callbackReplacer || /%callbackfun%/ig;
			win[funName] = function(data) {
				if (callback) {
					callback(data);
				}
				win[funName] = null;
			};
			options.id = funName;
			if (callbackReplacer.test(url)) url = url.replace(callbackReplacer, funName);
			else {
				url += (/\?/.test(url) ? "&" : "?") + "cb=" + funName;
			}
			return this.loadon(url, false, options);
		}
	}).each(["get", "post"], function(i, name) {
		jlpm.extend(name, function(url, callback, options) {
			return this.Ajax(options).send(url, "get", callback);
		});
	});

	//localStorage
	jlpm.extend({
		cacheHname: location.hostname ? location.hostname : 'localStorage_jlpm',
		isLocalStorage: win.localStorage ? true : false,
		cacheInitDom: function() { //初始化userData
			if (!this.cacheDataDom) {
				try {
					this.cacheDataDom = doc.createElement('input'); //这里使用hidden的input元素
					var dm = this.cacheDataDom;
					dm.type = 'hidden';
					dm.style.display = "none";
					dm.addBehavior('#default#userData'); //这是userData的语法
					doc.body.appendChild(dm);
				} catch (ex) {
					return false;
				}
			}
			return true;
		},
		_cacheSet: function(key, value) {
			if (this.isFunction(key)) {
				this._cacheSet(key.call(), value);
			}
			if (this.isFunction(value)) {
				this._cacheSet(key, value.call());
			}
			if (jlpm.isLocalStorage) {
				var key = this.isString(key) ? key.split(' ') : key,
					value = this.isString(value) ? value.split(' ') : value;
				var m = win.localStorage;
				for (i = 0; i < (len = key.length); i++) {
					m.setItem(jlpm.isArray(key) ? "jlpm_" + key[i] : "jlpm_" + key, jlpm.isArray(value) ? value[i] : value);
				}
			} else {
				if (jlpm.cacheInitDom()) {
					this.cacheDataDom.load(jlpm.cacheHname);
					var key = this.isString(key) ? key.split(' ') : key,
						value = this.isString(value) ? value.split(' ') : value;
					var m = this.cacheDataDom;
					for (i = 0; i < (len = key.length); i++) {
						m.setAttribute(jlpm.isArray(key) ? "jlpm_" + key[i] : "jlpm_" + key, jlpm.isArray(value) ? value[i] : value);
					}
					this.cacheDataDom.save(jlpm.cacheHname);
					doc.body.removeChild(this.cacheDataDom);
				}
			}
		},
		_cacheGet: function(key) {
			if (this.isFunction(key)) {
				return this._cacheGet(key.call());
			}
			if (jlpm.isLocalStorage) {
				var rvalue = null,
					key = this.isString(key) ? key.split(' ') : key;
				if (key) {
					var key = this.isString(key) ? key.split(' ') : key;
					if (jlpm.isArray(key)) {
						rvalue = [];
						jlpm.each(key, function() {
							rvalue.push(win.localStorage.getItem("jlpm_" + this));
						});
					} else {
						rvalue = win.localStorage.getItem("jlpm_" + key);
					}
				}
				return rvalue;
			} else {
				if (jlpm.cacheInitDom()) {
					this.cacheDataDom.load(jlpm.cacheHname);
					var rvalue = null;
					if (key) {
						var key = this.isString(key) ? key.split(' ') : key;
						if (jlpm.isArray(key)) {
							rvalue = [];
							var m = this.cacheDataDom;
							jlpm.each(key, function() {
								rvalue.push(m.getAttribute("jlpm_" + this));
							});
						} else {
							rvalue = this.cacheDataDom.getAttribute("jlpm_" + key);
						}
					}
					doc.body.removeChild(this.cacheDataDom);
					return rvalue;
				}else{
					return undefined;
				}
			}
		},
		_cacheRemove: function(key) {
			if (this.isFunction(key)) {
				this._cacheRemove(key.call());
			}
			if (jlpm.isLocalStorage) {
				if (key) {
					var key = this.isString(key) ? key.split(' ') : key;
					if (jlpm.isArray(key)) {
						jlpm.each(key, function() {
							win.localStorage.removeItem("jlpm_" + this);
						});
					} else {
						win.localStorage.removeItem("jlpm_" + key);
					}
				}
			} else {
				if (jlpm.cacheInitDom()) {
					this.cacheDataDom.load(jlpm.cacheHname);
					if (key) {
						var key = this.isString(key) ? key.split(' ') : key;
						if (jlpm.isArray(key)) {
							var m = this.cacheDataDom;
							jlpm.each(key, function() {
								m.removeAttribute("jlpm_" + this);
							});
						} else {
							this.cacheDataDom.removeAttribute("jlpm_" + key);
						}
						this.cacheDataDom.save(jlpm.cacheHname);
					}
					doc.body.removeChild(this.cacheDataDom);
				}
			}
		},
		_cacheKey: function(index) {
			if (jlpm.isLocalStorage) {
				try {
					return win.localStorage.key(index).replace("jlpm_", "");
				} catch (e) {
					return "error!";
				}
			} else {
				if (jlpm.cacheInitDom()) {
					this.cacheDataDom.load(jlpm.cacheHname);
					var ddArray = [];
					jlpm.each(this.cacheDataDom.attributes, function() {
						if (this.nodeName.indexOf("jlpm_") > -1) {
							ddArray.push(this.replace("jlpm_", ""));
						}
					});
					return ddArray[index];
				} else {
					return "";
				}
			}
		},
		_cacheLen: function() {
			if (jlpm.isLocalStorage) {
				return win.localStorage.length;
			} else {
				if (jlpm.cacheInitDom()) {
					this.cacheDataDom.load(jlpm.cacheHname);
					var len = 0;
					jlpm.each(this.cacheDataDom.attributes, function() {
						if (this.nodeName.indexOf("jlpm_") > -1) {
							len += 1;
						}
					});
					return len;
				} else {
					return 0;
				}
			}
		},
		_cacheClear: function() {
			if (jlpm.isLocalStorage) {
				win.localStorage.clear();
			} else {
				if (jlpm.cacheInitDom()) {
					this.cacheDataDom.load(jlpm.cacheHname);
					jlpm.each(this.cacheDataDom.attributes, function() {
						if (this.nodeName.indexOf("jlpm_") > -1) {
							this.cacheDataDom.removeAttribute(this);
						}
					});
					this.cacheDataDom.save(this.cacheHname);
					doc.body.removeChild(this.cacheDataDom);
				}
			}
		},
		cacheDataDom: null
	});
	jlpm.fn.extend({
		cache: function(key, value) {
			if (!jlpm.isNumeric(key) && jlpm.isEmpty(key)) {
				return jlpm._cacheLen();
			} else {
				if (!jlpm.isEmpty(value)) {
					jlpm._cacheSet(key, value);
					return this;
				} else if (jlpm.isNumeric(key)) {
					return jlpm._cacheKey(key + "");
				} else {
					return jlpm._cacheGet(key) || undefined;
				}
			}
		},
		cacheRemove: function(key) {
			if (jlpm.isEmpty(key)) {
				jlpm._cacheClear();
			} else {
				jlpm._cacheRemove(key);
			}
			return this;
		}
	});

	//事件
	jlpm.extend({
		evenList: ("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu").split(" "),
		_eventID: 0,
		eventHandlers: {},
		mhandlers: [],
		_handlerID: -1,
		eventFix: function(event) {
			var e = event || win.event;
			if (!e.target) {
				e.target = e.srcElement || doc;
			}
			if (e.target.nodeType === 3) {
				e.target = e.target.parentNode;
			}
			if (!e.relatedTarget && e.fromElement) {
				e.relatedTarget = e.fromElement === e.target ? e.toElement : e.fromElement;
			}
			if (e.pageX == null && e.clientX != null) {
				var eventDocument = e.target.ownerDocument || doc,
					edoc = eventDocument.documentElement,
					ebody = eventDocument.body;
				e.pageX = e.clientX + (edoc && edoc.scrollLeft || ebody && ebody.scrollLeft || 0) - (edoc && edoc.clientLeft || ebody && ebody.clientLeft || 0);
				e.pageY = e.clientY + (edoc && edoc.scrollTop || ebody && ebody.scrollTop || 0) - (edoc && edoc.clientTop || ebody && ebody.clientTop || 0);
			}
			if (e.which == null && (e.charCode != null || e.keyCode != null)) {
				e.which = e.charCode != null ? e.charCode : e.keyCode;
			}
			if (e.metaKey === undefined) {
				e.metaKey = e.ctrlKey;
			}
			if (!e.which && e.button !== undefined) {
				e.which = (e.button & 1 ? 1 : (e.button & 2 ? 3 : (e.button & 4 ? 2 : 0)));
			}
			try {
				if (e.wheelDelta) {
					e.wheelDelta = (ua().browser == "opera" && ua().browserver < 9.5) ? -e.wheelDelta : e.wheelDelta;
				} else {
					e.wheelDelta = (e.detail) ? -e.detail * 40 : 0;
				}
			} catch (ex) {}
			e.keyName = String.fromCharCode(e.which);
			return e;
		},
		jlmid: function(elem) {
			return elem._handlerID || (elem._handlerID = this._handlerID + 1);
		},
		stopPropagation: function(event) {
			var e = event.originalEvent;
			if (!e) return;
			if (ua().browser == "msie") {
				e.cancelBubble = true; // ie下阻止冒泡
			} else {
				e.stopPropagation(); // 其它浏览器下阻止冒泡
			}
		},
		preventDefault: function(event, result) {
			var e = event.originalEvent;
			if (!e) return;
			if ((result === undefined || result === false) && e.preventDefault) {
				e.preventDefault();
			} else if (e.preventDefault) {
				e.preventDefault();
			} else {
				e.returnValue = false;
			}
		},
		handlers: function(element, evtname, fn, selector, getDelegate) {
			var id = this.jlmid(element),
				set = ((this.mhandlers[id] != undefined ? (this.mhandlers[id] = [this.mhandlers[id]]) : this.mhandlers) || (this.mhandlers.length = 0)),
				self = this,
				delegate = getDelegate || getDelegate(fn, event),
				callback = delegate || fn,
				proxyfn = function(event) {
					var result = callback.apply(element, [event].concat(event.data));
					return result;
				};
			var handler = {
				e: element,
				en: evtname,
				fn: callback,
				proxy: proxyfn,
				sel: selector,
				del: delegate,
				i: set.length
			};
			set.push(handler);
			jlpm(element).bind(handler.en + "", proxyfn);
		},
		findHandlers: function(element, evtname, selector) {
			var v = [],
				i, obj = (this.mhandlers[this.jlmid(element)] || []),
				temp;
			this.each(this.isNodeList(obj) ? [obj] : obj, function() {
				v.push(this ? this : "");
			});
			return v;
		}
	});
	jlpm.fn.extend({
		events: {},
		on: function(event, selector, callback) {
			var event = event ? event : false,
				selector = selector ? selector : false,
				callback = callback ? callback : false;
			return selector === false || selector === undefined || this.isFunction(selector) ? this.bind(event, selector) : this.delegate(selector, event, callback);
		},
		off: function(event, selector) {
			var event = event ? event : false,
				selector = selector ? selector : false;
			return selector === false || selector === undefined ? this.unbind(event) : this.undelegate(selector, event);
		},
		bind: function(event, callback, m) {
			var m = m ? m : jlpm[0],
				t = event ? event : "",
				fn = callback ? callback : null,
				self = this;
			if (fn != null) {
				if (m != null && t != "") {
					if (this.isString(t) || jlpm.isArray(t)) {
						var va = (this.isString(t)) ? t.split(" ") : t;
						jlpm.each(va, function(i) {
							var vt = this;
							jlpm.each(m, function() {
								var id = jlpm.hasAttr("_eventID", this) ? this._eventID : jlpm._eventID++;
								this._eventID = id;
								var that = this;
								var prxFn = function(event) {
									event = jlpm.eventFix(event);
									event.originalEvent = event;
									var result;
									result = fn.call(that, event) || false;
									jlpm.preventDefault(event, result);
									return result;
								};
								jlpm.eventHandlers[id + "_" + vt] = {
									m: prxFn,
									s: fn,
									dom: that
								};
								vt = (vt == "DOMMouseScroll" || vt == "mousewheel") ? (jlpm.ua().browser == "mozilla") ? "DOMMouseScroll" : "mousewheel" : (jlpm.ua().type == "desktop") ? (vt == "mousedown") ? "touchstart" : (vt == "mouseup") ? "touchend" : (vt == "mousemove") ? "touchmove" : (vt == "touchstart") ? "mousedown" : (vt == "touchend") ? "mouseup" : (vt == "touchmove") ? "mousemove" : vt : vt;
								if (that.addEventListener) { //如果是FF
									that.addEventListener(vt, prxFn, false);
								} else if (that.attachEvent) { //如果是IE
									that.attachEvent('on' + vt, prxFn);
								} else {
									that['on' + vt] = prxFn;
								}
							});
						});
					}
					if (this.isFunction(t)) {
						jlpm.each(m, function() {
							self.domFind(this).bind(t.call(this, m));
						});
					}
				}
			} else {
				var va = t.split(" ");
				jlpm.each(va, function(i, name) {
					var vname = name;
					jlpm.each(m, function(i, obj) {
						var id = obj._eventID,
							that = obj;
						if (jlpm.eventHandlers[id + "_" + vname]) {
							var fn = jlpm.eventHandlers[id + "_" + vname].s;
							if (!jlpm.isEmpty(fn) && self.isFunction(fn)) fn.call(obj);
						}
					});
				});
			}
			return this;
		},
		unbind: function(event, m) {
			var m = m ? m : jlpm[0],
				t = event ? event : "",
				self = this;
			if (m != null && t != "") {
				if (this.isString(t) || jlpm.isArray(t)) {
					var va = (this.isString(t)) ? t.split(" ") : t;
					jlpm.each(va, function(i) {
						var vt = this;
						jlpm.each(m, function() {
							var id = this._eventID,
								that = this;
							if (jlpm.eventHandlers[id + "_" + vt]) {
								var prxFn = jlpm.eventHandlers[id + "_" + vt].m,
									vt = (vt == "DOMMouseScroll" || vt == "mousewheel") ? (jlpm.ua().browser == "mozilla") ? "DOMMouseScroll" : "mousewheel" : (jlpm.ua().type == "desktop") ? (vt == "mousedown") ? "touchstart" : (vt == "mouseup") ? "touchend" : (vt == "mousemove") ? "touchmove" : (vt == "touchstart") ? "mousedown" : (vt == "touchend") ? "mouseup" : (vt == "touchmove") ? "mousemove" : vt : vt;
								jlpm.eventHandlers[id + "_" + vt] = undefined;
								if (that.removeEventListener) { //如果是FF
									that.removeEventListener(vt, prxFn, false);
								} else if (that.detachEvent) { //如果是IE
									that.detachEvent('on' + vt, prxFn);
								} else {
									that['on' + vt] = null;
								}
							}
						});
					});
				}
				if (this.isFunction(t)) {
					jlpm.each(m, function() {
						self.domFind(this).unbind(t.call(this, m));
					});
				}
			}
			return this;
		},
		delegate: function(selector, event, callback) {
			var selector = selector,
				evtname = event,
				fun = callback,
				self = this,
				m = jlpm[0];
			jlpm.each(m, function() {
				var sm = this;
				jlpm.each(evtname.split(' '), function() {
					jlpm.handlers(sm, this, fun, selector, function(event) {
						var event = jlpm.eventFix(event),
							target = event.target,
							result = false;
						if ((self.isString(selector) && (target.tagName.toLowerCase() == selector.toLowerCase() || target.className.toLowerCase() == selector.toLowerCase() || target.name.toLowerCase() == selector.toLowerCase())) || target == selector) {
							result = fun.call(target, evtname, target[evtname]);
							jlpm.stopPropagation(event);
						}
						return result;
					});
				});
			});
			return this;
		},
		undelegate: function(selector, event) {
			var m = jlpm[0],
				id = jlpm.jlmid(m),
				selector = selector,
				evtname = event,
				self = this;
			jlpm.each(m, function() {
				jlpm.each(jlpm.findHandlers(this, evtname.split(' '), selector), function(i, n) {
					self.domFind(n.e).unbind(n.en + "");
					try {
						delete jlpm.mhandlers[id][n.i];
					} catch (e) {
						jlpm.mhandlers[id].removeAttribute(n.i);
					}
				});
			});
			return this;
		}
	});
	jlpm.each(jlpm.evenList, function(i, name) {
		jlpm.fn.extend({
			events: name
		}, function(fn, m) {
			var m = m ? m : jlpm[0],
				fn = fn ? fn : undefined;
			if (fn) {
				this.domFind(m).off(name).on(name, fn);
			} else {
				this.domFind(m).on(name);
			}
			return this;
		});
	});

	//系统及浏览器识别
	var navigator = win.navigator,
		ua = function() {
			var ua = navigator.userAgent.toLowerCase(),
				p = navigator.platform.toLowerCase(),
				ripad = /(ipad|iphone|ipod)(?:.*version)[\/]([\w.]+)/,
				randroid = /(android) ([\w.]+)/,
				rblackberry = /(blackberry)(?:.*version)[\/]([\w.]+)/,
				rbb10 = /(bb10).*version\/([\d.]+)/,
				rimTablet = /(rim\stablet\sos)\s([\d.]+)/,
				rkindle = /(kindle)[\/]([\d.]+)/,
				rsilk = /(silk)[\/]([\d._]+)/,
				rbada = /(bada)([^\\s;]+)/,
				rwebkit = /(webkit)[ \/]([\w.]+)/,
				rchrome = /(chrome)[\/]([\w.]+)/,
				rchromeos = /(cros) [a-z 0-9]+ ([\d.]+)/,
				rchromemobile = /(chrome)[\/]([\w.]+) (mobile)/,
				rsafarimobile = /(mobile)[ \/][\w.]+ (safari)[ \/]([\w.]+)/,
				rmsie = /(msie) ([\w.]+)/,
				rmsiemobile = /(msie) ([\w.]+); [\w.;\/ ]+ (touch)/,
				rfirefox = /(firefox)[ \/]([\w.]+)/,
				rsafari = /(safari)[ \/]([\w.]+)/,
				ropera = /(opera)(?:.*version)[\/]([\w.]+)/,
				rmaxthon = /(maxthon)[ \/]([\w.]+)/,
				rqq = /(qqbrowser)[ \/]([\w.]+)/,
				rbaidu = /(baidubrowser)[ \/]([\w.]+)/,
				rwebosbrowser = /((wosbrowser))([\\w\\._]+)/,
				rgecko = /(gecko)[ \/]([\w.|\w]+)/,
				rapplewebkit = /[apple](webkit)[ \/]([\w.|\w]+)/,
				rtrident = /(trident)[ \/]([\w.|\w]+)/,
				rpresto = /(presto)[ \/]([\w.|\w]+)/,
				os = p.match(/ipad|iphone|ipod/i) ? ripad.exec(ua) : ua.match(/bada/i) ? rbada.exec(ua) : ua.match(/rim tablet os/i) ? "rimtablet" : ua.match(/nokian/i) ? "nokian" : (ua.match(/wii/i)) ? "Wii" : (ua.match(/playstation/i)) ? "playstation" : ua.match(/blackberry/) ? ua.match(/safari\/536/) || /bb10/.test(ua) ? rbb10.exec(ua) : rblackberry.exec(ua) : ua.match(/playbook/) ? "blackberry_playbook" : (ua.match(/fennec/i)) ? "fennec" : (ua.match(/(webos|hpwos)[\s\/]([\d.]+)/)) ? "webos" : (ua.match(/touchpad/) && ua.match(/(webos|hpwos)[\s\/]([\d.]+)/)) ? "touchpad" : p.match(/win/i) ? "win" : p.match(/mac/i) ? "mac" : p.match(/x11/i) ? "x11" : p.match(/linux/i) ? ua.match(/android/i) || ua.match(/silk-accelerated/) ? ua.match(/silk/i) ? rsilk.exec(ua) : ua.match(/kindle fire/) ? "silk" : ua.match(/kindle/i) ? rkindle.exec(ua) : randroid.exec(ua) : /cros/.test(ua) ? rchromeos.exec(ua) : "linux" : false || false,
				browser = rsafarimobile.exec(ua) || rchromemobile.exec(ua) || rwebosbrowser.exec(ua) || rmsie.exec(ua) || rchrome.exec(ua) || (ua.match(/android/i) || ua.match(/silk-accelerated/) ? rwebkit.exec(os[0]) : rsafari.exec(ua)) || rfirefox.exec(ua) || ropera.exec(ua) || rwebkit.exec(os[0]) || false,
				mode = ((p == "win32" && browser[1] == "msie" || /WOW64/.test(ua) && browser[1] == "msie") || (os[1] == "linux" && ua.indexOf("_64") < 0)) ? "32" : ((p == "win64" && browser[1] == "msie" || /win64; x64;/.test(ua) && browser[1] == "msie") || (os[1] == "linux" && ua.indexOf("_64") > -1)) ? "64" : "unknown",
				rroot = rgecko.exec(ua) || rapplewebkit.exec(ua) || rtrident.exec(ua) || rpresto.exec(ua);
			mode = mode == "unknown" ? p.replace("win", "") : mode;
			if (browser != false || browser != null) {
				browser = ua.match(/maxthon/) ? rmaxthon.exec(ua) : ua.match(/qqbrowser/) ? rqq.exec(ua) : /uc/.test(ua) && /linux/.test(ua) && /mobile/.test(ua) ? "uc" : /lbbrowser/.test(ua) ? "lbbrowser" : /baidubrowser/.test(ua) ? rbaidu.exec(ua) : browser;
			}
			var osA = os ? !jlpm.isArray(os) ? os : os[1] == "cros" ? "chromeos" : os[1] : "unknown" || "",
				ovA = os ? !jlpm.isArray(os) ? "0" : os[2] : "unknown" || "0",
				bsA = (browser ? jlpm.fn.isString(browser) ? browser : jlpm.isArray(browser) && browser.length > 3 ? browser[1] == "msie" && browser[3] == "touch" ? "msiemobile" : /safari/.test(browser[2]) ? browser[2] + browser[1] : browser[1] + browser[3] : browser[1] == "firefox" && /mobile/.test(ua) ? "firefoxmobile" : browser[1] : "unknown") || "",
				bvA = (browser ? jlpm.fn.isString(browser) ? "0" : jlpm.isArray(browser) && browser.length > 3 ? /safari/.test(browser[2]) ? browser[3] : browser[2] : browser[2] : "0") || "0",
				type = /win|mac|linux/.test(osA) && !/android|ipad|ipod|iphone/.test(osA) ? "desktop" : bsA == "msiemobile" || /ipad|blackberry_playbook|rimtablet|touchpad|kindle|chromeos/.test(osA) || (osA == "android" && parseFloat(ovA) > 2) || (osA == "android" && parseFloat(ovA) > 3 && ua.search(/mobile/i)) || (bsA == "firefox" && ua.match(/tablet/)) ? "tablet" : /wii|playstation/.test(osA) ? "unknown" : "phone";
			type = !/tablet|phone/.test(type) && bsA != "msiemobile" ? "desktop" : type;
			var root = jlpm.isArray(rroot) ? rroot[1] : "unknown",
				rootver = jlpm.isArray(rroot) ? rroot[2] : "0";
			return {
				os: osA,
				osver: ovA,
				browser: bsA,
				browserver: bvA,
				sysinfo: ua,
				mode: mode,
				root: root,
				rootver: rootver,
				type: type
			};
		};
	jlpm.extend({
		ua: ua,
		browser: {},
		os: {},
		device: {}
	}).each(["msie", "msiemobile", "webkit", "safari", "opera", "firefox", "firefoxmobile", "maxthon", "qqbrowser", "chrome", "baidubrowser", "wosbrowser", "chromemobile", "safarimobile"], function(i, name) {
		jlpm.extend({
			browser: name
		}, function(v) {
			var isb = jlpm.ua().browser == name ? true : false;
			return (isb) ? (v == true) ? jlpm.ua().browserver : true : false;
		}); //(self.browser[name]=self.emptyFn)
	}).each(["chromeos", "silk", "kindle", "bada", "iphone", "ipod", "ipad", "android", "nokian", "wii", "playstation", "win", "mac", "x11", "linux", "blackberry_playbook", "blackberry10", "rimtablet", "fennec", "webos", "touchpad", "blackberry"], function(i, name) {
		jlpm.extend({
			os: name
		}, function(v) {
			var isb = jlpm.ua().os == name ? true : false;
			return (isb) ? v == true ? jlpm.ua().osver : true : false;
		});
	}).each(["desktop", "tablet", "phone"], function(i, name) {
		jlpm.extend({
			device: name
		}, function(v) {
			var isb = jlpm.ua().type == name ? true : false;
			return (isb) ? v == true ? jlpm.ua().mode : true : false;
		});
	});

	//文本
	jlpm.extend({
		stringify: function(obj) { //序列化对象
			if (obj == null) {
				return 'null';
			}
			var type = obj != null && obj.constructor != null ? _toString.call(obj).slice(8, -1).toLowerCase() : false,
				escapeChars = function(s, arr) {
					var arr = arr ? arr : [
						[/\\/g, "\\\\"],
						[/"/g, "\\\""],
						[/\r/g, "\\r"],
						[/\n/g, "\\n"],
						[/\t/g, "\\t"]
					];
					for (var i = 0; i < arr.length; i++) {
						s = s.replace(arr[i][0], arr[i][1]);
					}
					return s;
				};
			if (type) {
				switch (type) {
					case 'string':
						return '"' + escapeChars(obj) + '"';
					case 'number':
						var ret = obj.toString();
						return /N/.test(ret) ? 'null' : ret;
					case 'boolean':
						return obj.toString();
					case 'date':
						return 'new Date(' + obj.getTime() + ')';
					case 'array':
						var ar = [];
						for (var i = 0; i < obj.length; i++) {
							ar[i] = this.stringify(obj[i]);
						}
						return '[' + ar.join(',') + ']';
					case 'object':
						if (this.isPO(obj)) {
							ar = [];
							for (i in obj) {
								ar.push('"' + escapeChars(i) + '":' + this.stringify(obj[i]));
							}
							return '{' + ar.join(',') + '}';
						}
				}
			}
			return 'null'; //无法序列化的，返回null;
		},
		evalexec: function(data) { //替代eval
			if (data && this.trim(data)) {
				return (win.execScript || function(data) {
					try {
						return win["eval"].call(win, data);
					} catch (e) {
						return eval("(" + data + ")");
					}
				})(data);
			}
		},
		readXmlNode: function(item, node, parent) {
			var m = item ? item : "item",
				sm = node ? node : "", //node ? node.split(' ') : [],
				rp = parent ? parent : doc,
				xmlnodev = {},
				xmlnodes = [],
				self = this;
			jlpm(m + (!this.isEmpty(sm) ? " " + sm : ""), rp).each(function() {
				var xmlnodesv = {},
				children = jlpm(this).children(),
					tag;
				if (self.isEmpty(children[0])) {
					tag = this;
					xmlnodev[this.tagName] = tag.textContent ? tag.textContent : tag.xml ? tag.xml.indexOf("<![CDATA[") > -1 ? tag.xml.replace(new RegExp("<" + this.tagName + "><!\\[CDATA\\[|\\]\\]><\/" + this.tagName + ">", "g"), "") : tag.xml.replace(new RegExp("<" + this.tagName + ">|<\/" + this.tagName + ">", "g"), "") : "";
				} else {
					jlpm(this).children().each(function(i, obj) {
						tag = obj;
						xmlnodesv[obj.tagName] = tag.textContent ? tag.textContent : tag.xml ? tag.xml.indexOf("<![CDATA[") > -1 ? tag.xml.replace(new RegExp("<" + this.tagName + "><!\\[CDATA\\[|\\]\\]><\/" + this.tagName + ">", "g"), "") : tag.xml.replace(new RegExp("<" + this.tagName + ">|<\/" + this.tagName + ">", "g"), "") : "";
					});
					xmlnodev[this.tagName] = xmlnodesv;
				}
				xmlnodes.push(xmlnodev[this.tagName]);
			});
			return xmlnodes;
		},
		split: function(str, fstr, num) {
			return (str.indexOf(fstr) > -1) ? ((num != null) ? str.split(fstr)[num] : str.split(fstr)) : str;
		},
		fcamelCase: function(all, letter) {
			return letter.toUpperCase();
		},
		camelCase: function(string) {
			return string.replace(this.sMatch.rmsPrefix, "ms-").replace(this.sMatch.rdashAlpha, this.fcamelCase);
		}
	});

	//属性
	jlpm.extend({
		_text:function(elem) {
			var i, node, nodeType = elem.nodeType,
				ret = "";

			if (nodeType) {
				if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
					// Use textContent for elements
					// innerText usage removed for consistency of new lines (see #11153)
					if (typeof elem.textContent === "string") {
						return elem.textContent;
					} else {
						// Traverse it's children
						for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
							ret += jlpm.text(elem);
						}
					}
				} else if (nodeType === 3 || nodeType === 4) {
					return elem.nodeValue;
				}
			} else {

				// If no nodeType, this is expected to be an array
				for (i = 0;
				(node = elem[i]); i++) {
					// Do not traverse comment nodes
					if (node.nodeType !== 8) {
						ret += jlpm.text(node);
					}
				}
			}
			return ret;
		},
		_dataAttr: function(elem, key, data) {
			var self = this;
			// If nothing was found internally, try to fetch any
			// data from the HTML5 data-* attribute
			if (data === undefined && elem.nodeType === 1) {
				data = elem.getAttribute("data-" + key.replace(self.sMatch.rmultiDash, "$1-$2").toLowerCase());
				if (jlpm.type(data) === "string") {
					try {
						data = data === "true" ? true : data === "false" ? false : data === "null" ? null : !this.isNaN(data) ? parseFloat(data) : self.sMatch.rbrace.test(data) ? this.parseJSON(data) : data;
					} catch (e) {}
				} else {
					data = undefined;
				}
			}
			return data;
		},
		_crAttr: function(m, t, v) { //创建属性
			var bool = (v) ? v : false;
			if (!m[t] && bool == true) {
				m.setAttributeNode(doc.createAttribute(t));
			}
		},
		_getAttr: function(name, value, m) {
			var self = this;
			if (jlpm.type(name) == "string") {
				var values = [],
					names = name.split(' ');
				if (!this.isEmpty(value) && jlpm.type(value) == "string") {
					values = value.split(' ');
					this.each(names, function(i, name) {
						if (self.isSingle(names)) {
							self._crAttr(m, name);
							if (m.setAttribute) m.setAttribute(name, value);
							m[name] = value;
							return false;
						} else {
							self._crAttr(m, name);
							if (m.setAttribute) m.setAttribute(name, values[i]);
							m[name] = values[i];
						}
					});
					return true;
				} else if (this.isEmpty(value)) {
					this.each(names, function(i, name) {
						var vnvalue = (/data\-/.test(name)) ? self._dataAttr(m, self.camelCase(name.substring(5))) : m[self.propfx[name] || name];
						vnvalue = !self.isEmpty(vnvalue) ? vnvalue : typeof m.getAttribute != "undefined" ? m.getAttribute(name) : null;
						if (vnvalue == null && /value/.test(name)) {
							vnvalue = self.textValue(m);
						}
						if (vnvalue && !self.isSingle(names)) {
							values.push(vnvalue);
						} else {
							values = vnvalue;
							return false;
						}
					});
					return this.isEmpty(values) ? undefined : values;
				}
			} else {
				this.each(name, function(name, value) {
					self._crAttr(m, name);
					m.setAttribute(name, value);
					m[name] = value;
				});
				return true;
			}
		},
		_removeAttr: function(m, name) {
			var propName, attrs,
			elem = m ? m : this[0],
				name = name ? name : "",
				l, i = 0,
				self = this;
			if (!this.isEmpty(elem) && !this.isEmpty(name)) {
				if (elem.nodeType === 1) {
					attrs = (name || "").split(self.sMatch.rspace);
					l = attrs.length;
					for (; i < l; i++) {
						name = attrs[i].toLowerCase();
						propName = self.propfx[name] || name;
						jlpm(elem).attr(propName, "");
						self.hasAttr(propName, elem) ? (function(elem, attr) {
							(elem.removeAttribute) ? elem.removeAttribute(attr) : elem.removeAttributeNode(elem.getAttributeNode(attr));
						})(elem, propName) : "";
						if (this.sMatch.rboolean.test(propName) && (propName in elem)) {
							elem[propName] = false;
						}
					}
				}
			}
		}
	});
	jlpm.fn.extend({
		keys: function(obj) { //枚举出的属性的列表
			var ret = [],
				obj = obj ? obj : this[0];
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					ret.push(key);
				}
			}
			return ret;
		},
		values: function(obj) { //枚举出的属性值的列表
			var ret = [],
				obj = obj ? obj : this[0];
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					ret.push(obj[key]);
				}
			}
			return ret;
		},
		attr: function(name, value, m) { //获取设置标签属性
			var self = this,
				m = m ? m : jlpm[0],
				values = [],
				result;
			jlpm.each(m, function(i, obj) {
				var nType = obj.nodeType;
				if (obj && nType != 3 && nType != 8 && nType != 2) {
					values.push(jlpm._getAttr(name, value, obj));
				}
			});
			return jlpm.type(value) != "undefined" ? this : values;
		},
		removeAttr: function(name, m) {
			var self = this,
				m = m ? m : jlpm[0];
			if (!jlpm.isEmpty(m)) {
				if (jlpm.type(m) == "object") {
					if (m.length) {
						jlpm.each(m, function() {
							jlpm._removeAttr(this, name);
						});
					} else {
						jlpm._removeAttr(m, name);
					}
				}
				if (this.isString(m)) {
					jlpm._removeAttr(jlpm(m)[0], name);
				}
			}
			return this;
		}
	});

	//样式
	if (win.getComputedStyle) {
		jlpm.getStyles = function(elem) {
			try{
				return win.getComputedStyle(elem, null);
			}catch(e){
				return undefined;
			}
		};
	} else if (docElem.currentStyle) {
		jlpm.getStyles = function(elem) {
			try{
				return elem.currentStyle;
			}catch(e){
				return undefined;
			}
		};
	}
	jlpm.extend({
		classCache: [],
		hasClass: function(value, m) {
			var m = m ? m : jlpm[0],
				selector = value ? value : "",
				className = " " + selector + " ",
				hasArray = [];
			jlpm.each(m, function() {
				hasArray.push((this.nodeType === 1 && (" " + this.className + " ").replace(jlpm.sMatch.rclass, " ").indexOf(className) > -1) ? true : false);
			});
			return this.isSingle(hasArray) ? hasArray[0] : hasArray;
		},
		isHidden: function(v) {
			var v = v ? v : this[0];
			return jlpm(v).css("display") === "none" || !this.contains(elem.ownerDocument, elem);
		},
		isVisible: function(v) {
			var v = v ? v : this[0];
			return !!((v.offsetHeight + v.offsetWidth) && jlpm(v).css('display') != 'none');
		},
		_cssOpacity: function(m, value) {
			var self = this,
				elem = m,
				style = elem.style,
				currentStyle = elem.currentStyle,
				level = (value) ? value : null;
			if (level != null) {
				style.zoom = 1;
				var opacity = self.isNumeric(level) ? "alpha(opacity=" + (level > 1 ? level / 100 : level) * 100 + ")" : "",
					filter = currentStyle && currentStyle.filter || style.filter || "";
				style.filter = self.sMatch.ralpha.test(filter) ? filter.replace(self.sMatch.ralpha, opacity) : filter + " " + opacity;
				style.opacity = level;
				return elem;
			} else {
				return self.sMatch.ropacity.test((elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? (parseFloat(RegExp.$1) / 100) + "" : "";
			}
		},
		_getCss: function(name, value, m) {
			var self = this;
			if (jlpm.type(name) == "string") {
				var values = [],
					names = name.split(' '),
					fo = /filter|opacity/;
				if (!this.isEmpty(value) && (this.isString(value) || this.isNumeric(value))) {
					if (this.isNumeric(value)) value = value + "";
					values = value.split(' ');
					this.each(names, function(i, name) {
						if (self.isSingle(names)) {
							if (fo.test(name.toLowerCase())) {
								self._cssOpacity(m, value);
							} else {
								m.style[name] = value;
							}
							return false;
						} else {
							m.style[name] = values[i];
						}
					});
					return true;
				} else if (this.isEmpty(value)) {
					this.each(names, function(i, name) {
						name = name === "float" ? ('getComputedStyle' in win ? 'cssFloat' : 'styleFloat') : name;
						if (fo.test(name.toLowerCase())) {
							values.push((self.getStyles(m) ? self.getStyles(m)[name] : undefined) || self._cssOpacity(m));
						} else {
							values.push((self.getStyles(m) ? self.getStyles(m)[name] : undefined) || m["offset" + jlpm.propfx[name]] || (m.style ? m.style[name] : undefined));
						}
					});
					return this.isEmpty(values) ? false : values;
				}
			} else {
				this.each(name, function(name, value) {
					if (fo.test(name.toLowerCase())) {
						self._cssOpacity(m, value);
					} else {
						m.style[name] = value;
					}
				});
				return true;
			}
		},
		swap: function(options, callback, args, elem) {
			var ret, name, old = {};
			elem = elem ? elem : this[0];
			// Remember the old values, and insert the new ones
			for (name in options) {
				old[name] = elem.style[name];
				elem.style[name] = options[name];
			}

			ret = callback.apply(elem, args || []);

			// Revert the old values
			for (name in options) {
				elem.style[name] = old[name];
			}

			return ret;
		},
		classRE: function(name) {
			return name in this.classCache ? this.classCache[name] : (this.classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'));
		}
	});
	jlpm.fn.extend({
		css: function(name, value, m) {
			var self = this,
				m = m ? m : jlpm[0],
				values = [],
				result;
			jlpm.each(m, function(i, obj) {
				result = jlpm._getCss(name, value, obj);
				if (result == true) {
					if (result != undefined) {
						values.push(result);
					} else {
						values = undefined;
					}
				} else {
					values = result;
					result = false;
					return false;
				}
			});
			return result == true ? this : !jlpm.isEmpty(values) ? jlpm.isSingle(values) ? jlpm.isEmpty(values[0]) ? undefined : jlpm.isSingle(values[0]) ? values[0][0] : values[0] : values : undefined;
		},
		addClass: function(value, m) {
			var classNames, i, l, elem, setClass, c, cl, m = m ? m : jlpm[0],
				value = value ? value : "",
				self = this;
			if (this.isFunction(value)) {
				return jlpm.each(function(j) {
					jlpm(this).addClass(value.call(this, j, this.className));
				});
			}
			if (value && jlpm.type(value) === "string") {
				classNames = value.split(jlpm.sMatch.rspace);
				if (m.length) {
					jlpm.each(m, function() {
						if (this.nodeType === 1) {
							if (!this.className && classNames.length === 1) {
								this.className = value;
							} else {
								setClass = " " + this.className + " ";
								for (c = 0, cl = classNames.length; c < cl; c++) {
									if (!~setClass.indexOf(" " + classNames[c] + " ")) {
										setClass += classNames[c] + " ";
									}
								}
								this.className = jlpm.trim(setClass);
							}
						}
					});
				} else {
					elem = m;
					if (elem.nodeType === 1) {
						if (!elem.className && classNames.length === 1) {
							elem.className = value;
						} else {
							setClass = " " + elem.className + " ";
							for (c = 0, cl = classNames.length; c < cl; c++) {
								if (!~setClass.indexOf(" " + classNames[c] + " ")) {
									setClass += classNames[c] + " ";
								}
							}
							elem.className = jlpm.trim(setClass);
						}
					}
				}
			}
			return this;
		},
		removeClass: function(value, m) {
			var classNames, i, l, elem, className, c, cl, m = m ? m : jlpm[0],
				value = value ? value : "",
				self = this;
			if (this.isFunction(value)) {
				return jlpm.each(function(j) {
					jlpm(this).removeClass(value.call(this, j, this.className));
				});
			}
			if ((value && jlpm.type(value) === "string") || value === undefined) {
				classNames = (value || "").split(jlpm.sMatch.rspace);
				if (m.length) {
					jlpm.each(m, function() {
						if (this.nodeType === 1 && this.className) {
							if (value) {
								className = (" " + this.className + " ").replace(jlpm.sMatch.rclass, " ");
								for (c = 0, cl = classNames.length; c < cl; c++) {
									className = className.replace(" " + classNames[c] + " ", " ");
								}
								this.className = jlpm.trim(className, "all");
							} else {
								this.className = "";
							}
						}
					});
				} else {
					elem = m;
					if (elem.nodeType === 1 && elem.className) {
						if (value) {
							className = (" " + elem.className + " ").replace(jlpm.sMatch.rclass, " ");
							for (c = 0, cl = classNames.length; c < cl; c++) {
								className = className.replace(" " + classNames[c] + " ", " ");
							}
							elem.className = jlpm.trim(className, "all");
						} else {
							elem.className = "";
						}
					}
				}
			}
			return this;
		},
		toggleClass: function(className, m) {
			var cs = className.split(' '),
				m = m ? m : jlpm[0],
				self = this;
			jlpm.each(m, function() {
				var sm = this;
				jlpm.each(cs, function() {
					sm.className = (self.hasClass(this, sm)) ? jlpm.trim(sm.className.replace(jlpm.classRE(this), '$1'), "all") : jlpm.trim(sm.className + ' ' + this);
				});
			});
			return this;
		},
		show: function(lineBool, m) {
			var m = m ? m : jlpm[0],
				self = this,
				lineBool = lineBool ? lineBool : false;
			if (m.length === 0) {
				return undefined;
			}
			jlpm.each(m, function() {
				if (jlpm.isHidden(this)) {
					this.style.display = jlpm(this).attr("data-OldStyle") ? jlpm(this).attr("data-OldStyle") : (jlpm.ua().browser != "msie" && (this.tagName.toLowerCase() == "tr" || this.tagName.toLowerCase() == "td")) ? "table-row" : lineBool ? "inline-block" : "block";
					jlpm(this).attr("data-OldStyle", "none");
				}
			});
			return this;
		},
		hide: function(lineBool, m) {
			var m = m ? m : jlpm[0],
				self = this,
				lineBool = lineBool ? lineBool : false;
			if (m.length === 0) {
				return undefined;
			}
			jlpm.each(m, function() {
				if (jlpm.isVisible(this)) {
					this.style.display = jlpm(this).attr("data-OldStyle") ? jlpm(this).attr("data-OldStyle") : 'none';
					jlpm(this).attr("data-OldStyle", (jlpm.ua().browser != "msie" && (this.tagName.toLowerCase() == "tr" || this.tagName.toLowerCase() == "td")) ? "table-row" : lineBool ? "inline-block" : "block");
				}
			});
			return this;
		},
		toggle: function(lineBool, show, m) {
			var m = m ? m : jlpm[0],
				show2 = show === true ? true : false,
				self = this,
				lineBool = lineBool ? lineBool : false;
			if (m.length === 0) {
				return undefined;
			}
			jlpm.each(m, function() {
				(this.style.display == "none" || show2) ? self.show(lineBool, this) : self.hide(lineBool, this);
			});
			return this;
		}
	});

	//DOM标签
	if (docElem.contains) {
		jlpm.contains = function(a, b) {
			return a !== b && (a.contains ? a.contains(b) : true);
		};
	} else if (docElem.compareDocumentPosition) {
		jlpm.contains = function(a, b) {
			return !!(a.compareDocumentPosition(b) & 16);
		};
	} else {
		jlpm.contains = function() {
			return false;
		};
	}
	jlpm.extend({
		toArray: function(v) {
			return slice.call(v ? v : this[0], 0);
		},
		hasParent: function(node, parent) {
			var node = node ? node : this[0];
			if (parent == undefined) {
				parent = node;
				node = this[0];
			}
			while (node) {
				if (node == parent) {
					return true;
				}
				node = node.parentNode;
			}
			return false;
		},
		dir: function(elem, dir, until) {
			var matched = [],
				cur = elem[dir],
				self = this,
				gcur = function(cur) {
					var gcur = [],
						len = cur.length,
						i;
					for (i = 0; i < len; i++) {
						if (cur[i] != undefined) {
							gcur.push(cur[i]);
						}
					}
					return gcur;
				};
			if (this.isNodeList(cur) || this.isObjectList(cur)) {
				try {
					matched = this.toArray(cur);
				} catch (e) {
					matched = gcur(cur);
				}
				this.each(matched, function(i) {
					var push = self.dir(this, dir);
					if (push != undefined && push.length > 0) {
						matched = matched.concat(push);
					}
				});
			} else {
				while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1)) {
					if (cur.nodeType === 1) {
						matched.push(cur);
					}
					cur = cur[dir];
				}
			}
			return matched;
		},
		nth: function(cur, result, dir, elem) {
			result = result || 1;
			var num = 0;
			for (; cur; cur = cur[dir]) {
				if (cur.nodeType === 1 && ++num === result) {
					break;
				}
			}
			return cur;
		},
		eq: function(i, m) {
			var a = i === -1 ? m[i + 1] : m[i];
			a = a && a.nodeType != 1 ? i === 0 ? m[1] : i === m.length - 1 ? m[m.length - 2] : a : a;
			return a;
		},
		_siblings: function(nodes, element) {
			var elems = [];
			if (nodes == undefined) return elems;
			for (; nodes; nodes = nodes.nextSibling) {
				if (nodes.nodeType == 1 && nodes !== element) {
					elems.push(nodes);
				}
			}
			return elems;
		},
		crDom: function(value) { //文本创建标签
			var nd = doc.createElement("div");
			nd.style.display = "none";
			nd.innerHTML = value ? value : "";
			var ndn = (nd.children[0]) ? nd.children[0] : null;
			nd = null;
			return ndn;
		},
		_contain: function(node, m) {
			var m = m ? m : this[0],
				sm = this.domFind(m).children()[0],
				isCon = false;
			if (this.isString(node)) {
				var bsm = this.domFind(node, m)[0];
				if (!this.isEmpty(bsm)) {
					isCon = true;
				}
			} else {
				this.each(sm, function() {
					if (this == node) {
						isCon = this;
						return false;
					}
				});
			}
			this.record(m, isCon, null, null);
			return isCon;
		},
		hasNode: function(value, m) { //是否包含此标签
			var m = m != undefined ? m : this[0];
			if (m.compareDocumentPosition) {
				return !!(m.compareDocumentPosition(value) & 16);
			} else if (m.contains) {
				return m !== value && m.contains(value);
			} else {
				return this._contain(value);
			}
			return false;
		},
		index: function(value, m) { //当前标签的组中INDEX或组总长度
			var m = m ? m : this[0];
			return m != null && m.length ? value ? (jlpm.type(value) == "string") ? this.inArray(this.domFind(value)[0], m) : this.inArray(value, m) : (m.length) ? m.length : 0 : 0;
		},
		gWin: function(elem) {
			elem = elem ? elem : this[0];
			return jlpm.type(elem) === "object" && "setInterval" in elem ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
		}
	});
	jlpm.fn.extend({
		dynamic: function(value, option, fn, m) {
			var m = m ? m : this.isFunction(fn) ? jlpm[0] : fn,
				self = this,
				assign = function(node, option) {
					var dtrd = jlpm.datetime().number + jlpm.random(1000, 0),
						isGload = false;
					jlpm.record((m != undefined ? m : doc), node, null, 1).each(option, function(i) {
						if (i == "src" || i == "href") {
							node[i] = this + (self.isString(this) ? this.indexOf("?") > -1 ? "&file_rdtime=" + dtrd : "?file_rdtime=" + dtrd : "");
							isGload = true;
						} else if (i == "html") {
							node.innerHTML = this;
						} else {
							node[i] = this;
						}
					});
					if (isGload) {
						node.onload = node.onreadystatechange = function() {
							if (!this.readyState || /loaded|complete/.test(this.readyState)) {
								this.onload = this.onreadystatechange = null;
								fn ? fn.call(this, option) : null;
							}
						};
					}
				};
			if (jlpm.isObjectList(value)) {
				var node = m;
				assign(node, value);
			} else if (this.isString(value)) {
				var node = this.ce(value, m)[0];
				if (option != undefined) {
					assign(node, option);
				}
			}
			return this;
		},
		choose: function(v) {
			var m = jlpm[0],
				self = this;
			if (m != null) {
				if (v != undefined && jlpm.isNumeric(v) && (jlpm.isNodeList(m) || jlpm.isArray(m) || jlpm.isObjectList(m))) {
					if (m[v].nodeType) {
						jlpm.record(m, m[v], null, 1);
					} else {
						return m[v];
					}
				} else if (v != undefined && this.isString(v)) {
					var filter;
					if (jlpm.isNodeList(m) || jlpm.isArray(m) || jlpm.isObjectList(m)) {
						filter = this.domFind(v)[0];
						jlpm.each(m, function(i, obj) {
							if (filter == obj) {
								filter = obj;
								return false;
							}
						});
					} else {
						filter = this.domFind(v, m)[0];
						if (jlpm.isEmpty(filter)) {
							var filter = [];
							jlpm.each(m, function() {
								if (this.nodeType) {
									var sm = this;
									if ((this.tagName && this.tagName.toLowerCase() == v) || (this.className && this.className.toLowerCase().indexOf(v) > -1) || (this.id && this.id.toLowerCase() == v) || (this.name && this.name.toLowerCase() == v)) {
										filter.push(this);
									} else {
										jlpm.each(self.domFind(v)[0], function(i, obj) {
											if (obj == sm) {
												filter.push(sm);
												return false;
											}
										});
									}
								}
							});
						}
					}
					if (!jlpm.isEmpty(filter)) {
						var len = filter.length;
						jlpm.record(m, (len == 1 ? filter[0] : filter), (len == 1 ? filter[0].parentNode : doc), (len == 1 ? 1 : len));
					}
				}
			}
			return this;
		},
		childNodes: function(bool, m) {
			var m = m ? m : jlpm[0],
				bool = bool ? bool : false,
				self = this,
				vgm = function(m) {
					var v = jlpm.dir(m, "childNodes"),
						matchjson = {},
						i, name;
					for (var l = v.length, i = 0; i < l; i++) {
						var sm = v[i];
						name = (sm.tagName) ? sm.tagName.toLowerCase() : _toString.call(sm).toLowerCase().replace(/(\[object\s+)(\w+)(\])/, "$2");
						matchjson[name] ? jlpm.isArray(matchjson[name]) ? matchjson[name].push(sm) : (matchjson[name] = []).push(sm) : (matchjson[name] = []).push(sm);
						jlpm.crid(sm);
					}
					if (!jlpm.isEmptyObject(matchjson)) {
						v = matchjson;
					}
					return v;
				},
				gm = bool == false ? vgm.call(this, m) : jlpm.dir(m, "childNodes");
			if (gm) {
				jlpm.record(m, gm, null, null);
			}
			return this;
		},
		parent: function(m) {
			var m = m ? m : jlpm[0],
				parent = m.parentNode;
			parent && parent.nodeType !== 11 ? jlpm.record(m, parent, null, null) : undefined;
			return this;
		},
		remove: function(value, m) { //删除标签
			var m = m ? m : jlpm[0],
				self = this,
				clearData = function(value, b) {
					jlpm.each(value, function() {
						var id = self.hasAttr.call(self, "_eventID", this) ? this._eventID : "";
						if (id != "") {
							jlpm.each(jlpm.eventHandlers, function(name) {
								var fname = name.split('_');
								if (fname[0] == id) {
									self.off(fname[1], this.dom);
									jlpm.hasAttr("_domID", this.dom) ? (function(obj) {
										try {
											delete jlpm.Doms[obj];
										} catch (e) {
											jlpm.Doms.removeAttribute(obj);
										}
									})(this.dom._domID) : "";
									try {
										delete jlpm.eventHandlers[name];
									} catch (e) {
										jlpm.eventHandlers.removeAttribute(name);
									}
								}
							});
						} else {
							jlpm.hasAttr("_domID", this) ? (function(obj) {
								try {
									delete jlpm.Doms[obj];
								} catch (e) {
									jlpm.Doms.removeAttribute(obj);
								}
							})(this._domID) : "";
						}
					});
				},
				removeNode = function(m, v) {
					var d;
					if (jlpm.ua().browser == "msie") {
						if (v && v.tagName != "body") {
							d = d || doc.createElement("div");
							d.appendChild(v);
							d.innerHTML = "";
						}
					} else {
						m.removeChild(v);
					}
				};
			if (m != null) {
				jlpm.each(m, function() {
					if (this.parentNode) {
						if (value) {
							clearData(value, b);
							if (doc.body && this == doc.body) {
								removeNode(this, value);
							} else {
								removeNode(this.parentNode, value);
							}
						} else {
							clearData(this, b);
							removeNode(this.parentNode, this);
						}
					}
				});
			}
			return this;
		},
		empty: function(m) { //清空子标签
			var m = m ? m : jlpm[0];
			if (m == null) return this;
			jlpm.each(m, function() {
				var len = this.children.length;
				for (var i = 0; i < len; i++) {
					while (this.firstChild) {
						this.removeChild(this.firstChild);
					}
				}
				this.innerHTML = "";
			});
			return this;
		},
		oddevenInt: function(type, m) { //奇偶数标签
			var self = this,
				returnValue = function(obj, stype) {
					var count = obj.length,
						evenArray = [];
					for (i = 0; i < count; i++) {
						if (stype == "odd") {
							if ((i % 2) == 0) evenArray.push(obj[i]);
						}
						if (stype == "even") {
							if ((i % 2) != 0) evenArray.push(obj[i]);
						}
					}
					evenArray = jlpm.isSingle(evenArray) == 1 ? evenArray[0] : evenArray;
					jlpm.record(obj, evenArray, null, null);
					return self;
				};
			return returnValue(m ? m : jlpm[0], type);
		},
		ce: function(name, m) { //创建标签
			var gce = [],
				gceb, m = m ? m : jlpm[0],
				i, self = this;
			if (!jlpm.isEmpty(m)) {
				if (m == doc) {
					gce = m.createElement(name);
				} else {
					jlpm.each(m, function() {
						var sm = this,
							fragment = doc.createDocumentFragment();
						jlpm.each(name.split(' '), function() {
							gceb = doc.createElement(this);
							gce.push(gceb);
						});
						jlpm.each(gce, function() {
							fragment.appendChild(this);
						});
						sm.appendChild(fragment);
					});
				}
				jlpm.record(m, (jlpm.isSingle(gce) ? gce[0] : gce), null, null);
			}
			return this;
		},
		replace: function(value, m) { //替换标签
			var m = m ? m : jlpm[0],
				s = value ? value : null,
				sm, self = this;
			if (m != null) {
				jlpm.each(m, function() {
					var m = this;
					if (s != null && m.parentNode) {
						if (self.isFunction(s)) {
							jlpm.each(m, function() {
								self.domFind(this).replace(s.call(this, m));
							});
						} else {
							sm = (jlpm.type(s) === "string") ? jlpm.crDom(s) : s;
							jlpm.each(m, function() {
								var parent = this.parentNode,
									next = this.nextSibling;
								self.remove(m, m);
								if (next) {
									self.domFind(next).before(sm);
								} else {
									self.domFind(parent).append(sm);
								}
							});
							jlpm.record(m, sm, null, null);
						}
					}
				});
			}
			return this;
		},
		wrap: function(value, type, m) { //包裹标签
			var type = type ? type : undefined,
				m = m ? m : jlpm[0],
				s = value ? value : null,
				self = this;
			if (s != null) {
				if (type === "df") {
					if (jlpm.type(s) === "string") {
						var sm = jlpm.crDom(s);
						jlpm.each(m, function() {
							if (this.parentNode) {
								self.append(sm, this.parentNode).append(this, sm);
							}
						});
						jlpm.record(m, sm, null, null);
					}
					if (s.nodeType) {
						jlpm.each(m, function() {
							if (s.parentNode != this) {
								self.append(this, s);
							} else if (this.parentNode) {
								self.append(s, ((this.parentNode != body) ? this.parentNode : body)).append(this, s);
							} else {
								self.before(s, this).append(this, s);
							}
						});
						jlpm.record(m, s, null, null);
					}
					if (this.isFunction(s)) {
						jlpm.each(m, function() {
							self.domFind(this).wrap(s.call(this, m));
						});
					}
				}
				if (type === "in") {
					if (jlpm.type(s) === "string") {
						var sm = jlpm.crDom(s);
						jlpm.each(m, function() {
							if (this.parentNode) {
								self.append(sm, this.parentNode).append(sm, this);
							}
						});
						jlpm.record(m, sm, null, null);
					}
					if (s.nodeType) {
						jlpm.each(m, function() {
							if (this.parentNode != s) {
								self.append(s, this);
							} else if (s.parentNode) {
								self.append(this, ((s.parentNode != body) ? s.parentNode : body)).append(s, this);
							} else {
								self.before(this, s).append(s, this);
							}
						});
						jlpm.record(m, s, null, null);
					}
					if (this.isFunction(s)) {
						jlpm.each(m, function() {
							self.domFind(this).wrap(s.call(this, m), "in");
						});
					}
				}
				if (type == undefined && (this.isString(s) || s.nodeType)) {
					var parent = this.isString(s) ? self.domFind(s)[0] : s;
					this.wrap(m, "in", s);
				}
			}
			return this;
		},
		clone: function(deep, m) { //克隆标签
			var m = m ? m : jlpm[0],
				deep = deep && deep === false ? false : true;
			if (m.length == 0) return b;
			var elems = [];
			jlpm.each(m, function() {
				var cm = this.cloneNode(deep);
				if (cm.clearAttributes) {
					cm.clearAttributes();
				}
				if (cm.mergeAttributes) {
					cm.mergeAttributes(this);
				}
				var nodeName = cm.nodeName.toLowerCase();
				// IE6-8 fail to clone children inside object elements that use
				// the proprietary classid attribute value (rather than the type
				// attribute) to identify the type of content to display
				if (nodeName === "object") {
					cm.outerHTML = this.outerHTML;
				} else if (nodeName === "input" && (this.type === "checkbox" || this.type === "radio")) {
					// IE6-8 fails to persist the checked state of a cloned checkbox
					// or radio button. Worse, IE6-7 fail to give the cloned element
					// a checked appearance if the defaultChecked value isn't also set
					if (this.checked) {
						cm.defaultChecked = cm.checked = this.checked;
					}
					// IE6-7 get confused and end up setting the value of a cloned
					// checkbox/radio button to an empty string instead of "on"
					if (cm.value !== this.value) {
						cm.value = this.value;
					}
					// IE6-8 fails to return the selected option to the default selected
					// state when cloning options
				} else if (nodeName === "option") {
					cm.selected = this.defaultSelected;
					// IE6-8 fails to set the defaultValue to the correct value when
					// cloning other types of input fields
				} else if (nodeName === "input" || nodeName === "textarea") {
					cm.defaultValue = this.defaultValue;
				}
				elems.push(cm);
			});
			elems = jlpm.isSingle(elems) ? elems[0] : elems;
			jlpm.record(m, elems, null, null);
			return this;
		},
		html: function(value, m) { //获取设置HTML代码
			var m = m ? m : jlpm[0],
				self = this;
			if (!jlpm.isEmpty(m)) {
				if (!jlpm.isEmpty(value)) {
					if (this.isString(value)) {
						jlpm.each(m, function(i) {
							if (this.tagName && /[script|style]/.test(this.tagName.toLowerCase())) {
								try {
									this.innerHTML = value;
								} catch (e) {
									this.text = value;
								}
							} else {
								var valueN = value.replace(jlpm.sMatch.rxhtmlTag, "<$1></$2>");
								try {
									this.innerHTML = valueN;
								} catch (e) {
									this.text = valueN;
								}
							}
						});
					}
					if (this.isFunction(value)) {
						jlpm.each(m, function(i) {
							self.domFind(this).html(value.call(this, i, self.html()));
						});
					}
					return this;
				} else {
					return m.innerHTML;
				}
			} else {
				return this;
			}
		},
		textValue: function(value, splits, m) { //获取设置文本内容
			var ret = "",
				elem, elems = m ? m : jlpm[0],
				ve = /[input|li|option|button]/,
				spt = splits ? splits : "",
				gv = value ? value : null,
				self = this;
			if (!jlpm.isEmpty(elems)) {
				if (jlpm.isEmpty(gv)) {
					if (elems.length) {
						jlpm.each(elems, function() {
							ret += jlpm._text(this) + spt;
						});
						if (jlpm.isEmpty(ret)) {
							jlpm.each(elems, function() {
								if (this.tagName.toLowerCase() == "option") {
									jlpm("option", this.parentNode).each(function() {
										if (this.selected) {
											ret += this.value + spt;
											return false;
										}
									});
								} else if (ve.test(this.tagName.toLowerCase()) || ("value" in this)) {
									ret += this.value + spt;
								}
								// Get the text from text nodes and CDATA nodes
								if (this.nodeType === 3 || this.nodeType === 4) {
									ret += this.nodeValue + spt;
									// Traverse everything else, except comment nodes
								}
							});
						}
					} else {
						ret = elems.tagName.toLowerCase() == "option" ? (function(obj) {
							var gvalue = "";
							jlpm("option", obj.parentNode).each(function() {
								if (this.selected) {
									gvalue = this.value;
									return false;
								}
							});
							return gvalue;
						})(elems) : (ve.test(elems.tagName.toLowerCase()) || ("value" in elems)) ? elems.value : (elems.nodeValue) ? elems.nodeValue : (elems.innerText) ? elems.innerText : elems.innerHTML;
					}
					return jlpm.isEmpty(ret) ? undefined : ret;
				} else {
					if (elems.length) {
						jlpm.each(elems, function() {
							if (this.nodeType === 3 || this.nodeType === 4) {
								(this.nodeValue) ? this.nodeValue = gv : this.innerHTML = gv;
							} else {
								self.textValue(this.children, gv);
							}
						});
					} else {
						(elems.nodeValue) ? elems.nodeValue = gv : elems.innerHTML = gv;
					}
					return this;
				}
			} else {
				return this;
			}
		}
	});
	jlpm.each(["siblings", "children"], function(i, name) {
		//0同父相邻所有标签 //1取所有子标签
		jlpm.fn.extend(name, function(m) {
			var m = m ? m : jlpm[0],
				self = this;
			if (m.length == 0) return this;
			var elems = [];
			jlpm.each(m, function() {
				elems = this.parentNode && /0/.test(i + "") ? elems.concat(jlpm._siblings(this.parentNode.firstChild, this)) : elems.concat(jlpm._siblings(this.firstChild));
			});
			elems = jlpm.isSingle(elems) ? elems[0] : elems;
			jlpm.record(m, elems, null, null);
			return this;
		});
	}).each({
		parents: "parentNode",
		nextAll: "nextSibling",
		prevAll: "previousSibling"
	}, function(name, type) {
		jlpm.fn.extend(name, function(selector, m) {
			var m = m ? m : jlpm[0],
				gm = jlpm.dir(m, type);
			if (selector && type == "parentNode") {
				return this.domFind(gm).choose(selector);
			}
			if (gm) {
				jlpm.record(m, gm, null, null);
			}
			return this;
		});
	}).each(["after", "before", "prepend", "append"], function(i, name) {
		//0当前标签后插入 //1当前标签前插入 //2标签内插入首标签 //3标签内追加
		jlpm.fn.extend(name, function(value, m) {
			var m = m ? m : jlpm[0],
				self = this;
			if (!jlpm.isEmpty(m) && !jlpm.isEmpty(value)) {
				jlpm.each(m, function() {
					var nd = (self.isString(value)) ? jlpm.crDom(value) : value,
						sm = this;
					jlpm.each(nd, function() {
						sm.parentNode && /0|1/.test(i + "") ? sm.parentNode.insertBefore(this, /0/.test(i + "") ? sm.nextSibling : sm) : /2/.test(i + "") ? sm.insertBefore(this, sm.firstChild) : sm.appendChild(this);
					});
					jlpm.record(this, nd, null, null);
				});
			}
			return this;
		});
	}).each({
		next: "nextSibling",
		prev: "previousSibling"
	}, function(name, type) {
		jlpm.fn.extend(name, function(m) {
			var m = m ? m : jlpm[0],
				a = [],
				old = m,
				self = this;
			jlpm.each(m, function(i, obj) {
				a.push(jlpm.nth(obj, 2, type));
			});
			if (jlpm.isSingle(a)) a = a[0];
			if (jlpm.isEmpty(a)) return this;
			jlpm.record(m, a, null, null);
			return this;
		});
	}).each(["first", "last"], function(i, name) {
		jlpm.fn.extend(name, function(m) {
			var m = m ? m : jlpm[0],
				a = [],
				old = m,
				self = this;
			if (m && m.nodeType) {
				a.push(jlpm.eq(/0/.test(i + "") ? 0 : (self.children(m)[0] ? self.children(m)[0].length - 1 : 0), self.children(m)[0]));
			} else {
				jlpm.each(m, function(obj) {
					a.push(jlpm.eq(/0/.test(i + "") ? 0 : self.length - 1, obj));
				});
			}
			if (jlpm.isSingle(a)) a = a[0];
			if (jlpm.isEmpty(a)) return this;
			jlpm.record(m, a, null, null);
			return this;
		});
	});
	/*.each({
		unique: true,
		filter: false
	}, function(name, bool) {
		//0唯一的 //1过滤
		jlpm.fn.extend(name, function(value, m) {
			var m = m ? m : jlpm[0],
				elem;
			elem = bool && typeof value == "undefined" ? this.oldunique(m) : this.oldFilter(value, m);
			if (!jlpm.isEmpty(elem)) {
				elem = jlpm.isSingle(elem) ? elem[0] : elem;
				jlpm.record(this[0], elem, null, null);
				return elem;
			} else {
				return undefined;
			}
		});
	})*/

	//尺寸及坐标
	jlpm.extend({
		setPositiveNumber: function(elem, value, subtract) {
			var matches = this.sMatch.rnumsplit.exec(value);
			return matches ?
			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value;
		},
		augmentOffset: function(elem, name, extra, isBorderBox, styles) {
			var i = extra === (isBorderBox ? "border" : "content") ?
			// If we already have the right measurement, avoid augmentation
			4 :
			// Otherwise initialize for horizontal or vertical properties
			name === "width" ? 1 : 0,
				val = 0;
			for (; i < 4; i += 2) {
				// both box models exclude margin, so add it if we want it
				if (extra === "margin") {
					val += parseFloat(jlpm(elem).css(extra + this.propfx.cssExpand[i]));
				}

				if (isBorderBox) {
					// border-box includes padding, so remove it if we want content
					if (extra === "content") {
						val -= parseFloat(jlpm(elem).css("padding" + this.propfx.cssExpand[i]));
					}

					// at this point, extra isn't border nor margin, so remove border
					if (extra !== "margin") {
						val -= parseFloat(jlpm(elem).css("border" + this.propfx.cssExpand[i] + "Width"));
					}
				} else {
					// at this point, extra isn't content, so add padding
					val += parseFloat(jlpm(elem).css("padding" + this.propfx.cssExpand[i]));

					// at this point, extra isn't content nor padding, so add border
					if (extra !== "padding") {
						val += parseFloat(jlpm(elem).css("border" + this.propfx.cssExpand[i] + "Width"));
					}
				}
			}

			return val;
		},
		getOffset: function(elem, name, extra) {
			// Start with offset property, which is equivalent to the border-box value
			var valueIsBorderBox = true,
				val = elem["offset" + this.propfx[name]],
				styles = this.getStyles(elem),
				isBorderBox = jlpm(elem).css("boxSizing") === "border-box";
			// some non-html elements return undefined for offsetWidth, so check for null/undefined
			// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
			// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
			if (val <= 0 || val == null) {
				// Fall back to computed then uncomputed css if necessary
				val = jlpm(elem).css(name);
				if (val < 0 || val == null) {
					val = elem.style ? elem.style[name] : undefined;
				}
				// Computed unit is not pixels. Stop here and return.
				if (this.sMatch.rnumnonpx.test(val)) {
					return val;
				}
				// we need the check for style in case a browser which returns unreliable values
				// for getComputedStyle silently falls back to the reliable elem.style
				valueIsBorderBox = isBorderBox && (val === elem.style[name]);
				// Normalize "", auto, and prepare for extra
				val = parseFloat(val) || 0;
			}
			// use the active box-sizing model to add/subtract irrelevant styles
			return (val + (/width|height/.test(name) ? (this.augmentOffset(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) || 0) : 0)) + "px";
		},
		_getWH: function(elem, name, computed, extra) {
			var self = this;
			if (computed) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem["offset" + this.propfx[name]] === 0 && this.sMatch.rdisplayswap.test(jlpm(elem).css("display")) ? jlpm(elem).swap(this.propfx["cssShow"], function() {
					return self.getOffset(elem, name, extra);
				}) : self.getOffset(elem, name, extra);
			}
		},
		_setWH: function(elem, name, value, extra) {
			var styles = extra && this.getStyles(elem);
			return this.setPositiveNumber(elem, value, extra ? this.augmentOffset(
			elem, name, extra, jlpm(elem).css("boxSizing") === "border-box", styles) : 0);
		},
		csshook: function(name, val, extra, m) {
			var self = this,
				m = m ? m : jlpm[0];
			if (typeof val != "undefined") {
				jlpm.each(m, function(i, obj) {
					jlpm(obj).css(name, jlpm._setWH(obj, name, val, extra));
				});
				return this;
			} else {
				var values = [],
					len = m.length ? m.length : 0;
				jlpm.each(m, function(i, obj) {
					var v = jlpm._getWH(obj, name, true, extra);
					if (v != undefined) {
						values.push(v);
					}
					if (len <= 1) {
						return false;
					}
				});
				return jlpm.isEmpty(values) ? undefined : jlpm.isSingle(values) ? values[0] : values;
			}
		}
	});
	jlpm.each(["top", "left", "bottom", "right"], function(i, name) {
		jlpm.fn.extend(name, function(val) {
			var m = undefined;
			if (jlpm.isElement(val)){
				m = val;
				val = undefined;
			}else{
				m = undefined;
			}
			return jlpm.csshook(name, val, undefined, m);
		});
	}).each({
		Height: "height",
		Width: "width"
	}, function(name, type) {
		jlpm.each({
			padding: "inner" + name,
			content: type,
			"": "outer" + name
		}, function(defaultExtra, funcName) {
			jlpm.fn.extend(funcName, function(value, margin, m) {
				var chainable = arguments.length && (defaultExtra || jlpm.type(margin) !== "boolean"),
					extra = defaultExtra || (margin === true || value === true ? "margin" : "border"),
					m = m ? m : jlpm.isElement(value) ? value : this[0],
					doc;
				if (jlpm.type(m) === "object" && "setInterval" in m) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					return m.document.documentElement["client" + name];
				}
				// Get document width or height
				if (m.nodeType === 9) {
					doc = m.documentElement;
					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(m.body["scroll" + name], doc["scroll" + name], m.body["offset" + name], doc["offset" + name], doc["client" + name]);
				}
				return value == undefined||jlpm.isElement(value) ? jlpm.csshook(type, undefined, extra, m) : jlpm.csshook(type, value, extra, m);
			});
		});
	}).each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset",
		scrollWidth: "",
		scrollHeight: ""
	}, function(method, prop) {
		var top = /Y/.test(prop);
		jlpm.fn.extend(method, function(val) {
			var m = m ? m : jlpm[0],
				getwin = jlpm.gWin(m);
			if (val === undefined) {
				return win ? (prop in win) ? win[prop] : win.document.documentElement[method] : m[method];
			}
			if (getwin||val==win) {
				win.scrollTo(!top ? val : jlpm(getwin).scrollLeft(), top ? val : jlpm(getwin).scrollTop());
			} else {
				m[method] = val;
			}
		});
	});

	//取对象的宽、高、TOP、LEFT
	jlpm.fn.size = function(m) {
		var m = m ? m : jlpm[0],
			width = jlpm(m).outerWidth(),
			height = jlpm(m).outerHeight(),
			top = jlpm(m).top(),
			left = jlpm(m).left();
		return {
			width: width || 0,
			height: height || 0,
			top: top || 0,
			left: left || 0
		};
	};

	//touch
	if (jlpm.ua().type != "desktop") {
		jlpm.extend({
			isOnff: function() { //HTML5检测是否在线，离线应用
				return (navigator.online) ? navigator.online : false;
			},
			orientation: win.orientation ? win.orientation == 0 || win.orientation == 180 ? "horizontal" : "vertical" : false
		});
		jlpm.fn.extend({
			isScrollShow: function(m) { //是否显示滚动条
				var m = m ? m : jlpm[0];
				var isOverflow = parent ? (this.domFind(m).css("overflow") || "auto") != "hidden" ? true : false : false,
					isBig = m && parent ? (this.domFind(m).scrollHeight() || 0) > (parseFloat(this.domFind(m).innerHeight()) || 0) ? true : false : false;
				return isOverflow && isBig ? true : false;
			},
			touch: function(opts) { //左右上下
				if (jlpm.ua().type != "desktop") {
					var self = this,
						m = jlpm[0],
						swipe = function(elID, opts) {
							var that = this;
							if (jlpm.type(elID) == "string") this.el = doc.getElementById(elID);
							else this.el = elID
							if (!this.el) {
								alert("Error adding swipe listener for " + elID);
								return;
							}
							self.domFind(this.el).off('touchmove').on('touchmove', function(e) {
								that.touchMove(e);
							}).off('touchend').on('touchend', function(e) {
								that.touchEnd(e);
							});
							for (j in opts) {
								this[j] = opts[j];
							}
						};
					swipe.prototype = {
						startX: 0,
						startY: 0,
						movingX: 0,
						movingY: 0,
						vthreshold: 50,
						hthreshold: 50,
						movingElement: false,
						swipeDirection: {
							up: false,
							down: false,
							left: false,
							right: false
						},
						callBack: null,
						cancel: function() {
							this.startX = 0;
							this.startY = 0;
							this.movingX = 0;
							this.movingY = 0;
							this.movingElement = false;
							this.swipeDirection = {
								up: false,
								down: false,
								left: false,
								right: false
							};
						},
						touchStart: function(event) {
							if (event.touches[0].target && event.touches[0].target.type != undefined) {
								return;
							}
							if (event.touches.length == 1) {
								this.movingElement = true;
								this.startX = event.touches[0].pageX;
								this.startY = event.touches[0].pageY;
								event.preventDefault();
							}
						},
						touchMove: function(event) {
							if (this.movingElement == false) this.touchStart(event);
							event.preventDefault();
							if (event.touches.length > 1 || !this.movingElement) {
								this.cancel();
								return;
							}
							this.movingX = event.touches[0].pageX - this.startX;
							this.movingY = event.touches[0].pageY - this.startY;
						},
						touchEnd: function(event) {
							if (!this.movingElement) return;
							var swiped = false;
							if (Math.abs(this.movingX) > this.hthreshold) {
								this.swipeDirection.right = this.movingX > 0;
								this.swipeDirection.left = this.movingX < 0;
								swiped = true;
							}
							if (Math.abs(this.movingY) > this.vthreshold) {
								this.swipeDirection.up = this.movingY < 0;
								this.swipeDirection.down = this.movingY > 0;
								swiped = true;
							}
							if (swiped && jlpm.type(this.callBack) == "function") this.callBack.call(this.el, this.swipeDirection, Math.abs(this.movingY));
							event.preventDefault();
							this.cancel();
						}
					};
					this.each(m, function(i, obj) {
						new swipe(m[i], opts);
					});
				}
				return this;
			},
			tap: function(callback) { //单\双击tap
				if (jlpm.ua().type != "desktop") {
					var m = m ? m : jlpm[0],
						self = this,
						tap = function(callback) {
							var that = this;
							if (m.tagName.toLowerCase() == "a") {
								var oldhref = self.domFind(m).attr("href") != "javascript:void(0);" ? self.domFind(m).attr("data-href") : self.domFind(m).attr("href");
								self.domFind(m).attr("href", "javascript:void(0);").attr("data-href", oldhref);
							}
							self.domFind(m).attr("data-isNotSingleTouch", "false").off("touchstart").on("touchstart", function(event) {
								return that.ontapstart.call(this, event, that, callback);
							}).off("touchmove").on("touchmove", function(event) {
								return that.ontapmove.call(this, event, that, callback);
							}).off("touchend").on("touchend", function(event) {
								return that.ontapend.call(this, event, that, callback);
							});
							return self;
						};
					tap.prototype = {
						ontapstart: function(event, that, callback) {
							event.preventDefault();
							that.startTime = (new Date()).getTime();
							self.domFind(this).attr("data-isNotSingleTouch", event.touches.length > 1 ? "true" : "false");
						},
						ontapmove: function(event) {
							event.preventDefault();
							return false;
						},
						ontapend: function(event, that, callback) {
							event.preventDefault();
							var lastTime = that.lastTime,
								time = (new Date()).getTime(),
								duration;
							that.lastTime = time;
							duration = that.startTime - lastTime || 0;
							if (self.domFind(this).attr("data-isNotSingleTouch") != "true") {
								if (duration > 10 && duration <= 300 || time - that.startTime > 300) {
									that.lastTime = that.startTime = lastTime = undefined;
									var touch = event.changedTouches[0];
									if (callback) callback.call(this, event, touch, duration > 10 && duration <= 300 ? "doubletap" : "singletap");
								}
							}
						}
					}
					new tap(callback);
				}
				return this;
			}
		});
		jlpm.each(["doubletap", "singletap"], function(i, name) { //单双击TAP
			jlpm.fn.extend(name, function(callback, m) {
				var m = m ? m : this[0];
				this.domFind(m).tap(function(event, touch, type) {
					if (type == name) {
						callback.call(this, event, touch, type);
					}
				});
				return this;
			});
		});
		jlpm(win).on("orientationchange", function() {
			jlpm.orientation = this.orientation ? this.orientation == 0 || this.orientation == 180 ? "horizontal" : "vertical" : false;
		});
	}

	/*!
	 * Sizzle CSS Selector Engine
	 *  Copyright 2011, The Dojo Foundation
	 *  Released under the MIT, BSD, and GPL Licenses.
	 *  More information: http://sizzlejs.com/
	 */
	if (!doc.querySelectorAll) {
		var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
			expando = "sizcache" + (Math.random() + '').replace('.', ''),
			done = 0,
			toString = Object.prototype.toString,
			hasDuplicate = false,
			//baseHasDuplicate = true,
			rBackslash = /\\/g,
			rNonWord = /\W/;

		// Here we check if the JavaScript engine is using some sort of
		// optimization where it does not always call our comparision
		// function. If that is the case, discard the hasDuplicate value.
		//   Thus far that includes Google Chrome.
		/*[0, 0].sort(function() {
			baseHasDuplicate = false;
			return 0;
		});*/

		var Sizzle = function(selector, context, results, seed) {
			results = results || [];
			context = context || doc;

			var origContext = context;

			if (context.nodeType !== 1 && context.nodeType !== 9) {
				return [];
			}

			if (!selector || typeof selector !== "string") {
				return results;
			}

			var m, set, checkSet, extra, ret, cur, pop, i, prune = true,
				contextXML = Sizzle.isXML(context),
				parts = [],
				soFar = selector;

			// Reset the position of the chunker regexp (start from head)
			do {
				chunker.exec("");
				m = chunker.exec(soFar);

				if (m) {
					soFar = m[3];

					parts.push(m[1]);

					if (m[2]) {
						extra = m[3];
						break;
					}
				}
			} while (m);

			if (parts.length > 1 && origPOS.exec(selector)) {

				if (parts.length === 2 && Expr.relative[parts[0]]) {
					set = posProcess(parts[0] + parts[1], context, seed);

				} else {
					set = Expr.relative[parts[0]] ? [context] : Sizzle(parts.shift(), context);

					while (parts.length) {
						selector = parts.shift();

						if (Expr.relative[selector]) {
							selector += parts.shift();
						}

						set = posProcess(selector, set, seed);
					}
				}

			} else {
				// Take a shortcut and set the context if the root selector is an ID
				// (but not if it'll be faster if the inner selector is an ID)
				if (!seed && parts.length > 1 && context.nodeType === 9 && !contextXML && Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1])) {

					ret = Sizzle.find(parts.shift(), context, contextXML);
					context = ret.expr ? Sizzle.filter(ret.expr, ret.set)[0] : ret.set[0];
				}

				if (context) {
					ret = seed ? {
						expr: parts.pop(),
						set: makeArray(seed)
					} : Sizzle.find(parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML);

					set = ret.expr ? Sizzle.filter(ret.expr, ret.set) : ret.set;

					if (parts.length > 0) {
						checkSet = makeArray(set);

					} else {
						prune = false;
					}

					while (parts.length) {
						cur = parts.pop();
						pop = cur;

						if (!Expr.relative[cur]) {
							cur = "";
						} else {
							pop = parts.pop();
						}

						if (pop == null) {
							pop = context;
						}

						Expr.relative[cur](checkSet, pop, contextXML);
					}

				} else {
					checkSet = parts = [];
				}
			}

			if (!checkSet) {
				checkSet = set;
			}

			if (!checkSet) {
				Sizzle.error(cur || selector);
			}

			if (toString.call(checkSet) === "[object Array]") {
				if (!prune) {
					results.push.apply(results, checkSet);

				} else if (context && context.nodeType === 1) {
					for (i = 0; checkSet[i] != null; i++) {
						if (checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i]))) {
							results.push(set[i]);
						}
					}

				} else {
					for (i = 0; checkSet[i] != null; i++) {
						if (checkSet[i] && checkSet[i].nodeType === 1) {
							results.push(set[i]);
						}
					}
				}

			} else {
				makeArray(checkSet, results);
			}

			if (extra) {
				Sizzle(extra, origContext, results, seed);
				Sizzle.uniqueSort(results);
			}

			return results;
		};
		Sizzle.uniqueSort = function(results) {
			if (sortOrder) {
				hasDuplicate = baseHasDuplicate;
				results.sort(sortOrder);

				if (hasDuplicate) {
					for (var i = 1; i < results.length; i++) {
						if (results[i] === results[i - 1]) {
							results.splice(i--, 1);
						}
					}
				}
			}

			return results;
		};

		Sizzle.matches = function(expr, set) {
			return Sizzle(expr, null, null, set);
		};

		Sizzle.matchesSelector = function(node, expr) {
			return Sizzle(expr, null, null, [node]).length > 0;
		};

		Sizzle.find = function(expr, context, isXML) {
			var set, i, len, match, type, left;

			if (!expr) {
				return [];
			}

			for (i = 0, len = Expr.order.length; i < len; i++) {
				type = Expr.order[i];

				if ((match = Expr.leftMatch[type].exec(expr))) {
					left = match[1];
					match.splice(1, 1);

					if (left.substr(left.length - 1) !== "\\") {
						match[1] = (match[1] || "").replace(rBackslash, "");
						set = Expr.find[type](match, context, isXML);

						if (set != null) {
							expr = expr.replace(Expr.match[type], "");
							break;
						}
					}
				}
			}

			if (!set) {
				set = typeof context.getElementsByTagName !== "undefined" ? context.getElementsByTagName("*") : [];
			}

			return {
				set: set,
				expr: expr
			};
		};

		Sizzle.filter = function(expr, set, inplace, not) {
			var match, anyFound, type, found, item, filter, left, i, pass, old = expr,
				result = [],
				curLoop = set,
				isXMLFilter = set && set[0] && Sizzle.isXML(set[0]);

			while (expr && set.length) {
				for (type in Expr.filter) {
					if ((match = Expr.leftMatch[type].exec(expr)) != null && match[2]) {
						filter = Expr.filter[type];
						left = match[1];

						anyFound = false;

						match.splice(1, 1);

						if (left.substr(left.length - 1) === "\\") {
							continue;
						}

						if (curLoop === result) {
							result = [];
						}

						if (Expr.preFilter[type]) {
							match = Expr.preFilter[type](match, curLoop, inplace, result, not, isXMLFilter);

							if (!match) {
								anyFound = found = true;

							} else if (match === true) {
								continue;
							}
						}

						if (match) {
							for (i = 0;
							(item = curLoop[i]) != null; i++) {
								if (item) {
									found = filter(item, match, i, curLoop);
									pass = not ^ found;

									if (inplace && found != null) {
										if (pass) {
											anyFound = true;

										} else {
											curLoop[i] = false;
										}

									} else if (pass) {
										result.push(item);
										anyFound = true;
									}
								}
							}
						}

						if (found !== undefined) {
							if (!inplace) {
								curLoop = result;
							}

							expr = expr.replace(Expr.match[type], "");

							if (!anyFound) {
								return [];
							}

							break;
						}
					}
				}

				// Improper expression
				if (expr === old) {
					if (anyFound == null) {
						Sizzle.error(expr);

					} else {
						break;
					}
				}

				old = expr;
			}

			return curLoop;
		};

		Sizzle.error = function(msg) {
			if (console && console.log) console.log("Syntax error, unrecognized expression: " + msg);
		};

		/**
		 * Utility function for retreiving the text value of an array of DOM nodes
		 * @param {Array|Element} elem
		 */
		var getText = Sizzle.getText = jlpm.text;
		/*function(elem) {
			var i, node, nodeType = elem.nodeType,
				ret = "";

			if (nodeType) {
				if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
					// Use textContent for elements
					// innerText usage removed for consistency of new lines (see #11153)
					if (typeof elem.textContent === "string") {
						return elem.textContent;
					} else {
						// Traverse it's children
						for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
							ret += getText(elem);
						}
					}
				} else if (nodeType === 3 || nodeType === 4) {
					return elem.nodeValue;
				}
			} else {

				// If no nodeType, this is expected to be an array
				for (i = 0;
				(node = elem[i]); i++) {
					// Do not traverse comment nodes
					if (node.nodeType !== 8) {
						ret += getText(node);
					}
				}
			}
			return ret;
		};*/

		var Expr = Sizzle.selectors = {
			order: ["ID", "NAME", "TAG"],

			match: {
				ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
				CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
				NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
				ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
				TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
				CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
				POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
				PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
			},

			leftMatch: {},

			attrMap: {
				"class": "className",
				"for": "htmlFor"
			},

			attrHandle: {
				href: function(elem) {
					return elem.getAttribute("href");
				},
				type: function(elem) {
					return elem.getAttribute("type");
				}
			},

			relative: {
				"+": function(checkSet, part) {
					var isPartStr = typeof part === "string",
						isTag = isPartStr && !rNonWord.test(part),
						isPartStrNotTag = isPartStr && !isTag;

					if (isTag) {
						part = part.toLowerCase();
					}

					for (var i = 0, l = checkSet.length, elem; i < l; i++) {
						if ((elem = checkSet[i])) {
							while ((elem = elem.previousSibling) && elem.nodeType !== 1) {}

							checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ? elem || false : elem === part;
						}
					}

					if (isPartStrNotTag) {
						Sizzle.filter(part, checkSet, true);
					}
				},

				">": function(checkSet, part) {
					var elem, isPartStr = typeof part === "string",
						i = 0,
						l = checkSet.length;

					if (isPartStr && !rNonWord.test(part)) {
						part = part.toLowerCase();

						for (; i < l; i++) {
							elem = checkSet[i];

							if (elem) {
								var parent = elem.parentNode;
								checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
							}
						}

					} else {
						for (; i < l; i++) {
							elem = checkSet[i];

							if (elem) {
								checkSet[i] = isPartStr ? elem.parentNode : elem.parentNode === part;
							}
						}

						if (isPartStr) {
							Sizzle.filter(part, checkSet, true);
						}
					}
				},

				"": function(checkSet, part, isXML) {
					var nodeCheck, doneName = done++,
						checkFn = dirCheck;

					if (typeof part === "string" && !rNonWord.test(part)) {
						part = part.toLowerCase();
						nodeCheck = part;
						checkFn = dirNodeCheck;
					}

					checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML);
				},

				"~": function(checkSet, part, isXML) {
					var nodeCheck, doneName = done++,
						checkFn = dirCheck;

					if (typeof part === "string" && !rNonWord.test(part)) {
						part = part.toLowerCase();
						nodeCheck = part;
						checkFn = dirNodeCheck;
					}

					checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML);
				}
			},

			find: {
				ID: function(match, context, isXML) {
					if (typeof context.getElementById !== "undefined" && !isXML) {
						var m = context.getElementById(match[1]);
						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document #6963
						return m && m.parentNode ? [m] : [];
					}
				},

				NAME: function(match, context) {
					if (typeof context.getElementsByName !== "undefined") {
						var ret = [],
							results = context.getElementsByName(match[1]);

						for (var i = 0, l = results.length; i < l; i++) {
							if (results[i].getAttribute("name") === match[1]) {
								ret.push(results[i]);
							}
						}

						return ret.length === 0 ? null : ret;
					}
				},

				TAG: function(match, context) {
					if (typeof context.getElementsByTagName !== "undefined") {
						return context.getElementsByTagName(match[1]);
					}
				}
			},
			preFilter: {
				CLASS: function(match, curLoop, inplace, result, not, isXML) {
					match = " " + match[1].replace(rBackslash, "") + " ";

					if (isXML) {
						return match;
					}

					for (var i = 0, elem;
					(elem = curLoop[i]) != null; i++) {
						if (elem) {
							if (not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n\r]/g, " ").indexOf(match) >= 0)) {
								if (!inplace) {
									result.push(elem);
								}

							} else if (inplace) {
								curLoop[i] = false;
							}
						}
					}

					return false;
				},

				ID: function(match) {
					return match[1].replace(rBackslash, "");
				},

				TAG: function(match, curLoop) {
					return match[1].replace(rBackslash, "").toLowerCase();
				},

				CHILD: function(match) {
					if (match[1] === "nth") {
						if (!match[2]) {
							Sizzle.error(match[0]);
						}

						match[2] = match[2].replace(/^\+|\s*/g, '');

						// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
						var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(
						match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" || !/\D/.test(match[2]) && "0n+" + match[2] || match[2]);

						// calculate the numbers (first)n+(last) including if they are negative
						match[2] = (test[1] + (test[2] || 1)) - 0;
						match[3] = test[3] - 0;
					} else if (match[2]) {
						Sizzle.error(match[0]);
					}

					// TODO: Move to normal caching system
					match[0] = done++;

					return match;
				},

				ATTR: function(match, curLoop, inplace, result, not, isXML) {
					var name = match[1] = match[1].replace(rBackslash, "");

					if (!isXML && Expr.attrMap[name]) {
						match[1] = Expr.attrMap[name];
					}

					// Handle if an un-quoted value was used
					match[4] = (match[4] || match[5] || "").replace(rBackslash, "");

					if (match[2] === "~=") {
						match[4] = " " + match[4] + " ";
					}

					return match;
				},

				PSEUDO: function(match, curLoop, inplace, result, not) {
					if (match[1] === "not") {
						// If we're dealing with a complex expression, or a simple one
						if ((chunker.exec(match[3]) || "").length > 1 || /^\w/.test(match[3])) {
							match[3] = Sizzle(match[3], null, null, curLoop);

						} else {
							var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);

							if (!inplace) {
								result.push.apply(result, ret);
							}

							return false;
						}

					} else if (Expr.match.POS.test(match[0]) || Expr.match.CHILD.test(match[0])) {
						return true;
					}

					return match;
				},

				POS: function(match) {
					match.unshift(true);

					return match;
				}
			},

			filters: {
				enabled: function(elem) {
					return elem.disabled === false && elem.type !== "hidden";
				},

				disabled: function(elem) {
					return elem.disabled === true;
				},

				checked: function(elem) {
					return elem.checked === true;
				},

				selected: function(elem) {
					// Accessing this property makes selected-by-default
					// options in Safari work properly
					if (elem.parentNode) {
						elem.parentNode.selectedIndex;
					}

					return elem.selected === true;
				},

				parent: function(elem) {
					return !!elem.firstChild;
				},

				empty: function(elem) {
					return !elem.firstChild;
				},

				has: function(elem, i, match) {
					return !!Sizzle(match[3], elem).length;
				},

				header: function(elem) {
					return (/h\d/i).test(elem.nodeName);
				},

				text: function(elem) {
					var attr = elem.getAttribute("type"),
						type = elem.type;
					// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
					// use getAttribute instead to test this case
					return elem.nodeName.toLowerCase() === "input" && "text" === type && (attr === type || attr === null);
				},

				radio: function(elem) {
					return elem.nodeName.toLowerCase() === "input" && "radio" === elem.type;
				},

				checkbox: function(elem) {
					return elem.nodeName.toLowerCase() === "input" && "checkbox" === elem.type;
				},

				file: function(elem) {
					return elem.nodeName.toLowerCase() === "input" && "file" === elem.type;
				},

				password: function(elem) {
					return elem.nodeName.toLowerCase() === "input" && "password" === elem.type;
				},

				submit: function(elem) {
					var name = elem.nodeName.toLowerCase();
					return (name === "input" || name === "button") && "submit" === elem.type;
				},

				image: function(elem) {
					return elem.nodeName.toLowerCase() === "input" && "image" === elem.type;
				},

				reset: function(elem) {
					var name = elem.nodeName.toLowerCase();
					return (name === "input" || name === "button") && "reset" === elem.type;
				},

				button: function(elem) {
					var name = elem.nodeName.toLowerCase();
					return name === "input" && "button" === elem.type || name === "button";
				},

				input: function(elem) {
					return (/input|select|textarea|button/i).test(elem.nodeName);
				},

				focus: function(elem) {
					return elem === elem.ownerDocument.activeElement;
				}
			},
			setFilters: {
				first: function(elem, i) {
					return i === 0;
				},

				last: function(elem, i, match, array) {
					return i === array.length - 1;
				},

				even: function(elem, i) {
					return i % 2 === 0;
				},

				odd: function(elem, i) {
					return i % 2 === 1;
				},

				lt: function(elem, i, match) {
					return i < match[3] - 0;
				},

				gt: function(elem, i, match) {
					return i > match[3] - 0;
				},

				nth: function(elem, i, match) {
					return match[3] - 0 === i;
				},

				eq: function(elem, i, match) {
					return match[3] - 0 === i;
				}
			},
			filter: {
				PSEUDO: function(elem, match, i, array) {
					var name = match[1],
						filter = Expr.filters[name];

					if (filter) {
						return filter(elem, i, match, array);

					} else if (name === "contains") {
						return (elem.textContent || elem.innerText || getText([elem]) || "").indexOf(match[3]) >= 0;

					} else if (name === "not") {
						var not = match[3];

						for (var j = 0, l = not.length; j < l; j++) {
							if (not[j] === elem) {
								return false;
							}
						}

						return true;

					} else {
						Sizzle.error(name);
					}
				},

				CHILD: function(elem, match) {
					var first, last, doneName, parent, cache, count, diff, type = match[1],
						node = elem;

					switch (type) {
						case "only":
						case "first":
							while ((node = node.previousSibling)) {
								if (node.nodeType === 1) {
									return false;
								}
							}

							if (type === "first") {
								return true;
							}

							node = elem;

							/* falls through */
						case "last":
							while ((node = node.nextSibling)) {
								if (node.nodeType === 1) {
									return false;
								}
							}

							return true;

						case "nth":
							first = match[2];
							last = match[3];

							if (first === 1 && last === 0) {
								return true;
							}

							doneName = match[0];
							parent = elem.parentNode;

							if (parent && (parent[expando] !== doneName || !elem.nodeIndex)) {
								count = 0;

								for (node = parent.firstChild; node; node = node.nextSibling) {
									if (node.nodeType === 1) {
										node.nodeIndex = ++count;
									}
								}

								parent[expando] = doneName;
							}

							diff = elem.nodeIndex - last;

							if (first === 0) {
								return diff === 0;

							} else {
								return (diff % first === 0 && diff / first >= 0);
							}
					}
				},

				ID: function(elem, match) {
					return elem.nodeType === 1 && elem.getAttribute("id") === match;
				},

				TAG: function(elem, match) {
					return (match === "*" && elem.nodeType === 1) || !! elem.nodeName && elem.nodeName.toLowerCase() === match;
				},

				CLASS: function(elem, match) {
					return (" " + (elem.className || elem.getAttribute("class")) + " ").indexOf(match) > -1;
				},

				ATTR: function(elem, match) {
					var name = match[1],
						result = Sizzle.attr ? Sizzle.attr(elem, name) : Expr.attrHandle[name] ? Expr.attrHandle[name](elem) : elem[name] != null ? elem[name] : elem.getAttribute(name),
						value = result + "",
						type = match[2],
						check = match[4];

					return result == null ? type === "!=" : !type && Sizzle.attr ? result != null : type === "=" ? value === check : type === "*=" ? value.indexOf(check) >= 0 : type === "~=" ? (" " + value + " ").indexOf(check) >= 0 : !check ? value && result !== false : type === "!=" ? value !== check : type === "^=" ? value.indexOf(check) === 0 : type === "$=" ? value.substr(value.length - check.length) === check : type === "|=" ? value === check || value.substr(0, check.length + 1) === check + "-" : false;
				},

				POS: function(elem, match, i, array) {
					var name = match[2],
						filter = Expr.setFilters[name];

					if (filter) {
						return filter(elem, i, match, array);
					}
				}
			}
		};

		var origPOS = Expr.match.POS,
			fescape = function(all, num) {
				return "\\" + (num - 0 + 1);
			};

		for (var type in Expr.match) {
			Expr.match[type] = new RegExp(Expr.match[type].source + (/(?![^\[]*\])(?![^\(]*\))/.source));
			Expr.leftMatch[type] = new RegExp(/(^(?:.|\r|\n)*?)/.source + Expr.match[type].source.replace(/\\(\d+)/g, fescape));
		}
		// Expose origPOS
		// "global" as in regardless of relation to brackets/parens
		Expr.match.globalPOS = origPOS;

		var makeArray = function(array, results) {
			array = Array.prototype.slice.call(array, 0);

			if (results) {
				results.push.apply(results, array);
				return results;
			}

			return array;
		};

		// Perform a simple check to determine if the browser is capable of
		// converting a NodeList to an array using builtin methods.
		// Also verifies that the returned array holds DOM nodes
		// (which is not the case in the Blackberry browser)
		try {
			Array.prototype.slice.call(docElem.children, 0)[0].nodeType;

			// Provide a fallback method if it does not work
		} catch (e) {
			makeArray = function(array, results) {
				var i = 0,
					ret = results || [];

				if (toString.call(array) === "[object Array]") {
					Array.prototype.push.apply(ret, array);

				} else {
					if (typeof array.length === "number") {
						for (var l = array.length; i < l; i++) {
							ret.push(array[i]);
						}

					} else {
						for (; array[i]; i++) {
							ret.push(array[i]);
						}
					}
				}

				return ret;
			};
		}

		var sortOrder, siblingCheck;

		if (docElem.compareDocumentPosition) {
			sortOrder = function(a, b) {
				if (a === b) {
					hasDuplicate = true;
					return 0;
				}

				if (!a.compareDocumentPosition || !b.compareDocumentPosition) {
					return a.compareDocumentPosition ? -1 : 1;
				}

				return a.compareDocumentPosition(b) & 4 ? -1 : 1;
			};

		} else {
			sortOrder = function(a, b) {
				// The nodes are identical, we can exit early
				if (a === b) {
					hasDuplicate = true;
					return 0;

					// Fallback to using sourceIndex (in IE) if it's available on both nodes
				} else if (a.sourceIndex && b.sourceIndex) {
					return a.sourceIndex - b.sourceIndex;
				}

				var al, bl, ap = [],
					bp = [],
					aup = a.parentNode,
					bup = b.parentNode,
					cur = aup;

				// If the nodes are siblings (or identical) we can do a quick check
				if (aup === bup) {
					return siblingCheck(a, b);

					// If no parents were found then the nodes are disconnected
				} else if (!aup) {
					return -1;

				} else if (!bup) {
					return 1;
				}

				// Otherwise they're somewhere else in the tree so we need
				// to build up a full list of the parentNodes for comparison
				while (cur) {
					ap.unshift(cur);
					cur = cur.parentNode;
				}

				cur = bup;

				while (cur) {
					bp.unshift(cur);
					cur = cur.parentNode;
				}

				al = ap.length;
				bl = bp.length;

				// Start walking down the tree looking for a discrepancy
				for (var i = 0; i < al && i < bl; i++) {
					if (ap[i] !== bp[i]) {
						return siblingCheck(ap[i], bp[i]);
					}
				}

				// We ended someplace up the tree so do a sibling check
				return i === al ? siblingCheck(a, bp[i], -1) : siblingCheck(ap[i], b, 1);
			};

			siblingCheck = function(a, b, ret) {
				if (a === b) {
					return ret;
				}

				var cur = a.nextSibling;

				while (cur) {
					if (cur === b) {
						return -1;
					}

					cur = cur.nextSibling;
				}

				return 1;
			};
		}

		// Check to see if the browser returns elements by name when
		// querying by getElementById (and provide a workaround)
		(function() {
			// We're going to inject a fake input element with a specified name
			var form = doc.createElement("div"),
				id = "script" + (new Date()).getTime(),
				root = docElem;

			form.innerHTML = "<a name='" + id + "'/>";

			// Inject it into the root element, check its status, and remove it quickly
			root.insertBefore(form, root.firstChild);

			// The workaround has to do additional checks after a getElementById
			// Which slows things down for other browsers (hence the branching)
			if (doc.getElementById(id)) {
				Expr.find.ID = function(match, context, isXML) {
					if (typeof context.getElementById !== "undefined" && !isXML) {
						var m = context.getElementById(match[1]);

						return m ? m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ? [m] : undefined : [];
					}
				};

				Expr.filter.ID = function(elem, match) {
					var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");

					return elem.nodeType === 1 && node && node.nodeValue === match;
				};
			}

			root.removeChild(form);

			// release memory in IE
			root = form = null;
		})();

		(function() {
			// Check to see if the browser returns only elements
			// when doing getElementsByTagName("*")
			// Create a fake element
			var div = doc.createElement("div");
			div.appendChild(doc.createComment(""));

			// Make sure no comments are found
			if (div.getElementsByTagName("*").length > 0) {
				Expr.find.TAG = function(match, context) {
					var results = context.getElementsByTagName(match[1]);

					// Filter out possible comments
					if (match[1] === "*") {
						var tmp = [];

						for (var i = 0; results[i]; i++) {
							if (results[i].nodeType === 1) {
								tmp.push(results[i]);
							}
						}

						results = tmp;
					}

					return results;
				};
			}

			// Check to see if an attribute returns normalized href attributes
			div.innerHTML = "<a href='#'></a>";

			if (div.firstChild && typeof div.firstChild.getAttribute !== "undefined" && div.firstChild.getAttribute("href") !== "#") {

				Expr.attrHandle.href = function(elem) {
					return elem.getAttribute("href", 2);
				};
			}

			// release memory in IE
			div = null;
		})();

		if (doc.querySelectorAll) {
			(function() {
				var oldSizzle = Sizzle,
					div = doc.createElement("div"),
					id = "__sizzle__";

				div.innerHTML = "<p class='TEST'></p>";

				// Safari can't handle uppercase or unicode characters when
				// in quirks mode.
				if (div.querySelectorAll && div.querySelectorAll(".TEST").length === 0) {
					return;
				}

				Sizzle = function(query, context, extra, seed) {
					context = context || doc;

					// Only use querySelectorAll on non-XML documents
					// (ID selectors don't work in non-HTML documents)
					if (!seed && !Sizzle.isXML(context)) {
						// See if we find a selector to speed up
						var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(query);

						if (match && (context.nodeType === 1 || context.nodeType === 9)) {
							// Speed-up: Sizzle("TAG")
							if (match[1]) {
								return makeArray(context.getElementsByTagName(query), extra);

								// Speed-up: Sizzle(".CLASS")
							} else if (match[2] && Expr.find.CLASS && context.getElementsByClassName) {
								return makeArray(context.getElementsByClassName(match[2]), extra);
							}
						}

						if (context.nodeType === 9) {
							// Speed-up: Sizzle("body")
							// The body element only exists once, optimize finding it
							if (query === "body" && context.body) {
								return makeArray([context.body], extra);

								// Speed-up: Sizzle("#ID")
							} else if (match && match[3]) {
								var elem = context.getElementById(match[3]);

								// Check parentNode to catch when Blackberry 4.6 returns
								// nodes that are no longer in the doc #6963
								if (elem && elem.parentNode) {
									// Handle the case where IE and Opera return items
									// by name instead of ID
									if (elem.id === match[3]) {
										return makeArray([elem], extra);
									}

								} else {
									return makeArray([], extra);
								}
							}

							try {
								return makeArray(context.querySelectorAll(query), extra);
							} catch (qsaError) {}

							// qSA works strangely on Element-rooted queries
							// We can work around this by specifying an extra ID on the root
							// and working up from there (Thanks to Andrew Dupont for the technique)
							// IE 8 doesn't work on object elements
						} else if (context.nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
							var oldContext = context,
								old = context.getAttribute("id"),
								nid = old || id,
								hasParent = context.parentNode,
								relativeHierarchySelector = /^\s*[+~]/.test(query);

							if (!old) {
								context.setAttribute("id", nid);
							} else {
								nid = nid.replace(/'/g, "\\$&");
							}
							if (relativeHierarchySelector && hasParent) {
								context = context.parentNode;
							}

							try {
								if (!relativeHierarchySelector || hasParent) {
									return makeArray(context.querySelectorAll("[id='" + nid + "'] " + query), extra);
								}

							} catch (pseudoError) {} finally {
								if (!old) {
									oldContext.removeAttribute("id");
								}
							}
						}
					}

					return oldSizzle(query, context, extra, seed);
				};

				for (var prop in oldSizzle) {
					Sizzle[prop] = oldSizzle[prop];
				}

				// release memory in IE
				div = null;
			})();
		}

		(function() {
			var html = docElem,
				matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector;

			if (matches) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9 fails this)
				var disconnectedMatch = !matches.call(doc.createElement("div"), "div"),
					pseudoWorks = false;

				try {
					// This should fail with an exception
					// Gecko does not error, returns false instead
					matches.call(docElem, "[test!='']:sizzle");

				} catch (pseudoError) {
					pseudoWorks = true;
				}

				Sizzle.matchesSelector = function(node, expr) {
					// Make sure that attribute selectors are quoted
					expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");

					if (!Sizzle.isXML(node)) {
						try {
							if (pseudoWorks || !Expr.match.PSEUDO.test(expr) && !/!=/.test(expr)) {
								var ret = matches.call(node, expr);

								// IE 9's matchesSelector returns false on disconnected nodes
								if (ret || !disconnectedMatch ||
								// As well, disconnected nodes are said to be in a document
								// fragment in IE 9, so check for that
								node.doc && node.doc.nodeType !== 11) {
									return ret;
								}
							}
						} catch (e) {}
					}

					return Sizzle(expr, null, null, [node]).length > 0;
				};
			}
		})();

		(function() {
			var div = doc.createElement("div");

			div.innerHTML = "<div class='test e'></div><div class='test'></div>";

			// Opera can't find a second classname (in 9.6)
			// Also, make sure that getElementsByClassName actually exists
			if (!div.getElementsByClassName || div.getElementsByClassName("e").length === 0) {
				return;
			}

			// Safari caches class attributes, doesn't catch changes (in 3.2)
			div.lastChild.className = "e";

			if (div.getElementsByClassName("e").length === 1) {
				return;
			}

			Expr.order.splice(1, 0, "CLASS");
			Expr.find.CLASS = function(match, context, isXML) {
				if (typeof context.getElementsByClassName !== "undefined" && !isXML) {
					return context.getElementsByClassName(match[1]);
				}
			};

			// release memory in IE
			div = null;
		})();

		function dirNodeCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
			for (var i = 0, l = checkSet.length; i < l; i++) {
				var elem = checkSet[i];

				if (elem) {
					var match = false;

					elem = elem[dir];

					while (elem) {
						if (elem[expando] === doneName) {
							match = checkSet[elem.sizset];
							break;
						}

						if (elem.nodeType === 1 && !isXML) {
							elem[expando] = doneName;
							elem.sizset = i;
						}

						if (elem.nodeName.toLowerCase() === cur) {
							match = elem;
							break;
						}

						elem = elem[dir];
					}

					checkSet[i] = match;
				}
			}
		}

		function dirCheck(dir, cur, doneName, checkSet, nodeCheck, isXML) {
			for (var i = 0, l = checkSet.length; i < l; i++) {
				var elem = checkSet[i];

				if (elem) {
					var match = false;

					elem = elem[dir];

					while (elem) {
						if (elem[expando] === doneName) {
							match = checkSet[elem.sizset];
							break;
						}

						if (elem.nodeType === 1) {
							if (!isXML) {
								elem[expando] = doneName;
								elem.sizset = i;
							}

							if (typeof cur !== "string") {
								if (elem === cur) {
									match = true;
									break;
								}

							} else if (Sizzle.filter(cur, [elem]).length > 0) {
								match = elem;
								break;
							}
						}

						elem = elem[dir];
					}

					checkSet[i] = match;
				}
			}
		}
		Sizzle.contains = jlpm.contains;
		/*if (docElem.contains) {
			Sizzle.contains = function(a, b) {
				return a !== b && (a.contains ? a.contains(b) : true);
			};

		} else if (docElem.compareDocumentPosition) {
			Sizzle.contains = function(a, b) {
				return !!(a.compareDocumentPosition(b) & 16);
			};

		} else {
			Sizzle.contains = function() {
				return false;
			};
		}*/

		Sizzle.isXML = function(elem) {
			// documentElement is verified for cases where it doesn't yet exist
			// (such as loading iframes in IE - #4833)
			var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;

			return documentElement ? documentElement.nodeName !== "HTML" : false;
		};

		var posProcess = function(selector, context, seed) {
			var match, tmpSet = [],
				later = "",
				root = context.nodeType ? [context] : context;

			// Position selectors must be done after the filter
			// And so must :not(positional) so we move all PSEUDOs to the end
			while ((match = Expr.match.PSEUDO.exec(selector))) {
				later += match[0];
				selector = selector.replace(Expr.match.PSEUDO, "");
			}

			selector = Expr.relative[selector] ? selector + "*" : selector;

			for (var i = 0, l = root.length; i < l; i++) {
				Sizzle(selector, root[i], tmpSet, seed);
			}

			return Sizzle.filter(later, tmpSet);
		};

		// EXPOSE
		jlpm.find = Sizzle;
		jlpm.isXMLDoc = Sizzle.isXML;
		//jlpm.oldFilter = Sizzle.filter;
		//jlpm.oldunique = Sizzle.uniqueSort;
		//jlpm.expr = jlpm.fn.expr = Sizzle.selectors;
		//jlpm.expr[":"] = aaa.expr.filters;
		//jlpm.text = Sizzle.getText;
		//jlpm.contains = Sizzle.contains;
		//window.Sizzle = Sizzle;
	}

	if (doc.execCommand) try {
		doc.execCommand("BackgroundImageCache", false, true);
	} catch (e){}


	win.jlpm = win._$ = jlpm;

})(window)
