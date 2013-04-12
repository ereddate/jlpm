(function(win) {
	var class2type = {},
	_toString = Object.prototype.toString,
		_hasOwn = Object.prototype.hasOwnProperty,
		getType = function(obj) {
			if (obj == null) {
				return String(obj);
			}
			return typeof obj === "object" || typeof obj === "function" ? class2type[_toString.call(obj)] || "object" : typeof obj;
		},
		isWindow = function(obj) {
			return obj != null && obj == obj.window;
		},
		isArraylike = function(obj) {
			var length = obj.length,
				type = getType(obj);
			if (isWindow(obj)) {
				return false;
			}
			if (obj.nodeType === 1 && length) {
				return true;
			}
			return type === "array" || type !== "function" && (length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj);
		},
		animate = function(dom, sty, t, easing, fn) {
			var ani = function(dom, sty, t, easing, fn) {
				var elem = dom,
					f = j = 0,
					callback, _this = {},
					tween = function(t, b, c, d) {
						return _this.tweens[easing] ? _this.tweens[easing](t, b, c, d) : 0;
						//return -c * (t /= d) * (-Easing[easing](t)) + b;
					};
				_this.tweens = {
					linear: function(t, b, c, d) {
						return c * t / d + b;
					},
					quadIn: function(t, b, c, d) {
						return c * (t /= d) * t + b;
					},
					quadOut: function(t, b, c, d) {
						return -c * (t /= d) * (t - 2) + b;
					},
					quadInOut: function(t, b, c, d) {
						if ((t /= d / 2) < 1) return c / 2 * t * t + b;
						return -c / 2 * ((--t) * (t - 2) - 1) + b;
					},
					cubicIn: function(t, b, c, d) {
						return c * (t /= d) * t * t + b;
					},
					cubicOut: function(t, b, c, d) {
						return c * ((t = t / d - 1) * t * t + 1) + b;
					},
					cubicInOut: function(t, b, c, d) {
						if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
						return c / 2 * ((t -= 2) * t * t + 2) + b;
					},
					quartIn: function(t, b, c, d) {
						return c * (t /= d) * t * t * t + b;
					},
					quartOut: function(t, b, c, d) {
						return -c * ((t = t / d - 1) * t * t * t - 1) + b;
					},
					quartInOut: function(t, b, c, d) {
						if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
						return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
					},
					quintIn: function(t, b, c, d) {
						return c * (t /= d) * t * t * t * t + b;
					},
					quintOut: function(t, b, c, d) {
						return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
					},
					quintInOut: function(t, b, c, d) {
						if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
						return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
					},
					sineIn: function(t, b, c, d) {
						return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
					},
					sineOut: function(t, b, c, d) {
						return c * Math.sin(t / d * (Math.PI / 2)) + b;
					},
					sineInOut: function(t, b, c, d) {
						return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
					},
					expoIn: function(t, b, c, d) {
						return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
					},
					expoOut: function(t, b, c, d) {
						return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
					},
					expoInOut: function(t, b, c, d) {
						if (t == 0) return b;
						if (t == d) return b + c;
						if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
						return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
					},
					circIn: function(t, b, c, d) {
						return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
					},
					circOut: function(t, b, c, d) {
						return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
					},
					circInOut: function(t, b, c, d) {
						if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
						return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
					},
					elasticIn: function(t, b, c, d, a, p) {
						if (t == 0) return b;
						if ((t /= d) == 1) return b + c;
						if (!p) p = d * .3;
						if (!a || a < Math.abs(c)) {
							a = c;
							var s = p / 4;
						} else var s = p / (2 * Math.PI) * Math.asin(c / a);
						return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
					},
					elasticOut: function(t, b, c, d, a, p) {
						if (t == 0) return b;
						if ((t /= d) == 1) return b + c;
						if (!p) p = d * .3;
						if (!a || a < Math.abs(c)) {
							a = c;
							var s = p / 4;
						} else var s = p / (2 * Math.PI) * Math.asin(c / a);
						return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
					},
					elasticInOut: function(t, b, c, d, a, p) {
						if (t == 0) return b;
						if ((t /= d / 2) == 2) return b + c;
						if (!p) p = d * (.3 * 1.5);
						if (!a || a < Math.abs(c)) {
							a = c;
							var s = p / 4;
						} else var s = p / (2 * Math.PI) * Math.asin(c / a);
						if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
						return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
					},
					backIn: function(t, b, c, d, s) {
						if (s == undefined) s = 1.70158;
						return c * (t /= d) * t * ((s + 1) * t - s) + b;
					},
					backOut: function(t, b, c, d, s) {
						if (s == undefined) s = 1.70158;
						return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
					},
					backInOut: function(t, b, c, d, s) {
						if (s == undefined) s = 1.70158;
						if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
						return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
					},
					bounceIn: function(t, b, c, d) {
						return c - _this.tweens.linear(d - t, 0, c, d) + b;
					},
					bounceOut: function(t, b, c, d) {
						if ((t /= d) < (1 / 2.75)) {
							return c * (7.5625 * t * t) + b;
						} else if (t < (2 / 2.75)) {
							return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
						} else if (t < (2.5 / 2.75)) {
							return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
						} else {
							return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
						}
					},
					bounceInOut: function(t, b, c, d) {
						if (t < d / 2) return _this.tweens.linear(t * 2, 0, c, d) * .5 + b;
						else return _this.tweens.linear(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
					}
				};
				_this.fixStyle = {
					height: "Height",
					width: "Width",
					left: "Left",
					top: "Top",
					right: "Right",
					bottom: "Bottom"
				};
				_this.execution = function(key, val, t) {
					var s = (new Date()).getTime(),
						d = t || 500,
						b = key == "scrolltop" ? _$(elem).scrollTop() : parseFloat(_$(elem).css(key)) || parseFloat(_$(elem).css("offset" + _this.fixStyle[key])) || 0,
						c = val - b,
						a = function() {
							var t = (new Date()).getTime() - s;
							if (t > d) {
								t = d;
								if (/scroll/.test(key)) {
									/top/.test(key) ? _$(elem).scrollTop(tween(t, b, c, d) + "") : _$(elem).scrollLeft(tween(t, b, c, d) + "");
								} else {
									_$(elem).css(key, (/opacity|zoom|zIndex/.test(key) ? tween(t, b, c, d) + "" : tween(t, b, c, d) + "px"));
								}++f == j && callback && callback.apply(elem);
								return true;
							}
							if (/scroll/.test(key)) {
								/top/.test(key) ? _$(elem).scrollTop(tween(t, b, c, d) + "") : _$(elem).scrollLeft(tween(t, b, c, d) + "");
							} else {
								_$(elem).css(key, (/opacity|zoom|zIndex/.test(key) ? tween(t, b, c, d) + "" : tween(t, b, c, d) + "px"));
							}
							//console.log(elem+","+t+","+d+","+key+","+(/opacity|zoom|zIndex/.test(key) ? tween(t, b, c, d) : tween(t, b, c, d) + "px"))
							setTimeout(a, 10);
						};
					a();
				};
				_this.speed = {
					slow: 600,
					fast: 200,
					sDefault: 400
				};
				_this.go = function(sty, t, fn) {
					callback = fn;
					t = (t) ? (typeof t == "string") ? _this.speed[t] : t : _this.speed.sDefault;
					for (var i in sty) {
						j++;
						_this.execution(i, parseInt(sty[i]), t);
					}
				};
				return new _this.go(sty, t, fn);
			};
			return ani(_$(dom)[0], sty, t, easing, fn);
		},
		css3animate = function(self, obj, ani, callback) {
			var obj = getType(obj) == "string" ? _$(obj)[0] : obj,
				cssPrefix = _$().browser.webkit()||_$().browser.chrome()||_$().browser.chromemobile()||_$().browser.safari()||_$().browser.safarimobile() ? "Webkit" : _$().browser.firefox()||_$().browser.firefoxmobile() ? "Moz" : _$().browser.msie() ? "ms" : _$().browser.opera() ? "O" : "",
				translateOpen = !_$().browser.opera() ? "3d(" : "(",
				translateClose = !_$().browser.opera() ? ",0)" : ")",
				transitionEnd = cssPrefix.replace(/-/g, "") + "TransitionEnd",
				timeNum = parseFloat(ani["time"]);
		transitionEnd = (_$().browser.firefox() || _$().browser.firefoxmobile() || cssPrefix == "" || _$().browser.msie()) ? "transitionend" : transitionEnd;
			transitionEnd = transitionEnd.replace(transitionEnd.charAt(0), transitionEnd.charAt(0).toLowerCase());
			if (timeNum == 0) ani["time"] = 0;
			if (!ani["y"]) ani["y"] = 0;
			if (!ani["x"]) ani["x"] = 0;
			if (ani["previous"]) {
				var cssMatrix = (function(el) {
					var mat = _$().getStyles(el)[cssPrefix + 'Transform'].replace(/[^0-9\-.,]/g, '').split(',');
					return {
						a: +mat[0],
						b: +mat[1],
						c: +mat[2],
						d: +mat[3],
						e: +mat[4],
						f: +mat[5]
					}
				})(mat);
				ani.y += parseFloat(cssMatrix.f);
				ani.x += parseFloat(cssMatrix.e);
			}
			if (!ani["origin"]) ani.origin = "0% 0%";
			if (!ani["scale"]) ani.scale = "1";
			if (!ani["rotateY"]) ani.rotateY = "0";
			if (!ani["rotateX"]) ani.rotateX = "0";
			if (!ani["skewY"]) ani.skewY = "0";
			if (!ani["skewX"]) ani.skewX = "0";
			if (!ani["timingFunction"]) ani["timingFunction"] = "linear";
			//check for percent or numbers
			if (typeof(ani.x) == "number" || (ani.x.indexOf("%") == -1 && ani.x.toLowerCase().indexOf("px") == -1 && ani.x.toLowerCase().indexOf("deg") == -1)) ani.x = parseInt(ani.x) + "px";
			if (typeof(ani.y) == "number" || (ani.y.indexOf("%") == -1 && ani.y.toLowerCase().indexOf("px") == -1 && ani.y.toLowerCase().indexOf("deg") == -1)) ani.y = parseInt(ani.y) + "px";
			var trans = "translate" + translateOpen + (ani.x) + "," + (ani.y) + translateClose + " scale(" + parseFloat(ani.scale) + ") rotate(" + ani.rotateX + "deg)";
			if (!_$().browser.opera()) trans += " rotateY(" + ani.rotateY + "deg)";
			trans += " skew(" + ani.skewX + "deg," + ani.skewY + "deg)";
			obj.style[cssPrefix + "Transform"] = trans;
			obj.style[cssPrefix + "BackfaceVisibility"] = "hidden";
			var properties = cssPrefix + "Transform";
			if (ani["opacity"] !== undefined) {
				obj.style.opacity = ani["opacity"];
				properties += ", opacity";
			}
			if (ani["width"]) {
				obj.style.width = ani["width"];
				properties = "all";
			}
			if (ani["height"]) {
				obj.style.height = ani["height"];
				properties = "all";
			}
			obj.style[cssPrefix + "TransitionProperty"] = "all";
			if (("" + ani["time"]).indexOf("s") === -1) {
				var scale = 'ms';
				var time = ani["time"] + scale;
			} else if (ani["time"].indexOf("ms") !== -1) {
				var scale = 'ms';
				var time = ani["time"];
			} else {
				var scale = 's';
				var time = ani["time"] + scale;
			}
			obj.style[cssPrefix + "TransitionDuration"] = time;
			obj.style[cssPrefix + "TransitionTimingFunction"] = ani["timingFunction"];
			obj.style[cssPrefix + "TransformOrigin"] = ani.origin;
			self.sto(function() {
				if (callback) callback();
			}, 1000);
		},
		qani = function(obj, ani, time, easing, callback) {
			return new qani.prototype.init(obj, ani, time, easing, callback);
		},
		qaniFn = qani.prototype = {
			constructor: qani,
			browser: {},
			init: function(obj, ani, time, easing, callback) {
				this[0] = obj;
				this.qanilib = [];
				this.qaniSto = undefined;
				this.len = 0;
				this.qaniPnum = 0;
				this.time = 400;
				return this.append(obj, ani, time, easing, callback);
			},
			append: function(obj, ani, time, easing, callback) {
				if (ani != undefined) {
					if (getType(ani) == "function") {
						ani = ani();
					}
					if (time == undefined || getType(time) == "function") {
						time = "default";
						if (getType(time) == "function") callback = time;
					}
					if (easing == undefined || getType(easing) == "function") {
						easing = "linear";
						if (getType(easing) == "function") callback = easing;
					}
					callback = callback ? callback : function() {};
					time = time ? time : this.time;
					if (getType(ani) == "array") {
						var i = 0,
							len = ani.length;
						for (i = 0; i < len; i++) {
							var anivalue = ani[i];
							this.qanilib.push([obj, anivalue, function(self, obj, anivalue, fn) {
								animate(obj, anivalue, time, easing, function() {
									callback();
									fn();
								});
							}]);
							this.len += 1;
						}
					} else {
						this.el = _$(this[0])[0];
						var self = this;
						if (ani["addClass"]) {
							this.qanilib.push([obj, function(self, obj, fn) {
								if (ani["removeClass"]) {
									_$(obj).removeClass(ani["removeClass"]).addClass(ani["addClass"]);
								} else {
									_$(obj).addClass(ani["addClass"]);
								}
								self.sto(function() {
									callback();
									fn();
								}, 1000);
							}]);
						} else if (ani["time"]) {
							this.qanilib.push([obj, function(self, obj, fn) {
								css3animate(self, obj, ani, function() {
									callback();
									fn();
								});
							}]);
						} else {
							this.qanilib.push([obj, function(self, obj, fn) {
								animate(obj, ani, time, easing, function() {
									callback();
									fn();
								});
							}]);
						}
						this.len += 1;
					}
				}
				return this;
			},
			each: function(obj, callback, args) {
				var value, i = 0,
					length = obj.length,
					isArray = isArraylike(obj);
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
			custom: function(ani, time, easing, callback) {
				if (_$().isEmpty(ani)) return this;
				return this.append(this[0], ani, time, easing, callback);
			},
			show: function(callback) {
				if (this[0]) {
					var dom = this[0],
						width = 0,
						height = 0,
						value = _$(dom).attr("data-size");
					if (value) {
						width = value[0];
						height = value[1];
					} else {
						var size = _$(this[0]).size(),
							width = size.width;
						height = size.height;
					}
					_$(dom).css("overflow", "hidden");
					return this.defer(function() {
						if (_$(dom).css("display") && _$(dom).css("display") == "none") _$(dom).css("display", "block");
					}, 0).append(this[0], {
						width: width + "px",
						height: height + "px",
						opacity: 1
					}, "slow", "linear", function() {
						if (callback) callback(dom);
					}).play();
				}
				return this;
			},
			hide: function(callback) {
				var self = this;
				if (this[0]) {
					var dom = this[0],
						size = _$(this[0]).size(),
						width = size.width,
						height = size.height;
					_$(dom).css("overflow", "hidden");
					_$(dom).attr("data-size", [width, height]);
					return this.append(this[0], {
						width: 0,
						height: 0,
						opacity: 0
					}, "slow", "linear", function() {
						_$(dom).css("display", "none");
						if (callback) callback(dom);
					}).defer(400).play();
				}
				return this;
			},
			toggle: function(callback) {
				if (this[0]) {
					return this[(!this.isVisible(this[0]) ? "show" : "hide")]((callback ? callback : function() {}));
				}
				return this;
			},
			isElement: function(obj) {
				return !!obj && obj.nodeType == 1;
			},
			isVisible: function(el) {
				el = _$(el)[0];
				return !!((el.offsetHeight + el.offsetWidth) && _$(el).css('display') != 'none');
			},
			sto: function(callback, time) {
				clearTimeout(this.qaniSto);
				this.qaniSto = setTimeout(callback, time);
			},
			defer: function(callback, time) {
				if (getType(callback) == "function") {
					time = time ? time : 600;
				}
				if (callback == undefined || getType(callback) == "number") {
					time = callback ? callback : 600;
				}
				this.qanilib.splice(this.len, 0, [this[0], function(self) {
					if (getType(callback) == "function") {
						callback(this[0]);
					}
					self.sto(function() {
						self.goto((self.qaniPnum + 1 > self.len ? 0 : self.qaniPnum + 1), self.next);
					}, time);
				}]);
				this.len += 1;
				return this;
			},
			next: function(i, fn) {
				if (i + 1 < this.len) {
					this.goto(i + 1, this.next);
				} else {
					if (fn) fn();
				}
			},
			play: function() {
				if (this.len > 0) {
					this.goto(0, this.next);
				}
				return this;
			},
			goto: function(i, callback) {
				var self = this;
				self.qaniPnum = i;
				self.sto(function() {
					if (self.len > 0) {
						if (self.qanilib[i]) {
							if (self.qanilib[i][2] && getType(self.qanilib[i][2]) == "function") {
								self.qanilib[i][2](self, self.qanilib[i][0], self.qanilib[i][1], function(fn) {
									callback.call(self, i, fn);
								});
							} else {
								self.qanilib[i][1](self, self.qanilib[i][0], function(fn) {
									callback.call(self, i, fn);
								});
							}
						}
					}
				}, 0);
			},
			stop: function() {
				this.qanilib = [];
				this.len = 0;
				return this;
			}
		};
	qaniFn.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
		class2type["[object " + name + "]"] = name.toLowerCase();
	});

	qaniFn.init.prototype = qaniFn;
	win.$ = win.qani = qani;
})(window);
