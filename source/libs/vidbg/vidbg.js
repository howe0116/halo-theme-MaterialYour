/*!
 * vidbg.js v2.1.0 (https://github.com/blakewilson/vidbg)
 * vidbg.js by Blake Wilson (https://blake.id)
 * @license MIT (https://github.com/blakewilson/vidbg/blob/master/LICENSE)
 */
!(function (e, t) {
  "object" == typeof exports && "object" == typeof module ? (module.exports = t()) : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? (exports.vidbg = t()) : (e.vidbg = t());
})(this, function () {
  return (function () {
    "use strict";
    var e = {
        293: function (e) {
          var t = "a-f\\d",
            o = "#?[".concat(t, "]{3}[").concat(t, "]?"),
            n = "#?[".concat(t, "]{6}([").concat(t, "]{2})?"),
            r = new RegExp("[^#".concat(t, "]"), "gi"),
            i = new RegExp("^".concat(o, "$|^").concat(n, "$"), "i");
          e.exports = function (e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if ("string" != typeof e || r.test(e) || !i.test(e)) throw new TypeError("Expected a valid hex string");
            var o = 1;
            8 === (e = e.replace(/^#/, "")).length && ((o = Number.parseInt(e.slice(6, 8), 16) / 255), (e = e.slice(0, 6))), 4 === e.length && ((o = Number.parseInt(e.slice(3, 4).repeat(2), 16) / 255), (e = e.slice(0, 3))), 3 === e.length && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]);
            var n = Number.parseInt(e, 16),
              a = n >> 16,
              c = (n >> 8) & 255,
              l = 255 & n,
              s = "number" == typeof t.alpha ? t.alpha : o;
            if ("array" === t.format) return [a, c, l, s];
            if ("css" === t.format) {
              var u = 1 === s ? "" : " / ".concat(Number((100 * s).toFixed(2)), "%");
              return "rgb(".concat(a, " ").concat(c, " ").concat(l).concat(u, ")");
            }
            return { red: a, green: c, blue: l, alpha: s };
          };
        },
      },
      t = {};
    function o(n) {
      var r = t[n];
      if (void 0 !== r) return r.exports;
      var i = (t[n] = { exports: {} });
      return e[n](i, i.exports, o), i.exports;
    }
    (o.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return o.d(t, { a: t }), t;
    }),
      (o.d = function (e, t) {
        for (var n in t) o.o(t, n) && !o.o(e, n) && Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
      }),
      (o.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      });
    var n = {};
    return (
      (function () {
        o.d(n, {
          default: function () {
            return d;
          },
        });
        var e,
          t = o(293),
          r = o.n(t),
          i = { mp4: null, webm: null, poster: null, overlay: !1, overlayColor: "#000", overlayAlpha: 0.3 },
          a = { controls: !1, loop: !0, muted: !0, playsInline: !0 },
          c =
            ((e = function (t, o) {
              return (e =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (e, t) {
                    e.__proto__ = t;
                  }) ||
                function (e, t) {
                  for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                })(t, o);
            }),
            function (t, o) {
              if ("function" != typeof o && null !== o) throw new TypeError("Class extends value " + String(o) + " is not a constructor or null");
              function n() {
                this.constructor = t;
              }
              e(t, o), (t.prototype = null === o ? Object.create(o) : ((n.prototype = o.prototype), new n()));
            }),
          l = (function (e) {
            function t(t) {
              var o = e.call(this, t) || this;
              return (o.name = "InvalidSelectorError"), o;
            }
            return c(t, e), t;
          })(Error),
          s = (function () {
            var e = function (t, o) {
              return (e =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (e, t) {
                    e.__proto__ = t;
                  }) ||
                function (e, t) {
                  for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
                })(t, o);
            };
            return function (t, o) {
              if ("function" != typeof o && null !== o) throw new TypeError("Class extends value " + String(o) + " is not a constructor or null");
              function n() {
                this.constructor = t;
              }
              e(t, o), (t.prototype = null === o ? Object.create(o) : ((n.prototype = o.prototype), new n()));
            };
          })(),
          u = (function (e) {
            function t(t) {
              var o = e.call(this, t) || this;
              return (o.name = "VideoSourceNotSpecifiedError"), o;
            }
            return s(t, e), t;
          })(Error),
          p = function () {
            return (p =
              Object.assign ||
              function (e) {
                for (var t, o = 1, n = arguments.length; o < n; o++) for (var r in (t = arguments[o])) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                return e;
              }).apply(this, arguments);
          },
          d = (function () {
            function e(e, t, o) {
              var n = this;
              if (
                ((this.createContainer = function () {
                  (n.containerEl = document.createElement("div")), (n.containerEl.className = "vidbg-container"), n.createPoster(), n.el.appendChild(n.containerEl);
                }),
                (this.createOverlay = function () {
                  if (((n.overlayEl = document.createElement("div")), (n.overlayEl.className = "vidbg-overlay"), n.options.overlay)) {
                    var e = r()(n.options.overlayColor, { format: "array" }),
                      t = [e[0], e[1], e[2], n.options.overlayAlpha];
                    n.overlayEl.style.backgroundColor = "rgba(" + t.join(", ") + ")";
                  }
                  n.containerEl.appendChild(n.overlayEl);
                }),
                (this.createPoster = function () {
                  n.options.poster && (n.containerEl.style.backgroundImage = "url(" + n.options.poster + ")");
                }),
                (this.createVideo = function () {
                  for (var e in ((n.videoEl = document.createElement("video")), n.videoEl.addEventListener("playing", n.onPlayEvent), n.attributes)) n.videoEl[e] = n.attributes[e];
                  if (n.options.mp4) {
                    var t = document.createElement("source");
                    (t.src = n.options.mp4), (t.type = "video/mp4"), n.videoEl.appendChild(t);
                  }
                  if (n.options.webm) {
                    var o = document.createElement("source");
                    (o.src = n.options.webm), (o.type = "video/webm"), n.videoEl.appendChild(o);
                  }
                  n.containerEl.appendChild(n.videoEl);
                  var r = n.videoEl.play();
                  void 0 !== r &&
                    r.catch(function (e) {
                      console.error(e), console.error("Autoplay is not supported. The video element will be removed."), n.removeVideo();
                    });
                }),
                (this.onPlayEvent = function () {
                  n.resize(), (n.videoEl.style.opacity = "1");
                }),
                (this.removeVideo = function () {
                  n.videoEl.remove();
                }),
                (this.getVideo = function () {
                  return n.videoEl;
                }),
                (this.getEl = function () {
                  return n.el;
                }),
                (this.isVideoPlaying = function () {
                  return !n.videoEl.paused;
                }),
                (this.playVideo = function () {
                  return n.videoEl.play();
                }),
                (this.pauseVideo = function () {
                  return n.videoEl.pause();
                }),
                (this.destroy = function () {
                  n.containerEl.remove();
                }),
                (this.resize = function () {
                    //视频自适应宽高有些问题，其实不用js控制，也还好
                  //var e = n.containerEl.offsetWidth,
                //     t = n.containerEl.offsetHeight;
                //   e / n.videoEl.videoWidth > t / n.videoEl.videoHeight ? ((n.videoEl.style.width = e + "px"), (n.videoEl.style.height = "auto")) : ((n.videoEl.style.width = "auto"), (n.videoEl.style.height = t + "px"));
                //     setTimeout(()=>{
                //         var e = n.containerEl.offsetWidth,
                //     t = n.containerEl.offsetHeight;
                //   e / n.videoEl.videoWidth > t / n.videoEl.videoHeight ? ((n.videoEl.style.width = e + "px"), (n.videoEl.style.height = "auto")) : ((n.videoEl.style.width = "auto"), (n.videoEl.style.height = t + "px"));
                //     },4)
                }),
                !e)
              )
                throw new l("A selector is required!");
              var c = document.querySelector(e);
              if (!c) throw new l('The selector you specified, "' + e + '", does not exist!');
              if (((this.el = c), (this.options = p(p({}, i), t)), (this.attributes = p(p({}, a), o)), !this.options.mp4 && !this.options.webm)) throw new u("Please provide an mp4, webm, or both");
              this.init();
            }
            return (
              (e.prototype.init = function () {
                (this.el.style.position = "relative"), (this.el.style.zIndex = "1"), this.createContainer(), this.createVideo(), this.createOverlay(), window.addEventListener("resize", this.resize);
              }),
              e
            );
          })();
      })(),
      (n = n.default)
    );
  })();
});
