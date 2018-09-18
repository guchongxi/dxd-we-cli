(function (f) { if (typeof exports === "object" && typeof module !== "undefined") { module.exports = f() } else if (typeof define === "function" && define.amd) { define([], f) } else { var g; if (typeof window !== "undefined") { g = window } else if (typeof global !== "undefined") { g = global } else if (typeof self !== "undefined") { g = self } else { g = this } g._da = f() } })(function () {
  var define, module, exports; return (function () { function r(e, n, t) { function o(i, f) { if (!n[i]) { if (!e[i]) { var c = "function" == typeof require && require; if (!f && c) return c(i, !0); if (u) return u(i, !0); var a = new Error("Cannot find module '" + i + "'"); throw a.code = "MODULE_NOT_FOUND", a } var p = n[i] = { exports: {} }; e[i][0].call(p.exports, function (r) { var n = e[i][1][r]; return o(n || r) }, p, p.exports, r, e, n, t) } return n[i].exports } for (var u = "function" == typeof require && require, i = 0; i < t.length; i++)o(t[i]); return o } return r })()({
    1: [function (require, module, exports) {
      var charenc = {
        // UTF-8 encoding
        utf8: {
          // Convert a string to a byte array
          stringToBytes: function (str) {
            return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
          },

          // Convert a byte array to a string
          bytesToString: function (bytes) {
            return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
          }
        },

        // Binary encoding
        bin: {
          // Convert a string to a byte array
          stringToBytes: function (str) {
            for (var bytes = [], i = 0; i < str.length; i++)
              bytes.push(str.charCodeAt(i) & 0xFF);
            return bytes;
          },

          // Convert a byte array to a string
          bytesToString: function (bytes) {
            for (var str = [], i = 0; i < bytes.length; i++)
              str.push(String.fromCharCode(bytes[i]));
            return str.join('');
          }
        }
      };

      module.exports = charenc;

    }, {}], 2: [function (require, module, exports) {
      (function (global) {
        /*!
         * cookiejs v1.0.13
         * Change the cookie library a simple API provides
         *
         * Copyright (c) 2017 kenny wang
         * https://github.com/jaywcjlove/cookie.js
         *
         * Licensed under the MIT license.
         */
        (function (f) {
          if (typeof exports === "object" && typeof module !== "undefined") {
            module.exports = f();
          } else if (typeof define === "function" && define.amd) {
            define([], f);
          } else {
            var g;
            if (typeof window !== "undefined") {
              g = window;
            } else if (typeof global !== "undefined") {
              g = global;
            } else if (typeof self !== "undefined") {
              g = self;
            } else {
              g = this;
            }
            g.cookie = f();
          }
        })(function () {
          var define, module, exports;
          function getKeys(obj) {
            var names = [], name = "";
            for (name in obj) {
              if (obj.hasOwnProperty(name)) names.push(name);
            }
            return names;
          }
          function isPlainObject(value) {
            return !!value && Object.prototype.toString.call(value) === "[object Object]";
          }
          function isArray(value) {
            return value instanceof Array;
          }
          function toArray(value) {
            return Array.prototype.slice.call(value);
          }
          function Cookie() {
            if (!(this instanceof Cookie)) {
              return new Cookie();
            }
          }
          Cookie.prototype = {
            get: function (name) {
              var nameEQ = name + "=";
              var ca = document.cookie.split(";");
              //把cookie分割成组
              for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                //取得字符串
                while (c.charAt(0) == " ") {
                  //判断一下字符串有没有前导空格
                  c = c.substring(1, c.length);
                }
                //如果含有我们要的name
                if (c.indexOf(nameEQ) == 0) {
                  return decodeURI(c.substring(nameEQ.length, c.length));
                }
              }
              return false;
            },
            set: function (name, value, options) {
              if (isPlainObject(name)) {
                for (var k in name) {
                  if (name.hasOwnProperty(k)) this.set(k, name[k], value);
                }
              } else {
                var opt = isPlainObject(options) ? options : {
                  expires: options
                }, expires = opt.expires !== undefined ? opt.expires : "", expiresType = typeof expires, path = opt.path !== undefined ? ";path=" + opt.path : ";path=/", domain = opt.domain ? ";domain=" + opt.domain : "", secure = opt.secure ? ";secure" : "";
                //过期时间
                if (expiresType === "string" && expires !== "") expires = new Date(expires); else if (expiresType === "number") expires = new Date(+new Date() + 1e3 * 60 * 60 * 24 * expires);
                if (expires !== "" && "toGMTString" in expires) expires = ";expires=" + expires.toGMTString();
                document.cookie = name + "=" + encodeURI(value) + expires + path + domain + secure;
              }
            },
            remove: function (names) {
              names = isArray(names) ? names : toArray(arguments);
              for (var i = 0, l = names.length; i < l; i++) {
                this.set(names[i], "", -1);
              }
              return names;
            },
            clear: function (name) {
              return name ? this.remove(name) : this.remove(getKeys(this.all()));
            },
            all: function () {
              if (document.cookie === "") return {};
              var cookies = document.cookie.split("; "), result = {};
              for (var i = 0, l = cookies.length; i < l; i++) {
                var item = cookies[i].split("=");
                result[decodeURI(item[0])] = decodeURI(item[1]);
              }
              return result;
            }
          };
          var cookie = function (name, value, options) {
            var argm = arguments;
            if (argm.length === 0) return Cookie().all();
            if (argm.length === 1 && name === null) return Cookie().clear();
            if (argm.length === 2 && !value) return Cookie().clear(name);
            if (typeof name == "string" && !value) return Cookie().get(name);
            if (isPlainObject(name) || argm.length > 1 && name && value) return Cookie().set(name, value, options);
            if (value === null) return Cookie().remove(name);
            return Cookie().all();
          };
          for (var a in Cookie.prototype) cookie[a] = Cookie.prototype[a];
          return cookie;
        });

      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

    }, {}], 3: [function (require, module, exports) {
      (function () {
        var base64map
          = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

          crypt = {
            // Bit-wise rotation left
            rotl: function (n, b) {
              return (n << b) | (n >>> (32 - b));
            },

            // Bit-wise rotation right
            rotr: function (n, b) {
              return (n << (32 - b)) | (n >>> b);
            },

            // Swap big-endian to little-endian and vice versa
            endian: function (n) {
              // If number given, swap endian
              if (n.constructor == Number) {
                return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
              }

              // Else, assume array and swap all items
              for (var i = 0; i < n.length; i++)
                n[i] = crypt.endian(n[i]);
              return n;
            },

            // Generate an array of any length of random bytes
            randomBytes: function (n) {
              for (var bytes = []; n > 0; n--)
                bytes.push(Math.floor(Math.random() * 256));
              return bytes;
            },

            // Convert a byte array to big-endian 32-bit words
            bytesToWords: function (bytes) {
              for (var words = [], i = 0, b = 0; i < bytes.length; i++ , b += 8)
                words[b >>> 5] |= bytes[i] << (24 - b % 32);
              return words;
            },

            // Convert big-endian 32-bit words to a byte array
            wordsToBytes: function (words) {
              for (var bytes = [], b = 0; b < words.length * 32; b += 8)
                bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
              return bytes;
            },

            // Convert a byte array to a hex string
            bytesToHex: function (bytes) {
              for (var hex = [], i = 0; i < bytes.length; i++) {
                hex.push((bytes[i] >>> 4).toString(16));
                hex.push((bytes[i] & 0xF).toString(16));
              }
              return hex.join('');
            },

            // Convert a hex string to a byte array
            hexToBytes: function (hex) {
              for (var bytes = [], c = 0; c < hex.length; c += 2)
                bytes.push(parseInt(hex.substr(c, 2), 16));
              return bytes;
            },

            // Convert a byte array to a base-64 string
            bytesToBase64: function (bytes) {
              for (var base64 = [], i = 0; i < bytes.length; i += 3) {
                var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
                for (var j = 0; j < 4; j++)
                  if (i * 8 + j * 6 <= bytes.length * 8)
                    base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
                  else
                    base64.push('=');
              }
              return base64.join('');
            },

            // Convert a base-64 string to a byte array
            base64ToBytes: function (base64) {
              // Remove non-base-64 characters
              base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

              for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
                imod4 = ++i % 4) {
                if (imod4 == 0) continue;
                bytes.push(((base64map.indexOf(base64.charAt(i - 1))
                  & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
                  | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
              }
              return bytes;
            }
          };

        module.exports = crypt;
      })();

    }, {}], 4: [function (require, module, exports) {
      /*!
       * Determine if an object is a Buffer
       *
       * @author   Feross Aboukhadijeh <https://feross.org>
       * @license  MIT
       */

      // The _isBuffer check is for Safari 5-7 support, because it's missing
      // Object.prototype.constructor. Remove this eventually
      module.exports = function (obj) {
        return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
      }

      function isBuffer(obj) {
        return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
      }

      // For Node v0.10 support. Remove this eventually.
      function isSlowBuffer(obj) {
        return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
      }

    }, {}], 5: [function (require, module, exports) {
      /*!
       * JavaScript Cookie v2.2.0
       * https://github.com/js-cookie/js-cookie
       *
       * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
       * Released under the MIT license
       */
      ; (function (factory) {
        var registeredInModuleLoader = false;
        if (typeof define === 'function' && define.amd) {
          define(factory);
          registeredInModuleLoader = true;
        }
        if (typeof exports === 'object') {
          module.exports = factory();
          registeredInModuleLoader = true;
        }
        if (!registeredInModuleLoader) {
          var OldCookies = window.Cookies;
          var api = window.Cookies = factory();
          api.noConflict = function () {
            window.Cookies = OldCookies;
            return api;
          };
        }
      }(function () {
        function extend() {
          var i = 0;
          var result = {};
          for (; i < arguments.length; i++) {
            var attributes = arguments[i];
            for (var key in attributes) {
              result[key] = attributes[key];
            }
          }
          return result;
        }

        function init(converter) {
          function api(key, value, attributes) {
            var result;
            if (typeof document === 'undefined') {
              return;
            }

            // Write

            if (arguments.length > 1) {
              attributes = extend({
                path: '/'
              }, api.defaults, attributes);

              if (typeof attributes.expires === 'number') {
                var expires = new Date();
                expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
                attributes.expires = expires;
              }

              // We're using "expires" because "max-age" is not supported by IE
              attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

              try {
                result = JSON.stringify(value);
                if (/^[\{\[]/.test(result)) {
                  value = result;
                }
              } catch (e) { }

              if (!converter.write) {
                value = encodeURIComponent(String(value))
                  .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
              } else {
                value = converter.write(value, key);
              }

              key = encodeURIComponent(String(key));
              key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
              key = key.replace(/[\(\)]/g, escape);

              var stringifiedAttributes = '';

              for (var attributeName in attributes) {
                if (!attributes[attributeName]) {
                  continue;
                }
                stringifiedAttributes += '; ' + attributeName;
                if (attributes[attributeName] === true) {
                  continue;
                }
                stringifiedAttributes += '=' + attributes[attributeName];
              }
              return (document.cookie = key + '=' + value + stringifiedAttributes);
            }

            // Read

            if (!key) {
              result = {};
            }

            // To prevent the for loop in the first place assign an empty array
            // in case there are no cookies at all. Also prevents odd result when
            // calling "get()"
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            var rdecode = /(%[0-9A-Z]{2})+/g;
            var i = 0;

            for (; i < cookies.length; i++) {
              var parts = cookies[i].split('=');
              var cookie = parts.slice(1).join('=');

              if (!this.json && cookie.charAt(0) === '"') {
                cookie = cookie.slice(1, -1);
              }

              try {
                var name = parts[0].replace(rdecode, decodeURIComponent);
                cookie = converter.read ?
                  converter.read(cookie, name) : converter(cookie, name) ||
                  cookie.replace(rdecode, decodeURIComponent);

                if (this.json) {
                  try {
                    cookie = JSON.parse(cookie);
                  } catch (e) { }
                }

                if (key === name) {
                  result = cookie;
                  break;
                }

                if (!key) {
                  result[name] = cookie;
                }
              } catch (e) { }
            }

            return result;
          }

          api.set = api;
          api.get = function (key) {
            return api.call(api, key);
          };
          api.getJSON = function () {
            return api.apply({
              json: true
            }, [].slice.call(arguments));
          };
          api.defaults = {};

          api.remove = function (key, attributes) {
            api(key, '', extend(attributes, {
              expires: -1
            }));
          };

          api.withConverter = init;

          return api;
        }

        return init(function () { });
      }));

    }, {}], 6: [function (require, module, exports) {
      (function () {
        var crypt = require('crypt'),
          utf8 = require('charenc').utf8,
          isBuffer = require('is-buffer'),
          bin = require('charenc').bin,

          // The core
          md5 = function (message, options) {
            // Convert to byte array
            if (message.constructor == String)
              if (options && options.encoding === 'binary')
                message = bin.stringToBytes(message);
              else
                message = utf8.stringToBytes(message);
            else if (isBuffer(message))
              message = Array.prototype.slice.call(message, 0);
            else if (!Array.isArray(message))
              message = message.toString();
            // else, assume byte array already

            var m = crypt.bytesToWords(message),
              l = message.length * 8,
              a = 1732584193,
              b = -271733879,
              c = -1732584194,
              d = 271733878;

            // Swap endian
            for (var i = 0; i < m.length; i++) {
              m[i] = ((m[i] << 8) | (m[i] >>> 24)) & 0x00FF00FF |
                ((m[i] << 24) | (m[i] >>> 8)) & 0xFF00FF00;
            }

            // Padding
            m[l >>> 5] |= 0x80 << (l % 32);
            m[(((l + 64) >>> 9) << 4) + 14] = l;

            // Method shortcuts
            var FF = md5._ff,
              GG = md5._gg,
              HH = md5._hh,
              II = md5._ii;

            for (var i = 0; i < m.length; i += 16) {

              var aa = a,
                bb = b,
                cc = c,
                dd = d;

              a = FF(a, b, c, d, m[i + 0], 7, -680876936);
              d = FF(d, a, b, c, m[i + 1], 12, -389564586);
              c = FF(c, d, a, b, m[i + 2], 17, 606105819);
              b = FF(b, c, d, a, m[i + 3], 22, -1044525330);
              a = FF(a, b, c, d, m[i + 4], 7, -176418897);
              d = FF(d, a, b, c, m[i + 5], 12, 1200080426);
              c = FF(c, d, a, b, m[i + 6], 17, -1473231341);
              b = FF(b, c, d, a, m[i + 7], 22, -45705983);
              a = FF(a, b, c, d, m[i + 8], 7, 1770035416);
              d = FF(d, a, b, c, m[i + 9], 12, -1958414417);
              c = FF(c, d, a, b, m[i + 10], 17, -42063);
              b = FF(b, c, d, a, m[i + 11], 22, -1990404162);
              a = FF(a, b, c, d, m[i + 12], 7, 1804603682);
              d = FF(d, a, b, c, m[i + 13], 12, -40341101);
              c = FF(c, d, a, b, m[i + 14], 17, -1502002290);
              b = FF(b, c, d, a, m[i + 15], 22, 1236535329);

              a = GG(a, b, c, d, m[i + 1], 5, -165796510);
              d = GG(d, a, b, c, m[i + 6], 9, -1069501632);
              c = GG(c, d, a, b, m[i + 11], 14, 643717713);
              b = GG(b, c, d, a, m[i + 0], 20, -373897302);
              a = GG(a, b, c, d, m[i + 5], 5, -701558691);
              d = GG(d, a, b, c, m[i + 10], 9, 38016083);
              c = GG(c, d, a, b, m[i + 15], 14, -660478335);
              b = GG(b, c, d, a, m[i + 4], 20, -405537848);
              a = GG(a, b, c, d, m[i + 9], 5, 568446438);
              d = GG(d, a, b, c, m[i + 14], 9, -1019803690);
              c = GG(c, d, a, b, m[i + 3], 14, -187363961);
              b = GG(b, c, d, a, m[i + 8], 20, 1163531501);
              a = GG(a, b, c, d, m[i + 13], 5, -1444681467);
              d = GG(d, a, b, c, m[i + 2], 9, -51403784);
              c = GG(c, d, a, b, m[i + 7], 14, 1735328473);
              b = GG(b, c, d, a, m[i + 12], 20, -1926607734);

              a = HH(a, b, c, d, m[i + 5], 4, -378558);
              d = HH(d, a, b, c, m[i + 8], 11, -2022574463);
              c = HH(c, d, a, b, m[i + 11], 16, 1839030562);
              b = HH(b, c, d, a, m[i + 14], 23, -35309556);
              a = HH(a, b, c, d, m[i + 1], 4, -1530992060);
              d = HH(d, a, b, c, m[i + 4], 11, 1272893353);
              c = HH(c, d, a, b, m[i + 7], 16, -155497632);
              b = HH(b, c, d, a, m[i + 10], 23, -1094730640);
              a = HH(a, b, c, d, m[i + 13], 4, 681279174);
              d = HH(d, a, b, c, m[i + 0], 11, -358537222);
              c = HH(c, d, a, b, m[i + 3], 16, -722521979);
              b = HH(b, c, d, a, m[i + 6], 23, 76029189);
              a = HH(a, b, c, d, m[i + 9], 4, -640364487);
              d = HH(d, a, b, c, m[i + 12], 11, -421815835);
              c = HH(c, d, a, b, m[i + 15], 16, 530742520);
              b = HH(b, c, d, a, m[i + 2], 23, -995338651);

              a = II(a, b, c, d, m[i + 0], 6, -198630844);
              d = II(d, a, b, c, m[i + 7], 10, 1126891415);
              c = II(c, d, a, b, m[i + 14], 15, -1416354905);
              b = II(b, c, d, a, m[i + 5], 21, -57434055);
              a = II(a, b, c, d, m[i + 12], 6, 1700485571);
              d = II(d, a, b, c, m[i + 3], 10, -1894986606);
              c = II(c, d, a, b, m[i + 10], 15, -1051523);
              b = II(b, c, d, a, m[i + 1], 21, -2054922799);
              a = II(a, b, c, d, m[i + 8], 6, 1873313359);
              d = II(d, a, b, c, m[i + 15], 10, -30611744);
              c = II(c, d, a, b, m[i + 6], 15, -1560198380);
              b = II(b, c, d, a, m[i + 13], 21, 1309151649);
              a = II(a, b, c, d, m[i + 4], 6, -145523070);
              d = II(d, a, b, c, m[i + 11], 10, -1120210379);
              c = II(c, d, a, b, m[i + 2], 15, 718787259);
              b = II(b, c, d, a, m[i + 9], 21, -343485551);

              a = (a + aa) >>> 0;
              b = (b + bb) >>> 0;
              c = (c + cc) >>> 0;
              d = (d + dd) >>> 0;
            }

            return crypt.endian([a, b, c, d]);
          };

        // Auxiliary functions
        md5._ff = function (a, b, c, d, x, s, t) {
          var n = a + (b & c | ~b & d) + (x >>> 0) + t;
          return ((n << s) | (n >>> (32 - s))) + b;
        };
        md5._gg = function (a, b, c, d, x, s, t) {
          var n = a + (b & d | c & ~d) + (x >>> 0) + t;
          return ((n << s) | (n >>> (32 - s))) + b;
        };
        md5._hh = function (a, b, c, d, x, s, t) {
          var n = a + (b ^ c ^ d) + (x >>> 0) + t;
          return ((n << s) | (n >>> (32 - s))) + b;
        };
        md5._ii = function (a, b, c, d, x, s, t) {
          var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
          return ((n << s) | (n >>> (32 - s))) + b;
        };

        // Package private blocksize
        md5._blocksize = 16;
        md5._digestsize = 16;

        module.exports = function (message, options) {
          if (message === undefined || message === null)
            throw new Error('Illegal argument ' + message);

          var digestbytes = crypt.wordsToBytes(md5(message, options));
          return options && options.asBytes ? digestbytes :
            options && options.asString ? bin.bytesToString(digestbytes) :
              crypt.bytesToHex(digestbytes);
        };

      })();

    }, { "charenc": 1, "crypt": 3, "is-buffer": 4 }], 7: [function (require, module, exports) {
      'use strict';

      var replace = String.prototype.replace;
      var percentTwenties = /%20/g;

      module.exports = {
        'default': 'RFC3986',
        formatters: {
          RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
          },
          RFC3986: function (value) {
            return value;
          }
        },
        RFC1738: 'RFC1738',
        RFC3986: 'RFC3986'
      };

    }, {}], 8: [function (require, module, exports) {
      'use strict';

      var stringify = require('./stringify');
      var parse = require('./parse');
      var formats = require('./formats');

      module.exports = {
        formats: formats,
        parse: parse,
        stringify: stringify
      };

    }, { "./formats": 7, "./parse": 9, "./stringify": 10 }], 9: [function (require, module, exports) {
      'use strict';

      var utils = require('./utils');

      var has = Object.prototype.hasOwnProperty;

      var defaults = {
        allowDots: false,
        allowPrototypes: false,
        arrayLimit: 20,
        decoder: utils.decode,
        delimiter: '&',
        depth: 5,
        parameterLimit: 1000,
        plainObjects: false,
        strictNullHandling: false
      };

      var parseValues = function parseQueryStringValues(str, options) {
        var obj = {};
        var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
        var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
        var parts = cleanStr.split(options.delimiter, limit);

        for (var i = 0; i < parts.length; ++i) {
          var part = parts[i];

          var bracketEqualsPos = part.indexOf(']=');
          var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

          var key, val;
          if (pos === -1) {
            key = options.decoder(part, defaults.decoder);
            val = options.strictNullHandling ? null : '';
          } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder);
            val = options.decoder(part.slice(pos + 1), defaults.decoder);
          }
          if (has.call(obj, key)) {
            obj[key] = [].concat(obj[key]).concat(val);
          } else {
            obj[key] = val;
          }
        }

        return obj;
      };

      var parseObject = function (chain, val, options) {
        var leaf = val;

        for (var i = chain.length - 1; i >= 0; --i) {
          var obj;
          var root = chain[i];

          if (root === '[]') {
            obj = [];
            obj = obj.concat(leaf);
          } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (
              !isNaN(index)
              && root !== cleanRoot
              && String(index) === cleanRoot
              && index >= 0
              && (options.parseArrays && index <= options.arrayLimit)
            ) {
              obj = [];
              obj[index] = leaf;
            } else {
              obj[cleanRoot] = leaf;
            }
          }

          leaf = obj;
        }

        return leaf;
      };

      var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
        if (!givenKey) {
          return;
        }

        // Transform dot notation to bracket notation
        var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

        // The regex chunks

        var brackets = /(\[[^[\]]*])/;
        var child = /(\[[^[\]]*])/g;

        // Get the parent

        var segment = brackets.exec(key);
        var parent = segment ? key.slice(0, segment.index) : key;

        // Stash the parent if it exists

        var keys = [];
        if (parent) {
          // If we aren't using plain objects, optionally prefix keys
          // that would overwrite object prototype properties
          if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
              return;
            }
          }

          keys.push(parent);
        }

        // Loop through children appending to the array until we hit depth

        var i = 0;
        while ((segment = child.exec(key)) !== null && i < options.depth) {
          i += 1;
          if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
              return;
            }
          }
          keys.push(segment[1]);
        }

        // If there's a remainder, just add whatever is left

        if (segment) {
          keys.push('[' + key.slice(segment.index) + ']');
        }

        return parseObject(keys, val, options);
      };

      module.exports = function (str, opts) {
        var options = opts ? utils.assign({}, opts) : {};

        if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
          throw new TypeError('Decoder has to be a function.');
        }

        options.ignoreQueryPrefix = options.ignoreQueryPrefix === true;
        options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
        options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
        options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
        options.parseArrays = options.parseArrays !== false;
        options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
        options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
        options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
        options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
        options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
        options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

        if (str === '' || str === null || typeof str === 'undefined') {
          return options.plainObjects ? Object.create(null) : {};
        }

        var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
        var obj = options.plainObjects ? Object.create(null) : {};

        // Iterate over the keys and setup the new object

        var keys = Object.keys(tempObj);
        for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          var newObj = parseKeys(key, tempObj[key], options);
          obj = utils.merge(obj, newObj, options);
        }

        return utils.compact(obj);
      };

    }, { "./utils": 11 }], 10: [function (require, module, exports) {
      'use strict';

      var utils = require('./utils');
      var formats = require('./formats');

      var arrayPrefixGenerators = {
        brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
          return prefix + '[]';
        },
        indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
          return prefix + '[' + key + ']';
        },
        repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
          return prefix;
        }
      };

      var toISO = Date.prototype.toISOString;

      var defaults = {
        delimiter: '&',
        encode: true,
        encoder: utils.encode,
        encodeValuesOnly: false,
        serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
          return toISO.call(date);
        },
        skipNulls: false,
        strictNullHandling: false
      };

      var stringify = function stringify( // eslint-disable-line func-name-matching
        object,
        prefix,
        generateArrayPrefix,
        strictNullHandling,
        skipNulls,
        encoder,
        filter,
        sort,
        allowDots,
        serializeDate,
        formatter,
        encodeValuesOnly
      ) {
        var obj = object;
        if (typeof filter === 'function') {
          obj = filter(prefix, obj);
        } else if (obj instanceof Date) {
          obj = serializeDate(obj);
        } else if (obj === null) {
          if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder) : prefix;
          }

          obj = '';
        }

        if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
          if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder))];
          }
          return [formatter(prefix) + '=' + formatter(String(obj))];
        }

        var values = [];

        if (typeof obj === 'undefined') {
          return values;
        }

        var objKeys;
        if (Array.isArray(filter)) {
          objKeys = filter;
        } else {
          var keys = Object.keys(obj);
          objKeys = sort ? keys.sort(sort) : keys;
        }

        for (var i = 0; i < objKeys.length; ++i) {
          var key = objKeys[i];

          if (skipNulls && obj[key] === null) {
            continue;
          }

          if (Array.isArray(obj)) {
            values = values.concat(stringify(
              obj[key],
              generateArrayPrefix(prefix, key),
              generateArrayPrefix,
              strictNullHandling,
              skipNulls,
              encoder,
              filter,
              sort,
              allowDots,
              serializeDate,
              formatter,
              encodeValuesOnly
            ));
          } else {
            values = values.concat(stringify(
              obj[key],
              prefix + (allowDots ? '.' + key : '[' + key + ']'),
              generateArrayPrefix,
              strictNullHandling,
              skipNulls,
              encoder,
              filter,
              sort,
              allowDots,
              serializeDate,
              formatter,
              encodeValuesOnly
            ));
          }
        }

        return values;
      };

      module.exports = function (object, opts) {
        var obj = object;
        var options = opts ? utils.assign({}, opts) : {};

        if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
          throw new TypeError('Encoder has to be a function.');
        }

        var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
        var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
        var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
        var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
        var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;
        var sort = typeof options.sort === 'function' ? options.sort : null;
        var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
        var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
        var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;
        if (typeof options.format === 'undefined') {
          options.format = formats['default'];
        } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
          throw new TypeError('Unknown format option provided.');
        }
        var formatter = formats.formatters[options.format];
        var objKeys;
        var filter;

        if (typeof options.filter === 'function') {
          filter = options.filter;
          obj = filter('', obj);
        } else if (Array.isArray(options.filter)) {
          filter = options.filter;
          objKeys = filter;
        }

        var keys = [];

        if (typeof obj !== 'object' || obj === null) {
          return '';
        }

        var arrayFormat;
        if (options.arrayFormat in arrayPrefixGenerators) {
          arrayFormat = options.arrayFormat;
        } else if ('indices' in options) {
          arrayFormat = options.indices ? 'indices' : 'repeat';
        } else {
          arrayFormat = 'indices';
        }

        var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

        if (!objKeys) {
          objKeys = Object.keys(obj);
        }

        if (sort) {
          objKeys.sort(sort);
        }

        for (var i = 0; i < objKeys.length; ++i) {
          var key = objKeys[i];

          if (skipNulls && obj[key] === null) {
            continue;
          }

          keys = keys.concat(stringify(
            obj[key],
            key,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encode ? encoder : null,
            filter,
            sort,
            allowDots,
            serializeDate,
            formatter,
            encodeValuesOnly
          ));
        }

        var joined = keys.join(delimiter);
        var prefix = options.addQueryPrefix === true ? '?' : '';

        return joined.length > 0 ? prefix + joined : '';
      };

    }, { "./formats": 7, "./utils": 11 }], 11: [function (require, module, exports) {
      'use strict';

      var has = Object.prototype.hasOwnProperty;

      var hexTable = (function () {
        var array = [];
        for (var i = 0; i < 256; ++i) {
          array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
        }

        return array;
      }());

      var compactQueue = function compactQueue(queue) {
        var obj;

        while (queue.length) {
          var item = queue.pop();
          obj = item.obj[item.prop];

          if (Array.isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
              if (typeof obj[j] !== 'undefined') {
                compacted.push(obj[j]);
              }
            }

            item.obj[item.prop] = compacted;
          }
        }

        return obj;
      };

      exports.arrayToObject = function arrayToObject(source, options) {
        var obj = options && options.plainObjects ? Object.create(null) : {};
        for (var i = 0; i < source.length; ++i) {
          if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
          }
        }

        return obj;
      };

      exports.merge = function merge(target, source, options) {
        if (!source) {
          return target;
        }

        if (typeof source !== 'object') {
          if (Array.isArray(target)) {
            target.push(source);
          } else if (typeof target === 'object') {
            if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {
              target[source] = true;
            }
          } else {
            return [target, source];
          }

          return target;
        }

        if (typeof target !== 'object') {
          return [target].concat(source);
        }

        var mergeTarget = target;
        if (Array.isArray(target) && !Array.isArray(source)) {
          mergeTarget = exports.arrayToObject(target, options);
        }

        if (Array.isArray(target) && Array.isArray(source)) {
          source.forEach(function (item, i) {
            if (has.call(target, i)) {
              if (target[i] && typeof target[i] === 'object') {
                target[i] = exports.merge(target[i], item, options);
              } else {
                target.push(item);
              }
            } else {
              target[i] = item;
            }
          });
          return target;
        }

        return Object.keys(source).reduce(function (acc, key) {
          var value = source[key];

          if (has.call(acc, key)) {
            acc[key] = exports.merge(acc[key], value, options);
          } else {
            acc[key] = value;
          }
          return acc;
        }, mergeTarget);
      };

      exports.assign = function assignSingleSource(target, source) {
        return Object.keys(source).reduce(function (acc, key) {
          acc[key] = source[key];
          return acc;
        }, target);
      };

      exports.decode = function (str) {
        try {
          return decodeURIComponent(str.replace(/\+/g, ' '));
        } catch (e) {
          return str;
        }
      };

      exports.encode = function encode(str) {
        // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
        // It has been adapted here for stricter adherence to RFC 3986
        if (str.length === 0) {
          return str;
        }

        var string = typeof str === 'string' ? str : String(str);

        var out = '';
        for (var i = 0; i < string.length; ++i) {
          var c = string.charCodeAt(i);

          if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
          ) {
            out += string.charAt(i);
            continue;
          }

          if (c < 0x80) {
            out = out + hexTable[c];
            continue;
          }

          if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
          }

          if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
          }

          i += 1;
          c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
          out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
        }

        return out;
      };

      exports.compact = function compact(value) {
        var queue = [{ obj: { o: value }, prop: 'o' }];
        var refs = [];

        for (var i = 0; i < queue.length; ++i) {
          var item = queue[i];
          var obj = item.obj[item.prop];

          var keys = Object.keys(obj);
          for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
              queue.push({ obj: obj, prop: key });
              refs.push(val);
            }
          }
        }

        return compactQueue(queue);
      };

      exports.isRegExp = function isRegExp(obj) {
        return Object.prototype.toString.call(obj) === '[object RegExp]';
      };

      exports.isBuffer = function isBuffer(obj) {
        if (obj === null || typeof obj === 'undefined') {
          return false;
        }

        return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
      };

    }, {}], 12: [function (require, module, exports) {
      'use strict';

      var has = Object.prototype.hasOwnProperty;

      /**
       * Decode a URI encoded string.
       *
       * @param {String} input The URI encoded string.
       * @returns {String} The decoded string.
       * @api private
       */
      function decode(input) {
        return decodeURIComponent(input.replace(/\+/g, ' '));
      }

      /**
       * Simple query string parser.
       *
       * @param {String} query The query string that needs to be parsed.
       * @returns {Object}
       * @api public
       */
      function querystring(query) {
        var parser = /([^=?&]+)=?([^&]*)/g
          , result = {}
          , part;

        //
        // Little nifty parsing hack, leverage the fact that RegExp.exec increments
        // the lastIndex property so we can continue executing this loop until we've
        // parsed all results.
        //
        for (;
          part = parser.exec(query);
          result[decode(part[1])] = decode(part[2])
        );

        return result;
      }

      /**
       * Transform a query string to an object.
       *
       * @param {Object} obj Object that should be transformed.
       * @param {String} prefix Optional prefix.
       * @returns {String}
       * @api public
       */
      function querystringify(obj, prefix) {
        prefix = prefix || '';

        var pairs = [];

        //
        // Optionally prefix with a '?' if needed
        //
        if ('string' !== typeof prefix) prefix = '?';

        for (var key in obj) {
          if (has.call(obj, key)) {
            pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
          }
        }

        return pairs.length ? prefix + pairs.join('&') : '';
      }

      //
      // Expose the module.
      //
      exports.stringify = querystringify;
      exports.parse = querystring;

    }, {}], 13: [function (require, module, exports) {
      'use strict';

      /**
       * Check if we're required to add a port number.
       *
       * @see https://url.spec.whatwg.org/#default-port
       * @param {Number|String} port Port number we need to check
       * @param {String} protocol Protocol we need to check against.
       * @returns {Boolean} Is it a default port for the given protocol
       * @api private
       */
      module.exports = function required(port, protocol) {
        protocol = protocol.split(':')[0];
        port = +port;

        if (!port) return false;

        switch (protocol) {
          case 'http':
          case 'ws':
            return port !== 80;

          case 'https':
          case 'wss':
            return port !== 443;

          case 'ftp':
            return port !== 21;

          case 'gopher':
            return port !== 70;

          case 'file':
            return false;
        }

        return port !== 0;
      };

    }, {}], 14: [function (require, module, exports) {
      (function (global) {
        'use strict';

        var required = require('requires-port')
          , qs = require('querystringify')
          , protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i
          , slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;

        /**
         * These are the parse rules for the URL parser, it informs the parser
         * about:
         *
         * 0. The char it Needs to parse, if it's a string it should be done using
         *    indexOf, RegExp using exec and NaN means set as current value.
         * 1. The property we should set when parsing this value.
         * 2. Indication if it's backwards or forward parsing, when set as number it's
         *    the value of extra chars that should be split off.
         * 3. Inherit from location if non existing in the parser.
         * 4. `toLowerCase` the resulting value.
         */
        var rules = [
          ['#', 'hash'],                        // Extract from the back.
          ['?', 'query'],                       // Extract from the back.
          ['/', 'pathname'],                    // Extract from the back.
          ['@', 'auth', 1],                     // Extract from the front.
          [NaN, 'host', undefined, 1, 1],       // Set left over value.
          [/:(\d+)$/, 'port', undefined, 1],    // RegExp the back.
          [NaN, 'hostname', undefined, 1, 1]    // Set left over.
        ];

        /**
         * These properties should not be copied or inherited from. This is only needed
         * for all non blob URL's as a blob URL does not include a hash, only the
         * origin.
         *
         * @type {Object}
         * @private
         */
        var ignore = { hash: 1, query: 1 };

        /**
         * The location object differs when your code is loaded through a normal page,
         * Worker or through a worker using a blob. And with the blobble begins the
         * trouble as the location object will contain the URL of the blob, not the
         * location of the page where our code is loaded in. The actual origin is
         * encoded in the `pathname` so we can thankfully generate a good "default"
         * location from it so we can generate proper relative URL's again.
         *
         * @param {Object|String} loc Optional default location object.
         * @returns {Object} lolcation object.
         * @api public
         */
        function lolcation(loc) {
          loc = loc || global.location || {};

          var finaldestination = {}
            , type = typeof loc
            , key;

          if ('blob:' === loc.protocol) {
            finaldestination = new URL(unescape(loc.pathname), {});
          } else if ('string' === type) {
            finaldestination = new URL(loc, {});
            for (key in ignore) delete finaldestination[key];
          } else if ('object' === type) {
            for (key in loc) {
              if (key in ignore) continue;
              finaldestination[key] = loc[key];
            }

            if (finaldestination.slashes === undefined) {
              finaldestination.slashes = slashes.test(loc.href);
            }
          }

          return finaldestination;
        }

        /**
         * @typedef ProtocolExtract
         * @type Object
         * @property {String} protocol Protocol matched in the URL, in lowercase.
         * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
         * @property {String} rest Rest of the URL that is not part of the protocol.
         */

        /**
         * Extract protocol information from a URL with/without double slash ("//").
         *
         * @param {String} address URL we want to extract from.
         * @return {ProtocolExtract} Extracted information.
         * @api private
         */
        function extractProtocol(address) {
          var match = protocolre.exec(address);

          return {
            protocol: match[1] ? match[1].toLowerCase() : '',
            slashes: !!match[2],
            rest: match[3]
          };
        }

        /**
         * Resolve a relative URL pathname against a base URL pathname.
         *
         * @param {String} relative Pathname of the relative URL.
         * @param {String} base Pathname of the base URL.
         * @return {String} Resolved pathname.
         * @api private
         */
        function resolve(relative, base) {
          var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/'))
            , i = path.length
            , last = path[i - 1]
            , unshift = false
            , up = 0;

          while (i--) {
            if (path[i] === '.') {
              path.splice(i, 1);
            } else if (path[i] === '..') {
              path.splice(i, 1);
              up++;
            } else if (up) {
              if (i === 0) unshift = true;
              path.splice(i, 1);
              up--;
            }
          }

          if (unshift) path.unshift('');
          if (last === '.' || last === '..') path.push('');

          return path.join('/');
        }

        /**
         * The actual URL instance. Instead of returning an object we've opted-in to
         * create an actual constructor as it's much more memory efficient and
         * faster and it pleases my OCD.
         *
         * @constructor
         * @param {String} address URL we want to parse.
         * @param {Object|String} location Location defaults for relative paths.
         * @param {Boolean|Function} parser Parser for the query string.
         * @api public
         */
        function URL(address, location, parser) {
          if (!(this instanceof URL)) {
            return new URL(address, location, parser);
          }

          var relative, extracted, parse, instruction, index, key
            , instructions = rules.slice()
            , type = typeof location
            , url = this
            , i = 0;

          //
          // The following if statements allows this module two have compatibility with
          // 2 different API:
          //
          // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
          //    where the boolean indicates that the query string should also be parsed.
          //
          // 2. The `URL` interface of the browser which accepts a URL, object as
          //    arguments. The supplied object will be used as default values / fall-back
          //    for relative paths.
          //
          if ('object' !== type && 'string' !== type) {
            parser = location;
            location = null;
          }

          if (parser && 'function' !== typeof parser) parser = qs.parse;

          location = lolcation(location);

          //
          // Extract protocol information before running the instructions.
          //
          extracted = extractProtocol(address || '');
          relative = !extracted.protocol && !extracted.slashes;
          url.slashes = extracted.slashes || relative && location.slashes;
          url.protocol = extracted.protocol || location.protocol || '';
          address = extracted.rest;

          //
          // When the authority component is absent the URL starts with a path
          // component.
          //
          if (!extracted.slashes) instructions[2] = [/(.*)/, 'pathname'];

          for (; i < instructions.length; i++) {
            instruction = instructions[i];
            parse = instruction[0];
            key = instruction[1];

            if (parse !== parse) {
              url[key] = address;
            } else if ('string' === typeof parse) {
              if (~(index = address.indexOf(parse))) {
                if ('number' === typeof instruction[2]) {
                  url[key] = address.slice(0, index);
                  address = address.slice(index + instruction[2]);
                } else {
                  url[key] = address.slice(index);
                  address = address.slice(0, index);
                }
              }
            } else if ((index = parse.exec(address))) {
              url[key] = index[1];
              address = address.slice(0, index.index);
            }

            url[key] = url[key] || (
              relative && instruction[3] ? location[key] || '' : ''
            );

            //
            // Hostname, host and protocol should be lowercased so they can be used to
            // create a proper `origin`.
            //
            if (instruction[4]) url[key] = url[key].toLowerCase();
          }

          //
          // Also parse the supplied query string in to an object. If we're supplied
          // with a custom parser as function use that instead of the default build-in
          // parser.
          //
          if (parser) url.query = parser(url.query);

          //
          // If the URL is relative, resolve the pathname against the base URL.
          //
          if (
            relative
            && location.slashes
            && url.pathname.charAt(0) !== '/'
            && (url.pathname !== '' || location.pathname !== '')
          ) {
            url.pathname = resolve(url.pathname, location.pathname);
          }

          //
          // We should not add port numbers if they are already the default port number
          // for a given protocol. As the host also contains the port number we're going
          // override it with the hostname which contains no port number.
          //
          if (!required(url.port, url.protocol)) {
            url.host = url.hostname;
            url.port = '';
          }

          //
          // Parse down the `auth` for the username and password.
          //
          url.username = url.password = '';
          if (url.auth) {
            instruction = url.auth.split(':');
            url.username = instruction[0] || '';
            url.password = instruction[1] || '';
          }

          url.origin = url.protocol && url.host && url.protocol !== 'file:'
            ? url.protocol + '//' + url.host
            : 'null';

          //
          // The href is just the compiled result.
          //
          url.href = url.toString();
        }

        /**
         * This is convenience method for changing properties in the URL instance to
         * insure that they all propagate correctly.
         *
         * @param {String} part          Property we need to adjust.
         * @param {Mixed} value          The newly assigned value.
         * @param {Boolean|Function} fn  When setting the query, it will be the function
         *                               used to parse the query.
         *                               When setting the protocol, double slash will be
         *                               removed from the final url if it is true.
         * @returns {URL}
         * @api public
         */
        function set(part, value, fn) {
          var url = this;

          switch (part) {
            case 'query':
              if ('string' === typeof value && value.length) {
                value = (fn || qs.parse)(value);
              }

              url[part] = value;
              break;

            case 'port':
              url[part] = value;

              if (!required(value, url.protocol)) {
                url.host = url.hostname;
                url[part] = '';
              } else if (value) {
                url.host = url.hostname + ':' + value;
              }

              break;

            case 'hostname':
              url[part] = value;

              if (url.port) value += ':' + url.port;
              url.host = value;
              break;

            case 'host':
              url[part] = value;

              if (/:\d+$/.test(value)) {
                value = value.split(':');
                url.port = value.pop();
                url.hostname = value.join(':');
              } else {
                url.hostname = value;
                url.port = '';
              }

              break;

            case 'protocol':
              url.protocol = value.toLowerCase();
              url.slashes = !fn;
              break;

            case 'pathname':
            case 'hash':
              if (value) {
                var char = part === 'pathname' ? '/' : '#';
                url[part] = value.charAt(0) !== char ? char + value : value;
              } else {
                url[part] = value;
              }
              break;

            default:
              url[part] = value;
          }

          for (var i = 0; i < rules.length; i++) {
            var ins = rules[i];

            if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
          }

          url.origin = url.protocol && url.host && url.protocol !== 'file:'
            ? url.protocol + '//' + url.host
            : 'null';

          url.href = url.toString();

          return url;
        }

        /**
         * Transform the properties back in to a valid and full URL string.
         *
         * @param {Function} stringify Optional query stringify function.
         * @returns {String}
         * @api public
         */
        function toString(stringify) {
          if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;

          var query
            , url = this
            , protocol = url.protocol;

          if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

          var result = protocol + (url.slashes ? '//' : '');

          if (url.username) {
            result += url.username;
            if (url.password) result += ':' + url.password;
            result += '@';
          }

          result += url.host + url.pathname;

          query = 'object' === typeof url.query ? stringify(url.query) : url.query;
          if (query) result += '?' !== query.charAt(0) ? '?' + query : query;

          if (url.hash) result += url.hash;

          return result;
        }

        URL.prototype = { set: set, toString: toString };

        //
        // Expose the URL parser and some additional properties that might be useful for
        // others or testing.
        //
        URL.extractProtocol = extractProtocol;
        URL.location = lolcation;
        URL.qs = qs;

        module.exports = URL;

      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

    }, { "querystringify": 12, "requires-port": 13 }], 15: [function (require, module, exports) {
      /*
      * @para Object 对象
      * @return:Object 对象
      * @作用：与 Object.assign 类似
      */
      module.exports = function () {
        var len = arguments.length;
        if (len < 1) { return false; }
        if (len === 1) { return arguments[0]; }
        function isObj(val) {
          return val && val.constructor === Object;
        }
        var queues = [];
        for (var i = 0; i < arguments.length; i++) {
          if (isObj(arguments[i])) {
            queues.push(arguments[i]);
          }
        }
        var dest = queues[0];

        function _as(dd, sd) {
          for (var key in sd) {
            // console.log(key,sd[key])
            if ({}.hasOwnProperty.call(sd, key)) {
              var val;
              if (isObj(sd[key])) {
                if ({}.hasOwnProperty.call(dd, key)) {
                  if (isObj(dd[key])) {
                    val = _as(dd[key], sd[key]);
                  } else {
                    val = sd[key];
                  }
                } else {
                  val = _as({}, sd[key]);
                }
              } else {
                val = sd[key];
              }
              // console.log(key,val)
              dd[key] = val;
            }
          }
          // console.log(dd)
          return dd;
        }

        // 从第二个开始
        for (var j = 1; j < len; j++) {
          var sd = queues[j];
          _as(dest, sd);
        }
        return dest;
      };

    }, {}], 16: [function (require, module, exports) {
      var utils = require('./utils');
      var request = require('./request');
      var daRecommend = require('./da_recommend');
      var log = require('./log');
      var channelStatus = '';
      var channelOptions = {};
      var requestPayload = {};
      var requestPayloadDefault = {
        // 通过 sso 获取的参数 -start
        // 用户名
        uname: '',
        euname: '',
        // 产品 token
        vtoken: ''
        // -end
      };
      var sendQueues = [];
      var handle = {};
      // 每次发送请求前，都会重新生成 payload
      var createRequestPayload = function () {
        var queryData = channelOptions.queryData;
        var payload = channelOptions.payload;
        var global = channelOptions.browser;
        var e = {};
        if (global) {
          if (document) {
            e.url = document.URL || '';
            e.referrer = document.referrer || '';
          }
          if (window && window.screen) {
            e.sh = window.screen.height || 0;
            e.sw = window.screen.width || 0;
          }
          if (navigator) {
            e.lang = navigator.language || '';
          }
        }
        if (queryData) {
          for (var i = 0; i < queryData.length; i += 1) {
            var it = queryData[i];
            var key = it[0],
              val = it[1];

            switch (key) {
              case '_setAccount':
                e.account = val;
                break;
              case '_callback':
                e.callback = val;
                break;
              case '_groupId':
                e.groupId = val;
                break;
              case '_sk':
                e.sk = val;
                break;
              case '_sv':
                e.sv = val;
                break;
              default:
                e[key] = val;
                break;
            }
          }
        }
        if (payload.uname === '0') {
          payload.uname = '';
        }

        // 通过 sso 的 jsonp 回调获取的 uname 和 token
        e.u = payload.uname ? encodeURIComponent(payload.uname) : '';
        e.t = payload.vtoken ? encodeURIComponent(payload.vtoken) : '';

        // log(channelOptions.payload);
        // log(e)
        utils.fn.assign(e, requestPayloadDefault, payload);
        requestPayload = e;
      };

      var sendRequest = function (source, options) {
        var info = {
          name: source
        };
        var reqOps = Object.assign({}, options);

        if (!channelOptions.browser) {
          // 使用传入配置参数的 request 方法
          if (channelOptions.request) {
            if (channelOptions.beforeSendRequest) {
              reqOps.data = channelOptions.beforeSendRequest(info, reqOps) || reqOps.data;
            }
            channelOptions.request({
              url: reqOps.url,
              data: reqOps.data,
              method: 'get',
              success: function (res) {
                reqOps.complete && reqOps.complete(reqOps, res);
              },
              fail: function (err) {
                log('打点失败', err);
              },
              complete: function (res) {
                reqOps.complete && reqOps.complete(reqOps, res);
              }
            });
          } else {
            log('\x1b[91m ' + '错误：请自定义 request 方法' + ' \x1b[0m');
          }
        } else {
          // 使用内置 request 方法
          var methodMap = {
            pageInit: 'script',
            trackEvent: 'image'
          };

          reqOps.type = methodMap[info.name] || reqOps.type;
          request(info, reqOps);
        }
      };

      var fireTrackEvent = function () {
        var payloadPatch,
          cb;
        var args0 = arguments[0];
        var ext = {};

        if (args0 instanceof Array) {
          ext = args0[4] ? args0[4] : {};
          ext = requestPayload.ext ? utils.fn.assign(requestPayload.ext, ext) : ext;
          payloadPatch = {
            category: args0[0],
            daction: args0[1],
            optLabel: args0[2],
            optValue: args0[3],
            ext: JSON.stringify(ext),
            _: new Date().getTime()
          };

          cb = arguments[1];
        } else {
          ext = arguments[4] ? arguments[4] : {};
          ext = requestPayload.ext ? utils.fn.assign(requestPayload.ext, ext) : ext;
          payloadPatch = {
            category: arguments[0],
            daction: arguments[1],
            optLabel: arguments[2],
            optValue: arguments[3],
            ext: JSON.stringify(ext),
            _: new Date().getTime()
          };
          cb = arguments[5];
        }
        // 生成 requestPayload
        createRequestPayload();

        var data = utils.fn.assign(requestPayload, payloadPatch);
        var url = utils.da.buildDomain(channelOptions.env, channelOptions.browser) + '_da_event';

        sendRequest('trackEvent', {
          type: 'get',
          url: url,
          data: data,
          complete: cb
        });
      };

      // 执行页面初始化（pv）
      var firePageInit = function () {
        // 生成 requestPayload
        createRequestPayload();
        var reqOps = {
          type: 'get',
          url: utils.da.buildDomain(channelOptions.env, channelOptions.browser) + '_da',
          data: requestPayload
        };

        reqOps.complete = arguments[0];
        sendRequest('pageInit', reqOps);
      };

      // 执行待请求队列
      var fireSendQueues = function (ops) {
        channelStatus = 'onload';
        // log('onload')
        // log(sendQueues.length)
        if (sendQueues.length) {
          // 执行待执行的队列任务
          for (var i = 0, len = sendQueues.length; i < len; i++) {
            var it = sendQueues[i];
            handle[it.fnName].apply(handle, it.args);
          }
        }
      };

      // 执行 da 初始化配置
      var fireInit = function (ops) {
        utils.fn.assign(channelOptions, ops);
        // 初始化关于推荐内容的统计
        if (channelOptions.browser) {
          daRecommend.init();
        }
      };

      // 执行页面打点
      var fireEvent = function (ename, args) {
        // log('fireEvent', ename, args);
        if (channelOptions.browser && channelStatus !== 'onload') {
          // 涉及浏览器端的发送任务，需等待用户登录信息返回
          if (/pageInit|trackEvent/.test(ename)) {
            sendQueues.push({ fnName: ename, args: args });
            return;
          }
        }

        if (ename === 'trackEvent') {
          fireTrackEvent.apply(null, args);
        } else if (ename === 'pageInit') {
          firePageInit.apply(null, args);
        } else if (ename === 'init') {
          fireInit.apply(null, args);
        } else if (ename === 'userLogin') {
          fireInit.apply(null, args);
          fireSendQueues.apply(null, args);
        } else if (ename === 'optionsUpdate') {
          utils.fn.assign(channelOptions, args[0]);
        }
      };

      handle = {
        trackEvent: function () {
          fireEvent('trackEvent', arguments);
        },
        pageInit: function () {
          fireEvent('pageInit', arguments);
        },
        config: function (ops, source) {
          // log(ops,source)
          fireEvent(source, [ops]);
        }

      };

      module.exports = handle;

    }, { "./da_recommend": 17, "./log": 21, "./request": 22, "./utils": 23 }], 17: [function (require, module, exports) {
      var utils = require('./utils');
      var initRecommendClick = require('./da_recommend_click');
      var initRecommendExpose = require('./da_recommend_expose');
      var log = require('./log');
      var handle = {
        recList: null,
        // 获取可视区域的目标 itemlist 信息
        getItemList: function (column) {
          if (column.getAttribute('data-exposed')) {
            return [];
          }
          var itemListData = [];
          var targetItems = utils.getTargetItems(column);

          if (!targetItems || targetItems.length === 0) {
            return [];
          }
          // log(targetItems);
          for (var key in targetItems) {
            if (utils.hasProp(targetItems, key)) {
              var item = targetItems[key];
              var type = utils.getDaAttr(item, 'type');
              var id = utils.getDaAttr(item, 'id');
              var order = utils.getDaAttr(item, 'order');

              // 获得可选数据
              var optionAttr = utils.getOptionAttrs(item);
              var itemObj = Object.assign({
                id: id,
                type: type,
                order: order
              }, optionAttr);
              itemListData.push(itemObj);
            }
          }
          return itemListData;
        },
        // 获取公用的 column 信息
        getCommonColumnInfo: function (column) {
          return {
            columnid: utils.getDaAttr(column, 'columnid'),
            ralg: utils.getDaAttr(column, 'ralg'),
            plat: utils.getDaAttr(column, 'plat'),
            domain: utils.getDaAttr(column, 'domain'),
            track: utils.getDaAttr(column, 'track')
          };
        },
        // 推荐系统打点的功能的初始化
        init: function () {
          var self = this;
          var recList = document.getElementsByClassName('da_column');
          // 如果没有任何推荐栏目，就没有这个功能
          if (!recList.length) { return; }

          self.initRecommendClick(recList);
          self.initRecommendExpose(recList);

          this.recList = recList;
        },
        // 初始化点击上报
        initRecommendClick: initRecommendClick,
        // 初始化曝光上报
        initRecommendExpose: initRecommendExpose
      };


      module.exports = handle;

    }, { "./da_recommend_click": 18, "./da_recommend_expose": 19, "./log": 21, "./utils": 23 }], 18: [function (require, module, exports) {
      // 初始化点击上报方法
      var Utils = require('./utils');
      var md5Generator = require('md5');
      var cookie = require('cookiejs');
      var parse = require('url-parse');

      // window.parser = parse;
      var initRecommendClick = function (recList) {
        var self = this;
        for (var i = 0; i < recList.length; i++) {
          var recColumn = recList[i];

          (function (recColumn) {
            var info = self.getCommonColumnInfo(recColumn);
            var columnid = info.columnid;
            var ralg = info.ralg;
            var plat = info.plat;
            var domain = info.domain;
            var track = info.track;
            Utils.addEvent(recColumn, 'click', function (e) {
              var item = e.target;
              if (!item.className || item.className.indexOf('da_item') === -1) {
                item = Utils.findAncesItem(item, 'da_item');
              }
              if (!item) {
                // 如果找不到 da_item 就不打点了
                return;
              }
              var itemlist = self.getItemList(recColumn);
              var classes = item.getAttribute('class');
              if (!classes || classes.indexOf('da_item') === -1) {
                return;
              }

              var url = Utils.da.buildDomain() + '_da_event' + Utils.obj2UrlQuery(self.b) + '&daction=click&category=' + columnid;

              var id = Utils.getDaAttr(item, 'id');
              var type = Utils.getDaAttr(item, 'type');
              var order = Utils.getDaAttr(item, 'order');

              var optionAttr = Utils.getOptionAttrs(item);
              // uniqueKey 用于数据组关联点击上报和新页面的页面打点
              var uniqueKey = md5Generator(columnid + '_' + Date.now() + '_' + (Math.random() * 10000));
              var itemObj = Object.assign({
                id: id,
                type: type,
                order: order
              }, optionAttr);
              var ext = {
                itemlist: itemlist,
                item: itemObj,
                ralg: ralg,
                plat: plat,
                domain: domain,
                uniqueKey: uniqueKey
              };

              var extStr = encodeURIComponent(JSON.stringify(ext));
              // 所有额外的数据扔到 ext 里面
              url += '&ext=' + extStr;

              var f = new Image();
              f.src = url;

              // 如果是a标签，则需要处理跳转，在跳转的url后面加时间戳和pid
              if (item.nodeName.toLowerCase() === 'a') {
                var href = item.getAttribute('href');
                var originHref = href;

                if (href) {
                  var trackStr = '';
                  url = parse(href);
                  // 看之前有没有 query
                  var mark = (url && url.query) ? '&' : '?';
                  var pid = encodeURIComponent(cookie.get('_da_pid') ? cookie.get('_da_pid') : '');
                  var pidStr = pid ? '&pid=' + pid : '';

                  // 如果有 track 标记，则需要在 url 的 from 参数下追踪地址
                  if (track && track !== 'null' && track !== '0') {
                    trackStr = '&uniqueKey=' + encodeURIComponent(uniqueKey);
                  }
                  var query = url.query + mark + 't=' + Date.now() + pidStr + trackStr;
                  url.set('query', query);

                  item.setAttribute('href', url.toString());

                  // 恢复原有 href
                  setTimeout(function () {
                    item.setAttribute('href', originHref);
                  }, 300);
                }
              }
            });
          }(recColumn));
        }
      };

      module.exports = initRecommendClick;

    }, { "./utils": 23, "cookiejs": 2, "md5": 6, "url-parse": 14 }], 19: [function (require, module, exports) {
      // 初始化曝光上报功能
      var Utils = require('./utils');
      var md5Generator = require('md5');
      var log = require('./log');
      var initRecommendExpose = function (recList) {
        var self = this;
        // log(recList);
        var scanColumn = function (recColumn) {
          var info = self.getCommonColumnInfo(recColumn);
          var columnid = info.columnid;
          var ralg = info.ralg;
          var plat = info.plat;
          var domain = info.domain;

          // 获取当前可视区域的 itemlist 数据
          var itemlist = self.getItemList(recColumn);
          // 如果目标 column 里没有 item 在可视区域内，就不上报了。
          if (itemlist.length === 0) {
            recColumn.setAttribute('data-last-ext', '');
            return;
          }

          var url = Utils.da.buildDomain() + '_da_event' + Utils.obj2UrlQuery(self.b) + '&daction=expose&category=' + columnid;

          var ext = {
            itemlist: itemlist,
            ralg: ralg,
            plat: plat,
            domain: domain
          };

          var extStr = encodeURIComponent(JSON.stringify(ext));
          var extHash = md5Generator(extStr);
          var lastExtHash = recColumn.getAttribute('data-last-ext');
          // 如果 column 本次曝光数据和上次一样，则不发送请求
          if (extHash === lastExtHash) {
            // return;
          } else {
            // 所有额外的数据扔到 ext 里面
            url += ('&ext=' + extStr);
            var f = new Image();
            f.src = url;
            recColumn.setAttribute('data-last-ext', extHash);
          }
        };

        var targetFunc = Utils.debounce(function () {
          for (var i = 0; i < recList.length; i++) {
            var recColumn = recList[i];

            scanColumn(recColumn);
          }
        }, 1000);

        // 绑定滚动事件
        var container = document.querySelector('.da-container');
        if (container) {
          Utils.addEvent(container, 'scroll', targetFunc);
        } else {
          Utils.addEvent(window, 'scroll', targetFunc);
        }

        // 每个 column 加载好了之后先曝光一次
        for (var i = 0; i < recList.length; i++) {
          // 每一个推荐区域
          var recColumn = recList[i];
          var timer = setInterval(function () {
            // log('scaning...')
            // 当推荐内容由各业务 js 动态渲染时，data-done 由业务 js 动态操纵
            if (recColumn.getAttribute('data-done')) {
              scanColumn(recColumn);
              clearInterval(timer);
            }
          }, 200);
        }
      };

      module.exports = initRecommendExpose;

    }, { "./log": 21, "./utils": 23, "md5": 6 }], 20: [function (require, module, exports) {
      /* eslint no-underscore-dangle:0 */

      var utils = require('./utils.js');
      var daHandle = require('./da_handle.js');
      var jsCookie = require('js-cookie');
      var md5 = require('md5');
      var log = require('./log');
      var cookieIdKey = 'dxy_da_cookie-id';

      var mainOptions = {
        // 依照 DA 部署文档注入
        queryData: [],
        // 请求pv、uv时携带的参数
        payload: {},
        // 是否监听hash变化触发pv、uv统计
        bindHash: false,
        // 自定义请求方法
        request: null,
        // 自定义数据统计渠道。
        sendChannel: {
          da: true
          // ga:true,
          // mta:true
        },
        // 使用场景为浏览器
        browser: true,
        env: 'production',
        // 登录用户信息
        userInfo: {},
        // 兼容处理
        fixConfig: {},
        // 发送打点数据前，设置打点数据，如无该需求，可不设置
        beforeSendRequest: null
      };

      // 所有统计渠道
      var channelHandle = {
        da: daHandle
        // 'mta':require('./mta_handle')
      };

      // 遍历各种统计渠道
      var channelEach = function (cb) {
        for (var key in mainOptions.sendChannel) {
          // log(key)
          if (utils.hasProp(mainOptions.sendChannel, key)) {
            var val = mainOptions.sendChannel[key];
            if (val) {
              var _handle = channelHandle[key];
              if (cb && _handle) {
                // log(key, _handle)
                cb(_handle, key);
              }
            }
          }
        }
      };

      var requestDxySSO = function () {
        var callbackFnName = '_da_oun';
        var scriptUserLogin = function () {
          var a = document.getElementsByTagName('script')[0];
          var ssoUrl = 'https://auth.dxy.' + utils.da.buildSuffix(mainOptions.env) + '/account/userlogin.do?callback=' + callbackFnName;
          var forSso = document.createElement('script');
          forSso.type = 'text/javascript';
          forSso.src = ssoUrl;
          forSso.async = true;
          forSso.onerror = function () {
            window[callbackFnName]('', '', '');
          };
          // log(forSso)
          a.parentNode.insertBefore(forSso, a);
        };

        // _da_oun 是核心方法,需要向前兼容
        window[callbackFnName] = function (uname, euname, vtoken) {
          var ops = {
            payload: {
              uname: uname,
              euname: euname,
              vtoken: vtoken
            }
          };
          channelEach(function (n) {
            n.config(ops, 'userLogin');
            mainOptions.userInfo = ops;
          });
        };

        // 获取用户登录信息
        scriptUserLogin();
      };

      // 与数据组约定的算法
      var createId = function (name) {
        // 当前时间戳
        var curDateTime = Date.now().toString();
        // 10位随机数
        var random10 = (function (min, max) {
          return Math.floor(min + (Math.random() * (max - min)));
        }(1000000000, 9999999999));

        var cid = md5(curDateTime + random10) + curDateTime;
        var rlt;
        if (name === 'cookie_id') {
          rlt = cid;
        } else if (name === 'page_id') {
          rlt = md5(cid) + curDateTime;
        }
        return rlt;
      };

      // 检查 cookie_id 的合法性，规则如下
      // 1.长度小于等于 48 位，且大于 2 位
      // 2.字母（包括大写或小写）和数字是必须的，可以有中划线 -
      // 3.不可以是 纯数字、纯字母、纯中划线
      var checkCookieId = function (cookieIdVal) {
        return (/^(?![0-9]+$)(?![a-zA-Z]+$)(?!-+$)[0-9A-Za-z-]{2,48}$/).test(cookieIdVal);
      };

      // 设置 cookie_id
      var setCookieId = function () {
        var daCidVal = null;
        var getId = mainOptions.browser ? jsCookie.get : mainOptions.storage.get;
        var setId = mainOptions.browser ? jsCookie.set : mainOptions.storage.set;

        // 获取保留字段的值
        daCidVal = getId(cookieIdKey);
        // 无值
        if (!daCidVal) {
          var oldDaCidVal = null;
          // 提供旧字段
          if (mainOptions.fixConfig.cookieIdKey) {
            oldDaCidVal = getId(mainOptions.fixConfig.cookieIdKey);
          }

          // 旧数据移动时，规范性校验
          if (oldDaCidVal && checkCookieId(oldDaCidVal)) {
            // 将旧字段的数据进行拷贝
            daCidVal = oldDaCidVal;
          } else {
            // 新生成数据
            daCidVal = createId('cookie_id');
          }

          // 写入本地存储
          setId(cookieIdKey, daCidVal);
        }
        mainOptions.payload.cookie_id = daCidVal;
      };

      // 检查 page_id
      var createPageId = function () {
        var rlt = {
          payload: {
            page_id: createId('page_id')
          }
        };
        utils.fn.assign(mainOptions, rlt);
        return rlt;
      };

      var handle = {
        // 初始配置
        config: function (ops) {
          utils.fn.assign(mainOptions, ops);
          setCookieId();
          createPageId();

          // 各统计渠道初始化
          channelEach(function (n) {
            n.config(mainOptions, 'init');
          });

          // 定义全局方法
          if (mainOptions.browser) {
            // 获取丁香园用户登录信息
            requestDxySSO();

            // 开启监听 hash 变化，触发 pv 统计
            if (mainOptions.bindHash) {
              utils.addEvent(window, 'hashchange', function () {
                if (document.URL.indexOf('#/') !== -1) {
                  // 触发 pv
                  handle.pageInit();
                }
              });
            }

            // 自动触发 pv 一次
            channelEach(function (n) {
              n.pageInit();
            });
          }

          return this;
        },

        // 初始化，触发 pv、uv
        pageInit: function () {
          var args = arguments;
          // log(args);
          // 生成新的 page_id
          var pidConfig = createPageId();
          channelEach(function (n) {
            // 更新渠道配置的 page_id
            n.config(pidConfig, 'optionsUpdate');
            n.pageInit.apply(n, args);
          });
        },

        // 打点方法
        trackEvent: function () {
          var args = arguments;
          // log(args);
          channelEach(function (n) {
            n.trackEvent.apply(n, args);
          });
        },
        // 获取 cookieId 的值
        getCookieId: function () {
          var getId = mainOptions.browser ? jsCookie.get : mainOptions.storage.get;
          return getId(cookieIdKey);
        }
      };

      // 浏览器端，注册全局方法，自动初始化
      if (utils.isBrowser()) {
        // 自动初始化
        if (utils.isObject(window._daq)) {
          var cfg = utils.fn.assign({
            queryData: window._daq
          }, window._daConfig);
          handle.config(cfg);
        }

        // window 注册打点方法
        window._daTrackEvent = function () {
          var args = arguments;
          channelEach(function (n) {
            n.trackEvent.apply(null, args);
          });
        };

        // 通过内部参数转化，兼容两种序列的参数
        window._daTrackEventCallback = window._daTrackEvent;
      }

      module.exports = handle;


    }, { "./da_handle.js": 16, "./log": 21, "./utils.js": 23, "js-cookie": 5, "md5": 6 }], 21: [function (require, module, exports) {
      module.exports = console.log;

    }, {}], 22: [function (require, module, exports) {
      var utils = require('./utils');
      var qs = require('qs');
      var log = require('./log');

      var request_image = function (ops) {
        var f = new Image();
        var data = ops.data;
        data._ = Date.now();
        var url = ops.url + '?' + qs.stringify(data);
        var cb = ops.complete;
        f.src = url;
        if (cb) {
          f.style.display = 'none';
          document.body.appendChild(f);
          f.onload = function () {
            cb(data);
            document.body.removeChild(f);
          };
        }
      };

      var request_script = function (ops) {
        var a = document.getElementsByTagName('script')[0];
        var head = a.parentNode;
        var d = document.createElement('script');
        var data = ops.data;
        // 添加时间戳;
        data._ = Date.now();
        var url = ops.url + '?' + qs.stringify(data);
        var cb = ops.complete;
        d.type = 'text/javascript';
        d.async = true;
        d.src = url;
        head.insertBefore(d, a);
        // 加载完之后删除 script 标签,以免 hash 变化后，标签越来越多
        d.onload = function () {
          cb && cb(data);
          if (head) {
            head.removeChild(d);
          }
        };
      };

      function request(info, ops) {
        // log("request", ops)
        switch (ops.type) {
          case 'script':
            request_script(ops);

            break;

          case 'image':
            request_image(ops);

            break;

          default:
            utils.ajax(ops);
            break;
        }
      }

      module.exports = request;

    }, { "./log": 21, "./utils": 23, "qs": 8 }], 23: [function (require, module, exports) {
      var assign = require('./assign.js');
      var log = require('./log');

      var handle = {
        hasProp: function (obj, key) {
          return Object.prototype.hasOwnProperty.call(obj, key);
        },
        isBrowser: function () {
          return (typeof window === 'object') && (typeof navigator === 'object' || typeof userAgent === 'string');
        },
        isString: function (val) {
          return typeof val === 'string';
        },
        isObject: function (val) {
          return typeof val === 'object';
        },
        fn: {
          assign: assign
        }
      };

      handle.da = {
        /**
         * 返回：当前环境下的后缀
         */
        buildSuffix: function (env) {
          // log(env);
          if (!env) return 'cn';
          var suffix = env.toLowerCase() === 'develop' ? 'net' : 'cn';
          // log(suffix)
          return suffix;
        },
        /**
         * 返回：当前环境下的 da 完整域名
         */
        buildDomain: function (env, browser) {
          // log(env)
          var suffix = this.buildSuffix(env);
          var protocol = browser === false ? 'https:' : '';

          return protocol + '//da.dxy.' + suffix + '/';
        }
      };


      // 检查当前的 hash 变化是否属于单页面应用的哈希路由方法
      handle.checkHash = function (callback) {
        if (document.URL.indexOf('#/') !== -1) {
          callback();
        }
      };

      /**
       * 参数：
       * dom: 原生dom对象
       * 返回：是否在页面可视区域内
       */
      handle.domInScreen = function (dom) {
        var rect = dom.getBoundingClientRect();
        var inScreen = (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= window.innerHeight &&
          rect.right <= window.innerWidth);
        return inScreen;
      };

      /**
       * 参数：
       * items：所有目标column内的item列表
       * 返回：所有感兴趣的item的列表（在可视区域内且未被曝光过）
       */

      handle.getTargetItems = function (column) {
        var items = column.getElementsByClassName('da_item');
        var targetItems = Array.from(items).filter(function (o, i) {
          return handle.domInScreen(o);
        });

        return targetItems;
      };

      /**
       * 参数：
       * items：目标 item
       * 返回：目标 item 中所有可选 da 打点数据的键值对
       */
      handle.getOptionAttrs = function (item) {
        var attrArray = Array.from(item.attributes);

        var optionAttrObj = {};

        attrArray.forEach(function (o) {
          if (o.name && o.name.indexOf('data-dao-') === 0) {
            var key = o.name.substring(9);
            optionAttrObj[key] = o.value;
          }
        });
        return optionAttrObj;
      };

      handle.getDaAttr = function (dom, attrName) {
        return encodeURIComponent(dom.getAttribute('data-da-' + attrName));
      };

      /**
       * debounce 的简单实现
       * @param {Function} func 需要被debounce的方法
       * @param {Number} wait 延迟执行时间
       */
      handle.debounce = function (func, wait) {
        var timer;
        return function (args) {
          var context = this;
          clearTimeout(timer);
          timer = setTimeout(function () {
            func.apply(context, args);
          }, wait);
        };
      };

      /**
       * 兼容事件绑定
       * @param {*} dom
       * @param {*} event
       * @param {*} callback
       */

      handle.addEvent = function (dom, event, callback) {
        if (window.addEventListener) {
          dom.addEventListener(event, callback);
        } else {
          dom.attachEvent(event, callback);
        }
      };

      /**
       * 把对象转成http参数字符串
       * @param {*} param
       */
      handle.obj2UrlQuery = function (param) {
        if (!param) return '';
        var paramStr = '';
        for (var i in param) {
          if ({}.hasOwnProperty.call(param, i)) {
            paramStr += (paramStr ? '&' : '?') + i + '=' + encodeURIComponent(param[i]);
          }
        }
        return paramStr;
      };

      handle.findAncesItem = function (dom, className) {
        var target = null;
        var parent = null;
        do {
          parent = dom.parentElement;
          if (parent && parent.className && parent.className.indexOf(className) !== -1) {
            target = parent;
            parent = document;
          }
          dom = parent;
        } while (parent !== document);

        return target;
      };

      handle.ajax = function (options) {
        var _cfg = {
          url: '', // [string],
          data: null, // [object],
          type: 'GET', // [string],
          dataType: 'json', // [string],
          async: true,
          contentType: 'application/x-www-form-urlencoded',
          time: 0,
          complete: null,
          success: null, // [function],
          error: null // [function],
        };

        var _fn = {
          extend: assign,
          formatParams: function (data) {
            var arr = [];
            for (var name in data) {
              if ({}.hasOwnProperty.call(data, name)) {
                arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
              }
            }
            return arr.join('&');
          },
          _jsonp: null
        };

        _fn.extend(_cfg, options);
        // --start

        // log(_cfg)

        // -jsonp
        if (_cfg.dataType === 'jsonp') {
          _fn._jsonp && _fn._jsonp(_cfg);

          return;
        }

        // -json
        _cfg.type = _cfg.type.toUpperCase();
        var params = _fn.formatParams(_cfg.data);
        // log(params)
        // 创建 - 非IE6 - 第一步
        var xhr;
        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
        } else { // IE6及其以下版本浏览器
          xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        // 定义接收 - 第二步
        xhr.onreadystatechange = function () {
          _cfg.complete && _cfg.complete(xhr);

          if (xhr.readyState === 4) {
            var status = xhr.status;

            if (status >= 200 && status < 300) {
              var response;
              if (_cfg.dataType === 'json') {
                // response = eval('(' + xhr.responseText + ')');
                try {
                  response = JSON.parse(xhr.responseText);
                } catch (error) {
                  response = {};
                }
              } else {
                response = xhr.responseText;
              }
              _cfg.success && _cfg.success(response);
            } else {
              _cfg.error && _cfg.error(status);
            }
          }
        };

        // 连接 和 发送 - 第三步
        if (_cfg.type.toLocaleLowerCase() === 'get') {
          if (params) {
            params = '?' + params;
          }
          xhr.open('GET', _cfg.url + params, _cfg.async);
          xhr.send(null);
          _cfg.complete && _cfg.complete(_cfg.url + params);
        } else if (_cfg.type.toLocaleLowerCase() === 'post') {
          xhr.open('POST', _cfg.url, true);
          // 设置表单提交时的内容类型
          xhr.setRequestHeader('Content-Type', _cfg.contentType);
          xhr.send(params);
          _cfg.complete && _cfg.complete(params);
        }
      };

      module.exports = handle;

    }, { "./assign.js": 15, "./log": 21 }]
  }, {}, [20])(20)
});

  //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvY2hhcmVuYy9jaGFyZW5jLmpzIiwibm9kZV9tb2R1bGVzL2Nvb2tpZWpzL2Rpc3QvY29va2llLmpzIiwibm9kZV9tb2R1bGVzL2NyeXB0L2NyeXB0LmpzIiwibm9kZV9tb2R1bGVzL2lzLWJ1ZmZlci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9qcy1jb29raWUvc3JjL2pzLmNvb2tpZS5qcyIsIm5vZGVfbW9kdWxlcy9tZDUvbWQ1LmpzIiwibm9kZV9tb2R1bGVzL3FzL2xpYi9mb3JtYXRzLmpzIiwibm9kZV9tb2R1bGVzL3FzL2xpYi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9xcy9saWIvcGFyc2UuanMiLCJub2RlX21vZHVsZXMvcXMvbGliL3N0cmluZ2lmeS5qcyIsIm5vZGVfbW9kdWxlcy9xcy9saWIvdXRpbHMuanMiLCJub2RlX21vZHVsZXMvcXVlcnlzdHJpbmdpZnkvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVxdWlyZXMtcG9ydC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy91cmwtcGFyc2UvaW5kZXguanMiLCJzcmMvYXNzaWduLmpzIiwic3JjL2RhX2hhbmRsZS5qcyIsInNyYy9kYV9yZWNvbW1lbmQuanMiLCJzcmMvZGFfcmVjb21tZW5kX2NsaWNrLmpzIiwic3JjL2RhX3JlY29tbWVuZF9leHBvc2UuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvbG9nLmpzIiwic3JjL3JlcXVlc3QuanMiLCJzcmMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDckhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzVaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25QQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFQQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwidmFyIGNoYXJlbmMgPSB7XG4gIC8vIFVURi04IGVuY29kaW5nXG4gIHV0Zjg6IHtcbiAgICAvLyBDb252ZXJ0IGEgc3RyaW5nIHRvIGEgYnl0ZSBhcnJheVxuICAgIHN0cmluZ1RvQnl0ZXM6IGZ1bmN0aW9uKHN0cikge1xuICAgICAgcmV0dXJuIGNoYXJlbmMuYmluLnN0cmluZ1RvQnl0ZXModW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHN0cikpKTtcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBhIGJ5dGUgYXJyYXkgdG8gYSBzdHJpbmdcbiAgICBieXRlc1RvU3RyaW5nOiBmdW5jdGlvbihieXRlcykge1xuICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlc2NhcGUoY2hhcmVuYy5iaW4uYnl0ZXNUb1N0cmluZyhieXRlcykpKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gQmluYXJ5IGVuY29kaW5nXG4gIGJpbjoge1xuICAgIC8vIENvbnZlcnQgYSBzdHJpbmcgdG8gYSBieXRlIGFycmF5XG4gICAgc3RyaW5nVG9CeXRlczogZnVuY3Rpb24oc3RyKSB7XG4gICAgICBmb3IgKHZhciBieXRlcyA9IFtdLCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKylcbiAgICAgICAgYnl0ZXMucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpO1xuICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgYnl0ZSBhcnJheSB0byBhIHN0cmluZ1xuICAgIGJ5dGVzVG9TdHJpbmc6IGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICBmb3IgKHZhciBzdHIgPSBbXSwgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkrKylcbiAgICAgICAgc3RyLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSkpO1xuICAgICAgcmV0dXJuIHN0ci5qb2luKCcnKTtcbiAgICB9XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2hhcmVuYztcbiIsIi8qIVxuICogY29va2llanMgdjEuMC4xM1xuICogQ2hhbmdlIHRoZSBjb29raWUgbGlicmFyeSBhIHNpbXBsZSBBUEkgcHJvdmlkZXNcbiAqIFxuICogQ29weXJpZ2h0IChjKSAyMDE3IGtlbm55IHdhbmdcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9qYXl3Y2psb3ZlL2Nvb2tpZS5qc1xuICogXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKi9cbihmdW5jdGlvbihmKSB7XG4gICAgaWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBtb2R1bGUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmKCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW10sIGYpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBnO1xuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgZyA9IHdpbmRvdztcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBnID0gZ2xvYmFsO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBnID0gc2VsZjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGcgPSB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGcuY29va2llID0gZigpO1xuICAgIH1cbn0pKGZ1bmN0aW9uKCkge1xuICAgIHZhciBkZWZpbmUsIG1vZHVsZSwgZXhwb3J0cztcbiAgICBmdW5jdGlvbiBnZXRLZXlzKG9iaikge1xuICAgICAgICB2YXIgbmFtZXMgPSBbXSwgbmFtZSA9IFwiXCI7XG4gICAgICAgIGZvciAobmFtZSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkobmFtZSkpIG5hbWVzLnB1c2gobmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5hbWVzO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gICAgICAgIHJldHVybiAhIXZhbHVlICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09IFwiW29iamVjdCBPYmplY3RdXCI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzQXJyYXkodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgQXJyYXk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRvQXJyYXkodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHZhbHVlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gQ29va2llKCkge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgQ29va2llKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBDb29raWUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBDb29raWUucHJvdG90eXBlID0ge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgICAgIHZhciBuYW1lRVEgPSBuYW1lICsgXCI9XCI7XG4gICAgICAgICAgICB2YXIgY2EgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoXCI7XCIpO1xuICAgICAgICAgICAgLy/miopjb29raWXliIblibLmiJDnu4QgICAgXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGMgPSBjYVtpXTtcbiAgICAgICAgICAgICAgICAvL+WPluW+l+Wtl+espuS4siAgICBcbiAgICAgICAgICAgICAgICB3aGlsZSAoYy5jaGFyQXQoMCkgPT0gXCIgXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy/liKTmlq3kuIDkuIvlrZfnrKbkuLLmnInmsqHmnInliY3lr7znqbrmoLwgICAgXG4gICAgICAgICAgICAgICAgICAgIGMgPSBjLnN1YnN0cmluZygxLCBjLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8v5aaC5p6c5ZCr5pyJ5oiR5Lus6KaB55qEbmFtZVxuICAgICAgICAgICAgICAgIGlmIChjLmluZGV4T2YobmFtZUVRKSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWNvZGVVUkkoYy5zdWJzdHJpbmcobmFtZUVRLmxlbmd0aCwgYy5sZW5ndGgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24obmFtZSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChpc1BsYWluT2JqZWN0KG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgayBpbiBuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuYW1lLmhhc093blByb3BlcnR5KGspKSB0aGlzLnNldChrLCBuYW1lW2tdLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgb3B0ID0gaXNQbGFpbk9iamVjdChvcHRpb25zKSA/IG9wdGlvbnMgOiB7XG4gICAgICAgICAgICAgICAgICAgIGV4cGlyZXM6IG9wdGlvbnNcbiAgICAgICAgICAgICAgICB9LCBleHBpcmVzID0gb3B0LmV4cGlyZXMgIT09IHVuZGVmaW5lZCA/IG9wdC5leHBpcmVzIDogXCJcIiwgZXhwaXJlc1R5cGUgPSB0eXBlb2YgZXhwaXJlcywgcGF0aCA9IG9wdC5wYXRoICE9PSB1bmRlZmluZWQgPyBcIjtwYXRoPVwiICsgb3B0LnBhdGggOiBcIjtwYXRoPS9cIiwgZG9tYWluID0gb3B0LmRvbWFpbiA/IFwiO2RvbWFpbj1cIiArIG9wdC5kb21haW4gOiBcIlwiLCBzZWN1cmUgPSBvcHQuc2VjdXJlID8gXCI7c2VjdXJlXCIgOiBcIlwiO1xuICAgICAgICAgICAgICAgIC8v6L+H5pyf5pe26Ze0XG4gICAgICAgICAgICAgICAgaWYgKGV4cGlyZXNUeXBlID09PSBcInN0cmluZ1wiICYmIGV4cGlyZXMgIT09IFwiXCIpIGV4cGlyZXMgPSBuZXcgRGF0ZShleHBpcmVzKTsgZWxzZSBpZiAoZXhwaXJlc1R5cGUgPT09IFwibnVtYmVyXCIpIGV4cGlyZXMgPSBuZXcgRGF0ZSgrbmV3IERhdGUoKSArIDFlMyAqIDYwICogNjAgKiAyNCAqIGV4cGlyZXMpO1xuICAgICAgICAgICAgICAgIGlmIChleHBpcmVzICE9PSBcIlwiICYmIFwidG9HTVRTdHJpbmdcIiBpbiBleHBpcmVzKSBleHBpcmVzID0gXCI7ZXhwaXJlcz1cIiArIGV4cGlyZXMudG9HTVRTdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBuYW1lICsgXCI9XCIgKyBlbmNvZGVVUkkodmFsdWUpICsgZXhwaXJlcyArIHBhdGggKyBkb21haW4gKyBzZWN1cmU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24obmFtZXMpIHtcbiAgICAgICAgICAgIG5hbWVzID0gaXNBcnJheShuYW1lcykgPyBuYW1lcyA6IHRvQXJyYXkoYXJndW1lbnRzKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbmFtZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXQobmFtZXNbaV0sIFwiXCIsIC0xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuYW1lcztcbiAgICAgICAgfSxcbiAgICAgICAgY2xlYXI6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBuYW1lID8gdGhpcy5yZW1vdmUobmFtZSkgOiB0aGlzLnJlbW92ZShnZXRLZXlzKHRoaXMuYWxsKCkpKTtcbiAgICAgICAgfSxcbiAgICAgICAgYWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5jb29raWUgPT09IFwiXCIpIHJldHVybiB7fTtcbiAgICAgICAgICAgIHZhciBjb29raWVzID0gZG9jdW1lbnQuY29va2llLnNwbGl0KFwiOyBcIiksIHJlc3VsdCA9IHt9O1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBjb29raWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBpdGVtID0gY29va2llc1tpXS5zcGxpdChcIj1cIik7XG4gICAgICAgICAgICAgICAgcmVzdWx0W2RlY29kZVVSSShpdGVtWzBdKV0gPSBkZWNvZGVVUkkoaXRlbVsxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfTtcbiAgICB2YXIgY29va2llID0gZnVuY3Rpb24obmFtZSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGFyZ20gPSBhcmd1bWVudHM7XG4gICAgICAgIGlmIChhcmdtLmxlbmd0aCA9PT0gMCkgcmV0dXJuIENvb2tpZSgpLmFsbCgpO1xuICAgICAgICBpZiAoYXJnbS5sZW5ndGggPT09IDEgJiYgbmFtZSA9PT0gbnVsbCkgcmV0dXJuIENvb2tpZSgpLmNsZWFyKCk7XG4gICAgICAgIGlmIChhcmdtLmxlbmd0aCA9PT0gMiAmJiAhdmFsdWUpIHJldHVybiBDb29raWUoKS5jbGVhcihuYW1lKTtcbiAgICAgICAgaWYgKHR5cGVvZiBuYW1lID09IFwic3RyaW5nXCIgJiYgIXZhbHVlKSByZXR1cm4gQ29va2llKCkuZ2V0KG5hbWUpO1xuICAgICAgICBpZiAoaXNQbGFpbk9iamVjdChuYW1lKSB8fCBhcmdtLmxlbmd0aCA+IDEgJiYgbmFtZSAmJiB2YWx1ZSkgcmV0dXJuIENvb2tpZSgpLnNldChuYW1lLCB2YWx1ZSwgb3B0aW9ucyk7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuIENvb2tpZSgpLnJlbW92ZShuYW1lKTtcbiAgICAgICAgcmV0dXJuIENvb2tpZSgpLmFsbCgpO1xuICAgIH07XG4gICAgZm9yICh2YXIgYSBpbiBDb29raWUucHJvdG90eXBlKSBjb29raWVbYV0gPSBDb29raWUucHJvdG90eXBlW2FdO1xuICAgIHJldHVybiBjb29raWU7XG59KTtcbiIsIihmdW5jdGlvbigpIHtcbiAgdmFyIGJhc2U2NG1hcFxuICAgICAgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLycsXG5cbiAgY3J5cHQgPSB7XG4gICAgLy8gQml0LXdpc2Ugcm90YXRpb24gbGVmdFxuICAgIHJvdGw6IGZ1bmN0aW9uKG4sIGIpIHtcbiAgICAgIHJldHVybiAobiA8PCBiKSB8IChuID4+PiAoMzIgLSBiKSk7XG4gICAgfSxcblxuICAgIC8vIEJpdC13aXNlIHJvdGF0aW9uIHJpZ2h0XG4gICAgcm90cjogZnVuY3Rpb24obiwgYikge1xuICAgICAgcmV0dXJuIChuIDw8ICgzMiAtIGIpKSB8IChuID4+PiBiKTtcbiAgICB9LFxuXG4gICAgLy8gU3dhcCBiaWctZW5kaWFuIHRvIGxpdHRsZS1lbmRpYW4gYW5kIHZpY2UgdmVyc2FcbiAgICBlbmRpYW46IGZ1bmN0aW9uKG4pIHtcbiAgICAgIC8vIElmIG51bWJlciBnaXZlbiwgc3dhcCBlbmRpYW5cbiAgICAgIGlmIChuLmNvbnN0cnVjdG9yID09IE51bWJlcikge1xuICAgICAgICByZXR1cm4gY3J5cHQucm90bChuLCA4KSAmIDB4MDBGRjAwRkYgfCBjcnlwdC5yb3RsKG4sIDI0KSAmIDB4RkYwMEZGMDA7XG4gICAgICB9XG5cbiAgICAgIC8vIEVsc2UsIGFzc3VtZSBhcnJheSBhbmQgc3dhcCBhbGwgaXRlbXNcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbi5sZW5ndGg7IGkrKylcbiAgICAgICAgbltpXSA9IGNyeXB0LmVuZGlhbihuW2ldKTtcbiAgICAgIHJldHVybiBuO1xuICAgIH0sXG5cbiAgICAvLyBHZW5lcmF0ZSBhbiBhcnJheSBvZiBhbnkgbGVuZ3RoIG9mIHJhbmRvbSBieXRlc1xuICAgIHJhbmRvbUJ5dGVzOiBmdW5jdGlvbihuKSB7XG4gICAgICBmb3IgKHZhciBieXRlcyA9IFtdOyBuID4gMDsgbi0tKVxuICAgICAgICBieXRlcy5wdXNoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NikpO1xuICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgYnl0ZSBhcnJheSB0byBiaWctZW5kaWFuIDMyLWJpdCB3b3Jkc1xuICAgIGJ5dGVzVG9Xb3JkczogZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIGZvciAodmFyIHdvcmRzID0gW10sIGkgPSAwLCBiID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSsrLCBiICs9IDgpXG4gICAgICAgIHdvcmRzW2IgPj4+IDVdIHw9IGJ5dGVzW2ldIDw8ICgyNCAtIGIgJSAzMik7XG4gICAgICByZXR1cm4gd29yZHM7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYmlnLWVuZGlhbiAzMi1iaXQgd29yZHMgdG8gYSBieXRlIGFycmF5XG4gICAgd29yZHNUb0J5dGVzOiBmdW5jdGlvbih3b3Jkcykge1xuICAgICAgZm9yICh2YXIgYnl0ZXMgPSBbXSwgYiA9IDA7IGIgPCB3b3Jkcy5sZW5ndGggKiAzMjsgYiArPSA4KVxuICAgICAgICBieXRlcy5wdXNoKCh3b3Jkc1tiID4+PiA1XSA+Pj4gKDI0IC0gYiAlIDMyKSkgJiAweEZGKTtcbiAgICAgIHJldHVybiBieXRlcztcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBhIGJ5dGUgYXJyYXkgdG8gYSBoZXggc3RyaW5nXG4gICAgYnl0ZXNUb0hleDogZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIGZvciAodmFyIGhleCA9IFtdLCBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGhleC5wdXNoKChieXRlc1tpXSA+Pj4gNCkudG9TdHJpbmcoMTYpKTtcbiAgICAgICAgaGV4LnB1c2goKGJ5dGVzW2ldICYgMHhGKS50b1N0cmluZygxNikpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGhleC5qb2luKCcnKTtcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBhIGhleCBzdHJpbmcgdG8gYSBieXRlIGFycmF5XG4gICAgaGV4VG9CeXRlczogZnVuY3Rpb24oaGV4KSB7XG4gICAgICBmb3IgKHZhciBieXRlcyA9IFtdLCBjID0gMDsgYyA8IGhleC5sZW5ndGg7IGMgKz0gMilcbiAgICAgICAgYnl0ZXMucHVzaChwYXJzZUludChoZXguc3Vic3RyKGMsIDIpLCAxNikpO1xuICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgYnl0ZSBhcnJheSB0byBhIGJhc2UtNjQgc3RyaW5nXG4gICAgYnl0ZXNUb0Jhc2U2NDogZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIGZvciAodmFyIGJhc2U2NCA9IFtdLCBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAzKSB7XG4gICAgICAgIHZhciB0cmlwbGV0ID0gKGJ5dGVzW2ldIDw8IDE2KSB8IChieXRlc1tpICsgMV0gPDwgOCkgfCBieXRlc1tpICsgMl07XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgNDsgaisrKVxuICAgICAgICAgIGlmIChpICogOCArIGogKiA2IDw9IGJ5dGVzLmxlbmd0aCAqIDgpXG4gICAgICAgICAgICBiYXNlNjQucHVzaChiYXNlNjRtYXAuY2hhckF0KCh0cmlwbGV0ID4+PiA2ICogKDMgLSBqKSkgJiAweDNGKSk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgYmFzZTY0LnB1c2goJz0nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBiYXNlNjQuam9pbignJyk7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYSBiYXNlLTY0IHN0cmluZyB0byBhIGJ5dGUgYXJyYXlcbiAgICBiYXNlNjRUb0J5dGVzOiBmdW5jdGlvbihiYXNlNjQpIHtcbiAgICAgIC8vIFJlbW92ZSBub24tYmFzZS02NCBjaGFyYWN0ZXJzXG4gICAgICBiYXNlNjQgPSBiYXNlNjQucmVwbGFjZSgvW15BLVowLTkrXFwvXS9pZywgJycpO1xuXG4gICAgICBmb3IgKHZhciBieXRlcyA9IFtdLCBpID0gMCwgaW1vZDQgPSAwOyBpIDwgYmFzZTY0Lmxlbmd0aDtcbiAgICAgICAgICBpbW9kNCA9ICsraSAlIDQpIHtcbiAgICAgICAgaWYgKGltb2Q0ID09IDApIGNvbnRpbnVlO1xuICAgICAgICBieXRlcy5wdXNoKCgoYmFzZTY0bWFwLmluZGV4T2YoYmFzZTY0LmNoYXJBdChpIC0gMSkpXG4gICAgICAgICAgICAmIChNYXRoLnBvdygyLCAtMiAqIGltb2Q0ICsgOCkgLSAxKSkgPDwgKGltb2Q0ICogMikpXG4gICAgICAgICAgICB8IChiYXNlNjRtYXAuaW5kZXhPZihiYXNlNjQuY2hhckF0KGkpKSA+Pj4gKDYgLSBpbW9kNCAqIDIpKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYnl0ZXM7XG4gICAgfVxuICB9O1xuXG4gIG1vZHVsZS5leHBvcnRzID0gY3J5cHQ7XG59KSgpO1xuIiwiLyohXG4gKiBEZXRlcm1pbmUgaWYgYW4gb2JqZWN0IGlzIGEgQnVmZmVyXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuXG4vLyBUaGUgX2lzQnVmZmVyIGNoZWNrIGlzIGZvciBTYWZhcmkgNS03IHN1cHBvcnQsIGJlY2F1c2UgaXQncyBtaXNzaW5nXG4vLyBPYmplY3QucHJvdG90eXBlLmNvbnN0cnVjdG9yLiBSZW1vdmUgdGhpcyBldmVudHVhbGx5XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAhPSBudWxsICYmIChpc0J1ZmZlcihvYmopIHx8IGlzU2xvd0J1ZmZlcihvYmopIHx8ICEhb2JqLl9pc0J1ZmZlcilcbn1cblxuZnVuY3Rpb24gaXNCdWZmZXIgKG9iaikge1xuICByZXR1cm4gISFvYmouY29uc3RydWN0b3IgJiYgdHlwZW9mIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIob2JqKVxufVxuXG4vLyBGb3IgTm9kZSB2MC4xMCBzdXBwb3J0LiBSZW1vdmUgdGhpcyBldmVudHVhbGx5LlxuZnVuY3Rpb24gaXNTbG93QnVmZmVyIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmoucmVhZEZsb2F0TEUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIG9iai5zbGljZSA9PT0gJ2Z1bmN0aW9uJyAmJiBpc0J1ZmZlcihvYmouc2xpY2UoMCwgMCkpXG59XG4iLCIvKiFcbiAqIEphdmFTY3JpcHQgQ29va2llIHYyLjIuMFxuICogaHR0cHM6Ly9naXRodWIuY29tL2pzLWNvb2tpZS9qcy1jb29raWVcbiAqXG4gKiBDb3B5cmlnaHQgMjAwNiwgMjAxNSBLbGF1cyBIYXJ0bCAmIEZhZ25lciBCcmFja1xuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbjsoZnVuY3Rpb24gKGZhY3RvcnkpIHtcblx0dmFyIHJlZ2lzdGVyZWRJbk1vZHVsZUxvYWRlciA9IGZhbHNlO1xuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKGZhY3RvcnkpO1xuXHRcdHJlZ2lzdGVyZWRJbk1vZHVsZUxvYWRlciA9IHRydWU7XG5cdH1cblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRcdHJlZ2lzdGVyZWRJbk1vZHVsZUxvYWRlciA9IHRydWU7XG5cdH1cblx0aWYgKCFyZWdpc3RlcmVkSW5Nb2R1bGVMb2FkZXIpIHtcblx0XHR2YXIgT2xkQ29va2llcyA9IHdpbmRvdy5Db29raWVzO1xuXHRcdHZhciBhcGkgPSB3aW5kb3cuQ29va2llcyA9IGZhY3RvcnkoKTtcblx0XHRhcGkubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHdpbmRvdy5Db29raWVzID0gT2xkQ29va2llcztcblx0XHRcdHJldHVybiBhcGk7XG5cdFx0fTtcblx0fVxufShmdW5jdGlvbiAoKSB7XG5cdGZ1bmN0aW9uIGV4dGVuZCAoKSB7XG5cdFx0dmFyIGkgPSAwO1xuXHRcdHZhciByZXN1bHQgPSB7fTtcblx0XHRmb3IgKDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGF0dHJpYnV0ZXMgPSBhcmd1bWVudHNbIGkgXTtcblx0XHRcdGZvciAodmFyIGtleSBpbiBhdHRyaWJ1dGVzKSB7XG5cdFx0XHRcdHJlc3VsdFtrZXldID0gYXR0cmlidXRlc1trZXldO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0ZnVuY3Rpb24gaW5pdCAoY29udmVydGVyKSB7XG5cdFx0ZnVuY3Rpb24gYXBpIChrZXksIHZhbHVlLCBhdHRyaWJ1dGVzKSB7XG5cdFx0XHR2YXIgcmVzdWx0O1xuXHRcdFx0aWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBXcml0ZVxuXG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcblx0XHRcdFx0YXR0cmlidXRlcyA9IGV4dGVuZCh7XG5cdFx0XHRcdFx0cGF0aDogJy8nXG5cdFx0XHRcdH0sIGFwaS5kZWZhdWx0cywgYXR0cmlidXRlcyk7XG5cblx0XHRcdFx0aWYgKHR5cGVvZiBhdHRyaWJ1dGVzLmV4cGlyZXMgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdFx0dmFyIGV4cGlyZXMgPSBuZXcgRGF0ZSgpO1xuXHRcdFx0XHRcdGV4cGlyZXMuc2V0TWlsbGlzZWNvbmRzKGV4cGlyZXMuZ2V0TWlsbGlzZWNvbmRzKCkgKyBhdHRyaWJ1dGVzLmV4cGlyZXMgKiA4NjRlKzUpO1xuXHRcdFx0XHRcdGF0dHJpYnV0ZXMuZXhwaXJlcyA9IGV4cGlyZXM7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBXZSdyZSB1c2luZyBcImV4cGlyZXNcIiBiZWNhdXNlIFwibWF4LWFnZVwiIGlzIG5vdCBzdXBwb3J0ZWQgYnkgSUVcblx0XHRcdFx0YXR0cmlidXRlcy5leHBpcmVzID0gYXR0cmlidXRlcy5leHBpcmVzID8gYXR0cmlidXRlcy5leHBpcmVzLnRvVVRDU3RyaW5nKCkgOiAnJztcblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHJlc3VsdCA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcblx0XHRcdFx0XHRpZiAoL15bXFx7XFxbXS8udGVzdChyZXN1bHQpKSB7XG5cdFx0XHRcdFx0XHR2YWx1ZSA9IHJlc3VsdDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHt9XG5cblx0XHRcdFx0aWYgKCFjb252ZXJ0ZXIud3JpdGUpIHtcblx0XHRcdFx0XHR2YWx1ZSA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcodmFsdWUpKVxuXHRcdFx0XHRcdFx0LnJlcGxhY2UoLyUoMjN8MjR8MjZ8MkJ8M0F8M0N8M0V8M0R8MkZ8M0Z8NDB8NUJ8NUR8NUV8NjB8N0J8N0R8N0MpL2csIGRlY29kZVVSSUNvbXBvbmVudCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFsdWUgPSBjb252ZXJ0ZXIud3JpdGUodmFsdWUsIGtleSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRrZXkgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGtleSkpO1xuXHRcdFx0XHRrZXkgPSBrZXkucmVwbGFjZSgvJSgyM3wyNHwyNnwyQnw1RXw2MHw3QykvZywgZGVjb2RlVVJJQ29tcG9uZW50KTtcblx0XHRcdFx0a2V5ID0ga2V5LnJlcGxhY2UoL1tcXChcXCldL2csIGVzY2FwZSk7XG5cblx0XHRcdFx0dmFyIHN0cmluZ2lmaWVkQXR0cmlidXRlcyA9ICcnO1xuXG5cdFx0XHRcdGZvciAodmFyIGF0dHJpYnV0ZU5hbWUgaW4gYXR0cmlidXRlcykge1xuXHRcdFx0XHRcdGlmICghYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSkge1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHN0cmluZ2lmaWVkQXR0cmlidXRlcyArPSAnOyAnICsgYXR0cmlidXRlTmFtZTtcblx0XHRcdFx0XHRpZiAoYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHN0cmluZ2lmaWVkQXR0cmlidXRlcyArPSAnPScgKyBhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiAoZG9jdW1lbnQuY29va2llID0ga2V5ICsgJz0nICsgdmFsdWUgKyBzdHJpbmdpZmllZEF0dHJpYnV0ZXMpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZWFkXG5cblx0XHRcdGlmICgha2V5KSB7XG5cdFx0XHRcdHJlc3VsdCA9IHt9O1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBUbyBwcmV2ZW50IHRoZSBmb3IgbG9vcCBpbiB0aGUgZmlyc3QgcGxhY2UgYXNzaWduIGFuIGVtcHR5IGFycmF5XG5cdFx0XHQvLyBpbiBjYXNlIHRoZXJlIGFyZSBubyBjb29raWVzIGF0IGFsbC4gQWxzbyBwcmV2ZW50cyBvZGQgcmVzdWx0IHdoZW5cblx0XHRcdC8vIGNhbGxpbmcgXCJnZXQoKVwiXG5cdFx0XHR2YXIgY29va2llcyA9IGRvY3VtZW50LmNvb2tpZSA/IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOyAnKSA6IFtdO1xuXHRcdFx0dmFyIHJkZWNvZGUgPSAvKCVbMC05QS1aXXsyfSkrL2c7XG5cdFx0XHR2YXIgaSA9IDA7XG5cblx0XHRcdGZvciAoOyBpIDwgY29va2llcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgcGFydHMgPSBjb29raWVzW2ldLnNwbGl0KCc9Jyk7XG5cdFx0XHRcdHZhciBjb29raWUgPSBwYXJ0cy5zbGljZSgxKS5qb2luKCc9Jyk7XG5cblx0XHRcdFx0aWYgKCF0aGlzLmpzb24gJiYgY29va2llLmNoYXJBdCgwKSA9PT0gJ1wiJykge1xuXHRcdFx0XHRcdGNvb2tpZSA9IGNvb2tpZS5zbGljZSgxLCAtMSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdHZhciBuYW1lID0gcGFydHNbMF0ucmVwbGFjZShyZGVjb2RlLCBkZWNvZGVVUklDb21wb25lbnQpO1xuXHRcdFx0XHRcdGNvb2tpZSA9IGNvbnZlcnRlci5yZWFkID9cblx0XHRcdFx0XHRcdGNvbnZlcnRlci5yZWFkKGNvb2tpZSwgbmFtZSkgOiBjb252ZXJ0ZXIoY29va2llLCBuYW1lKSB8fFxuXHRcdFx0XHRcdFx0Y29va2llLnJlcGxhY2UocmRlY29kZSwgZGVjb2RlVVJJQ29tcG9uZW50KTtcblxuXHRcdFx0XHRcdGlmICh0aGlzLmpzb24pIHtcblx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdGNvb2tpZSA9IEpTT04ucGFyc2UoY29va2llKTtcblx0XHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHt9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKGtleSA9PT0gbmFtZSkge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gY29va2llO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKCFrZXkpIHtcblx0XHRcdFx0XHRcdHJlc3VsdFtuYW1lXSA9IGNvb2tpZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHt9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdFx0YXBpLnNldCA9IGFwaTtcblx0XHRhcGkuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0cmV0dXJuIGFwaS5jYWxsKGFwaSwga2V5KTtcblx0XHR9O1xuXHRcdGFwaS5nZXRKU09OID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGFwaS5hcHBseSh7XG5cdFx0XHRcdGpzb246IHRydWVcblx0XHRcdH0sIFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG5cdFx0fTtcblx0XHRhcGkuZGVmYXVsdHMgPSB7fTtcblxuXHRcdGFwaS5yZW1vdmUgPSBmdW5jdGlvbiAoa2V5LCBhdHRyaWJ1dGVzKSB7XG5cdFx0XHRhcGkoa2V5LCAnJywgZXh0ZW5kKGF0dHJpYnV0ZXMsIHtcblx0XHRcdFx0ZXhwaXJlczogLTFcblx0XHRcdH0pKTtcblx0XHR9O1xuXG5cdFx0YXBpLndpdGhDb252ZXJ0ZXIgPSBpbml0O1xuXG5cdFx0cmV0dXJuIGFwaTtcblx0fVxuXG5cdHJldHVybiBpbml0KGZ1bmN0aW9uICgpIHt9KTtcbn0pKTtcbiIsIihmdW5jdGlvbigpe1xyXG4gIHZhciBjcnlwdCA9IHJlcXVpcmUoJ2NyeXB0JyksXHJcbiAgICAgIHV0ZjggPSByZXF1aXJlKCdjaGFyZW5jJykudXRmOCxcclxuICAgICAgaXNCdWZmZXIgPSByZXF1aXJlKCdpcy1idWZmZXInKSxcclxuICAgICAgYmluID0gcmVxdWlyZSgnY2hhcmVuYycpLmJpbixcclxuXHJcbiAgLy8gVGhlIGNvcmVcclxuICBtZDUgPSBmdW5jdGlvbiAobWVzc2FnZSwgb3B0aW9ucykge1xyXG4gICAgLy8gQ29udmVydCB0byBieXRlIGFycmF5XHJcbiAgICBpZiAobWVzc2FnZS5jb25zdHJ1Y3RvciA9PSBTdHJpbmcpXHJcbiAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZW5jb2RpbmcgPT09ICdiaW5hcnknKVxyXG4gICAgICAgIG1lc3NhZ2UgPSBiaW4uc3RyaW5nVG9CeXRlcyhtZXNzYWdlKTtcclxuICAgICAgZWxzZVxyXG4gICAgICAgIG1lc3NhZ2UgPSB1dGY4LnN0cmluZ1RvQnl0ZXMobWVzc2FnZSk7XHJcbiAgICBlbHNlIGlmIChpc0J1ZmZlcihtZXNzYWdlKSlcclxuICAgICAgbWVzc2FnZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG1lc3NhZ2UsIDApO1xyXG4gICAgZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkobWVzc2FnZSkpXHJcbiAgICAgIG1lc3NhZ2UgPSBtZXNzYWdlLnRvU3RyaW5nKCk7XHJcbiAgICAvLyBlbHNlLCBhc3N1bWUgYnl0ZSBhcnJheSBhbHJlYWR5XHJcblxyXG4gICAgdmFyIG0gPSBjcnlwdC5ieXRlc1RvV29yZHMobWVzc2FnZSksXHJcbiAgICAgICAgbCA9IG1lc3NhZ2UubGVuZ3RoICogOCxcclxuICAgICAgICBhID0gIDE3MzI1ODQxOTMsXHJcbiAgICAgICAgYiA9IC0yNzE3MzM4NzksXHJcbiAgICAgICAgYyA9IC0xNzMyNTg0MTk0LFxyXG4gICAgICAgIGQgPSAgMjcxNzMzODc4O1xyXG5cclxuICAgIC8vIFN3YXAgZW5kaWFuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbVtpXSA9ICgobVtpXSA8PCAgOCkgfCAobVtpXSA+Pj4gMjQpKSAmIDB4MDBGRjAwRkYgfFxyXG4gICAgICAgICAgICAgKChtW2ldIDw8IDI0KSB8IChtW2ldID4+PiAgOCkpICYgMHhGRjAwRkYwMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBQYWRkaW5nXHJcbiAgICBtW2wgPj4+IDVdIHw9IDB4ODAgPDwgKGwgJSAzMik7XHJcbiAgICBtWygoKGwgKyA2NCkgPj4+IDkpIDw8IDQpICsgMTRdID0gbDtcclxuXHJcbiAgICAvLyBNZXRob2Qgc2hvcnRjdXRzXHJcbiAgICB2YXIgRkYgPSBtZDUuX2ZmLFxyXG4gICAgICAgIEdHID0gbWQ1Ll9nZyxcclxuICAgICAgICBISCA9IG1kNS5faGgsXHJcbiAgICAgICAgSUkgPSBtZDUuX2lpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbS5sZW5ndGg7IGkgKz0gMTYpIHtcclxuXHJcbiAgICAgIHZhciBhYSA9IGEsXHJcbiAgICAgICAgICBiYiA9IGIsXHJcbiAgICAgICAgICBjYyA9IGMsXHJcbiAgICAgICAgICBkZCA9IGQ7XHJcblxyXG4gICAgICBhID0gRkYoYSwgYiwgYywgZCwgbVtpKyAwXSwgIDcsIC02ODA4NzY5MzYpO1xyXG4gICAgICBkID0gRkYoZCwgYSwgYiwgYywgbVtpKyAxXSwgMTIsIC0zODk1NjQ1ODYpO1xyXG4gICAgICBjID0gRkYoYywgZCwgYSwgYiwgbVtpKyAyXSwgMTcsICA2MDYxMDU4MTkpO1xyXG4gICAgICBiID0gRkYoYiwgYywgZCwgYSwgbVtpKyAzXSwgMjIsIC0xMDQ0NTI1MzMwKTtcclxuICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIG1baSsgNF0sICA3LCAtMTc2NDE4ODk3KTtcclxuICAgICAgZCA9IEZGKGQsIGEsIGIsIGMsIG1baSsgNV0sIDEyLCAgMTIwMDA4MDQyNik7XHJcbiAgICAgIGMgPSBGRihjLCBkLCBhLCBiLCBtW2krIDZdLCAxNywgLTE0NzMyMzEzNDEpO1xyXG4gICAgICBiID0gRkYoYiwgYywgZCwgYSwgbVtpKyA3XSwgMjIsIC00NTcwNTk4Myk7XHJcbiAgICAgIGEgPSBGRihhLCBiLCBjLCBkLCBtW2krIDhdLCAgNywgIDE3NzAwMzU0MTYpO1xyXG4gICAgICBkID0gRkYoZCwgYSwgYiwgYywgbVtpKyA5XSwgMTIsIC0xOTU4NDE0NDE3KTtcclxuICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIG1baSsxMF0sIDE3LCAtNDIwNjMpO1xyXG4gICAgICBiID0gRkYoYiwgYywgZCwgYSwgbVtpKzExXSwgMjIsIC0xOTkwNDA0MTYyKTtcclxuICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIG1baSsxMl0sICA3LCAgMTgwNDYwMzY4Mik7XHJcbiAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBtW2krMTNdLCAxMiwgLTQwMzQxMTAxKTtcclxuICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIG1baSsxNF0sIDE3LCAtMTUwMjAwMjI5MCk7XHJcbiAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBtW2krMTVdLCAyMiwgIDEyMzY1MzUzMjkpO1xyXG5cclxuICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIG1baSsgMV0sICA1LCAtMTY1Nzk2NTEwKTtcclxuICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIG1baSsgNl0sICA5LCAtMTA2OTUwMTYzMik7XHJcbiAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBtW2krMTFdLCAxNCwgIDY0MzcxNzcxMyk7XHJcbiAgICAgIGIgPSBHRyhiLCBjLCBkLCBhLCBtW2krIDBdLCAyMCwgLTM3Mzg5NzMwMik7XHJcbiAgICAgIGEgPSBHRyhhLCBiLCBjLCBkLCBtW2krIDVdLCAgNSwgLTcwMTU1ODY5MSk7XHJcbiAgICAgIGQgPSBHRyhkLCBhLCBiLCBjLCBtW2krMTBdLCAgOSwgIDM4MDE2MDgzKTtcclxuICAgICAgYyA9IEdHKGMsIGQsIGEsIGIsIG1baSsxNV0sIDE0LCAtNjYwNDc4MzM1KTtcclxuICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIG1baSsgNF0sIDIwLCAtNDA1NTM3ODQ4KTtcclxuICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIG1baSsgOV0sICA1LCAgNTY4NDQ2NDM4KTtcclxuICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIG1baSsxNF0sICA5LCAtMTAxOTgwMzY5MCk7XHJcbiAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBtW2krIDNdLCAxNCwgLTE4NzM2Mzk2MSk7XHJcbiAgICAgIGIgPSBHRyhiLCBjLCBkLCBhLCBtW2krIDhdLCAyMCwgIDExNjM1MzE1MDEpO1xyXG4gICAgICBhID0gR0coYSwgYiwgYywgZCwgbVtpKzEzXSwgIDUsIC0xNDQ0NjgxNDY3KTtcclxuICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIG1baSsgMl0sICA5LCAtNTE0MDM3ODQpO1xyXG4gICAgICBjID0gR0coYywgZCwgYSwgYiwgbVtpKyA3XSwgMTQsICAxNzM1MzI4NDczKTtcclxuICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIG1baSsxMl0sIDIwLCAtMTkyNjYwNzczNCk7XHJcblxyXG4gICAgICBhID0gSEgoYSwgYiwgYywgZCwgbVtpKyA1XSwgIDQsIC0zNzg1NTgpO1xyXG4gICAgICBkID0gSEgoZCwgYSwgYiwgYywgbVtpKyA4XSwgMTEsIC0yMDIyNTc0NDYzKTtcclxuICAgICAgYyA9IEhIKGMsIGQsIGEsIGIsIG1baSsxMV0sIDE2LCAgMTgzOTAzMDU2Mik7XHJcbiAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBtW2krMTRdLCAyMywgLTM1MzA5NTU2KTtcclxuICAgICAgYSA9IEhIKGEsIGIsIGMsIGQsIG1baSsgMV0sICA0LCAtMTUzMDk5MjA2MCk7XHJcbiAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBtW2krIDRdLCAxMSwgIDEyNzI4OTMzNTMpO1xyXG4gICAgICBjID0gSEgoYywgZCwgYSwgYiwgbVtpKyA3XSwgMTYsIC0xNTU0OTc2MzIpO1xyXG4gICAgICBiID0gSEgoYiwgYywgZCwgYSwgbVtpKzEwXSwgMjMsIC0xMDk0NzMwNjQwKTtcclxuICAgICAgYSA9IEhIKGEsIGIsIGMsIGQsIG1baSsxM10sICA0LCAgNjgxMjc5MTc0KTtcclxuICAgICAgZCA9IEhIKGQsIGEsIGIsIGMsIG1baSsgMF0sIDExLCAtMzU4NTM3MjIyKTtcclxuICAgICAgYyA9IEhIKGMsIGQsIGEsIGIsIG1baSsgM10sIDE2LCAtNzIyNTIxOTc5KTtcclxuICAgICAgYiA9IEhIKGIsIGMsIGQsIGEsIG1baSsgNl0sIDIzLCAgNzYwMjkxODkpO1xyXG4gICAgICBhID0gSEgoYSwgYiwgYywgZCwgbVtpKyA5XSwgIDQsIC02NDAzNjQ0ODcpO1xyXG4gICAgICBkID0gSEgoZCwgYSwgYiwgYywgbVtpKzEyXSwgMTEsIC00MjE4MTU4MzUpO1xyXG4gICAgICBjID0gSEgoYywgZCwgYSwgYiwgbVtpKzE1XSwgMTYsICA1MzA3NDI1MjApO1xyXG4gICAgICBiID0gSEgoYiwgYywgZCwgYSwgbVtpKyAyXSwgMjMsIC05OTUzMzg2NTEpO1xyXG5cclxuICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIG1baSsgMF0sICA2LCAtMTk4NjMwODQ0KTtcclxuICAgICAgZCA9IElJKGQsIGEsIGIsIGMsIG1baSsgN10sIDEwLCAgMTEyNjg5MTQxNSk7XHJcbiAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBtW2krMTRdLCAxNSwgLTE0MTYzNTQ5MDUpO1xyXG4gICAgICBiID0gSUkoYiwgYywgZCwgYSwgbVtpKyA1XSwgMjEsIC01NzQzNDA1NSk7XHJcbiAgICAgIGEgPSBJSShhLCBiLCBjLCBkLCBtW2krMTJdLCAgNiwgIDE3MDA0ODU1NzEpO1xyXG4gICAgICBkID0gSUkoZCwgYSwgYiwgYywgbVtpKyAzXSwgMTAsIC0xODk0OTg2NjA2KTtcclxuICAgICAgYyA9IElJKGMsIGQsIGEsIGIsIG1baSsxMF0sIDE1LCAtMTA1MTUyMyk7XHJcbiAgICAgIGIgPSBJSShiLCBjLCBkLCBhLCBtW2krIDFdLCAyMSwgLTIwNTQ5MjI3OTkpO1xyXG4gICAgICBhID0gSUkoYSwgYiwgYywgZCwgbVtpKyA4XSwgIDYsICAxODczMzEzMzU5KTtcclxuICAgICAgZCA9IElJKGQsIGEsIGIsIGMsIG1baSsxNV0sIDEwLCAtMzA2MTE3NDQpO1xyXG4gICAgICBjID0gSUkoYywgZCwgYSwgYiwgbVtpKyA2XSwgMTUsIC0xNTYwMTk4MzgwKTtcclxuICAgICAgYiA9IElJKGIsIGMsIGQsIGEsIG1baSsxM10sIDIxLCAgMTMwOTE1MTY0OSk7XHJcbiAgICAgIGEgPSBJSShhLCBiLCBjLCBkLCBtW2krIDRdLCAgNiwgLTE0NTUyMzA3MCk7XHJcbiAgICAgIGQgPSBJSShkLCBhLCBiLCBjLCBtW2krMTFdLCAxMCwgLTExMjAyMTAzNzkpO1xyXG4gICAgICBjID0gSUkoYywgZCwgYSwgYiwgbVtpKyAyXSwgMTUsICA3MTg3ODcyNTkpO1xyXG4gICAgICBiID0gSUkoYiwgYywgZCwgYSwgbVtpKyA5XSwgMjEsIC0zNDM0ODU1NTEpO1xyXG5cclxuICAgICAgYSA9IChhICsgYWEpID4+PiAwO1xyXG4gICAgICBiID0gKGIgKyBiYikgPj4+IDA7XHJcbiAgICAgIGMgPSAoYyArIGNjKSA+Pj4gMDtcclxuICAgICAgZCA9IChkICsgZGQpID4+PiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjcnlwdC5lbmRpYW4oW2EsIGIsIGMsIGRdKTtcclxuICB9O1xyXG5cclxuICAvLyBBdXhpbGlhcnkgZnVuY3Rpb25zXHJcbiAgbWQ1Ll9mZiAgPSBmdW5jdGlvbiAoYSwgYiwgYywgZCwgeCwgcywgdCkge1xyXG4gICAgdmFyIG4gPSBhICsgKGIgJiBjIHwgfmIgJiBkKSArICh4ID4+PiAwKSArIHQ7XHJcbiAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xyXG4gIH07XHJcbiAgbWQ1Ll9nZyAgPSBmdW5jdGlvbiAoYSwgYiwgYywgZCwgeCwgcywgdCkge1xyXG4gICAgdmFyIG4gPSBhICsgKGIgJiBkIHwgYyAmIH5kKSArICh4ID4+PiAwKSArIHQ7XHJcbiAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xyXG4gIH07XHJcbiAgbWQ1Ll9oaCAgPSBmdW5jdGlvbiAoYSwgYiwgYywgZCwgeCwgcywgdCkge1xyXG4gICAgdmFyIG4gPSBhICsgKGIgXiBjIF4gZCkgKyAoeCA+Pj4gMCkgKyB0O1xyXG4gICAgcmV0dXJuICgobiA8PCBzKSB8IChuID4+PiAoMzIgLSBzKSkpICsgYjtcclxuICB9O1xyXG4gIG1kNS5faWkgID0gZnVuY3Rpb24gKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcclxuICAgIHZhciBuID0gYSArIChjIF4gKGIgfCB+ZCkpICsgKHggPj4+IDApICsgdDtcclxuICAgIHJldHVybiAoKG4gPDwgcykgfCAobiA+Pj4gKDMyIC0gcykpKSArIGI7XHJcbiAgfTtcclxuXHJcbiAgLy8gUGFja2FnZSBwcml2YXRlIGJsb2Nrc2l6ZVxyXG4gIG1kNS5fYmxvY2tzaXplID0gMTY7XHJcbiAgbWQ1Ll9kaWdlc3RzaXplID0gMTY7XHJcblxyXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG1lc3NhZ2UsIG9wdGlvbnMpIHtcclxuICAgIGlmIChtZXNzYWdlID09PSB1bmRlZmluZWQgfHwgbWVzc2FnZSA9PT0gbnVsbClcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbGxlZ2FsIGFyZ3VtZW50ICcgKyBtZXNzYWdlKTtcclxuXHJcbiAgICB2YXIgZGlnZXN0Ynl0ZXMgPSBjcnlwdC53b3Jkc1RvQnl0ZXMobWQ1KG1lc3NhZ2UsIG9wdGlvbnMpKTtcclxuICAgIHJldHVybiBvcHRpb25zICYmIG9wdGlvbnMuYXNCeXRlcyA/IGRpZ2VzdGJ5dGVzIDpcclxuICAgICAgICBvcHRpb25zICYmIG9wdGlvbnMuYXNTdHJpbmcgPyBiaW4uYnl0ZXNUb1N0cmluZyhkaWdlc3RieXRlcykgOlxyXG4gICAgICAgIGNyeXB0LmJ5dGVzVG9IZXgoZGlnZXN0Ynl0ZXMpO1xyXG4gIH07XHJcblxyXG59KSgpO1xyXG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciByZXBsYWNlID0gU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlO1xudmFyIHBlcmNlbnRUd2VudGllcyA9IC8lMjAvZztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgJ2RlZmF1bHQnOiAnUkZDMzk4NicsXG4gICAgZm9ybWF0dGVyczoge1xuICAgICAgICBSRkMxNzM4OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiByZXBsYWNlLmNhbGwodmFsdWUsIHBlcmNlbnRUd2VudGllcywgJysnKTtcbiAgICAgICAgfSxcbiAgICAgICAgUkZDMzk4NjogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFJGQzE3Mzg6ICdSRkMxNzM4JyxcbiAgICBSRkMzOTg2OiAnUkZDMzk4Nidcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdpZnkgPSByZXF1aXJlKCcuL3N0cmluZ2lmeScpO1xudmFyIHBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpO1xudmFyIGZvcm1hdHMgPSByZXF1aXJlKCcuL2Zvcm1hdHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZm9ybWF0czogZm9ybWF0cyxcbiAgICBwYXJzZTogcGFyc2UsXG4gICAgc3RyaW5naWZ5OiBzdHJpbmdpZnlcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgICBhbGxvd0RvdHM6IGZhbHNlLFxuICAgIGFsbG93UHJvdG90eXBlczogZmFsc2UsXG4gICAgYXJyYXlMaW1pdDogMjAsXG4gICAgZGVjb2RlcjogdXRpbHMuZGVjb2RlLFxuICAgIGRlbGltaXRlcjogJyYnLFxuICAgIGRlcHRoOiA1LFxuICAgIHBhcmFtZXRlckxpbWl0OiAxMDAwLFxuICAgIHBsYWluT2JqZWN0czogZmFsc2UsXG4gICAgc3RyaWN0TnVsbEhhbmRsaW5nOiBmYWxzZVxufTtcblxudmFyIHBhcnNlVmFsdWVzID0gZnVuY3Rpb24gcGFyc2VRdWVyeVN0cmluZ1ZhbHVlcyhzdHIsIG9wdGlvbnMpIHtcbiAgICB2YXIgb2JqID0ge307XG4gICAgdmFyIGNsZWFuU3RyID0gb3B0aW9ucy5pZ25vcmVRdWVyeVByZWZpeCA/IHN0ci5yZXBsYWNlKC9eXFw/LywgJycpIDogc3RyO1xuICAgIHZhciBsaW1pdCA9IG9wdGlvbnMucGFyYW1ldGVyTGltaXQgPT09IEluZmluaXR5ID8gdW5kZWZpbmVkIDogb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdDtcbiAgICB2YXIgcGFydHMgPSBjbGVhblN0ci5zcGxpdChvcHRpb25zLmRlbGltaXRlciwgbGltaXQpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgcGFydCA9IHBhcnRzW2ldO1xuXG4gICAgICAgIHZhciBicmFja2V0RXF1YWxzUG9zID0gcGFydC5pbmRleE9mKCddPScpO1xuICAgICAgICB2YXIgcG9zID0gYnJhY2tldEVxdWFsc1BvcyA9PT0gLTEgPyBwYXJ0LmluZGV4T2YoJz0nKSA6IGJyYWNrZXRFcXVhbHNQb3MgKyAxO1xuXG4gICAgICAgIHZhciBrZXksIHZhbDtcbiAgICAgICAgaWYgKHBvcyA9PT0gLTEpIHtcbiAgICAgICAgICAgIGtleSA9IG9wdGlvbnMuZGVjb2RlcihwYXJ0LCBkZWZhdWx0cy5kZWNvZGVyKTtcbiAgICAgICAgICAgIHZhbCA9IG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nID8gbnVsbCA6ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAga2V5ID0gb3B0aW9ucy5kZWNvZGVyKHBhcnQuc2xpY2UoMCwgcG9zKSwgZGVmYXVsdHMuZGVjb2Rlcik7XG4gICAgICAgICAgICB2YWwgPSBvcHRpb25zLmRlY29kZXIocGFydC5zbGljZShwb3MgKyAxKSwgZGVmYXVsdHMuZGVjb2Rlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhcy5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICAgICAgb2JqW2tleV0gPSBbXS5jb25jYXQob2JqW2tleV0pLmNvbmNhdCh2YWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2JqW2tleV0gPSB2YWw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxudmFyIHBhcnNlT2JqZWN0ID0gZnVuY3Rpb24gKGNoYWluLCB2YWwsIG9wdGlvbnMpIHtcbiAgICB2YXIgbGVhZiA9IHZhbDtcblxuICAgIGZvciAodmFyIGkgPSBjaGFpbi5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgb2JqO1xuICAgICAgICB2YXIgcm9vdCA9IGNoYWluW2ldO1xuXG4gICAgICAgIGlmIChyb290ID09PSAnW10nKSB7XG4gICAgICAgICAgICBvYmogPSBbXTtcbiAgICAgICAgICAgIG9iaiA9IG9iai5jb25jYXQobGVhZik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYmogPSBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcbiAgICAgICAgICAgIHZhciBjbGVhblJvb3QgPSByb290LmNoYXJBdCgwKSA9PT0gJ1snICYmIHJvb3QuY2hhckF0KHJvb3QubGVuZ3RoIC0gMSkgPT09ICddJyA/IHJvb3Quc2xpY2UoMSwgLTEpIDogcm9vdDtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHBhcnNlSW50KGNsZWFuUm9vdCwgMTApO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICFpc05hTihpbmRleClcbiAgICAgICAgICAgICAgICAmJiByb290ICE9PSBjbGVhblJvb3RcbiAgICAgICAgICAgICAgICAmJiBTdHJpbmcoaW5kZXgpID09PSBjbGVhblJvb3RcbiAgICAgICAgICAgICAgICAmJiBpbmRleCA+PSAwXG4gICAgICAgICAgICAgICAgJiYgKG9wdGlvbnMucGFyc2VBcnJheXMgJiYgaW5kZXggPD0gb3B0aW9ucy5hcnJheUxpbWl0KVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgb2JqID0gW107XG4gICAgICAgICAgICAgICAgb2JqW2luZGV4XSA9IGxlYWY7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9ialtjbGVhblJvb3RdID0gbGVhZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxlYWYgPSBvYmo7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxlYWY7XG59O1xuXG52YXIgcGFyc2VLZXlzID0gZnVuY3Rpb24gcGFyc2VRdWVyeVN0cmluZ0tleXMoZ2l2ZW5LZXksIHZhbCwgb3B0aW9ucykge1xuICAgIGlmICghZ2l2ZW5LZXkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFRyYW5zZm9ybSBkb3Qgbm90YXRpb24gdG8gYnJhY2tldCBub3RhdGlvblxuICAgIHZhciBrZXkgPSBvcHRpb25zLmFsbG93RG90cyA/IGdpdmVuS2V5LnJlcGxhY2UoL1xcLihbXi5bXSspL2csICdbJDFdJykgOiBnaXZlbktleTtcblxuICAgIC8vIFRoZSByZWdleCBjaHVua3NcblxuICAgIHZhciBicmFja2V0cyA9IC8oXFxbW15bXFxdXSpdKS87XG4gICAgdmFyIGNoaWxkID0gLyhcXFtbXltcXF1dKl0pL2c7XG5cbiAgICAvLyBHZXQgdGhlIHBhcmVudFxuXG4gICAgdmFyIHNlZ21lbnQgPSBicmFja2V0cy5leGVjKGtleSk7XG4gICAgdmFyIHBhcmVudCA9IHNlZ21lbnQgPyBrZXkuc2xpY2UoMCwgc2VnbWVudC5pbmRleCkgOiBrZXk7XG5cbiAgICAvLyBTdGFzaCB0aGUgcGFyZW50IGlmIGl0IGV4aXN0c1xuXG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICAgIC8vIElmIHdlIGFyZW4ndCB1c2luZyBwbGFpbiBvYmplY3RzLCBvcHRpb25hbGx5IHByZWZpeCBrZXlzXG4gICAgICAgIC8vIHRoYXQgd291bGQgb3ZlcndyaXRlIG9iamVjdCBwcm90b3R5cGUgcHJvcGVydGllc1xuICAgICAgICBpZiAoIW9wdGlvbnMucGxhaW5PYmplY3RzICYmIGhhcy5jYWxsKE9iamVjdC5wcm90b3R5cGUsIHBhcmVudCkpIHtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy5hbGxvd1Byb3RvdHlwZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBrZXlzLnB1c2gocGFyZW50KTtcbiAgICB9XG5cbiAgICAvLyBMb29wIHRocm91Z2ggY2hpbGRyZW4gYXBwZW5kaW5nIHRvIHRoZSBhcnJheSB1bnRpbCB3ZSBoaXQgZGVwdGhcblxuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoKHNlZ21lbnQgPSBjaGlsZC5leGVjKGtleSkpICE9PSBudWxsICYmIGkgPCBvcHRpb25zLmRlcHRoKSB7XG4gICAgICAgIGkgKz0gMTtcbiAgICAgICAgaWYgKCFvcHRpb25zLnBsYWluT2JqZWN0cyAmJiBoYXMuY2FsbChPYmplY3QucHJvdG90eXBlLCBzZWdtZW50WzFdLnNsaWNlKDEsIC0xKSkpIHtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy5hbGxvd1Byb3RvdHlwZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAga2V5cy5wdXNoKHNlZ21lbnRbMV0pO1xuICAgIH1cblxuICAgIC8vIElmIHRoZXJlJ3MgYSByZW1haW5kZXIsIGp1c3QgYWRkIHdoYXRldmVyIGlzIGxlZnRcblxuICAgIGlmIChzZWdtZW50KSB7XG4gICAgICAgIGtleXMucHVzaCgnWycgKyBrZXkuc2xpY2Uoc2VnbWVudC5pbmRleCkgKyAnXScpO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJzZU9iamVjdChrZXlzLCB2YWwsIG9wdGlvbnMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3RyLCBvcHRzKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBvcHRzID8gdXRpbHMuYXNzaWduKHt9LCBvcHRzKSA6IHt9O1xuXG4gICAgaWYgKG9wdGlvbnMuZGVjb2RlciAhPT0gbnVsbCAmJiBvcHRpb25zLmRlY29kZXIgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb3B0aW9ucy5kZWNvZGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0RlY29kZXIgaGFzIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgb3B0aW9ucy5pZ25vcmVRdWVyeVByZWZpeCA9IG9wdGlvbnMuaWdub3JlUXVlcnlQcmVmaXggPT09IHRydWU7XG4gICAgb3B0aW9ucy5kZWxpbWl0ZXIgPSB0eXBlb2Ygb3B0aW9ucy5kZWxpbWl0ZXIgPT09ICdzdHJpbmcnIHx8IHV0aWxzLmlzUmVnRXhwKG9wdGlvbnMuZGVsaW1pdGVyKSA/IG9wdGlvbnMuZGVsaW1pdGVyIDogZGVmYXVsdHMuZGVsaW1pdGVyO1xuICAgIG9wdGlvbnMuZGVwdGggPSB0eXBlb2Ygb3B0aW9ucy5kZXB0aCA9PT0gJ251bWJlcicgPyBvcHRpb25zLmRlcHRoIDogZGVmYXVsdHMuZGVwdGg7XG4gICAgb3B0aW9ucy5hcnJheUxpbWl0ID0gdHlwZW9mIG9wdGlvbnMuYXJyYXlMaW1pdCA9PT0gJ251bWJlcicgPyBvcHRpb25zLmFycmF5TGltaXQgOiBkZWZhdWx0cy5hcnJheUxpbWl0O1xuICAgIG9wdGlvbnMucGFyc2VBcnJheXMgPSBvcHRpb25zLnBhcnNlQXJyYXlzICE9PSBmYWxzZTtcbiAgICBvcHRpb25zLmRlY29kZXIgPSB0eXBlb2Ygb3B0aW9ucy5kZWNvZGVyID09PSAnZnVuY3Rpb24nID8gb3B0aW9ucy5kZWNvZGVyIDogZGVmYXVsdHMuZGVjb2RlcjtcbiAgICBvcHRpb25zLmFsbG93RG90cyA9IHR5cGVvZiBvcHRpb25zLmFsbG93RG90cyA9PT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5hbGxvd0RvdHMgOiBkZWZhdWx0cy5hbGxvd0RvdHM7XG4gICAgb3B0aW9ucy5wbGFpbk9iamVjdHMgPSB0eXBlb2Ygb3B0aW9ucy5wbGFpbk9iamVjdHMgPT09ICdib29sZWFuJyA/IG9wdGlvbnMucGxhaW5PYmplY3RzIDogZGVmYXVsdHMucGxhaW5PYmplY3RzO1xuICAgIG9wdGlvbnMuYWxsb3dQcm90b3R5cGVzID0gdHlwZW9mIG9wdGlvbnMuYWxsb3dQcm90b3R5cGVzID09PSAnYm9vbGVhbicgPyBvcHRpb25zLmFsbG93UHJvdG90eXBlcyA6IGRlZmF1bHRzLmFsbG93UHJvdG90eXBlcztcbiAgICBvcHRpb25zLnBhcmFtZXRlckxpbWl0ID0gdHlwZW9mIG9wdGlvbnMucGFyYW1ldGVyTGltaXQgPT09ICdudW1iZXInID8gb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdCA6IGRlZmF1bHRzLnBhcmFtZXRlckxpbWl0O1xuICAgIG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nID0gdHlwZW9mIG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nID09PSAnYm9vbGVhbicgPyBvcHRpb25zLnN0cmljdE51bGxIYW5kbGluZyA6IGRlZmF1bHRzLnN0cmljdE51bGxIYW5kbGluZztcblxuICAgIGlmIChzdHIgPT09ICcnIHx8IHN0ciA9PT0gbnVsbCB8fCB0eXBlb2Ygc3RyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG4gICAgfVxuXG4gICAgdmFyIHRlbXBPYmogPSB0eXBlb2Ygc3RyID09PSAnc3RyaW5nJyA/IHBhcnNlVmFsdWVzKHN0ciwgb3B0aW9ucykgOiBzdHI7XG4gICAgdmFyIG9iaiA9IG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuXG4gICAgLy8gSXRlcmF0ZSBvdmVyIHRoZSBrZXlzIGFuZCBzZXR1cCB0aGUgbmV3IG9iamVjdFxuXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh0ZW1wT2JqKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgIHZhciBuZXdPYmogPSBwYXJzZUtleXMoa2V5LCB0ZW1wT2JqW2tleV0sIG9wdGlvbnMpO1xuICAgICAgICBvYmogPSB1dGlscy5tZXJnZShvYmosIG5ld09iaiwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHV0aWxzLmNvbXBhY3Qob2JqKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBmb3JtYXRzID0gcmVxdWlyZSgnLi9mb3JtYXRzJyk7XG5cbnZhciBhcnJheVByZWZpeEdlbmVyYXRvcnMgPSB7XG4gICAgYnJhY2tldHM6IGZ1bmN0aW9uIGJyYWNrZXRzKHByZWZpeCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuICAgICAgICByZXR1cm4gcHJlZml4ICsgJ1tdJztcbiAgICB9LFxuICAgIGluZGljZXM6IGZ1bmN0aW9uIGluZGljZXMocHJlZml4LCBrZXkpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIHByZWZpeCArICdbJyArIGtleSArICddJztcbiAgICB9LFxuICAgIHJlcGVhdDogZnVuY3Rpb24gcmVwZWF0KHByZWZpeCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuICAgICAgICByZXR1cm4gcHJlZml4O1xuICAgIH1cbn07XG5cbnZhciB0b0lTTyA9IERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nO1xuXG52YXIgZGVmYXVsdHMgPSB7XG4gICAgZGVsaW1pdGVyOiAnJicsXG4gICAgZW5jb2RlOiB0cnVlLFxuICAgIGVuY29kZXI6IHV0aWxzLmVuY29kZSxcbiAgICBlbmNvZGVWYWx1ZXNPbmx5OiBmYWxzZSxcbiAgICBzZXJpYWxpemVEYXRlOiBmdW5jdGlvbiBzZXJpYWxpemVEYXRlKGRhdGUpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIHRvSVNPLmNhbGwoZGF0ZSk7XG4gICAgfSxcbiAgICBza2lwTnVsbHM6IGZhbHNlLFxuICAgIHN0cmljdE51bGxIYW5kbGluZzogZmFsc2Vcbn07XG5cbnZhciBzdHJpbmdpZnkgPSBmdW5jdGlvbiBzdHJpbmdpZnkoIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgb2JqZWN0LFxuICAgIHByZWZpeCxcbiAgICBnZW5lcmF0ZUFycmF5UHJlZml4LFxuICAgIHN0cmljdE51bGxIYW5kbGluZyxcbiAgICBza2lwTnVsbHMsXG4gICAgZW5jb2RlcixcbiAgICBmaWx0ZXIsXG4gICAgc29ydCxcbiAgICBhbGxvd0RvdHMsXG4gICAgc2VyaWFsaXplRGF0ZSxcbiAgICBmb3JtYXR0ZXIsXG4gICAgZW5jb2RlVmFsdWVzT25seVxuKSB7XG4gICAgdmFyIG9iaiA9IG9iamVjdDtcbiAgICBpZiAodHlwZW9mIGZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvYmogPSBmaWx0ZXIocHJlZml4LCBvYmopO1xuICAgIH0gZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICBvYmogPSBzZXJpYWxpemVEYXRlKG9iaik7XG4gICAgfSBlbHNlIGlmIChvYmogPT09IG51bGwpIHtcbiAgICAgICAgaWYgKHN0cmljdE51bGxIYW5kbGluZykge1xuICAgICAgICAgICAgcmV0dXJuIGVuY29kZXIgJiYgIWVuY29kZVZhbHVlc09ubHkgPyBlbmNvZGVyKHByZWZpeCwgZGVmYXVsdHMuZW5jb2RlcikgOiBwcmVmaXg7XG4gICAgICAgIH1cblxuICAgICAgICBvYmogPSAnJztcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIG9iaiA9PT0gJ251bWJlcicgfHwgdHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nIHx8IHV0aWxzLmlzQnVmZmVyKG9iaikpIHtcbiAgICAgICAgaWYgKGVuY29kZXIpIHtcbiAgICAgICAgICAgIHZhciBrZXlWYWx1ZSA9IGVuY29kZVZhbHVlc09ubHkgPyBwcmVmaXggOiBlbmNvZGVyKHByZWZpeCwgZGVmYXVsdHMuZW5jb2Rlcik7XG4gICAgICAgICAgICByZXR1cm4gW2Zvcm1hdHRlcihrZXlWYWx1ZSkgKyAnPScgKyBmb3JtYXR0ZXIoZW5jb2RlcihvYmosIGRlZmF1bHRzLmVuY29kZXIpKV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtmb3JtYXR0ZXIocHJlZml4KSArICc9JyArIGZvcm1hdHRlcihTdHJpbmcob2JqKSldO1xuICAgIH1cblxuICAgIHZhciB2YWx1ZXMgPSBbXTtcblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cblxuICAgIHZhciBvYmpLZXlzO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGZpbHRlcikpIHtcbiAgICAgICAgb2JqS2V5cyA9IGZpbHRlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgICAgIG9iaktleXMgPSBzb3J0ID8ga2V5cy5zb3J0KHNvcnQpIDoga2V5cztcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iaktleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IG9iaktleXNbaV07XG5cbiAgICAgICAgaWYgKHNraXBOdWxscyAmJiBvYmpba2V5XSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICB2YWx1ZXMgPSB2YWx1ZXMuY29uY2F0KHN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICBvYmpba2V5XSxcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZUFycmF5UHJlZml4KHByZWZpeCwga2V5KSxcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZUFycmF5UHJlZml4LFxuICAgICAgICAgICAgICAgIHN0cmljdE51bGxIYW5kbGluZyxcbiAgICAgICAgICAgICAgICBza2lwTnVsbHMsXG4gICAgICAgICAgICAgICAgZW5jb2RlcixcbiAgICAgICAgICAgICAgICBmaWx0ZXIsXG4gICAgICAgICAgICAgICAgc29ydCxcbiAgICAgICAgICAgICAgICBhbGxvd0RvdHMsXG4gICAgICAgICAgICAgICAgc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgZW5jb2RlVmFsdWVzT25seVxuICAgICAgICAgICAgKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YWx1ZXMgPSB2YWx1ZXMuY29uY2F0KHN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICBvYmpba2V5XSxcbiAgICAgICAgICAgICAgICBwcmVmaXggKyAoYWxsb3dEb3RzID8gJy4nICsga2V5IDogJ1snICsga2V5ICsgJ10nKSxcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZUFycmF5UHJlZml4LFxuICAgICAgICAgICAgICAgIHN0cmljdE51bGxIYW5kbGluZyxcbiAgICAgICAgICAgICAgICBza2lwTnVsbHMsXG4gICAgICAgICAgICAgICAgZW5jb2RlcixcbiAgICAgICAgICAgICAgICBmaWx0ZXIsXG4gICAgICAgICAgICAgICAgc29ydCxcbiAgICAgICAgICAgICAgICBhbGxvd0RvdHMsXG4gICAgICAgICAgICAgICAgc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgZW5jb2RlVmFsdWVzT25seVxuICAgICAgICAgICAgKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVzO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBvcHRzKSB7XG4gICAgdmFyIG9iaiA9IG9iamVjdDtcbiAgICB2YXIgb3B0aW9ucyA9IG9wdHMgPyB1dGlscy5hc3NpZ24oe30sIG9wdHMpIDoge307XG5cbiAgICBpZiAob3B0aW9ucy5lbmNvZGVyICE9PSBudWxsICYmIG9wdGlvbnMuZW5jb2RlciAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvcHRpb25zLmVuY29kZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRW5jb2RlciBoYXMgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICB2YXIgZGVsaW1pdGVyID0gdHlwZW9mIG9wdGlvbnMuZGVsaW1pdGVyID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRzLmRlbGltaXRlciA6IG9wdGlvbnMuZGVsaW1pdGVyO1xuICAgIHZhciBzdHJpY3ROdWxsSGFuZGxpbmcgPSB0eXBlb2Ygb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcgPT09ICdib29sZWFuJyA/IG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nIDogZGVmYXVsdHMuc3RyaWN0TnVsbEhhbmRsaW5nO1xuICAgIHZhciBza2lwTnVsbHMgPSB0eXBlb2Ygb3B0aW9ucy5za2lwTnVsbHMgPT09ICdib29sZWFuJyA/IG9wdGlvbnMuc2tpcE51bGxzIDogZGVmYXVsdHMuc2tpcE51bGxzO1xuICAgIHZhciBlbmNvZGUgPSB0eXBlb2Ygb3B0aW9ucy5lbmNvZGUgPT09ICdib29sZWFuJyA/IG9wdGlvbnMuZW5jb2RlIDogZGVmYXVsdHMuZW5jb2RlO1xuICAgIHZhciBlbmNvZGVyID0gdHlwZW9mIG9wdGlvbnMuZW5jb2RlciA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMuZW5jb2RlciA6IGRlZmF1bHRzLmVuY29kZXI7XG4gICAgdmFyIHNvcnQgPSB0eXBlb2Ygb3B0aW9ucy5zb3J0ID09PSAnZnVuY3Rpb24nID8gb3B0aW9ucy5zb3J0IDogbnVsbDtcbiAgICB2YXIgYWxsb3dEb3RzID0gdHlwZW9mIG9wdGlvbnMuYWxsb3dEb3RzID09PSAndW5kZWZpbmVkJyA/IGZhbHNlIDogb3B0aW9ucy5hbGxvd0RvdHM7XG4gICAgdmFyIHNlcmlhbGl6ZURhdGUgPSB0eXBlb2Ygb3B0aW9ucy5zZXJpYWxpemVEYXRlID09PSAnZnVuY3Rpb24nID8gb3B0aW9ucy5zZXJpYWxpemVEYXRlIDogZGVmYXVsdHMuc2VyaWFsaXplRGF0ZTtcbiAgICB2YXIgZW5jb2RlVmFsdWVzT25seSA9IHR5cGVvZiBvcHRpb25zLmVuY29kZVZhbHVlc09ubHkgPT09ICdib29sZWFuJyA/IG9wdGlvbnMuZW5jb2RlVmFsdWVzT25seSA6IGRlZmF1bHRzLmVuY29kZVZhbHVlc09ubHk7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmZvcm1hdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgb3B0aW9ucy5mb3JtYXQgPSBmb3JtYXRzWydkZWZhdWx0J107XG4gICAgfSBlbHNlIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGZvcm1hdHMuZm9ybWF0dGVycywgb3B0aW9ucy5mb3JtYXQpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZm9ybWF0IG9wdGlvbiBwcm92aWRlZC4nKTtcbiAgICB9XG4gICAgdmFyIGZvcm1hdHRlciA9IGZvcm1hdHMuZm9ybWF0dGVyc1tvcHRpb25zLmZvcm1hdF07XG4gICAgdmFyIG9iaktleXM7XG4gICAgdmFyIGZpbHRlcjtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5maWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZmlsdGVyID0gb3B0aW9ucy5maWx0ZXI7XG4gICAgICAgIG9iaiA9IGZpbHRlcignJywgb2JqKTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucy5maWx0ZXIpKSB7XG4gICAgICAgIGZpbHRlciA9IG9wdGlvbnMuZmlsdGVyO1xuICAgICAgICBvYmpLZXlzID0gZmlsdGVyO1xuICAgIH1cblxuICAgIHZhciBrZXlzID0gW107XG5cbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgfHwgb2JqID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICB2YXIgYXJyYXlGb3JtYXQ7XG4gICAgaWYgKG9wdGlvbnMuYXJyYXlGb3JtYXQgaW4gYXJyYXlQcmVmaXhHZW5lcmF0b3JzKSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gb3B0aW9ucy5hcnJheUZvcm1hdDtcbiAgICB9IGVsc2UgaWYgKCdpbmRpY2VzJyBpbiBvcHRpb25zKSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gb3B0aW9ucy5pbmRpY2VzID8gJ2luZGljZXMnIDogJ3JlcGVhdCc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYXJyYXlGb3JtYXQgPSAnaW5kaWNlcyc7XG4gICAgfVxuXG4gICAgdmFyIGdlbmVyYXRlQXJyYXlQcmVmaXggPSBhcnJheVByZWZpeEdlbmVyYXRvcnNbYXJyYXlGb3JtYXRdO1xuXG4gICAgaWYgKCFvYmpLZXlzKSB7XG4gICAgICAgIG9iaktleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgIH1cblxuICAgIGlmIChzb3J0KSB7XG4gICAgICAgIG9iaktleXMuc29ydChzb3J0KTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iaktleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IG9iaktleXNbaV07XG5cbiAgICAgICAgaWYgKHNraXBOdWxscyAmJiBvYmpba2V5XSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBrZXlzID0ga2V5cy5jb25jYXQoc3RyaW5naWZ5KFxuICAgICAgICAgICAgb2JqW2tleV0sXG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBnZW5lcmF0ZUFycmF5UHJlZml4LFxuICAgICAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgICAgICAgICAgc2tpcE51bGxzLFxuICAgICAgICAgICAgZW5jb2RlID8gZW5jb2RlciA6IG51bGwsXG4gICAgICAgICAgICBmaWx0ZXIsXG4gICAgICAgICAgICBzb3J0LFxuICAgICAgICAgICAgYWxsb3dEb3RzLFxuICAgICAgICAgICAgc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgICAgIGZvcm1hdHRlcixcbiAgICAgICAgICAgIGVuY29kZVZhbHVlc09ubHlcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgdmFyIGpvaW5lZCA9IGtleXMuam9pbihkZWxpbWl0ZXIpO1xuICAgIHZhciBwcmVmaXggPSBvcHRpb25zLmFkZFF1ZXJ5UHJlZml4ID09PSB0cnVlID8gJz8nIDogJyc7XG5cbiAgICByZXR1cm4gam9pbmVkLmxlbmd0aCA+IDAgPyBwcmVmaXggKyBqb2luZWQgOiAnJztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgaGV4VGFibGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcnJheSA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgICAgICAgYXJyYXkucHVzaCgnJScgKyAoKGkgPCAxNiA/ICcwJyA6ICcnKSArIGkudG9TdHJpbmcoMTYpKS50b1VwcGVyQ2FzZSgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyYXk7XG59KCkpO1xuXG52YXIgY29tcGFjdFF1ZXVlID0gZnVuY3Rpb24gY29tcGFjdFF1ZXVlKHF1ZXVlKSB7XG4gICAgdmFyIG9iajtcblxuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiAgICAgICAgb2JqID0gaXRlbS5vYmpbaXRlbS5wcm9wXTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICB2YXIgY29tcGFjdGVkID0gW107XG5cbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgb2JqLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpbal0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBhY3RlZC5wdXNoKG9ialtqXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpdGVtLm9ialtpdGVtLnByb3BdID0gY29tcGFjdGVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn07XG5cbmV4cG9ydHMuYXJyYXlUb09iamVjdCA9IGZ1bmN0aW9uIGFycmF5VG9PYmplY3Qoc291cmNlLCBvcHRpb25zKSB7XG4gICAgdmFyIG9iaiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2UubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VbaV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBvYmpbaV0gPSBzb3VyY2VbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxuZXhwb3J0cy5tZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKHRhcmdldCwgc291cmNlLCBvcHRpb25zKSB7XG4gICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSkge1xuICAgICAgICAgICAgdGFyZ2V0LnB1c2goc291cmNlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMucGxhaW5PYmplY3RzIHx8IG9wdGlvbnMuYWxsb3dQcm90b3R5cGVzIHx8ICFoYXMuY2FsbChPYmplY3QucHJvdG90eXBlLCBzb3VyY2UpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W3NvdXJjZV0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFt0YXJnZXQsIHNvdXJjZV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gW3RhcmdldF0uY29uY2F0KHNvdXJjZSk7XG4gICAgfVxuXG4gICAgdmFyIG1lcmdlVGFyZ2V0ID0gdGFyZ2V0O1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkgJiYgIUFycmF5LmlzQXJyYXkoc291cmNlKSkge1xuICAgICAgICBtZXJnZVRhcmdldCA9IGV4cG9ydHMuYXJyYXlUb09iamVjdCh0YXJnZXQsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkgJiYgQXJyYXkuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICAgIHNvdXJjZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpKSB7XG4gICAgICAgICAgICBpZiAoaGFzLmNhbGwodGFyZ2V0LCBpKSkge1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRbaV0gJiYgdHlwZW9mIHRhcmdldFtpXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W2ldID0gZXhwb3J0cy5tZXJnZSh0YXJnZXRbaV0sIGl0ZW0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2ldID0gaXRlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHNvdXJjZSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBzb3VyY2Vba2V5XTtcblxuICAgICAgICBpZiAoaGFzLmNhbGwoYWNjLCBrZXkpKSB7XG4gICAgICAgICAgICBhY2Nba2V5XSA9IGV4cG9ydHMubWVyZ2UoYWNjW2tleV0sIHZhbHVlLCBvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjY1trZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBtZXJnZVRhcmdldCk7XG59O1xuXG5leHBvcnRzLmFzc2lnbiA9IGZ1bmN0aW9uIGFzc2lnblNpbmdsZVNvdXJjZSh0YXJnZXQsIHNvdXJjZSkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhzb3VyY2UpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgICAgYWNjW2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB0YXJnZXQpO1xufTtcblxuZXhwb3J0cy5kZWNvZGUgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzdHIucmVwbGFjZSgvXFwrL2csICcgJykpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG59O1xuXG5leHBvcnRzLmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShzdHIpIHtcbiAgICAvLyBUaGlzIGNvZGUgd2FzIG9yaWdpbmFsbHkgd3JpdHRlbiBieSBCcmlhbiBXaGl0ZSAobXNjZGV4KSBmb3IgdGhlIGlvLmpzIGNvcmUgcXVlcnlzdHJpbmcgbGlicmFyeS5cbiAgICAvLyBJdCBoYXMgYmVlbiBhZGFwdGVkIGhlcmUgZm9yIHN0cmljdGVyIGFkaGVyZW5jZSB0byBSRkMgMzk4NlxuICAgIGlmIChzdHIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgdmFyIHN0cmluZyA9IHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnID8gc3RyIDogU3RyaW5nKHN0cik7XG5cbiAgICB2YXIgb3V0ID0gJyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGMgPSBzdHJpbmcuY2hhckNvZGVBdChpKTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBjID09PSAweDJEIC8vIC1cbiAgICAgICAgICAgIHx8IGMgPT09IDB4MkUgLy8gLlxuICAgICAgICAgICAgfHwgYyA9PT0gMHg1RiAvLyBfXG4gICAgICAgICAgICB8fCBjID09PSAweDdFIC8vIH5cbiAgICAgICAgICAgIHx8IChjID49IDB4MzAgJiYgYyA8PSAweDM5KSAvLyAwLTlcbiAgICAgICAgICAgIHx8IChjID49IDB4NDEgJiYgYyA8PSAweDVBKSAvLyBhLXpcbiAgICAgICAgICAgIHx8IChjID49IDB4NjEgJiYgYyA8PSAweDdBKSAvLyBBLVpcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBvdXQgKz0gc3RyaW5nLmNoYXJBdChpKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPCAweDgwKSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgKyBoZXhUYWJsZVtjXTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPCAweDgwMCkge1xuICAgICAgICAgICAgb3V0ID0gb3V0ICsgKGhleFRhYmxlWzB4QzAgfCAoYyA+PiA2KV0gKyBoZXhUYWJsZVsweDgwIHwgKGMgJiAweDNGKV0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA8IDB4RDgwMCB8fCBjID49IDB4RTAwMCkge1xuICAgICAgICAgICAgb3V0ID0gb3V0ICsgKGhleFRhYmxlWzB4RTAgfCAoYyA+PiAxMildICsgaGV4VGFibGVbMHg4MCB8ICgoYyA+PiA2KSAmIDB4M0YpXSArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGkgKz0gMTtcbiAgICAgICAgYyA9IDB4MTAwMDAgKyAoKChjICYgMHgzRkYpIDw8IDEwKSB8IChzdHJpbmcuY2hhckNvZGVBdChpKSAmIDB4M0ZGKSk7XG4gICAgICAgIG91dCArPSBoZXhUYWJsZVsweEYwIHwgKGMgPj4gMTgpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDEyKSAmIDB4M0YpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDYpICYgMHgzRildXG4gICAgICAgICAgICArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuZXhwb3J0cy5jb21wYWN0ID0gZnVuY3Rpb24gY29tcGFjdCh2YWx1ZSkge1xuICAgIHZhciBxdWV1ZSA9IFt7IG9iajogeyBvOiB2YWx1ZSB9LCBwcm9wOiAnbycgfV07XG4gICAgdmFyIHJlZnMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBxdWV1ZVtpXTtcbiAgICAgICAgdmFyIG9iaiA9IGl0ZW0ub2JqW2l0ZW0ucHJvcF07XG5cbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGtleXMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2pdO1xuICAgICAgICAgICAgdmFyIHZhbCA9IG9ialtrZXldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbCAhPT0gbnVsbCAmJiByZWZzLmluZGV4T2YodmFsKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBxdWV1ZS5wdXNoKHsgb2JqOiBvYmosIHByb3A6IGtleSB9KTtcbiAgICAgICAgICAgICAgICByZWZzLnB1c2godmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb21wYWN0UXVldWUocXVldWUpO1xufTtcblxuZXhwb3J0cy5pc1JlZ0V4cCA9IGZ1bmN0aW9uIGlzUmVnRXhwKG9iaikge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59O1xuXG5leHBvcnRzLmlzQnVmZmVyID0gZnVuY3Rpb24gaXNCdWZmZXIob2JqKSB7XG4gICAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuICEhKG9iai5jb25zdHJ1Y3RvciAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iaikpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogRGVjb2RlIGEgVVJJIGVuY29kZWQgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgVVJJIGVuY29kZWQgc3RyaW5nLlxuICogQHJldHVybnMge1N0cmluZ30gVGhlIGRlY29kZWQgc3RyaW5nLlxuICogQGFwaSBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGRlY29kZShpbnB1dCkge1xuICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGlucHV0LnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcbn1cblxuLyoqXG4gKiBTaW1wbGUgcXVlcnkgc3RyaW5nIHBhcnNlci5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcXVlcnkgVGhlIHF1ZXJ5IHN0cmluZyB0aGF0IG5lZWRzIHRvIGJlIHBhcnNlZC5cbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBxdWVyeXN0cmluZyhxdWVyeSkge1xuICB2YXIgcGFyc2VyID0gLyhbXj0/Jl0rKT0/KFteJl0qKS9nXG4gICAgLCByZXN1bHQgPSB7fVxuICAgICwgcGFydDtcblxuICAvL1xuICAvLyBMaXR0bGUgbmlmdHkgcGFyc2luZyBoYWNrLCBsZXZlcmFnZSB0aGUgZmFjdCB0aGF0IFJlZ0V4cC5leGVjIGluY3JlbWVudHNcbiAgLy8gdGhlIGxhc3RJbmRleCBwcm9wZXJ0eSBzbyB3ZSBjYW4gY29udGludWUgZXhlY3V0aW5nIHRoaXMgbG9vcCB1bnRpbCB3ZSd2ZVxuICAvLyBwYXJzZWQgYWxsIHJlc3VsdHMuXG4gIC8vXG4gIGZvciAoO1xuICAgIHBhcnQgPSBwYXJzZXIuZXhlYyhxdWVyeSk7XG4gICAgcmVzdWx0W2RlY29kZShwYXJ0WzFdKV0gPSBkZWNvZGUocGFydFsyXSlcbiAgKTtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRyYW5zZm9ybSBhIHF1ZXJ5IHN0cmluZyB0byBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBPYmplY3QgdGhhdCBzaG91bGQgYmUgdHJhbnNmb3JtZWQuXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJlZml4IE9wdGlvbmFsIHByZWZpeC5cbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBxdWVyeXN0cmluZ2lmeShvYmosIHByZWZpeCkge1xuICBwcmVmaXggPSBwcmVmaXggfHwgJyc7XG5cbiAgdmFyIHBhaXJzID0gW107XG5cbiAgLy9cbiAgLy8gT3B0aW9uYWxseSBwcmVmaXggd2l0aCBhICc/JyBpZiBuZWVkZWRcbiAgLy9cbiAgaWYgKCdzdHJpbmcnICE9PSB0eXBlb2YgcHJlZml4KSBwcmVmaXggPSAnPyc7XG5cbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChoYXMuY2FsbChvYmosIGtleSkpIHtcbiAgICAgIHBhaXJzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyc9JysgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtrZXldKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBhaXJzLmxlbmd0aCA/IHByZWZpeCArIHBhaXJzLmpvaW4oJyYnKSA6ICcnO1xufVxuXG4vL1xuLy8gRXhwb3NlIHRoZSBtb2R1bGUuXG4vL1xuZXhwb3J0cy5zdHJpbmdpZnkgPSBxdWVyeXN0cmluZ2lmeTtcbmV4cG9ydHMucGFyc2UgPSBxdWVyeXN0cmluZztcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDaGVjayBpZiB3ZSdyZSByZXF1aXJlZCB0byBhZGQgYSBwb3J0IG51bWJlci5cbiAqXG4gKiBAc2VlIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZGVmYXVsdC1wb3J0XG4gKiBAcGFyYW0ge051bWJlcnxTdHJpbmd9IHBvcnQgUG9ydCBudW1iZXIgd2UgbmVlZCB0byBjaGVja1xuICogQHBhcmFtIHtTdHJpbmd9IHByb3RvY29sIFByb3RvY29sIHdlIG5lZWQgdG8gY2hlY2sgYWdhaW5zdC5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBJcyBpdCBhIGRlZmF1bHQgcG9ydCBmb3IgdGhlIGdpdmVuIHByb3RvY29sXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByZXF1aXJlZChwb3J0LCBwcm90b2NvbCkge1xuICBwcm90b2NvbCA9IHByb3RvY29sLnNwbGl0KCc6JylbMF07XG4gIHBvcnQgPSArcG9ydDtcblxuICBpZiAoIXBvcnQpIHJldHVybiBmYWxzZTtcblxuICBzd2l0Y2ggKHByb3RvY29sKSB7XG4gICAgY2FzZSAnaHR0cCc6XG4gICAgY2FzZSAnd3MnOlxuICAgIHJldHVybiBwb3J0ICE9PSA4MDtcblxuICAgIGNhc2UgJ2h0dHBzJzpcbiAgICBjYXNlICd3c3MnOlxuICAgIHJldHVybiBwb3J0ICE9PSA0NDM7XG5cbiAgICBjYXNlICdmdHAnOlxuICAgIHJldHVybiBwb3J0ICE9PSAyMTtcblxuICAgIGNhc2UgJ2dvcGhlcic6XG4gICAgcmV0dXJuIHBvcnQgIT09IDcwO1xuXG4gICAgY2FzZSAnZmlsZSc6XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHBvcnQgIT09IDA7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVxdWlyZWQgPSByZXF1aXJlKCdyZXF1aXJlcy1wb3J0JylcbiAgLCBxcyA9IHJlcXVpcmUoJ3F1ZXJ5c3RyaW5naWZ5JylcbiAgLCBwcm90b2NvbHJlID0gL14oW2Etel1bYS16MC05ListXSo6KT8oXFwvXFwvKT8oW1xcU1xcc10qKS9pXG4gICwgc2xhc2hlcyA9IC9eW0EtWmEtel1bQS1aYS16MC05Ky0uXSo6XFwvXFwvLztcblxuLyoqXG4gKiBUaGVzZSBhcmUgdGhlIHBhcnNlIHJ1bGVzIGZvciB0aGUgVVJMIHBhcnNlciwgaXQgaW5mb3JtcyB0aGUgcGFyc2VyXG4gKiBhYm91dDpcbiAqXG4gKiAwLiBUaGUgY2hhciBpdCBOZWVkcyB0byBwYXJzZSwgaWYgaXQncyBhIHN0cmluZyBpdCBzaG91bGQgYmUgZG9uZSB1c2luZ1xuICogICAgaW5kZXhPZiwgUmVnRXhwIHVzaW5nIGV4ZWMgYW5kIE5hTiBtZWFucyBzZXQgYXMgY3VycmVudCB2YWx1ZS5cbiAqIDEuIFRoZSBwcm9wZXJ0eSB3ZSBzaG91bGQgc2V0IHdoZW4gcGFyc2luZyB0aGlzIHZhbHVlLlxuICogMi4gSW5kaWNhdGlvbiBpZiBpdCdzIGJhY2t3YXJkcyBvciBmb3J3YXJkIHBhcnNpbmcsIHdoZW4gc2V0IGFzIG51bWJlciBpdCdzXG4gKiAgICB0aGUgdmFsdWUgb2YgZXh0cmEgY2hhcnMgdGhhdCBzaG91bGQgYmUgc3BsaXQgb2ZmLlxuICogMy4gSW5oZXJpdCBmcm9tIGxvY2F0aW9uIGlmIG5vbiBleGlzdGluZyBpbiB0aGUgcGFyc2VyLlxuICogNC4gYHRvTG93ZXJDYXNlYCB0aGUgcmVzdWx0aW5nIHZhbHVlLlxuICovXG52YXIgcnVsZXMgPSBbXG4gIFsnIycsICdoYXNoJ10sICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXh0cmFjdCBmcm9tIHRoZSBiYWNrLlxuICBbJz8nLCAncXVlcnknXSwgICAgICAgICAgICAgICAgICAgICAgIC8vIEV4dHJhY3QgZnJvbSB0aGUgYmFjay5cbiAgWycvJywgJ3BhdGhuYW1lJ10sICAgICAgICAgICAgICAgICAgICAvLyBFeHRyYWN0IGZyb20gdGhlIGJhY2suXG4gIFsnQCcsICdhdXRoJywgMV0sICAgICAgICAgICAgICAgICAgICAgLy8gRXh0cmFjdCBmcm9tIHRoZSBmcm9udC5cbiAgW05hTiwgJ2hvc3QnLCB1bmRlZmluZWQsIDEsIDFdLCAgICAgICAvLyBTZXQgbGVmdCBvdmVyIHZhbHVlLlxuICBbLzooXFxkKykkLywgJ3BvcnQnLCB1bmRlZmluZWQsIDFdLCAgICAvLyBSZWdFeHAgdGhlIGJhY2suXG4gIFtOYU4sICdob3N0bmFtZScsIHVuZGVmaW5lZCwgMSwgMV0gICAgLy8gU2V0IGxlZnQgb3Zlci5cbl07XG5cbi8qKlxuICogVGhlc2UgcHJvcGVydGllcyBzaG91bGQgbm90IGJlIGNvcGllZCBvciBpbmhlcml0ZWQgZnJvbS4gVGhpcyBpcyBvbmx5IG5lZWRlZFxuICogZm9yIGFsbCBub24gYmxvYiBVUkwncyBhcyBhIGJsb2IgVVJMIGRvZXMgbm90IGluY2x1ZGUgYSBoYXNoLCBvbmx5IHRoZVxuICogb3JpZ2luLlxuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG52YXIgaWdub3JlID0geyBoYXNoOiAxLCBxdWVyeTogMSB9O1xuXG4vKipcbiAqIFRoZSBsb2NhdGlvbiBvYmplY3QgZGlmZmVycyB3aGVuIHlvdXIgY29kZSBpcyBsb2FkZWQgdGhyb3VnaCBhIG5vcm1hbCBwYWdlLFxuICogV29ya2VyIG9yIHRocm91Z2ggYSB3b3JrZXIgdXNpbmcgYSBibG9iLiBBbmQgd2l0aCB0aGUgYmxvYmJsZSBiZWdpbnMgdGhlXG4gKiB0cm91YmxlIGFzIHRoZSBsb2NhdGlvbiBvYmplY3Qgd2lsbCBjb250YWluIHRoZSBVUkwgb2YgdGhlIGJsb2IsIG5vdCB0aGVcbiAqIGxvY2F0aW9uIG9mIHRoZSBwYWdlIHdoZXJlIG91ciBjb2RlIGlzIGxvYWRlZCBpbi4gVGhlIGFjdHVhbCBvcmlnaW4gaXNcbiAqIGVuY29kZWQgaW4gdGhlIGBwYXRobmFtZWAgc28gd2UgY2FuIHRoYW5rZnVsbHkgZ2VuZXJhdGUgYSBnb29kIFwiZGVmYXVsdFwiXG4gKiBsb2NhdGlvbiBmcm9tIGl0IHNvIHdlIGNhbiBnZW5lcmF0ZSBwcm9wZXIgcmVsYXRpdmUgVVJMJ3MgYWdhaW4uXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBsb2MgT3B0aW9uYWwgZGVmYXVsdCBsb2NhdGlvbiBvYmplY3QuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBsb2xjYXRpb24gb2JqZWN0LlxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gbG9sY2F0aW9uKGxvYykge1xuICBsb2MgPSBsb2MgfHwgZ2xvYmFsLmxvY2F0aW9uIHx8IHt9O1xuXG4gIHZhciBmaW5hbGRlc3RpbmF0aW9uID0ge31cbiAgICAsIHR5cGUgPSB0eXBlb2YgbG9jXG4gICAgLCBrZXk7XG5cbiAgaWYgKCdibG9iOicgPT09IGxvYy5wcm90b2NvbCkge1xuICAgIGZpbmFsZGVzdGluYXRpb24gPSBuZXcgVVJMKHVuZXNjYXBlKGxvYy5wYXRobmFtZSksIHt9KTtcbiAgfSBlbHNlIGlmICgnc3RyaW5nJyA9PT0gdHlwZSkge1xuICAgIGZpbmFsZGVzdGluYXRpb24gPSBuZXcgVVJMKGxvYywge30pO1xuICAgIGZvciAoa2V5IGluIGlnbm9yZSkgZGVsZXRlIGZpbmFsZGVzdGluYXRpb25ba2V5XTtcbiAgfSBlbHNlIGlmICgnb2JqZWN0JyA9PT0gdHlwZSkge1xuICAgIGZvciAoa2V5IGluIGxvYykge1xuICAgICAgaWYgKGtleSBpbiBpZ25vcmUpIGNvbnRpbnVlO1xuICAgICAgZmluYWxkZXN0aW5hdGlvbltrZXldID0gbG9jW2tleV07XG4gICAgfVxuXG4gICAgaWYgKGZpbmFsZGVzdGluYXRpb24uc2xhc2hlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBmaW5hbGRlc3RpbmF0aW9uLnNsYXNoZXMgPSBzbGFzaGVzLnRlc3QobG9jLmhyZWYpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmaW5hbGRlc3RpbmF0aW9uO1xufVxuXG4vKipcbiAqIEB0eXBlZGVmIFByb3RvY29sRXh0cmFjdFxuICogQHR5cGUgT2JqZWN0XG4gKiBAcHJvcGVydHkge1N0cmluZ30gcHJvdG9jb2wgUHJvdG9jb2wgbWF0Y2hlZCBpbiB0aGUgVVJMLCBpbiBsb3dlcmNhc2UuXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IHNsYXNoZXMgYHRydWVgIGlmIHByb3RvY29sIGlzIGZvbGxvd2VkIGJ5IFwiLy9cIiwgZWxzZSBgZmFsc2VgLlxuICogQHByb3BlcnR5IHtTdHJpbmd9IHJlc3QgUmVzdCBvZiB0aGUgVVJMIHRoYXQgaXMgbm90IHBhcnQgb2YgdGhlIHByb3RvY29sLlxuICovXG5cbi8qKlxuICogRXh0cmFjdCBwcm90b2NvbCBpbmZvcm1hdGlvbiBmcm9tIGEgVVJMIHdpdGgvd2l0aG91dCBkb3VibGUgc2xhc2ggKFwiLy9cIikuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3MgVVJMIHdlIHdhbnQgdG8gZXh0cmFjdCBmcm9tLlxuICogQHJldHVybiB7UHJvdG9jb2xFeHRyYWN0fSBFeHRyYWN0ZWQgaW5mb3JtYXRpb24uXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZXh0cmFjdFByb3RvY29sKGFkZHJlc3MpIHtcbiAgdmFyIG1hdGNoID0gcHJvdG9jb2xyZS5leGVjKGFkZHJlc3MpO1xuXG4gIHJldHVybiB7XG4gICAgcHJvdG9jb2w6IG1hdGNoWzFdID8gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKSA6ICcnLFxuICAgIHNsYXNoZXM6ICEhbWF0Y2hbMl0sXG4gICAgcmVzdDogbWF0Y2hbM11cbiAgfTtcbn1cblxuLyoqXG4gKiBSZXNvbHZlIGEgcmVsYXRpdmUgVVJMIHBhdGhuYW1lIGFnYWluc3QgYSBiYXNlIFVSTCBwYXRobmFtZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcmVsYXRpdmUgUGF0aG5hbWUgb2YgdGhlIHJlbGF0aXZlIFVSTC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBiYXNlIFBhdGhuYW1lIG9mIHRoZSBiYXNlIFVSTC5cbiAqIEByZXR1cm4ge1N0cmluZ30gUmVzb2x2ZWQgcGF0aG5hbWUuXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcmVzb2x2ZShyZWxhdGl2ZSwgYmFzZSkge1xuICB2YXIgcGF0aCA9IChiYXNlIHx8ICcvJykuc3BsaXQoJy8nKS5zbGljZSgwLCAtMSkuY29uY2F0KHJlbGF0aXZlLnNwbGl0KCcvJykpXG4gICAgLCBpID0gcGF0aC5sZW5ndGhcbiAgICAsIGxhc3QgPSBwYXRoW2kgLSAxXVxuICAgICwgdW5zaGlmdCA9IGZhbHNlXG4gICAgLCB1cCA9IDA7XG5cbiAgd2hpbGUgKGktLSkge1xuICAgIGlmIChwYXRoW2ldID09PSAnLicpIHtcbiAgICAgIHBhdGguc3BsaWNlKGksIDEpO1xuICAgIH0gZWxzZSBpZiAocGF0aFtpXSA9PT0gJy4uJykge1xuICAgICAgcGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgICB1cCsrO1xuICAgIH0gZWxzZSBpZiAodXApIHtcbiAgICAgIGlmIChpID09PSAwKSB1bnNoaWZ0ID0gdHJ1ZTtcbiAgICAgIHBhdGguc3BsaWNlKGksIDEpO1xuICAgICAgdXAtLTtcbiAgICB9XG4gIH1cblxuICBpZiAodW5zaGlmdCkgcGF0aC51bnNoaWZ0KCcnKTtcbiAgaWYgKGxhc3QgPT09ICcuJyB8fCBsYXN0ID09PSAnLi4nKSBwYXRoLnB1c2goJycpO1xuXG4gIHJldHVybiBwYXRoLmpvaW4oJy8nKTtcbn1cblxuLyoqXG4gKiBUaGUgYWN0dWFsIFVSTCBpbnN0YW5jZS4gSW5zdGVhZCBvZiByZXR1cm5pbmcgYW4gb2JqZWN0IHdlJ3ZlIG9wdGVkLWluIHRvXG4gKiBjcmVhdGUgYW4gYWN0dWFsIGNvbnN0cnVjdG9yIGFzIGl0J3MgbXVjaCBtb3JlIG1lbW9yeSBlZmZpY2llbnQgYW5kXG4gKiBmYXN0ZXIgYW5kIGl0IHBsZWFzZXMgbXkgT0NELlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3MgVVJMIHdlIHdhbnQgdG8gcGFyc2UuXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGxvY2F0aW9uIExvY2F0aW9uIGRlZmF1bHRzIGZvciByZWxhdGl2ZSBwYXRocy5cbiAqIEBwYXJhbSB7Qm9vbGVhbnxGdW5jdGlvbn0gcGFyc2VyIFBhcnNlciBmb3IgdGhlIHF1ZXJ5IHN0cmluZy5cbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIFVSTChhZGRyZXNzLCBsb2NhdGlvbiwgcGFyc2VyKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBVUkwpKSB7XG4gICAgcmV0dXJuIG5ldyBVUkwoYWRkcmVzcywgbG9jYXRpb24sIHBhcnNlcik7XG4gIH1cblxuICB2YXIgcmVsYXRpdmUsIGV4dHJhY3RlZCwgcGFyc2UsIGluc3RydWN0aW9uLCBpbmRleCwga2V5XG4gICAgLCBpbnN0cnVjdGlvbnMgPSBydWxlcy5zbGljZSgpXG4gICAgLCB0eXBlID0gdHlwZW9mIGxvY2F0aW9uXG4gICAgLCB1cmwgPSB0aGlzXG4gICAgLCBpID0gMDtcblxuICAvL1xuICAvLyBUaGUgZm9sbG93aW5nIGlmIHN0YXRlbWVudHMgYWxsb3dzIHRoaXMgbW9kdWxlIHR3byBoYXZlIGNvbXBhdGliaWxpdHkgd2l0aFxuICAvLyAyIGRpZmZlcmVudCBBUEk6XG4gIC8vXG4gIC8vIDEuIE5vZGUuanMncyBgdXJsLnBhcnNlYCBhcGkgd2hpY2ggYWNjZXB0cyBhIFVSTCwgYm9vbGVhbiBhcyBhcmd1bWVudHNcbiAgLy8gICAgd2hlcmUgdGhlIGJvb2xlYW4gaW5kaWNhdGVzIHRoYXQgdGhlIHF1ZXJ5IHN0cmluZyBzaG91bGQgYWxzbyBiZSBwYXJzZWQuXG4gIC8vXG4gIC8vIDIuIFRoZSBgVVJMYCBpbnRlcmZhY2Ugb2YgdGhlIGJyb3dzZXIgd2hpY2ggYWNjZXB0cyBhIFVSTCwgb2JqZWN0IGFzXG4gIC8vICAgIGFyZ3VtZW50cy4gVGhlIHN1cHBsaWVkIG9iamVjdCB3aWxsIGJlIHVzZWQgYXMgZGVmYXVsdCB2YWx1ZXMgLyBmYWxsLWJhY2tcbiAgLy8gICAgZm9yIHJlbGF0aXZlIHBhdGhzLlxuICAvL1xuICBpZiAoJ29iamVjdCcgIT09IHR5cGUgJiYgJ3N0cmluZycgIT09IHR5cGUpIHtcbiAgICBwYXJzZXIgPSBsb2NhdGlvbjtcbiAgICBsb2NhdGlvbiA9IG51bGw7XG4gIH1cblxuICBpZiAocGFyc2VyICYmICdmdW5jdGlvbicgIT09IHR5cGVvZiBwYXJzZXIpIHBhcnNlciA9IHFzLnBhcnNlO1xuXG4gIGxvY2F0aW9uID0gbG9sY2F0aW9uKGxvY2F0aW9uKTtcblxuICAvL1xuICAvLyBFeHRyYWN0IHByb3RvY29sIGluZm9ybWF0aW9uIGJlZm9yZSBydW5uaW5nIHRoZSBpbnN0cnVjdGlvbnMuXG4gIC8vXG4gIGV4dHJhY3RlZCA9IGV4dHJhY3RQcm90b2NvbChhZGRyZXNzIHx8ICcnKTtcbiAgcmVsYXRpdmUgPSAhZXh0cmFjdGVkLnByb3RvY29sICYmICFleHRyYWN0ZWQuc2xhc2hlcztcbiAgdXJsLnNsYXNoZXMgPSBleHRyYWN0ZWQuc2xhc2hlcyB8fCByZWxhdGl2ZSAmJiBsb2NhdGlvbi5zbGFzaGVzO1xuICB1cmwucHJvdG9jb2wgPSBleHRyYWN0ZWQucHJvdG9jb2wgfHwgbG9jYXRpb24ucHJvdG9jb2wgfHwgJyc7XG4gIGFkZHJlc3MgPSBleHRyYWN0ZWQucmVzdDtcblxuICAvL1xuICAvLyBXaGVuIHRoZSBhdXRob3JpdHkgY29tcG9uZW50IGlzIGFic2VudCB0aGUgVVJMIHN0YXJ0cyB3aXRoIGEgcGF0aFxuICAvLyBjb21wb25lbnQuXG4gIC8vXG4gIGlmICghZXh0cmFjdGVkLnNsYXNoZXMpIGluc3RydWN0aW9uc1syXSA9IFsvKC4qKS8sICdwYXRobmFtZSddO1xuXG4gIGZvciAoOyBpIDwgaW5zdHJ1Y3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgaW5zdHJ1Y3Rpb24gPSBpbnN0cnVjdGlvbnNbaV07XG4gICAgcGFyc2UgPSBpbnN0cnVjdGlvblswXTtcbiAgICBrZXkgPSBpbnN0cnVjdGlvblsxXTtcblxuICAgIGlmIChwYXJzZSAhPT0gcGFyc2UpIHtcbiAgICAgIHVybFtrZXldID0gYWRkcmVzcztcbiAgICB9IGVsc2UgaWYgKCdzdHJpbmcnID09PSB0eXBlb2YgcGFyc2UpIHtcbiAgICAgIGlmICh+KGluZGV4ID0gYWRkcmVzcy5pbmRleE9mKHBhcnNlKSkpIHtcbiAgICAgICAgaWYgKCdudW1iZXInID09PSB0eXBlb2YgaW5zdHJ1Y3Rpb25bMl0pIHtcbiAgICAgICAgICB1cmxba2V5XSA9IGFkZHJlc3Muc2xpY2UoMCwgaW5kZXgpO1xuICAgICAgICAgIGFkZHJlc3MgPSBhZGRyZXNzLnNsaWNlKGluZGV4ICsgaW5zdHJ1Y3Rpb25bMl0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVybFtrZXldID0gYWRkcmVzcy5zbGljZShpbmRleCk7XG4gICAgICAgICAgYWRkcmVzcyA9IGFkZHJlc3Muc2xpY2UoMCwgaW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICgoaW5kZXggPSBwYXJzZS5leGVjKGFkZHJlc3MpKSkge1xuICAgICAgdXJsW2tleV0gPSBpbmRleFsxXTtcbiAgICAgIGFkZHJlc3MgPSBhZGRyZXNzLnNsaWNlKDAsIGluZGV4LmluZGV4KTtcbiAgICB9XG5cbiAgICB1cmxba2V5XSA9IHVybFtrZXldIHx8IChcbiAgICAgIHJlbGF0aXZlICYmIGluc3RydWN0aW9uWzNdID8gbG9jYXRpb25ba2V5XSB8fCAnJyA6ICcnXG4gICAgKTtcblxuICAgIC8vXG4gICAgLy8gSG9zdG5hbWUsIGhvc3QgYW5kIHByb3RvY29sIHNob3VsZCBiZSBsb3dlcmNhc2VkIHNvIHRoZXkgY2FuIGJlIHVzZWQgdG9cbiAgICAvLyBjcmVhdGUgYSBwcm9wZXIgYG9yaWdpbmAuXG4gICAgLy9cbiAgICBpZiAoaW5zdHJ1Y3Rpb25bNF0pIHVybFtrZXldID0gdXJsW2tleV0udG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIC8vXG4gIC8vIEFsc28gcGFyc2UgdGhlIHN1cHBsaWVkIHF1ZXJ5IHN0cmluZyBpbiB0byBhbiBvYmplY3QuIElmIHdlJ3JlIHN1cHBsaWVkXG4gIC8vIHdpdGggYSBjdXN0b20gcGFyc2VyIGFzIGZ1bmN0aW9uIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIGRlZmF1bHQgYnVpbGQtaW5cbiAgLy8gcGFyc2VyLlxuICAvL1xuICBpZiAocGFyc2VyKSB1cmwucXVlcnkgPSBwYXJzZXIodXJsLnF1ZXJ5KTtcblxuICAvL1xuICAvLyBJZiB0aGUgVVJMIGlzIHJlbGF0aXZlLCByZXNvbHZlIHRoZSBwYXRobmFtZSBhZ2FpbnN0IHRoZSBiYXNlIFVSTC5cbiAgLy9cbiAgaWYgKFxuICAgICAgcmVsYXRpdmVcbiAgICAmJiBsb2NhdGlvbi5zbGFzaGVzXG4gICAgJiYgdXJsLnBhdGhuYW1lLmNoYXJBdCgwKSAhPT0gJy8nXG4gICAgJiYgKHVybC5wYXRobmFtZSAhPT0gJycgfHwgbG9jYXRpb24ucGF0aG5hbWUgIT09ICcnKVxuICApIHtcbiAgICB1cmwucGF0aG5hbWUgPSByZXNvbHZlKHVybC5wYXRobmFtZSwgbG9jYXRpb24ucGF0aG5hbWUpO1xuICB9XG5cbiAgLy9cbiAgLy8gV2Ugc2hvdWxkIG5vdCBhZGQgcG9ydCBudW1iZXJzIGlmIHRoZXkgYXJlIGFscmVhZHkgdGhlIGRlZmF1bHQgcG9ydCBudW1iZXJcbiAgLy8gZm9yIGEgZ2l2ZW4gcHJvdG9jb2wuIEFzIHRoZSBob3N0IGFsc28gY29udGFpbnMgdGhlIHBvcnQgbnVtYmVyIHdlJ3JlIGdvaW5nXG4gIC8vIG92ZXJyaWRlIGl0IHdpdGggdGhlIGhvc3RuYW1lIHdoaWNoIGNvbnRhaW5zIG5vIHBvcnQgbnVtYmVyLlxuICAvL1xuICBpZiAoIXJlcXVpcmVkKHVybC5wb3J0LCB1cmwucHJvdG9jb2wpKSB7XG4gICAgdXJsLmhvc3QgPSB1cmwuaG9zdG5hbWU7XG4gICAgdXJsLnBvcnQgPSAnJztcbiAgfVxuXG4gIC8vXG4gIC8vIFBhcnNlIGRvd24gdGhlIGBhdXRoYCBmb3IgdGhlIHVzZXJuYW1lIGFuZCBwYXNzd29yZC5cbiAgLy9cbiAgdXJsLnVzZXJuYW1lID0gdXJsLnBhc3N3b3JkID0gJyc7XG4gIGlmICh1cmwuYXV0aCkge1xuICAgIGluc3RydWN0aW9uID0gdXJsLmF1dGguc3BsaXQoJzonKTtcbiAgICB1cmwudXNlcm5hbWUgPSBpbnN0cnVjdGlvblswXSB8fCAnJztcbiAgICB1cmwucGFzc3dvcmQgPSBpbnN0cnVjdGlvblsxXSB8fCAnJztcbiAgfVxuXG4gIHVybC5vcmlnaW4gPSB1cmwucHJvdG9jb2wgJiYgdXJsLmhvc3QgJiYgdXJsLnByb3RvY29sICE9PSAnZmlsZTonXG4gICAgPyB1cmwucHJvdG9jb2wgKycvLycrIHVybC5ob3N0XG4gICAgOiAnbnVsbCc7XG5cbiAgLy9cbiAgLy8gVGhlIGhyZWYgaXMganVzdCB0aGUgY29tcGlsZWQgcmVzdWx0LlxuICAvL1xuICB1cmwuaHJlZiA9IHVybC50b1N0cmluZygpO1xufVxuXG4vKipcbiAqIFRoaXMgaXMgY29udmVuaWVuY2UgbWV0aG9kIGZvciBjaGFuZ2luZyBwcm9wZXJ0aWVzIGluIHRoZSBVUkwgaW5zdGFuY2UgdG9cbiAqIGluc3VyZSB0aGF0IHRoZXkgYWxsIHByb3BhZ2F0ZSBjb3JyZWN0bHkuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHBhcnQgICAgICAgICAgUHJvcGVydHkgd2UgbmVlZCB0byBhZGp1c3QuXG4gKiBAcGFyYW0ge01peGVkfSB2YWx1ZSAgICAgICAgICBUaGUgbmV3bHkgYXNzaWduZWQgdmFsdWUuXG4gKiBAcGFyYW0ge0Jvb2xlYW58RnVuY3Rpb259IGZuICBXaGVuIHNldHRpbmcgdGhlIHF1ZXJ5LCBpdCB3aWxsIGJlIHRoZSBmdW5jdGlvblxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlZCB0byBwYXJzZSB0aGUgcXVlcnkuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBXaGVuIHNldHRpbmcgdGhlIHByb3RvY29sLCBkb3VibGUgc2xhc2ggd2lsbCBiZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZCBmcm9tIHRoZSBmaW5hbCB1cmwgaWYgaXQgaXMgdHJ1ZS5cbiAqIEByZXR1cm5zIHtVUkx9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBzZXQocGFydCwgdmFsdWUsIGZuKSB7XG4gIHZhciB1cmwgPSB0aGlzO1xuXG4gIHN3aXRjaCAocGFydCkge1xuICAgIGNhc2UgJ3F1ZXJ5JzpcbiAgICAgIGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIHZhbHVlICYmIHZhbHVlLmxlbmd0aCkge1xuICAgICAgICB2YWx1ZSA9IChmbiB8fCBxcy5wYXJzZSkodmFsdWUpO1xuICAgICAgfVxuXG4gICAgICB1cmxbcGFydF0gPSB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAncG9ydCc6XG4gICAgICB1cmxbcGFydF0gPSB2YWx1ZTtcblxuICAgICAgaWYgKCFyZXF1aXJlZCh2YWx1ZSwgdXJsLnByb3RvY29sKSkge1xuICAgICAgICB1cmwuaG9zdCA9IHVybC5ob3N0bmFtZTtcbiAgICAgICAgdXJsW3BhcnRdID0gJyc7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlKSB7XG4gICAgICAgIHVybC5ob3N0ID0gdXJsLmhvc3RuYW1lICsnOicrIHZhbHVlO1xuICAgICAgfVxuXG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2hvc3RuYW1lJzpcbiAgICAgIHVybFtwYXJ0XSA9IHZhbHVlO1xuXG4gICAgICBpZiAodXJsLnBvcnQpIHZhbHVlICs9ICc6JysgdXJsLnBvcnQ7XG4gICAgICB1cmwuaG9zdCA9IHZhbHVlO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdob3N0JzpcbiAgICAgIHVybFtwYXJ0XSA9IHZhbHVlO1xuXG4gICAgICBpZiAoLzpcXGQrJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5zcGxpdCgnOicpO1xuICAgICAgICB1cmwucG9ydCA9IHZhbHVlLnBvcCgpO1xuICAgICAgICB1cmwuaG9zdG5hbWUgPSB2YWx1ZS5qb2luKCc6Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cmwuaG9zdG5hbWUgPSB2YWx1ZTtcbiAgICAgICAgdXJsLnBvcnQgPSAnJztcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdwcm90b2NvbCc6XG4gICAgICB1cmwucHJvdG9jb2wgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgdXJsLnNsYXNoZXMgPSAhZm47XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ3BhdGhuYW1lJzpcbiAgICBjYXNlICdoYXNoJzpcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB2YXIgY2hhciA9IHBhcnQgPT09ICdwYXRobmFtZScgPyAnLycgOiAnIyc7XG4gICAgICAgIHVybFtwYXJ0XSA9IHZhbHVlLmNoYXJBdCgwKSAhPT0gY2hhciA/IGNoYXIgKyB2YWx1ZSA6IHZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXJsW3BhcnRdID0gdmFsdWU7XG4gICAgICB9XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICB1cmxbcGFydF0gPSB2YWx1ZTtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcnVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaW5zID0gcnVsZXNbaV07XG5cbiAgICBpZiAoaW5zWzRdKSB1cmxbaW5zWzFdXSA9IHVybFtpbnNbMV1dLnRvTG93ZXJDYXNlKCk7XG4gIH1cblxuICB1cmwub3JpZ2luID0gdXJsLnByb3RvY29sICYmIHVybC5ob3N0ICYmIHVybC5wcm90b2NvbCAhPT0gJ2ZpbGU6J1xuICAgID8gdXJsLnByb3RvY29sICsnLy8nKyB1cmwuaG9zdFxuICAgIDogJ251bGwnO1xuXG4gIHVybC5ocmVmID0gdXJsLnRvU3RyaW5nKCk7XG5cbiAgcmV0dXJuIHVybDtcbn1cblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIHByb3BlcnRpZXMgYmFjayBpbiB0byBhIHZhbGlkIGFuZCBmdWxsIFVSTCBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3RyaW5naWZ5IE9wdGlvbmFsIHF1ZXJ5IHN0cmluZ2lmeSBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiB0b1N0cmluZyhzdHJpbmdpZnkpIHtcbiAgaWYgKCFzdHJpbmdpZnkgfHwgJ2Z1bmN0aW9uJyAhPT0gdHlwZW9mIHN0cmluZ2lmeSkgc3RyaW5naWZ5ID0gcXMuc3RyaW5naWZ5O1xuXG4gIHZhciBxdWVyeVxuICAgICwgdXJsID0gdGhpc1xuICAgICwgcHJvdG9jb2wgPSB1cmwucHJvdG9jb2w7XG5cbiAgaWYgKHByb3RvY29sICYmIHByb3RvY29sLmNoYXJBdChwcm90b2NvbC5sZW5ndGggLSAxKSAhPT0gJzonKSBwcm90b2NvbCArPSAnOic7XG5cbiAgdmFyIHJlc3VsdCA9IHByb3RvY29sICsgKHVybC5zbGFzaGVzID8gJy8vJyA6ICcnKTtcblxuICBpZiAodXJsLnVzZXJuYW1lKSB7XG4gICAgcmVzdWx0ICs9IHVybC51c2VybmFtZTtcbiAgICBpZiAodXJsLnBhc3N3b3JkKSByZXN1bHQgKz0gJzonKyB1cmwucGFzc3dvcmQ7XG4gICAgcmVzdWx0ICs9ICdAJztcbiAgfVxuXG4gIHJlc3VsdCArPSB1cmwuaG9zdCArIHVybC5wYXRobmFtZTtcblxuICBxdWVyeSA9ICdvYmplY3QnID09PSB0eXBlb2YgdXJsLnF1ZXJ5ID8gc3RyaW5naWZ5KHVybC5xdWVyeSkgOiB1cmwucXVlcnk7XG4gIGlmIChxdWVyeSkgcmVzdWx0ICs9ICc/JyAhPT0gcXVlcnkuY2hhckF0KDApID8gJz8nKyBxdWVyeSA6IHF1ZXJ5O1xuXG4gIGlmICh1cmwuaGFzaCkgcmVzdWx0ICs9IHVybC5oYXNoO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cblVSTC5wcm90b3R5cGUgPSB7IHNldDogc2V0LCB0b1N0cmluZzogdG9TdHJpbmcgfTtcblxuLy9cbi8vIEV4cG9zZSB0aGUgVVJMIHBhcnNlciBhbmQgc29tZSBhZGRpdGlvbmFsIHByb3BlcnRpZXMgdGhhdCBtaWdodCBiZSB1c2VmdWwgZm9yXG4vLyBvdGhlcnMgb3IgdGVzdGluZy5cbi8vXG5VUkwuZXh0cmFjdFByb3RvY29sID0gZXh0cmFjdFByb3RvY29sO1xuVVJMLmxvY2F0aW9uID0gbG9sY2F0aW9uO1xuVVJMLnFzID0gcXM7XG5cbm1vZHVsZS5leHBvcnRzID0gVVJMO1xuIiwiLypcbiogQHBhcmEgT2JqZWN0IOWvueixoVxuKiBAcmV0dXJuOk9iamVjdCDlr7nosaFcbiogQOS9nOeUqO+8muS4jiBPYmplY3QuYXNzaWduIOexu+S8vFxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgaWYgKGxlbiA8IDEpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmIChsZW4gPT09IDEpIHsgcmV0dXJuIGFyZ3VtZW50c1swXTsgfVxuICBmdW5jdGlvbiBpc09iaih2YWwpIHtcbiAgICByZXR1cm4gdmFsICYmIHZhbC5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0O1xuICB9XG4gIHZhciBxdWV1ZXMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoaXNPYmooYXJndW1lbnRzW2ldKSkge1xuICAgICAgcXVldWVzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgICB9XG4gIH1cbiAgdmFyIGRlc3QgPSBxdWV1ZXNbMF07XG5cbiAgZnVuY3Rpb24gX2FzKGRkLCBzZCkge1xuICAgIGZvciAodmFyIGtleSBpbiBzZCkge1xuICAgICAgLy8gY29uc29sZS5sb2coa2V5LHNkW2tleV0pXG4gICAgICBpZiAoe30uaGFzT3duUHJvcGVydHkuY2FsbChzZCwga2V5KSkge1xuICAgICAgICB2YXIgdmFsO1xuICAgICAgICBpZiAoaXNPYmooc2Rba2V5XSkpIHtcbiAgICAgICAgICBpZiAoe30uaGFzT3duUHJvcGVydHkuY2FsbChkZCwga2V5KSkge1xuICAgICAgICAgICAgaWYgKGlzT2JqKGRkW2tleV0pKSB7XG4gICAgICAgICAgICAgIHZhbCA9IF9hcyhkZFtrZXldLCBzZFtrZXldKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhbCA9IHNkW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbCA9IF9hcyh7fSwgc2Rba2V5XSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbCA9IHNkW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coa2V5LHZhbClcbiAgICAgICAgZGRba2V5XSA9IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2coZGQpXG4gICAgcmV0dXJuIGRkO1xuICB9XG5cbiAgLy8g5LuO56ys5LqM5Liq5byA5aeLXG4gIGZvciAodmFyIGogPSAxOyBqIDwgbGVuOyBqKyspIHtcbiAgICB2YXIgc2QgPSBxdWV1ZXNbal07XG4gICAgX2FzKGRlc3QsIHNkKTtcbiAgfVxuICByZXR1cm4gZGVzdDtcbn07XG4iLCJ2YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgcmVxdWVzdCA9IHJlcXVpcmUoJy4vcmVxdWVzdCcpO1xudmFyIGRhUmVjb21tZW5kID0gcmVxdWlyZSgnLi9kYV9yZWNvbW1lbmQnKTtcbnZhciBsb2cgPSByZXF1aXJlKCcuL2xvZycpO1xudmFyIGNoYW5uZWxTdGF0dXMgPSAnJztcbnZhciBjaGFubmVsT3B0aW9ucyA9IHt9O1xudmFyIHJlcXVlc3RQYXlsb2FkID0ge307XG52YXIgcmVxdWVzdFBheWxvYWREZWZhdWx0ID0ge1xuICAvLyDpgJrov4cgc3NvIOiOt+WPlueahOWPguaVsCAtc3RhcnRcbiAgLy8g55So5oi35ZCNXG4gIHVuYW1lOiAnJyxcbiAgZXVuYW1lOiAnJyxcbiAgLy8g5Lqn5ZOBIHRva2VuXG4gIHZ0b2tlbjogJydcbiAgLy8gLWVuZFxufTtcbnZhciBzZW5kUXVldWVzID0gW107XG52YXIgaGFuZGxlID0ge307XG4vLyDmr4/mrKHlj5HpgIHor7fmsYLliY3vvIzpg73kvJrph43mlrDnlJ/miJAgcGF5bG9hZFxudmFyIGNyZWF0ZVJlcXVlc3RQYXlsb2FkID0gZnVuY3Rpb24gKCkge1xuICB2YXIgcXVlcnlEYXRhID0gY2hhbm5lbE9wdGlvbnMucXVlcnlEYXRhO1xuICB2YXIgcGF5bG9hZCA9IGNoYW5uZWxPcHRpb25zLnBheWxvYWQ7XG4gIHZhciBnbG9iYWwgPSBjaGFubmVsT3B0aW9ucy5icm93c2VyO1xuICB2YXIgZSA9IHt9O1xuICBpZiAoZ2xvYmFsKSB7XG4gICAgaWYgKGRvY3VtZW50KSB7XG4gICAgICBlLnVybCA9IGRvY3VtZW50LlVSTCB8fCAnJztcbiAgICAgIGUucmVmZXJyZXIgPSBkb2N1bWVudC5yZWZlcnJlciB8fCAnJztcbiAgICB9XG4gICAgaWYgKHdpbmRvdyAmJiB3aW5kb3cuc2NyZWVuKSB7XG4gICAgICBlLnNoID0gd2luZG93LnNjcmVlbi5oZWlnaHQgfHwgMDtcbiAgICAgIGUuc3cgPSB3aW5kb3cuc2NyZWVuLndpZHRoIHx8IDA7XG4gICAgfVxuICAgIGlmIChuYXZpZ2F0b3IpIHtcbiAgICAgIGUubGFuZyA9IG5hdmlnYXRvci5sYW5ndWFnZSB8fCAnJztcbiAgICB9XG4gIH1cbiAgaWYgKHF1ZXJ5RGF0YSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVlcnlEYXRhLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgaXQgPSBxdWVyeURhdGFbaV07XG4gICAgICB2YXIga2V5ID0gaXRbMF0sXG4gICAgICAgIHZhbCA9IGl0WzFdO1xuXG4gICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICBjYXNlICdfc2V0QWNjb3VudCc6XG4gICAgICAgICAgZS5hY2NvdW50ID0gdmFsO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdfY2FsbGJhY2snOlxuICAgICAgICAgIGUuY2FsbGJhY2sgPSB2YWw7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ19ncm91cElkJzpcbiAgICAgICAgICBlLmdyb3VwSWQgPSB2YWw7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ19zayc6XG4gICAgICAgICAgZS5zayA9IHZhbDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnX3N2JzpcbiAgICAgICAgICBlLnN2ID0gdmFsO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGVba2V5XSA9IHZhbDtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKHBheWxvYWQudW5hbWUgPT09ICcwJykge1xuICAgIHBheWxvYWQudW5hbWUgPSAnJztcbiAgfVxuXG4gIC8vIOmAmui/hyBzc28g55qEIGpzb25wIOWbnuiwg+iOt+WPlueahCB1bmFtZSDlkowgdG9rZW5cbiAgZS51ID0gcGF5bG9hZC51bmFtZSA/IGVuY29kZVVSSUNvbXBvbmVudChwYXlsb2FkLnVuYW1lKSA6ICcnO1xuICBlLnQgPSBwYXlsb2FkLnZ0b2tlbiA/IGVuY29kZVVSSUNvbXBvbmVudChwYXlsb2FkLnZ0b2tlbikgOiAnJztcblxuICAvLyBsb2coY2hhbm5lbE9wdGlvbnMucGF5bG9hZCk7XG4gIC8vIGxvZyhlKVxuICB1dGlscy5mbi5hc3NpZ24oZSwgcmVxdWVzdFBheWxvYWREZWZhdWx0LCBwYXlsb2FkKTtcbiAgcmVxdWVzdFBheWxvYWQgPSBlO1xufTtcblxudmFyIHNlbmRSZXF1ZXN0ID0gZnVuY3Rpb24gKHNvdXJjZSwgb3B0aW9ucykge1xuICB2YXIgaW5mbyA9IHtcbiAgICBuYW1lOiBzb3VyY2VcbiAgfTtcbiAgdmFyIHJlcU9wcyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpO1xuXG4gIGlmICghY2hhbm5lbE9wdGlvbnMuYnJvd3Nlcikge1xuICAgIC8vIOS9v+eUqOS8oOWFpemFjee9ruWPguaVsOeahCByZXF1ZXN0IOaWueazlVxuICAgIGlmIChjaGFubmVsT3B0aW9ucy5yZXF1ZXN0KSB7XG4gICAgICBpZiAoY2hhbm5lbE9wdGlvbnMuYmVmb3JlU2VuZFJlcXVlc3QpIHtcbiAgICAgICAgcmVxT3BzLmRhdGEgPSBjaGFubmVsT3B0aW9ucy5iZWZvcmVTZW5kUmVxdWVzdChpbmZvLCByZXFPcHMpIHx8IHJlcU9wcy5kYXRhO1xuICAgICAgfVxuICAgICAgY2hhbm5lbE9wdGlvbnMucmVxdWVzdCh7XG4gICAgICAgIHVybDogcmVxT3BzLnVybCxcbiAgICAgICAgZGF0YTogcmVxT3BzLmRhdGEsXG4gICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICByZXFPcHMuY29tcGxldGUgJiYgcmVxT3BzLmNvbXBsZXRlKHJlcU9wcywgcmVzKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIGxvZygn5omT54K55aSx6LSlJywgZXJyKTtcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICByZXFPcHMuY29tcGxldGUgJiYgcmVxT3BzLmNvbXBsZXRlKHJlcU9wcywgcmVzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZygnXFx4MWJbOTFtICcgKyAn6ZSZ6K+v77ya6K+36Ieq5a6a5LmJIHJlcXVlc3Qg5pa55rOVJyArICcgXFx4MWJbMG0nKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8g5L2/55So5YaF572uIHJlcXVlc3Qg5pa55rOVXG4gICAgdmFyIG1ldGhvZE1hcCA9IHtcbiAgICAgIHBhZ2VJbml0OiAnc2NyaXB0JyxcbiAgICAgIHRyYWNrRXZlbnQ6ICdpbWFnZSdcbiAgICB9O1xuXG4gICAgcmVxT3BzLnR5cGUgPSBtZXRob2RNYXBbaW5mby5uYW1lXSB8fCByZXFPcHMudHlwZTtcbiAgICByZXF1ZXN0KGluZm8sIHJlcU9wcyk7XG4gIH1cbn07XG5cbnZhciBmaXJlVHJhY2tFdmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHBheWxvYWRQYXRjaCxcbiAgICBjYjtcbiAgdmFyIGFyZ3MwID0gYXJndW1lbnRzWzBdO1xuICB2YXIgZXh0ID0ge307XG5cbiAgaWYgKGFyZ3MwIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICBleHQgPSBhcmdzMFs0XSA/IGFyZ3MwWzRdIDoge307XG4gICAgZXh0ID0gcmVxdWVzdFBheWxvYWQuZXh0ID8gdXRpbHMuZm4uYXNzaWduKHJlcXVlc3RQYXlsb2FkLmV4dCwgZXh0KSA6IGV4dDtcbiAgICBwYXlsb2FkUGF0Y2ggPSB7XG4gICAgICBjYXRlZ29yeTogYXJnczBbMF0sXG4gICAgICBkYWN0aW9uOiBhcmdzMFsxXSxcbiAgICAgIG9wdExhYmVsOiBhcmdzMFsyXSxcbiAgICAgIG9wdFZhbHVlOiBhcmdzMFszXSxcbiAgICAgIGV4dDogSlNPTi5zdHJpbmdpZnkoZXh0KSxcbiAgICAgIF86IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgfTtcblxuICAgIGNiID0gYXJndW1lbnRzWzFdO1xuICB9IGVsc2Uge1xuICAgIGV4dCA9IGFyZ3VtZW50c1s0XSA/IGFyZ3VtZW50c1s0XSA6IHt9O1xuICAgIGV4dCA9IHJlcXVlc3RQYXlsb2FkLmV4dCA/IHV0aWxzLmZuLmFzc2lnbihyZXF1ZXN0UGF5bG9hZC5leHQsIGV4dCkgOiBleHQ7XG4gICAgcGF5bG9hZFBhdGNoID0ge1xuICAgICAgY2F0ZWdvcnk6IGFyZ3VtZW50c1swXSxcbiAgICAgIGRhY3Rpb246IGFyZ3VtZW50c1sxXSxcbiAgICAgIG9wdExhYmVsOiBhcmd1bWVudHNbMl0sXG4gICAgICBvcHRWYWx1ZTogYXJndW1lbnRzWzNdLFxuICAgICAgZXh0OiBKU09OLnN0cmluZ2lmeShleHQpLFxuICAgICAgXzogbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgICB9O1xuICAgIGNiID0gYXJndW1lbnRzWzVdO1xuICB9XG4gIC8vIOeUn+aIkCByZXF1ZXN0UGF5bG9hZFxuICBjcmVhdGVSZXF1ZXN0UGF5bG9hZCgpO1xuXG4gIHZhciBkYXRhID0gdXRpbHMuZm4uYXNzaWduKHJlcXVlc3RQYXlsb2FkLCBwYXlsb2FkUGF0Y2gpO1xuICB2YXIgdXJsID0gdXRpbHMuZGEuYnVpbGREb21haW4oY2hhbm5lbE9wdGlvbnMuZW52LCBjaGFubmVsT3B0aW9ucy5icm93c2VyKSArICdfZGFfZXZlbnQnO1xuXG4gIHNlbmRSZXF1ZXN0KCd0cmFja0V2ZW50Jywge1xuICAgIHR5cGU6ICdnZXQnLFxuICAgIHVybDogdXJsLFxuICAgIGRhdGE6IGRhdGEsXG4gICAgY29tcGxldGU6IGNiXG4gIH0pO1xufTtcblxuLy8g5omn6KGM6aG16Z2i5Yid5aeL5YyW77yIcHbvvIlcbnZhciBmaXJlUGFnZUluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIOeUn+aIkCByZXF1ZXN0UGF5bG9hZFxuICBjcmVhdGVSZXF1ZXN0UGF5bG9hZCgpO1xuICB2YXIgcmVxT3BzID0ge1xuICAgIHR5cGU6ICdnZXQnLFxuICAgIHVybDogdXRpbHMuZGEuYnVpbGREb21haW4oY2hhbm5lbE9wdGlvbnMuZW52LCBjaGFubmVsT3B0aW9ucy5icm93c2VyKSArICdfZGEnLFxuICAgIGRhdGE6IHJlcXVlc3RQYXlsb2FkXG4gIH07XG5cbiAgcmVxT3BzLmNvbXBsZXRlID0gYXJndW1lbnRzWzBdO1xuICBzZW5kUmVxdWVzdCgncGFnZUluaXQnLCByZXFPcHMpO1xufTtcblxuLy8g5omn6KGM5b6F6K+35rGC6Zif5YiXXG52YXIgZmlyZVNlbmRRdWV1ZXMgPSBmdW5jdGlvbiAob3BzKSB7XG4gIGNoYW5uZWxTdGF0dXMgPSAnb25sb2FkJztcbiAgLy8gbG9nKCdvbmxvYWQnKVxuICAvLyBsb2coc2VuZFF1ZXVlcy5sZW5ndGgpXG4gIGlmIChzZW5kUXVldWVzLmxlbmd0aCkge1xuICAgIC8vIOaJp+ihjOW+heaJp+ihjOeahOmYn+WIl+S7u+WKoVxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzZW5kUXVldWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB2YXIgaXQgPSBzZW5kUXVldWVzW2ldO1xuICAgICAgaGFuZGxlW2l0LmZuTmFtZV0uYXBwbHkoaGFuZGxlLCBpdC5hcmdzKTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIOaJp+ihjCBkYSDliJ3lp4vljJbphY3nva5cbnZhciBmaXJlSW5pdCA9IGZ1bmN0aW9uIChvcHMpIHtcbiAgdXRpbHMuZm4uYXNzaWduKGNoYW5uZWxPcHRpb25zLCBvcHMpO1xuICAvLyDliJ3lp4vljJblhbPkuo7mjqjojZDlhoXlrrnnmoTnu5/orqFcbiAgaWYgKGNoYW5uZWxPcHRpb25zLmJyb3dzZXIpIHtcbiAgICBkYVJlY29tbWVuZC5pbml0KCk7XG4gIH1cbn07XG5cbi8vIOaJp+ihjOmhtemdouaJk+eCuVxudmFyIGZpcmVFdmVudCA9IGZ1bmN0aW9uIChlbmFtZSwgYXJncykge1xuICBsb2coJ2ZpcmVFdmVudCcsIGVuYW1lLCBhcmdzKTtcbiAgaWYgKGNoYW5uZWxPcHRpb25zLmJyb3dzZXIgJiYgY2hhbm5lbFN0YXR1cyAhPT0gJ29ubG9hZCcpIHtcbiAgICAvLyDmtonlj4rmtY/op4jlmajnq6/nmoTlj5HpgIHku7vliqHvvIzpnIDnrYnlvoXnlKjmiLfnmbvlvZXkv6Hmga/ov5Tlm55cbiAgICBpZiAoL3BhZ2VJbml0fHRyYWNrRXZlbnQvLnRlc3QoZW5hbWUpKSB7XG4gICAgICBzZW5kUXVldWVzLnB1c2goeyBmbk5hbWU6IGVuYW1lLCBhcmdzOiBhcmdzIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIGlmIChlbmFtZSA9PT0gJ3RyYWNrRXZlbnQnKSB7XG4gICAgZmlyZVRyYWNrRXZlbnQuYXBwbHkobnVsbCwgYXJncyk7XG4gIH0gZWxzZSBpZiAoZW5hbWUgPT09ICdwYWdlSW5pdCcpIHtcbiAgICBmaXJlUGFnZUluaXQuYXBwbHkobnVsbCwgYXJncyk7XG4gIH0gZWxzZSBpZiAoZW5hbWUgPT09ICdpbml0Jykge1xuICAgIGZpcmVJbml0LmFwcGx5KG51bGwsIGFyZ3MpO1xuICB9IGVsc2UgaWYgKGVuYW1lID09PSAndXNlckxvZ2luJykge1xuICAgIGZpcmVJbml0LmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIGZpcmVTZW5kUXVldWVzLmFwcGx5KG51bGwsIGFyZ3MpO1xuICB9IGVsc2UgaWYgKGVuYW1lID09PSAnb3B0aW9uc1VwZGF0ZScpIHtcbiAgICB1dGlscy5mbi5hc3NpZ24oY2hhbm5lbE9wdGlvbnMsIGFyZ3NbMF0pO1xuICB9XG59O1xuXG5oYW5kbGUgPSB7XG4gIHRyYWNrRXZlbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICBmaXJlRXZlbnQoJ3RyYWNrRXZlbnQnLCBhcmd1bWVudHMpO1xuICB9LFxuICBwYWdlSW5pdDogZnVuY3Rpb24gKCkge1xuICAgIGZpcmVFdmVudCgncGFnZUluaXQnLCBhcmd1bWVudHMpO1xuICB9LFxuICBjb25maWc6IGZ1bmN0aW9uIChvcHMsIHNvdXJjZSkge1xuICAgIC8vIGxvZyhvcHMsc291cmNlKVxuICAgIGZpcmVFdmVudChzb3VyY2UsIFtvcHNdKTtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGhhbmRsZTtcbiIsInZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBpbml0UmVjb21tZW5kQ2xpY2sgPSByZXF1aXJlKCcuL2RhX3JlY29tbWVuZF9jbGljaycpO1xudmFyIGluaXRSZWNvbW1lbmRFeHBvc2UgPSByZXF1aXJlKCcuL2RhX3JlY29tbWVuZF9leHBvc2UnKTtcbnZhciBsb2cgPSByZXF1aXJlKCcuL2xvZycpO1xudmFyIGhhbmRsZSA9IHtcbiAgcmVjTGlzdDogbnVsbCxcbiAgLy8g6I635Y+W5Y+v6KeG5Yy65Z+f55qE55uu5qCHIGl0ZW1saXN0IOS/oeaBr1xuICBnZXRJdGVtTGlzdDogZnVuY3Rpb24gKGNvbHVtbikge1xuICAgIGlmIChjb2x1bW4uZ2V0QXR0cmlidXRlKCdkYXRhLWV4cG9zZWQnKSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICB2YXIgaXRlbUxpc3REYXRhID0gW107XG4gICAgdmFyIHRhcmdldEl0ZW1zID0gdXRpbHMuZ2V0VGFyZ2V0SXRlbXMoY29sdW1uKTtcblxuICAgIGlmICghdGFyZ2V0SXRlbXMgfHwgdGFyZ2V0SXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIC8vIGxvZyh0YXJnZXRJdGVtcyk7XG4gICAgZm9yICh2YXIga2V5IGluIHRhcmdldEl0ZW1zKSB7XG4gICAgICBpZiAodXRpbHMuaGFzUHJvcCh0YXJnZXRJdGVtcywga2V5KSkge1xuICAgICAgICB2YXIgaXRlbSA9IHRhcmdldEl0ZW1zW2tleV07XG4gICAgICAgIHZhciB0eXBlID0gdXRpbHMuZ2V0RGFBdHRyKGl0ZW0sICd0eXBlJyk7XG4gICAgICAgIHZhciBpZCA9IHV0aWxzLmdldERhQXR0cihpdGVtLCAnaWQnKTtcbiAgICAgICAgdmFyIG9yZGVyID0gdXRpbHMuZ2V0RGFBdHRyKGl0ZW0sICdvcmRlcicpO1xuXG4gICAgICAgIC8vIOiOt+W+l+WPr+mAieaVsOaNrlxuICAgICAgICB2YXIgb3B0aW9uQXR0ciA9IHV0aWxzLmdldE9wdGlvbkF0dHJzKGl0ZW0pO1xuICAgICAgICB2YXIgaXRlbU9iaiA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgIG9yZGVyOiBvcmRlclxuICAgICAgICB9LCBvcHRpb25BdHRyKTtcbiAgICAgICAgaXRlbUxpc3REYXRhLnB1c2goaXRlbU9iaik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpdGVtTGlzdERhdGE7XG4gIH0sXG4gIC8vIOiOt+WPluWFrOeUqOeahCBjb2x1bW4g5L+h5oGvXG4gIGdldENvbW1vbkNvbHVtbkluZm86IGZ1bmN0aW9uIChjb2x1bW4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sdW1uaWQ6IHV0aWxzLmdldERhQXR0cihjb2x1bW4sICdjb2x1bW5pZCcpLFxuICAgICAgcmFsZzogdXRpbHMuZ2V0RGFBdHRyKGNvbHVtbiwgJ3JhbGcnKSxcbiAgICAgIHBsYXQ6IHV0aWxzLmdldERhQXR0cihjb2x1bW4sICdwbGF0JyksXG4gICAgICBkb21haW46IHV0aWxzLmdldERhQXR0cihjb2x1bW4sICdkb21haW4nKSxcbiAgICAgIHRyYWNrOiB1dGlscy5nZXREYUF0dHIoY29sdW1uLCAndHJhY2snKVxuICAgIH07XG4gIH0sXG4gIC8vIOaOqOiNkOezu+e7n+aJk+eCueeahOWKn+iDveeahOWIneWni+WMllxuICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciByZWNMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGFfY29sdW1uJyk7XG4gICAgLy8g5aaC5p6c5rKh5pyJ5Lu75L2V5o6o6I2Q5qCP55uu77yM5bCx5rKh5pyJ6L+Z5Liq5Yqf6IO9XG4gICAgaWYgKCFyZWNMaXN0Lmxlbmd0aCkgeyByZXR1cm47IH1cblxuICAgIHNlbGYuaW5pdFJlY29tbWVuZENsaWNrKHJlY0xpc3QpO1xuICAgIHNlbGYuaW5pdFJlY29tbWVuZEV4cG9zZShyZWNMaXN0KTtcblxuICAgIHRoaXMucmVjTGlzdCA9IHJlY0xpc3Q7XG4gIH0sXG4gIC8vIOWIneWni+WMlueCueWHu+S4iuaKpVxuICBpbml0UmVjb21tZW5kQ2xpY2s6IGluaXRSZWNvbW1lbmRDbGljayxcbiAgLy8g5Yid5aeL5YyW5pud5YWJ5LiK5oqlXG4gIGluaXRSZWNvbW1lbmRFeHBvc2U6IGluaXRSZWNvbW1lbmRFeHBvc2Vcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBoYW5kbGU7XG4iLCIvLyDliJ3lp4vljJbngrnlh7vkuIrmiqXmlrnms5VcbnZhciBVdGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBtZDVHZW5lcmF0b3IgPSByZXF1aXJlKCdtZDUnKTtcbnZhciBjb29raWUgPSByZXF1aXJlKCdjb29raWVqcycpO1xudmFyIHBhcnNlID0gcmVxdWlyZSgndXJsLXBhcnNlJyk7XG5cbi8vIHdpbmRvdy5wYXJzZXIgPSBwYXJzZTtcbnZhciBpbml0UmVjb21tZW5kQ2xpY2sgPSBmdW5jdGlvbiAocmVjTGlzdCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmVjTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciByZWNDb2x1bW4gPSByZWNMaXN0W2ldO1xuXG4gICAgKGZ1bmN0aW9uIChyZWNDb2x1bW4pIHtcbiAgICAgIHZhciBpbmZvID0gc2VsZi5nZXRDb21tb25Db2x1bW5JbmZvKHJlY0NvbHVtbik7XG4gICAgICB2YXIgY29sdW1uaWQgPSBpbmZvLmNvbHVtbmlkO1xuICAgICAgdmFyIHJhbGcgPSBpbmZvLnJhbGc7XG4gICAgICB2YXIgcGxhdCA9IGluZm8ucGxhdDtcbiAgICAgIHZhciBkb21haW4gPSBpbmZvLmRvbWFpbjtcbiAgICAgIHZhciB0cmFjayA9IGluZm8udHJhY2s7XG4gICAgICBVdGlscy5hZGRFdmVudChyZWNDb2x1bW4sICdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciBpdGVtID0gZS50YXJnZXQ7XG4gICAgICAgIGlmICghaXRlbS5jbGFzc05hbWUgfHwgaXRlbS5jbGFzc05hbWUuaW5kZXhPZignZGFfaXRlbScpID09PSAtMSkge1xuICAgICAgICAgIGl0ZW0gPSBVdGlscy5maW5kQW5jZXNJdGVtKGl0ZW0sICdkYV9pdGVtJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpdGVtKSB7XG4gICAgICAgICAgLy8g5aaC5p6c5om+5LiN5YiwIGRhX2l0ZW0g5bCx5LiN5omT54K55LqGXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpdGVtbGlzdCA9IHNlbGYuZ2V0SXRlbUxpc3QocmVjQ29sdW1uKTtcbiAgICAgICAgdmFyIGNsYXNzZXMgPSBpdGVtLmdldEF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICAgICAgaWYgKCFjbGFzc2VzIHx8IGNsYXNzZXMuaW5kZXhPZignZGFfaXRlbScpID09PSAtMSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB1cmwgPSBVdGlscy5kYS5idWlsZERvbWFpbigpICsgJ19kYV9ldmVudCcgKyBVdGlscy5vYmoyVXJsUXVlcnkoc2VsZi5iKSArICcmZGFjdGlvbj1jbGljayZjYXRlZ29yeT0nICsgY29sdW1uaWQ7XG5cbiAgICAgICAgdmFyIGlkID0gVXRpbHMuZ2V0RGFBdHRyKGl0ZW0sICdpZCcpO1xuICAgICAgICB2YXIgdHlwZSA9IFV0aWxzLmdldERhQXR0cihpdGVtLCAndHlwZScpO1xuICAgICAgICB2YXIgb3JkZXIgPSBVdGlscy5nZXREYUF0dHIoaXRlbSwgJ29yZGVyJyk7XG5cbiAgICAgICAgdmFyIG9wdGlvbkF0dHIgPSBVdGlscy5nZXRPcHRpb25BdHRycyhpdGVtKTtcbiAgICAgICAgLy8gdW5pcXVlS2V5IOeUqOS6juaVsOaNrue7hOWFs+iBlOeCueWHu+S4iuaKpeWSjOaWsOmhtemdoueahOmhtemdouaJk+eCuVxuICAgICAgICB2YXIgdW5pcXVlS2V5ID0gbWQ1R2VuZXJhdG9yKGNvbHVtbmlkICsgJ18nICsgRGF0ZS5ub3coKSArICdfJyArIChNYXRoLnJhbmRvbSgpICogMTAwMDApKTtcbiAgICAgICAgdmFyIGl0ZW1PYmogPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICBvcmRlcjogb3JkZXJcbiAgICAgICAgfSwgb3B0aW9uQXR0cik7XG4gICAgICAgIHZhciBleHQgPSB7XG4gICAgICAgICAgaXRlbWxpc3Q6IGl0ZW1saXN0LFxuICAgICAgICAgIGl0ZW06IGl0ZW1PYmosXG4gICAgICAgICAgcmFsZzogcmFsZyxcbiAgICAgICAgICBwbGF0OiBwbGF0LFxuICAgICAgICAgIGRvbWFpbjogZG9tYWluLFxuICAgICAgICAgIHVuaXF1ZUtleTogdW5pcXVlS2V5XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGV4dFN0ciA9IGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShleHQpKTtcbiAgICAgICAgLy8g5omA5pyJ6aKd5aSW55qE5pWw5o2u5omU5YiwIGV4dCDph4zpnaJcbiAgICAgICAgdXJsICs9ICcmZXh0PScgKyBleHRTdHI7XG5cbiAgICAgICAgdmFyIGYgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgZi5zcmMgPSB1cmw7XG5cbiAgICAgICAgLy8g5aaC5p6c5pivYeagh+etvu+8jOWImemcgOimgeWkhOeQhui3s+i9rO+8jOWcqOi3s+i9rOeahHVybOWQjumdouWKoOaXtumXtOaIs+WSjHBpZFxuICAgICAgICBpZiAoaXRlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnYScpIHtcbiAgICAgICAgICB2YXIgaHJlZiA9IGl0ZW0uZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgICAgICAgdmFyIG9yaWdpbkhyZWYgPSBocmVmO1xuXG4gICAgICAgICAgaWYgKGhyZWYpIHtcbiAgICAgICAgICAgIHZhciB0cmFja1N0ciA9ICcnO1xuICAgICAgICAgICAgdXJsID0gcGFyc2UoaHJlZik7XG4gICAgICAgICAgICAvLyDnnIvkuYvliY3mnInmsqHmnIkgcXVlcnlcbiAgICAgICAgICAgIHZhciBtYXJrID0gKHVybCAmJiB1cmwucXVlcnkpID8gJyYnIDogJz8nO1xuICAgICAgICAgICAgdmFyIHBpZCA9IGVuY29kZVVSSUNvbXBvbmVudChjb29raWUuZ2V0KCdfZGFfcGlkJykgPyBjb29raWUuZ2V0KCdfZGFfcGlkJykgOiAnJyk7XG4gICAgICAgICAgICB2YXIgcGlkU3RyID0gcGlkID8gJyZwaWQ9JyArIHBpZCA6ICcnO1xuXG4gICAgICAgICAgICAvLyDlpoLmnpzmnIkgdHJhY2sg5qCH6K6w77yM5YiZ6ZyA6KaB5ZyoIHVybCDnmoQgZnJvbSDlj4LmlbDkuIvov73ouKrlnLDlnYBcbiAgICAgICAgICAgIGlmICh0cmFjayAmJiB0cmFjayAhPT0gJ251bGwnICYmIHRyYWNrICE9PSAnMCcpIHtcbiAgICAgICAgICAgICAgdHJhY2tTdHIgPSAnJnVuaXF1ZUtleT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVuaXF1ZUtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcXVlcnkgPSB1cmwucXVlcnkgKyBtYXJrICsgJ3Q9JyArIERhdGUubm93KCkgKyBwaWRTdHIgKyB0cmFja1N0cjtcbiAgICAgICAgICAgIHVybC5zZXQoJ3F1ZXJ5JywgcXVlcnkpO1xuXG4gICAgICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZSgnaHJlZicsIHVybC50b1N0cmluZygpKTtcblxuICAgICAgICAgICAgLy8g5oGi5aSN5Y6f5pyJIGhyZWZcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBpdGVtLnNldEF0dHJpYnV0ZSgnaHJlZicsIG9yaWdpbkhyZWYpO1xuICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0ocmVjQ29sdW1uKSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaW5pdFJlY29tbWVuZENsaWNrO1xuIiwiLy8g5Yid5aeL5YyW5pud5YWJ5LiK5oql5Yqf6IO9XG52YXIgVXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgbWQ1R2VuZXJhdG9yID0gcmVxdWlyZSgnbWQ1Jyk7XG52YXIgbG9nID0gcmVxdWlyZSgnLi9sb2cnKTtcbnZhciBpbml0UmVjb21tZW5kRXhwb3NlID0gZnVuY3Rpb24gKHJlY0xpc3QpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICAvLyBsb2cocmVjTGlzdCk7XG4gIHZhciBzY2FuQ29sdW1uID0gZnVuY3Rpb24gKHJlY0NvbHVtbikge1xuICAgIHZhciBpbmZvID0gc2VsZi5nZXRDb21tb25Db2x1bW5JbmZvKHJlY0NvbHVtbik7XG4gICAgdmFyIGNvbHVtbmlkID0gaW5mby5jb2x1bW5pZDtcbiAgICB2YXIgcmFsZyA9IGluZm8ucmFsZztcbiAgICB2YXIgcGxhdCA9IGluZm8ucGxhdDtcbiAgICB2YXIgZG9tYWluID0gaW5mby5kb21haW47XG5cbiAgICAvLyDojrflj5blvZPliY3lj6/op4bljLrln5/nmoQgaXRlbWxpc3Qg5pWw5o2uXG4gICAgdmFyIGl0ZW1saXN0ID0gc2VsZi5nZXRJdGVtTGlzdChyZWNDb2x1bW4pO1xuICAgIC8vIOWmguaenOebruaghyBjb2x1bW4g6YeM5rKh5pyJIGl0ZW0g5Zyo5Y+v6KeG5Yy65Z+f5YaF77yM5bCx5LiN5LiK5oql5LqG44CCXG4gICAgaWYgKGl0ZW1saXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmVjQ29sdW1uLnNldEF0dHJpYnV0ZSgnZGF0YS1sYXN0LWV4dCcsICcnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgdXJsID0gVXRpbHMuZGEuYnVpbGREb21haW4oKSArICdfZGFfZXZlbnQnICsgVXRpbHMub2JqMlVybFF1ZXJ5KHNlbGYuYikgKyAnJmRhY3Rpb249ZXhwb3NlJmNhdGVnb3J5PScgKyBjb2x1bW5pZDtcblxuICAgIHZhciBleHQgPSB7XG4gICAgICBpdGVtbGlzdDogaXRlbWxpc3QsXG4gICAgICByYWxnOiByYWxnLFxuICAgICAgcGxhdDogcGxhdCxcbiAgICAgIGRvbWFpbjogZG9tYWluXG4gICAgfTtcblxuICAgIHZhciBleHRTdHIgPSBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoZXh0KSk7XG4gICAgdmFyIGV4dEhhc2ggPSBtZDVHZW5lcmF0b3IoZXh0U3RyKTtcbiAgICB2YXIgbGFzdEV4dEhhc2ggPSByZWNDb2x1bW4uZ2V0QXR0cmlidXRlKCdkYXRhLWxhc3QtZXh0Jyk7XG4gICAgLy8g5aaC5p6cIGNvbHVtbiDmnKzmrKHmm53lhYnmlbDmja7lkozkuIrmrKHkuIDmoLfvvIzliJnkuI3lj5HpgIHor7fmsYJcbiAgICBpZiAoZXh0SGFzaCA9PT0gbGFzdEV4dEhhc2gpIHtcbiAgICAgIC8vIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8g5omA5pyJ6aKd5aSW55qE5pWw5o2u5omU5YiwIGV4dCDph4zpnaJcbiAgICAgIHVybCArPSAoJyZleHQ9JyArIGV4dFN0cik7XG4gICAgICB2YXIgZiA9IG5ldyBJbWFnZSgpO1xuICAgICAgZi5zcmMgPSB1cmw7XG4gICAgICByZWNDb2x1bW4uc2V0QXR0cmlidXRlKCdkYXRhLWxhc3QtZXh0JywgZXh0SGFzaCk7XG4gICAgfVxuICB9O1xuXG4gIHZhciB0YXJnZXRGdW5jID0gVXRpbHMuZGVib3VuY2UoZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVjTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHJlY0NvbHVtbiA9IHJlY0xpc3RbaV07XG5cbiAgICAgIHNjYW5Db2x1bW4ocmVjQ29sdW1uKTtcbiAgICB9XG4gIH0sIDEwMDApO1xuXG4gIC8vIOe7keWumua7muWKqOS6i+S7tlxuICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhLWNvbnRhaW5lcicpO1xuICBpZiAoY29udGFpbmVyKSB7XG4gICAgVXRpbHMuYWRkRXZlbnQoY29udGFpbmVyLCAnc2Nyb2xsJywgdGFyZ2V0RnVuYyk7XG4gIH0gZWxzZSB7XG4gICAgVXRpbHMuYWRkRXZlbnQod2luZG93LCAnc2Nyb2xsJywgdGFyZ2V0RnVuYyk7XG4gIH1cblxuICAvLyDmr4/kuKogY29sdW1uIOWKoOi9veWlveS6huS5i+WQjuWFiOabneWFieS4gOasoVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJlY0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAvLyDmr4/kuIDkuKrmjqjojZDljLrln59cbiAgICB2YXIgcmVjQ29sdW1uID0gcmVjTGlzdFtpXTtcbiAgICB2YXIgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBsb2coJ3NjYW5pbmcuLi4nKVxuICAgICAgLy8g5b2T5o6o6I2Q5YaF5a6555Sx5ZCE5Lia5YqhIGpzIOWKqOaAgea4suafk+aXtu+8jGRhdGEtZG9uZSDnlLHkuJrliqEganMg5Yqo5oCB5pON57q1XG4gICAgICBpZiAocmVjQ29sdW1uLmdldEF0dHJpYnV0ZSgnZGF0YS1kb25lJykpIHtcbiAgICAgICAgc2NhbkNvbHVtbihyZWNDb2x1bW4pO1xuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcbiAgICAgIH1cbiAgICB9LCAyMDApO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGluaXRSZWNvbW1lbmRFeHBvc2U7XG4iLCIvKiBlc2xpbnQgbm8tdW5kZXJzY29yZS1kYW5nbGU6MCAqL1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzLmpzJyk7XG52YXIgZGFIYW5kbGUgPSByZXF1aXJlKCcuL2RhX2hhbmRsZS5qcycpO1xudmFyIGpzQ29va2llID0gcmVxdWlyZSgnanMtY29va2llJyk7XG52YXIgbWQ1ID0gcmVxdWlyZSgnbWQ1Jyk7XG52YXIgbG9nID0gcmVxdWlyZSgnLi9sb2cnKTtcbnZhciBjb29raWVJZEtleSA9ICdkeHlfZGFfY29va2llLWlkJztcblxudmFyIG1haW5PcHRpb25zID0ge1xuICAvLyDkvp3nhacgREEg6YOo572y5paH5qGj5rOo5YWlXG4gIHF1ZXJ5RGF0YTogW10sXG4gIC8vIOivt+axgnB244CBdXbml7bmkLrluKbnmoTlj4LmlbBcbiAgcGF5bG9hZDoge30sXG4gIC8vIOaYr+WQpuebkeWQrGhhc2jlj5jljJbop6blj5FwduOAgXV257uf6K6hXG4gIGJpbmRIYXNoOiBmYWxzZSxcbiAgLy8g6Ieq5a6a5LmJ6K+35rGC5pa55rOVXG4gIHJlcXVlc3Q6IG51bGwsXG4gIC8vIOiHquWumuS5ieaVsOaNrue7n+iuoea4oOmBk+OAglxuICBzZW5kQ2hhbm5lbDoge1xuICAgIGRhOiB0cnVlXG4gICAgLy8gZ2E6dHJ1ZSxcbiAgICAvLyBtdGE6dHJ1ZVxuICB9LFxuICAvLyDkvb/nlKjlnLrmma/kuLrmtY/op4jlmahcbiAgYnJvd3NlcjogdHJ1ZSxcbiAgZW52OiAncHJvZHVjdGlvbicsXG4gIC8vIOeZu+W9leeUqOaIt+S/oeaBr1xuICB1c2VySW5mbzoge30sXG4gIC8vIOWFvOWuueWkhOeQhlxuICBmaXhDb25maWc6IHt9LFxuICAvLyDlj5HpgIHmiZPngrnmlbDmja7liY3vvIzorr7nva7miZPngrnmlbDmja7vvIzlpoLml6Dor6XpnIDmsYLvvIzlj6/kuI3orr7nva5cbiAgYmVmb3JlU2VuZFJlcXVlc3Q6IG51bGxcbn07XG5cbi8vIOaJgOaciee7n+iuoea4oOmBk1xudmFyIGNoYW5uZWxIYW5kbGUgPSB7XG4gIGRhOiBkYUhhbmRsZVxuICAvLyAnbXRhJzpyZXF1aXJlKCcuL210YV9oYW5kbGUnKVxufTtcblxuLy8g6YGN5Y6G5ZCE56eN57uf6K6h5rig6YGTXG52YXIgY2hhbm5lbEVhY2ggPSBmdW5jdGlvbiAoY2IpIHtcbiAgZm9yICh2YXIga2V5IGluIG1haW5PcHRpb25zLnNlbmRDaGFubmVsKSB7XG4gICAgLy8gbG9nKGtleSlcbiAgICBpZiAodXRpbHMuaGFzUHJvcChtYWluT3B0aW9ucy5zZW5kQ2hhbm5lbCwga2V5KSkge1xuICAgICAgdmFyIHZhbCA9IG1haW5PcHRpb25zLnNlbmRDaGFubmVsW2tleV07XG4gICAgICBpZiAodmFsKSB7XG4gICAgICAgIHZhciBfaGFuZGxlID0gY2hhbm5lbEhhbmRsZVtrZXldO1xuICAgICAgICBpZiAoY2IgJiYgX2hhbmRsZSkge1xuICAgICAgICAgIC8vIGxvZyhrZXksIF9oYW5kbGUpXG4gICAgICAgICAgY2IoX2hhbmRsZSwga2V5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxudmFyIHJlcXVlc3REeHlTU08gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBjYWxsYmFja0ZuTmFtZSA9ICdfZGFfb3VuJztcbiAgdmFyIHNjcmlwdFVzZXJMb2dpbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTtcbiAgICB2YXIgc3NvVXJsID0gJ2h0dHBzOi8vYXV0aC5keHkuJyArIHV0aWxzLmRhLmJ1aWxkU3VmZml4KG1haW5PcHRpb25zLmVudikgKyAnL2FjY291bnQvdXNlcmxvZ2luLmRvP2NhbGxiYWNrPScgKyBjYWxsYmFja0ZuTmFtZTtcbiAgICB2YXIgZm9yU3NvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgZm9yU3NvLnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgICBmb3JTc28uc3JjID0gc3NvVXJsO1xuICAgIGZvclNzby5hc3luYyA9IHRydWU7XG4gICAgZm9yU3NvLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB3aW5kb3dbY2FsbGJhY2tGbk5hbWVdKCcnLCAnJywgJycpO1xuICAgIH07XG4gICAgLy8gbG9nKGZvclNzbylcbiAgICBhLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGZvclNzbywgYSk7XG4gIH07XG5cbiAgLy8gX2RhX291biDmmK/moLjlv4Pmlrnms5Us6ZyA6KaB5ZCR5YmN5YW85a65XG4gIHdpbmRvd1tjYWxsYmFja0ZuTmFtZV0gPSBmdW5jdGlvbiAodW5hbWUsIGV1bmFtZSwgdnRva2VuKSB7XG4gICAgdmFyIG9wcyA9IHtcbiAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgdW5hbWU6IHVuYW1lLFxuICAgICAgICBldW5hbWU6IGV1bmFtZSxcbiAgICAgICAgdnRva2VuOiB2dG9rZW5cbiAgICAgIH1cbiAgICB9O1xuICAgIGNoYW5uZWxFYWNoKGZ1bmN0aW9uIChuKSB7XG4gICAgICBuLmNvbmZpZyhvcHMsICd1c2VyTG9naW4nKTtcbiAgICAgIG1haW5PcHRpb25zLnVzZXJJbmZvID0gb3BzO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIOiOt+WPlueUqOaIt+eZu+W9leS/oeaBr1xuICBzY3JpcHRVc2VyTG9naW4oKTtcbn07XG5cbi8vIOS4juaVsOaNrue7hOe6puWumueahOeul+azlVxudmFyIGNyZWF0ZUlkID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgLy8g5b2T5YmN5pe26Ze05oizXG4gIHZhciBjdXJEYXRlVGltZSA9IERhdGUubm93KCkudG9TdHJpbmcoKTtcbiAgLy8gMTDkvY3pmo/mnLrmlbBcbiAgdmFyIHJhbmRvbTEwID0gKGZ1bmN0aW9uIChtaW4sIG1heCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKG1pbiArIChNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpKTtcbiAgfSgxMDAwMDAwMDAwLCA5OTk5OTk5OTk5KSk7XG5cbiAgdmFyIGNpZCA9IG1kNShjdXJEYXRlVGltZSArIHJhbmRvbTEwKSArIGN1ckRhdGVUaW1lO1xuICB2YXIgcmx0O1xuICBpZiAobmFtZSA9PT0gJ2Nvb2tpZV9pZCcpIHtcbiAgICBybHQgPSBjaWQ7XG4gIH0gZWxzZSBpZiAobmFtZSA9PT0gJ3BhZ2VfaWQnKSB7XG4gICAgcmx0ID0gbWQ1KGNpZCkgKyBjdXJEYXRlVGltZTtcbiAgfVxuICByZXR1cm4gcmx0O1xufTtcblxuLy8g5qOA5p+lIGNvb2tpZV9pZCDnmoTlkIjms5XmgKfvvIzop4TliJnlpoLkuItcbi8vIDEu6ZW/5bqm5bCP5LqO562J5LqOIDQ4IOS9je+8jOS4lOWkp+S6jiAyIOS9jVxuLy8gMi7lrZfmr43vvIjljIXmi6zlpKflhpnmiJblsI/lhpnvvInlkozmlbDlrZfmmK/lv4XpobvnmoTvvIzlj6/ku6XmnInkuK3liJLnur8gLVxuLy8gMy7kuI3lj6/ku6XmmK8g57qv5pWw5a2X44CB57qv5a2X5q+N44CB57qv5Lit5YiS57q/XG52YXIgY2hlY2tDb29raWVJZCA9IGZ1bmN0aW9uIChjb29raWVJZFZhbCkge1xuICByZXR1cm4gKC9eKD8hWzAtOV0rJCkoPyFbYS16QS1aXSskKSg/IS0rJClbMC05QS1aYS16LV17Miw0OH0kLykudGVzdChjb29raWVJZFZhbCk7XG59O1xuXG4vLyDorr7nva4gY29va2llX2lkXG52YXIgc2V0Q29va2llSWQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBkYUNpZFZhbCA9IG51bGw7XG4gIHZhciBnZXRJZCA9IG1haW5PcHRpb25zLmJyb3dzZXIgPyBqc0Nvb2tpZS5nZXQgOiBtYWluT3B0aW9ucy5zdG9yYWdlLmdldDtcbiAgdmFyIHNldElkID0gbWFpbk9wdGlvbnMuYnJvd3NlciA/IGpzQ29va2llLnNldCA6IG1haW5PcHRpb25zLnN0b3JhZ2Uuc2V0O1xuXG4gIC8vIOiOt+WPluS/neeVmeWtl+auteeahOWAvFxuICBkYUNpZFZhbCA9IGdldElkKGNvb2tpZUlkS2V5KTtcbiAgLy8g5peg5YC8XG4gIGlmICghZGFDaWRWYWwpIHtcbiAgICB2YXIgb2xkRGFDaWRWYWwgPSBudWxsO1xuICAgIC8vIOaPkOS+m+aXp+Wtl+autVxuICAgIGlmIChtYWluT3B0aW9ucy5maXhDb25maWcuY29va2llSWRLZXkpIHtcbiAgICAgIG9sZERhQ2lkVmFsID0gZ2V0SWQobWFpbk9wdGlvbnMuZml4Q29uZmlnLmNvb2tpZUlkS2V5KTtcbiAgICB9XG5cbiAgICAvLyDml6fmlbDmja7np7vliqjml7bvvIzop4TojIPmgKfmoKHpqoxcbiAgICBpZiAob2xkRGFDaWRWYWwgJiYgY2hlY2tDb29raWVJZChvbGREYUNpZFZhbCkpIHtcbiAgICAgIC8vIOWwhuaXp+Wtl+auteeahOaVsOaNrui/m+ihjOaLt+i0nVxuICAgICAgZGFDaWRWYWwgPSBvbGREYUNpZFZhbDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8g5paw55Sf5oiQ5pWw5o2uXG4gICAgICBkYUNpZFZhbCA9IGNyZWF0ZUlkKCdjb29raWVfaWQnKTtcbiAgICB9XG5cbiAgICAvLyDlhpnlhaXmnKzlnLDlrZjlgqhcbiAgICBzZXRJZChjb29raWVJZEtleSwgZGFDaWRWYWwpO1xuICB9XG4gIG1haW5PcHRpb25zLnBheWxvYWQuY29va2llX2lkID0gZGFDaWRWYWw7XG59O1xuXG4vLyDmo4Dmn6UgcGFnZV9pZFxudmFyIGNyZWF0ZVBhZ2VJZCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHJsdCA9IHtcbiAgICBwYXlsb2FkOiB7XG4gICAgICBwYWdlX2lkOiBjcmVhdGVJZCgncGFnZV9pZCcpXG4gICAgfVxuICB9O1xuICB1dGlscy5mbi5hc3NpZ24obWFpbk9wdGlvbnMsIHJsdCk7XG4gIHJldHVybiBybHQ7XG59O1xuXG52YXIgaGFuZGxlID0ge1xuICAvLyDliJ3lp4vphY3nva5cbiAgY29uZmlnOiBmdW5jdGlvbiAob3BzKSB7XG4gICAgdXRpbHMuZm4uYXNzaWduKG1haW5PcHRpb25zLCBvcHMpO1xuICAgIHNldENvb2tpZUlkKCk7XG4gICAgY3JlYXRlUGFnZUlkKCk7XG5cbiAgICAvLyDlkITnu5/orqHmuKDpgZPliJ3lp4vljJZcbiAgICBjaGFubmVsRWFjaChmdW5jdGlvbiAobikge1xuICAgICAgbi5jb25maWcobWFpbk9wdGlvbnMsICdpbml0Jyk7XG4gICAgfSk7XG5cbiAgICAvLyDlrprkuYnlhajlsYDmlrnms5VcbiAgICBpZiAobWFpbk9wdGlvbnMuYnJvd3Nlcikge1xuICAgICAgLy8g6I635Y+W5LiB6aaZ5Zut55So5oi355m75b2V5L+h5oGvXG4gICAgICByZXF1ZXN0RHh5U1NPKCk7XG5cbiAgICAgIC8vIOW8gOWQr+ebkeWQrCBoYXNoIOWPmOWMlu+8jOinpuWPkSBwdiDnu5/orqFcbiAgICAgIGlmIChtYWluT3B0aW9ucy5iaW5kSGFzaCkge1xuICAgICAgICB1dGlscy5hZGRFdmVudCh3aW5kb3csICdoYXNoY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChkb2N1bWVudC5VUkwuaW5kZXhPZignIy8nKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIC8vIOinpuWPkSBwdlxuICAgICAgICAgICAgaGFuZGxlLnBhZ2VJbml0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8g6Ieq5Yqo6Kem5Y+RIHB2IOS4gOasoVxuICAgICAgY2hhbm5lbEVhY2goZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgbi5wYWdlSW5pdCgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgLy8g5Yid5aeL5YyW77yM6Kem5Y+RIHB244CBdXZcbiAgcGFnZUluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAvLyBsb2coYXJncyk7XG4gICAgLy8g55Sf5oiQ5paw55qEIHBhZ2VfaWRcbiAgICB2YXIgcGlkQ29uZmlnID0gY3JlYXRlUGFnZUlkKCk7XG4gICAgY2hhbm5lbEVhY2goZnVuY3Rpb24gKG4pIHtcbiAgICAgIC8vIOabtOaWsOa4oOmBk+mFjee9rueahCBwYWdlX2lkXG4gICAgICBuLmNvbmZpZyhwaWRDb25maWcsICdvcHRpb25zVXBkYXRlJyk7XG4gICAgICBuLnBhZ2VJbml0LmFwcGx5KG4sIGFyZ3MpO1xuICAgIH0pO1xuICB9LFxuXG4gIC8vIOaJk+eCueaWueazlVxuICB0cmFja0V2ZW50OiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgLy8gbG9nKGFyZ3MpO1xuICAgIGNoYW5uZWxFYWNoKGZ1bmN0aW9uIChuKSB7XG4gICAgICBuLnRyYWNrRXZlbnQuYXBwbHkobiwgYXJncyk7XG4gICAgfSk7XG4gIH0sXG4gIC8vIOiOt+WPliBjb29raWVJZCDnmoTlgLxcbiAgZ2V0Q29va2llSWQ6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZ2V0SWQgPSBtYWluT3B0aW9ucy5icm93c2VyID8ganNDb29raWUuZ2V0IDogbWFpbk9wdGlvbnMuc3RvcmFnZS5nZXQ7XG4gICAgcmV0dXJuIGdldElkKGNvb2tpZUlkS2V5KTtcbiAgfVxufTtcblxuLy8g5rWP6KeI5Zmo56uv77yM5rOo5YaM5YWo5bGA5pa55rOV77yM6Ieq5Yqo5Yid5aeL5YyWXG5pZiAodXRpbHMuaXNCcm93c2VyKCkpIHtcbiAgLy8g6Ieq5Yqo5Yid5aeL5YyWXG4gIGlmICh1dGlscy5pc09iamVjdCh3aW5kb3cuX2RhcSkpIHtcbiAgICB2YXIgY2ZnID0gdXRpbHMuZm4uYXNzaWduKHtcbiAgICAgIHF1ZXJ5RGF0YTogd2luZG93Ll9kYXFcbiAgICB9LCB3aW5kb3cuX2RhQ29uZmlnKTtcbiAgICBoYW5kbGUuY29uZmlnKGNmZyk7XG4gIH1cblxuICAvLyB3aW5kb3cg5rOo5YaM5omT54K55pa55rOVXG4gIHdpbmRvdy5fZGFUcmFja0V2ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgIGNoYW5uZWxFYWNoKGZ1bmN0aW9uIChuKSB7XG4gICAgICBuLnRyYWNrRXZlbnQuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8g6YCa6L+H5YaF6YOo5Y+C5pWw6L2s5YyW77yM5YW85a655Lik56eN5bqP5YiX55qE5Y+C5pWwXG4gIHdpbmRvdy5fZGFUcmFja0V2ZW50Q2FsbGJhY2sgPSB3aW5kb3cuX2RhVHJhY2tFdmVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYW5kbGU7XG5cbiIsIm1vZHVsZS5leHBvcnRzID0gY29uc29sZS5sb2c7XG4iLCJ2YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgcXMgPSByZXF1aXJlKCdxcycpO1xudmFyIGxvZyA9IHJlcXVpcmUoJy4vbG9nJyk7XG5cbnZhciByZXF1ZXN0X2ltYWdlID0gZnVuY3Rpb24gKG9wcykge1xuICB2YXIgZiA9IG5ldyBJbWFnZSgpO1xuICB2YXIgZGF0YSA9IG9wcy5kYXRhO1xuICBkYXRhLl8gPSBEYXRlLm5vdygpO1xuICB2YXIgdXJsID0gb3BzLnVybCArICc/JyArIHFzLnN0cmluZ2lmeShkYXRhKTtcbiAgdmFyIGNiID0gb3BzLmNvbXBsZXRlO1xuICBmLnNyYyA9IHVybDtcbiAgaWYgKGNiKSB7XG4gICAgZi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZik7XG4gICAgZi5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBjYihkYXRhKTtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZik7XG4gICAgfTtcbiAgfVxufTtcblxudmFyIHJlcXVlc3Rfc2NyaXB0ID0gZnVuY3Rpb24gKG9wcykge1xuICB2YXIgYSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTtcbiAgdmFyIGhlYWQgPSBhLnBhcmVudE5vZGU7XG4gIHZhciBkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gIHZhciBkYXRhID0gb3BzLmRhdGE7XG4gIC8vIOa3u+WKoOaXtumXtOaIsztcbiAgZGF0YS5fID0gRGF0ZS5ub3coKTtcbiAgdmFyIHVybCA9IG9wcy51cmwgKyAnPycgKyBxcy5zdHJpbmdpZnkoZGF0YSk7XG4gIHZhciBjYiA9IG9wcy5jb21wbGV0ZTtcbiAgZC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gIGQuYXN5bmMgPSB0cnVlO1xuICBkLnNyYyA9IHVybDtcbiAgaGVhZC5pbnNlcnRCZWZvcmUoZCwgYSk7XG4gIC8vIOWKoOi9veWujOS5i+WQjuWIoOmZpCBzY3JpcHQg5qCH562+LOS7peWFjSBoYXNoIOWPmOWMluWQju+8jOagh+etvui2iuadpei2iuWkmlxuICBkLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBjYiAmJiBjYihkYXRhKTtcbiAgICBpZiAoaGVhZCkge1xuICAgICAgaGVhZC5yZW1vdmVDaGlsZChkKTtcbiAgICB9XG4gIH07XG59O1xuXG5mdW5jdGlvbiByZXF1ZXN0KGluZm8sIG9wcykge1xuICAvLyBsb2coXCJyZXF1ZXN0XCIsIG9wcylcbiAgc3dpdGNoIChvcHMudHlwZSkge1xuICAgIGNhc2UgJ3NjcmlwdCc6XG4gICAgICByZXF1ZXN0X3NjcmlwdChvcHMpO1xuXG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2ltYWdlJzpcbiAgICAgIHJlcXVlc3RfaW1hZ2Uob3BzKTtcblxuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgdXRpbHMuYWpheChvcHMpO1xuICAgICAgYnJlYWs7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZXF1ZXN0O1xuIiwidmFyIGFzc2lnbiA9IHJlcXVpcmUoJy4vYXNzaWduLmpzJyk7XG52YXIgbG9nID0gcmVxdWlyZSgnLi9sb2cnKTtcblxudmFyIGhhbmRsZSA9IHtcbiAgaGFzUHJvcDogZnVuY3Rpb24gKG9iaiwga2V5KSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSk7XG4gIH0sXG4gIGlzQnJvd3NlcjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpICYmICh0eXBlb2YgbmF2aWdhdG9yID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgdXNlckFnZW50ID09PSAnc3RyaW5nJyk7XG4gIH0sXG4gIGlzU3RyaW5nOiBmdW5jdGlvbiAodmFsKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xuICB9LFxuICBpc09iamVjdDogZnVuY3Rpb24gKHZhbCkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JztcbiAgfSxcbiAgZm46IHtcbiAgICBhc3NpZ246IGFzc2lnblxuICB9XG59O1xuXG5oYW5kbGUuZGEgPSB7XG4gIC8qKlxuXHQgKiDov5Tlm57vvJrlvZPliY3njq/looPkuIvnmoTlkI7nvIBcblx0ICovXG4gIGJ1aWxkU3VmZml4OiBmdW5jdGlvbiAoZW52KSB7XG4gICAgLy8gbG9nKGVudik7XG4gICAgaWYgKCFlbnYpIHJldHVybiAnY24nO1xuICAgIHZhciBzdWZmaXggPSBlbnYudG9Mb3dlckNhc2UoKSA9PT0gJ2RldmVsb3AnID8gJ25ldCcgOiAnY24nO1xuICAgIC8vIGxvZyhzdWZmaXgpXG4gICAgcmV0dXJuIHN1ZmZpeDtcbiAgfSxcbiAgLyoqXG5cdCAqIOi/lOWbnu+8muW9k+WJjeeOr+Wig+S4i+eahCBkYSDlrozmlbTln5/lkI1cblx0ICovXG4gIGJ1aWxkRG9tYWluOiBmdW5jdGlvbiAoZW52LCBicm93c2VyKSB7XG4gICAgLy8gbG9nKGVudilcbiAgICB2YXIgc3VmZml4ID0gdGhpcy5idWlsZFN1ZmZpeChlbnYpO1xuICAgIHZhciBwcm90b2NvbCA9IGJyb3dzZXIgPT09IGZhbHNlID8gJ2h0dHBzOicgOiAnJztcblxuICAgIHJldHVybiBwcm90b2NvbCArICcvL2RhLmR4eS4nICsgc3VmZml4ICsgJy8nO1xuICB9XG59O1xuXG5cbi8vIOajgOafpeW9k+WJjeeahCBoYXNoIOWPmOWMluaYr+WQpuWxnuS6juWNlemhtemdouW6lOeUqOeahOWTiOW4jOi3r+eUseaWueazlVxuaGFuZGxlLmNoZWNrSGFzaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICBpZiAoZG9jdW1lbnQuVVJMLmluZGV4T2YoJyMvJykgIT09IC0xKSB7XG4gICAgY2FsbGJhY2soKTtcbiAgfVxufTtcblxuLyoqXG4gKiDlj4LmlbDvvJpcbiAqIGRvbTog5Y6f55SfZG9t5a+56LGhXG4gKiDov5Tlm57vvJrmmK/lkKblnKjpobXpnaLlj6/op4bljLrln5/lhoVcbiAqL1xuaGFuZGxlLmRvbUluU2NyZWVuID0gZnVuY3Rpb24gKGRvbSkge1xuICB2YXIgcmVjdCA9IGRvbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdmFyIGluU2NyZWVuID0gKFxuICAgIHJlY3QudG9wID49IDAgJiZcblx0XHRyZWN0LmxlZnQgPj0gMCAmJlxuXHRcdHJlY3QuYm90dG9tIDw9IHdpbmRvdy5pbm5lckhlaWdodCAmJlxuXHRcdHJlY3QucmlnaHQgPD0gd2luZG93LmlubmVyV2lkdGgpO1xuICByZXR1cm4gaW5TY3JlZW47XG59O1xuXG4vKipcbiAqIOWPguaVsO+8mlxuICogaXRlbXPvvJrmiYDmnInnm67moIdjb2x1bW7lhoXnmoRpdGVt5YiX6KGoXG4gKiDov5Tlm57vvJrmiYDmnInmhJ/lhbTotqPnmoRpdGVt55qE5YiX6KGo77yI5Zyo5Y+v6KeG5Yy65Z+f5YaF5LiU5pyq6KKr5pud5YWJ6L+H77yJXG4gKi9cblxuaGFuZGxlLmdldFRhcmdldEl0ZW1zID0gZnVuY3Rpb24gKGNvbHVtbikge1xuICB2YXIgaXRlbXMgPSBjb2x1bW4uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGFfaXRlbScpO1xuICB2YXIgdGFyZ2V0SXRlbXMgPSBBcnJheS5mcm9tKGl0ZW1zKS5maWx0ZXIoZnVuY3Rpb24gKG8sIGkpIHtcbiAgICByZXR1cm4gaGFuZGxlLmRvbUluU2NyZWVuKG8pO1xuICB9KTtcblxuICByZXR1cm4gdGFyZ2V0SXRlbXM7XG59O1xuXG4vKipcbiAqIOWPguaVsO+8mlxuICogaXRlbXPvvJrnm67moIcgaXRlbVxuICog6L+U5Zue77ya55uu5qCHIGl0ZW0g5Lit5omA5pyJ5Y+v6YCJIGRhIOaJk+eCueaVsOaNrueahOmUruWAvOWvuVxuICovXG5oYW5kbGUuZ2V0T3B0aW9uQXR0cnMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgYXR0ckFycmF5ID0gQXJyYXkuZnJvbShpdGVtLmF0dHJpYnV0ZXMpO1xuXG4gIHZhciBvcHRpb25BdHRyT2JqID0ge307XG5cbiAgYXR0ckFycmF5LmZvckVhY2goZnVuY3Rpb24gKG8pIHtcbiAgICBpZiAoby5uYW1lICYmIG8ubmFtZS5pbmRleE9mKCdkYXRhLWRhby0nKSA9PT0gMCkge1xuICAgICAgdmFyIGtleSA9IG8ubmFtZS5zdWJzdHJpbmcoOSk7XG4gICAgICBvcHRpb25BdHRyT2JqW2tleV0gPSBvLnZhbHVlO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBvcHRpb25BdHRyT2JqO1xufTtcblxuaGFuZGxlLmdldERhQXR0ciA9IGZ1bmN0aW9uIChkb20sIGF0dHJOYW1lKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoZG9tLmdldEF0dHJpYnV0ZSgnZGF0YS1kYS0nICsgYXR0ck5hbWUpKTtcbn07XG5cbi8qKlxuICogZGVib3VuY2Ug55qE566A5Y2V5a6e546wXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIOmcgOimgeiiq2RlYm91bmNl55qE5pa55rOVXG4gKiBAcGFyYW0ge051bWJlcn0gd2FpdCDlu7bov5/miafooYzml7bpl7RcbiAqL1xuaGFuZGxlLmRlYm91bmNlID0gZnVuY3Rpb24gKGZ1bmMsIHdhaXQpIHtcbiAgdmFyIHRpbWVyO1xuICByZXR1cm4gZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICB9LCB3YWl0KTtcbiAgfTtcbn07XG5cbi8qKlxuICog5YW85a655LqL5Lu257uR5a6aXG4gKiBAcGFyYW0geyp9IGRvbVxuICogQHBhcmFtIHsqfSBldmVudFxuICogQHBhcmFtIHsqfSBjYWxsYmFja1xuICovXG5cbmhhbmRsZS5hZGRFdmVudCA9IGZ1bmN0aW9uIChkb20sIGV2ZW50LCBjYWxsYmFjaykge1xuICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICBkb20uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgY2FsbGJhY2spO1xuICB9IGVsc2Uge1xuICAgIGRvbS5hdHRhY2hFdmVudChldmVudCwgY2FsbGJhY2spO1xuICB9XG59O1xuXG4vKipcbiAqIOaKiuWvueixoei9rOaIkGh0dHDlj4LmlbDlrZfnrKbkuLJcbiAqIEBwYXJhbSB7Kn0gcGFyYW1cbiAqL1xuaGFuZGxlLm9iajJVcmxRdWVyeSA9IGZ1bmN0aW9uIChwYXJhbSkge1xuICBpZiAoIXBhcmFtKSByZXR1cm4gJyc7XG4gIHZhciBwYXJhbVN0ciA9ICcnO1xuICBmb3IgKHZhciBpIGluIHBhcmFtKSB7XG4gICAgaWYgKHt9Lmhhc093blByb3BlcnR5LmNhbGwocGFyYW0sIGkpKSB7XG4gICAgICBwYXJhbVN0ciArPSAocGFyYW1TdHIgPyAnJicgOiAnPycpICsgaSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChwYXJhbVtpXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBwYXJhbVN0cjtcbn07XG5cbmhhbmRsZS5maW5kQW5jZXNJdGVtID0gZnVuY3Rpb24gKGRvbSwgY2xhc3NOYW1lKSB7XG4gIHZhciB0YXJnZXQgPSBudWxsO1xuICB2YXIgcGFyZW50ID0gbnVsbDtcbiAgZG8ge1xuICAgIHBhcmVudCA9IGRvbS5wYXJlbnRFbGVtZW50O1xuICAgIGlmIChwYXJlbnQgJiYgcGFyZW50LmNsYXNzTmFtZSAmJiBwYXJlbnQuY2xhc3NOYW1lLmluZGV4T2YoY2xhc3NOYW1lKSAhPT0gLTEpIHtcbiAgICAgIHRhcmdldCA9IHBhcmVudDtcbiAgICAgIHBhcmVudCA9IGRvY3VtZW50O1xuICAgIH1cbiAgICBkb20gPSBwYXJlbnQ7XG4gIH0gd2hpbGUgKHBhcmVudCAhPT0gZG9jdW1lbnQpO1xuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5oYW5kbGUuYWpheCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIHZhciBfY2ZnID0ge1xuICAgIHVybDogJycsIC8vIFtzdHJpbmddLFxuICAgIGRhdGE6IG51bGwsIC8vIFtvYmplY3RdLFxuICAgIHR5cGU6ICdHRVQnLCAvLyBbc3RyaW5nXSxcbiAgICBkYXRhVHlwZTogJ2pzb24nLCAvLyBbc3RyaW5nXSxcbiAgICBhc3luYzogdHJ1ZSxcbiAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICAgdGltZTogMCxcbiAgICBjb21wbGV0ZTogbnVsbCxcbiAgICBzdWNjZXNzOiBudWxsLCAvLyBbZnVuY3Rpb25dLFxuICAgIGVycm9yOiBudWxsIC8vIFtmdW5jdGlvbl0sXG4gIH07XG5cbiAgdmFyIF9mbiA9IHtcbiAgICBleHRlbmQ6IGFzc2lnbixcbiAgICBmb3JtYXRQYXJhbXM6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICB2YXIgYXJyID0gW107XG4gICAgICBmb3IgKHZhciBuYW1lIGluIGRhdGEpIHtcbiAgICAgICAgaWYgKHt9Lmhhc093blByb3BlcnR5LmNhbGwoZGF0YSwgbmFtZSkpIHtcbiAgICAgICAgICBhcnIucHVzaChlbmNvZGVVUklDb21wb25lbnQobmFtZSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQoZGF0YVtuYW1lXSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gYXJyLmpvaW4oJyYnKTtcbiAgICB9LFxuICAgIF9qc29ucDogbnVsbFxuICB9O1xuXG4gIF9mbi5leHRlbmQoX2NmZywgb3B0aW9ucyk7XG4gIC8vIC0tc3RhcnRcblxuICAvLyBsb2coX2NmZylcblxuICAvLyAtanNvbnBcbiAgaWYgKF9jZmcuZGF0YVR5cGUgPT09ICdqc29ucCcpIHtcbiAgICBfZm4uX2pzb25wICYmIF9mbi5fanNvbnAoX2NmZyk7XG5cbiAgICByZXR1cm47XG4gIH1cblxuICAvLyAtanNvblxuICBfY2ZnLnR5cGUgPSBfY2ZnLnR5cGUudG9VcHBlckNhc2UoKTtcbiAgdmFyIHBhcmFtcyA9IF9mbi5mb3JtYXRQYXJhbXMoX2NmZy5kYXRhKTtcbiAgLy8gbG9nKHBhcmFtcylcbiAgLy8g5Yib5bu6IC0g6Z2eSUU2IC0g56ys5LiA5q2lXG4gIHZhciB4aHI7XG4gIGlmICh3aW5kb3cuWE1MSHR0cFJlcXVlc3QpIHtcbiAgICB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgfSBlbHNlIHsgLy8gSUU25Y+K5YW25Lul5LiL54mI5pys5rWP6KeI5ZmoXG4gICAgeGhyID0gbmV3IEFjdGl2ZVhPYmplY3QoJ01pY3Jvc29mdC5YTUxIVFRQJyk7XG4gIH1cblxuICAvLyDlrprkuYnmjqXmlLYgLSDnrKzkuozmraVcbiAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBfY2ZnLmNvbXBsZXRlICYmIF9jZmcuY29tcGxldGUoeGhyKTtcblxuICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgdmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cbiAgICAgIGlmIChzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMCkge1xuICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgIGlmIChfY2ZnLmRhdGFUeXBlID09PSAnanNvbicpIHtcbiAgICAgICAgICAvLyByZXNwb25zZSA9IGV2YWwoJygnICsgeGhyLnJlc3BvbnNlVGV4dCArICcpJyk7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSB7fTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzcG9uc2UgPSB4aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICB9XG4gICAgICAgIF9jZmcuc3VjY2VzcyAmJiBfY2ZnLnN1Y2Nlc3MocmVzcG9uc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX2NmZy5lcnJvciAmJiBfY2ZnLmVycm9yKHN0YXR1cyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIOi/nuaOpSDlkowg5Y+R6YCBIC0g56ys5LiJ5q2lXG4gIGlmIChfY2ZnLnR5cGUudG9Mb2NhbGVMb3dlckNhc2UoKSA9PT0gJ2dldCcpIHtcbiAgICBpZiAocGFyYW1zKSB7XG4gICAgICBwYXJhbXMgPSAnPycgKyBwYXJhbXM7XG4gICAgfVxuICAgIHhoci5vcGVuKCdHRVQnLCBfY2ZnLnVybCArIHBhcmFtcywgX2NmZy5hc3luYyk7XG4gICAgeGhyLnNlbmQobnVsbCk7XG4gICAgX2NmZy5jb21wbGV0ZSAmJiBfY2ZnLmNvbXBsZXRlKF9jZmcudXJsICsgcGFyYW1zKTtcbiAgfSBlbHNlIGlmIChfY2ZnLnR5cGUudG9Mb2NhbGVMb3dlckNhc2UoKSA9PT0gJ3Bvc3QnKSB7XG4gICAgeGhyLm9wZW4oJ1BPU1QnLCBfY2ZnLnVybCwgdHJ1ZSk7XG4gICAgLy8g6K6+572u6KGo5Y2V5o+Q5Lqk5pe255qE5YaF5a6557G75Z6LXG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsIF9jZmcuY29udGVudFR5cGUpO1xuICAgIHhoci5zZW5kKHBhcmFtcyk7XG4gICAgX2NmZy5jb21wbGV0ZSAmJiBfY2ZnLmNvbXBsZXRlKHBhcmFtcyk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaGFuZGxlO1xuIl19
