// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module;

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({16:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  // console.log(classes);
};
},{}],19:[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error;
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;

},{}],17:[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;

},{"./bundle-url":19}],15:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":17}],20:[function(require,module,exports) {
module.exports="/dist/d5486b004ae630e9033da95c7335dedc.png";
},{}],21:[function(require,module,exports) {
module.exports="/dist/6b69dc32069d4ba6f3f2b938a076d28b.png";
},{}],23:[function(require,module,exports) {
module.exports="/dist/ca36b3a3d1ddefe3c90ed288006da41f.png";
},{}],22:[function(require,module,exports) {
module.exports="/dist/6373e9e3eab2032c8a342e10d8e3dd57.png";
},{}],25:[function(require,module,exports) {
module.exports="/dist/cb132b50fba5a89930aa062b87821e23.png";
},{}],26:[function(require,module,exports) {
module.exports="/dist/abe93959a3143832cec63bf93e8147c9.png";
},{}],24:[function(require,module,exports) {
module.exports="/dist/6114ab2d7560c3bb6ff8206480ac8862.png";
},{}],32:[function(require,module,exports) {
module.exports="/dist/9708865273bb0b1ae76235fef04f0e33.png";
},{}],27:[function(require,module,exports) {
module.exports="/dist/0012121e3622d05c4a81c8890d9cd7be.png";
},{}],28:[function(require,module,exports) {
module.exports="/dist/29731a76c1de99013b02c57f9d6e6d56.png";
},{}],29:[function(require,module,exports) {
module.exports="/dist/2be598142ccdda87cfa219349ba7ef15.png";
},{}],30:[function(require,module,exports) {
module.exports="/dist/fdb4c5e8862ee0fcf19cc2f56dec1cc0.png";
},{}],31:[function(require,module,exports) {
module.exports="/dist/66b5c2ea91c2c8bad27c204b63ab0a58.png";
},{}],14:[function(require,module,exports) {
"use strict";

var _main = require("./main");

var _main2 = _interopRequireDefault(_main);

require("../css/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by yangyang.xu on 2018/1/15.
 */
(0, _main2.default)();
myLib.remAdjust(20, 360);
var vue = new Vue({
  el: '#content',
  data: {
    //data
    state: {
      showLoadingPage: true
    },
    matchSuccess: false, //匹配成功
    turnToWho: 0, //轮到谁选择 0表示是自己 1表示是对手
    progressWidth: 0,
    showPoker: false,
    countDown: 10,
    countDownTimer: null,
    //对手的信息
    opponent: {
      'headImg': './images/danni.jpeg',
      'nickname': '丹妮',
      'coinNum': 2000,
      'selected': false //用来标识现在轮到谁猜
    },
    //我的信息
    self: {
      'headImg': 'images/yangyang.jpeg',
      'nickname': '小娜',
      'coinNum': 1000,
      'selected': true
    },
    //每次发的两张牌的信息
    pokerLeftIndex: 0,
    pokerRightIndex: 12,
    pokerGroup: [require('../images/1.png'), require('../images/2.png'), require('../images/3.png'), require('../images/4.png'), require('../images/5.png'), require('../images/6.png'), require('../images/7.png'), require('../images/8.png'), require('../images/9.png'), require('../images/10.png'), require('../images/11.png'), require('../images/12.png'), require('../images/13.png')]
  },
  mounted: function mounted() {
    var _this = this;

    document.getElementById('content').style.display = 'block';
    // 匹配阶段
    setTimeout(function () {
      _this.progressWidth = '100%';
      setTimeout(function () {
        _this.matchSuccess = true;
      }, 500);
    }, 500);
  },
  methods: {
    afterEnterVsScale: function afterEnterVsScale() {
      var _this2 = this;

      setTimeout(function () {
        // 动画结束 匹配成功开始游戏
        _this2.startPlay();
        _this2.state.showLoadingPage = false;
      }, 500);
    },
    startPlay: function startPlay() {
      var _this3 = this;

      // step1 发牌
      this.showPoker = true;
      this.pokerGroup.left = Math.floor(Math.random() * 13 + 1);
      this.pokerGroup.right = Math.floor(Math.random() * 13 + 1);
      while (this.pokerGroup.right === this.pokerGroup.left) {
        this.pokerGroup.right = Math.floor(Math.random() * 13 + 1);
      }
      setTimeout(function () {
        // step2 确定谁先猜
        _this3.turnToWho = Math.random() >= 0.5 ? 0 : 1;
        if (_this3.turnToWho) {
          _this3.opponent.selected = true;
          _this3.self.selected = false;
        }
        // step3 启动倒计时
        _this3.startCountDown();
      }, 500);
    },
    startCountDown: function startCountDown() {
      var _this4 = this;

      this.countDownTimer = setInterval(function () {
        _this4.countDown--;
        if (!_this4.countDown) clearInterval(_this4.countDownTimer);
      }, 1000);
    },
    selectLarge: function selectLarge() {
      if (self.selected) {}
    },
    selectSmaller: function selectSmaller() {
      if (self.selected) {}
    }
  }
});
},{"./main":16,"../css/index.scss":15,"../images/1.png":20,"../images/2.png":21,"../images/3.png":23,"../images/4.png":22,"../images/5.png":25,"../images/6.png":26,"../images/7.png":24,"../images/8.png":32,"../images/9.png":27,"../images/10.png":28,"../images/11.png":29,"../images/12.png":30,"../images/13.png":31}],0:[function(require,module,exports) {
var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent && typeof WebSocket !== 'undefined') {
  var ws = new WebSocket('ws://' + window.location.hostname + ':52434/');
  ws.onmessage = function(event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        window.location.reload();
      }
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id)
  });
}
},{}]},{},[0,14])