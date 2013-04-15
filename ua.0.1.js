//ua.0.1.js
;(function(win) {
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
				rfirefox = /(firefox)[ \/]([\w.]+)/,
				rsafari = /(safari)[ \/]([\w.]+)/,
				ropera = /(opera)[ \/]([\w.]+)/,
				rmaxthon = /(maxthon)[ \/]([\w.]+)/,
				rqq = /(qqbrowser)[ \/]([\w.]+)/,
				rbaidu = /(baidubrowser)[ \/]([\w.]+)/,
				rwebosbrowser = /((wosbrowser))([\\w\\._]+)/,
				os = p.match(/ipad|iphone|ipod/i) ? ripad.exec(ua) : ua.match(/bada/i) ? rbada.exec(ua) : ua.match(/rim tablet os/i) ? "rimtablet" : ua.match(/nokian/i) ? "nokian" : (ua.match(/wii/i)) ? "Wii" : (ua.match(/playstation/i)) ? "playstation" : ua.match(/blackberry/) ? ua.match(/safari\/536/) || /bb10/.test(ua) ? rbb10.exec(ua) : rblackberry.exec(ua) : ua.match(/playbook/) ? "blackberry_playbook" : (ua.match(/fennec/i)) ? "fennec" : (ua.match(/(webos|hpwos)[\s\/]([\d.]+)/)) ? "webos" : (ua.match(/touchpad/) && ua.match(/(webos|hpwos)[\s\/]([\d.]+)/)) ? "touchpad" : p.match(/win/i) ? "win" : p.match(/mac/i) ? "mac" : p.match(/x11/i) ? "x11" : p.match(/linux/i) ? ua.match(/android/i) || ua.match(/silk-accelerated/) ? ua.match(/silk/i) ? rsilk.exec(ua) : ua.match(/kindle fire/) ? "silk" : ua.match(/kindle/i) ? rkindle.exec(ua) : randroid.exec(ua) : /cros/.test(ua) ? rchromeos.exec(ua) : "linux" : false || false,
				browser = rsafarimobile.exec(ua) || rchromemobile.exec(ua) || rwebosbrowser.exec(ua) || rmsie.exec(ua) || rchrome.exec(ua) || (ua.match(/android/i) || ua.match(/silk-accelerated/) ? rwebkit.exec(os[0]) : rsafari.exec(ua)) || rfirefox.exec(ua) || ropera.exec(ua) || rwebkit.exec(os[0]) || false,
				mode = ((p == "win32" && browser[1] == "msie") || (os[1] == "linux" && ua.indexOf("_64") < 0)) ? "32" : ((p == "win64" && browser[1] == "msie") || (os[1] == "linux" && ua.indexOf("_64") > -1)) ? "64" : "other";
				mode = mode == "other" ? p.replace("win","") : mode;
			if (browser != false || browser != null) {
				browser = ua.match(/maxthon/) ? rmaxthon.exec(ua) : ua.match(/qqbrowser/) ? rqq.exec(ua) : /uc/.test(ua) && /linux/.test(ua) && /mobile/.test(ua) ? "uc" : /lbbrowser/.test(ua) ? "lbbrowser" : /baidubrowser/.test(ua) ? rbaidu.exec(ua) : browser;
			}
			var osA = os ? !_$().isArray(os) ? os : os[1] == "cros" ? "chromeos" : os[1] : undefined || "",
				ovA = os ? !_$().isArray(os) ? "0" : os[2] : undefined || "0",
				bsA = (browser ? _$().isString(browser) ? browser : _$().isArray(browser) && browser.length > 3 ? /safari/.test(browser[2]) ? browser[2] + browser[1] : browser[1] + browser[3] : browser[1] == "firefox" && /mobile/.test(ua) ? "firefoxmobile" : browser[1] : undefined) || "",
				bvA = (browser ? _$().isString(browser) ? "0" : _$().isArray(browser) && browser.length > 3 ? /safari/.test(browser[2]) ? browser[3] : browser[2] : browser[2] : undefined) || "0",
				type = /win|mac|linux/.test(osA) && !/android|ipad|ipod|iphone/.test(osA) ? "desktop" : /ipad|blackberry_playbook|rimtablet|touchpad|kindle|chromeos/.test(osA) || (osA == "android" && parseFloat(ovA) > 2) || (osA == "android" && parseFloat(ovA) > 3 && ua.search(/mobile/i)) || (bsA == "firefox" && ua.match(/tablet/)) ? "tablet" : /wii|playstation/.test(osA) ? "other" : "phone";
			return {
				os: osA,
				osver: ovA,
				browser: bsA,
				browserver: bvA,
				sysinfo: ua,
				mode: mode,
				type: type
			};
		};

	win.jlpmUa = ua;

})(window)
