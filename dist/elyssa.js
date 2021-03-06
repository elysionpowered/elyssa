(function() {
  define('elyssa/app', function() {
    'use strict';
    var App;
    return App = (function() {
      function App() {}

      return App;

    })();
  });

}).call(this);

(function() {
  define('elyssa/camera', function() {
    var Camera;
    return Camera = (function() {
      function Camera() {}

      return Camera;

    })();
  });

}).call(this);

(function() {
  define('elyssa/behaviour', function() {
    'use strict';
    var Behaviour;
    return Behaviour = (function() {
      function Behaviour() {}

      Behaviour.prototype.update = function(dt) {};

      return Behaviour;

    })();
  });

}).call(this);

(function() {
  define('elyssa/entity', function() {
    'use strict';
    var Entity;
    return Entity = (function() {
      var functionList;

      functionList = {};

      function Entity(name) {
        this.name = name != null ? name : this.constructor.name;
        this.components = {};
        functionList = {};
      }

      Entity.prototype.add = function(component) {
        var componentInstance, componentName, key, value;
        if (!component) {
          return this;
        }
        componentName = component.name;
        componentInstance = this.components[componentName];
        if (!componentInstance) {
          componentInstance = component;
          if (typeof componentInstance.register === "function") {
            componentInstance.register();
          }
          for (key in componentInstance) {
            value = componentInstance[key];
            if (key === 'constructor') {
              continue;
            }
            if (typeof value === 'function') {
              if (!functionList[key]) {
                functionList[key] = [];
              }
              functionList[key].push(value);
              if (!this[key]) {
                this[key] = (function(key) {
                  (function() {
                    var functions, _i, _len, _ref, _results;
                    _ref = functionList[key];
                    _results = [];
                    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                      functions = _ref[_i];
                      _results.push(functions.apply(this, arguments));
                    }
                    return _results;
                  });
                  return this;
                })(key);
              }
            }
          }
        }
        return this;
      };

      Entity.prototype.remove = function(componentName) {
        var _base;
        if (this.components[componentName]) {
          if (typeof (_base = this.components[componentName]).unregister === "function") {
            _base.unregister();
          }
          delete this.components[componentName];
        }
        return this;
      };

      Entity.prototype.render = function() {
        var key, value, _ref;
        _ref = this.components;
        for (key in _ref) {
          value = _ref[key];
          if (typeof value.render === "function") {
            value.render();
          }
        }
        return this;
      };

      Entity.prototype.update = function(dt) {
        var key, value, _ref;
        _ref = this.components;
        for (key in _ref) {
          value = _ref[key];
          if (typeof value.update === "function") {
            value.update(dt);
          }
        }
        return this;
      };

      return Entity;

    })();
  });

}).call(this);

