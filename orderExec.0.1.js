//orderExec.0.1.js
;(function(win){
  var orderExec = function() {
			return new orderExec.fn.init();
		};
	orderExec.fn = orderExec.prototype = {
		constructor: orderExec,
		init: function() {
			this.orderExecfuns = [];
			this.orderExecSto = undefined;
			this.len = 0;
			this.orderExecfnNum = 0;
			this.time = 400;
			return this;
		},
		_add: function(callback) {
			callback = callback ? callback : function() {};
			this.orderExecfuns.push(function(fn) {
				callback();
				fn();
			});
			this.len += 1;
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
			if (_$().isFunction(callback)) {
				time = time ? time : 600;
			}
			if (callback == undefined || _$().isNumeric(callback)) {
				time = callback ? callback : 600;
			}
			this.orderExecfuns.splice(this.len, 0, function() {
				var self = this;
				if (_$().isFunction(callback)) {
					callback();
				}
				self.sto(function() {
					self.goto((self.orderExecfnNum + 1 > self.len ? 0 : self.orderExecfnNum + 1), self.orderExecfnNext);
				}, time);
			});
			this.len += 1;
			return this;
		},
		orderExecfnNext: function(i) {
			if (i + 1 < this.len) {
				this.goto(i + 1, this.orderExecfnNext);
			}else{
				this.clear();
			}
		},
		fire: function() {
			if (this.len > 0) {
				this.goto(0, this.orderExecfnNext);
			}
			return this;
		},
		goto: function(i, callback) {
			var self = this;
			self.orderExecfnNum = i;
			self.sto(function() {
				if (self.len > 0) {
					if (self.orderExecfuns[i]) {
						self.orderExecfuns[i].call(self, function() {
							callback.call(self, i);
						});
					}
				}
			}, i==0 ? 0 : self.time);
		},
		clear: function() {
			this.orderExecfuns = [];
			this.len = 0;
			return this;
		}
	};

	orderExec.fn.init.prototype = orderExec.fn;

	win.orderExec = orderExec;

})(window)
