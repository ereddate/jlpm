;
(function(win) {
  if (win.CollectGarbage) CollectGarbage();
	var doc = win.document,
		_toString = Object.prototype.toString,
		docElem = doc.documentElement,
		hasOwn = Object.prototype.hasOwnProperty,
		emptyFn = function() {},
		_trim = "".trim,
		_loads = win.jlpmLoads,
		DOMContentLoaded = function() {
			if (doc.addEventListener) {
				doc.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
			} else if (doc.readyState === "complete") {
				doc.detachEvent("onreadystatechange", DOMContentLoaded);
			}
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
		},
		isParentObject = function(v) {
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
		each = function(obj, callback, args) {
			if (typeof obj == "undefined") return false;
			if (obj) {
				var value, i = 0,
					length = obj.length || 0,
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
			}
		},
		isFunction = function(v) {
			return (v != null) ? typeof v === "function" && typeof v.call != 'undefined' && _toString.call(v) === '[object Function]' : false;
		},
		loads = function(selector, content) {
			return new loads.fn.init(selector, content);
		};

	var orderExec = function() {
		return new orderExec.fn.init(arguments);
	};
	orderExec.fn = orderExec.prototype = {
		constructor: orderExec,
		init: function() {
			var options = arguments || {};
			this.orderExecSto = undefined;
			this.time = 400;
			this._callbacks = [];
			this._callbackLen = 0;
			this._callbacksFireNum = 0;
			if (options) loads.extend(this, options);
			return this;
		},
		_add: function(callback) {
			callback = callback ? callback : function() {};
			this._callbacks.push(function(fn) {
				callback();
				fn();
			});
			this._callbackLen += 1;
			return this;
		},
		add: function() {
			return this._add.apply(this, arguments);
		},
		sto: function(callback, time) {
			clearTimeout(this.orderExecSto);
			this.orderExecSto = setTimeout(callback, time);
		},
		defer: function(callback, time) {
			if (loads.isFunction(callback)) {
				time = time ? time : 600;
			}
			if (callback == undefined || loads.isNumeric(callback)) {
				time = callback ? callback : 600;
			}
			this._callbacks.splice(this._callbackLen, 0, function() {
				var self = this;
				if (loads.isFunction(callback)) {
					callback();
				}
				self.sto(function() {
					self.nextto((self._callbacksFireNum + 1 > self._callbackLen ? 0 : self._callbacksFireNum + 1), self.orderExecfnNext);
				}, time);
			});
			this._callbackLen += 1;
			return this;
		},
		orderExecfnNext: function(i) {
			if (i + 1 < this._callbackLen) {
				this.nextto(i + 1, this.orderExecfnNext);
			} else {
				this.clear();
			}
		},
		fire: function() {
			if (this._callbackLen > 0) {
				this.nextto(0, this.orderExecfnNext);
			}
			return this;
		},
		nextto: function(i, callback) {
			var self = this;
			this._callbacksFireNum = i;
			self.sto(function() {
				if (self._callbackLen > 0) {
					if (self._callbacks[i]) {
						self._callbacks[i].call(self, function() {
							callback.call(self, i);
						});
					}
				}
			}, i == 0 ? 0 : self.time);
		},
		clear: function() {
			this._callbacks = loads.dispose(this._callbacks);
			this._callbackLen = 0;
			this._callbacksFireNum = 0;
			return this;
		}
	};
	orderExec.fn.init.prototype = orderExec.fn;

	Function.prototype.extend = function(key, value) {
		var target = key || {},
		isStr = typeof key == "string";
		if (isStr) {
			target = this;
			target[key] = {};
		}
		if (isParentObject(value)) {
			each(value, function(name, fn) {
				(isStr ? target[key] : target)[name] = fn;
			});
		} else if (isParentObject(key) && typeof value == "undefined") {
			target = this;
			each(key, function(name, fn) {
				target[name] = fn;
			});
		} else if (isStr || (value && isArraylike(value))) {
			target[key] = value;
		} else {
			target = value;
		}
		return this;
	};
	Function.prototype.implement = function(key, value) {
		this.extend.call(this.prototype, key, value);
		return this;
	};
	String.prototype.capitalize = function() { //转换
		return this.charAt(0).toUpperCase() + this.substr(1);
	};
	String.prototype.exec = function(v) { //执行
		return loads.Exec(this, v);
	};
	loads.extend("data", {
		configs: {
			_count: 0
		}
	}).extend("aid", {
		rootSetup: function(elems, len, content) {
			var isMore = elems && elems != doc && elems != win && elems.length,
				len = typeof len != "undefined" ? len : isMore ? elems.length : 0,
				elems = isMore && len > 0 ? len > 1 ? elems : elems[0] : elems,
				options = {
					"0": elems,
					len: len,
					content: typeof content != "undefined" ? content : typeof elems.parentNode != "undefined" ? elems.parentNode : undefined
				};
			loads.each(options, function(name, value) {
				loads.extend(name, value);
				loads.implement(name, value);
			});
		},
		isReady: false,
		sMatch: {
			rtrim: /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
		},
		_exec: function(s, opts) { //如果用eval，在这里需要加引号，才能不影响YUI压缩。不过其它地方用了也会有问题，所以改成evalJs，
			return new Function("opts", s)(opts);
		}
	}).extend("ver", "0.1.201305131508").extend("isParentObject", isParentObject).extend("isNumeric", function(v) {
		return typeof v != "undefined" ? !isNaN(parseFloat(v)) && isFinite(v) || typeof v === "number" && _toString.call(v) === '[object Number]' : false;
	}).extend("random", function(mx, mi) { //随机数
		return (typeof mx != "undefined") ? Math.floor(Math.random() * (mx - (mi || 0) + 1) + (mi || 0)) : 0;
	}).extend("isFunction", isFunction).extend("each", function(obj, callback, args) {
		if (typeof obj == "undefined") return this;
		if (loads.isFunction(obj)) {
			callback = obj;
			obj = loads[0];
		}
		each(obj, callback, args);
		return this;
	}).extend("isArray", function(v) {
		return (v != null) ? (v.constructor == Array) ? true : false : false;
	}).extend("trim", (_trim && !_trim.call("\uFEFF\xA0") ? function(text) {
		return text == null ? "" : _trim.call(text);
	} : function(text) {
		return text == null ? "" : (text + "").replace(loads.aid.sMatch.rtrim, "");
	})).extend("dispose", function(obj, callback) { //数据清除
		var self = this,
			obj = obj ? obj : this[0];
		if (typeof obj == "undefined") return false;
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
	}).extend("Exec", function(data) { //替代eval
		if (typeof data != "undefined" && this.trim(data)) {
			var b = function(data) {
				try {
					return loads.aid._exec("return eval('('+opts+')')", data);
				} catch (e) {
					try {
						return win["eval"].call(win, data);
					} catch (e) {
						return data;
					}
				}
			}, c;
			c = b(data);
			b = null;
			return c;
		}
	}).each(["js", "css"], function(i, name) {
		loads.extend("load" + name.capitalize(), function(url, callback, options) {
			if (typeof url == "undefined") return this;
			var options = options || {},
			head = doc.getElementsByTagName('head')[0] || docElem,
				type = name,
				dom = doc.createElement(type == "js" ? 'script' : 'link'),
				done = false;
			options.id = options.id ? options.id : (type == "js" ? "jlpmLoads_loadCss" : "jlpmLoads_loadJs") + this.random(10000, 0);
			options.code = typeof SiteUri != "undefined" && typeof SiteUri.version != "undefined" ? "ver=" + SiteUri.version : "random=" + this.random(10000, 0);
			if (type == "js") {
				if ("async" in dom) {
					options.async = options["async"] || "";
				}
				options.src = url + (/\?/.test(url) ? "&" : "?") + options.code;
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
					href: url + (/\?/.test(url) ? "&" : "?") + options.code,
					id: options.id
				}, function(attr, value) {
					dom[attr] = value;
				});
			}
			head.insertBefore(dom, head.firstChild);
			return this;
		});
	}).extend("jsonp", function(url, callback, options) {
		if (typeof url == "undefined") return false;
		var options = options || {},
		funName = "jlpmLoads_loadJsonp" + this.random(10000, 0),
			callbackReplacer = options.callbackfun || /%callbackfun%/ig;
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
		return this.loadJs(url, false, options);
	}).extend("config", function(name, url, callback) {
		if (typeof name == "string") {
			loads.data.configs[name] = {
				url: url,
				callback: callback,
				status: false
			};
			loads.data.configs._count += 1;
		} else {
			loads.each(name, function(sname, value) {
				var url = typeof value == "string" ? value : (value.url || ""),
					callback = value.callback || undefined;
				loads.config(sname, url, callback);
			});
		}
		return this;
	}).extend("use", function(name, callback) {
		if (typeof name != "string") return this;
		loads.each(name.split(' '), function(i, sname){
			if (typeof jlpm[sname] == "undefined"){
				var root = loads.data.configs[sname];
				if (typeof root != "undefined" && !root["status"]) {
					if (typeof root.url == "string") {
						loads.extend(sname, function(callback) {
							loads.loadJs(root.url, callback);
							return this;
						});
					}
					root.status = true;
					if (root.callback) root.callback();
				}
			}
		});
		if (callback) callback();
		return this;
	}).extend("callbacks", function() { //回调列表
		return orderExec.call(this, arguments);
	}).extend("isEmptyObject", function(obj) {
		var obj = obj ? obj : this[0];
		for (var name in obj) {
			return false;
		}
		return true;
	}).extend("isEmpty", function(v) {
		return v == undefined || v == null || v == "" || (this.isArray(v) && v.length == 0) || (typeof v.length != "undefined" && v.length == 0) || (typeof v == "object" && this.isEmptyObject(v)) ? true : typeof v == "string" ? /^\s*$/.test(v) : false;
	}).extend("hasAttr", function(name, m) { //是否包含此属性
		var m = m ? m : this[0];
		return typeof name != "undefined" ? m ? hasOwn.call(m, name) ? true : false : false : false;
	}).extend("unload", function(callback) {
		var self = this,
			prxFn = function() {
				if (doc.addEventListener) {
					doc.removeEventListener("unload", prxFn, false);
				} else if (doc.readyState === "complete") {
					doc.detachEvent("onunload", prxFn);
				}
				loads.each("configs _callbacks".split(' '), function(i, name) {
					loads.dispose(loads.data[name]);
				});
				if (win.CollectGarbage) CollectGarbage();
				if (callback) callback.call();
			};
		if (doc.addEventListener) {
			win.addEventListener("unload", prxFn, false);
		} else {
			win.attachEvent("onunload", prxFn);
		}
		return this;
	});

	var navigator = win.navigator,
		ua = function() { //系统及浏览器识别
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
			var osA = os ? !loads.isArray(os) ? os : os[1] == "cros" ? "chromeos" : os[1] : "unknown" || "",
				ovA = os ? !loads.isArray(os) ? "0" : os[2] : "unknown" || "0",
				bsA = (browser ? typeof browser == "string" ? browser : loads.isArray(browser) && browser.length > 3 ? browser[1] == "msie" && browser[3] == "touch" ? "msiemobile" : /safari/.test(browser[2]) ? browser[2] + browser[1] : browser[1] + browser[3] : browser[1] == "firefox" && /mobile/.test(ua) ? "firefoxmobile" : browser[1] : "unknown") || "",
				bvA = (browser ? typeof browser == "string" ? bsA == "msie" && document.documentMode ? document.documentMode : "0" : loads.isArray(browser) && browser.length > 3 ? /safari/.test(browser[2]) ? browser[3] : browser[2] : browser[2] : "0") || "0",
				type = /win|mac|linux/.test(osA) && !/android|ipad|ipod|iphone/.test(osA) ? "desktop" : bsA == "msiemobile" || /ipad|blackberry_playbook|rimtablet|touchpad|kindle|chromeos/.test(osA) || (osA == "android" && parseFloat(ovA) > 2) || (osA == "android" && parseFloat(ovA) > 3 && ua.search(/mobile/i)) || (bsA == "firefox" && ua.match(/tablet/)) ? "tablet" : /wii|playstation/.test(osA) ? "unknown" : "phone";
			type = !/tablet|phone/.test(type) && bsA != "msiemobile" ? "desktop" : type;
			var root = loads.isArray(rroot) ? rroot[1] : "unknown",
				rootver = loads.isArray(rroot) ? rroot[2] : "0";
			var version = (function() {
				for (var i = 0, l = arguments.length; i < l; i++) {
					try {
						return arguments[i]();
					} catch (e) {}
				}
				return null;
			})(function() {
				var match = /(Shockwave Flash)[ \/]([\w.]+[ r\w]+)/.exec(navigator.plugins['Shockwave Flash'].description);
				return loads.isArray(match) ? match[2] : "0";
			}, function() {
				var match = /[WIN][ ]([\w\,]+)/.exec(new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version'));
				return loads.isArray(match) ? match[1] : "0";
			}) || undefined,
				isFlash = version != undefined ? true : false;
			return {
				os: osA,
				osver: ovA,
				browser: bsA,
				browserver: bvA,
				sysinfo: ua,
				mode: mode,
				root: root,
				rootver: rootver,
				type: type,
				flash: isFlash,
				flashver: version
			};
		},
		isQuerySelectorAll = false,
		testDiv = doc.createElement("div");
	testDiv.innerHTML = "<p class='TEST'></p>";
	isQuerySelectorAll = testDiv.querySelectorAll ? true : false;

	loads.extend("ua", ua).extend("multiload", function(options) {
		var loadloads = doc.getElementById("jlpmLoads_root"),
			config;
		if (typeof options == "string") {
			config = options;
		} else if (!loadloads) {
			var scripts = doc.getElementsByTagName('script');
			loadloads = scripts[scripts.length - 1];
			config = loadloads.getAttribute("data-files") || undefined;
		} else {
			config = loadloads.getAttribute("data-files") || undefined;
		}
		loads.each(typeof config != "undefined" ? config.split(' ') : [], function(i, url) {
			typeof url != "undefined" && /\.js/.test(url) ? loads.loadJs(url, undefined) : loads.loadCss(url, undefined);
		});
	});

	loads.implement("init", function(selector, content) {
		var elem;
		if (typeof selector != "undefined" && isFunction(selector)) {
			this.ready(selector);
			return this;
		} else if (typeof selector == "string") {
			if (isQuerySelectorAll && typeof selector == "string") {
				try {
					elem = (content && content.nodeType) ? content.querySelectorAll(selector) : doc.querySelectorAll(selector);
				} catch (e) {
					elem = undefined;
				};
				loads.aid.rootSetup(elem, undefined, content);
			} else if (typeof loads.Dom != "undefined") {
				try {
					elem = (content && content.nodeType) ? loads.Dom(selector, content) : loads.Dom(selector);
				} catch (e) {
					elem = undefined;
				}
				loads.aid.rootSetup(elem, undefined, content);
			}
		}
		return this;
	}).implement("noConflict", function(deep) {
		if (deep && win.jlpmLoads === loads) {
			win.jlpmLoads = _loads;
		}
		return loads;
	}).implement("ready", function(callback) {
		var self = this,
			ready = function() {
				if (doc.addEventListener) {
					doc.removeEventListener("load", ready, false);
				} else if (doc.readyState === "complete") {
					doc.detachEvent("onload", ready);
				}
				loads.aid.isReady = true;
				if (callback) callback.call();
			};
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
					if (!loads.aid.isReady) {
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
	});
	loads.fn = loads.prototype;
	loads.fn.init.prototype = loads.fn;

	win.jlpmLoads = loads;

	if (typeof define === "function" && define.amd && define.amd.loads) {
		define("loads", [], function() {
			return loads;
		});
	}

	if (loads.ua().browser == "msie") {
		try {
			doc.execCommand("BackgroundImageCache", false, true);
		} catch (e) {}
	}


	loads.unload();
	loads.multiload();

})(window);