(function() {
  var vendors;

  vendors = ['ms', 'moz', 'webkit', 'o'];

  define('requestanimationframe', ['root'], function(root) {
    var lastTime, requestAnimationFrame, x, _i, _len;
    requestAnimationFrame = root.requestAnimationFrame;
    if (!requestAnimationFrame) {
      for (_i = 0, _len = vendors.length; _i < _len; _i++) {
        x = vendors[_i];
        requestAnimationFrame = root["" + x + "RequestAnimationFrame"];
        if (requestAnimationFrame) {
          break;
        }
      }
    }
    if (!requestAnimationFrame) {
      lastTime = 0;
      requestAnimationFrame = function(callback, element) {
        var currTime, id, timeToCall, _ref;
        currTime = (_ref = performance.now()) != null ? _ref : Date.now();
        timeToCall = Math.max(0, 16 - (currTime - lastTime));
        id = root.setTimeout((function() {
          return callback(currTime + timeToCall);
        }), timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }
    return requestAnimationFrame;
  });

  define('cancelanimationframe', ['root'], function(root) {
    var cancelAnimationFrame, x, _i, _len;
    cancelAnimationFrame = root.cancelAnimationFrame;
    if (!cancelAnimationFrame) {
      for (_i = 0, _len = vendors.length; _i < _len; _i++) {
        x = vendors[_i];
        cancelAnimationFrame = root["" + x + "CancelAnimationFrame"] || root["" + x + "CancelRequestAnimationFrame"];
        if (cancelAnimationFrame) {
          break;
        }
      }
    }
    if (!cancelAnimationFrame) {
      cancelAnimationFrame = function(id) {
        return root.clearTimeout(id);
      };
    }
    return cancelAnimationFrame;
  });

}).call(this);

(function() {
  (function(root) {
    'use check';
    return root.ClassHelper = function(object) {
      var methods, objPrototype;
      objPrototype = object.prototype;
      methods = {
        property: function(prop) {
          var key, propObject, value;
          for (key in prop) {
            value = prop[key];
            propObject = {
              configurable: true,
              enumerable: false
            };
            if (value.get != null) {
              propObject.get = value.get;
            }
            if (value.set != null) {
              propObject.set = value.set;
            }
            Object.defineProperty(objPrototype, key, propObject);
          }
          return null;
        },
        staticProperty: function(prop) {
          var key, value;
          for (key in prop) {
            value = prop[key];
            Object.defineProperty(object, key, value);
          }
          return null;
        },
        get: function(prop) {
          var getter, name, obj;
          for (name in prop) {
            getter = prop[name];
            obj = {};
            obj[name] = {
              get: getter
            };
            methods.property(obj);
          }
          return null;
        },
        set: function(prop) {
          var name, obj, setter;
          for (name in prop) {
            setter = prop[name];
            obj = {};
            obj[name] = {
              set: setter
            };
            methods.property(obj);
          }
          return null;
        }
      };
      return methods;
    };
  })(typeof exports !== "undefined" && exports !== null ? exports : this);

}).call(this);

(function() {
  define('clone', function() {
    /*
      Cloning objects
    */

    var clone;
    return clone = function(obj) {
      var flags, key, newInstance;
      if (!((obj != null) || typeof obj !== 'object')) {
        return obj;
      }
      if (obj instanceof Date) {
        return new Date(obj.getTime());
      }
      if (obj instanceof RegExp) {
        flags = '';
        if (obj.global != null) {
          flags += 'g';
        }
        if (obj.ignoreCase != null) {
          flags += 'i';
        }
        if (obj.multiline != null) {
          flags += 'm';
        }
        if (obj.sticky != null) {
          flags += 'y';
        }
        return new RegExp(sobj.source, flags);
      }
      newInstance = new obj.constructor();
      for (key in obj) {
        newInstance[key] = window.clone(obj[key]);
      }
      return newInstance;
    };
  });

}).call(this);

(function() {
  (function(window) {
    'use strict';
    /*
      Console object fixes
    */

    var console, i, method, methods, noop, _i, _len, _results;
    noop = function() {};
    methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
    console = (window.console || (window.console = {}));
    _results = [];
    for (_i = 0, _len = methods.length; _i < _len; _i++) {
      i = methods[_i];
      method = methods[i];
      _results.push(console[method] || (console[method] = noop));
    }
    return _results;
  })(this);

}).call(this);

(function() {
  var __slice = [].slice;

  define('debounce', [root], function(root) {
    var debounce;
    return debounce = function(func, threshold, execAsap) {
      var timeout;
      if (threshold == null) {
        threshold = 100;
      }
      timeout = null;
      return function() {
        var args, delayed, obj;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        obj = this;
        delayed = function() {
          if (!execAsap) {
            func.apply(this, args);
          }
          return timeout = null;
        };
        if (timeout) {
          root.clearTimeout(timeout);
        } else {
          if (execAsap) {
            func.apply(obj, args);
          }
        }
        return timeout = root.setTimout(delayed, threshold);
      };
    };
  });

}).call(this);

(function() {
  define('deleteitem', function() {
    var deleteItem;
    return deleteItem = function(obj, item) {
      var i, key, newObject, num, _i, _len, _results;
      if (Array.isArray(obj)) {
        _results = [];
        for (num = _i = 0, _len = obj.length; _i < _len; num = ++_i) {
          i = obj[num];
          if (num !== item) {
            _results.push(i);
          }
        }
        return _results;
      } else {
        newObject = {};
        for (key in obj) {
          if (key !== item) {
            newObject[key] = obj[key];
          }
        }
        return newObject;
      }
    };
  });

}).call(this);

(function() {
  var __slice = [].slice;

  define('extend', function() {
    /*
     Extending objects
    */

    var extend;
    return extend = function() {
      var key, obj, objects, target, value, _i, _len;
      target = arguments[0], objects = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      for (_i = 0, _len = objects.length; _i < _len; _i++) {
        obj = objects[_i];
        for (key in obj) {
          value = obj[key];
          target[key] = value;
        }
      }
      return target;
    };
  });

}).call(this);

(function() {
  (function(String) {
    /*
      Provides a hashcode for strings
    */

    return String.prototype.hashCode = function() {
      var char, hash, i, _i, _len;
      hash = 0;
      if (this.length === 0) {
        return hash;
      }
      for (_i = 0, _len = this.length; _i < _len; _i++) {
        i = this[_i];
        char = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return hash;
    };
  })(String);

}).call(this);

(function() {
  define('elyssa', [], function() {
    if (!(typeof module !== "undefined" && module !== null ? module.exports : void 0)) {
      return window.Elyssa = {};
    }
  });

}).call(this);

(function() {
  (function(root) {
    return define('root', function() {
      return root;
    });
  })(this);

}).call(this);

(function() {
  var __slice = [].slice;

  define('elyssa/eventmap', ['root'], function() {
    'use strict';
    var EventMap;
    return EventMap = (function() {
      function EventMap(sender) {
        this.sender = sender;
        this.events = {};
        this.validEvents = [];
      }

      EventMap.prototype.serialize = function() {
        var err, result;
        try {
          result = JSON.stringify(this.events, function(key, value) {
            if (typeof value === 'function') {
              value = value.toString();
            }
            return value;
          });
        } catch (_error) {
          err = _error;
          console.error("Error while serializing eventmap: " + err);
        }
        return result;
      };

      EventMap.prototype.deserialize = function(string) {
        var err, events;
        try {
          events = JSON.parse(string, function(key, value) {
            if (value.indexOf('function') === 0) {
              value = new Function(value)();
            }
            return value;
          });
        } catch (_error) {
          err = _error;
          console.error("Error while deserializing eventmap: " + err);
          return false;
        }
        this.events = events;
        return true;
      };

      EventMap.prototype.on = function(eventName, eventFunction) {
        var eventDesc;
        if (!eventFunction) {
          return;
        }
        if (this.validEvents.length > 0) {
          if (this.validEvents.indexOf(eventName) === -1) {
            return;
          }
        }
        eventDesc = {
          event: eventFunction,
          id: -1,
          type: '',
          sender: this.sender
        };
        if (!this.events[eventName]) {
          this.events[eventName] = [eventDesc];
        } else {
          this.events[eventName].push(eventDesc);
        }
        return this;
      };

      EventMap.prototype.off = function(eventName) {
        var eventType;
        if (!eventName) {
          return;
        }
        eventType = this.events[eventName].type;
        if (eventType === 'once' || eventType === 'repeat') {
          if (eventType === 'repeat') {
            root.clearInterval(this.events[eventName].id);
          }
          if (eventType === 'once') {
            root.clearTimeout(this.events[eventName].id);
          }
        }
        if (this.events[eventName]) {
          delete this.events[eventName];
        }
        return this;
      };

      EventMap.prototype.trigger = function() {
        var args, context, delay, eventName, i, interval, name, repeat, timeoutId, triggerEvent, triggerFunction, _i, _len, _ref;
        eventName = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        if (eventName == null) {
          return;
        }
        if (typeof eventName === 'object') {
          name = eventName.name, interval = eventName.interval, repeat = eventName.repeat, context = eventName.context, delay = eventName.delay;
        } else {
          name = eventName;
        }
        if (!this.events[name]) {
          return;
        }
        if (interval == null) {
          interval = 0;
        }
        if (repeat == null) {
          repeat = false;
        }
        if (context == null) {
          context = this;
        }
        if (delay == null) {
          delay = 0;
        }
        _ref = this.events[name];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          triggerFunction = function() {
            if (i.sender) {
              return i.event.apply(context, [].concat.apply([], [[i.sender], args]));
            } else {
              return i.event.apply(context, args);
            }
          };
          triggerEvent = function() {
            if (interval) {
              if (repeat) {
                i.type = 'repeat';
                i.id = root.setInterval(triggerFunction, interval);
              } else {
                i.type = 'once';
                i.id = root.setTimeout(triggerFunction, interval);
              }
            } else {
              i.type = 'direct';
              triggerFunction.call(this);
            }
            return null;
          };
          if (delay) {
            timeoutId = root.setTimeout(function() {
              triggerEvent.call(this);
              return root.clearTimeout(timeoutId);
            });
          } else {
            triggerEvent.call(this);
          }
        }
        return this;
      };

      return EventMap;

    })();
  });

}).call(this);

(function() {
  define('elyssa/events', ['eventmap'], function(EventMap) {
    var Events;
    return Events = Events || new EventMap();
  });

}).call(this);

(function() {
  var __slice = [].slice;

  define('elyssa/collection', function() {
    var Collection;
    return Collection = (function() {
      function Collection() {}

      Collection.prototype.contructor = function(content) {
        this.data = {
          collection: {},
          state: {},
          proxies: {
            handler: {},
            keyHandler: {}
          }
        };
        if (content) {
          if (typeof content === 'string') {
            return this.fromString(content);
          } else {
            return this.set(content);
          }
        }
      };

      Collection.prototype.fromString = function(content) {
        return this.data.collection = JSON.parse(content);
      };

      Collection.prototype.toString = function() {
        return JSON.stringify(this.data.collection);
      };

      Collection.prototype.add = function(key, value, state) {
        if (state == null) {
          state = 'rw';
        }
        if (this.exists(key)) {
          return;
        }
        this.proxy('add', key, value);
        this.data.collection[key] = value;
        if (state === 'readonly' || state === 'read-only' || state === 'readOnly') {
          state = 'ro';
        }
        if (state === 'writeonly' || state === 'write-only' || state === 'writeOnly') {
          state = 'wo';
        }
        return this.data.state[key] = state;
      };

      Collection.prototype.exists = function(key) {
        this.proxy('exists', key);
        return Object.hasOwnProperty.call(this.data.collection, key);
      };

      Collection.prototype.has = Collection.exists;

      Collection.prototype.remove = function(key) {
        this.proxy('remove', key);
        return delete this.data.collection[key];
      };

      Collection.prototype.keys = function() {
        return Object.keys(this.data.collection);
      };

      Collection.prototype.on = function(name, key, proxyFn) {
        var _base, _base1;
        if (key && typeof key === 'string') {
          (_base = this.data.proxies.keyHandler)[name] || (_base[name] = {});
          return this.data.proxies.keyHandler[name][key] = proxyFn;
        } else {
          proxyFn = key;
          (_base1 = this.data.proxies.handler)[name] || (_base1[name] = []);
          return this.data.proxies.handler[name].push(proxyFn);
        }
      };

      Collection.prototype.off = function(name, key) {
        var _ref;
        if (key) {
          if (typeof key === 'number') {
            if (this.data.proxies.handler[name] != null) {
              return this.data.proxies.handler[name].splice(key, 1);
            }
          } else {
            if (((_ref = this.data.proxies.keyHandler[name]) != null ? _ref[key] : void 0) != null) {
              return delete this.data.proxies.keyHandler[name][key];
            }
          }
        } else {
          return delete this.data.proxies.handler[name];
        }
      };

      Collection.prototype.proxy = function() {
        var args, i, key, name, _i, _len, _ref, _ref1, _ref2;
        name = arguments[0], key = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
        if (this.data.proxies.handler[name]) {
          _ref = this.data.proxies.handler[name];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            i = _ref[_i];
            i();
          }
        }
        if (key) {
          args.splice(0, 0, key);
          if (((_ref1 = this.data.proxies.keyHandler[name]) != null ? _ref1[key] : void 0) != null) {
            return (_ref2 = this.data.proxies.keyHandler[name])[key].apply(_ref2, args);
          }
        }
      };

      Collection.prototype.get = function(key) {
        if (data.state[key] !== 'wo') {
          this.proxy('get', key);
          return this.data.collection[key];
        } else {
          return void 0;
        }
      };

      Collection.prototype.set = function(key, value) {
        var k, v;
        if (value) {
          if (this.exists(key)) {
            if (this.data.state[key] !== 'ro') {
              this.data.collection[key] = value;
              this.proxy('set', key, value);
            }
          } else {
            this.add(key, value);
          }
        } else {
          for (k in key) {
            v = key[k];
            this.set.call(this, k, v);
          }
        }
        return null;
      };

      Collection.prototype.each = function(callback) {
        var key, value, _ref;
        _ref = this.data.collection;
        for (key in _ref) {
          value = _ref[key];
          callback(key, value);
        }
        return null;
      };

      Collection.prototype.map = function(callback) {
        var key, result, value, _ref;
        result = {};
        _ref = this.data.collection;
        for (key in _ref) {
          value = _ref[key];
          result[key] = callback(key, value);
        }
        return result;
      };

      Collection.prototype.filter = function(callback) {
        var key, result, value, _i, _len, _ref;
        result = {};
        _ref = this.data.collection;
        for (value = _i = 0, _len = _ref.length; _i < _len; value = ++_i) {
          key = _ref[value];
          if (!callback(this.data.collection[key])) {
            result[key] = this.data.collection[key];
          }
        }
        return result;
      };

      Collection.prototype.isEmpty = function() {
        return this.keys().length === 0;
      };

      return Collection;

    })();
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('elyssa/node', ['elyssa/entity'], function(Entity) {
    'use strict';
    var Node;
    return Node = (function(_super) {
      __extends(Node, _super);

      function Node() {}

      Node.prototype.position = new Elyssa.Vector3();

      Node.prototype.color = new Elyssa.Color();

      Node.prototype.scale = new Elyssa.Vector2();

      Node.prototype.texture = new Elyssa.Texture();

      Node.prototype.draw = function() {};

      Node.prototype.toString = function() {
        return Elyssa.serialize({
          position: this.position.toString(),
          color: this.color.toString(),
          scale: this.scale.toString(),
          texture: this.texture.toString()
        });
      };

      return Node;

    })(Entity);
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('elyssa/sprite', ['elyssa/node'], function(Node) {
    var Sprite;
    return Sprite = (function(_super) {
      __extends(Sprite, _super);

      function Sprite() {}

      return Sprite;

    })(Node);
  });

}).call(this);

(function() {
  define('elyssa/graphics/device', function() {
    'use strict';
    var GraphicsDevice;
    return GraphicsDevice = {};
  });

}).call(this);

(function() {
  define('elyssa/graphics/rendertarget', function() {
    'use strict';
    var RenderTarget;
    return RenderTarget = (function() {
      function RenderTarget() {}

      return RenderTarget;

    })();
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('elyssa/layer', ['elyssa/node'], function(Node) {
    var Layer;
    return Layer = (function(_super) {
      __extends(Layer, _super);

      function Layer() {}

      return Layer;

    })(Node);
  });

}).call(this);

(function() {
  define('elyssa/log', function() {
    'use strict';
    var Log;
    return Log = {};
  });

}).call(this);

(function() {
  define('elyssa/loop', ['requestanimationframe'], function(requestAnimationFrame) {
    'use strict';
    var Loop;
    return Loop = (function() {
      var isRunning, staticProperty, taskList;

      function Loop() {}

      taskList = {};

      isRunning = true;

      staticProperty = window.ClassHelper(Loop).staticProperty;

      staticProperty({
        tasks: {
          get: function() {
            return Object.keys(taskList);
          }
        }
      });

      Loop.run = function() {
        var animLoop, time;
        time = 0;
        animLoop = function() {
          var dt, key, now, value;
          requestAnimationFrame(animLoop);
          now = Date.now();
          dt = now - (time || now);
          time = now;
          if (!isRunning) {
            return;
          }
          for (key in taskList) {
            value = taskList[key];
            if (!value.paused) {
              if (typeof value.value === "function") {
                value.value(dt);
              }
            }
          }
          return null;
        };
        return animLoop();
      };

      Loop.pause = function() {
        isRunning = false;
        return this;
      };

      Loop.resume = function() {
        isRunning = true;
        return this;
      };

      Loop.clear = function() {
        taskList = {};
        return this;
      };

      Loop.addTask = function(taskName, taskFunction) {
        if (taskList[taskName]) {
          return;
        }
        taskList[taskName] = {
          paused: false,
          value: taskFunction
        };
        return this;
      };

      Loop.pauseTask = function(taskName) {
        taskList[taskName].paused = true;
        return this;
      };

      Loop.resumeTask = function(taskName) {
        taskList[taskName].paused = false;
        return this;
      };

      Loop.removeTask = function(taskName) {
        if (taskList[taskName]) {
          delete taskList[taskName];
        }
        return this;
      };

      return Loop;

    })();
  });

}).call(this);

(function() {
  define('elyssa/math', function() {
    'use strict';
    var Math;
    Math = {
      clamp: function(value, min, max) {
        var _ref, _ref1, _ref2;
        if (typeof value === 'object') {
          _ref = value, min = _ref.min, max = _ref.max, value = _ref.value;
        }
        if (Array.isArray(min)) {
          _ref1 = min, min = _ref1[0], max = _ref1[1];
        }
        if (min == null) {
          min = 0.0;
        }
        if (max == null) {
          max = 1.0;
        }
        if (min > max) {
          _ref2 = [max, min], min = _ref2[0], max = _ref2[1];
        }
        if ((min <= value && value <= max)) {
          return value;
        } else {
          if (value > max) {
            return max;
          } else {
            return min;
          }
        }
      }
    };
    return Math;
  });

}).call(this);

(function() {
  define('elyssa/assets', function() {
    'use strict';
    var Assets;
    return Assets = {};
  });

}).call(this);

(function() {
  define('elyssa/preloader', function() {
    'use strict';
    var Preloader;
    return Preloader = (function() {
      function Preloader() {}

      Preloader.prototype.on = function(name, eventFunction) {};

      Preloader.prototype.off = function(name) {};

      return Preloader;

    })();
  });

}).call(this);

(function() {
  define('elyssa/storage', ['root', 'serialize'], function(root, serialize) {
    'use strict';
    var Storage;
    return Storage = (function(localStorage) {
      var clear, item, load, save, storageMap, toString;
      storageMap = {};
      toString = function() {
        return serialize(storageMap);
      };
      clear = function() {
        return storageMap = {};
      };
      load = function() {};
      save = function() {};
      item = function(key, value) {};
      return {
        toString: toString,
        item: item,
        load: load,
        save: save,
        clear: clear
      };
    })(root.localStorage);
  });

}).call(this);

(function() {
  define('elyssa/renderer/canvas', function() {
    'use strict';
    var Canvas;
    return Canvas = (function() {
      var context;

      context = null;

      function Canvas() {
        var canvasElement;
        this.name = 'Canvas';
        canvasElement = document.createElement('canvas');
        document.body.appendChild(canvasElement);
        context = canvasElement.getContext('2d');
      }

      Canvas.prototype.render = function(element) {};

      Canvas.prototype.clear = function() {
        return context.clearRect(0, 0, 0, 0);
      };

      return Canvas;

    })();
  });

}).call(this);

(function() {
  define('elyssa/renderer/dom', function() {
    'use strict';
    var DOM;
    return DOM = (function() {
      function DOM() {
        this.name = 'DOM';
      }

      DOM.prototype.clear = function() {};

      return DOM;

    })();
  });

}).call(this);

(function() {
  define('elyssa/renderer', function() {
    'use strict';
    var Renderer;
    return Renderer = (function() {
      var bind, functionNames, setMethods, source;

      functionNames = ['drawLine', 'drawPoint', 'drawTexture', 'clear'];

      source = null;

      bind = function(func, context) {
        if (func != null) {
          return func.apply(context, arguments);
        }
      };

      setMethods = function(context, methodArray, source) {
        var method, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = methodArray.length; _i < _len; _i++) {
          method = methodArray[_i];
          if (!source[method]) {
            console.log("Renderer " + source.name + " does not implement            function " + method);
          }
          _results.push((function(method) {
            return context[method] = function() {
              return bind(source[method](context));
            };
          })(method));
        }
        return _results;
      };

      function Renderer(source) {
        if (!source) {
          console.log('Please specify a renderer implementation');
        } else {
          setMethods(this, functionNames, source);
        }
      }

      return Renderer;

    })();
  });

}).call(this);

(function() {
  define('elyssa/renderer/svg', function() {
    'use strict';
    var SVG;
    return SVG = (function() {
      function SVG() {
        this.name = 'SVG';
      }

      SVG.prototype.clear = function() {};

      return SVG;

    })();
  });

}).call(this);

(function() {
  define('elyssa/scene/director', function() {
    'use strict';
    var SceneDirector;
    return SceneDirector = (function() {
      var currentScene, sceneList;

      sceneList = {};

      currentScene = null;

      function SceneDirector() {}

      SceneDirector.prototype.add = function(scene) {
        if (scene == null) {
          return;
        }
        return sceneList[scene.name] = scene;
      };

      SceneDirector.prototype["delete"] = function(sceneName) {
        return delete sceneList[sceneName];
      };

      SceneDirector.prototype.switchTo = function(sceneName) {
        if (sceneList[sceneName]) {
          return currentScene = sceneList[sceneName];
        }
      };

      SceneDirector.prototype.render = function() {
        return currentScene != null ? typeof currentScene.render === "function" ? currentScene.render() : void 0 : void 0;
      };

      SceneDirector.prototype.update = function(dt) {
        return currentScene != null ? typeof currentScene.update === "function" ? currentScene.update(dt) : void 0 : void 0;
      };

      return SceneDirector;

    })();
  });

}).call(this);

(function() {
  define('elyssa/scene', function() {
    'use strict';
    var Scene;
    return Scene = (function() {
      var entityList;

      entityList = [];

      function Scene(_arg) {
        this.constructor.name = _arg.this;
        entityList = [];
      }

      Scene.prototype.add = function(entity) {
        return entityList.push(entity);
      };

      Scene.prototype.render = function() {
        var e, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = entityList.length; _i < _len; _i++) {
          e = entityList[_i];
          _results.push(typeof e.render === "function" ? e.render() : void 0);
        }
        return _results;
      };

      Scene.prototype.update = function(dt) {
        var e, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = entityList.length; _i < _len; _i++) {
          e = entityList[_i];
          _results.push(typeof e.update === "function" ? e.update(dt) : void 0);
        }
        return _results;
      };

      return Scene;

    })();
  });

}).call(this);

(function() {
  define('elyssa/texture', ['elyssa/types/rect'], function(Rect) {
    'use strict';
    var Texture;
    return Texture = (function() {
      function Texture(source) {}

      Texture.prototype.loadFromFile = function(filename) {};

      Texture.prototype.loadFromData = function(data) {};

      Texture.prototype.textureRect = new Rect();

      Texture.prototype.toString = function() {
        return {
          filename: ''
        };
      };

      return Texture;

    })();
  });

}).call(this);

(function() {
  define('elyssa/texture/manager', function() {
    'use strict';
    var TextureManager, textureCache;
    textureCache = {};
    return TextureManager = {
      add: function(texture) {},
      remove: function(index) {}
    };
  });

}).call(this);

(function() {
  define('elyssa/types/color', ['elyssa/math'], function(Math) {
    'use strict';
    var Color;
    return Color = (function() {
      var colorMax;

      colorMax = 255;

      function Color(param) {
        var _ref;
        if (param == null) {
          param = {
            r: 0,
            g: 0,
            b: 0,
            a: 255
          };
        }
        if (typeof param === 'string') {
          _ref = Color[param] ? Color[param]() : new Color(), this.r = _ref.r, this.g = _ref.g, this.b = _ref.b, this.a = _ref.a;
        } else {
          this.r = param.r, this.g = param.g, this.b = param.b, this.a = param.a;
          if (this.r == null) {
            this.r = 0;
          }
          if (this.g == null) {
            this.g = 0;
          }
          if (this.b == null) {
            this.b = 0;
          }
          if (this.a == null) {
            this.a = 255;
          }
          this.r = Math.clamp(this.r, 0, colorMax);
          this.g = Math.clamp(this.g, 0, colorMax);
          this.b = Math.clamp(this.b, 0, colorMax);
          this.a = Math.clamp(this.a, 0, colorMax);
        }
      }

      Color.prototype.toString = function() {
        if (this.a / colorMax === 1.0) {
          return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
        } else {
          return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + (this.a / colorMax) + ")";
        }
      };

      Color.prototype.toHex = function() {
        var tmpB, tmpG, tmpR;
        tmpR = (~~this.r).toString(16);
        tmpG = (~~this.g).toString(16);
        tmpB = (~~this.b).toString(16);
        if (tmpR.length === 1) {
          tmpR = "0" + tmpR;
        }
        if (tmpG.length === 1) {
          tmpG = "0" + tmpG;
        }
        if (tmpB.length === 1) {
          tmpB = "0" + tmpB;
        }
        if (tmpR[0] === tmpR[1] && tmpG[0] === tmpG[1] && tmpB[0] === tmpB[1]) {
          return "#" + tmpR[0] + tmpG[0] + tmpB[0];
        } else {
          return "#" + tmpR + tmpG + tmpB;
        }
      };

      Color.prototype.lighten = function(factor) {
        var delta;
        factor = Math.clamp(factor);
        delta = Math.round(colorMax * factor);
        this.r += delta;
        this.g += delta;
        this.b += delta;
        this.r = Math.clamp(this.r, 0, colorMax);
        this.g = Math.clamp(this.g, 0, colorMax);
        this.b = Math.clamp(this.b, 0, colorMax);
        return this;
      };

      Color.prototype.darken = function(factor) {
        var delta;
        factor = Math.clamp(factor);
        delta = Math.round(colorMax * factor);
        this.r -= delta;
        this.g -= delta;
        this.b -= delta;
        this.r = Math.clamp(this.r, 0, colorMax);
        this.g = Math.clamp(this.g, 0, colorMax);
        this.b = Math.clamp(this.b, 0, colorMax);
        return this;
      };

      Color.prototype.fadeIn = function(factor) {
        var delta;
        factor = Math.clamp(factor);
        delta = Math.round(colorMax * factor);
        this.a += delta;
        this.a = Math.clamp(this.a, 0, colorMax);
        return this;
      };

      Color.prototype.fadeOut = function(factor) {
        var delta;
        factor = Math.clamp(factor);
        delta = Math.round(colorMax * factor);
        this.a -= delta;
        this.a = Math.clamp(this.a, 0, colorMax);
        return this;
      };

      Color.aqua = function() {
        return new Color({
          r: 0,
          g: 255,
          b: 255
        });
      };

      Color.black = function() {
        return new Color({
          r: 0,
          g: 0,
          b: 0
        });
      };

      Color.blue = function() {
        return new Color({
          r: 0,
          g: 0,
          b: 255
        });
      };

      Color.fuchsia = function() {
        return new Color({
          r: 255,
          g: 0,
          b: 255
        });
      };

      Color.gray = function() {
        return new Color({
          r: 128,
          g: 128,
          b: 128
        });
      };

      Color.grey = Color.gray;

      Color.green = function() {
        return new Color({
          r: 0,
          g: 128,
          b: 0
        });
      };

      Color.lime = function() {
        return new Color({
          r: 0,
          g: 255,
          b: 0
        });
      };

      Color.maroon = function() {
        return new Color({
          r: 128,
          g: 0,
          b: 0
        });
      };

      Color.navy = function() {
        return new Color({
          r: 0,
          g: 0,
          b: 128
        });
      };

      Color.olive = function() {
        return new Color({
          r: 128,
          g: 128,
          b: 0
        });
      };

      Color.purple = function() {
        return new Color({
          r: 128,
          g: 0,
          b: 128
        });
      };

      Color.red = function() {
        return new Color({
          r: 255,
          g: 0,
          b: 0
        });
      };

      Color.silver = function() {
        return new Color({
          r: 192,
          g: 192,
          b: 192
        });
      };

      Color.teal = function() {
        return new Color({
          r: 0,
          g: 128,
          b: 128
        });
      };

      Color.white = function() {
        return new Color({
          r: 255,
          g: 255,
          b: 255
        });
      };

      Color.yellow = function() {
        return new Color({
          r: 255,
          g: 255,
          b: 0
        });
      };

      Color.transparent = function() {
        return new Color({
          r: 0,
          g: 0,
          b: 0,
          a: 0
        });
      };

      Color.aliceBlue = function() {
        return new Color({
          r: 240,
          g: 248,
          b: 255
        });
      };

      Color.antiqueWhite = function() {
        return new Color({
          r: 250,
          g: 235,
          b: 215
        });
      };

      Color.aquamarine = function() {
        return new Color({
          r: 127,
          g: 255,
          b: 212
        });
      };

      Color.azure = function() {
        return new Color({
          r: 240,
          g: 255,
          b: 255
        });
      };

      Color.beige = function() {
        return new Color({
          r: 245,
          g: 245,
          b: 220
        });
      };

      Color.bisque = function() {
        return new Color({
          r: 255,
          g: 228,
          b: 196
        });
      };

      Color.blanchedAlmond = function() {
        return new Color({
          r: 255,
          g: 235,
          b: 205
        });
      };

      Color.blueViolet = function() {
        return new Color({
          r: 138,
          g: 43,
          b: 226
        });
      };

      Color.brown = function() {
        return new Color({
          r: 165,
          g: 42,
          b: 42
        });
      };

      Color.burlyWood = function() {
        return new Color({
          r: 222,
          g: 184,
          b: 135
        });
      };

      Color.cadetBlue = function() {
        return new Color({
          r: 95,
          g: 158,
          b: 160
        });
      };

      Color.chartreuse = function() {
        return new Color({
          r: 127,
          g: 255,
          b: 0
        });
      };

      Color.chocolate = function() {
        return new Color({
          r: 210,
          g: 105,
          b: 30
        });
      };

      Color.coral = function() {
        return new Color({
          r: 255,
          g: 127,
          b: 80
        });
      };

      Color.cornflowerBlue = function() {
        return new Color({
          r: 100,
          g: 149,
          b: 237
        });
      };

      Color.cornsilk = function() {
        return new Color({
          r: 255,
          g: 248,
          b: 220
        });
      };

      Color.crimson = function() {
        return new Color({
          r: 220,
          g: 20,
          b: 60
        });
      };

      Color.cyan = function() {
        return new Color({
          r: 0,
          g: 255,
          b: 255
        });
      };

      Color.darkBlue = function() {
        return new Color({
          r: 0,
          g: 0,
          b: 139
        });
      };

      Color.darkCyan = function() {
        return new Color({
          r: 0,
          g: 139,
          b: 139
        });
      };

      Color.darkGoldenRod = function() {
        return new Color({
          r: 184,
          g: 134,
          b: 11
        });
      };

      Color.darkGray = function() {
        return new Color({
          r: 169,
          g: 169,
          b: 169
        });
      };

      Color.darkGrey = Color.darkGray;

      Color.darkGreen = function() {
        return new Color({
          r: 0,
          g: 100,
          b: 0
        });
      };

      Color.darkKhaki = function() {
        return new Color({
          r: 189,
          g: 183,
          b: 107
        });
      };

      Color.darkMagenta = function() {
        return new Color({
          r: 139,
          g: 0,
          b: 139
        });
      };

      Color.darkOliveGreen = function() {
        return new Color({
          r: 85,
          g: 107,
          b: 47
        });
      };

      Color.darkOrange = function() {
        return new Color({
          r: 255,
          g: 140,
          b: 0
        });
      };

      Color.darkOrchid = function() {
        return new Color({
          r: 153,
          g: 50,
          b: 204
        });
      };

      Color.darkRed = function() {
        return new Color({
          r: 139,
          g: 0,
          b: 0
        });
      };

      Color.darkSalmon = function() {
        return new Color({
          r: 233,
          g: 150,
          b: 122
        });
      };

      Color.darkSeaGreen = function() {
        return new Color({
          r: 143,
          g: 188,
          b: 143
        });
      };

      Color.darkSlateBlue = function() {
        return new Color({
          r: 72,
          g: 61,
          b: 139
        });
      };

      Color.darkSlateGray = function() {
        return new Color({
          r: 47,
          g: 79,
          b: 79
        });
      };

      Color.darkSlateGrey = Color.darkSlateGray;

      Color.darkTurquoise = function() {
        return new Color({
          r: 0,
          g: 206,
          b: 209
        });
      };

      Color.darkViolet = function() {
        return new Color({
          r: 148,
          g: 0,
          b: 211
        });
      };

      Color.deepPink = function() {
        return new Color({
          r: 255,
          g: 20,
          b: 147
        });
      };

      Color.deepSkyBlue = function() {
        return new Color({
          r: 0,
          g: 191,
          b: 255
        });
      };

      Color.dimGray = function() {
        return new Color({
          r: 105,
          g: 105,
          b: 105
        });
      };

      Color.dimGrey = Color.dimGray;

      Color.dodgerBlue = function() {
        return new Color({
          r: 30,
          g: 144,
          b: 255
        });
      };

      Color.fireBrick = function() {
        return new Color({
          r: 178,
          g: 34,
          b: 34
        });
      };

      Color.floralWhite = function() {
        return new Color({
          r: 255,
          g: 250,
          b: 240
        });
      };

      Color.forestGreen = function() {
        return new Color({
          r: 34,
          g: 139,
          b: 34
        });
      };

      Color.gainsboro = function() {
        return new Color({
          r: 220,
          g: 220,
          b: 220
        });
      };

      Color.ghostWhite = function() {
        return new Color({
          r: 248,
          g: 248,
          b: 255
        });
      };

      Color.gold = function() {
        return new Color({
          r: 255,
          g: 215,
          b: 0
        });
      };

      Color.goldenRod = function() {
        return new Color({
          r: 218,
          g: 165,
          b: 32
        });
      };

      Color.greenYellow = function() {
        return new Color({
          r: 173,
          g: 255,
          b: 47
        });
      };

      Color.honeyDew = function() {
        return new Color({
          r: 240,
          g: 255,
          b: 240
        });
      };

      Color.hotPink = function() {
        return new Color({
          r: 255,
          g: 105,
          b: 180
        });
      };

      Color.indianRed = function() {
        return new Color({
          r: 205,
          g: 92,
          b: 92
        });
      };

      Color.indigo = function() {
        return new Color({
          r: 75,
          g: 0,
          b: 130
        });
      };

      Color.ivory = function() {
        return new Color({
          r: 255,
          g: 255,
          b: 240
        });
      };

      Color.khaki = function() {
        return new Color({
          r: 240,
          g: 230,
          b: 140
        });
      };

      Color.lavender = function() {
        return new Color({
          r: 230,
          g: 230,
          b: 250
        });
      };

      Color.lavenderBlush = function() {
        return new Color({
          r: 255,
          g: 240,
          b: 245
        });
      };

      Color.lawnGreen = function() {
        return new Color({
          r: 124,
          g: 252,
          b: 0
        });
      };

      Color.lemonChiffon = function() {
        return new Color({
          r: 255,
          g: 250,
          b: 205
        });
      };

      Color.lightBlue = function() {
        return new Color({
          r: 173,
          g: 216,
          b: 230
        });
      };

      Color.lightCoral = function() {
        return new Color({
          r: 240,
          g: 128,
          b: 128
        });
      };

      Color.lightCyan = function() {
        return new Color({
          r: 224,
          g: 255,
          b: 255
        });
      };

      Color.lightGoldenRodYellow = function() {
        return new Color({
          r: 250,
          g: 250,
          b: 210
        });
      };

      Color.lightGray = function() {
        return new Color({
          r: 211,
          g: 211,
          b: 211
        });
      };

      Color.lightGrey = Color.lightGray;

      Color.lightGreen = function() {
        return new Color({
          r: 144,
          g: 238,
          b: 144
        });
      };

      Color.lightPink = function() {
        return new Color({
          r: 255,
          g: 182,
          b: 193
        });
      };

      Color.lightSalmon = function() {
        return new Color({
          r: 255,
          g: 160,
          b: 122
        });
      };

      Color.lightSeaGreen = function() {
        return new Color({
          r: 32,
          g: 178,
          b: 170
        });
      };

      Color.lightSkyBlue = function() {
        return new Color({
          r: 135,
          g: 206,
          b: 250
        });
      };

      Color.lightSlateGray = function() {
        return new Color({
          r: 119,
          g: 136,
          b: 153
        });
      };

      Color.lightSlateGrey = Color.lightSlateGray;

      Color.lightSteelBlue = function() {
        return new Color({
          r: 176,
          g: 196,
          b: 222
        });
      };

      Color.lightYellow = function() {
        return new Color({
          r: 255,
          g: 255,
          b: 224
        });
      };

      Color.limeGreen = function() {
        return new Color({
          r: 50,
          g: 205,
          b: 50
        });
      };

      Color.linen = function() {
        return new Color({
          r: 250,
          g: 240,
          b: 230
        });
      };

      Color.magenta = Color.fuchsia;

      Color.mediumAquaMarine = function() {
        return new Color({
          r: 102,
          g: 205,
          b: 170
        });
      };

      Color.mediumBlue = function() {
        return new Color({
          r: 0,
          g: 0,
          b: 205
        });
      };

      Color.mediumOrchid = function() {
        return new Color({
          r: 186,
          g: 85,
          b: 211
        });
      };

      Color.mediumPurple = function() {
        return new Color({
          r: 157,
          g: 112,
          b: 219
        });
      };

      Color.mediumSeaGreen = function() {
        return new Color({
          r: 60,
          g: 179,
          b: 113
        });
      };

      Color.mediumSlateBlue = function() {
        return new Color({
          r: 123,
          g: 104,
          b: 238
        });
      };

      Color.mediumSpringGreen = function() {
        return new Color({
          r: 0,
          g: 250,
          b: 154
        });
      };

      Color.mediumTurquoise = function() {
        return new Color({
          r: 72,
          g: 209,
          b: 204
        });
      };

      Color.mediumVioletRed = function() {
        return new Color({
          r: 199,
          g: 21,
          b: 133
        });
      };

      Color.midnightBlue = function() {
        return new Color({
          r: 25,
          g: 25,
          b: 112
        });
      };

      Color.mintCream = function() {
        return new Color({
          r: 245,
          g: 255,
          b: 250
        });
      };

      Color.mistyRose = function() {
        return new Color({
          r: 255,
          g: 228,
          b: 225
        });
      };

      Color.moccasin = function() {
        return new Color({
          r: 255,
          g: 228,
          b: 181
        });
      };

      Color.navajoWhite = function() {
        return new Color({
          r: 255,
          g: 222,
          b: 173
        });
      };

      Color.oldLace = function() {
        return new Color({
          r: 253,
          g: 245,
          b: 230
        });
      };

      Color.oliveDrab = function() {
        return new Color({
          r: 107,
          g: 142,
          b: 35
        });
      };

      Color.orange = function() {
        return new Color({
          r: 255,
          g: 165,
          b: 0
        });
      };

      Color.orangeRed = function() {
        return new Color({
          r: 255,
          g: 69,
          b: 0
        });
      };

      Color.orchid = function() {
        return new Color({
          r: 218,
          g: 112,
          b: 214
        });
      };

      Color.paleGoldenRod = function() {
        return new Color({
          r: 238,
          g: 232,
          b: 170
        });
      };

      Color.paleGreen = function() {
        return new Color({
          r: 152,
          g: 251,
          b: 152
        });
      };

      Color.paleTurquoise = function() {
        return new Color({
          r: 175,
          g: 238,
          b: 238
        });
      };

      Color.paleVioletRed = function() {
        return new Color({
          r: 219,
          g: 112,
          b: 147
        });
      };

      Color.papayaWhip = function() {
        return new Color({
          r: 255,
          g: 239,
          b: 213
        });
      };

      Color.peachPuff = function() {
        return new Color({
          r: 255,
          g: 218,
          b: 185
        });
      };

      Color.peru = function() {
        return new Color({
          r: 205,
          g: 133,
          b: 63
        });
      };

      Color.pink = function() {
        return new Color({
          r: 255,
          g: 192,
          b: 203
        });
      };

      Color.plum = function() {
        return new Color({
          r: 221,
          g: 160,
          b: 221
        });
      };

      Color.powderBlue = function() {
        return new Color({
          r: 176,
          g: 224,
          b: 230
        });
      };

      Color.rosyBrown = function() {
        return new Color({
          r: 188,
          g: 143,
          b: 143
        });
      };

      Color.royalBlue = function() {
        return new Color({
          r: 65,
          g: 105,
          b: 225
        });
      };

      Color.saddleBrown = function() {
        return new Color({
          r: 139,
          g: 69,
          b: 19
        });
      };

      Color.salmon = function() {
        return new Color({
          r: 250,
          g: 128,
          b: 114
        });
      };

      Color.sandyBrown = function() {
        return new Color({
          r: 244,
          g: 164,
          b: 96
        });
      };

      Color.seaGreen = function() {
        return new Color({
          r: 46,
          g: 139,
          b: 87
        });
      };

      Color.seaShell = function() {
        return new Color({
          r: 255,
          g: 245,
          b: 238
        });
      };

      Color.sienna = function() {
        return new Color({
          r: 160,
          g: 82,
          b: 45
        });
      };

      Color.skyBlue = function() {
        return new Color({
          r: 135,
          g: 206,
          b: 235
        });
      };

      Color.slateBlue = function() {
        return new Color({
          r: 106,
          g: 90,
          b: 205
        });
      };

      Color.slateGray = function() {
        return new Color({
          r: 112,
          g: 128,
          b: 144
        });
      };

      Color.slateGrey = Color.slateGray;

      Color.snow = function() {
        return new Color({
          r: 255,
          g: 250,
          b: 250
        });
      };

      Color.springGreen = function() {
        return new Color({
          r: 0,
          g: 255,
          b: 127
        });
      };

      Color.steelBlue = function() {
        return new Color({
          r: 70,
          g: 130,
          b: 180
        });
      };

      Color.tan = function() {
        return new Color({
          r: 210,
          g: 180,
          b: 140
        });
      };

      Color.thistle = function() {
        return new Color({
          r: 216,
          g: 191,
          b: 216
        });
      };

      Color.tomato = function() {
        return new Color({
          r: 255,
          g: 99,
          b: 71
        });
      };

      Color.turquoise = function() {
        return new Color({
          r: 64,
          g: 224,
          b: 208
        });
      };

      Color.violet = function() {
        return new Color({
          r: 238,
          g: 130,
          b: 238
        });
      };

      Color.wheat = function() {
        return new Color({
          r: 245,
          g: 222,
          b: 179
        });
      };

      Color.whiteSmoke = function() {
        return new Color({
          r: 245,
          g: 245,
          b: 245
        });
      };

      Color.yellowGreen = function() {
        return new Color({
          r: 154,
          g: 205,
          b: 50
        });
      };

      Color.freezeDevBlue = function() {
        return new Color({
          r: 73,
          g: 92,
          b: 108
        });
      };

      return Color;

    })();
  });

}).call(this);

(function() {
  (function(window, Elyssa) {
    return Elyssa.Rect = (function() {
      var defaultValue;

      defaultValue = {
        x: 0,
        y: 0,
        w: 0,
        h: 0
      };

      function Rect(_arg) {
        var _ref;
        _ref = _arg != null ? _arg : defaultValue, this.x = _ref.x, this.y = _ref.y, this.w = _ref.w, this.h = _ref.h;
        if (this.x == null) {
          this.x = defaultValue.x;
        }
        if (this.y == null) {
          this.y = defaultValue.y;
        }
        if (this.w == null) {
          this.w = defaultValue.w;
        }
        if (this.h == null) {
          this.h = defaultValue.h;
        }
      }

      Rect.prototype.contains = function(_arg) {
        var h, w, x, y, _ref, _ref1;
        x = _arg.x, y = _arg.y, w = _arg.w, h = _arg.h;
        if ((w != null) && (h != null)) {
          return (this.x <= (_ref = x + h) && _ref <= this.x + this.w) && (this.y <= (_ref1 = y + w) && _ref1 <= this.y + this.h);
        } else {
          return (this.x <= x && x <= this.x + this.w) && (this.y <= y && y <= this.y + this.h);
        }
      };

      Rect.prototype.center = function() {
        return {
          x: this.w / 2 + this.x,
          y: this.h / 2 + this.y
        };
      };

      Rect.prototype.add = function(_arg) {
        var h, w, x, y;
        x = _arg.x, y = _arg.y, w = _arg.w, h = _arg.h;
        return {
          x: this.x += x,
          y: this.y += y,
          w: this.w += w,
          h: this.h += h
        };
      };

      Rect.prototype.toSize = function() {
        return new Elyssa.Size({
          w: this.w,
          h: this.h
        });
      };

      Rect.prototype.toVector2 = function() {
        return new Elyssa.Vector2({
          x: this.x,
          y: this.y
        });
      };

      Rect.prototype.toVector3 = function() {
        return new Elyssa.Vector3({
          x: this.x,
          y: this.y
        });
      };

      Rect.prototype.toString = function() {
        return Elyssa.serialize({
          x: this.x,
          y: this.y,
          w: this.w,
          h: this.h
        }, defaultValue);
      };

      Rect.fromString = function(rectString) {
        return Elyssa.deserialize(rectString, this.name);
      };

      return Rect;

    })();
  })(this, this.Elyssa || (this.Elyssa = {}));

}).call(this);

(function() {
  define('elyssa/types/size', ['elyssa/types/rect', 'serialize', 'deserialize'], function(Rect, serialize, deserialize) {
    var Size;
    return Size = (function() {
      function Size(_arg) {
        var _ref;
        _ref = _arg != null ? _arg : {
          w: 0,
          h: 0
        }, this.w = _ref.w, this.h = _ref.h;
        if (this.w == null) {
          this.w = 0;
        }
        if (this.h == null) {
          this.h = 0;
        }
      }

      Size.prototype.toRect = function() {
        return new Rect({
          x: 0,
          y: 0,
          w: this.w,
          h: this.h
        });
      };

      Size.prototype.center = function() {
        return {
          x: this.w / 2,
          y: this.h / 2
        };
      };

      Size.prototype.toString = function() {
        return serialize({
          x: this.x,
          y: this.y,
          w: this.w,
          h: this.h
        }, defaultValue);
      };

      Size.fromString = function(rectString) {
        return deserialize(rectString, this.name);
      };

      return Size;

    })();
  });

}).call(this);

(function() {
  (function(window, Elyssa) {
    return Elyssa.Vector2 = (function() {
      var defaultValue, get;

      get = window.ClassHelper(Vector2).get;

      defaultValue = {
        x: 0,
        y: 0
      };

      function Vector2(_arg) {
        var _ref;
        _ref = _arg != null ? _arg : defaultValue, this.x = _ref.x, this.y = _ref.y;
        if (this.x == null) {
          this.x = defaultValue.x;
        }
        if (this.y == null) {
          this.y = defaultValue.y;
        }
      }

      Vector2.prototype.toRect = function() {
        return new Elyssa.Rect({
          x: this.x,
          y: this.y
        });
      };

      Vector2.prototype.normalize = function() {
        return new Elyssa.Vector({
          x: this.x / this.length,
          y: this.y / this.length
        });
      };

      get({
        length: function() {
          return window.Math.sqrt(this.x * this.x + this.y * this.y);
        }
      });

      Vector2.dotProduct = function(a, b) {
        if (!(a && b)) {
          return;
        }
        return a.x * b.x + a.y * b.y;
      };

      Vector2.normalize = function(vec) {
        return new Elyssa.Vector2({
          x: vec.x / vec.length,
          y: vec.y / vec.length
        });
      };

      Vector2.prototype.toVector3 = function() {
        return Elyssa.Vector3({
          x: this.x,
          y: this.y
        });
      };

      Vector2.prototype.toString = function() {
        return Elyssa.serialize({
          x: this.x,
          y: this.y,
          z: this.z
        }, defaultValue);
      };

      Vector2.fromString = function(string) {
        return Elyssa.deserialize(string, this.name);
      };

      return Vector2;

    })();
  })(this, this.Elyssa || (this.Elyssa = {}));

}).call(this);

(function() {
  (function(window, Elyssa) {
    return Elyssa.Vector3 = (function() {
      var defaultValue, get;

      get = window.ClassHelper(Vector3).get;

      defaultValue = {
        x: 0,
        y: 0,
        z: 0
      };

      function Vector3(_arg) {
        var _ref;
        _ref = _arg != null ? _arg : defaultValue, this.x = _ref.x, this.y = _ref.y, this.z = _ref.z;
        if (this.x == null) {
          this.x = defaultValue.x;
        }
        if (this.y == null) {
          this.y = defaultValue.y;
        }
        if (this.z == null) {
          this.z = defaultValue.z;
        }
      }

      Vector3.prototype.toRect = function() {
        return new Elyssa.Rect({
          x: this.x,
          y: this.y
        });
      };

      Vector3.prototype.normalize = function() {
        return new Elyssa.Vector({
          x: this.x / this.length,
          y: this.y / this.length,
          z: this.z / this.length
        });
      };

      get({
        length: function() {
          return window.Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }
      });

      Vector3.crossProduct = function(a, b) {
        if (!(a && b)) {
          return;
        }
        return new Elyssa.Vector3({
          x: a.y * b.z - b.y * a.z,
          y: a.z * b.x - b.z * a.x,
          z: a.x * b.y - b.x * a.y
        });
      };

      Vector3.dotProduct = function(a, b) {
        if (!(a && b)) {
          return;
        }
        return a.x * b.x + a.y * b.y + a.z * b.z;
      };

      Vector3.normalize = function(vec) {
        return new Elyssa.Vector3({
          x: vec.x / vec.length,
          y: vec.y / vec.length,
          z: vec.z / vec.length
        });
      };

      Vector3.up = function() {
        return new Elyssa.Vector3({
          x: 0,
          y: 1,
          z: 0
        });
      };

      Vector3.zero = function() {
        return new Elyssa.Vector3({
          x: 0,
          y: 0,
          Z: 0
        });
      };

      Vector3.one = function() {
        return new Elyssa.Vector3({
          x: 1,
          y: 1,
          z: 1
        });
      };

      Vector3.right = function() {
        return new Elyssa.Vector3({
          x: 1,
          y: 0,
          z: 0
        });
      };

      Vector3.prototype.toVector2 = function() {
        return Elyssa.Vector2({
          x: this.x,
          y: this.y
        });
      };

      Vector3.prototype.toString = function() {
        return Elyssa.serialize({
          x: this.x,
          y: this.y,
          z: this.z
        }, defaultValue);
      };

      Vector3.fromString = function(string) {
        return Elyssa.deserialize(string, this.name);
      };

      return Vector3;

    })();
  })(this, this.Elyssa || (this.Elyssa = {}));

}).call(this);

(function() {
  (function(window, Elyssa) {
    var deserialize;
    return deserialize = function(stringedObject, convert) {
      var error, parsedObject;
      if (!stringedObject) {
        return new Elyssa[convert]();
      }
      try {
        parsedObject = JSON.parse(stringedObject);
        return new Elyssa[convert](parsedObject);
      } catch (_error) {
        error = _error;
        console.log("Error while converting " + stringedObject + "        to a " + convert + ": " + error);
        return new Elyssa[convert]();
      }
    };
  })(this, this.Elyssa || (this.Elyssa = {}));

}).call(this);

(function() {
  define('elyssa/serialize', function() {
    var serialize;
    return serialize = function(object, defaultValue) {
      var key, value;
      if (defaultValue) {
        for (key in defaultValue) {
          value = defaultValue[key];
          if (value === object[key]) {
            delete object[key];
          }
        }
      }
      return JSON.stringify(object);
    };
  });

}).call(this);
