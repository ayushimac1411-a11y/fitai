import { o, r as reactExports, v as vt, e as useQueryClient, t as today, j as jsxRuntimeExports, m as motion, f as AnimatePresence, h as formatDateShort, i as formatDate } from "./index-gvkJDNXI.js";
import { u as useBackend, a as useQuery } from "./useBackend-DWQBpq60.js";
import { u as useMutation } from "./useMutation-Bt3tAYcw.js";
import { S as Scale } from "./scale-nLtas3Ef.js";
import { X } from "./x-D1GWcjpE.js";
var jt = (n) => {
  switch (n) {
    case "success":
      return ee;
    case "info":
      return ae;
    case "warning":
      return oe;
    case "error":
      return se;
    default:
      return null;
  }
}, te = Array(12).fill(0), Yt = ({ visible: n, className: e }) => o.createElement("div", { className: ["sonner-loading-wrapper", e].filter(Boolean).join(" "), "data-visible": n }, o.createElement("div", { className: "sonner-spinner" }, te.map((t, a) => o.createElement("div", { className: "sonner-loading-bar", key: `spinner-bar-${a}` })))), ee = o.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, o.createElement("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z", clipRule: "evenodd" })), oe = o.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", height: "20", width: "20" }, o.createElement("path", { fillRule: "evenodd", d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z", clipRule: "evenodd" })), ae = o.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, o.createElement("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z", clipRule: "evenodd" })), se = o.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, o.createElement("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z", clipRule: "evenodd" })), Ot = o.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, o.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), o.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" }));
var Ft = () => {
  let [n, e] = o.useState(document.hidden);
  return o.useEffect(() => {
    let t = () => {
      e(document.hidden);
    };
    return document.addEventListener("visibilitychange", t), () => window.removeEventListener("visibilitychange", t);
  }, []), n;
};
var bt = 1, yt = class {
  constructor() {
    this.subscribe = (e) => (this.subscribers.push(e), () => {
      let t = this.subscribers.indexOf(e);
      this.subscribers.splice(t, 1);
    });
    this.publish = (e) => {
      this.subscribers.forEach((t) => t(e));
    };
    this.addToast = (e) => {
      this.publish(e), this.toasts = [...this.toasts, e];
    };
    this.create = (e) => {
      var S;
      let { message: t, ...a } = e, u = typeof (e == null ? void 0 : e.id) == "number" || ((S = e.id) == null ? void 0 : S.length) > 0 ? e.id : bt++, f = this.toasts.find((g) => g.id === u), w = e.dismissible === void 0 ? true : e.dismissible;
      return this.dismissedToasts.has(u) && this.dismissedToasts.delete(u), f ? this.toasts = this.toasts.map((g) => g.id === u ? (this.publish({ ...g, ...e, id: u, title: t }), { ...g, ...e, id: u, dismissible: w, title: t }) : g) : this.addToast({ title: t, ...a, dismissible: w, id: u }), u;
    };
    this.dismiss = (e) => (this.dismissedToasts.add(e), e || this.toasts.forEach((t) => {
      this.subscribers.forEach((a) => a({ id: t.id, dismiss: true }));
    }), this.subscribers.forEach((t) => t({ id: e, dismiss: true })), e);
    this.message = (e, t) => this.create({ ...t, message: e });
    this.error = (e, t) => this.create({ ...t, message: e, type: "error" });
    this.success = (e, t) => this.create({ ...t, type: "success", message: e });
    this.info = (e, t) => this.create({ ...t, type: "info", message: e });
    this.warning = (e, t) => this.create({ ...t, type: "warning", message: e });
    this.loading = (e, t) => this.create({ ...t, type: "loading", message: e });
    this.promise = (e, t) => {
      if (!t) return;
      let a;
      t.loading !== void 0 && (a = this.create({ ...t, promise: e, type: "loading", message: t.loading, description: typeof t.description != "function" ? t.description : void 0 }));
      let u = e instanceof Promise ? e : e(), f = a !== void 0, w, S = u.then(async (i) => {
        if (w = ["resolve", i], o.isValidElement(i)) f = false, this.create({ id: a, type: "default", message: i });
        else if (ie(i) && !i.ok) {
          f = false;
          let T = typeof t.error == "function" ? await t.error(`HTTP error! status: ${i.status}`) : t.error, F = typeof t.description == "function" ? await t.description(`HTTP error! status: ${i.status}`) : t.description;
          this.create({ id: a, type: "error", message: T, description: F });
        } else if (t.success !== void 0) {
          f = false;
          let T = typeof t.success == "function" ? await t.success(i) : t.success, F = typeof t.description == "function" ? await t.description(i) : t.description;
          this.create({ id: a, type: "success", message: T, description: F });
        }
      }).catch(async (i) => {
        if (w = ["reject", i], t.error !== void 0) {
          f = false;
          let D = typeof t.error == "function" ? await t.error(i) : t.error, T = typeof t.description == "function" ? await t.description(i) : t.description;
          this.create({ id: a, type: "error", message: D, description: T });
        }
      }).finally(() => {
        var i;
        f && (this.dismiss(a), a = void 0), (i = t.finally) == null || i.call(t);
      }), g = () => new Promise((i, D) => S.then(() => w[0] === "reject" ? D(w[1]) : i(w[1])).catch(D));
      return typeof a != "string" && typeof a != "number" ? { unwrap: g } : Object.assign(a, { unwrap: g });
    };
    this.custom = (e, t) => {
      let a = (t == null ? void 0 : t.id) || bt++;
      return this.create({ jsx: e(a), id: a, ...t }), a;
    };
    this.getActiveToasts = () => this.toasts.filter((e) => !this.dismissedToasts.has(e.id));
    this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
  }
}, v = new yt(), ne = (n, e) => {
  let t = (e == null ? void 0 : e.id) || bt++;
  return v.addToast({ title: n, ...e, id: t }), t;
}, ie = (n) => n && typeof n == "object" && "ok" in n && typeof n.ok == "boolean" && "status" in n && typeof n.status == "number", le = ne, ce = () => v.toasts, de = () => v.getActiveToasts(), ue = Object.assign(le, { success: v.success, info: v.info, warning: v.warning, error: v.error, custom: v.custom, message: v.message, promise: v.promise, dismiss: v.dismiss, loading: v.loading }, { getHistory: ce, getToasts: de });
function wt(n, { insertAt: e } = {}) {
  if (typeof document == "undefined") return;
  let t = document.head || document.getElementsByTagName("head")[0], a = document.createElement("style");
  a.type = "text/css", e === "top" && t.firstChild ? t.insertBefore(a, t.firstChild) : t.appendChild(a), a.styleSheet ? a.styleSheet.cssText = n : a.appendChild(document.createTextNode(n));
}
wt(`:where(html[dir="ltr"]),:where([data-sonner-toaster][dir="ltr"]){--toast-icon-margin-start: -3px;--toast-icon-margin-end: 4px;--toast-svg-margin-start: -1px;--toast-svg-margin-end: 0px;--toast-button-margin-start: auto;--toast-button-margin-end: 0;--toast-close-button-start: 0;--toast-close-button-end: unset;--toast-close-button-transform: translate(-35%, -35%)}:where(html[dir="rtl"]),:where([data-sonner-toaster][dir="rtl"]){--toast-icon-margin-start: 4px;--toast-icon-margin-end: -3px;--toast-svg-margin-start: 0px;--toast-svg-margin-end: -1px;--toast-button-margin-start: 0;--toast-button-margin-end: auto;--toast-close-button-start: unset;--toast-close-button-end: 0;--toast-close-button-transform: translate(35%, -35%)}:where([data-sonner-toaster]){position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1: hsl(0, 0%, 99%);--gray2: hsl(0, 0%, 97.3%);--gray3: hsl(0, 0%, 95.1%);--gray4: hsl(0, 0%, 93%);--gray5: hsl(0, 0%, 90.9%);--gray6: hsl(0, 0%, 88.7%);--gray7: hsl(0, 0%, 85.8%);--gray8: hsl(0, 0%, 78%);--gray9: hsl(0, 0%, 56.1%);--gray10: hsl(0, 0%, 52.3%);--gray11: hsl(0, 0%, 43.5%);--gray12: hsl(0, 0%, 9%);--border-radius: 8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999;transition:transform .4s ease}:where([data-sonner-toaster][data-lifted="true"]){transform:translateY(-10px)}@media (hover: none) and (pointer: coarse){:where([data-sonner-toaster][data-lifted="true"]){transform:none}}:where([data-sonner-toaster][data-x-position="right"]){right:var(--offset-right)}:where([data-sonner-toaster][data-x-position="left"]){left:var(--offset-left)}:where([data-sonner-toaster][data-x-position="center"]){left:50%;transform:translate(-50%)}:where([data-sonner-toaster][data-y-position="top"]){top:var(--offset-top)}:where([data-sonner-toaster][data-y-position="bottom"]){bottom:var(--offset-bottom)}:where([data-sonner-toast]){--y: translateY(100%);--lift-amount: calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);filter:blur(0);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:none;overflow-wrap:anywhere}:where([data-sonner-toast][data-styled="true"]){padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px #0000001a;width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}:where([data-sonner-toast]:focus-visible){box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast][data-y-position="top"]){top:0;--y: translateY(-100%);--lift: 1;--lift-amount: calc(1 * var(--gap))}:where([data-sonner-toast][data-y-position="bottom"]){bottom:0;--y: translateY(100%);--lift: -1;--lift-amount: calc(var(--lift) * var(--gap))}:where([data-sonner-toast]) :where([data-description]){font-weight:400;line-height:1.4;color:inherit}:where([data-sonner-toast]) :where([data-title]){font-weight:500;line-height:1.5;color:inherit}:where([data-sonner-toast]) :where([data-icon]){display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}:where([data-sonner-toast][data-promise="true"]) :where([data-icon])>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}:where([data-sonner-toast]) :where([data-icon])>*{flex-shrink:0}:where([data-sonner-toast]) :where([data-icon]) svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}:where([data-sonner-toast]) :where([data-content]){display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;cursor:pointer;outline:none;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}:where([data-sonner-toast]) :where([data-button]):focus-visible{box-shadow:0 0 0 2px #0006}:where([data-sonner-toast]) :where([data-button]):first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}:where([data-sonner-toast]) :where([data-cancel]){color:var(--normal-text);background:rgba(0,0,0,.08)}:where([data-sonner-toast][data-theme="dark"]) :where([data-cancel]){background:rgba(255,255,255,.3)}:where([data-sonner-toast]) :where([data-close-button]){position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast] [data-close-button]{background:var(--gray1)}:where([data-sonner-toast]) :where([data-close-button]):focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast]) :where([data-disabled="true"]){cursor:not-allowed}:where([data-sonner-toast]):hover :where([data-close-button]):hover{background:var(--gray2);border-color:var(--gray5)}:where([data-sonner-toast][data-swiping="true"]):before{content:"";position:absolute;left:-50%;right:-50%;height:100%;z-index:-1}:where([data-sonner-toast][data-y-position="top"][data-swiping="true"]):before{bottom:50%;transform:scaleY(3) translateY(50%)}:where([data-sonner-toast][data-y-position="bottom"][data-swiping="true"]):before{top:50%;transform:scaleY(3) translateY(-50%)}:where([data-sonner-toast][data-swiping="false"][data-removed="true"]):before{content:"";position:absolute;inset:0;transform:scaleY(2)}:where([data-sonner-toast]):after{content:"";position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}:where([data-sonner-toast][data-mounted="true"]){--y: translateY(0);opacity:1}:where([data-sonner-toast][data-expanded="false"][data-front="false"]){--scale: var(--toasts-before) * .05 + 1;--y: translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}:where([data-sonner-toast])>*{transition:opacity .4s}:where([data-sonner-toast][data-expanded="false"][data-front="false"][data-styled="true"])>*{opacity:0}:where([data-sonner-toast][data-visible="false"]){opacity:0;pointer-events:none}:where([data-sonner-toast][data-mounted="true"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}:where([data-sonner-toast][data-removed="true"][data-front="true"][data-swipe-out="false"]){--y: translateY(calc(var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="false"]){--y: translateY(40%);opacity:0;transition:transform .5s,opacity .2s}:where([data-sonner-toast][data-removed="true"][data-front="false"]):before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y, 0px)) translate(var(--swipe-amount-x, 0px));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width: 600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-theme=light]{--normal-bg: #fff;--normal-border: var(--gray4);--normal-text: var(--gray12);--success-bg: hsl(143, 85%, 96%);--success-border: hsl(145, 92%, 91%);--success-text: hsl(140, 100%, 27%);--info-bg: hsl(208, 100%, 97%);--info-border: hsl(221, 91%, 91%);--info-text: hsl(210, 92%, 45%);--warning-bg: hsl(49, 100%, 97%);--warning-border: hsl(49, 91%, 91%);--warning-text: hsl(31, 92%, 45%);--error-bg: hsl(359, 100%, 97%);--error-border: hsl(359, 100%, 94%);--error-text: hsl(360, 100%, 45%)}[data-sonner-toaster][data-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg: #fff;--normal-border: var(--gray3);--normal-text: var(--gray12)}[data-sonner-toaster][data-theme=dark]{--normal-bg: #000;--normal-bg-hover: hsl(0, 0%, 12%);--normal-border: hsl(0, 0%, 20%);--normal-border-hover: hsl(0, 0%, 25%);--normal-text: var(--gray1);--success-bg: hsl(150, 100%, 6%);--success-border: hsl(147, 100%, 12%);--success-text: hsl(150, 86%, 65%);--info-bg: hsl(215, 100%, 6%);--info-border: hsl(223, 100%, 12%);--info-text: hsl(216, 87%, 65%);--warning-bg: hsl(64, 100%, 6%);--warning-border: hsl(60, 100%, 12%);--warning-text: hsl(46, 87%, 65%);--error-bg: hsl(358, 76%, 10%);--error-border: hsl(357, 89%, 16%);--error-text: hsl(358, 100%, 81%)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success],[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info],[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning],[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error],[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size: 16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:nth-child(1){animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}to{opacity:.15}}@media (prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}
`);
function tt(n) {
  return n.label !== void 0;
}
var pe = 3, me = "32px", ge = "16px", Wt = 4e3, he = 356, be = 14, ye = 20, we = 200;
function M(...n) {
  return n.filter(Boolean).join(" ");
}
function xe(n) {
  let [e, t] = n.split("-"), a = [];
  return e && a.push(e), t && a.push(t), a;
}
var ve = (n) => {
  var Dt, Pt, Nt, Bt, Ct, kt, It, Mt, Ht, At, Lt;
  let { invert: e, toast: t, unstyled: a, interacting: u, setHeights: f, visibleToasts: w, heights: S, index: g, toasts: i, expanded: D, removeToast: T, defaultRichColors: F, closeButton: et, style: ut, cancelButtonStyle: ft, actionButtonStyle: l, className: ot = "", descriptionClassName: at = "", duration: X2, position: st, gap: pt, loadingIcon: rt, expandByDefault: B, classNames: s, icons: P, closeButtonAriaLabel: nt = "Close toast", pauseWhenPageIsHidden: it } = n, [Y, C] = o.useState(null), [lt, J] = o.useState(null), [W, H] = o.useState(false), [A, mt] = o.useState(false), [L, z] = o.useState(false), [ct, d] = o.useState(false), [h, y] = o.useState(false), [R, j] = o.useState(0), [p, _] = o.useState(0), O = o.useRef(t.duration || X2 || Wt), G = o.useRef(null), k = o.useRef(null), Vt = g === 0, Ut = g + 1 <= w, N = t.type, V = t.dismissible !== false, Kt = t.className || "", Xt = t.descriptionClassName || "", dt = o.useMemo(() => S.findIndex((r) => r.toastId === t.id) || 0, [S, t.id]), Jt = o.useMemo(() => {
    var r;
    return (r = t.closeButton) != null ? r : et;
  }, [t.closeButton, et]), Tt = o.useMemo(() => t.duration || X2 || Wt, [t.duration, X2]), gt = o.useRef(0), U = o.useRef(0), St = o.useRef(0), K = o.useRef(null), [Gt, Qt] = st.split("-"), Rt = o.useMemo(() => S.reduce((r, m, c) => c >= dt ? r : r + m.height, 0), [S, dt]), Et = Ft(), qt = t.invert || e, ht = N === "loading";
  U.current = o.useMemo(() => dt * pt + Rt, [dt, Rt]), o.useEffect(() => {
    O.current = Tt;
  }, [Tt]), o.useEffect(() => {
    H(true);
  }, []), o.useEffect(() => {
    let r = k.current;
    if (r) {
      let m = r.getBoundingClientRect().height;
      return _(m), f((c) => [{ toastId: t.id, height: m, position: t.position }, ...c]), () => f((c) => c.filter((b) => b.toastId !== t.id));
    }
  }, [f, t.id]), o.useLayoutEffect(() => {
    if (!W) return;
    let r = k.current, m = r.style.height;
    r.style.height = "auto";
    let c = r.getBoundingClientRect().height;
    r.style.height = m, _(c), f((b) => b.find((x) => x.toastId === t.id) ? b.map((x) => x.toastId === t.id ? { ...x, height: c } : x) : [{ toastId: t.id, height: c, position: t.position }, ...b]);
  }, [W, t.title, t.description, f, t.id]);
  let $ = o.useCallback(() => {
    mt(true), j(U.current), f((r) => r.filter((m) => m.toastId !== t.id)), setTimeout(() => {
      T(t);
    }, we);
  }, [t, T, f, U]);
  o.useEffect(() => {
    if (t.promise && N === "loading" || t.duration === 1 / 0 || t.type === "loading") return;
    let r;
    return D || u || it && Et ? (() => {
      if (St.current < gt.current) {
        let b = (/* @__PURE__ */ new Date()).getTime() - gt.current;
        O.current = O.current - b;
      }
      St.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      O.current !== 1 / 0 && (gt.current = (/* @__PURE__ */ new Date()).getTime(), r = setTimeout(() => {
        var b;
        (b = t.onAutoClose) == null || b.call(t, t), $();
      }, O.current));
    })(), () => clearTimeout(r);
  }, [D, u, t, N, it, Et, $]), o.useEffect(() => {
    t.delete && $();
  }, [$, t.delete]);
  function Zt() {
    var r, m, c;
    return P != null && P.loading ? o.createElement("div", { className: M(s == null ? void 0 : s.loader, (r = t == null ? void 0 : t.classNames) == null ? void 0 : r.loader, "sonner-loader"), "data-visible": N === "loading" }, P.loading) : rt ? o.createElement("div", { className: M(s == null ? void 0 : s.loader, (m = t == null ? void 0 : t.classNames) == null ? void 0 : m.loader, "sonner-loader"), "data-visible": N === "loading" }, rt) : o.createElement(Yt, { className: M(s == null ? void 0 : s.loader, (c = t == null ? void 0 : t.classNames) == null ? void 0 : c.loader), visible: N === "loading" });
  }
  return o.createElement("li", { tabIndex: 0, ref: k, className: M(ot, Kt, s == null ? void 0 : s.toast, (Dt = t == null ? void 0 : t.classNames) == null ? void 0 : Dt.toast, s == null ? void 0 : s.default, s == null ? void 0 : s[N], (Pt = t == null ? void 0 : t.classNames) == null ? void 0 : Pt[N]), "data-sonner-toast": "", "data-rich-colors": (Nt = t.richColors) != null ? Nt : F, "data-styled": !(t.jsx || t.unstyled || a), "data-mounted": W, "data-promise": !!t.promise, "data-swiped": h, "data-removed": A, "data-visible": Ut, "data-y-position": Gt, "data-x-position": Qt, "data-index": g, "data-front": Vt, "data-swiping": L, "data-dismissible": V, "data-type": N, "data-invert": qt, "data-swipe-out": ct, "data-swipe-direction": lt, "data-expanded": !!(D || B && W), style: { "--index": g, "--toasts-before": g, "--z-index": i.length - g, "--offset": `${A ? R : U.current}px`, "--initial-height": B ? "auto" : `${p}px`, ...ut, ...t.style }, onDragEnd: () => {
    z(false), C(null), K.current = null;
  }, onPointerDown: (r) => {
    ht || !V || (G.current = /* @__PURE__ */ new Date(), j(U.current), r.target.setPointerCapture(r.pointerId), r.target.tagName !== "BUTTON" && (z(true), K.current = { x: r.clientX, y: r.clientY }));
  }, onPointerUp: () => {
    var x, Q, q, Z;
    if (ct || !V) return;
    K.current = null;
    let r = Number(((x = k.current) == null ? void 0 : x.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0), m = Number(((Q = k.current) == null ? void 0 : Q.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0), c = (/* @__PURE__ */ new Date()).getTime() - ((q = G.current) == null ? void 0 : q.getTime()), b = Y === "x" ? r : m, I = Math.abs(b) / c;
    if (Math.abs(b) >= ye || I > 0.11) {
      j(U.current), (Z = t.onDismiss) == null || Z.call(t, t), J(Y === "x" ? r > 0 ? "right" : "left" : m > 0 ? "down" : "up"), $(), d(true), y(false);
      return;
    }
    z(false), C(null);
  }, onPointerMove: (r) => {
    var Q, q, Z, zt;
    if (!K.current || !V || ((Q = window.getSelection()) == null ? void 0 : Q.toString().length) > 0) return;
    let c = r.clientY - K.current.y, b = r.clientX - K.current.x, I = (q = n.swipeDirections) != null ? q : xe(st);
    !Y && (Math.abs(b) > 1 || Math.abs(c) > 1) && C(Math.abs(b) > Math.abs(c) ? "x" : "y");
    let x = { x: 0, y: 0 };
    Y === "y" ? (I.includes("top") || I.includes("bottom")) && (I.includes("top") && c < 0 || I.includes("bottom") && c > 0) && (x.y = c) : Y === "x" && (I.includes("left") || I.includes("right")) && (I.includes("left") && b < 0 || I.includes("right") && b > 0) && (x.x = b), (Math.abs(x.x) > 0 || Math.abs(x.y) > 0) && y(true), (Z = k.current) == null || Z.style.setProperty("--swipe-amount-x", `${x.x}px`), (zt = k.current) == null || zt.style.setProperty("--swipe-amount-y", `${x.y}px`);
  } }, Jt && !t.jsx ? o.createElement("button", { "aria-label": nt, "data-disabled": ht, "data-close-button": true, onClick: ht || !V ? () => {
  } : () => {
    var r;
    $(), (r = t.onDismiss) == null || r.call(t, t);
  }, className: M(s == null ? void 0 : s.closeButton, (Bt = t == null ? void 0 : t.classNames) == null ? void 0 : Bt.closeButton) }, (Ct = P == null ? void 0 : P.close) != null ? Ct : Ot) : null, t.jsx || reactExports.isValidElement(t.title) ? t.jsx ? t.jsx : typeof t.title == "function" ? t.title() : t.title : o.createElement(o.Fragment, null, N || t.icon || t.promise ? o.createElement("div", { "data-icon": "", className: M(s == null ? void 0 : s.icon, (kt = t == null ? void 0 : t.classNames) == null ? void 0 : kt.icon) }, t.promise || t.type === "loading" && !t.icon ? t.icon || Zt() : null, t.type !== "loading" ? t.icon || (P == null ? void 0 : P[N]) || jt(N) : null) : null, o.createElement("div", { "data-content": "", className: M(s == null ? void 0 : s.content, (It = t == null ? void 0 : t.classNames) == null ? void 0 : It.content) }, o.createElement("div", { "data-title": "", className: M(s == null ? void 0 : s.title, (Mt = t == null ? void 0 : t.classNames) == null ? void 0 : Mt.title) }, typeof t.title == "function" ? t.title() : t.title), t.description ? o.createElement("div", { "data-description": "", className: M(at, Xt, s == null ? void 0 : s.description, (Ht = t == null ? void 0 : t.classNames) == null ? void 0 : Ht.description) }, typeof t.description == "function" ? t.description() : t.description) : null), reactExports.isValidElement(t.cancel) ? t.cancel : t.cancel && tt(t.cancel) ? o.createElement("button", { "data-button": true, "data-cancel": true, style: t.cancelButtonStyle || ft, onClick: (r) => {
    var m, c;
    tt(t.cancel) && V && ((c = (m = t.cancel).onClick) == null || c.call(m, r), $());
  }, className: M(s == null ? void 0 : s.cancelButton, (At = t == null ? void 0 : t.classNames) == null ? void 0 : At.cancelButton) }, t.cancel.label) : null, reactExports.isValidElement(t.action) ? t.action : t.action && tt(t.action) ? o.createElement("button", { "data-button": true, "data-action": true, style: t.actionButtonStyle || l, onClick: (r) => {
    var m, c;
    tt(t.action) && ((c = (m = t.action).onClick) == null || c.call(m, r), !r.defaultPrevented && $());
  }, className: M(s == null ? void 0 : s.actionButton, (Lt = t == null ? void 0 : t.classNames) == null ? void 0 : Lt.actionButton) }, t.action.label) : null));
};
function _t() {
  if (typeof window == "undefined" || typeof document == "undefined") return "ltr";
  let n = document.documentElement.getAttribute("dir");
  return n === "auto" || !n ? window.getComputedStyle(document.documentElement).direction : n;
}
function Te(n, e) {
  let t = {};
  return [n, e].forEach((a, u) => {
    let f = u === 1, w = f ? "--mobile-offset" : "--offset", S = f ? ge : me;
    function g(i) {
      ["top", "right", "bottom", "left"].forEach((D) => {
        t[`${w}-${D}`] = typeof i == "number" ? `${i}px` : i;
      });
    }
    typeof a == "number" || typeof a == "string" ? g(a) : typeof a == "object" ? ["top", "right", "bottom", "left"].forEach((i) => {
      a[i] === void 0 ? t[`${w}-${i}`] = S : t[`${w}-${i}`] = typeof a[i] == "number" ? `${a[i]}px` : a[i];
    }) : g(S);
  }), t;
}
reactExports.forwardRef(function(e, t) {
  let { invert: a, position: u = "bottom-right", hotkey: f = ["altKey", "KeyT"], expand: w, closeButton: S, className: g, offset: i, mobileOffset: D, theme: T = "light", richColors: F, duration: et, style: ut, visibleToasts: ft = pe, toastOptions: l, dir: ot = _t(), gap: at = be, loadingIcon: X2, icons: st, containerAriaLabel: pt = "Notifications", pauseWhenPageIsHidden: rt } = e, [B, s] = o.useState([]), P = o.useMemo(() => Array.from(new Set([u].concat(B.filter((d) => d.position).map((d) => d.position)))), [B, u]), [nt, it] = o.useState([]), [Y, C] = o.useState(false), [lt, J] = o.useState(false), [W, H] = o.useState(T !== "system" ? T : typeof window != "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), A = o.useRef(null), mt = f.join("+").replace(/Key/g, "").replace(/Digit/g, ""), L = o.useRef(null), z = o.useRef(false), ct = o.useCallback((d) => {
    s((h) => {
      var y;
      return (y = h.find((R) => R.id === d.id)) != null && y.delete || v.dismiss(d.id), h.filter(({ id: R }) => R !== d.id);
    });
  }, []);
  return o.useEffect(() => v.subscribe((d) => {
    if (d.dismiss) {
      s((h) => h.map((y) => y.id === d.id ? { ...y, delete: true } : y));
      return;
    }
    setTimeout(() => {
      vt.flushSync(() => {
        s((h) => {
          let y = h.findIndex((R) => R.id === d.id);
          return y !== -1 ? [...h.slice(0, y), { ...h[y], ...d }, ...h.slice(y + 1)] : [d, ...h];
        });
      });
    });
  }), []), o.useEffect(() => {
    if (T !== "system") {
      H(T);
      return;
    }
    if (T === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? H("dark") : H("light")), typeof window == "undefined") return;
    let d = window.matchMedia("(prefers-color-scheme: dark)");
    try {
      d.addEventListener("change", ({ matches: h }) => {
        H(h ? "dark" : "light");
      });
    } catch (h) {
      d.addListener(({ matches: y }) => {
        try {
          H(y ? "dark" : "light");
        } catch (R) {
          console.error(R);
        }
      });
    }
  }, [T]), o.useEffect(() => {
    B.length <= 1 && C(false);
  }, [B]), o.useEffect(() => {
    let d = (h) => {
      var R, j;
      f.every((p) => h[p] || h.code === p) && (C(true), (R = A.current) == null || R.focus()), h.code === "Escape" && (document.activeElement === A.current || (j = A.current) != null && j.contains(document.activeElement)) && C(false);
    };
    return document.addEventListener("keydown", d), () => document.removeEventListener("keydown", d);
  }, [f]), o.useEffect(() => {
    if (A.current) return () => {
      L.current && (L.current.focus({ preventScroll: true }), L.current = null, z.current = false);
    };
  }, [A.current]), o.createElement("section", { ref: t, "aria-label": `${pt} ${mt}`, tabIndex: -1, "aria-live": "polite", "aria-relevant": "additions text", "aria-atomic": "false", suppressHydrationWarning: true }, P.map((d, h) => {
    var j;
    let [y, R] = d.split("-");
    return B.length ? o.createElement("ol", { key: d, dir: ot === "auto" ? _t() : ot, tabIndex: -1, ref: A, className: g, "data-sonner-toaster": true, "data-theme": W, "data-y-position": y, "data-lifted": Y && B.length > 1 && !w, "data-x-position": R, style: { "--front-toast-height": `${((j = nt[0]) == null ? void 0 : j.height) || 0}px`, "--width": `${he}px`, "--gap": `${at}px`, ...ut, ...Te(i, D) }, onBlur: (p) => {
      z.current && !p.currentTarget.contains(p.relatedTarget) && (z.current = false, L.current && (L.current.focus({ preventScroll: true }), L.current = null));
    }, onFocus: (p) => {
      p.target instanceof HTMLElement && p.target.dataset.dismissible === "false" || z.current || (z.current = true, L.current = p.relatedTarget);
    }, onMouseEnter: () => C(true), onMouseMove: () => C(true), onMouseLeave: () => {
      lt || C(false);
    }, onDragEnd: () => C(false), onPointerDown: (p) => {
      p.target instanceof HTMLElement && p.target.dataset.dismissible === "false" || J(true);
    }, onPointerUp: () => J(false) }, B.filter((p) => !p.position && h === 0 || p.position === d).map((p, _) => {
      var O, G;
      return o.createElement(ve, { key: p.id, icons: st, index: _, toast: p, defaultRichColors: F, duration: (O = l == null ? void 0 : l.duration) != null ? O : et, className: l == null ? void 0 : l.className, descriptionClassName: l == null ? void 0 : l.descriptionClassName, invert: a, visibleToasts: ft, closeButton: (G = l == null ? void 0 : l.closeButton) != null ? G : S, interacting: lt, position: d, style: l == null ? void 0 : l.style, unstyled: l == null ? void 0 : l.unstyled, classNames: l == null ? void 0 : l.classNames, cancelButtonStyle: l == null ? void 0 : l.cancelButtonStyle, actionButtonStyle: l == null ? void 0 : l.actionButtonStyle, removeToast: ct, toasts: B.filter((k) => k.position == p.position), heights: nt.filter((k) => k.position == p.position), setHeights: it, expandByDefault: w, gap: at, loadingIcon: X2, expanded: Y, pauseWhenPageIsHidden: rt, swipeDirections: e.swipeDirections });
    })) : null;
  }));
});
function getWeekDays() {
  const now = /* @__PURE__ */ new Date();
  const day = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (day + 6) % 7);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dateStr = formatDate(d);
    return {
      date: dateStr,
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      short: String(d.getDate())
    };
  });
}
function getDayStatus(checkIn) {
  if (!checkIn) return "missed";
  if (checkIn.workoutDone && checkIn.dietFollowed) return "full";
  if (checkIn.workoutDone || checkIn.dietFollowed) return "partial";
  return "missed";
}
function StreakBanner({ streak }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: -12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, ease: "easeOut" },
      className: "relative overflow-hidden rounded-2xl p-5",
      style: {
        background: "linear-gradient(135deg, rgba(34,197,94,0.22) 0%, rgba(56,189,248,0.10) 60%, rgba(15,23,42,0.0) 100%)",
        border: "1px solid rgba(34,197,94,0.25)",
        boxShadow: "0 4px 32px rgba(34,197,94,0.12)"
      },
      "data-ocid": "tracking.streak_banner",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute -top-6 -right-6 w-24 h-24 rounded-full pointer-events-none",
            style: {
              background: "radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              animate: { scale: [1, 1.15, 1] },
              transition: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
                ease: "easeInOut"
              },
              className: "text-5xl leading-none select-none",
              "aria-hidden": "true",
              children: "🔥"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: streak > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 6 },
                animate: { opacity: 1, y: 0 },
                className: "font-display font-bold text-2xl text-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CountUp, { target: streak }),
                  " day streak!"
                ]
              },
              streak
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: streak >= 7 ? "You're on fire! Keep crushing it 💪" : streak >= 3 ? "Great consistency! Don't break the chain 🔗" : "Off to a great start! Keep going 🚀" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-xl text-foreground", children: "Start your streak today!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Complete today's check-in and light the fire ✨" })
          ] }) })
        ] })
      ]
    }
  );
}
function CountUp({ target }) {
  const [count, setCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    let frame;
    const start = performance.now();
    const duration = 600;
    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(progress * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: count });
}
function ToggleRow({
  id,
  emoji,
  label,
  checked,
  onChange,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      type: "button",
      id,
      "data-ocid": ocid,
      onClick: onChange,
      whileTap: { scale: 0.97 },
      className: [
        "w-full flex items-center justify-between p-4 rounded-xl transition-smooth cursor-pointer",
        checked ? "border border-accent/40" : "border border-white/08"
      ].join(" "),
      style: {
        background: checked ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.03)"
      },
      "aria-pressed": checked,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3 text-sm font-medium text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: emoji }),
          label
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: false,
            animate: checked ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0.3 },
            transition: { type: "spring", stiffness: 300, damping: 20 },
            className: [
              "w-7 h-7 rounded-full flex items-center justify-center text-base",
              checked ? "bg-accent text-black" : "bg-white/10 text-muted-foreground"
            ].join(" "),
            children: checked ? "✓" : "○"
          }
        )
      ]
    }
  );
}
function WaterTracker({
  glasses,
  setGlasses
}) {
  const GOAL = 8;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-glass p-4", "data-ocid": "tracking.water_card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💧" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: "Water Intake" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-mono", children: [
        glasses,
        "/",
        GOAL,
        " glasses"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 flex-wrap mb-3", children: ["1", "2", "3", "4", "5", "6", "7", "8"].map(
      (glassId, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.button,
        {
          type: "button",
          "data-ocid": `tracking.water_glass.${glassId}`,
          onClick: () => setGlasses(i < glasses ? i : i + 1),
          whileTap: { scale: 0.85 },
          title: `${i + 1} glass${i + 1 > 1 ? "es" : ""}`,
          className: "text-xl leading-none transition-smooth select-none",
          style: {
            filter: i < glasses ? "none" : "grayscale(1) opacity(0.3)"
          },
          children: "🥛"
        },
        glassId
      )
    ) }),
    glasses > GOAL && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-secondary mb-3", children: [
      "+",
      glasses - GOAL,
      " extra glasses — great hydration!"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "tracking.water_minus_button",
          onClick: () => setGlasses(Math.max(0, glasses - 1)),
          className: "flex-1 py-2 rounded-lg text-sm font-semibold transition-smooth",
          style: {
            background: "rgba(255,255,255,0.06)",
            color: "var(--color-muted-foreground)"
          },
          children: "− Glass"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "tracking.water_add_button",
          onClick: () => setGlasses(Math.min(12, glasses + 1)),
          className: "flex-1 py-2 rounded-lg text-sm font-semibold transition-smooth",
          style: { background: "rgba(56,189,248,0.15)", color: "#38bdf8" },
          children: "+ Glass"
        }
      )
    ] })
  ] });
}
function WeeklyMiniCalendar({
  checkIns
}) {
  const weekDays = getWeekDays();
  const todayStr = today();
  const checkInMap = new Map(checkIns.map((c) => [c.date, c]));
  const [popup, setPopup] = reactExports.useState(null);
  const statusColors = {
    full: "rgba(34,197,94,0.85)",
    partial: "rgba(251,191,36,0.85)",
    missed: "rgba(100,116,139,0.4)",
    future: "rgba(100,116,139,0.15)"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-glass p-4", "data-ocid": "tracking.weekly_calendar", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground mb-3", children: "This Week" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1.5", children: weekDays.map(({ date, label, short }) => {
      const isFuture = date > todayStr;
      const status = isFuture ? "future" : getDayStatus(checkInMap.get(date));
      const isToday = date === todayStr;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": `tracking.week_day.${label.toLowerCase()}`,
          onClick: () => {
            if (!isFuture)
              setPopup({ date, checkIn: checkInMap.get(date) });
          },
          disabled: isFuture,
          className: "flex flex-col items-center gap-1 disabled:cursor-default",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground font-medium", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                whileHover: !isFuture ? { scale: 1.15 } : {},
                whileTap: !isFuture ? { scale: 0.9 } : {},
                className: "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold relative",
                style: { background: statusColors[status] },
                children: [
                  short,
                  isToday && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" })
                ]
              }
            )
          ]
        },
        date
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 mt-3 text-[10px] text-muted-foreground", children: [
      { color: "rgba(34,197,94,0.85)", label: "Full" },
      { color: "rgba(251,191,36,0.85)", label: "Partial" },
      { color: "rgba(100,116,139,0.4)", label: "Missed" }
    ].map(({ color, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "w-2 h-2 rounded-full inline-block",
          style: { background: color }
        }
      ),
      label
    ] }, label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: popup && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          className: "fixed inset-0 z-40",
          style: { background: "rgba(0,0,0,0.4)" },
          onClick: () => setPopup(null)
        },
        "overlay"
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.9, y: 10 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.9, y: 10 },
          transition: { type: "spring", stiffness: 300, damping: 22 },
          className: "fixed z-50 left-4 right-4 bottom-24 rounded-2xl p-5",
          style: {
            background: "rgba(20,28,50,0.95)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.5)"
          },
          "data-ocid": "tracking.day_popup",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-semibold text-foreground", children: formatDateShort(popup.date) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "tracking.day_popup_close_button",
                  onClick: () => setPopup(null),
                  className: "w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-smooth",
                  style: { background: "rgba(255,255,255,0.08)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
                }
              )
            ] }),
            popup.checkIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatBadge,
                {
                  icon: popup.checkIn.workoutDone ? "✅" : "❌",
                  label: "Workout",
                  value: popup.checkIn.workoutDone ? "Done" : "Missed",
                  color: popup.checkIn.workoutDone ? "green" : "red"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatBadge,
                {
                  icon: popup.checkIn.dietFollowed ? "✅" : "❌",
                  label: "Diet",
                  value: popup.checkIn.dietFollowed ? "Followed" : "Missed",
                  color: popup.checkIn.dietFollowed ? "green" : "red"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatBadge,
                {
                  icon: "💧",
                  label: "Water",
                  value: `${Number(popup.checkIn.waterGlasses)} glasses`,
                  color: "blue"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatBadge,
                {
                  icon: "👟",
                  label: "Steps",
                  value: Number(popup.checkIn.steps).toLocaleString(),
                  color: "purple"
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-2", children: "No check-in recorded for this day." })
          ]
        },
        "popup"
      )
    ] }) })
  ] });
}
function StatBadge({
  icon,
  label,
  value,
  color
}) {
  const colorMap = {
    green: "rgba(34,197,94,0.12)",
    red: "rgba(239,68,68,0.12)",
    blue: "rgba(56,189,248,0.12)",
    purple: "rgba(168,85,247,0.12)"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl p-3",
      style: { background: colorMap[color] ?? "rgba(255,255,255,0.05)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground text-sm mt-0.5", children: value })
      ]
    }
  );
}
function HistoryRow({
  checkIn,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -16 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: index * 0.06, duration: 0.35 },
      className: "flex items-center gap-3 px-4 py-3 rounded-xl text-sm",
      style: {
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.06)"
      },
      "data-ocid": `tracking.history_item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground text-xs", children: formatDateShort(checkIn.date) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: checkIn.workoutDone ? "Workout done" : "No workout", children: checkIn.workoutDone ? "✅" : "❌" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: checkIn.dietFollowed ? "Diet followed" : "No diet", children: checkIn.dietFollowed ? "✅" : "❌" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-0.5", children: [
          "💧",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: Number(checkIn.waterGlasses) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-0.5", children: [
          "👟",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: Number(checkIn.steps).toLocaleString() })
        ] })
      ]
    }
  );
}
function TrackingPage() {
  const { backend, isFetching } = useBackend();
  const queryClient = useQueryClient();
  const [workoutDone, setWorkoutDone] = reactExports.useState(false);
  const [dietFollowed, setDietFollowed] = reactExports.useState(false);
  const [waterGlasses, setWaterGlasses] = reactExports.useState(0);
  const [steps, setSteps] = reactExports.useState("");
  const [weightInput, setWeightInput] = reactExports.useState("");
  const [saved, setSaved] = reactExports.useState(false);
  const todayStr = today();
  const displayDate = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });
  const { data: streakBigInt = BigInt(0) } = useQuery({
    queryKey: ["streak"],
    queryFn: async () => {
      if (!backend) return BigInt(0);
      return backend.getStreak();
    },
    enabled: !!backend && !isFetching
  });
  const streak = Number(streakBigInt);
  const { data: checkIns = [] } = useQuery({
    queryKey: ["checkIns", 14],
    queryFn: async () => {
      if (!backend) return [];
      return backend.getCheckIns(BigInt(14));
    },
    enabled: !!backend && !isFetching
  });
  reactExports.useEffect(() => {
    const todayCheckIn = checkIns.find((c) => c.date === todayStr);
    if (todayCheckIn) {
      setWorkoutDone(todayCheckIn.workoutDone);
      setDietFollowed(todayCheckIn.dietFollowed);
      setWaterGlasses(Number(todayCheckIn.waterGlasses));
      setSteps(String(Number(todayCheckIn.steps)));
      setSaved(true);
    }
  }, [checkIns, todayStr]);
  const saveCheckInMut = useMutation({
    mutationFn: async () => {
      if (!backend) throw new Error("Backend not ready");
      const result = await backend.saveCheckIn(
        todayStr,
        workoutDone,
        dietFollowed,
        BigInt(waterGlasses),
        BigInt(Number(steps) || 0)
      );
      if ("err" in result) throw new Error(result.err);
      return result;
    }
  });
  const logWeightMut = useMutation({
    mutationFn: async (kg) => {
      if (!backend) throw new Error("Backend not ready");
      const result = await backend.logWeight(todayStr, kg);
      if ("err" in result) throw new Error(result.err);
      return result;
    }
  });
  const handleSave = async () => {
    try {
      await saveCheckInMut.mutateAsync();
      if (weightInput.trim()) {
        const kg = Number.parseFloat(weightInput);
        if (!Number.isNaN(kg) && kg > 0) {
          await logWeightMut.mutateAsync(kg);
        }
      }
      await queryClient.invalidateQueries({ queryKey: ["checkIns"] });
      await queryClient.invalidateQueries({ queryKey: ["streak"] });
      await queryClient.invalidateQueries({ queryKey: ["weightHistory"] });
      setSaved(true);
      ue.success("Today's progress saved! 🎉", {
        description: "Keep up the great work!"
      });
    } catch (err) {
      ue.error("Could not save check-in", {
        description: err instanceof Error ? err.message : "Please try again."
      });
    }
  };
  const isSaving = saveCheckInMut.isPending || logWeightMut.isPending;
  const recentHistory = checkIns.filter((c) => c.date !== todayStr).slice(0, 7);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "px-4 py-6 pb-28 space-y-5 max-w-lg mx-auto",
      "data-ocid": "tracking.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 14 },
            animate: { opacity: 1, y: 0 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "Daily Tracking" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: displayDate })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StreakBanner, { streak }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.12 },
            className: "card-glass p-5 space-y-3",
            "data-ocid": "tracking.checkin_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Today's Check-In" }),
                saved && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.span,
                  {
                    initial: { opacity: 0, scale: 0.8 },
                    animate: { opacity: 1, scale: 1 },
                    className: "text-xs font-medium px-2 py-0.5 rounded-full",
                    style: { background: "rgba(34,197,94,0.2)", color: "#22c55e" },
                    children: "✓ Saved"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ToggleRow,
                {
                  id: "workout-toggle",
                  emoji: "💪",
                  label: "Workout Completed",
                  checked: workoutDone,
                  onChange: () => setWorkoutDone((v2) => !v2),
                  ocid: "tracking.workout_toggle"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ToggleRow,
                {
                  id: "diet-toggle",
                  emoji: "🥗",
                  label: "Diet Followed",
                  checked: dietFollowed,
                  onChange: () => setDietFollowed((v2) => !v2),
                  ocid: "tracking.diet_toggle"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-3 p-4 rounded-xl",
                  style: {
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "👟" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "steps-input",
                          className: "text-sm font-medium text-foreground block mb-1",
                          children: "Steps Today"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "steps-input",
                          type: "number",
                          "data-ocid": "tracking.steps_input",
                          placeholder: "e.g. 8000",
                          min: 0,
                          value: steps,
                          onChange: (e) => setSteps(e.target.value),
                          className: "w-full bg-transparent text-foreground placeholder:text-muted-foreground text-sm focus:outline-none"
                        }
                      )
                    ] }),
                    steps && Number(steps) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-accent", children: Number(steps).toLocaleString() })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-3 p-4 rounded-xl",
                  style: {
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)"
                  },
                  "data-ocid": "tracking.weight_log_card",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { size: 20, className: "text-accent flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "weight-input",
                          className: "text-sm font-medium text-foreground block mb-1",
                          children: "Log Weight (kg)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "weight-input",
                          type: "number",
                          "data-ocid": "tracking.weight_input",
                          placeholder: "e.g. 72.5",
                          min: 0,
                          step: 0.1,
                          value: weightInput,
                          onChange: (e) => setWeightInput(e.target.value),
                          className: "w-full bg-transparent text-foreground placeholder:text-muted-foreground text-sm focus:outline-none"
                        }
                      )
                    ] })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.18 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(WaterTracker, { glasses: waterGlasses, setGlasses: setWaterGlasses })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.button,
          {
            type: "button",
            "data-ocid": "tracking.save_button",
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.22 },
            whileHover: { scale: 1.015 },
            whileTap: { scale: 0.97 },
            onClick: handleSave,
            disabled: isSaving,
            className: "w-full py-4 rounded-2xl font-display font-bold text-base transition-smooth disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden",
            style: {
              background: "linear-gradient(135deg, #22c55e 0%, #38bdf8 100%)",
              color: "#0f172a",
              boxShadow: "0 4px 24px rgba(34,197,94,0.30)"
            },
            children: isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.span,
                {
                  animate: { rotate: 360 },
                  transition: {
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 0.8,
                    ease: "linear"
                  },
                  className: "inline-block w-4 h-4 rounded-full border-2 border-current border-t-transparent"
                }
              ),
              "Saving..."
            ] }) : "Save Today's Progress 🎯"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.28 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(WeeklyMiniCalendar, { checkIns })
          }
        ),
        recentHistory.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.34 },
            className: "card-glass p-4",
            "data-ocid": "tracking.history_list",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-semibold text-sm text-foreground mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "📅" }),
                " Recent History"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-1 text-[10px] text-muted-foreground mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: "Date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: "Workout", children: "💪" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: "Diet", children: "🥗" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: "Water", children: "💧" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: "Steps", children: "👟" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: recentHistory.map((checkIn, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(HistoryRow, { checkIn, index: i }, checkIn.date)) })
            ]
          }
        ),
        recentHistory.length === 0 && checkIns.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.4 },
            className: "card-glass p-6 text-center",
            "data-ocid": "tracking.history_empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-2", children: "📊" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm", children: "No history yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Your check-ins will appear here after you save today's progress." })
            ]
          }
        )
      ]
    }
  );
}
export {
  TrackingPage as default
};
