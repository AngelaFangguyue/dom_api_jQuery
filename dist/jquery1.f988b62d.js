// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"jquery1.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

window.jQuery = function (se) {
  //新建一个创建元素的函数createElement
  function createElement(stri) {
    var tmp = document.createElement("template");
    tmp.innerHTML = stri.trim(); //去除空格

    return tmp.content.firstChild; //获取创建的子元素
  }

  var elements;

  if (typeof se === "string") {
    if (se[0] === "<") {
      elements = [createElement(se)]; //这里涉及到了函数声明提前
    } else {
      elements = document.querySelectorAll(se);
    }
  } else if (se instanceof Array) {
    elements = se;
  } /////////////////////////////////////
  //不再使用api了。直接返回对象
  // let api = {
  //   //1:each函数遍历循环elements，这里使用到了闭包
  //   // each(fn){//
  //   //   for(let q=0;q<elements.length;q++){
  //   //     console.log(elements[q]);
  //   //     fn.call(null,elements[q],q);
  //   //   }
  //   // },
  //   //添加class，这里1用到了闭包，使用到了外面的elements变量
  //   addClass(clsn) {
  //     for (let q = 0; q < elements.length; q++) {
  //       elements[q].classList.add(clsn);
  //     }
  //     //this.each((x)=>{x.classList.add(clsn)});//先不做测试
  //     //console.log("addClass内部，this", this === api);//结果为true
  //     //return api;//注意这里的api可以换做this
  //     return this;
  //   }
  // };
  // return api;
  /////////////////////////////////


  return {
    jquery: true,
    elements: elements,
    oldApi: se.oldApi,
    get: function get(x) {
      return elements[x];
    },
    ////////////////////////
    addClass: function addClass(clsn) {
      for (var q = 0; q < elements.length; q++) {
        elements[q].classList.add(clsn);
      }

      return this;
    },
    //find函数
    find: function find(sel) {
      var res = [];

      for (var w = 0; w < elements.length; w++) {
        var res1 = Array.from(elements[w].querySelectorAll(sel));
        res = res.concat(res1);
      } //return res; //在这里不应该return res；res只是获取到的元素组成的数组，所以要思考返回什么，而且注意返回了之后，若想回到上一级,去操作上一级的elements，要怎么做？


      res.oldApi = this; //这里的this就是当前的api对象，现在将对象放在了数组res中，那么如何在新的对象中获取呢？下面返回的是新的api对象。在新对象中获取旧对象的方法：继续定义一个oldApi的属性，该属性对应了res.oldApi,其实不是res.api，而是se.api。因为下面是将res作为jQuery参数se传递进去的。而且这里面还需要对elements的获取重新进行判断选择。即传递的是个选择器，就直接在body中查找；传递的是个数组，elements就还是这个元素组成的数组。

      return jQuery(res);
    },
    //////////////////////////////////
    end: function end() {
      return this.oldApi;
    },
    //////////////////////////////////
    parent: function parent() {
      var res = [];
      this.each(function (x) {
        var res1 = x.parentNode;

        if (res.indexOf(res1) === -1) {
          res.push(res1);
        }
      });
      res.oldApi = this;
      return jQuery(res); //这里没有添加上一级对象，返回的就是操作当前查找到的父元素数组的对象
    },
    childs: function childs() {
      var res = [];
      this.each(function (x) {
        var res1 = x.children;
        res.push.apply(res, _toConsumableArray(res1));
      });
      res.oldApi = this;
      return jQuery(res);
    },
    ///////////////////////////////////
    append: function append(child) {
      var _this = this;

      if (child instanceof Element) {
        // this.each((x)=>{
        //   x.appendChild(child);
        // });
        //这里默认只有一个父元素，即elements里只有一个元素
        this.get(0).appendChild(child);
      } else if (child instanceof HTMLCollection) {
        // this.each((x)=>{
        //   //x.appendChild(child);
        //   for(let i=0;i<child.length;i++){
        //     x.appendChild(child[i]);
        //   }
        // });
        for (var i = 0; i < child.length; i++) {
          this.get(0).appendChild(child[i]);
        }
      } else if (child.jquery === true) {
        child.each(function (x) {
          _this.get(0).appendChild(x);
        });
      }

      return this;
    },
    appendTo: function appendTo(node) {
      //node只有一个元素
      if (node instanceof Element) {
        this.each(function (x) {
          node.appendChild(x);
        });
      } else if (node.jquery === true) {
        console.log("node.jquery === true");
        console.log(node.get(0));
        this.each(function (x) {
          node.get(0).appendChild(x);
        });
      }

      return this;
    },
    //////////////////////////////////
    //each函数是方便遍历循环当前的elements
    each: function each(fn) {
      for (var y = 0; y < elements.length; y++) {
        fn.call(null, elements[y], y);
      }

      return this;
    },
    //////////////////////////////////
    //print方法是方便打出当前对象的elements
    print: function print() {
      for (var e = 0; e < elements.length; e++) {
        console.log("第" + e + "个elements:", elements[e]);
      }

      return this; //参照addClass,return this返回的就是当前操作的对象
    }
  };
}; //定义一个jQuery函数，也就是一个对象，因为函数就是对象嘛。传递一个选择器，获取到这个选择器对应的元素数组；然后返回一个对象，这个对象提供了一些可以操作获取到的元素数组的api，也就是方法，函数。


window.$ = window.jQuery;
},{}],"C:/Users/18234/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49778" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
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

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
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

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/18234/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js","jquery1.js"], null)
//# sourceMappingURL=/jquery1.f988b62d.js.map