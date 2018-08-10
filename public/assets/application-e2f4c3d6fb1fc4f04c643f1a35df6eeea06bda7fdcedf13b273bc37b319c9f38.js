!function(){"use strict";function a(b,d){function f(a,b){return function(){return a.apply(b,arguments)}}var e;if(d=d||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=d.touchBoundary||10,this.layer=b,this.tapDelay=d.tapDelay||200,this.tapTimeout=d.tapTimeout||700,!a.notNeeded(b)){for(var g=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],h=this,i=0,j=g.length;j>i;i++)h[g[i]]=f(h[g[i]],h);c&&(b.addEventListener("mouseover",this.onMouse,!0),b.addEventListener("mousedown",this.onMouse,!0),b.addEventListener("mouseup",this.onMouse,!0)),b.addEventListener("click",this.onClick,!0),b.addEventListener("touchstart",this.onTouchStart,!1),b.addEventListener("touchmove",this.onTouchMove,!1),b.addEventListener("touchend",this.onTouchEnd,!1),b.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(b.removeEventListener=function(a,c,d){var e=Node.prototype.removeEventListener;"click"===a?e.call(b,a,c.hijacked||c,d):e.call(b,a,c,d)},b.addEventListener=function(a,c,d){var e=Node.prototype.addEventListener;"click"===a?e.call(b,a,c.hijacked||(c.hijacked=function(a){a.propagationStopped||c(a)}),d):e.call(b,a,c,d)}),"function"==typeof b.onclick&&(e=b.onclick,b.addEventListener("click",function(a){e(a)},!1),b.onclick=null)}}var b=navigator.userAgent.indexOf("Windows Phone")>=0,c=navigator.userAgent.indexOf("Android")>0&&!b,d=/iP(ad|hone|od)/.test(navigator.userAgent)&&!b,e=d&&/OS 4_\d(_\d)?/.test(navigator.userAgent),f=d&&/OS [6-7]_\d/.test(navigator.userAgent),g=navigator.userAgent.indexOf("BB10")>0;a.prototype.needsClick=function(a){switch(a.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(a.disabled)return!0;break;case"input":if(d&&"file"===a.type||a.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(a.className)},a.prototype.needsFocus=function(a){switch(a.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!c;case"input":switch(a.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!a.disabled&&!a.readOnly;default:return/\bneedsfocus\b/.test(a.className)}},a.prototype.sendClick=function(a,b){var c,d;document.activeElement&&document.activeElement!==a&&document.activeElement.blur(),d=b.changedTouches[0],c=document.createEvent("MouseEvents"),c.initMouseEvent(this.determineEventType(a),!0,!0,window,1,d.screenX,d.screenY,d.clientX,d.clientY,!1,!1,!1,!1,0,null),c.forwardedTouchEvent=!0,a.dispatchEvent(c)},a.prototype.determineEventType=function(a){return c&&"select"===a.tagName.toLowerCase()?"mousedown":"click"},a.prototype.focus=function(a){var b;d&&a.setSelectionRange&&0!==a.type.indexOf("date")&&"time"!==a.type&&"month"!==a.type?(b=a.value.length,a.setSelectionRange(b,b)):a.focus()},a.prototype.updateScrollParent=function(a){var b,c;if(b=a.fastClickScrollParent,!b||!b.contains(a)){c=a;do{if(c.scrollHeight>c.offsetHeight){b=c,a.fastClickScrollParent=c;break}c=c.parentElement}while(c)}b&&(b.fastClickLastScrollTop=b.scrollTop)},a.prototype.getTargetElementFromEventTarget=function(a){return a.nodeType===Node.TEXT_NODE?a.parentNode:a},a.prototype.onTouchStart=function(a){var b,c,f;if(a.targetTouches.length>1)return!0;if(b=this.getTargetElementFromEventTarget(a.target),c=a.targetTouches[0],d){if(f=window.getSelection(),f.rangeCount&&!f.isCollapsed)return!0;if(!e){if(c.identifier&&c.identifier===this.lastTouchIdentifier)return a.preventDefault(),!1;this.lastTouchIdentifier=c.identifier,this.updateScrollParent(b)}}return this.trackingClick=!0,this.trackingClickStart=a.timeStamp,this.targetElement=b,this.touchStartX=c.pageX,this.touchStartY=c.pageY,a.timeStamp-this.lastClickTime<this.tapDelay&&a.preventDefault(),!0},a.prototype.touchHasMoved=function(a){var b=a.changedTouches[0],c=this.touchBoundary;return Math.abs(b.pageX-this.touchStartX)>c||Math.abs(b.pageY-this.touchStartY)>c?!0:!1},a.prototype.onTouchMove=function(a){return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(a.target)||this.touchHasMoved(a))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},a.prototype.findControl=function(a){return void 0!==a.control?a.control:a.htmlFor?document.getElementById(a.htmlFor):a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},a.prototype.onTouchEnd=function(a){var b,g,h,i,j,k=this.targetElement;if(!this.trackingClick)return!0;if(a.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(a.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=a.timeStamp,g=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,f&&(j=a.changedTouches[0],k=document.elementFromPoint(j.pageX-window.pageXOffset,j.pageY-window.pageYOffset)||k,k.fastClickScrollParent=this.targetElement.fastClickScrollParent),h=k.tagName.toLowerCase(),"label"===h){if(b=this.findControl(k)){if(this.focus(k),c)return!1;k=b}}else if(this.needsFocus(k))return a.timeStamp-g>100||d&&window.top!==window&&"input"===h?(this.targetElement=null,!1):(this.focus(k),this.sendClick(k,a),d&&"select"===h||(this.targetElement=null,a.preventDefault()),!1);return d&&!e&&(i=k.fastClickScrollParent,i&&i.fastClickLastScrollTop!==i.scrollTop)?!0:(this.needsClick(k)||(a.preventDefault(),this.sendClick(k,a)),!1)},a.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},a.prototype.onMouse=function(a){return this.targetElement?a.forwardedTouchEvent?!0:a.cancelable?!this.needsClick(this.targetElement)||this.cancelNextClick?(a.stopImmediatePropagation?a.stopImmediatePropagation():a.propagationStopped=!0,a.stopPropagation(),a.preventDefault(),!1):!0:!0:!0},a.prototype.onClick=function(a){var b;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===a.target.type&&0===a.detail?!0:(b=this.onMouse(a),b||(this.targetElement=null),b)},a.prototype.destroy=function(){var a=this.layer;c&&(a.removeEventListener("mouseover",this.onMouse,!0),a.removeEventListener("mousedown",this.onMouse,!0),a.removeEventListener("mouseup",this.onMouse,!0)),a.removeEventListener("click",this.onClick,!0),a.removeEventListener("touchstart",this.onTouchStart,!1),a.removeEventListener("touchmove",this.onTouchMove,!1),a.removeEventListener("touchend",this.onTouchEnd,!1),a.removeEventListener("touchcancel",this.onTouchCancel,!1)},a.notNeeded=function(a){var b,d,e,f;if("undefined"==typeof window.ontouchstart)return!0;if(d=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!c)return!0;if(b=document.querySelector("meta[name=viewport]")){if(-1!==b.content.indexOf("user-scalable=no"))return!0;if(d>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(g&&(e=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),e[1]>=10&&e[2]>=3&&(b=document.querySelector("meta[name=viewport]")))){if(-1!==b.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===a.style.msTouchAction||"manipulation"===a.style.touchAction?!0:(f=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],f>=27&&(b=document.querySelector("meta[name=viewport]"),b&&(-1!==b.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))?!0:"none"===a.style.touchAction||"manipulation"===a.style.touchAction?!0:!1)},a.attach=function(b,c){return new a(b,c)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return a}):"undefined"!=typeof module&&module.exports?(module.exports=a.attach,module.exports.FastClick=a):window.FastClick=a}();
/* Modernizr 2.8.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-svg-shiv-mq-cssclasses-teststyles-load
 */

;window.Modernizr=function(a,b,c){function x(a){j.cssText=a}function y(a,b){return x(prefixes.join(a+";")+(b||""))}function z(a,b){return typeof a===b}function A(a,b){return!!~(""+a).indexOf(b)}function B(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:z(f,"function")?f.bind(d||b):f}return!1}var d="2.8.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m={svg:"http://www.w3.org/2000/svg"},n={},o={},p={},q=[],r=q.slice,s,t=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},u=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b)&&c(b).matches||!1;var d;return t("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},v={}.hasOwnProperty,w;!z(v,"undefined")&&!z(v.call,"undefined")?w=function(a,b){return v.call(a,b)}:w=function(a,b){return b in a&&z(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=r.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(r.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(r.call(arguments)))};return e}),n.svg=function(){return!!b.createElementNS&&!!b.createElementNS(m.svg,"svg").createSVGRect};for(var C in n)w(n,C)&&(s=C.toLowerCase(),e[s]=n[C](),q.push((e[s]?"":"no-")+s));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)w(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},x(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e.mq=u,e.testStyles=t,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+q.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*!
 * froala_editor v2.5.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2017 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c)}:a(window.jQuery)}(function(a){var b=function(c,d){this.id=++a.FE.ID,this.opts=a.extend(!0,{},a.extend({},b.DEFAULTS,"object"==typeof d&&d));var e=JSON.stringify(this.opts);a.FE.OPTS_MAPPING[e]=a.FE.OPTS_MAPPING[e]||this.id,this.sid=a.FE.OPTS_MAPPING[e],a.FE.SHARED[this.sid]=a.FE.SHARED[this.sid]||{},this.shared=a.FE.SHARED[this.sid],this.shared.count=(this.shared.count||0)+1,this.$oel=a(c),this.$oel.data("froala.editor",this),this.o_doc=c.ownerDocument,this.o_win="defaultView"in this.o_doc?this.o_doc.defaultView:this.o_doc.parentWindow;var f=a(this.o_win).scrollTop();this.$oel.on("froala.doInit",a.proxy(function(){this.$oel.off("froala.doInit"),this.doc=this.$el.get(0).ownerDocument,this.win="defaultView"in this.doc?this.doc.defaultView:this.doc.parentWindow,this.$doc=a(this.doc),this.$win=a(this.win),this.opts.pluginsEnabled||(this.opts.pluginsEnabled=Object.keys(a.FE.PLUGINS)),this.opts.initOnClick?(this.load(a.FE.MODULES),this.$el.on("touchstart.init",function(){a(this).data("touched",!0)}),this.$el.on("touchmove.init",function(){a(this).removeData("touched")}),this.$el.on("mousedown.init touchend.init dragenter.init focus.init",a.proxy(function(b){if("touchend"==b.type&&!this.$el.data("touched"))return!0;if(1===b.which||!b.which){this.$el.off("mousedown.init touchstart.init touchmove.init touchend.init dragenter.init focus.init"),this.load(a.FE.MODULES),this.load(a.FE.PLUGINS);var c=b.originalEvent&&b.originalEvent.originalTarget;c&&"IMG"==c.tagName&&a(c).trigger("mousedown"),"undefined"==typeof this.ul&&this.destroy(),"touchend"==b.type&&this.image&&b.originalEvent&&b.originalEvent.target&&a(b.originalEvent.target).is("img")&&setTimeout(a.proxy(function(){this.image.edit(a(b.originalEvent.target))},this),100),this.ready=!0,this.events.trigger("initialized")}},this))):(this.load(a.FE.MODULES),this.load(a.FE.PLUGINS),a(this.o_win).scrollTop(f),"undefined"==typeof this.ul&&this.destroy(),this.ready=!0,this.events.trigger("initialized"))},this)),this._init()};b.DEFAULTS={initOnClick:!1,pluginsEnabled:null},b.MODULES={},b.PLUGINS={},b.VERSION="2.5.0",b.INSTANCES=[],b.OPTS_MAPPING={},b.SHARED={},b.ID=0,b.prototype._init=function(){var b=this.$oel.prop("tagName");this.$oel.closest("label").length>=1&&console.warn("Note! It is not recommended to initialize the Froala Editor within a label tag.");var c=a.proxy(function(){"TEXTAREA"!=b&&(this._original_html=this._original_html||this.$oel.html()),this.$box=this.$box||this.$oel,this.opts.fullPage&&(this.opts.iframe=!0),this.opts.iframe?(this.$iframe=a('<iframe src="about:blank" frameBorder="0">'),this.$wp=a("<div></div>"),this.$box.html(this.$wp),this.$wp.append(this.$iframe),this.$iframe.get(0).contentWindow.document.open(),this.$iframe.get(0).contentWindow.document.write("<!DOCTYPE html>"),this.$iframe.get(0).contentWindow.document.write("<html><head></head><body></body></html>"),this.$iframe.get(0).contentWindow.document.close(),this.$el=this.$iframe.contents().find("body"),this.el=this.$el.get(0),this.$head=this.$iframe.contents().find("head"),this.$html=this.$iframe.contents().find("html"),this.iframe_document=this.$iframe.get(0).contentWindow.document,this.$oel.trigger("froala.doInit")):(this.$el=a("<div></div>"),this.el=this.$el.get(0),this.$wp=a("<div></div>").append(this.$el),this.$box.html(this.$wp),this.$oel.trigger("froala.doInit"))},this),d=a.proxy(function(){this.$box=a("<div>"),this.$oel.before(this.$box).hide(),this._original_html=this.$oel.val(),this.$oel.parents("form").on("submit."+this.id,a.proxy(function(){this.events.trigger("form.submit")},this)),this.$oel.parents("form").on("reset."+this.id,a.proxy(function(){this.events.trigger("form.reset")},this)),c()},this),e=a.proxy(function(){this.$el=this.$oel,this.el=this.$el.get(0),this.$el.attr("contenteditable",!0).css("outline","none").css("display","inline-block"),this.opts.multiLine=!1,this.opts.toolbarInline=!1,this.$oel.trigger("froala.doInit")},this),f=a.proxy(function(){this.$el=this.$oel,this.el=this.$el.get(0),this.opts.toolbarInline=!1,this.$oel.trigger("froala.doInit")},this),g=a.proxy(function(){this.$el=this.$oel,this.el=this.$el.get(0),this.opts.toolbarInline=!1,this.$oel.on("click.popup",function(a){a.preventDefault()}),this.$oel.trigger("froala.doInit")},this);this.opts.editInPopup?g():"TEXTAREA"==b?d():"A"==b?e():"IMG"==b?f():"BUTTON"==b||"INPUT"==b?(this.opts.editInPopup=!0,this.opts.toolbarInline=!1,g()):c()},b.prototype.load=function(b){for(var c in b)if(b.hasOwnProperty(c)){if(this[c])continue;if(a.FE.PLUGINS[c]&&this.opts.pluginsEnabled.indexOf(c)<0)continue;if(this[c]=new b[c](this),this[c]._init&&(this[c]._init(),this.opts.initOnClick&&"core"==c))return!1}},b.prototype.destroy=function(){this.shared.count--,this.events.$off();var b=this.html.get();if(this.events.trigger("destroy",[],!0),this.events.trigger("shared.destroy",void 0,!0),0===this.shared.count){for(var c in this.shared)this.shared.hasOwnProperty(c)&&(null==this.shared[c],a.FE.SHARED[this.sid][c]=null);a.FE.SHARED[this.sid]={}}this.$oel.parents("form").off("."+this.id),this.$oel.off("click.popup"),this.$oel.removeData("froala.editor"),this.$oel.off("froalaEditor"),this.core.destroy(b),a.FE.INSTANCES.splice(a.FE.INSTANCES.indexOf(this),1)},a.fn.froalaEditor=function(c){for(var d=[],e=0;e<arguments.length;e++)d.push(arguments[e]);if("string"==typeof c){var f=[];return this.each(function(){var b=a(this),e=b.data("froala.editor");if(!e)return console.warn("Editor should be initialized before calling the "+c+" method.");var g,h;if(c.indexOf(".")>0&&e[c.split(".")[0]]?(e[c.split(".")[0]]&&(g=e[c.split(".")[0]]),h=c.split(".")[1]):(g=e,h=c.split(".")[0]),!g[h])return a.error("Method "+c+" does not exist in Froala Editor.");var i=g[h].apply(e,d.slice(1));void 0===i?f.push(this):0===f.length&&f.push(i)}),1==f.length?f[0]:f}if("object"==typeof c||!c)return this.each(function(){var d=a(this).data("froala.editor");if(!d){var e=this;new b(e,c)}})},a.fn.froalaEditor.Constructor=b,a.FroalaEditor=b,a.FE=b,a.FE.XS=0,a.FE.SM=1,a.FE.MD=2,a.FE.LG=3,a.FE.MODULES.helpers=function(b){function c(){var a,b,c=-1;return"Microsoft Internet Explorer"==navigator.appName?(a=navigator.userAgent,b=new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})"),null!==b.exec(a)&&(c=parseFloat(RegExp.$1))):"Netscape"==navigator.appName&&(a=navigator.userAgent,b=new RegExp("Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})"),null!==b.exec(a)&&(c=parseFloat(RegExp.$1))),c}function d(){var a={},b=c();if(b>0)a.msie=!0;else{var d=navigator.userAgent.toLowerCase(),e=/(edge)[ \/]([\w.]+)/.exec(d)||/(chrome)[ \/]([\w.]+)/.exec(d)||/(webkit)[ \/]([\w.]+)/.exec(d)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(d)||/(msie) ([\w.]+)/.exec(d)||d.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(d)||[],f={browser:e[1]||"",version:e[2]||"0"};e[1]&&(a[f.browser]=!0),a.chrome?a.webkit=!0:a.webkit&&(a.safari=!0)}return a.msie&&(a.version=b),a}function e(){return/(iPad|iPhone|iPod)/g.test(navigator.userAgent)&&!h()}function f(){return/(Android)/g.test(navigator.userAgent)&&!h()}function g(){return/(Blackberry)/g.test(navigator.userAgent)}function h(){return/(Windows Phone)/gi.test(navigator.userAgent)}function i(){return f()||e()||g()}function j(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(a){window.setTimeout(a,1e3/60)}}function k(a){return parseInt(a,10)||0}function l(){var b=a('<div class="fr-visibility-helper"></div>').appendTo("body"),c=k(b.css("margin-left"));return b.remove(),c}function m(){return"ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch}function n(a){if(!/^(https?:|ftps?:|)\/\//i.test(a))return!1;a=String(a).replace(/</g,"%3C").replace(/>/g,"%3E").replace(/"/g,"%22").replace(/ /g,"%20");var b=/(http|ftp|https):\/\/[a-z\u00a1-\uffff0-9{}]+(\.[a-z\u00a1-\uffff0-9{}]*)*([a-z\u00a1-\uffff0-9.,@?^=%&amp;:\/~+#-_{}]*[a-z\u00a1-\uffff0-9@?^=%&amp;\/~+#-_{}])?/gi;return b.test(a)}function o(a){if(/^(https?:|ftps?:|)\/\//i.test(a)){if(!n(a)&&!n("http:"+a))return""}else a=encodeURIComponent(a).replace(/%23/g,"#").replace(/%2F/g,"/").replace(/%25/g,"%").replace(/mailto%3A/gi,"mailto:").replace(/file%3A/gi,"file:").replace(/sms%3A/gi,"sms:").replace(/tel%3A/gi,"tel:").replace(/notes%3A/gi,"notes:").replace(/data%3Aimage/gi,"data:image").replace(/blob%3A/gi,"blob:").replace(/webkit-fake-url%3A/gi,"webkit-fake-url:").replace(/%3F/g,"?").replace(/%3D/g,"=").replace(/%26/g,"&").replace(/&amp;/g,"&").replace(/%2C/g,",").replace(/%3B/g,";").replace(/%2B/g,"+").replace(/%40/g,"@").replace(/%5B/g,"[").replace(/%5D/g,"]").replace(/%7B/g,"{").replace(/%7D/g,"}");return a}function p(a){return a&&!a.propertyIsEnumerable("length")&&"object"==typeof a&&"number"==typeof a.length}function q(a){function b(a){return("0"+parseInt(a,10).toString(16)).slice(-2)}try{return a&&"transparent"!==a?/^#[0-9A-F]{6}$/i.test(a)?a:(a=a.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/),("#"+b(a[1])+b(a[2])+b(a[3])).toUpperCase()):""}catch(c){return null}}function r(a){var b=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;a=a.replace(b,function(a,b,c,d){return b+b+c+c+d+d});var c=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);return c?"rgb("+parseInt(c[1],16)+", "+parseInt(c[2],16)+", "+parseInt(c[3],16)+")":""}function s(b){var c=(b.css("text-align")||"").replace(/-(.*)-/g,"");if(["left","right","justify","center"].indexOf(c)<0){if(!y){var d=a('<div dir="auto" style="text-align: initial; position: fixed; left: -3000px;"><span id="s1">.</span><span id="s2">.</span></div>');a("body").append(d);var e=d.find("#s1").get(0).getBoundingClientRect().left,f=d.find("#s2").get(0).getBoundingClientRect().left;d.remove(),y=e<f?"left":"right"}c=y}return c}function t(){return null==z&&(z=navigator.platform.toUpperCase().indexOf("MAC")>=0),z}function u(){function a(a,b){var d=a[b];a[b]=function(a){var b,f=!1,g=!1;if(a&&a.match(e)){a=a.replace(e,""),this.parentNode||(c.appendChild(this),g=!0);var h=this.parentNode;return this.id||(this.id="rootedQuerySelector_id_"+(new Date).getTime(),f=!0),b=d.call(h,"#"+this.id+" "+a),f&&(this.id=""),g&&c.removeChild(this),b}return d.call(this,a)}}var c=b.o_doc.createElement("div");try{c.querySelectorAll(":scope *")}catch(d){var e=/^\s*:scope/gi;a(Element.prototype,"querySelector"),a(Element.prototype,"querySelectorAll")}}function v(){return b.o_win.pageYOffset?b.o_win.pageYOffset:b.o_doc.documentElement&&b.o_doc.documentElement.scrollTop?b.o_doc.documentElement.scrollTop:b.o_doc.body.scrollTop?b.o_doc.body.scrollTop:0}function w(){return b.o_win.pageXOffset?b.o_win.pageXOffset:b.o_doc.documentElement&&b.o_doc.documentElement.scrollLeft?b.o_doc.documentElement.scrollLeft:b.o_doc.body.scrollLeft?b.o_doc.body.scrollLeft:0}function x(){b.browser=d(),u()}var y,z=null;return{_init:x,isIOS:e,isMac:t,isAndroid:f,isBlackberry:g,isWindowsPhone:h,isMobile:i,requestAnimationFrame:j,getPX:k,screenSize:l,isTouch:m,sanitizeURL:o,isArray:p,RGBToHex:q,HEXtoRGB:r,isURL:n,getAlignment:s,scrollTop:v,scrollLeft:w}},a.FE.MODULES.events=function(b){function c(a,b,c){s(a,b,c)}function d(){c(b.$el,"cut copy paste beforepaste",function(a){v(a.type,[a])})}function e(){c(b.$el,"click mouseup mousedown touchstart touchend dragenter dragover dragleave dragend drop dragstart",function(a){v(a.type,[a])}),r("mousedown",function(){for(var c=0;c<a.FE.INSTANCES.length;c++)a.FE.INSTANCES[c]!=b&&a.FE.INSTANCES[c].popups&&a.FE.INSTANCES[c].popups.areVisible()&&a.FE.INSTANCES[c].$el.find(".fr-marker").remove()})}function f(){c(b.$el,"keydown keypress keyup input",function(a){v(a.type,[a])})}function g(){c(b.$win,b._mousedown,function(a){v("window.mousedown",[a]),n()}),c(b.$win,b._mouseup,function(a){v("window.mouseup",[a])}),c(b.$win,"cut copy keydown keyup touchmove touchend",function(a){v("window."+a.type,[a])})}function h(){c(b.$doc,"dragend drop",function(a){v("document."+a.type,[a])})}function i(c){if("undefined"==typeof c&&(c=!0),!b.$wp)return!1;if(b.helpers.isIOS()&&b.$win.get(0).focus(),!b.core.hasFocus()&&c){var d=b.$win.scrollTop();return b.browser.msie&&b.$box&&b.$box.css("position","fixed"),b.$el.focus(),b.browser.msie&&b.$box&&b.$box.css("position",""),d!=b.$win.scrollTop()&&b.$win.scrollTop(d),!1}if(!b.core.hasFocus()||b.$el.find(".fr-marker").length>0)return!1;var e=b.selection.info(b.el);if(e.atStart&&b.selection.isCollapsed()&&null!=b.html.defaultTag()){var f=b.markers.insert();if(f&&!b.node.blockParent(f)){a(f).remove();var g=b.$el.find(b.html.blockTagsQuery()).get(0);g&&(a(g).prepend(a.FE.MARKERS),b.selection.restore())}else f&&a(f).remove()}}function j(){c(b.$el,"focus",function(a){p()&&(i(!1),C===!1&&v(a.type,[a]))}),c(b.$el,"blur",function(a){p()&&C===!0&&(v(a.type,[a]),n())}),r("focus",function(){C=!0}),r("blur",function(){C=!1})}function k(){b.helpers.isMobile()?(b._mousedown="touchstart",b._mouseup="touchend",b._move="touchmove",b._mousemove="touchmove"):(b._mousedown="mousedown",b._mouseup="mouseup",b._move="",b._mousemove="mousemove")}function l(c){var d=a(c.currentTarget);return b.edit.isDisabled()||b.node.hasClass(d.get(0),"fr-disabled")?(c.preventDefault(),!1):"mousedown"===c.type&&1!==c.which||(b.helpers.isMobile()||c.preventDefault(),(b.helpers.isAndroid()||b.helpers.isWindowsPhone())&&0===d.parents(".fr-dropdown-menu").length&&(c.preventDefault(),c.stopPropagation()),d.addClass("fr-selected"),void b.events.trigger("commands.mousedown",[d]))}function m(c,d){var e=a(c.currentTarget);if(b.edit.isDisabled()||b.node.hasClass(e.get(0),"fr-disabled"))return c.preventDefault(),!1;if("mouseup"===c.type&&1!==c.which)return!0;if(!b.node.hasClass(e.get(0),"fr-selected"))return!0;if("touchmove"!=c.type){if(c.stopPropagation(),c.stopImmediatePropagation(),c.preventDefault(),!b.node.hasClass(e.get(0),"fr-selected"))return b.button.getButtons(".fr-selected",!0).removeClass("fr-selected"),!1;if(b.button.getButtons(".fr-selected",!0).removeClass("fr-selected"),e.data("dragging")||e.attr("disabled"))return e.removeData("dragging"),!1;var f=e.data("timeout");f&&(clearTimeout(f),e.removeData("timeout")),d.apply(b,[c])}else e.data("timeout")||e.data("timeout",setTimeout(function(){e.data("dragging",!0)},100))}function n(){A=!0}function o(){A=!1}function p(){return A}function q(a,c,d){s(a,b._mousedown,c,function(a){b.edit.isDisabled()||l(a)},!0),s(a,b._mouseup+" "+b._move,c,function(a){b.edit.isDisabled()||m(a,d)},!0),s(a,"mousedown click mouseup",c,function(a){b.edit.isDisabled()||a.stopPropagation()},!0),r("window.mouseup",function(){b.edit.isDisabled()||(a.find(c).removeClass("fr-selected"),n())})}function r(a,c,d){var e=a.split(" ");if(e.length>1){for(var f=0;f<e.length;f++)r(e[f],c,d);return!0}"undefined"==typeof d&&(d=!1);var g;g=0!==a.indexOf("shared.")?B[a]=B[a]||[]:b.shared._events[a]=b.shared._events[a]||[],d?g.unshift(c):g.push(c)}function s(a,c,d,e,f){"function"==typeof d&&(f=e,e=d,d=!1);var g=f?b.shared.$_events:D,h=f?b.sid:b.id;d?a.on(c.split(" ").join(".ed"+h+" ")+".ed"+h,d,e):a.on(c.split(" ").join(".ed"+h+" ")+".ed"+h,e),g.indexOf(a.get(0))<0&&g.push(a.get(0))}function t(b,c){for(var d=0;d<b.length;d++)a(b[d]).off(".ed"+c)}function u(){t(D,b.id),D=[],0===b.shared.count&&(t(b.shared.$_events,b.sid),b.shared.$_events=null)}function v(c,d,e){if(!b.edit.isDisabled()||e){var f;if(0!==c.indexOf("shared."))f=B[c];else{if(b.shared.count>0)return!1;f=b.shared._events[c]}var g;if(f)for(var h=0;h<f.length;h++)if(g=f[h].apply(b,d),g===!1)return!1;return g=b.$oel.triggerHandler("froalaEditor."+c,a.merge([b],d||[])),g!==!1&&g}}function w(c,d,e){if(!b.edit.isDisabled()||e){var f;if(0!==c.indexOf("shared."))f=B[c];else{if(b.shared.count>0)return!1;f=b.shared._events[c]}var g;if(f)for(var h=0;h<f.length;h++)g=f[h].apply(b,[d]),"undefined"!=typeof g&&(d=g);return g=b.$oel.triggerHandler("froalaEditor."+c,a.merge([b],[d])),"undefined"!=typeof g&&(d=g),d}}function x(){for(var a in B)B.hasOwnProperty(a)&&delete B[a]}function y(){for(var a in b.shared._events)b.shared._events.hasOwnProperty(a)&&delete b.shared._events[a]}function z(){b.shared.$_events=b.shared.$_events||[],b.shared._events={},k(),e(),g(),h(),f(),j(),n(),d(),r("destroy",x),r("shared.destroy",y)}var A,B={},C=!1,D=[];return{_init:z,on:r,trigger:v,bindClick:q,disableBlur:o,enableBlur:n,blurActive:p,focus:i,chainTrigger:w,$on:s,$off:u}},a.FE.MODULES.node=function(b){function c(a){return a&&"IFRAME"!=a.tagName?Array.prototype.slice.call(a.childNodes||[]):[]}function d(b){return!!b&&(b.nodeType==Node.ELEMENT_NODE&&a.FE.BLOCK_TAGS.indexOf(b.tagName.toLowerCase())>=0)}function e(e,f){if(!e)return!0;if(e.querySelector("table"))return!1;var g=c(e);1==g.length&&d(g[0])&&(g=c(g[0]));for(var h=!1,i=0;i<g.length;i++){var j=g[i];if(!(f&&b.node.hasClass(j,"fr-marker")||j.nodeType==Node.TEXT_NODE&&0===j.textContent.length)){if("BR"!=j.tagName&&(j.textContent||"").replace(/\u200B/gi,"").replace(/\n/g,"").length>0)return!1;if(h)return!1;"BR"==j.tagName&&(h=!0)}}return!(e.querySelectorAll(a.FE.VOID_ELEMENTS.join(",")).length-e.querySelectorAll("br").length)&&(!e.querySelector(b.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),")+":not(.fr-marker)")&&(!(e.querySelectorAll(a.FE.BLOCK_TAGS.join(",")).length>1)&&!e.querySelector(b.opts.htmlDoNotWrapTags.join(":not(.fr-marker),")+":not(.fr-marker)")))}function f(a){for(;a&&a.parentNode!==b.el&&(!a.parentNode||!b.node.hasClass(a.parentNode,"fr-inner"));)if(a=a.parentNode,d(a))return a;return null}function g(c,e,f){if("undefined"==typeof e&&(e=[]),"undefined"==typeof f&&(f=!0),e.push(b.el),e.indexOf(c.parentNode)>=0||c.parentNode&&b.node.hasClass(c.parentNode,"fr-inner")||c.parentNode&&a.FE.SIMPLE_ENTER_TAGS.indexOf(c.parentNode.tagName)>=0&&f)return null;for(;e.indexOf(c.parentNode)<0&&c.parentNode&&!b.node.hasClass(c.parentNode,"fr-inner")&&(a.FE.SIMPLE_ENTER_TAGS.indexOf(c.parentNode.tagName)<0||!f)&&(!d(c)||!d(c.parentNode)||!f);)c=c.parentNode;return c}function h(a){var b={},c=a.attributes;if(c)for(var d=0;d<c.length;d++){var e=c[d];b[e.nodeName]=e.value}return b}function i(a){for(var b="",c=h(a),d=Object.keys(c).sort(),e=0;e<d.length;e++){var f=d[e],g=c[f];g.indexOf("'")<0&&g.indexOf('"')>=0?b+=" "+f+"='"+g+"'":g.indexOf('"')>=0&&g.indexOf("'")>=0?(g=g.replace(/"/g,"&quot;"),b+=" "+f+'="'+g+'"'):b+=" "+f+'="'+g+'"'}return b}function j(a){for(var b=a.attributes,c=b.length-1;c>=0;c--){var d=b[c];a.removeAttribute(d.nodeName)}}function k(a){return"<"+a.tagName.toLowerCase()+i(a)+">"}function l(a){return"</"+a.tagName.toLowerCase()+">"}function m(a,c){"undefined"==typeof c&&(c=!0);for(var d=a.previousSibling;d&&c&&b.node.hasClass(d,"fr-marker");)d=d.previousSibling;return!d||d.nodeType==Node.TEXT_NODE&&""===d.textContent&&m(d)}function n(a,c){"undefined"==typeof c&&(c=!0);for(var d=a.nextSibling;d&&c&&b.node.hasClass(d,"fr-marker");)d=d.nextSibling;return!d||d.nodeType==Node.TEXT_NODE&&""===d.textContent&&n(d)}function o(b){return b&&b.nodeType==Node.ELEMENT_NODE&&a.FE.VOID_ELEMENTS.indexOf((b.tagName||"").toLowerCase())>=0}function p(a){return!!a&&["UL","OL"].indexOf(a.tagName)>=0}function q(a){return a===b.el}function r(a){return a&&a.nodeType==Node.ELEMENT_NODE&&a.getAttribute("class")&&(a.getAttribute("class")||"").indexOf("fr-deletable")>=0}function s(a){return a===b.doc.activeElement&&(!b.doc.hasFocus||b.doc.hasFocus())&&!!(q(a)||a.type||a.href||~a.tabIndex)}function t(a){return(!a.getAttribute||"false"!=a.getAttribute("contenteditable"))&&["STYLE","SCRIPT"].indexOf(a.tagName)<0}function u(b,c){return b instanceof a&&(b=b.get(0)),b&&b.classList&&b.classList.contains(c)}function v(a){return b.browser.msie?a:{acceptNode:a}}return{isBlock:d,isEmpty:e,blockParent:f,deepestParent:g,rawAttributes:h,attributes:i,clearAttributes:j,openTagString:k,closeTagString:l,isFirstSibling:m,isLastSibling:n,isList:p,isElement:q,contents:c,isVoid:o,hasFocus:s,isEditable:t,isDeletable:r,hasClass:u,filter:v}},a.FE.INVISIBLE_SPACE="&#8203;",a.FE.START_MARKER='<span class="fr-marker" data-id="0" data-type="true" style="display: none; line-height: 0;">'+a.FE.INVISIBLE_SPACE+"</span>",a.FE.END_MARKER='<span class="fr-marker" data-id="0" data-type="false" style="display: none; line-height: 0;">'+a.FE.INVISIBLE_SPACE+"</span>",a.FE.MARKERS=a.FE.START_MARKER+a.FE.END_MARKER,a.FE.MODULES.markers=function(b){function c(c,d){return a('<span class="fr-marker" data-id="'+d+'" data-type="'+c+'" style="display: '+(b.browser.safari?"none":"inline-block")+'; line-height: 0;">'+a.FE.INVISIBLE_SPACE+"</span>",b.doc)[0]}function d(d,e,f){var g,h,i;try{var j=d.cloneRange();if(j.collapse(e),j.insertNode(c(e,f)),e===!0&&d.collapsed)for(g=b.$el.find('span.fr-marker[data-type="true"][data-id="'+f+'"]'),i=g.get(0).nextSibling;i&&i.nodeType===Node.TEXT_NODE&&0===i.textContent.length;)a(i).remove(),i=g.nextSibling;if(e===!0&&!d.collapsed&&(g=b.$el.find('span.fr-marker[data-type="true"][data-id="'+f+'"]').get(0),i=g.nextSibling,i&&i.nodeType===Node.ELEMENT_NODE&&b.node.isBlock(i))){h=[i];do i=h[0],h=b.node.contents(i);while(h[0]&&b.node.isBlock(h[0]));a(i).prepend(a(g))}if(e===!1&&!d.collapsed){if(g=b.$el.find('span.fr-marker[data-type="false"][data-id="'+f+'"]').get(0),i=g.previousSibling,i&&i.nodeType===Node.ELEMENT_NODE&&b.node.isBlock(i)){h=[i];do i=h[h.length-1],h=b.node.contents(i);while(h[h.length-1]&&b.node.isBlock(h[h.length-1]));a(i).append(a(g))}g.parentNode&&["TD","TH"].indexOf(g.parentNode.tagName)>=0&&g.parentNode.previousSibling&&!g.previousSibling&&a(g.parentNode.previousSibling).append(g)}var k=b.$el.find('span.fr-marker[data-type="'+e+'"][data-id="'+f+'"]').get(0);return k&&(k.style.display="none"),k}catch(l){return null}}function e(){if(!b.$wp)return null;try{var c=b.selection.ranges(0),d=c.commonAncestorContainer;if(d!=b.el&&0===b.$el.find(d).length)return null;var e=c.cloneRange(),f=c.cloneRange();e.collapse(!0);var g=a('<span class="fr-marker" style="display: none; line-height: 0;">'+a.FE.INVISIBLE_SPACE+"</span>",b.doc)[0];if(e.insertNode(g),g=b.$el.find("span.fr-marker").get(0)){for(var h=g.nextSibling;h&&h.nodeType===Node.TEXT_NODE&&0===h.textContent.length;)a(h).remove(),h=b.$el.find("span.fr-marker").get(0).nextSibling;return b.selection.clear(),b.selection.get().addRange(f),g}return null}catch(i){console.warn("MARKER",i)}}function f(){b.selection.isCollapsed()||b.selection.remove();var c=b.$el.find(".fr-marker").get(0);if(null==c&&(c=e()),null==c)return null;var d=b.node.deepestParent(c);if(d||(d=b.node.blockParent(c),d&&"LI"!=d.tagName&&(d=null)),d)if(b.node.isBlock(d)&&b.node.isEmpty(d))"LI"==d.tagName&&d.parentNode.firstElementChild==d?a(d).append('<span class="fr-marker"></span>'):a(d).replaceWith('<span class="fr-marker"></span>');else if(b.cursor.isAtStart(c,d))a(d).before('<span class="fr-marker"></span>'),a(c).remove();else if(b.cursor.isAtEnd(c,d))a(d).after('<span class="fr-marker"></span>'),a(c).remove();else{var f=c,g="",h="";do f=f.parentNode,g+=b.node.closeTagString(f),h=b.node.openTagString(f)+h;while(f!=d);a(c).replaceWith('<span id="fr-break"></span>');var i=b.node.openTagString(d)+a(d).html()+b.node.closeTagString(d);i=i.replace(/<span id="fr-break"><\/span>/g,g+'<span class="fr-marker"></span>'+h),a(d).replaceWith(i)}return b.$el.find(".fr-marker").get(0)}function g(a){var c=a.clientX,d=a.clientY;h();var f,g=null;if("undefined"!=typeof b.doc.caretPositionFromPoint?(f=b.doc.caretPositionFromPoint(c,d),g=b.doc.createRange(),g.setStart(f.offsetNode,f.offset),g.setEnd(f.offsetNode,f.offset)):"undefined"!=typeof b.doc.caretRangeFromPoint&&(f=b.doc.caretRangeFromPoint(c,d),g=b.doc.createRange(),g.setStart(f.startContainer,f.startOffset),g.setEnd(f.startContainer,f.startOffset)),null!==g&&"undefined"!=typeof b.win.getSelection){var i=b.win.getSelection();i.removeAllRanges(),i.addRange(g)}else if("undefined"!=typeof b.doc.body.createTextRange)try{g=b.doc.body.createTextRange(),g.moveToPoint(c,d);var j=g.duplicate();j.moveToPoint(c,d),g.setEndPoint("EndToEnd",j),g.select()}catch(k){return!1}e()}function h(){b.$el.find(".fr-marker").remove()}return{place:d,insert:e,split:f,insertAtPoint:g,remove:h}},a.FE.MODULES.selection=function(b){function c(){var a="";return b.win.getSelection?a=b.win.getSelection():b.doc.getSelection?a=b.doc.getSelection():b.doc.selection&&(a=b.doc.selection.createRange().text),a.toString()}function d(){var a="";return a=b.win.getSelection?b.win.getSelection():b.doc.getSelection?b.doc.getSelection():b.doc.selection.createRange()}function e(a){var c=d(),e=[];if(c&&c.getRangeAt&&c.rangeCount){e=[];for(var f=0;f<c.rangeCount;f++)e.push(c.getRangeAt(f))}else e=b.doc.createRange?[b.doc.createRange()]:[];return"undefined"!=typeof a?e[a]:e}function f(){var a=d();try{a.removeAllRanges?a.removeAllRanges():a.empty?a.empty():a.clear&&a.clear()}catch(b){}}function g(){var f=d();try{if(f.rangeCount){var g,h=e(0),i=h.startContainer;if(i.nodeType==Node.TEXT_NODE&&h.startOffset==(i.textContent||"").length&&i.nextSibling&&(i=i.nextSibling),i.nodeType==Node.ELEMENT_NODE){var j=!1;if(i.childNodes.length>0&&i.childNodes[h.startOffset]){for(g=i.childNodes[h.startOffset];g&&g.nodeType==Node.TEXT_NODE&&0===g.textContent.length;)g=g.nextSibling;if(g&&g.textContent.replace(/\u200B/g,"")===c().replace(/\u200B/g,"")&&(i=g,j=!0),!j&&i.childNodes.length>1&&h.startOffset>0&&i.childNodes[h.startOffset-1]){for(g=i.childNodes[h.startOffset-1];g&&g.nodeType==Node.TEXT_NODE&&0===g.textContent.length;)g=g.nextSibling;g&&g.textContent.replace(/\u200B/g,"")===c().replace(/\u200B/g,"")&&(i=g,j=!0)}}else!h.collapsed&&i.nextSibling&&i.nextSibling.nodeType==Node.ELEMENT_NODE&&(g=i.nextSibling,g&&g.textContent.replace(/\u200B/g,"")===c().replace(/\u200B/g,"")&&(i=g,j=!0));!j&&i.childNodes.length>0&&a(i.childNodes[0]).text().replace(/\u200B/g,"")===c().replace(/\u200B/g,"")&&["BR","IMG","HR"].indexOf(i.childNodes[0].tagName)<0&&(i=i.childNodes[0])}for(;i.nodeType!=Node.ELEMENT_NODE&&i.parentNode;)i=i.parentNode;for(var k=i;k&&"HTML"!=k.tagName;){if(k==b.el)return i;k=a(k).parent()[0]}}}catch(l){}return b.el}function h(){var f=d();try{if(f.rangeCount){var g,h=e(0),i=h.endContainer;if(i.nodeType==Node.ELEMENT_NODE){var j=!1;i.childNodes.length>0&&i.childNodes[h.endOffset]&&a(i.childNodes[h.endOffset]).text()===c()?(i=i.childNodes[h.endOffset],j=!0):!h.collapsed&&i.previousSibling&&i.previousSibling.nodeType==Node.ELEMENT_NODE?(g=i.previousSibling,g&&g.textContent.replace(/\u200B/g,"")===c().replace(/\u200B/g,"")&&(i=g,j=!0)):!h.collapsed&&i.childNodes.length>0&&i.childNodes[h.endOffset]&&(g=i.childNodes[h.endOffset].previousSibling,g.nodeType==Node.ELEMENT_NODE&&g&&g.textContent.replace(/\u200B/g,"")===c().replace(/\u200B/g,"")&&(i=g,j=!0)),!j&&i.childNodes.length>0&&a(i.childNodes[i.childNodes.length-1]).text()===c()&&["BR","IMG","HR"].indexOf(i.childNodes[i.childNodes.length-1].tagName)<0&&(i=i.childNodes[i.childNodes.length-1])}for(i.nodeType==Node.TEXT_NODE&&0===h.endOffset&&i.previousSibling&&i.previousSibling.nodeType==Node.ELEMENT_NODE&&(i=i.previousSibling);i.nodeType!=Node.ELEMENT_NODE&&i.parentNode;)i=i.parentNode;for(var k=i;k&&"HTML"!=k.tagName;){if(k==b.el)return i;k=a(k).parent()[0]}}}catch(l){}return b.el}function i(a,b){var c=a;return c.nodeType==Node.ELEMENT_NODE&&c.childNodes.length>0&&c.childNodes[b]&&(c=c.childNodes[b]),c.nodeType==Node.TEXT_NODE&&(c=c.parentNode),c}function j(){var c,f=[],g=d();if(u()&&g.rangeCount){var h=e();for(c=0;c<h.length;c++){var j,k=h[c],l=i(k.startContainer,k.startOffset),m=i(k.endContainer,k.endOffset);b.node.isBlock(l)&&f.indexOf(l)<0&&f.push(l),j=b.node.blockParent(l),j&&f.indexOf(j)<0&&f.push(j);for(var n=[],o=l;o!==m&&o!==b.el;)n.indexOf(o)<0&&o.children&&o.children.length?(n.push(o),o=o.children[0]):o.nextSibling?o=o.nextSibling:o.parentNode&&(o=o.parentNode,n.push(o)),b.node.isBlock(o)&&n.indexOf(o)<0&&f.indexOf(o)<0&&(o!==m||k.endOffset>0)&&f.push(o);b.node.isBlock(m)&&f.indexOf(m)<0&&k.endOffset>0&&f.push(m),j=b.node.blockParent(m),j&&f.indexOf(j)<0&&f.push(j)}}for(c=f.length-1;c>0;c--)a(f[c]).find(f).length&&("LI"!=f[c].tagName||1==f[c].children.length&&f.indexOf(f[c].children[0])>=0)&&f.splice(c,1);return f}function k(){if(b.$wp){b.markers.remove();var a,c,d=e(),f=[];for(c=0;c<d.length;c++)if(d[c].startContainer!==b.doc){a=d[c];var g=a.collapsed,h=b.markers.place(a,!0,c),i=b.markers.place(a,!1,c);b.el.normalize(),b.browser.safari&&!g&&(a=b.doc.createRange(),a.setStartAfter(h),a.setEndBefore(i),f.push(a))}if(b.browser.safari&&f.length)for(b.selection.clear(),c=0;c<f.length;c++)b.selection.get().addRange(f[c])}}function l(){var c,e=b.el.querySelectorAll('.fr-marker[data-type="true"]');if(!b.$wp)return b.markers.remove(),!1;if(0===e.length)return!1;if(b.browser.msie||b.browser.edge)for(c=0;c<e.length;c++)e[c].style.display="inline-block";b.core.hasFocus()||b.browser.msie||b.browser.webkit||b.$el.focus(),f();var g=d();for(c=0;c<e.length;c++){var h=a(e[c]).data("id"),i=e[c],j=b.doc.createRange(),k=b.$el.find('.fr-marker[data-type="false"][data-id="'+h+'"]');(b.browser.msie||b.browser.edge)&&k.css("display","inline-block");var l=null;if(k.length>0){k=k[0];try{for(var n,o=!1,p=i.nextSibling;p&&p.nodeType==Node.TEXT_NODE&&0===p.textContent.length;)n=p,p=p.nextSibling,a(n).remove();for(var q=k.nextSibling;q&&q.nodeType==Node.TEXT_NODE&&0===q.textContent.length;)n=q,q=q.nextSibling,a(n).remove();if(i.nextSibling==k||k.nextSibling==i){for(var r=i.nextSibling==k?i:k,s=r==i?k:i,t=r.previousSibling;t&&t.nodeType==Node.TEXT_NODE&&0===t.length;)n=t,t=t.previousSibling,a(n).remove();if(t&&t.nodeType==Node.TEXT_NODE)for(;t&&t.previousSibling&&t.previousSibling.nodeType==Node.TEXT_NODE;)t.previousSibling.textContent=t.previousSibling.textContent+t.textContent,t=t.previousSibling,a(t.nextSibling).remove();for(var u=s.nextSibling;u&&u.nodeType==Node.TEXT_NODE&&0===u.length;)n=u,u=u.nextSibling,a(n).remove();if(u&&u.nodeType==Node.TEXT_NODE)for(;u&&u.nextSibling&&u.nextSibling.nodeType==Node.TEXT_NODE;)u.nextSibling.textContent=u.textContent+u.nextSibling.textContent,u=u.nextSibling,a(u.previousSibling).remove();if(t&&(b.node.isVoid(t)||b.node.isBlock(t))&&(t=null),u&&(b.node.isVoid(u)||b.node.isBlock(u))&&(u=null),t&&u&&t.nodeType==Node.TEXT_NODE&&u.nodeType==Node.TEXT_NODE){a(i).remove(),a(k).remove();var v=t.textContent.length;t.textContent=t.textContent+u.textContent,a(u).remove(),b.spaces.normalize(t),j.setStart(t,v),j.setEnd(t,v),o=!0}else!t&&u&&u.nodeType==Node.TEXT_NODE?(a(i).remove(),a(k).remove(),b.spaces.normalize(u),l=a(b.doc.createTextNode("\u200b")),a(u).before(l),j.setStart(u,0),j.setEnd(u,0),o=!0):!u&&t&&t.nodeType==Node.TEXT_NODE&&(a(i).remove(),a(k).remove(),b.spaces.normalize(t),l=a(b.doc.createTextNode("\u200b")),a(t).after(l),j.setStart(t,t.textContent.length),j.setEnd(t,t.textContent.length),o=!0)}if(!o){var w,x;(b.browser.chrome||b.browser.edge)&&i.nextSibling==k?(w=m(k,j,!0)||j.setStartAfter(k),x=m(i,j,!1)||j.setEndBefore(i)):(i.previousSibling==k&&(i=k,k=i.nextSibling),k.nextSibling&&"BR"===k.nextSibling.tagName||!k.nextSibling&&b.node.isBlock(i.previousSibling)||i.previousSibling&&"BR"==i.previousSibling.tagName||(i.style.display="inline",k.style.display="inline",l=a(b.doc.createTextNode("\u200b"))),w=m(i,j,!0)||a(i).before(l)&&j.setStartBefore(i),x=m(k,j,!1)||a(k).after(l)&&j.setEndAfter(k)),"function"==typeof w&&w(),"function"==typeof x&&x()}}catch(y){console.warn("RESTORE RANGE",y)}}l&&l.remove();try{g.addRange(j)}catch(y){console.warn("ADD RANGE",y)}}b.markers.remove()}function m(c,d,e){var f,g=c.previousSibling,h=c.nextSibling;return g&&h&&g.nodeType==Node.TEXT_NODE&&h.nodeType==Node.TEXT_NODE?(f=g.textContent.length,e?(h.textContent=g.textContent+h.textContent,a(g).remove(),a(c).remove(),b.spaces.normalize(h),function(){d.setStart(h,f)}):(g.textContent=g.textContent+h.textContent,a(h).remove(),a(c).remove(),b.spaces.normalize(g),function(){d.setEnd(g,f);
})):g&&!h&&g.nodeType==Node.TEXT_NODE?(f=g.textContent.length,e?(b.spaces.normalize(g),function(){d.setStart(g,f)}):(b.spaces.normalize(g),function(){d.setEnd(g,f)})):!(!h||g||h.nodeType!=Node.TEXT_NODE)&&(e?(b.spaces.normalize(h),function(){d.setStart(h,0)}):(b.spaces.normalize(h),function(){d.setEnd(h,0)}))}function n(){return!0}function o(){for(var a=e(),b=0;b<a.length;b++)if(!a[b].collapsed)return!1;return!0}function p(a){var c,d,e=!1,f=!1;if(b.win.getSelection){var g=b.win.getSelection();g.rangeCount&&(c=g.getRangeAt(0),d=c.cloneRange(),d.selectNodeContents(a),d.setEnd(c.startContainer,c.startOffset),e=""===d.toString(),d.selectNodeContents(a),d.setStart(c.endContainer,c.endOffset),f=""===d.toString())}else b.doc.selection&&"Control"!=b.doc.selection.type&&(c=b.doc.selection.createRange(),d=c.duplicate(),d.moveToElementText(a),d.setEndPoint("EndToStart",c),e=""===d.text,d.moveToElementText(a),d.setEndPoint("StartToEnd",c),f=""===d.text);return{atStart:e,atEnd:f}}function q(){if(o())return!1;b.$el.find("td, th, img, br:not(:last)").prepend('<span class="fr-mk">'+a.FE.INVISIBLE_SPACE+"</span>");var c=!1,d=p(b.el);return d.atStart&&d.atEnd&&(c=!0),b.$el.find(".fr-mk").remove(),c}function r(c,d){"undefined"==typeof d&&(d=!0);var e=a(c).html();e&&e.replace(/\u200b/g,"").length!=e.length&&a(c).html(e.replace(/\u200b/g,""));for(var f=b.node.contents(c),g=0;g<f.length;g++)f[g].nodeType!=Node.ELEMENT_NODE?a(f[g]).remove():(r(f[g],0===g),0===g&&(d=!1));c.nodeType==Node.TEXT_NODE?a(c).replaceWith('<span data-first="true" data-text="true"></span>'):d&&a(c).attr("data-first",!0)}function s(){return 0===a(this).find("fr-inner").length}function t(c,d){var e=b.node.contents(c.get(0));["TD","TH"].indexOf(c.get(0).tagName)>=0&&1==c.find(".fr-marker").length&&b.node.hasClass(e[0],"fr-marker")&&c.attr("data-del-cell",!0);for(var f=0;f<e.length;f++){var g=e[f];b.node.hasClass(g,"fr-marker")?d=(d+1)%2:d?a(g).find(".fr-marker").length>0?d=t(a(g),d):["TD","TH"].indexOf(g.tagName)<0&&!b.node.hasClass(g,"fr-inner")?!b.opts.keepFormatOnDelete||b.$el.find("[data-first]").length>0?a(g).remove():r(g):b.node.hasClass(g,"fr-inner")?0===a(g).find(".fr-inner").length?a(g).html("<br>"):a(g).find(".fr-inner").filter(s).html("<br>"):(a(g).empty(),a(g).attr("data-del-cell",!0)):a(g).find(".fr-marker").length>0&&(d=t(a(g),d))}return d}function u(){try{if(!b.$wp)return!1;for(var a=e(0),c=a.commonAncestorContainer;c&&!b.node.isElement(c);)c=c.parentNode;return!!b.node.isElement(c)}catch(d){return!1}}function v(){if(o())return!0;var c;k();var d=function(b){for(var c=b.previousSibling;c&&c.nodeType==Node.TEXT_NODE&&0===c.textContent.length;){var d=c;c=c.previousSibling,a(d).remove()}return c},e=function(b){for(var c=b.nextSibling;c&&c.nodeType==Node.TEXT_NODE&&0===c.textContent.length;){var d=c;c=c.nextSibling,a(d).remove()}return c},f=b.$el.find('.fr-marker[data-type="true"]');for(c=0;c<f.length;c++)for(var g=f[c];!d(g)&&!b.node.isBlock(g.parentNode)&&!b.$el.is(g.parentNode);)a(g.parentNode).before(g);var h=b.$el.find('.fr-marker[data-type="false"]');for(c=0;c<h.length;c++){for(var i=h[c];!e(i)&&!b.node.isBlock(i.parentNode)&&!b.$el.is(i.parentNode);)a(i.parentNode).after(i);i.parentNode&&b.node.isBlock(i.parentNode)&&b.node.isEmpty(i.parentNode)&&!b.$el.is(i.parentNode)&&b.opts.keepFormatOnDelete&&a(i.parentNode).after(i)}if(n()){t(b.$el,0);var j=b.$el.find('[data-first="true"]');if(j.length)b.$el.find(".fr-marker").remove(),j.append(a.FE.INVISIBLE_SPACE+a.FE.MARKERS).removeAttr("data-first"),j.attr("data-text")&&j.replaceWith(j.html());else for(b.$el.find("table").filter(function(){var b=a(this).find("[data-del-cell]").length>0&&a(this).find("[data-del-cell]").length==a(this).find("td, th").length;return b}).remove(),b.$el.find("[data-del-cell]").removeAttr("data-del-cell"),f=b.$el.find('.fr-marker[data-type="true"]'),c=0;c<f.length;c++){var m=f[c],p=m.nextSibling,q=b.$el.find('.fr-marker[data-type="false"][data-id="'+a(m).data("id")+'"]').get(0);if(q){if(m&&(!p||p!=q)){var r=b.node.blockParent(m),s=b.node.blockParent(q),u=!1,v=!1;if(r&&["UL","OL"].indexOf(r.tagName)>=0&&(r=null,u=!0),s&&["UL","OL"].indexOf(s.tagName)>=0&&(s=null,v=!0),a(m).after(q),r!=s)if(null!=r||u)if(null!=s||v||0!==a(r).parentsUntil(b.$el,"table").length)r&&s&&0===a(r).parentsUntil(b.$el,"table").length&&0===a(s).parentsUntil(b.$el,"table").length&&(a(r).append(a(s).html()),a(s).remove());else{for(p=r;!p.nextSibling&&p.parentNode!=b.el;)p=p.parentNode;for(p=p.nextSibling;p&&"BR"!=p.tagName;){var w=p.nextSibling;a(r).append(p),p=w}p&&"BR"==p.tagName&&a(p).remove()}else{var x=b.node.deepestParent(m);x?(a(x).after(a(s).html()),a(s).remove()):0===a(s).parentsUntil(b.$el,"table").length&&(a(m).next().after(a(s).html()),a(s).remove())}}}else q=a(m).clone().attr("data-type",!1),a(m).after(q)}}b.opts.keepFormatOnDelete||b.html.fillEmptyBlocks(),b.html.cleanEmptyTags(!0),b.clean.lists(),b.spaces.normalize();var y=b.$el.find(".fr-marker:last").get(0),z=b.$el.find(".fr-marker:first").get(0);!y.nextSibling&&z.previousSibling&&"BR"==z.previousSibling.tagName&&b.node.isElement(y.parentNode)&&b.node.isElement(z.parentNode)&&b.$el.append("<br>"),l()}function w(c){if(!c||c.getElementsByClassName("fr-marker").length>0)return!1;for(var d=c.firstChild;d&&b.node.isBlock(d);)c=d,d=d.firstChild;c.innerHTML=a.FE.MARKERS+c.innerHTML}function x(c){if(!c||c.getElementsByClassName("fr-marker").length>0)return!1;for(var d=c.lastChild;d&&b.node.isBlock(d);)c=d,d=d.lastChild;c.innerHTML=c.innerHTML+a.FE.MARKERS}function y(c,d){"undefined"==typeof d&&(d=!0);for(var e=c.previousSibling;e&&e.nodeType==Node.TEXT_NODE&&0===e.textContent.length;)e=e.previousSibling;return e?(b.node.isBlock(e)?x(e):"BR"==e.tagName?a(e).before(a.FE.MARKERS):a(e).after(a.FE.MARKERS),!0):!!d&&(b.node.isBlock(c)?w(c):a(c).before(a.FE.MARKERS),!0)}function z(c,d){"undefined"==typeof d&&(d=!0);for(var e=c.nextSibling;e&&e.nodeType==Node.TEXT_NODE&&0===e.textContent.length;)e=e.nextSibling;return e?(b.node.isBlock(e)?w(e):a(e).before(a.FE.MARKERS),!0):!!d&&(b.node.isBlock(c)?x(c):a(c).after(a.FE.MARKERS),!0)}return{text:c,get:d,ranges:e,clear:f,element:g,endElement:h,save:k,restore:l,isCollapsed:o,isFull:q,inEditor:u,remove:v,blocks:j,info:p,setAtEnd:x,setAtStart:w,setBefore:y,setAfter:z,rangeElement:i}},a.extend(a.FE.DEFAULTS,{htmlAllowedTags:["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","blockquote","br","button","canvas","caption","cite","code","col","colgroup","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meter","nav","noscript","object","ol","optgroup","option","output","p","param","pre","progress","queue","rp","rt","ruby","s","samp","script","style","section","select","small","source","span","strike","strong","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","var","video","wbr"],htmlRemoveTags:["script","style"],htmlAllowedAttrs:["accept","accept-charset","accesskey","action","align","allowfullscreen","allowtransparency","alt","async","autocomplete","autofocus","autoplay","autosave","background","bgcolor","border","charset","cellpadding","cellspacing","checked","cite","class","color","cols","colspan","content","contenteditable","contextmenu","controls","coords","data","data-.*","datetime","default","defer","dir","dirname","disabled","download","draggable","dropzone","enctype","for","form","formaction","frameborder","headers","height","hidden","high","href","hreflang","http-equiv","icon","id","ismap","itemprop","keytype","kind","label","lang","language","list","loop","low","max","maxlength","media","method","min","mozallowfullscreen","multiple","name","novalidate","open","optimum","pattern","ping","placeholder","poster","preload","pubdate","radiogroup","readonly","rel","required","reversed","rows","rowspan","sandbox","scope","scoped","scrolling","seamless","selected","shape","size","sizes","span","src","srcdoc","srclang","srcset","start","step","summary","spellcheck","style","tabindex","target","title","type","translate","usemap","value","valign","webkitallowfullscreen","width","wrap"],htmlAllowedStyleProps:[],htmlAllowComments:!0,htmlUntouched:!1,fullPage:!1}),a.FE.HTML5Map={B:"STRONG",I:"EM",STRIKE:"S"},a.FE.MODULES.clean=function(b){function c(a){if(a.nodeType==Node.ELEMENT_NODE&&a.getAttribute("class")&&a.getAttribute("class").indexOf("fr-marker")>=0)return!1;var d,e=b.node.contents(a),f=[];for(d=0;d<e.length;d++)e[d].nodeType!=Node.ELEMENT_NODE||b.node.isVoid(e[d])?e[d].nodeType==Node.TEXT_NODE&&(e[d].textContent=e[d].textContent.replace(/\u200b/g,"").replace(/&/g,"&amp;")):e[d].textContent.replace(/\u200b/g,"").length!=e[d].textContent.length&&c(e[d]);if(a.nodeType==Node.ELEMENT_NODE&&!b.node.isVoid(a)&&(a.normalize(),e=b.node.contents(a),f=a.querySelectorAll(".fr-marker"),e.length-f.length===0)){for(d=0;d<e.length;d++)if((e[d].getAttribute("class")||"").indexOf("fr-marker")<0)return!1;for(d=0;d<f.length;d++)a.parentNode.insertBefore(f[d].cloneNode(!0),a);return a.parentNode.removeChild(a),!1}}function d(a,c){if(a.nodeType==Node.COMMENT_NODE)return"<!--"+a.nodeValue+"-->";if(a.nodeType==Node.TEXT_NODE)return c?a.textContent.replace(/\&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"):a.textContent.replace(/\&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\u00A0/g,"&nbsp;").replace(/\u0009/g,"");if(a.nodeType!=Node.ELEMENT_NODE)return a.outerHTML;if(a.nodeType==Node.ELEMENT_NODE&&["STYLE","SCRIPT","NOSCRIPT"].indexOf(a.tagName)>=0)return a.outerHTML;if(a.nodeType==Node.ELEMENT_NODE&&"svg"==a.tagName){var e=document.createElement("div"),f=a.cloneNode(!0);return e.appendChild(f),e.innerHTML}if("IFRAME"==a.tagName)return a.outerHTML;var g=a.childNodes;if(0===g.length)return a.outerHTML;for(var h="",i=0;i<g.length;i++)"PRE"==a.tagName&&(c=!0),h+=d(g[i],c);return b.node.openTagString(a)+h+b.node.closeTagString(a)}function e(a){return L=[],a=a.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,function(a){return L.push(a),"[FROALA.EDITOR.SCRIPT "+(L.length-1)+"]"}),a=a.replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi,function(a){return L.push(a),"[FROALA.EDITOR.NOSCRIPT "+(L.length-1)+"]"}),a=a.replace(/<img((?:[\w\W]*?)) src="/g,'<img$1 data-fr-src="')}function f(a){return a=a.replace(/\[FROALA\.EDITOR\.SCRIPT ([\d]*)\]/gi,function(a,c){return b.opts.htmlRemoveTags.indexOf("script")>=0?"":L[parseInt(c,10)]}),a=a.replace(/\[FROALA\.EDITOR\.NOSCRIPT ([\d]*)\]/gi,function(a,c){return b.opts.htmlRemoveTags.indexOf("noscript")>=0?"":L[parseInt(c,10)].replace(/\&lt;/g,"<").replace(/\&gt;/g,">")}),a=a.replace(/<img((?:[\w\W]*?)) data-fr-src="/g,'<img$1 src="')}function g(a){var b=a.replace(/;;/gi,";");return b=b.replace(/^;/gi,""),";"!=b.charAt(b.length)&&(b+=";"),b}function h(a){var c;for(c in a)if(a.hasOwnProperty(c)){var d=null;b.opts.htmlAllowedStyleProps.length&&(d=a[c].match(K)),"style"==c&&d?a[c]=g(d.join(";")):c.match(J)||delete a[c]}for(var e="",f=Object.keys(a).sort(),h=0;h<f.length;h++)c=f[h],e+=a[c].indexOf('"')<0?" "+c+'="'+a[c]+'"':" "+c+"='"+a[c]+"'";return e}function j(a,c,d){if(b.opts.fullPage){var e=b.html.extractDoctype(d),f=h(b.html.extractNodeAttrs(d,"html"));c=null==c?b.html.extractNode(d,"head")||"<title></title>":c;var g=h(b.html.extractNodeAttrs(d,"head")),i=h(b.html.extractNodeAttrs(d,"body"));return e+"<html"+f+"><head"+g+">"+c+"</head><body"+i+">"+a+"</body></html>"}return a}function k(c,e){var f,g=a("<div>"+c+"</div>"),h="";if(g){var i=b.node.contents(g.get(0));for(f=0;f<i.length;f++)e(i[f]);for(i=b.node.contents(g.get(0)),f=0;f<i.length;f++)h+=d(i[f])}return h}function l(a,c,d){a=e(a);var g=a,h=null;b.opts.fullPage&&(g=b.html.extractNode(a,"body")||(a.indexOf("<body")>=0?"":a),d&&(h=b.html.extractNode(a,"head")||"")),g=k(g,c),h&&(h=k(h,c));var i=j(g,h,a);return f(i)}function m(a){return a.replace(/\u200b/g,"").length==a.length?a:b.clean.exec(a,c)}function n(){var c=b.el.querySelectorAll(Object.keys(a.FE.HTML5Map).join(","));if(c.length){var d=!1;b.el.querySelector(".fr-marker")||(b.selection.save(),d=!0);for(var e=0;e<c.length;e++)""===b.node.attributes(c[e])&&a(c[e]).replaceWith("<"+a.FE.HTML5Map[c[e].tagName]+">"+c[e].innerHTML+"</"+a.FE.HTML5Map[c[e].tagName]+">");d&&b.selection.restore()}}function o(c){if("SPAN"==c.tagName&&(c.getAttribute("class")||"").indexOf("fr-marker")>=0)return!1;if("PRE"==c.tagName&&q(c),c.nodeType==Node.ELEMENT_NODE&&(c.getAttribute("data-fr-src")&&c.setAttribute("data-fr-src",b.helpers.sanitizeURL(c.getAttribute("data-fr-src"))),c.getAttribute("href")&&c.setAttribute("href",b.helpers.sanitizeURL(c.getAttribute("href"))),["TABLE","TBODY","TFOOT","TR"].indexOf(c.tagName)>=0&&(c.innerHTML=c.innerHTML.trim())),!b.opts.pasteAllowLocalImages&&c.nodeType==Node.ELEMENT_NODE&&"IMG"==c.tagName&&c.getAttribute("data-fr-src")&&0===c.getAttribute("data-fr-src").indexOf("file://"))return c.parentNode.removeChild(c),!1;if(c.nodeType==Node.ELEMENT_NODE&&a.FE.HTML5Map[c.tagName]&&""===b.node.attributes(c)){var d=a.FE.HTML5Map[c.tagName],e="<"+d+">"+c.innerHTML+"</"+d+">";c.insertAdjacentHTML("beforebegin",e),c=c.previousSibling,c.parentNode.removeChild(c.nextSibling)}if(b.opts.htmlAllowComments||c.nodeType!=Node.COMMENT_NODE)if(c.tagName&&c.tagName.match(I))c.parentNode.removeChild(c);else if(c.tagName&&!c.tagName.match(H))"svg"===c.tagName?c.parentNode.removeChild(c):b.browser.safari&&"path"==c.tagName&&c.parentNode&&"svg"==c.parentNode.tagName||(c.outerHTML=c.innerHTML);else{var f=c.attributes;if(f)for(var h=f.length-1;h>=0;h--){var i=f[h],j=null;b.opts.htmlAllowedStyleProps.length&&(j=i.nodeValue.match(K)),"style"==i.nodeName&&j?i.nodeValue=g(j.join(";")):i.nodeName.match(J)||c.removeAttribute(i.nodeName)}}else 0!==c.data.indexOf("[FROALA.EDITOR")&&c.parentNode.removeChild(c)}function p(a){for(var c=b.node.contents(a),d=0;d<c.length;d++)c[d].nodeType!=Node.TEXT_NODE&&p(c[d]);o(a)}function q(a){var b=a.innerHTML;b.indexOf("\n")>=0&&(a.innerHTML=b.replace(/\n/g,"<br>"))}function r(c,d,e,f){"undefined"==typeof d&&(d=[]),"undefined"==typeof e&&(e=[]),"undefined"==typeof f&&(f=!1),c=c.replace(/<br> */g,"<br>");var g,h=a.merge([],b.opts.htmlAllowedTags);for(g=0;g<d.length;g++)h.indexOf(d[g])>=0&&h.splice(h.indexOf(d[g]),1);var i=a.merge([],b.opts.htmlAllowedAttrs);for(g=0;g<e.length;g++)i.indexOf(e[g])>=0&&i.splice(i.indexOf(e[g]),1);return i.push("data-fr-.*"),i.push("fr-.*"),H=new RegExp("^"+h.join("$|^")+"$","gi"),J=new RegExp("^"+i.join("$|^")+"$","gi"),I=new RegExp("^"+b.opts.htmlRemoveTags.join("$|^")+"$","gi"),K=b.opts.htmlAllowedStyleProps.length?new RegExp("((^|;|\\s)"+b.opts.htmlAllowedStyleProps.join(":.+?(?=;|$))|((^|;|\\s)")+":.+?(?=(;|')|$))","gi"):null,c=l(c,p,!0)}function s(){for(var c=b.el.querySelectorAll("blockquote + blockquote"),d=0;d<c.length;d++){var e=c[d];b.node.attributes(e)==b.node.attributes(e.previousSibling)&&(a(e).prev().append(a(e).html()),a(e).remove())}}function t(){for(var a=b.el.querySelectorAll("tr"),c=0;c<a.length;c++){for(var d=a[c].children,e=!0,f=0;f<d.length;f++)if("TH"!=d[f].tagName){e=!1;break}if(e!==!1&&0!==d.length){for(var g=a[c];g&&"TABLE"!=g.tagName&&"THEAD"!=g.tagName;)g=g.parentNode;var h=g;"THEAD"!=h.tagName&&(h=b.doc.createElement("THEAD"),g.insertBefore(h,g.firstChild)),h.appendChild(a[c])}}}function u(){var c=b.html.defaultTag();if(c)for(var d=b.el.querySelectorAll("td > "+c+", th > "+c),e=0;e<d.length;e++)""===b.node.attributes(d[e])&&a(d[e]).replaceWith(d[e].innerHTML+"<br>")}function v(){t(),u()}function w(){var a=[],c=function(a){return!b.node.isList(a.parentNode)};do{if(a.length){var d=a[0],e=b.doc.createElement("ul");d.parentNode.insertBefore(e,d);do{var f=d;d=d.nextSibling,e.appendChild(f)}while(d&&"LI"==d.tagName)}a=[];for(var g=b.el.querySelectorAll("li"),h=0;h<g.length;h++)c(g[h])&&a.push(g[h])}while(a.length>0)}function x(){for(var a=b.el.querySelectorAll("ol + ol, ul + ul"),c=0;c<a.length;c++){var d=a[c];if(b.node.isList(d.previousSibling)&&b.node.openTagString(d)==b.node.openTagString(d.previousSibling)){for(var e=b.node.contents(d),f=0;f<e.length;f++)d.previousSibling.appendChild(e[f]);d.parentNode.removeChild(d)}}}function y(){var a,c,d=function(a){a.querySelector("LI")||(c=!0,a.parentNode.removeChild(a))};do{c=!1;var e=b.el.querySelectorAll("li:empty");for(a=0;a<e.length;a++)e[a].parentNode.removeChild(e[a]);var f=b.el.querySelectorAll("ul, ol");for(a=0;a<f.length;a++)d(f[a])}while(c===!0)}function z(){for(var c=b.el.querySelectorAll("ul > ul, ol > ol, ul > ol, ol > ul"),d=0;d<c.length;d++){var e=c[d],f=e.previousSibling;f&&("LI"==f.tagName?f.appendChild(e):a(e).wrap("<li></li>"))}}function A(){for(var c=b.el.querySelectorAll("li > ul, li > ol"),d=0;d<c.length;d++){var e=c[d];if(e.nextSibling){var f=e.nextSibling,g=a("<li>");a(e.parentNode).after(g);do{var h=f;f=f.nextSibling,g.append(h)}while(f)}}}function B(){for(var c=b.el.querySelectorAll("li > ul, li > ol"),d=0;d<c.length;d++){var e=c[d];if(b.node.isFirstSibling(e))a(e).before("<br/>");else if(e.previousSibling&&"BR"==e.previousSibling.tagName){for(var f=e.previousSibling.previousSibling;f&&b.node.hasClass(f,"fr-marker");)f=f.previousSibling;f&&"BR"!=f.tagName&&a(e.previousSibling).remove()}}}function C(){for(var c=b.el.querySelectorAll("li:empty"),d=0;d<c.length;d++)a(c[d]).remove()}function D(){for(var c=b.el.querySelectorAll("ul, ol"),d=0;d<c.length;d++)for(var e=b.node.contents(c[d]),f=null,g=e.length-1;g>=0;g--)"LI"!=e[g].tagName?(f||(f=a("<li>"),f.insertBefore(e[g])),f.prepend(e[g])):f=null}function E(){for(default_tag_els=b.el.querySelectorAll(b.html.defaultTag()),i=default_tag_els.length-1;i>=0;i--)el=default_tag_els[i],el.parentNode&&"LI"==el.parentNode.tagName&&(el.nextElementSibling&&el.nextElementSibling.tagName.toLowerCase()==b.html.defaultTag()&&a("<br>").insertBefore(el.nextElementSibling),el.previousElementSibling&&el.previousElementSibling.tagName.toLowerCase()==b.html.defaultTag()&&a("<br>").insertAfter(el.previousElementSibling),el.outerHTML=el.innerHTML)}function F(){w(),x(),y(),z(),A(),B(),D(),C(),E()}function G(){b.opts.fullPage&&a.merge(b.opts.htmlAllowedTags,["head","title","style","link","base","body","html","meta"])}var H,I,J,K,L=[];return{_init:G,html:r,toHTML5:n,tables:v,lists:F,quotes:s,invisibleSpaces:m,exec:l}},a.FE.MODULES.spaces=function(b){function c(c,d){var e=c.previousSibling,f=c.nextSibling,g=c.textContent,h=c.parentNode;if("PRE"!=h.tagName){d&&(g=g.replace(/[\f\n\r\t\v ]{2,}/g," "),f&&"BR"!==f.tagName&&!b.node.isBlock(f)||!b.node.isBlock(h)||(g=g.replace(/[\f\n\r\t\v ]{1,}$/g,"")),e&&"BR"!==e.tagName&&!b.node.isBlock(e)||!b.node.isBlock(h)||(g=g.replace(/^[\f\n\r\t\v ]{1,}/g,""))," "===g&&(e&&e.nodeType!=Node.TEXT_NODE||f&&f.nodeType!=Node.TEXT_NODE)&&(g="")),g=g.replace(new RegExp(a.FE.UNICODE_NBSP,"g")," ");for(var i="",j=0;j<g.length;j++)i+=32!=g.charCodeAt(j)||0!==j&&32!=i.charCodeAt(j-1)?g[j]:a.FE.UNICODE_NBSP;(!f||b.node.isBlock(f)||f.nodeType==Node.ELEMENT_NODE&&b.win.getComputedStyle(f)&&"block"==b.win.getComputedStyle(f).display)&&(i=i.replace(/ $/,a.FE.UNICODE_NBSP)),!e||b.node.isVoid(e)||b.node.isBlock(e)||(i=i.replace(/^\u00A0([^ $])/," $1"),1!==i.length||160!==i.charCodeAt(0)||!f||b.node.isVoid(f)||b.node.isBlock(f)||(i=" ")),i=i.replace(/([^ \u00A0])\u00A0([^ \u00A0])/g,"$1 $2"),c.textContent!=i&&(c.textContent=i)}}function d(a,d){if("undefined"!=typeof a&&a||(a=b.el),"undefined"==typeof d&&(d=!1),b.opts.htmlUntouched)return!1;if(!a.getAttribute||"false"!=a.getAttribute("contenteditable"))if(a.nodeType==Node.TEXT_NODE)c(a,d);else if(a.nodeType==Node.ELEMENT_NODE)for(var e=b.doc.createTreeWalker(a,NodeFilter.SHOW_TEXT,b.node.filter(function(a){for(var c=a.parentNode;c&&c!==b.el;){if("PRE"===c.tagName)return!1;c=c.parentNode}return null!=a.textContent.match(/([ \u00A0\f\n\r\t\v]{2,})|(^[ \u00A0\f\n\r\t\v]{1,})|([ \u00A0\f\n\r\t\v]{1,}$)/g)&&!b.node.hasClass(a.parentNode,"fr-marker")}),!1);e.nextNode();)c(e.currentNode,d)}function e(){for(var a=[],c=b.el.querySelectorAll(".fr-marker"),e=0;e<c.length;e++){var f=null,g=b.node.blockParent(c[e]);f=g?g:c[e];for(var h=f.nextSibling,i=f.previousSibling;h&&"BR"==h.tagName;)h=h.nextSibling;for(;i&&"BR"==i.tagName;)i=i.previousSibling;f&&a.indexOf(f)<0&&a.push(f),i&&a.indexOf(i)<0&&a.push(i),h&&a.indexOf(h)<0&&a.push(h)}for(var j=0;j<a.length;j++)d(a[j])}return{normalize:d,normalizeAroundCursor:e}},a.FE.UNICODE_NBSP=String.fromCharCode(160),a.FE.VOID_ELEMENTS=["area","base","br","col","embed","hr","img","input","keygen","link","menuitem","meta","param","source","track","wbr"],a.FE.BLOCK_TAGS=["address","article","aside","audio","blockquote","canvas","dd","div","dl","dt","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","li","main","nav","noscript","ol","output","p","pre","section","table","tbody","td","tfoot","th","thead","tr","ul","video"],a.extend(a.FE.DEFAULTS,{htmlAllowedEmptyTags:["textarea","a","iframe","object","video","style","script",".fa",".fr-emoticon"],htmlDoNotWrapTags:["script","style"],htmlSimpleAmpersand:!1,htmlIgnoreCSSProperties:[]}),a.FE.MODULES.html=function(b){function c(){return b.opts.enter==a.FE.ENTER_P?"p":b.opts.enter==a.FE.ENTER_DIV?"div":b.opts.enter==a.FE.ENTER_BR?null:void 0}function d(c){var d,e=[],g=[];if(c){var h=b.el.querySelectorAll(".fr-marker");for(d=0;d<h.length;d++){var i=b.node.blockParent(h[d])||h[d];if(i){var j=i.nextSibling,k=i.previousSibling;i&&g.indexOf(i)<0&&b.node.isBlock(i)&&g.push(i),k&&b.node.isBlock(k)&&g.indexOf(k)<0&&g.push(k),j&&b.node.isBlock(j)&&g.indexOf(j)<0&&g.push(j)}}}else g=b.el.querySelectorAll(f());var l=f();for(l+=","+a.FE.VOID_ELEMENTS.join(","),l+=","+b.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),")+":not(.fr-marker)",d=g.length-1;d>=0;d--)if(!(g[d].textContent&&g[d].textContent.replace(/\u200B|\n/g,"").length>0||g[d].querySelectorAll(l).length>0)){for(var m=b.node.contents(g[d]),n=!1,o=0;o<m.length;o++)if(m[o].nodeType!=Node.COMMENT_NODE&&m[o].textContent&&m[o].textContent.replace(/\u200B|\n/g,"").length>0){n=!0;break}n||e.push(g[d])}return e}function e(){return a.FE.BLOCK_TAGS.join(":empty, ")+":empty"}function f(){return a.FE.BLOCK_TAGS.join(", ")}function g(c){var d=a.merge([],a.FE.VOID_ELEMENTS);d=a.merge(d,b.opts.htmlAllowedEmptyTags),"undefined"==typeof c&&(d=a.merge(d,a.FE.BLOCK_TAGS));var e,f;e=b.el.querySelectorAll("*:empty:not("+d.join("):not(")+"):not(.fr-marker)");do{f=!1;for(var g=0;g<e.length;g++)0!==e[g].attributes.length&&"undefined"==typeof e[g].getAttribute("href")||(e[g].parentNode.removeChild(e[g]),f=!0);e=b.el.querySelectorAll("*:empty:not("+d.join("):not(")+"):not(.fr-marker)")}while(e.length&&f)}function h(a,d){var e=c();if(d&&(e="div"),e){for(var f=b.doc.createDocumentFragment(),g=null,h=!1,i=a.firstChild;i;){var j=i.nextSibling;if(i.nodeType==Node.ELEMENT_NODE&&(b.node.isBlock(i)||b.opts.htmlDoNotWrapTags.indexOf(i.tagName.toLowerCase())>=0&&!b.node.hasClass(i,"fr-marker")))g=null,f.appendChild(i);else if(i.nodeType!=Node.ELEMENT_NODE&&i.nodeType!=Node.TEXT_NODE)g=null,f.appendChild(i);else if("BR"==i.tagName)null==g?(g=b.doc.createElement(e),d&&g.setAttribute("data-empty",!0),g.appendChild(i),f.appendChild(g)):h===!1&&(g.appendChild(b.doc.createElement("br")),g.setAttribute("data-empty",!0)),g=null;else{var k=i.textContent;i.nodeType==Node.TEXT_NODE&&0===k.replace(/\n/g,"").replace(/(^ *)|( *$)/g,"").length||(null==g&&(g=b.doc.createElement(e),d&&g.setAttribute("class","fr-temp-div"),f.appendChild(g),h=!1),g.appendChild(i),h||b.node.hasClass(i,"fr-marker")||i.nodeType==Node.TEXT_NODE&&0===k.replace(/ /g,"").length||(h=!0))}i=j}a.innerHTML="",a.appendChild(f)}}function i(a,b){for(var c=0;c<a.length;c++)h(a[c],b)}function j(a,c,d,e){return!!b.$wp&&("undefined"==typeof a&&(a=!1),"undefined"==typeof c&&(c=!1),"undefined"==typeof d&&(d=!1),"undefined"==typeof e&&(e=!1),h(b.el,a),e&&i(b.el.querySelectorAll(".fr-inner"),a),c&&i(b.el.querySelectorAll("td, th"),a),void(d&&i(b.el.querySelectorAll("blockquote"),a)))}function k(){b.$el.find("div.fr-temp-div").each(function(){a(this).data("empty")||"LI"==this.parentNode.tagName||b.node.isBlock(this.nextSibling)&&!a(this.nextSibling).hasClass("fr-temp-div")?a(this).replaceWith(a(this).html()):a(this).replaceWith(a(this).html()+"<br>")}),b.$el.find(".fr-temp-div").removeClass("fr-temp-div").filter(function(){return""===a(this).attr("class")}).removeAttr("class")}function l(c){for(var e=d(c),f=0;f<e.length;f++){var g=e[f];"false"===g.getAttribute("contenteditable")||g.querySelector(b.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),")+":not(.fr-marker)")||b.node.isVoid(g)||"TABLE"!=g.tagName&&"TBODY"!=g.tagName&&"TR"!=g.tagName&&g.appendChild(b.doc.createElement("br"))}if(b.browser.msie&&b.opts.enter==a.FE.ENTER_BR){var h=b.node.contents(b.el);h.length&&h[h.length-1].nodeType==Node.TEXT_NODE&&b.$el.append("<br>")}}function m(){return b.$el.get(0).querySelectorAll(f())}function n(a){if("undefined"==typeof a&&(a=b.el),a&&["SCRIPT","STYLE","PRE"].indexOf(a.tagName)>=0)return!1;for(var c=b.doc.createTreeWalker(a,NodeFilter.SHOW_TEXT,b.node.filter(function(a){return null!=a.textContent.match(/([ \n]{2,})|(^[ \n]{1,})|([ \n]{1,}$)/g)}),!1);c.nextNode();){var d=c.currentNode;if("PRE"!=d.parentNode.tagName){var e=b.node.isBlock(d.parentNode)||b.node.isElement(d.parentNode),f=d.textContent.replace(/(?!^)( ){2,}(?!$)/g," ").replace(/\n/g," ").replace(/^[ ]{2,}/g," ").replace(/[ ]{2,}$/g," ");if(e){var g=d.previousSibling,h=d.nextSibling;g&&h&&" "==f?f=b.node.isBlock(g)&&b.node.isBlock(h)?"":"\n":(g||(f=f.replace(/^ */,"")),h||(f=f.replace(/ *$/,"")))}d.textContent=f}}}function o(a,b,c){var d=new RegExp(b,"gi"),e=d.exec(a);return e?e[c]:null}function p(a,b){var c=a.match(/<!DOCTYPE ?([^ ]*) ?([^ ]*) ?"?([^"]*)"? ?"?([^"]*)"?>/i);return c?b.implementation.createDocumentType(c[1],c[3],c[4]):b.implementation.createDocumentType("html")}function q(a){var b=a.doctype,c="<!DOCTYPE html>";return b&&(c="<!DOCTYPE "+b.name+(b.publicId?' PUBLIC "'+b.publicId+'"':"")+(!b.publicId&&b.systemId?" SYSTEM":"")+(b.systemId?' "'+b.systemId+'"':"")+">"),c}function r(c,d){var e=c.parentNode;if(e&&(b.node.isBlock(e)||b.node.isElement(e))&&["TD","TH"].indexOf(e.tagName)<0){for(var f=c.previousSibling,g=c.nextSibling;f&&f.nodeType==Node.TEXT_NODE&&0===f.textContent.replace(/\n|\r/g,"").length;)f=f.previousSibling;f&&e&&"BR"!=f.tagName&&!b.node.isBlock(f)&&!g&&e.textContent.replace(/\u200B/g,"").length>0&&f.textContent.length>0&&!b.node.hasClass(f,"fr-marker")&&(b.el==e&&!g&&b.opts.enter==a.FE.ENTER_BR&&b.browser.msie||(d&&b.selection.save(),c.parentNode.removeChild(c),d&&b.selection.restore()))}}function s(){var a,c,d=b.selection.element();a=b.node.isBlock(d)?d:b.node.blockParent(d);var e=[];if(a){var f=a.nextSibling,g=a.previousSibling;a&&e.indexOf(a)<0&&e.push(a),g&&b.node.isBlock(g)&&e.indexOf(g)<0&&e.push(g),f&&b.node.isBlock(f)&&e.indexOf(f)<0&&e.push(f)}var h=[];for(c=0;c<e.length;c++)for(var i=e[c].querySelectorAll("br"),j=0;j<i.length;j++)h.indexOf(i[j])<0&&h.push(i[j]);if(d.parentNode==b.el){var k=b.el.children;for(c=0;c<k.length;c++)"BR"==k[c].tagName&&h.indexOf(k[c])<0&&h.push(k[c])}return h}function t(a,c){var d,e=null;if(a)for(e=s(),d=0;d<e.length;d++)r(e[d],c);else for(e=b.el.getElementsByTagName("br"),d=0;d<e.length;d++)r(e[d],c)}function u(){b.opts.htmlUntouched||(g(),j()),n(),b.opts.htmlUntouched||(b.spaces.normalize(null,!0),b.html.fillEmptyBlocks(),b.clean.quotes(),b.clean.lists(),b.clean.tables(),b.clean.toHTML5(),b.html.cleanBRs()),b.selection.restore(),v(),b.placeholder.refresh()}function v(){b.core.isEmpty()&&(null!=c()?b.el.querySelector(f())||b.el.querySelector(b.opts.htmlDoNotWrapTags.join(":not(.fr-marker),")+":not(.fr-marker)")||(b.core.hasFocus()?(b.$el.html("<"+c()+">"+a.FE.MARKERS+"<br/></"+c()+">"),b.selection.restore()):b.$el.html("<"+c()+"><br/></"+c()+">")):b.el.querySelector("*:not(.fr-marker):not(br)")||(b.core.hasFocus()?(b.$el.html(a.FE.MARKERS+"<br/>"),b.selection.restore()):b.$el.html("<br/>")))}function w(a,b){return o(a,"<"+b+"[^>]*?>([\\w\\W]*)</"+b+">",1)}function x(c,d){var e=a("<div "+(o(c,"<"+d+"([^>]*?)>",1)||"")+">");return b.node.rawAttributes(e.get(0))}function y(a){return o(a,"<!DOCTYPE([^>]*?)>",0)||"<!DOCTYPE html>"}function z(c){var d=b.clean.html(c||"",[],[],b.opts.fullPage);if(b.opts.fullPage){var e=w(d,"body")||(d.indexOf("<body")>=0?"":d),f=x(d,"body"),g=w(d,"head")||"<title></title>",h=x(d,"head"),i=a("<div>").append(g).contents().each(function(){(this.nodeType==Node.COMMENT_NODE||["BASE","LINK","META","NOSCRIPT","SCRIPT","STYLE","TEMPLATE","TITLE"].indexOf(this.tagName)>=0)&&this.parentNode.removeChild(this)}).end().html().trim();g=a("<div>").append(g).contents().map(function(){return this.nodeType==Node.COMMENT_NODE?"<!--"+this.nodeValue+"-->":["BASE","LINK","META","NOSCRIPT","SCRIPT","STYLE","TEMPLATE","TITLE"].indexOf(this.tagName)>=0?this.outerHTML:""}).toArray().join("");var j=y(d),k=x(d,"html");b.$el.html(i+"\n"+e),b.node.clearAttributes(b.el),b.$el.attr(f),b.$el.addClass("fr-view"),b.$el.attr("spellcheck",b.opts.spellcheck),b.$el.attr("dir",b.opts.direction),b.$head.html(g),b.node.clearAttributes(b.$head.get(0)),b.$head.attr(h),b.node.clearAttributes(b.$html.get(0)),b.$html.attr(k),b.iframe_document.doctype.parentNode.replaceChild(p(j,b.iframe_document),b.iframe_document.doctype)}else b.$el.html(d);var l=b.edit.isDisabled();b.edit.on(),b.core.injectStyle(b.opts.iframeStyle),u(),b.opts.useClasses||(b.$el.find("[fr-original-class]").each(function(){this.setAttribute("class",this.getAttribute("fr-original-class")),this.removeAttribute("fr-original-class")}),b.$el.find("[fr-original-style]").each(function(){this.setAttribute("style",this.getAttribute("fr-original-style")),this.removeAttribute("fr-original-style")})),l&&b.edit.off(),b.events.trigger("html.set")}function A(a){var b=/(#[^\s\+>~\.\[:]+)/g,c=/(\[[^\]]+\])/g,d=/(\.[^\s\+>~\.\[:]+)/g,e=/(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/gi,f=/(:[\w-]+\([^\)]*\))/gi,g=/(:[^\s\+>~\.\[:]+)/g,h=/([^\s\+>~\.\[:]+)/g;!function(){var b=/:not\(([^\)]*)\)/g;b.test(a)&&(a=a.replace(b,"     $1 "))}();var i=100*(a.match(b)||[]).length+10*(a.match(c)||[]).length+10*(a.match(d)||[]).length+10*(a.match(f)||[]).length+10*(a.match(g)||[]).length+(a.match(e)||[]).length;return a=a.replace(/[\*\s\+>~]/g," "),a=a.replace(/[#\.]/g," "),i+=(a.match(h)||[]).length}function B(a){if(b.events.trigger("html.processGet",[a]),a&&a.getAttribute&&""===a.getAttribute("class")&&a.removeAttribute("class"),a&&a.nodeType==Node.ELEMENT_NODE)for(var c=a.querySelectorAll('[class=""]'),d=0;d<c.length;d++)c[d].removeAttribute("class")}function C(a,b){return a[3]-b[3]}function D(a,c){if(!b.$wp)return b.$oel.clone().removeClass("fr-view").removeAttr("contenteditable").get(0).outerHTML;var d="";b.events.trigger("html.beforeGet");var e,f,g=[],h={},i=[];if(!b.opts.useClasses&&!c){var j=new RegExp("^"+b.opts.htmlIgnoreCSSProperties.join("$|^")+"$","gi");for(e=0;e<b.doc.styleSheets.length;e++){var k,l=0;try{k=b.doc.styleSheets[e].cssRules,b.doc.styleSheets[e].ownerNode&&"STYLE"==b.doc.styleSheets[e].ownerNode.nodeType&&(l=1)}catch(m){}if(k)for(var n=0,o=k.length;n<o;n++)if(k[n].selectorText&&k[n].style.cssText.length>0){var p,r=k[n].selectorText.replace(/body |\.fr-view /g,"").replace(/::/g,":");try{p=b.el.querySelectorAll(r)}catch(m){p=[]}for(f=0;f<p.length;f++){!p[f].getAttribute("fr-original-style")&&p[f].getAttribute("style")?(p[f].setAttribute("fr-original-style",p[f].getAttribute("style")),g.push(p[f])):p[f].getAttribute("fr-original-style")||g.push(p[f]),h[p[f]]||(h[p[f]]={});for(var s=1e3*l+A(k[n].selectorText),t=k[n].style.cssText.split(";"),u=0;u<t.length;u++){var v=t[u].trim().split(":")[0];v.match(j)||(h[p[f]][v]||(h[p[f]][v]=0,
(p[f].getAttribute("fr-original-style")||"").indexOf(v+":")>=0&&(h[p[f]][v]=1e4)),s>=h[p[f]][v]&&(h[p[f]][v]=s,t[u].trim().length&&i.push([p[f],v.trim(),t[u].trim().split(":")[1].trim(),s])))}}}}for(i.sort(C),e=0;e<i.length;e++){var w=i[e];w[0].style[w[1]]=w[2]}for(e=0;e<g.length;e++)if(g[e].getAttribute("class")&&(g[e].setAttribute("fr-original-class",g[e].getAttribute("class")),g[e].removeAttribute("class")),(g[e].getAttribute("fr-original-style")||"").trim().length>0){var x=g[e].getAttribute("fr-original-style").split(";");for(f=0;f<x.length;f++)x[f].indexOf(":")>0&&(g[e].style[x[f].split(":")[0].trim()]=x[f].split(":")[1].trim())}}if(b.core.isEmpty()?b.opts.fullPage&&(d=q(b.iframe_document),d+="<html"+b.node.attributes(b.$html.get(0))+">"+b.$html.find("head").get(0).outerHTML+"<body></body></html>"):("undefined"==typeof a&&(a=!1),b.opts.fullPage?(d=q(b.iframe_document),b.$el.removeClass("fr-view"),d+="<html"+b.node.attributes(b.$html.get(0))+">"+b.$html.html()+"</html>",b.$el.addClass("fr-view")):d=b.$el.html()),!b.opts.useClasses&&!c)for(e=0;e<g.length;e++)g[e].getAttribute("fr-original-class")&&(g[e].setAttribute("class",g[e].getAttribute("fr-original-class")),g[e].removeAttribute("fr-original-class")),g[e].getAttribute("fr-original-style")?(g[e].setAttribute("style",g[e].getAttribute("fr-original-style")),g[e].removeAttribute("fr-original-style")):g[e].removeAttribute("style");b.opts.fullPage&&(d=d.replace(/<style data-fr-style="true">(?:[\w\W]*?)<\/style>/g,""),d=d.replace(/<link([^>]*)data-fr-style="true"([^>]*)>/g,""),d=d.replace(/<style(?:[\w\W]*?)class="firebugResetStyles"(?:[\w\W]*?)>(?:[\w\W]*?)<\/style>/g,""),d=d.replace(/<body((?:[\w\W]*?)) spellcheck="true"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g,"<body$1$2>$3</body>"),d=d.replace(/<body((?:[\w\W]*?)) contenteditable="(true|false)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g,"<body$1$3>$4</body>"),d=d.replace(/<body((?:[\w\W]*?)) dir="([\w]*)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g,"<body$1$3>$4</body>"),d=d.replace(/<body((?:[\w\W]*?))class="([\w\W]*?)(fr-rtl|fr-ltr)([\w\W]*?)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g,'<body$1class="$2$4"$5>$6</body>'),d=d.replace(/<body((?:[\w\W]*?)) class=""((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g,"<body$1$2>$3</body>")),b.opts.htmlSimpleAmpersand&&(d=d.replace(/\&amp;/gi,"&")),b.events.trigger("html.afterGet"),a||(d=d.replace(/<span[^>]*? class\s*=\s*["']?fr-marker["']?[^>]+>\u200b<\/span>/gi,"")),d=b.clean.invisibleSpaces(d),d=b.clean.exec(d,B);var y=b.events.chainTrigger("html.get",d);return"string"==typeof y&&(d=y),d=d.replace(/<pre(?:[\w\W]*?)>(?:[\w\W]*?)<\/pre>/g,function(a){return a.replace(/<br>/g,"\n")})}function E(){var c=function(c,d){for(;d&&(d.nodeType==Node.TEXT_NODE||!b.node.isBlock(d))&&!b.node.isElement(d);)d&&d.nodeType!=Node.TEXT_NODE&&a(c).wrapInner(b.node.openTagString(d)+b.node.closeTagString(d)),d=d.parentNode;d&&c.innerHTML==d.innerHTML&&(c.innerHTML=d.outerHTML)},d=function(){var c,d=null;return b.win.getSelection?(c=b.win.getSelection(),c&&c.rangeCount&&(d=c.getRangeAt(0).commonAncestorContainer,d.nodeType!=Node.ELEMENT_NODE&&(d=d.parentNode))):(c=b.doc.selection)&&"Control"!=c.type&&(d=c.createRange().parentElement()),null!=d&&(a.inArray(b.el,a(d).parents())>=0||d==b.el)?d:null},e="";if("undefined"!=typeof b.win.getSelection){b.browser.mozilla&&(b.selection.save(),b.$el.find('.fr-marker[data-type="false"]').length>1&&(b.$el.find('.fr-marker[data-type="false"][data-id="0"]').remove(),b.$el.find('.fr-marker[data-type="false"]:last').attr("data-id","0"),b.$el.find(".fr-marker").not('[data-id="0"]').remove()),b.selection.restore());for(var f=b.selection.ranges(),g=0;g<f.length;g++){var h=document.createElement("div");h.appendChild(f[g].cloneContents());var i=h.children;if(i.length){var j=i[i.length-1];("P"==j.tagName&&b.opts.enter==a.FroalaEditor.ENTER_P||"DIV"==j.tagName&&b.opts.enter==a.FroalaEditor.ENTER_DIV)&&b.node.isEmpty(j)&&h.removeChild(j)}c(h,d()),a(h).find(".fr-element").length>0&&(h=b.el),e+=h.innerHTML}}else"undefined"!=typeof b.doc.selection&&"Text"==b.doc.selection.type&&(e=b.doc.selection.createRange().htmlText);return e}function F(a){var c=b.doc.createElement("div");return c.innerHTML=a,null!==c.querySelector(f())}function G(a){var c=b.doc.createElement("div");return c.innerHTML=a,b.selection.setAtEnd(c),c.innerHTML}function H(a){return a.replace(/</gi,"&lt;").replace(/>/gi,"&gt;").replace(/"/gi,"&quot;").replace(/'/gi,"&#39;")}function I(a,c,d){b.selection.isCollapsed()||b.selection.remove();var e;if(e=c?a:b.clean.html(a),e=e.replace(/\r|\n/g," "),a.indexOf('class="fr-marker"')<0&&(e=G(e)),b.core.isEmpty()&&!b.opts.keepFormatOnDelete)b.el.innerHTML=e;else{var f=b.markers.insert();if(f){var g,h=b.node.blockParent(f);if((F(e)||d)&&(g=b.node.deepestParent(f)||h&&"LI"==h.tagName)){if(f=b.markers.split(),!f)return!1;f.outerHTML=e}else f.outerHTML=e}else b.el.innerHTML=b.el.innerHTML+e}u(),b.events.trigger("html.inserted")}function J(c){var d=null;if("undefined"==typeof c&&(d=b.selection.element()),b.opts.keepFormatOnDelete)return!1;var e=d?(d.textContent.match(/\u200B/g)||[]).length-d.querySelectorAll(".fr-marker").length:0,f=(b.el.textContent.match(/\u200B/g)||[]).length-b.el.querySelectorAll(".fr-marker").length;if(f==e)return!1;var g,h;do{h=!1,g=b.el.querySelectorAll("*:not(.fr-marker)");for(var i=0;i<g.length;i++){var j=g[i];if(d!=j){var k=j.textContent;0===j.children.length&&1===k.length&&8203==k.charCodeAt(0)&&(a(j).remove(),h=!0)}}}while(h)}function K(){var a=function(){J(),b.placeholder&&setTimeout(b.placeholder.refresh,0)};b.events.on("mouseup",a),b.events.on("keydown",a),b.events.on("contentChanged",v)}return{defaultTag:c,emptyBlocks:d,emptyBlockTagsQuery:e,blockTagsQuery:f,fillEmptyBlocks:l,cleanEmptyTags:g,cleanWhiteTags:J,cleanBlankSpaces:n,blocks:m,getDoctype:q,set:z,get:D,getSelected:E,insert:I,wrap:j,unwrap:k,escapeEntities:H,checkIfEmpty:v,extractNode:w,extractNodeAttrs:x,extractDoctype:y,cleanBRs:t,_init:K}},a.extend(a.FE.DEFAULTS,{height:null,heightMax:null,heightMin:null,width:null}),a.FE.MODULES.size=function(a){function b(){c(),a.opts.height&&a.$el.css("minHeight",a.opts.height-a.helpers.getPX(a.$el.css("padding-top"))-a.helpers.getPX(a.$el.css("padding-bottom"))),a.$iframe.height(a.$el.outerHeight(!0))}function c(){a.opts.heightMin?a.$el.css("minHeight",a.opts.heightMin):a.$el.css("minHeight",""),a.opts.heightMax?(a.$wp.css("maxHeight",a.opts.heightMax),a.$wp.css("overflow","auto")):(a.$wp.css("maxHeight",""),a.$wp.css("overflow","")),a.opts.height?(a.$wp.height(a.opts.height),a.$wp.css("overflow","auto"),a.$el.css("minHeight",a.opts.height-a.helpers.getPX(a.$el.css("padding-top"))-a.helpers.getPX(a.$el.css("padding-bottom")))):(a.$wp.css("height",""),a.opts.heightMin||a.$el.css("minHeight",""),a.opts.heightMax||a.$wp.css("overflow","")),a.opts.width&&a.$box.width(a.opts.width)}function d(){return!!a.$wp&&(c(),void(a.$iframe&&(a.events.on("keyup",b),a.events.on("commands.after",b),a.events.on("html.set",b),a.events.on("init",b),a.events.on("initialized",b))))}return{_init:d,syncIframe:b,refresh:c}},a.extend(a.FE.DEFAULTS,{language:null}),a.FE.LANGUAGE={},a.FE.MODULES.language=function(b){function c(a){return e&&e.translation[a]?e.translation[a]:a}function d(){a.FE.LANGUAGE&&(e=a.FE.LANGUAGE[b.opts.language]),e&&e.direction&&(b.opts.direction=e.direction)}var e;return{_init:d,translate:c}},a.extend(a.FE.DEFAULTS,{placeholderText:"Type something"}),a.FE.MODULES.placeholder=function(b){function c(){b.$placeholder||g();var c=0,d=0,e=0,f=0,h=0,i=0,j=b.node.contents(b.el),k=a(b.selection.element()).css("text-align");if(j.length&&j[0].nodeType==Node.ELEMENT_NODE){var l=a(j[0]);!b.opts.toolbarInline&&b.ready&&(c=b.helpers.getPX(l.css("margin-top")),f=b.helpers.getPX(l.css("padding-top")),d=b.helpers.getPX(l.css("margin-left")),e=b.helpers.getPX(l.css("margin-right")),h=b.helpers.getPX(l.css("padding-left")),i=b.helpers.getPX(l.css("padding-right"))),b.$placeholder.css("font-size",l.css("font-size")),b.$placeholder.css("line-height",l.css("line-height"))}else b.$placeholder.css("font-size",b.$el.css("font-size")),b.$placeholder.css("line-height",b.$el.css("line-height"));b.$wp.addClass("show-placeholder"),b.$placeholder.css({marginTop:Math.max(b.helpers.getPX(b.$el.css("margin-top")),c),paddingTop:Math.max(b.helpers.getPX(b.$el.css("padding-top")),f),paddingLeft:Math.max(b.helpers.getPX(b.$el.css("padding-left")),h),marginLeft:Math.max(b.helpers.getPX(b.$el.css("margin-left")),d),paddingRight:Math.max(b.helpers.getPX(b.$el.css("padding-right")),i),marginRight:Math.max(b.helpers.getPX(b.$el.css("margin-right")),e),textAlign:k}).text(b.language.translate(b.opts.placeholderText||b.$oel.attr("placeholder")||"")),b.$placeholder.html(b.$placeholder.text().replace(/\n/g,"<br>"))}function d(){b.$wp.removeClass("show-placeholder")}function e(){return!b.$wp||b.node.hasClass(b.$wp.get(0),"show-placeholder")}function f(){return!!b.$wp&&void(b.core.isEmpty()?c():d())}function g(){b.$placeholder=a('<span class="fr-placeholder"></span>'),b.$wp.append(b.$placeholder)}function h(){return!!b.$wp&&void b.events.on("init input keydown keyup contentChanged initialized",f)}return{_init:h,show:c,hide:d,refresh:f,isVisible:e}},a.FE.MODULES.edit=function(a){function b(){if(a.browser.mozilla)try{a.doc.execCommand("enableObjectResizing",!1,"false"),a.doc.execCommand("enableInlineTableEditing",!1,"false")}catch(b){}if(a.browser.msie)try{a.doc.body.addEventListener("mscontrolselect",function(a){return a.preventDefault(),!1})}catch(b){}}function c(){a.$wp?(a.$el.attr("contenteditable",!0),a.$el.removeClass("fr-disabled").attr("aria-disabled",!1),a.$tb&&a.$tb.removeClass("fr-disabled").attr("aria-disabled",!1),b()):a.$el.is("a")&&a.$el.attr("contenteditable",!0),f=!1}function d(){a.$wp?(a.$el.attr("contenteditable",!1),a.$el.addClass("fr-disabled").attr("aria-disabled",!0),a.$tb&&a.$tb.addClass("fr-disabled").attr("aria-disabled",!0)):a.$el.is("a")&&a.$el.attr("contenteditable",!1),f=!0}function e(){return f}var f=!1;return{on:c,off:d,disableDesign:b,isDisabled:e}},a.extend(a.FE.DEFAULTS,{editorClass:null,typingTimer:500,iframe:!1,requestWithCORS:!0,requestWithCredentials:!1,requestHeaders:{},useClasses:!0,spellcheck:!0,iframeStyle:'html{margin:0px;height:auto;}body{height:auto;padding:10px;background:transparent;color:#000000;position:relative;z-index: 2;-webkit-user-select:auto;margin:0px;overflow:hidden;min-height:20px;}body:after{content:"";display:block;clear:both;}',iframeStyleFiles:[],direction:"auto",zIndex:1,disableRightClick:!1,scrollableContainer:"body",keepFormatOnDelete:!1,theme:null}),a.FE.MODULES.core=function(b){function c(c){if(b.opts.iframe){b.$head.find("style[data-fr-style], link[data-fr-style]").remove(),b.$head.append('<style data-fr-style="true">'+c+"</style>");for(var d=0;d<b.opts.iframeStyleFiles.length;d++){var e=a('<link data-fr-style="true" rel="stylesheet" href="'+b.opts.iframeStyleFiles[d]+'">');e.get(0).addEventListener("load",b.size.syncIframe),b.$head.append(e)}}}function d(){b.opts.iframe||b.$el.addClass("fr-element fr-view")}function e(){if(b.$box.addClass("fr-box"+(b.opts.editorClass?" "+b.opts.editorClass:"")),b.$wp.addClass("fr-wrapper"),d(),b.opts.iframe){b.$iframe.addClass("fr-iframe"),b.$el.addClass("fr-view");for(var a=0;a<b.o_doc.styleSheets.length;a++){var c;try{c=b.o_doc.styleSheets[a].cssRules}catch(e){}if(c)for(var f=0,g=c.length;f<g;f++)!c[f].selectorText||0!==c[f].selectorText.indexOf(".fr-view")&&0!==c[f].selectorText.indexOf(".fr-element")||c[f].style.cssText.length>0&&(0===c[f].selectorText.indexOf(".fr-view")?b.opts.iframeStyle+=c[f].selectorText.replace(/\.fr-view/g,"body")+"{"+c[f].style.cssText+"}":b.opts.iframeStyle+=c[f].selectorText.replace(/\.fr-element/g,"body")+"{"+c[f].style.cssText+"}")}}"auto"!=b.opts.direction&&b.$box.removeClass("fr-ltr fr-rtl").addClass("fr-"+b.opts.direction),b.$el.attr("dir",b.opts.direction),b.$wp.attr("dir",b.opts.direction),b.opts.zIndex>1&&b.$box.css("z-index",b.opts.zIndex),b.opts.theme&&b.$box.addClass(b.opts.theme+"-theme")}function f(){return b.node.isEmpty(b.el)}function g(){b.drag_support={filereader:"undefined"!=typeof FileReader,formdata:!!b.win.FormData,progress:"upload"in new XMLHttpRequest}}function h(a,c){var d=new XMLHttpRequest;d.open(c,a,!0),b.opts.requestWithCredentials&&(d.withCredentials=!0);for(var e in b.opts.requestHeaders)b.opts.requestHeaders.hasOwnProperty(e)&&d.setRequestHeader(e,b.opts.requestHeaders[e]);return d}function i(a){"TEXTAREA"==b.$oel.get(0).tagName&&b.$oel.val(a),b.$wp&&("TEXTAREA"==b.$oel.get(0).tagName?(b.$el.html(""),b.$wp.html(""),b.$box.replaceWith(b.$oel),b.$oel.show()):(b.$wp.replaceWith(a),b.$el.html(""),b.$box.removeClass("fr-view fr-ltr fr-box "+(b.opts.editorClass||"")),b.opts.theme&&b.$box.addClass(b.opts.theme+"-theme"))),this.$wp=null,this.$el=null,this.el=null,this.$box=null}function j(){return b.browser.mozilla&&b.helpers.isMobile()?b.selection.inEditor():b.node.hasFocus(b.el)||b.$el.find("*:focus").length>0}function k(a){if(!a)return!1;var c=a.data("instance");return!!c&&c.id==b.id}function l(){if(a.FE.INSTANCES.push(b),g(),b.$wp){e(),b.html.set(b._original_html),b.$el.attr("spellcheck",b.opts.spellcheck),b.helpers.isMobile()&&(b.$el.attr("autocomplete",b.opts.spellcheck?"on":"off"),b.$el.attr("autocorrect",b.opts.spellcheck?"on":"off"),b.$el.attr("autocapitalize",b.opts.spellcheck?"on":"off")),b.opts.disableRightClick&&b.events.$on(b.$el,"contextmenu",function(a){if(2==a.button)return!1});try{b.doc.execCommand("styleWithCSS",!1,!1)}catch(c){}}"TEXTAREA"==b.$oel.get(0).tagName&&(b.events.on("contentChanged",function(){b.$oel.val(b.html.get())}),b.events.on("form.submit",function(){b.$oel.val(b.html.get())}),b.events.on("form.reset",function(){b.html.set(b._original_html)}),b.$oel.val(b.html.get())),b.helpers.isIOS()&&b.events.$on(b.$doc,"selectionchange",function(){b.$doc.get(0).hasFocus()||b.$win.get(0).focus()}),b.events.trigger("init")}return{_init:l,destroy:i,isEmpty:f,getXHR:h,injectStyle:c,hasFocus:j,sameInstance:k}},a.FE.MODULES.cursorLists=function(b){function c(a){for(var b=a;"LI"!=b.tagName;)b=b.parentNode;return b}function d(a){for(var c=a;!b.node.isList(c);)c=c.parentNode;return c}function e(e){var f,g=c(e),h=g.nextSibling,i=g.previousSibling,j=b.html.defaultTag();if(b.node.isEmpty(g,!0)&&h){for(var k="",l="",m=e.parentNode;!b.node.isList(m)&&m.parentNode&&"LI"!==m.parentNode.tagName;)k=b.node.openTagString(m)+k,l+=b.node.closeTagString(m),m=m.parentNode;k=b.node.openTagString(m)+k,l+=b.node.closeTagString(m);var n="";for(n=m.parentNode&&"LI"==m.parentNode.tagName?l+"<li>"+a.FE.MARKERS+"<br>"+k:j?l+"<"+j+">"+a.FE.MARKERS+"<br></"+j+">"+k:l+a.FE.MARKERS+"<br>"+k,a(g).html('<span id="fr-break"></span>');["UL","OL"].indexOf(m.tagName)<0||m.parentNode&&"LI"===m.parentNode.tagName;)m=m.parentNode;var o=b.node.openTagString(m)+a(m).html()+b.node.closeTagString(m);o=o.replace(/<span id="fr-break"><\/span>/g,n),a(m).replaceWith(o),b.$el.find("li:empty").remove()}else i&&h||!b.node.isEmpty(g,!0)?(a(g).before("<li><br></li>"),a(e).remove()):i?(f=d(g),f.parentNode&&"LI"==f.parentNode.tagName?a(f.parentNode).after("<li>"+a.FE.MARKERS+"<br></li>"):j?a(f).after("<"+j+">"+a.FE.MARKERS+"<br></"+j+">"):a(f).after(a.FE.MARKERS+"<br>"),a(g).remove()):(f=d(g),f.parentNode&&"LI"==f.parentNode.tagName?h?a(f.parentNode).before("<li>"+a.FE.MARKERS+"<br></li>"):a(f.parentNode).after("<li>"+a.FE.MARKERS+"<br></li>"):j?a(f).before("<"+j+">"+a.FE.MARKERS+"<br></"+j+">"):a(f).before(a.FE.MARKERS+"<br>"),a(g).remove())}function f(d){for(var e=c(d),f="",g=d,h="",i="";g!=e;){g=g.parentNode;var j="A"==g.tagName&&b.cursor.isAtEnd(d,g)?"fr-to-remove":"";h=b.node.openTagString(a(g).clone().addClass(j).get(0))+h,i=b.node.closeTagString(g)+i}f=i+f+h+a.FE.MARKERS,a(d).replaceWith('<span id="fr-break"></span>');var k=b.node.openTagString(e)+a(e).html()+b.node.closeTagString(e);k=k.replace(/<span id="fr-break"><\/span>/g,f),a(e).replaceWith(k)}function g(d){for(var e=c(d),f=a.FE.MARKERS,g="",h=d,i=!1;h!=e;){h=h.parentNode;var j="A"==h.tagName&&b.cursor.isAtEnd(d,h)?"fr-to-remove":"";i||h==e||b.node.isBlock(h)||(i=!0,g+=a.FE.INVISIBLE_SPACE),g=b.node.openTagString(a(h).clone().addClass(j).get(0))+g,f+=b.node.closeTagString(h)}var k=g+f;a(d).remove(),a(e).after(k)}function h(e){var f=c(e),g=f.previousSibling;if(g){g=a(g).find(b.html.blockTagsQuery()).get(-1)||g,a(e).replaceWith(a.FE.MARKERS);var h=b.node.contents(g);h.length&&"BR"==h[h.length-1].tagName&&a(h[h.length-1]).remove(),a(f).find(b.html.blockTagsQuery()).not("ol, ul, table").each(function(){this.parentNode==f&&a(this).replaceWith(a(this).html()+(b.node.isEmpty(this)?"":"<br>"))});for(var i,j=b.node.contents(f)[0];j&&!b.node.isList(j);)i=j.nextSibling,a(g).append(j),j=i;for(g=f.previousSibling;j;)i=j.nextSibling,a(g).append(j),j=i;a(f).remove()}else{var k=d(f);if(a(e).replaceWith(a.FE.MARKERS),k.parentNode&&"LI"==k.parentNode.tagName){var l=k.previousSibling;b.node.isBlock(l)?(a(f).find(b.html.blockTagsQuery()).not("ol, ul, table").each(function(){this.parentNode==f&&a(this).replaceWith(a(this).html()+(b.node.isEmpty(this)?"":"<br>"))}),a(l).append(a(f).html())):a(k).before(a(f).html())}else{var m=b.html.defaultTag();m&&0===a(f).find(b.html.blockTagsQuery()).length?a(k).before("<"+m+">"+a(f).html()+"</"+m+">"):(a(k).before(a(f).html()),b.html.wrap())}a(f).remove(),0===a(k).find("li").length&&a(k).remove()}}function i(d){var e,f=c(d),g=f.nextSibling;if(g){e=b.node.contents(g),e.length&&"BR"==e[0].tagName&&a(e[0]).remove(),a(g).find(b.html.blockTagsQuery()).not("ol, ul, table").each(function(){this.parentNode==g&&a(this).replaceWith(a(this).html()+(b.node.isEmpty(this)?"":"<br>"))});for(var h,i=d,j=b.node.contents(g)[0];j&&!b.node.isList(j);)h=j.nextSibling,a(i).after(j),i=j,j=h;for(;j;)h=j.nextSibling,a(f).append(j),j=h;a(d).replaceWith(a.FE.MARKERS),a(g).remove()}else{for(var k=f;!k.nextSibling&&k!=b.el;)k=k.parentNode;if(k==b.el)return!1;if(k=k.nextSibling,b.node.isBlock(k))a.FE.NO_DELETE_TAGS.indexOf(k.tagName)<0&&(a(d).replaceWith(a.FE.MARKERS),e=b.node.contents(f),e.length&&"BR"==e[e.length-1].tagName&&a(e[e.length-1]).remove(),a(f).append(a(k).html()),a(k).remove());else for(e=b.node.contents(f),e.length&&"BR"==e[e.length-1].tagName&&a(e[e.length-1]).remove(),a(d).replaceWith(a.FE.MARKERS);k&&!b.node.isBlock(k)&&"BR"!=k.tagName;)a(f).append(a(k)),k=k.nextSibling}}return{_startEnter:e,_middleEnter:f,_endEnter:g,_backspace:h,_del:i}},a.FE.NO_DELETE_TAGS=["TH","TD","TR","TABLE","FORM"],a.FE.SIMPLE_ENTER_TAGS=["TH","TD","LI","DL","DT","FORM"],a.FE.MODULES.cursor=function(b){function c(a){return!!a&&(!!b.node.isBlock(a)||(a.nextSibling&&a.nextSibling.nodeType==Node.TEXT_NODE&&0===a.nextSibling.textContent.replace(/\u200b/g,"").length?c(a.nextSibling):!a.nextSibling&&c(a.parentNode)))}function d(a){return!!a&&(!!b.node.isBlock(a)||(a.previousSibling&&a.previousSibling.nodeType==Node.TEXT_NODE&&0===a.previousSibling.textContent.replace(/\u200b/g,"").length?d(a.previousSibling):!a.previousSibling&&d(a.parentNode)))}function e(a,c){return!!a&&(a!=b.$wp.get(0)&&(a.previousSibling&&a.previousSibling.nodeType==Node.TEXT_NODE&&0===a.previousSibling.textContent.replace(/\u200b/g,"").length?e(a.previousSibling,c):!a.previousSibling&&(a.parentNode==c||e(a.parentNode,c))))}function f(a,c){return!!a&&(a!=b.$wp.get(0)&&(a.nextSibling&&a.nextSibling.nodeType==Node.TEXT_NODE&&0===a.nextSibling.textContent.replace(/\u200b/g,"").length?f(a.nextSibling,c):!a.nextSibling&&(a.parentNode==c||f(a.parentNode,c))))}function g(c){return a(c).parentsUntil(b.$el,"LI").length>0&&0===a(c).parentsUntil("LI","TABLE").length}function h(c){var d=a(c).parentsUntil(b.$el,"BLOCKQUOTE").length>0,e=b.node.deepestParent(c,[],!d);if(e&&"BLOCKQUOTE"==e.tagName){var f=b.node.deepestParent(c,[a(c).parentsUntil(b.$el,"BLOCKQUOTE").get(0)]);f&&f.previousSibling&&(e=f)}if(null!==e){var g,h=e.previousSibling;if(b.node.isBlock(e)&&b.node.isEditable(e)&&h&&a.FE.NO_DELETE_TAGS.indexOf(h.tagName)<0)if(b.node.isDeletable(h))a(h).remove(),a(c).replaceWith(a.FE.MARKERS);else if(b.node.isEditable(h))if(b.node.isBlock(h))if(b.node.isEmpty(h)&&!b.node.isList(h))a(h).remove();else{if(b.node.isList(h)&&(h=a(h).find("li:last").get(0)),g=b.node.contents(h),g.length&&"BR"==g[g.length-1].tagName&&a(g[g.length-1]).remove(),"BLOCKQUOTE"==h.tagName&&"BLOCKQUOTE"!=e.tagName)for(g=b.node.contents(h);g.length&&b.node.isBlock(g[g.length-1]);)h=g[g.length-1],g=b.node.contents(h);else if("BLOCKQUOTE"!=h.tagName&&"BLOCKQUOTE"==e.tagName)for(g=b.node.contents(e);g.length&&b.node.isBlock(g[0]);)e=g[0],g=b.node.contents(e);a(c).replaceWith(a.FE.MARKERS),a(h).append(b.node.isEmpty(e)?a.FE.MARKERS:e.innerHTML),a(e).remove()}else a(c).replaceWith(a.FE.MARKERS),"BLOCKQUOTE"==e.tagName&&h.nodeType==Node.ELEMENT_NODE?a(h).remove():(a(h).after(b.node.isEmpty(e)?"":a(e).html()),a(e).remove(),"BR"==h.tagName&&a(h).remove())}}function i(c){for(var d=c;!d.previousSibling;)if(d=d.parentNode,b.node.isElement(d))return!1;d=d.previousSibling;var e;if(!b.node.isBlock(d)&&b.node.isEditable(d)){for(e=b.node.contents(d);d.nodeType!=Node.TEXT_NODE&&!b.node.isDeletable(d)&&e.length&&b.node.isEditable(d);)d=e[e.length-1],e=b.node.contents(d);if(d.nodeType==Node.TEXT_NODE){if(b.helpers.isIOS())return!0;var f=d.textContent,g=f.length-1;if(b.opts.tabSpaces&&f.length>=b.opts.tabSpaces){var h=f.substr(f.length-b.opts.tabSpaces,f.length-1);0===h.replace(/ /g,"").replace(new RegExp(a.FE.UNICODE_NBSP,"g"),"").length&&(g=f.length-b.opts.tabSpaces)}d.textContent=f.substring(0,g),d.textContent.length&&55357==d.textContent.charCodeAt(d.textContent.length-1)&&(d.textContent=d.textContent.substr(0,d.textContent.length-1));var i=f.length!=d.textContent.length;0===d.textContent.length?i&&b.opts.keepFormatOnDelete?a(d).after(a.FE.INVISIBLE_SPACE+a.FE.MARKERS):2!=d.parentNode.childNodes.length||d.parentNode!=c.parentNode||b.node.isBlock(d.parentNode)||b.node.isElement(d.parentNode)?(a(d).after(a.FE.MARKERS),b.node.isElement(d.parentNode)&&!c.nextSibling&&d.previousSibling&&"BR"==d.previousSibling.tagName&&a(c).after("<br>"),d.parentNode.removeChild(d)):(a(d.parentNode).after(a.FE.MARKERS),a(d.parentNode).remove()):a(d).after(a.FE.MARKERS)}else b.node.isDeletable(d)?(a(d).after(a.FE.MARKERS),a(d).remove()):b.events.trigger("node.remove",[a(d)])!==!1&&(a(d).after(a.FE.MARKERS),a(d).remove())}else if(a.FE.NO_DELETE_TAGS.indexOf(d.tagName)<0&&(b.node.isEditable(d)||b.node.isDeletable(d)))if(b.node.isDeletable(d))a(c).replaceWith(a.FE.MARKERS),a(d).remove();else if(b.node.isEmpty(d)&&!b.node.isList(d))a(d).remove(),a(c).replaceWith(a.FE.MARKERS);else{for(b.node.isList(d)&&(d=a(d).find("li:last").get(0)),e=b.node.contents(d),e&&"BR"==e[e.length-1].tagName&&a(e[e.length-1]).remove(),e=b.node.contents(d);e&&b.node.isBlock(e[e.length-1]);)d=e[e.length-1],e=b.node.contents(d);a(d).append(a.FE.MARKERS);for(var j=c;!j.previousSibling;)j=j.parentNode;for(;j&&"BR"!==j.tagName&&!b.node.isBlock(j);){var k=j;j=j.nextSibling,a(d).append(k)}j&&"BR"==j.tagName&&a(j).remove(),a(c).remove()}else c.nextSibling&&"BR"==c.nextSibling.tagName&&a(c.nextSibling).remove()}function j(){var f=!1,j=b.markers.insert();if(!j)return!0;for(var k=j.parentNode;k&&!b.node.isElement(k);){if("false"===k.getAttribute("contenteditable"))return a(j).replaceWith(a.FE.MARKERS),b.selection.restore(),!1;if("true"===k.getAttribute("contenteditable"))break;k=k.parentNode}b.el.normalize();var l=j.previousSibling;if(l){var m=l.textContent;m&&m.length&&8203==m.charCodeAt(m.length-1)&&(1==m.length?a(l).remove():(l.textContent=l.textContent.substr(0,m.length-1),l.textContent.length&&55357==l.textContent.charCodeAt(l.textContent.length-1)&&(l.textContent=l.textContent.substr(0,l.textContent.length-1))))}return c(j)?f=i(j):d(j)?g(j)&&e(j,a(j).parents("li:first").get(0))?b.cursorLists._backspace(j):h(j):f=i(j),a(j).remove(),n(),b.html.fillEmptyBlocks(!0),b.opts.htmlUntouched||(b.html.cleanEmptyTags(),b.clean.quotes(),b.clean.lists()),b.spaces.normalizeAroundCursor(),b.selection.restore(),f}function k(c){var d=a(c).parentsUntil(b.$el,"BLOCKQUOTE").length>0,e=b.node.deepestParent(c,[],!d);if(e&&"BLOCKQUOTE"==e.tagName){var f=b.node.deepestParent(c,[a(c).parentsUntil(b.$el,"BLOCKQUOTE").get(0)]);f&&f.nextSibling&&(e=f)}if(null!==e){var g,h=e.nextSibling;if(b.node.isBlock(e)&&(b.node.isEditable(e)||b.node.isDeletable(e))&&h&&a.FE.NO_DELETE_TAGS.indexOf(h.tagName)<0)if(b.node.isDeletable(h))a(h).remove(),a(c).replaceWith(a.FE.MARKERS);else if(b.node.isBlock(h)&&b.node.isEditable(h))if(b.node.isList(h))if(b.node.isEmpty(e,!0))a(e).remove(),a(h).find("li:first").prepend(a.FE.MARKERS);else{var i=a(h).find("li:first");"BLOCKQUOTE"==e.tagName&&(g=b.node.contents(e),g.length&&b.node.isBlock(g[g.length-1])&&(e=g[g.length-1])),0===i.find("ul, ol").length&&(a(c).replaceWith(a.FE.MARKERS),i.find(b.html.blockTagsQuery()).not("ol, ul, table").each(function(){this.parentNode==i.get(0)&&a(this).replaceWith(a(this).html()+(b.node.isEmpty(this)?"":"<br>"))}),a(e).append(b.node.contents(i.get(0))),i.remove(),0===a(h).find("li").length&&a(h).remove())}else{if(g=b.node.contents(h),g.length&&"BR"==g[0].tagName&&a(g[0]).remove(),"BLOCKQUOTE"!=h.tagName&&"BLOCKQUOTE"==e.tagName)for(g=b.node.contents(e);g.length&&b.node.isBlock(g[g.length-1]);)e=g[g.length-1],g=b.node.contents(e);else if("BLOCKQUOTE"==h.tagName&&"BLOCKQUOTE"!=e.tagName)for(g=b.node.contents(h);g.length&&b.node.isBlock(g[0]);)h=g[0],g=b.node.contents(h);a(c).replaceWith(a.FE.MARKERS),a(e).append(h.innerHTML),a(h).remove()}else{for(a(c).replaceWith(a.FE.MARKERS);h&&"BR"!==h.tagName&&!b.node.isBlock(h)&&b.node.isEditable(h);){var j=h;h=h.nextSibling,a(e).append(j)}h&&"BR"==h.tagName&&b.node.isEditable(h)&&a(h).remove()}}}function l(d){for(var e=d;!e.nextSibling;)if(e=e.parentNode,b.node.isElement(e))return!1;if(e=e.nextSibling,"BR"==e.tagName&&b.node.isEditable(e))if(e.nextSibling){if(b.node.isBlock(e.nextSibling)&&b.node.isEditable(e.nextSibling)){if(!(a.FE.NO_DELETE_TAGS.indexOf(e.nextSibling.tagName)<0))return void a(e).remove();e=e.nextSibling,a(e.previousSibling).remove()}}else if(c(e)){if(g(d))b.cursorLists._del(d);else{var f=b.node.deepestParent(e);f&&(a(e).remove(),k(d))}return}var h;if(!b.node.isBlock(e)&&b.node.isEditable(e)){for(h=b.node.contents(e);e.nodeType!=Node.TEXT_NODE&&h.length&&!b.node.isDeletable(e)&&b.node.isEditable(e);)e=h[0],h=b.node.contents(e);e.nodeType==Node.TEXT_NODE?(a(e).before(a.FE.MARKERS),e.textContent.length&&55357==e.textContent.charCodeAt(0)?e.textContent=e.textContent.substring(2,e.textContent.length):e.textContent=e.textContent.substring(1,e.textContent.length)):b.node.isDeletable(e)?(a(e).before(a.FE.MARKERS),a(e).remove()):b.events.trigger("node.remove",[a(e)])!==!1&&(a(e).before(a.FE.MARKERS),a(e).remove()),a(d).remove()}else if(a.FE.NO_DELETE_TAGS.indexOf(e.tagName)<0&&(b.node.isEditable(e)||b.node.isDeletable(e)))if(b.node.isDeletable(e))a(d).replaceWith(a.FE.MARKERS),a(e).remove();else if(b.node.isList(e))d.previousSibling?(a(e).find("li:first").prepend(d),b.cursorLists._backspace(d)):(a(e).find("li:first").prepend(a.FE.MARKERS),a(d).remove());else if(h=b.node.contents(e),h&&"BR"==h[0].tagName&&a(h[0]).remove(),h&&"BLOCKQUOTE"==e.tagName){var i=h[0];for(a(d).before(a.FE.MARKERS);i&&"BR"!=i.tagName;){var j=i;i=i.nextSibling,a(d).before(j)}i&&"BR"==i.tagName&&a(i).remove()}else a(d).after(a(e).html()).after(a.FE.MARKERS),a(e).remove()}function m(){var e=b.markers.insert();if(!e)return!1;if(b.el.normalize(),c(e))if(g(e))if(0===a(e).parents("li:first").find("ul, ol").length)b.cursorLists._del(e);else{var f=a(e).parents("li:first").find("ul:first, ol:first").find("li:first");f=f.find(b.html.blockTagsQuery()).get(-1)||f,f.prepend(e),b.cursorLists._backspace(e)}else k(e);else l(d(e)?e:e);a(e).remove(),n(),b.html.fillEmptyBlocks(!0),b.opts.htmlUntouched||(b.html.cleanEmptyTags(),b.clean.quotes(),b.clean.lists()),b.spaces.normalizeAroundCursor(),b.selection.restore()}function n(){for(var a=b.el.querySelectorAll("blockquote:empty"),c=0;c<a.length;c++)a[c].parentNode.removeChild(a[c])}function o(){b.$el.find(".fr-to-remove").each(function(){for(var c=b.node.contents(this),d=0;d<c.length;d++)c[d].nodeType==Node.TEXT_NODE&&(c[d].textContent=c[d].textContent.replace(/\u200B/g,""));a(this).replaceWith(this.innerHTML)})}function p(c,d,e){var g,h=b.node.deepestParent(c,[],!e);if(h&&"BLOCKQUOTE"==h.tagName)return f(c,h)?(g=b.html.defaultTag(),g?a(h).after("<"+g+">"+a.FE.MARKERS+"<br></"+g+">"):a(h).after(a.FE.MARKERS+"<br>"),a(c).remove(),!1):(r(c,d,e),!1);if(null==h)g=b.html.defaultTag(),g&&b.node.isElement(c.parentNode)?a(c).replaceWith("<"+g+">"+a.FE.MARKERS+"<br></"+g+">"):a(c).replaceWith((b.node.isEmpty(c.parentNode,!0)?"":"<br/>")+a.FE.MARKERS+"<br/>");else{var i=c,j="";b.node.isBlock(h)&&!d||(j="<br/>");var k="",l="";g=b.html.defaultTag();var m="",n="";g&&b.node.isBlock(h)&&(m="<"+g+">",n="</"+g+">",h.tagName==g.toUpperCase()&&(m=b.node.openTagString(a(h).clone().removeAttr("id").get(0))));do if(i=i.parentNode,!d||i!=h||d&&!b.node.isBlock(h))if(k+=b.node.closeTagString(i),i==h&&b.node.isBlock(h))l=m+l;else{var o="A"==i.tagName&&f(c,i)?"fr-to-remove":"";l=b.node.openTagString(a(i).clone().addClass(o).get(0))+l}while(i!=h);j=k+j+l+(c.parentNode==h&&b.node.isBlock(h)?"":a.FE.INVISIBLE_SPACE)+a.FE.MARKERS,b.node.isBlock(h)&&!a(h).find("*:last").is("br")&&a(h).append("<br/>"),a(c).after('<span id="fr-break"></span>'),a(c).remove(),h.nextSibling&&!b.node.isBlock(h.nextSibling)||b.node.isBlock(h)||a(h).after("<br>");var p;p=!d&&b.node.isBlock(h)?b.node.openTagString(h)+a(h).html()+n:b.node.openTagString(h)+a(h).html()+b.node.closeTagString(h),p=p.replace(/<span id="fr-break"><\/span>/g,j),a(h).replaceWith(p)}}function q(c,d,g){var h,i=b.node.deepestParent(c,[],!g);if(i&&"TABLE"==i.tagName)return a(i).find("td:first, th:first").prepend(c),q(c,d,g);if(i&&"BLOCKQUOTE"==i.tagName){if(e(c,i))return h=b.html.defaultTag(),h?a(i).before("<"+h+">"+a.FE.MARKERS+"<br></"+h+">"):a(i).before(a.FE.MARKERS+"<br>"),a(c).remove(),!1;f(c,i)?p(c,d,!0):r(c,d,!0)}if(null==i)h=b.html.defaultTag(),h&&b.node.isElement(c.parentNode)?a(c).replaceWith("<"+h+">"+a.FE.MARKERS+"<br></"+h+">"):a(c).replaceWith("<br>"+a.FE.MARKERS);else{if(b.node.isBlock(i))if(d)a(c).remove(),a(i).prepend("<br>"+a.FE.MARKERS);else{if(b.node.isEmpty(i,!0))return p(c,d,g);a(i).before(b.node.openTagString(a(i).clone().removeAttr("id").get(0))+"<br>"+b.node.closeTagString(i))}else a(i).before("<br>");a(c).remove()}}function r(c,d,g){var h=b.node.deepestParent(c,[],!g);if(null==h)b.html.defaultTag()&&c.parentNode===b.el?a(c).replaceWith("<"+b.html.defaultTag()+">"+a.FE.MARKERS+"<br></"+b.html.defaultTag()+">"):(c.nextSibling&&!b.node.isBlock(c.nextSibling)||a(c).after("<br>"),a(c).replaceWith("<br>"+a.FE.MARKERS));else{var i=c,j="";"PRE"==h.tagName&&(d=!0),b.node.isBlock(h)&&!d||(j="<br>");var k="",l="";do{var m=i;if(i=i.parentNode,"BLOCKQUOTE"==h.tagName&&b.node.isEmpty(m)&&!b.node.hasClass(m,"fr-marker")&&a(m).find(c).length>0&&a(m).after(c),("BLOCKQUOTE"!=h.tagName||!f(c,i)&&!e(c,i))&&(!d||i!=h||d&&!b.node.isBlock(h))){k+=b.node.closeTagString(i);var n="A"==i.tagName&&f(c,i)?"fr-to-remove":"";l=b.node.openTagString(a(i).clone().addClass(n).removeAttr("id").get(0))+l}}while(i!=h);var o=h==c.parentNode&&b.node.isBlock(h)||c.nextSibling;if("BLOCKQUOTE"==h.tagName){c.previousSibling&&b.node.isBlock(c.previousSibling)&&c.nextSibling&&"BR"==c.nextSibling.tagName&&(a(c.nextSibling).after(c),c.nextSibling&&"BR"==c.nextSibling.tagName&&a(c.nextSibling).remove());var p=b.html.defaultTag();j=k+j+(p?"<"+p+">":"")+a.FE.MARKERS+"<br>"+(p?"</"+p+">":"")+l}else j=k+j+l+(o?"":a.FE.INVISIBLE_SPACE)+a.FE.MARKERS;a(c).replaceWith('<span id="fr-break"></span>');var q=b.node.openTagString(h)+a(h).html()+b.node.closeTagString(h);q=q.replace(/<span id="fr-break"><\/span>/g,j),a(h).replaceWith(q)}}function s(e){var f=b.markers.insert();if(!f)return!0;b.el.normalize();var h=!1;
a(f).parentsUntil(b.$el,"BLOCKQUOTE").length>0&&(e=!1,h=!0),a(f).parentsUntil(b.$el,"TD, TH").length&&(h=!1),c(f)?!g(f)||e||h?p(f,e,h):b.cursorLists._endEnter(f):d(f)?!g(f)||e||h?q(f,e,h):b.cursorLists._startEnter(f):!g(f)||e||h?r(f,e,h):b.cursorLists._middleEnter(f),o(),b.opts.htmlUntouched||(b.html.fillEmptyBlocks(!0),b.html.cleanEmptyTags(),b.clean.lists()),b.spaces.normalizeAroundCursor(),b.selection.restore()}return{enter:s,backspace:j,del:m,isAtEnd:f,isAtStart:e}},a.FE.ENTER_P=0,a.FE.ENTER_DIV=1,a.FE.ENTER_BR=2,a.FE.KEYCODE={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,ARROW_LEFT:37,ARROW_UP:38,ARROW_RIGHT:39,ARROW_DOWN:40,DELETE:46,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,FF_SEMICOLON:59,FF_EQUALS:61,QUESTION_MARK:63,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,META:91,NUM_ZERO:96,NUM_ONE:97,NUM_TWO:98,NUM_THREE:99,NUM_FOUR:100,NUM_FIVE:101,NUM_SIX:102,NUM_SEVEN:103,NUM_EIGHT:104,NUM_NINE:105,NUM_MULTIPLY:106,NUM_PLUS:107,NUM_MINUS:109,NUM_PERIOD:110,NUM_DIVISION:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,FF_HYPHEN:173,SEMICOLON:186,DASH:189,EQUALS:187,COMMA:188,HYPHEN:189,PERIOD:190,SLASH:191,APOSTROPHE:192,TILDE:192,SINGLE_QUOTE:222,OPEN_SQUARE_BRACKET:219,BACKSLASH:220,CLOSE_SQUARE_BRACKET:221},a.extend(a.FE.DEFAULTS,{enter:a.FE.ENTER_P,multiLine:!0,tabSpaces:0}),a.FE.MODULES.keys=function(b){function c(a){b.opts.multiLine?b.helpers.isIOS()||(a.preventDefault(),a.stopPropagation(),b.selection.isCollapsed()||b.selection.remove(),b.cursor.enter()):(a.preventDefault(),a.stopPropagation())}function d(a){a.preventDefault(),a.stopPropagation(),b.opts.multiLine&&(b.selection.isCollapsed()||b.selection.remove(),b.cursor.enter(!0))}function e(a){b.selection.isCollapsed()?b.cursor.backspace()||(a.preventDefault(),a.stopPropagation(),z=!1):(a.preventDefault(),a.stopPropagation(),b.selection.remove(),b.html.fillEmptyBlocks(),z=!1),b.placeholder.refresh()}function f(a){a.preventDefault(),a.stopPropagation(),""===b.selection.text()?b.cursor.del():b.selection.remove(),b.placeholder.refresh()}function g(c){var d=b.selection.element();if(!b.helpers.isMobile()&&(b.browser.mozilla||d&&"A"==d.tagName)){c.preventDefault(),c.stopPropagation(),b.selection.isCollapsed()||b.selection.remove();var e=b.markers.insert();if(e){var f=e.previousSibling,g=e.nextSibling;!g&&e.parentNode&&"A"==e.parentNode.tagName?(e.parentNode.insertAdjacentHTML("afterend","&nbsp;"+a.FE.MARKERS),e.parentNode.removeChild(e)):(f&&f.nodeType==Node.TEXT_NODE&&1==f.textContent.length&&160==f.textContent.charCodeAt(0)?f.textContent=f.textContent+" ":e.insertAdjacentHTML("beforebegin","&nbsp;"),e.outerHTML=a.FE.MARKERS),b.selection.restore()}}}function h(){if(b.browser.mozilla&&b.selection.isCollapsed()&&!C){var a=b.selection.ranges(0),c=a.startContainer,d=a.startOffset;c&&c.nodeType==Node.TEXT_NODE&&d<=c.textContent.length&&d>0&&32==c.textContent.charCodeAt(d-1)&&(b.selection.save(),b.spaces.normalize(),b.selection.restore())}}function i(){b.selection.isFull()&&setTimeout(function(){var c=b.html.defaultTag();c?b.$el.html("<"+c+">"+a.FE.MARKERS+"<br/></"+c+">"):b.$el.html(a.FE.MARKERS+"<br/>"),b.selection.restore(),b.placeholder.refresh(),b.button.bulkRefresh(),b.undo.saveStep()},0)}function j(a){if(b.opts.tabSpaces>0)if(b.selection.isCollapsed()){b.undo.saveStep(),a.preventDefault(),a.stopPropagation();for(var c="",d=0;d<b.opts.tabSpaces;d++)c+="&nbsp;";b.html.insert(c),b.placeholder.refresh(),b.undo.saveStep()}else a.preventDefault(),a.stopPropagation(),a.shiftKey?b.commands.outdent():b.commands.indent()}function k(){C=!1}function l(){return C}function m(h){b.events.disableBlur(),z=!0;var i=h.which;if(16===i)return!0;if(229===i)return C=!0,!0;C=!1;var k=t(i)&&!r(h),l=i==a.FE.KEYCODE.BACKSPACE||i==a.FE.KEYCODE.DELETE;if((b.selection.isFull()&&!b.opts.keepFormatOnDelete&&!b.placeholder.isVisible()||l&&b.placeholder.isVisible()&&b.opts.keepFormatOnDelete)&&(k||l)){var m=b.html.defaultTag();if(m?b.$el.html("<"+m+">"+a.FE.MARKERS+"<br/></"+m+">"):b.$el.html(a.FE.MARKERS+"<br/>"),b.selection.restore(),!t(i))return h.preventDefault(),!0}i==a.FE.KEYCODE.ENTER?h.shiftKey?d(h):c(h):i!=a.FE.KEYCODE.BACKSPACE||r(h)||h.altKey?i!=a.FE.KEYCODE.DELETE||r(h)||h.altKey?i==a.FE.KEYCODE.SPACE?g(h):i==a.FE.KEYCODE.TAB?j(h):r(h)||!t(h.which)||b.selection.isCollapsed()||h.ctrlKey||b.selection.remove():b.placeholder.isVisible()?(h.preventDefault(),h.stopPropagation()):f(h):b.placeholder.isVisible()?(h.preventDefault(),h.stopPropagation()):e(h),b.events.enableBlur()}function n(a){for(var c=b.doc.createTreeWalker(a,NodeFilter.SHOW_TEXT,b.node.filter(function(a){return/\u200B/gi.test(a.textContent)}),!1);c.nextNode();){var d=c.currentNode;d.textContent=d.textContent.replace(/\u200B/gi,"")}}function o(){if(!b.$wp)return!0;var c;b.opts.height||b.opts.heightMax?(c=b.position.getBoundingRect().top,b.helpers.isIOS()&&(c-=b.helpers.scrollTop()),b.opts.iframe&&(c+=b.$iframe.offset().top),c>b.$wp.offset().top-b.helpers.scrollTop()+b.$wp.height()-20&&b.$wp.scrollTop(c+b.$wp.scrollTop()-(b.$wp.height()+b.$wp.offset().top)+b.helpers.scrollTop()+20)):(c=b.position.getBoundingRect().top,b.opts.toolbarBottom&&(c+=b.opts.toolbarStickyOffset),b.helpers.isIOS()&&(c-=b.helpers.scrollTop()),b.opts.iframe&&(c+=b.$iframe.offset().top,c-=b.helpers.scrollTop()),c+=b.opts.toolbarStickyOffset,c>b.o_win.innerHeight-20&&a(b.o_win).scrollTop(c+b.helpers.scrollTop()-b.o_win.innerHeight+20),c=b.position.getBoundingRect().top,b.opts.toolbarBottom||(c-=b.opts.toolbarStickyOffset),b.helpers.isIOS()&&(c-=b.helpers.scrollTop()),b.opts.iframe&&(c+=b.$iframe.offset().top,c-=b.helpers.scrollTop()),c<b.$tb.height()+20&&a(b.o_win).scrollTop(c+b.helpers.scrollTop()-b.$tb.height()-20))}function p(){var c=b.selection.element(),d=b.node.blockParent(c);if(d&&"DIV"==d.tagName&&b.selection.info(d).atStart){var e=b.html.defaultTag();d.previousSibling&&"DIV"!=d.previousSibling.tagName&&e&&"div"!=e&&(b.selection.save(),a(d).replaceWith("<"+e+">"+d.innerHTML+"</"+e+">"),b.selection.restore())}}function q(c){if(b.helpers.isAndroid&&b.browser.mozilla)return!0;if(C)return C=!1,!1;if(!b.selection.isCollapsed())return!0;if(c&&(c.which===a.FE.KEYCODE.META||c.which==a.FE.KEYCODE.CTRL))return!0;if(c&&s(c.which))return!0;c&&c.which==a.FE.KEYCODE.ENTER&&b.helpers.isIOS()&&p(),c&&(c.which==a.FE.KEYCODE.ENTER||c.which==a.FE.KEYCODE.BACKSPACE||c.which>=37&&c.which<=40&&!b.browser.msie)&&(c.which==a.FE.KEYCODE.BACKSPACE&&z||o()),b.html.cleanBRs(!0,!0);var d=function(a){if(!a)return!1;var b=a.innerHTML;return b=b.replace(/<span[^>]*? class\s*=\s*["']?fr-marker["']?[^>]+>\u200b<\/span>/gi,""),!!(b&&/\u200B/.test(b)&&b.replace(/\u200B/gi,"").length>0)},e=function(a){var c=/[\u3041-\u3096\u30A0-\u30FF\u4E00-\u9FFF\u3130-\u318F\uAC00-\uD7AF]/gi;return!b.helpers.isIOS()||0===((a.textContent||"").match(c)||[]).length},f=b.selection.element();d(f)&&!b.node.hasClass(f,"fr-marker")&&"IFRAME"!=f.tagName&&e(f)&&(b.selection.save(),n(f),b.selection.restore())}function r(a){if(navigator.userAgent.indexOf("Mac OS X")!=-1){if(a.metaKey&&!a.altKey)return!0}else if(a.ctrlKey&&!a.altKey)return!0;return!1}function s(b){if(b>=a.FE.KEYCODE.ARROW_LEFT&&b<=a.FE.KEYCODE.ARROW_DOWN)return!0}function t(c){if(c>=a.FE.KEYCODE.ZERO&&c<=a.FE.KEYCODE.NINE)return!0;if(c>=a.FE.KEYCODE.NUM_ZERO&&c<=a.FE.KEYCODE.NUM_MULTIPLY)return!0;if(c>=a.FE.KEYCODE.A&&c<=a.FE.KEYCODE.Z)return!0;if(b.browser.webkit&&0===c)return!0;switch(c){case a.FE.KEYCODE.SPACE:case a.FE.KEYCODE.QUESTION_MARK:case a.FE.KEYCODE.NUM_PLUS:case a.FE.KEYCODE.NUM_MINUS:case a.FE.KEYCODE.NUM_PERIOD:case a.FE.KEYCODE.NUM_DIVISION:case a.FE.KEYCODE.SEMICOLON:case a.FE.KEYCODE.FF_SEMICOLON:case a.FE.KEYCODE.DASH:case a.FE.KEYCODE.EQUALS:case a.FE.KEYCODE.FF_EQUALS:case a.FE.KEYCODE.COMMA:case a.FE.KEYCODE.PERIOD:case a.FE.KEYCODE.SLASH:case a.FE.KEYCODE.APOSTROPHE:case a.FE.KEYCODE.SINGLE_QUOTE:case a.FE.KEYCODE.OPEN_SQUARE_BRACKET:case a.FE.KEYCODE.BACKSLASH:case a.FE.KEYCODE.CLOSE_SQUARE_BRACKET:return!0;default:return!1}}function u(c){var d=c.which;return!!(r(c)||d>=37&&d<=40||!t(d)&&d!=a.FE.KEYCODE.DELETE&&d!=a.FE.KEYCODE.BACKSPACE&&d!=a.FE.KEYCODE.ENTER)||(A||(B=b.snapshot.get(),b.undo.canDo()||b.undo.saveStep()),clearTimeout(A),void(A=setTimeout(function(){A=null,b.undo.saveStep()},Math.max(250,b.opts.typingTimer))))}function v(a){var c=a.which;return!!(r(a)||c>=37&&c<=40)||void(B&&A&&(b.undo.saveStep(B),B=null))}function w(){A&&(clearTimeout(A),b.undo.saveStep(),B=null)}function x(b){var c=b.which;return r(b)||c==a.FE.KEYCODE.F5}function y(){if(b.events.on("keydown",u),b.events.on("input",h),b.events.on("keyup input",v),b.events.on("keypress",k),b.events.on("keydown",m),b.events.on("keyup",q),b.events.on("html.inserted",q),b.events.on("cut",i),!b.browser.edge&&b.el.msGetInputContext)try{b.el.msGetInputContext().addEventListener("MSCandidateWindowShow",function(){C=!0}),b.el.msGetInputContext().addEventListener("MSCandidateWindowHide",function(){C=!1,q()})}catch(a){}}var z,A,B,C=!1;return{_init:y,ctrlKey:r,isCharacter:t,isArrow:s,forceUndo:w,isIME:l,isBrowserAction:x}},a.FE.MODULES.accessibility=function(b){function c(a){if(a&&a.length){a.data("blur-event-set")||a.parents(".fr-popup").length||(b.events.$on(a,"blur",function(){var c=a.parents(".fr-toolbar, .fr-popup").data("instance")||b;c.events.blurActive()&&c.events.trigger("blur"),c.events.enableBlur()},!0),a.data("blur-event-set",!0));var c=a.parents(".fr-toolbar, .fr-popup").data("instance")||b;c.events.disableBlur(),a.focus(),b.shared.$f_el=a}}function d(a,b){var d=b?"last":"first",e=a.find("button:visible:not(.fr-disabled), .fr-group span.fr-command:visible")[d]();if(e.length)return c(e),!0}function e(a){return a.is("input, textarea")&&g(),b.events.disableBlur(),a.focus(),!0}function f(a,c){var d=a.find("input, textarea, button, select").filter(":visible").not(":disabled").filter(c?":last":":first");if(d.length)return e(d);if(b.shared.with_kb){var f=a.find(".fr-active-item:visible:first");if(f.length)return e(f);var g=a.find("[tabIndex]:visible:first");if(g.length)return e(g)}}function g(){0===b.$el.find(".fr-marker").length&&b.core.hasFocus()&&b.selection.save()}function h(a){a.$el.find(".fr-marker").length&&(a.events.disableBlur(),a.selection.restore(),a.events.enableBlur())}function i(a){var c=a.children().not(".fr-buttons");c.data("mouseenter-event-set")||(b.events.$on(c,"mouseenter","[tabIndex]",function(d){var e=a.data("instance")||b;if(!F)return d.stopPropagation(),void d.preventDefault();var f=c.find(":focus:first");f.length&&!f.is("input, button, textarea")&&(e.events.disableBlur(),f.blur(),e.events.disableBlur(),e.events.focus())}),c.data("mouseenter-event-set",!0)),!f(c)&&b.shared.with_kb&&d(a.find(".fr-buttons"))}function j(a){b.core.hasFocus()||(b.events.disableBlur(),b.events.focus()),b.accessibility.saveSelection(),b.events.disableBlur(),b.$el.blur(),b.selection.clear(),b.events.disableBlur(),b.shared.with_kb?a.find(".fr-command[tabIndex], [tabIndex]").first().focus():a.find("[tabIndex]:first").focus()}function k(){var a=b.popups.areVisible();if(a){var c=a.find(".fr-buttons");return c.find("button:focus, .fr-group span:focus").length?!d(a.data("instance").$tb):!d(c)}return!d(b.$tb)}function l(){var a=null;return b.shared.$f_el.is(".fr-dropdown.fr-active")?a=b.shared.$f_el:b.shared.$f_el.closest(".fr-dropdown-menu").prev().is(".fr-dropdown.fr-active")&&(a=b.shared.$f_el.closest(".fr-dropdown-menu").prev()),a}function m(e,g,h){if(b.shared.$f_el){var i=l();i&&(b.button.click(i),b.shared.$f_el=i);var j=e.find("button:visible:not(.fr-disabled), .fr-group span.fr-command:visible"),k=j.index(b.shared.$f_el);if(0===k&&!h||k==j.length-1&&h){var m;if(g){if(e.parent().is(".fr-popup")){var n=e.parent().children().not(".fr-buttons");m=!f(n,!h)}m===!1&&(b.shared.$f_el=null)}g&&m===!1||d(e,!h)}else c(a(j.get(k+(h?1:-1))));return!1}}function n(a,b){return m(a,b,!0)}function o(a,b){return m(a,b)}function p(a){if(b.shared.$f_el){var d;if(b.shared.$f_el.is(".fr-dropdown.fr-active"))return d=a?b.shared.$f_el.next().find(".fr-command:not(.fr-disabled)").first():b.shared.$f_el.next().find(".fr-command:not(.fr-disabled)").last(),c(d),!1;if(b.shared.$f_el.is("a.fr-command"))return d=a?b.shared.$f_el.closest("li").nextAll(":visible:first").find(".fr-command:not(.fr-disabled)").first():b.shared.$f_el.closest("li").prevAll(":visible:first").find(".fr-command:not(.fr-disabled)").first(),d.length||(d=a?b.shared.$f_el.closest(".fr-dropdown-menu").find(".fr-command:not(.fr-disabled)").first():b.shared.$f_el.closest(".fr-dropdown-menu").find(".fr-command:not(.fr-disabled)").last()),c(d),!1}}function q(){return b.shared.$f_el&&b.shared.$f_el.is(".fr-dropdown:not(.fr-active)")?s():p(!0)}function r(){return p()}function s(){if(b.shared.$f_el){if(b.shared.$f_el.hasClass("fr-dropdown"))b.button.click(b.shared.$f_el);else if(b.shared.$f_el.is("button.fr-back")){b.opts.toolbarInline&&(b.events.disableBlur(),b.events.focus());var a=b.popups.areVisible(b);a&&(b.shared.with_kb=!1),b.button.click(b.shared.$f_el),z(a)}else{if(b.events.disableBlur(),b.button.click(b.shared.$f_el),b.shared.$f_el.attr("data-popup")){var c=b.popups.areVisible(b);c&&c.data("popup-button",b.shared.$f_el)}else if(b.shared.$f_el.attr("data-modal")){var d=b.modals.areVisible(b);d&&d.data("modal-button",b.shared.$f_el)}b.shared.$f_el=null}return!1}}function t(){b.shared.$f_el&&(b.events.disableBlur(),b.shared.$f_el.blur(),b.shared.$f_el=null),b.events.trigger("toolbar.focusEditor")!==!1&&(b.events.disableBlur(),b.events.focus())}function u(a){if(b.shared.$f_el){var d=l();return d?(b.button.click(d),c(d)):a.parent().find(".fr-back:visible").length?(b.shared.with_kb=!1,b.opts.toolbarInline&&(b.events.disableBlur(),b.events.focus()),b.button.exec(a.parent().find(".fr-back:visible:first")),z(a.parent())):b.shared.$f_el.is("button, .fr-group span")&&(a.parent().is(".fr-popup")?(h(b),b.shared.$f_el=null,b.events.trigger("toolbar.esc")!==!1&&(b.popups.hide(a.parent()),b.opts.toolbarInline&&b.toolbar.showInline(null,!0),z(a.parent()))):t()),!1}}function v(c,d){var e=navigator.userAgent.indexOf("Mac OS X")!=-1?c.metaKey:c.ctrlKey,f=c.which,g=!1;return f!=a.FE.KEYCODE.TAB||e||c.shiftKey||c.altKey?f!=a.FE.KEYCODE.ARROW_RIGHT||e||c.shiftKey||c.altKey?f!=a.FE.KEYCODE.TAB||e||!c.shiftKey||c.altKey?f!=a.FE.KEYCODE.ARROW_LEFT||e||c.shiftKey||c.altKey?f!=a.FE.KEYCODE.ARROW_UP||e||c.shiftKey||c.altKey?f!=a.FE.KEYCODE.ARROW_DOWN||e||c.shiftKey||c.altKey?f!=a.FE.KEYCODE.ENTER||e||c.shiftKey||c.altKey?f!=a.FE.KEYCODE.ESC||e||c.shiftKey||c.altKey?f!=a.FE.KEYCODE.F10||e||c.shiftKey||!c.altKey||(g=k()):g=u(d):g=s():g=q():g=r():g=o(d):g=o(d,!0):g=n(d):g=n(d,!0),b.shared.$f_el||void 0!==g||(g=!0),!g&&b.keys.isBrowserAction(c)&&(g=!0),!!g||(c.preventDefault(),c.stopPropagation(),!1)}function w(c){c&&c.length&&(b.events.$on(c,"keydown",function(d){if(!a(d.target).is("a.fr-command, button.fr-command, .fr-group span.fr-command"))return!0;var e=c.parents(".fr-popup").data("instance")||c.data("instance")||b;b.shared.with_kb=!0;var f=e.accessibility.exec(d,c);return b.shared.with_kb=!1,f},!0),b.events.$on(c,"mouseenter","[tabIndex]",function(d){var e=c.parents(".fr-popup").data("instance")||c.data("instance")||b;if(!F)return d.stopPropagation(),void d.preventDefault();var f=a(d.currentTarget);e.shared.$f_el&&e.shared.$f_el.not(f)&&e.accessibility.focusEditor()},!0))}function x(a){var c=b.popups.get(a),d=y(a);w(c.find(".fr-buttons")),b.events.$on(c,"mouseenter","tabIndex",d._tiMouseenter,!0),b.events.$on(c.children().not(".fr-buttons"),"keydown","[tabIndex]",d._tiKeydown,!0),b.popups.onHide(a,function(){h(c.data("instance")||b)}),b.popups.onShow(a,function(){F=!1,setTimeout(function(){F=!0},0)})}function y(c){var e=b.popups.get(c);return{_tiKeydown:function(g){var i=e.data("instance")||b;if(i.events.trigger("popup.tab",[g])===!1)return!1;var j=g.which,k=e.find(":focus:first");if(a.FE.KEYCODE.TAB==j){g.preventDefault();var l=e.children().not(".fr-buttons"),m=l.find("input, textarea, button, select").filter(":visible").not(".fr-no-touch input, .fr-no-touch textarea, .fr-no-touch button, .fr-no-touch select, :disabled").toArray(),n=m.indexOf(this)+(g.shiftKey?-1:1);if(0<=n&&n<m.length)return i.events.disableBlur(),a(m[n]).focus(),g.stopPropagation(),!1;var o=e.find(".fr-buttons");if(o.length&&d(o,!!g.shiftKey))return g.stopPropagation(),!1;if(f(l))return g.stopPropagation(),!1}else{if(a.FE.KEYCODE.ENTER!=j)return a.FE.KEYCODE.ESC==j?(g.preventDefault(),g.stopPropagation(),h(i),i.popups.isVisible(c)&&e.find(".fr-back:visible").length?(i.opts.toolbarInline&&(i.events.disableBlur(),i.events.focus()),i.button.exec(e.find(".fr-back:visible:first")),z(e)):i.popups.isVisible(c)&&e.find(".fr-dismiss:visible").length?i.button.exec(e.find(".fr-dismiss:visible:first")):(i.popups.hide(c),i.opts.toolbarInline&&i.toolbar.showInline(null,!0),z(e)),!1):a.FE.KEYCODE.SPACE==j&&(k.is(".fr-submit")||k.is(".fr-dismiss"))?(g.preventDefault(),g.stopPropagation(),i.events.disableBlur(),i.button.exec(k),!0):i.keys.isBrowserAction(g)?void g.stopPropagation():k.is("input[type=text], textarea")?void g.stopPropagation():a.FE.KEYCODE.SPACE==j&&(k.is(".fr-link-attr")||k.is("input[type=file]"))?void g.stopPropagation():(g.stopPropagation(),g.preventDefault(),!1);var p=null;e.find(".fr-submit:visible").length>0?p=e.find(".fr-submit:visible:first"):e.find(".fr-dismiss:visible").length&&(p=e.find(".fr-dismiss:visible:first")),p&&(g.preventDefault(),g.stopPropagation(),i.events.disableBlur(),i.button.exec(p))}},_tiMouseenter:function(){var a=e.data("instance")||b;C(a)}}}function z(a){var b=a.data("popup-button");b&&setTimeout(function(){c(b),a.data("popup-button",null)},0)}function A(a){var b=a.data("modal-button");b&&setTimeout(function(){c(b),a.data("modal-button",null)},0)}function B(){return null!=b.shared.$f_el}function C(a){var c=b.popups.areVisible(a);c&&c.data("popup-button",null)}function D(c){var d=navigator.userAgent.indexOf("Mac OS X")!=-1?c.metaKey:c.ctrlKey,e=c.which;if(e==a.FE.KEYCODE.F10&&!d&&!c.shiftKey&&c.altKey){b.shared.with_kb=!0;var g=b.popups.areVisible(b),h=!1;return g&&(h=f(g.children().not(".fr-buttons"))),h||k(),b.shared.with_kb=!1,c.preventDefault(),c.stopPropagation(),!1}return!0}function E(){b.$wp?b.events.on("keydown",D,!0):b.events.$on(b.$win,"keydown",D,!0),b.events.on("mousedown",function(a){C(b),b.shared.$f_el&&(h(b),a.stopPropagation(),b.events.disableBlur(),b.shared.$f_el=null)},!0),b.events.on("blur",function(){b.shared.$f_el=null,C(b)},!0)}var F=!0;return{_init:E,registerPopup:x,registerToolbar:w,focusToolbarElement:c,focusToolbar:d,focusContent:f,focusPopup:i,focusModal:j,focusEditor:t,focusPopupButton:z,focusModalButton:A,hasFocus:B,exec:v,saveSelection:g,restoreSelection:h}},a.FE.MODULES.format=function(b){function c(a,b){var c="<"+a;for(var d in b)b.hasOwnProperty(d)&&(c+=" "+d+'="'+b[d]+'"');return c+=">"}function d(a){return"</"+a+">"}function e(a,b){var c=a;for(var d in b)b.hasOwnProperty(d)&&(c+="id"==d?"#"+b[d]:"class"==d?"."+b[d]:"["+d+'="'+b[d]+'"]');return c}function f(a,b){return!(!a||a.nodeType!=Node.ELEMENT_NODE)&&(a.matches||a.matchesSelector||a.msMatchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.oMatchesSelector).call(a,b)}function g(d,e,f){if(d){if(b.node.isBlock(d))return g(d.firstChild,e,f),!1;for(var h=a(c(e,f)).insertBefore(d),i=d;i&&!a(i).is(".fr-marker")&&0===a(i).find(".fr-marker").length;){var j=i;i=i.nextSibling,h.append(j)}if(i)a(i).find(".fr-marker").length&&g(i.firstChild,e,f);else{for(var k=h.get(0).parentNode;k&&!k.nextSibling&&!b.node.isElement(k);)k=k.parentNode;if(k){var l=k.nextSibling;l&&(b.node.isBlock(l)?g(l.firstChild,e,f):g(l,e,f))}}h.is(":empty")&&h.remove()}}function h(h,i){var j;if("undefined"==typeof i&&(i={}),i.style&&delete i.style,b.selection.isCollapsed()){b.markers.insert();var k=b.$el.find(".fr-marker");k.replaceWith(c(h,i)+a.FE.INVISIBLE_SPACE+a.FE.MARKERS+d(h)),b.selection.restore()}else{b.selection.save();var l=b.$el.find('.fr-marker[data-type="true"]').get(0).nextSibling;g(l,h,i);var m;do for(m=b.$el.find(e(h,i)+" > "+e(h,i)),j=0;j<m.length;j++)m[j].outerHTML=m[j].innerHTML;while(m.length);b.el.normalize();var n=b.el.querySelectorAll(".fr-marker");for(j=0;j<n.length;j++){var o=a(n[j]);o.data("type")===!0?f(o.get(0).nextSibling,e(h,i))&&o.next().prepend(o):f(o.get(0).previousSibling,e(h,i))&&o.prev().append(o)}b.selection.restore()}}function i(a,c,d,g){if(!g){var h=!1;if(a.data("type")===!0)for(;b.node.isFirstSibling(a.get(0))&&!a.parent().is(b.$el)&&!a.parent().is("ol")&&!a.parent().is("ul");)a.parent().before(a),h=!0;else if(a.data("type")===!1)for(;b.node.isLastSibling(a.get(0))&&!a.parent().is(b.$el)&&!a.parent().is("ol")&&!a.parent().is("ul");)a.parent().after(a),h=!0;if(h)return!0}if(a.parents(c).length||"undefined"==typeof c){var i="",j="",k=a.parent();if(k.is(b.$el)||b.node.isBlock(k.get(0)))return!1;for(;"undefined"==typeof c&&!b.node.isBlock(k.parent().get(0))||"undefined"!=typeof c&&!f(k.get(0),e(c,d));)i+=b.node.closeTagString(k.get(0)),j=b.node.openTagString(k.get(0))+j,k=k.parent();var l=a.get(0).outerHTML;a.replaceWith('<span id="mark"></span>');var m=k.html().replace(/<span id="mark"><\/span>/,i+b.node.closeTagString(k.get(0))+j+l+i+b.node.openTagString(k.get(0))+j);return k.replaceWith(b.node.openTagString(k.get(0))+m+b.node.closeTagString(k.get(0))),!0}return!1}function j(c,d,g,h){for(var i=b.node.contents(c.get(0)),k=0;k<i.length;k++){var l=i[k];if(b.node.hasClass(l,"fr-marker"))d=(d+1)%2;else if(d)if(a(l).find(".fr-marker").length>0)d=j(a(l),d,g,h);else{for(var m=a(l).find(g||"*"),n=m.length-1;n>=0;n--){var o=m[n];b.node.isBlock(o)||b.node.isVoid(o)||!f(o,e(g,h))||(o.outerHTML=o.innerHTML)}"undefined"==typeof g&&l.nodeType==Node.ELEMENT_NODE&&!b.node.isVoid(l)&&!b.node.isBlock(l)||f(l,e(g,h))?a(l).replaceWith(l.innerHTML):"undefined"==typeof g&&l.nodeType==Node.ELEMENT_NODE&&b.node.isBlock(l)&&b.node.clearAttributes(l)}else a(l).find(".fr-marker").length>0&&(d=j(a(l),d,g,h))}return d}function k(c,d){"undefined"==typeof d&&(d={}),d.style&&delete d.style;var e=b.selection.isCollapsed();b.selection.save();for(var f=!0;f;){f=!1;for(var g=b.$el.find(".fr-marker"),h=0;h<g.length;h++)if(i(a(g[h]),c,d,e)){f=!0;break}}j(b.$el,0,c,d),e&&b.$el.find(".fr-marker").before(a.FE.INVISIBLE_SPACE).after(a.FE.INVISIBLE_SPACE),b.html.cleanEmptyTags(),b.el.normalize(),b.selection.restore()}function l(a,b){q(a,b)?k(a,b):h(a,b)}function m(b,c){var d=a(b);d.css(c,""),""===d.attr("style")&&d.replaceWith(d.html())}function n(b,c){return 0===a(b).attr("style").indexOf(c+":")||a(b).attr("style").indexOf(";"+c+":")>=0||a(b).attr("style").indexOf("; "+c+":")>=0}function o(c,d){var e,f;if(b.selection.isCollapsed()){b.markers.insert(),f=b.$el.find(".fr-marker");var h=f.parent();if(b.node.openTagString(h.get(0))=='<span style="'+c+": "+h.css(c)+';">')if(b.node.isEmpty(h.get(0)))h.replaceWith('<span style="'+c+": "+d+';">'+a.FE.INVISIBLE_SPACE+a.FE.MARKERS+"</span>");else{var j={};j[c]=d,i(f,"span",j,!0),f=b.$el.find(".fr-marker"),f.replaceWith('<span style="'+c+": "+d+';">'+a.FE.INVISIBLE_SPACE+a.FE.MARKERS+"</span>")}else b.node.isEmpty(h.get(0))&&h.is("span")?(f.replaceWith(a.FE.MARKERS),h.css(c,d)):f.replaceWith('<span style="'+c+": "+d+';">'+a.FE.INVISIBLE_SPACE+a.FE.MARKERS+"</span>");b.selection.restore()}else{if(b.selection.save(),null==d||"color"==c&&b.$el.find(".fr-marker").parents("u, a").length>0){var k=b.$el.find(".fr-marker");for(e=0;e<k.length;e++)if(f=a(k[e]),f.data("type")===!0)for(;b.node.isFirstSibling(f.get(0))&&!f.parent().is(b.$el)&&!b.node.isElement(f.parent().get(0))&&!b.node.isBlock(f.parent().get(0));)f.parent().before(f);else for(;b.node.isLastSibling(f.get(0))&&!f.parent().is(b.$el)&&!b.node.isElement(f.parent().get(0))&&!b.node.isBlock(f.parent().get(0));)f.parent().after(f)}var l=b.$el.find('.fr-marker[data-type="true"]').get(0).nextSibling,o={class:"fr-unprocessed"};for(d&&(o.style=c+": "+d+";"),g(l,"span",o),b.$el.find(".fr-marker + .fr-unprocessed").each(function(){a(this).prepend(a(this).prev())}),b.$el.find(".fr-unprocessed + .fr-marker").each(function(){a(this).prev().append(this)});b.$el.find("span.fr-unprocessed").length>0;){var p=b.$el.find("span.fr-unprocessed:first").removeClass("fr-unprocessed");if(p.parent().get(0).normalize(),p.parent().is("span")&&1==p.parent().get(0).childNodes.length){p.parent().css(c,d);var q=p;p=p.parent(),q.replaceWith(q.html())}var r=p.find("span");for(e=r.length-1;e>=0;e--)m(r[e],c);var s=p.parentsUntil(b.$el,"span[style]"),t=[];for(e=s.length-1;e>=0;e--)n(s[e],c)||t.push(s[e]);if(s=s.not(t),s.length){var u="",v="",w="",x="",y=p.get(0);do y=y.parentNode,a(y).addClass("fr-split"),u+=b.node.closeTagString(y),v=b.node.openTagString(a(y).clone().addClass("fr-split").get(0))+v,s.get(0)!=y&&(w+=b.node.closeTagString(y),x=b.node.openTagString(a(y).clone().addClass("fr-split").get(0))+x);while(s.get(0)!=y);var z=u+b.node.openTagString(a(s.get(0)).clone().css(c,d||"").get(0))+x+p.css(c,"").get(0).outerHTML+w+"</span>"+v;p.replaceWith('<span id="fr-break"></span>');var A=s.get(0).outerHTML;a(s.get(0)).replaceWith(A.replace(/<span id="fr-break"><\/span>/g,z))}}for(;b.$el.find(".fr-split:empty").length>0;)b.$el.find(".fr-split:empty").remove();b.$el.find(".fr-split").removeClass("fr-split"),b.$el.find('span[style=""]').removeAttr("style"),b.$el.find('span[class=""]').removeAttr("class"),b.html.cleanEmptyTags(),a(b.$el.find("span").get().reverse()).each(function(){this.attributes&&0!==this.attributes.length||a(this).replaceWith(this.innerHTML)}),b.el.normalize();var B=b.$el.find("span[style] + span[style]");for(e=0;e<B.length;e++){var C=a(B[e]),D=a(B[e]).prev();C.get(0).previousSibling==D.get(0)&&b.node.openTagString(C.get(0))==b.node.openTagString(D.get(0))&&(C.prepend(D.html()),D.remove())}b.$el.find("span[style] span[style]").each(function(){if(a(this).attr("style").indexOf("font-size")>=0){var b=a(this).parents("span[style]");b.attr("style").indexOf("background-color")>=0&&(a(this).attr("style",a(this).attr("style")+";"+b.attr("style")),i(a(this),"span[style]",{},!1))}}),b.el.normalize(),b.selection.restore()}}function p(a){o(a,null)}function q(a,c){"undefined"==typeof c&&(c={}),c.style&&delete c.style;var d=b.selection.ranges(0),g=d.startContainer;g.nodeType==Node.ELEMENT_NODE&&g.childNodes.length>0&&g.childNodes[d.startOffset]&&(g=g.childNodes[d.startOffset]);for(var h=g;h&&h.nodeType==Node.ELEMENT_NODE&&!f(h,e(a,c));)h=h.firstChild;if(h&&h.nodeType==Node.ELEMENT_NODE&&f(h,e(a,c)))return!0;var i=g;for(i&&i.nodeType!=Node.ELEMENT_NODE&&(i=i.parentNode);i&&i.nodeType==Node.ELEMENT_NODE&&i!=b.el&&!f(i,e(a,c));)i=i.parentNode;return!(!i||i.nodeType!=Node.ELEMENT_NODE||i==b.el||!f(i,e(a,c)))}return{is:q,toggle:l,apply:h,remove:k,applyStyle:o,removeStyle:p}},a.FE.COMMANDS={bold:{title:"Bold",toggle:!0,refresh:function(a){var b=this.format.is("strong");a.toggleClass("fr-active",b).attr("aria-pressed",b)}},italic:{title:"Italic",toggle:!0,refresh:function(a){var b=this.format.is("em");a.toggleClass("fr-active",b).attr("aria-pressed",b)}},underline:{title:"Underline",toggle:!0,refresh:function(a){var b=this.format.is("u");a.toggleClass("fr-active",b).attr("aria-pressed",b)}},strikeThrough:{title:"Strikethrough",toggle:!0,refresh:function(a){var b=this.format.is("s");a.toggleClass("fr-active",b).attr("aria-pressed",b)}},subscript:{title:"Subscript",toggle:!0,refresh:function(a){var b=this.format.is("sub");a.toggleClass("fr-active",b).attr("aria-pressed",b)}},superscript:{title:"Superscript",toggle:!0,refresh:function(a){var b=this.format.is("sup");a.toggleClass("fr-active",b).attr("aria-pressed",b)}},outdent:{title:"Decrease Indent"},indent:{title:"Increase Indent"},undo:{title:"Undo",undo:!1,forcedRefresh:!0,disabled:!0},redo:{title:"Redo",undo:!1,forcedRefresh:!0,disabled:!0},insertHR:{title:"Insert Horizontal Line"},clearFormatting:{title:"Clear Formatting"},selectAll:{title:"Select All",undo:!1}},a.FE.RegisterCommand=function(b,c){a.FE.COMMANDS[b]=c},a.FE.MODULES.commands=function(b){function c(a){return b.html.defaultTag()&&(a="<"+b.html.defaultTag()+">"+a+"</"+b.html.defaultTag()+">"),a}function d(c,d){if(b.events.trigger("commands.before",a.merge([c],d||[]))!==!1){var e=a.FE.COMMANDS[c]&&a.FE.COMMANDS[c].callback||i[c],f=!0,g=!1;a.FE.COMMANDS[c]&&("undefined"!=typeof a.FE.COMMANDS[c].focus&&(f=a.FE.COMMANDS[c].focus),"undefined"!=typeof a.FE.COMMANDS[c].accessibilityFocus&&(g=a.FE.COMMANDS[c].accessibilityFocus)),(!b.core.hasFocus()&&f&&!b.popups.areVisible()||!b.core.hasFocus()&&g&&b.accessibility.hasFocus())&&b.events.focus(!0),a.FE.COMMANDS[c]&&a.FE.COMMANDS[c].undo!==!1&&(b.$el.find(".fr-marker").length&&(b.events.disableBlur(),b.selection.restore()),b.undo.saveStep()),e&&e.apply(b,a.merge([c],d||[])),b.events.trigger("commands.after",a.merge([c],d||[])),a.FE.COMMANDS[c]&&a.FE.COMMANDS[c].undo!==!1&&b.undo.saveStep()}}function e(a,c){b.format.toggle(c)}function f(c){b.selection.save(),b.html.wrap(!0,!0,!0,!0),b.selection.restore();for(var d=b.selection.blocks(),e=0;e<d.length;e++)if("LI"!=d[e].tagName&&"LI"!=d[e].parentNode.tagName){var f=a(d[e]),g="rtl"==b.opts.direction||"rtl"==f.css("direction")?"margin-right":"margin-left",h=b.helpers.getPX(f.css(g));f.css(g,Math.max(h+20*c,0)||""),f.removeClass("fr-temp-div")}b.selection.save(),b.html.unwrap(),b.selection.restore()}function g(a){return function(){d(a)}}function h(){b.events.on("keydown",function(a){var c=b.selection.element();if(c&&"HR"==c.tagName&&!b.keys.isArrow(a.which))return a.preventDefault(),!1}),b.events.on("keyup",function(c){var d=b.selection.element();if(d&&"HR"==d.tagName)if(c.which==a.FE.KEYCODE.ARROW_LEFT||c.which==a.FE.KEYCODE.ARROW_UP){if(d.previousSibling)return b.node.isBlock(d.previousSibling)?b.selection.setAtEnd(d.previousSibling):a(d).before(a.FE.MARKERS),b.selection.restore(),!1}else if((c.which==a.FE.KEYCODE.ARROW_RIGHT||c.which==a.FE.KEYCODE.ARROW_DOWN)&&d.nextSibling)return b.node.isBlock(d.nextSibling)?b.selection.setAtStart(d.nextSibling):a(d).after(a.FE.MARKERS),b.selection.restore(),!1}),b.events.on("mousedown",function(a){if(a.target&&"HR"==a.target.tagName)return a.preventDefault(),a.stopPropagation(),!1}),b.events.on("mouseup",function(){var c=b.selection.element(),d=b.selection.endElement();c==d&&c&&"HR"==c.tagName&&(c.nextSibling&&(b.node.isBlock(c.nextSibling)?b.selection.setAtStart(c.nextSibling):a(c).after(a.FE.MARKERS)),b.selection.restore())})}var i={bold:function(){e("bold","strong")},subscript:function(){e("subscript","sub")},superscript:function(){e("superscript","sup")},italic:function(){e("italic","em")},strikeThrough:function(){e("strikeThrough","s")},underline:function(){e("underline","u")},undo:function(){b.undo.run()},redo:function(){b.undo.redo()},indent:function(){f(1)},outdent:function(){f(-1)},show:function(){b.opts.toolbarInline&&b.toolbar.showInline(null,!0)},insertHR:function(){b.selection.remove();var d="";b.core.isEmpty()&&(d="<br>",d=c(d)),b.html.insert('<hr id="fr-just">'+d);var e=b.$el.find("hr#fr-just");e.removeAttr("id");var f;e.prev().is("hr")?f=b.selection.setAfter(e.get(0),!1):e.next().is("hr")?f=b.selection.setBefore(e.get(0),!1):b.selection.setAfter(e.get(0),!1)||b.selection.setBefore(e.get(0),!1),f||"undefined"==typeof f||(d=a.FE.MARKERS+"<br>",d=c(d),e.after(d)),b.selection.restore()},clearFormatting:function(){b.format.remove()},selectAll:function(){b.doc.execCommand("selectAll",!1,!1)}},j={};for(var k in i)i.hasOwnProperty(k)&&(j[k]=g(k));return a.extend(j,{exec:d,_init:h})},a.FE.MODULES.data=function(a){function b(a){return a}function c(a){if(!a)return a;for(var c="",f=b("charCodeAt"),g=b("fromCharCode"),h=l.indexOf(a[0]),i=1;i<a.length-2;i++){for(var j=d(++h),k=a[f](i),m="";/[0-9-]/.test(a[i+1]);)m+=a[++i];m=parseInt(m,10)||0,k=e(k,j,m),k^=h-1&31,c+=String[g](k)}return c}function d(a){
for(var b=a.toString(),c=0,d=0;d<b.length;d++)c+=parseInt(b.charAt(d),10);return c>10?c%9+1:c}function e(a,b,c){for(var d=Math.abs(c);d-- >0;)a-=b;return c<0&&(a+=123),a}function f(a){return!(!a||"none"!=a.css("display")||(a.remove(),0))}function g(){return f(j)||f(k)}function h(){return!!a.$box&&(a.$box.append(n(b(n("noLD2laB-7NB1C1ebcvH-9SB3a1C6QC2D4A-9d1E2B2B4xgAE4B2G2I1C3A3B2qMF1DE1fkxfcC-11C-9g1G2E4XC9a1E5A3G-10mvrioCC3AA1KA1qJ-7NB2MA6sxeqVA6TD6e2D4B-9rYA2a1A4bCD3vwC-7EC10D3E2lNC1KD1QB9SB6UE5TE4YF3YA5c1A3d1B3kGE2gFA5A2D2ch1KI1IB1thyH5wvVC11UB6c1F4wwwXA7gmnfB2jgB1A7nd1e1IC2NG4H1A9bjvnbC-8PG3mlazD4dH-9HI2qAA2jGC2IA1dajajFD5SG4J4c1qttyB-9wg1B2b2A6b1C3EG3B2I2rCD4E1B1LG1oaMA3RE7abC-8C-7aVA4C5B5F-11e1D3I3a5A8hmmnogH2IB5A2nhkgiA4TH4VC7yxdblH-8YC6D6C4xC3yqJJ2C-21spB-11fMF1KF1IC2USC4PG4TE3RD6ZF5XE3UE3uefaFE4D2G2AE1HA2JD1zzzQE3SD9vgqF4ua3B13XA4C5gd1E3E2A14ridsldcCA7MC5ghwE-11ZH5f1D3a1D8bwxmkzi1A7IB3KvpB-8rwMD3IE1GG-10bgqwxewvWE4H3VbD-16qC-11qc1E2TwEA6A3aCE4A1A4lOD3JC1iVA3RA13c2D8olqf1G3A32B17==")))),j=a.$box.find("> div:last"),k=j.find("> a"),void("rtl"==a.opts.direction&&j.css("left","auto").css("right",0)))}function i(){var c=localStorage&&localStorage.FEK||a.opts.key||[""];"string"==typeof c&&(c=[c]),a.ul=!0;for(var d=0;d<c.length;d++){var e=n(c[d])||"";if(!(e!==n(b(n("mcVRDoB1BGILD7YFe1BTXBA7B6==")))&&e.indexOf(m,e.length-m.length)<0&&[n("9qqG-7amjlwq=="),n("KA3B3C2A6D1D5H5H1A3=="),n("QzbzvxyB2yA-9m=="),n("naamngiA3dA-16xtE-11C-9B1H-8sc==")].indexOf(m)<0)){a.ul=!1;break}}a.ul===!0&&h(),a.events.on("contentChanged",function(){a.ul===!0&&g()&&h()}),a.events.on("destroy",function(){j&&j.length&&j.remove()},!0)}var j,k,l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",m=function(){for(var a=0,b=document.domain,c=b.split("."),d="_gd"+(new Date).getTime();a<c.length-1&&document.cookie.indexOf(d+"="+d)==-1;)b=c.slice(-1-++a).join("."),document.cookie=d+"="+d+";domain="+b+";";return document.cookie=d+"=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain="+b+";",(b||"").replace(/(^\.*)|(\.*$)/g,"")}(),n=b(c);return{_init:i}},a.extend(a.FE.DEFAULTS,{pastePlain:!1,pasteDeniedTags:["colgroup","col"],pasteDeniedAttrs:["class","id","style"],pasteAllowedStyleProps:["font-family","font-size","background","color","width","text-align","vertical-align","background-color"],pasteAllowLocalImages:!1}),a.FE.MODULES.paste=function(b){function c(c){a.FE.copied_html=b.html.getSelected(),a.FE.copied_text=a("<div>").html(a.FE.copied_html).text(),"cut"==c.type&&(b.undo.saveStep(),setTimeout(function(){b.selection.save(),b.html.wrap(),b.selection.restore(),b.events.focus(),b.undo.saveStep()},0))}function d(a){if(r)return!1;if(a.originalEvent&&(a=a.originalEvent),b.events.trigger("paste.before",[a])===!1)return a.preventDefault(),!1;if(n=b.$win.scrollTop(),a&&a.clipboardData&&a.clipboardData.getData){var c="",d=a.clipboardData.types;if(b.helpers.isArray(d))for(var f=0;f<d.length;f++)c+=d[f]+";";else c=d;if(o="",p=a.clipboardData.getData("text/rtf"),/text\/html/.test(c)?o=a.clipboardData.getData("text/html"):/text\/rtf/.test(c)&&b.browser.safari?o=p:/text\/plain/.test(c)&&!this.browser.mozilla&&(o=b.html.escapeEntities(a.clipboardData.getData("text/plain")).replace(/\n/g,"<br>")),""!==o)return i(),a.preventDefault&&(a.stopPropagation(),a.preventDefault()),!1;o=null}e()}function e(){b.selection.save(),b.events.disableBlur(),o=null,q?q.html(""):(q=a('<div contenteditable="true" style="position: fixed; top: 0; left: -9999px; height: 100%; width: 0; word-break: break-all; overflow:hidden; z-index: 9999; line-height: 140%;" tabIndex="-1"></div>'),b.$box.after(q),b.events.on("destroy",function(){q.remove()})),q.focus(),b.win.setTimeout(i,1)}function f(a){var c;a=a.replace(/<p(.*?)class="?'?MsoListParagraph"?'? ([\s\S]*?)>([\s\S]*?)<\/p>/gi,"<ul><li>$3</li></ul>"),a=a.replace(/<p(.*?)class="?'?NumberedText"?'? ([\s\S]*?)>([\s\S]*?)<\/p>/gi,"<ol><li>$3</li></ol>"),a=a.replace(/<p(.*?)class="?'?MsoListParagraphCxSpFirst"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi,"<ul><li$3>$5</li>"),a=a.replace(/<p(.*?)class="?'?NumberedTextCxSpFirst"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi,"<ol><li$3>$5</li>"),a=a.replace(/<p(.*?)class="?'?MsoListParagraphCxSpMiddle"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi,"<li$3>$5</li>"),a=a.replace(/<p(.*?)class="?'?NumberedTextCxSpMiddle"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi,"<li$3>$5</li>"),a=a.replace(/<p(.*?)class="?'?MsoListBullet"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi,"<li$3>$5</li>"),a=a.replace(/<p(.*?)class="?'?MsoListParagraphCxSpLast"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi,"<li$3>$5</li></ul>"),a=a.replace(/<p(.*?)class="?'?NumberedTextCxSpLast"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi,"<li$3>$5</li></ol>"),a=a.replace(/<span([^<]*?)style="?'?mso-list:Ignore"?'?([\s\S]*?)>([\s\S]*?)<span/gi,"<span><span"),a=a.replace(/<!--\[if \!supportLists\]-->([\s\S]*?)<!--\[endif\]-->/gi,""),a=a.replace(/<!\[if \!supportLists\]>([\s\S]*?)<!\[endif\]>/gi,""),a=a.replace(/(\n|\r| class=(")?Mso[a-zA-Z0-9]+(")?)/gi," "),a=a.replace(/<!--[\s\S]*?-->/gi,""),a=a.replace(/<(\/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>/gi,"");var d=["style","script","applet","embed","noframes","noscript"];for(c=0;c<d.length;c++){var e=new RegExp("<"+d[c]+".*?"+d[c]+"(.*?)>","gi");a=a.replace(e,"")}a=a.replace(/&nbsp;/gi," "),a=a.replace(/<td([^>]*)><\/td>/g,"<td$1><br></td>"),a=a.replace(/<th([^>]*)><\/th>/g,"<th$1><br></th>");var f;do f=a,a=a.replace(/<[^\/>][^>]*><\/[^>]+>/gi,"");while(a!=f);a=a.replace(/<lilevel([^1])([^>]*)>/gi,'<li data-indent="true"$2>'),a=a.replace(/<lilevel1([^>]*)>/gi,"<li$1>"),a=b.clean.html(a,b.opts.pasteDeniedTags,b.opts.pasteDeniedAttrs),a=a.replace(/<a>(.[^<]+)<\/a>/gi,"$1"),a=a.replace(/<br> */g,"<br>");var g=b.o_doc.createElement("div");g.innerHTML=a;var h=g.querySelectorAll("li[data-indent]");for(c=0;c<h.length;c++){var i=h[c],j=i.previousElementSibling;if(j&&"LI"==j.tagName){var k=j.querySelector(":scope > ul, :scope > ol");k||(k=document.createElement("ul"),j.appendChild(k)),k.appendChild(i)}else i.removeAttribute("data-indent")}return b.html.cleanBlankSpaces(g),a=g.innerHTML}function g(a){var c,d=null,e=b.doc.createElement("div");e.innerHTML=a;var f=e.querySelectorAll("p, div, h1, h2, h3, h4, h5, h6, pre, blockquote");for(c=0;c<f.length;c++)d=f[c],d.outerHTML="<"+(b.html.defaultTag()||"DIV")+">"+d.innerHTML+"</"+(b.html.defaultTag()||"DIV")+">";for(f=e.querySelectorAll("*:not("+"p, div, h1, h2, h3, h4, h5, h6, pre, blockquote, ul, ol, li, table, tbody, thead, tr, td, br, img".split(",").join("):not(")+")"),c=f.length-1;c>=0;c--)d=f[c],d.outerHTML=d.innerHTML;var g=function(a){for(var c=b.node.contents(a),d=0;d<c.length;d++)c[d].nodeType!=Node.TEXT_NODE&&c[d].nodeType!=Node.ELEMENT_NODE?c[d].parentNode.removeChild(c[d]):g(c[d])};return g(e),e.innerHTML}function h(a){return a.match(/(class=\"?Mso|class=\'?Mso|style=\"[^\"]*\bmso\-|style=\'[^\']*\bmso\-|w:WordDocument)/gi)}function i(){var c,d=null,e=null;b.keys.forceUndo();var i=b.snapshot.get();null===o&&(o=q.get(0).innerHTML,b.selection.restore(),b.events.enableBlur());var k=h(o),m=b.events.chainTrigger("paste.beforeCleanup",o);if(m&&"string"==typeof m&&(o=m),!k){var n=b.opts.htmlAllowedStyleProps;b.opts.htmlAllowedStyleProps=b.opts.pasteAllowedStyleProps,b.opts.htmlAllowComments=!1,o=b.clean.html(o,b.opts.pasteDeniedTags,b.opts.pasteDeniedAttrs),b.opts.htmlAllowedStyleProps=n,b.opts.htmlAllowComments=!0,o=l(o),o=o.replace(/\r|\n|\t/g,"");var p=b.doc.createElement("div");p.innerHTML=o,a.FE.copied_text&&p.textContent.replace(/(\u00A0)/gi," ").replace(/\r|\n/gi,"")==a.FE.copied_text.replace(/(\u00A0)/gi," ").replace(/\r|\n/gi,"")&&(o=a.FE.copied_html),o=o.replace(/^ */g,"").replace(/ *$/g,"")}o.indexOf("<body")>=0&&(o=o.replace(/[.\s\S\w\W<>]*<body[^>]*>[\s]*([.\s\S\w\W<>]*)\s]*<\/body>[.\s\S\w\W<>]*/g,"$1"),o=o.replace(/([^>])\n([^<])/g,"$1 $2"));var r=!1;if(o.indexOf('id="docs-internal-guid')>=0&&(o=o.replace(/^.* id="docs-internal-guid[^>]*>(.*)<\/b>.*$/,"$1"),r=!0),k&&!b.wordPaste&&(o=o.replace(/^\n*/g,"").replace(/^ /g,""),0===o.indexOf("<colgroup>")&&(o="<table>"+o+"</table>"),o=f(o),o=l(o)),b.opts.pastePlain&&(o=g(o)),m=b.events.chainTrigger("paste.afterCleanup",o),"string"==typeof m&&(o=m),""!==o){var s=b.o_doc.createElement("div");s.innerHTML=o,b.spaces.normalize(s);var t=s.getElementsByTagName("span");for(c=t.length-1;c>=0;c--){var u=t[c];0===u.attributes.length&&(u.outerHTML=u.innerHTML)}var v=s.children;if(1==v.length&&["OL","UL"].indexOf(v[0].tagName)>=0&&(v[0].outerHTML=v[0].innerHTML),!r){var w=s.getElementsByTagName("br");for(c=w.length-1;c>=0;c--){var x=w[c];b.node.isBlock(x.previousSibling)&&x.parentNode.removeChild(x)}}if(b.opts.enter==a.FE.ENTER_BR)for(d=s.querySelectorAll("p, div"),c=d.length-1;c>=0;c--)e=d[c],e.outerHTML=e.innerHTML+(e.nextSibling&&!b.node.isEmpty(e)?"<br>":"");else if(b.opts.enter==a.FE.ENTER_DIV)for(d=s.getElementsByTagName("p"),c=d.length-1;c>=0;c--)e=d[c],e.outerHTML="<div>"+e.innerHTML+"</div>";o=s.innerHTML,b.html.insert(o,!0)}j(),b.undo.saveStep(i),b.undo.saveStep()}function j(){b.events.trigger("paste.after")}function k(){return p}function l(a){var c,d=b.o_doc.createElement("div");d.innerHTML=a;for(var e=d.querySelectorAll("*:empty:not(br):not(img):not(td):not(th)");e.length;){for(c=0;c<e.length;c++)e[c].parentNode.removeChild(e[c]);e=d.querySelectorAll("*:empty:not(br):not(img):not(td):not(th)")}for(var f=d.querySelectorAll(":scope > div:not([style]), td > div:not([style]), th > div:not([style]), li > div:not([style])");f.length;){var g=f[f.length-1];if(b.html.defaultTag()&&"div"!=b.html.defaultTag())g.querySelector(b.html.blockTagsQuery())?g.outerHTML=g.innerHTML:g.outerHTML="<"+b.html.defaultTag()+">"+g.innerHTML+"</"+b.html.defaultTag()+">";else{var h=g.querySelectorAll("*");h.length&&"BR"===h[h.length-1].tagName?g.outerHTML=g.innerHTML:g.outerHTML=g.innerHTML+"<br>"}f=d.querySelectorAll(":scope > div:not([style]), td > div:not([style]), th > div:not([style]), li > div:not([style])")}for(f=d.querySelectorAll("div:not([style])");f.length;){for(c=0;c<f.length;c++){var i=f[c],j=i.innerHTML.replace(/\u0009/gi,"").trim();i.outerHTML=j}f=d.querySelectorAll("div:not([style])")}return d.innerHTML}function m(){b.events.on("copy",c),b.events.on("cut",c),b.events.on("paste",d),b.browser.msie&&b.browser.version<11&&(b.events.on("mouseup",function(a){2==a.button&&(setTimeout(function(){r=!1},50),r=!0)},!0),b.events.on("beforepaste",d))}var n,o,p,q,r=!1;return{_init:m,removeEmptyTags:l,getRtfClipboard:k,isWord:h}},a.extend(a.FE.DEFAULTS,{shortcutsEnabled:["show","bold","italic","underline","strikeThrough","indent","outdent","undo","redo"],shortcutsHint:!0}),a.FE.SHORTCUTS_MAP={},a.FE.RegisterShortcut=function(b,c,d,e,f,g){a.FE.SHORTCUTS_MAP[(f?"^":"")+(g?"@":"")+b]={cmd:c,val:d,letter:e,shift:f,option:g},a.FE.DEFAULTS.shortcutsEnabled.push(c)},a.FE.RegisterShortcut(a.FE.KEYCODE.E,"show",null,"E",!1,!1),a.FE.RegisterShortcut(a.FE.KEYCODE.B,"bold",null,"B",!1,!1),a.FE.RegisterShortcut(a.FE.KEYCODE.I,"italic",null,"I",!1,!1),a.FE.RegisterShortcut(a.FE.KEYCODE.U,"underline",null,"U",!1,!1),a.FE.RegisterShortcut(a.FE.KEYCODE.S,"strikeThrough",null,"S",!1,!1),a.FE.RegisterShortcut(a.FE.KEYCODE.CLOSE_SQUARE_BRACKET,"indent",null,"]",!1,!1),a.FE.RegisterShortcut(a.FE.KEYCODE.OPEN_SQUARE_BRACKET,"outdent",null,"[",!1,!1),a.FE.RegisterShortcut(a.FE.KEYCODE.Z,"undo",null,"Z",!1,!1),a.FE.RegisterShortcut(a.FE.KEYCODE.Z,"redo",null,"Z",!0,!1),a.FE.MODULES.shortcuts=function(b){function c(c){if(!b.opts.shortcutsHint)return null;if(!f){f={};for(var d in a.FE.SHORTCUTS_MAP)a.FE.SHORTCUTS_MAP.hasOwnProperty(d)&&b.opts.shortcutsEnabled.indexOf(a.FE.SHORTCUTS_MAP[d].cmd)>=0&&(f[a.FE.SHORTCUTS_MAP[d].cmd+"."+(a.FE.SHORTCUTS_MAP[d].val||"")]={shift:a.FE.SHORTCUTS_MAP[d].shift,option:a.FE.SHORTCUTS_MAP[d].option,letter:a.FE.SHORTCUTS_MAP[d].letter})}var e=f[c];return e?(b.helpers.isMac()?String.fromCharCode(8984):"Ctrl+")+(e.shift?b.helpers.isMac()?String.fromCharCode(8679):"Shift+":"")+(e.option?b.helpers.isMac()?String.fromCharCode(8997):"Alt+":"")+e.letter:null}function d(c){if(!b.core.hasFocus())return!0;var d=c.which,e=navigator.userAgent.indexOf("Mac OS X")!=-1?c.metaKey:c.ctrlKey;if("keyup"==c.type&&g&&d!=a.FE.KEYCODE.META)return g=!1,!1;"keydown"==c.type&&(g=!1);var f=(c.shiftKey?"^":"")+(c.altKey?"@":"")+d;if(e&&a.FE.SHORTCUTS_MAP[f]){var h=a.FE.SHORTCUTS_MAP[f].cmd;if(h&&b.opts.shortcutsEnabled.indexOf(h)>=0){var i,j=a.FE.SHORTCUTS_MAP[f].val;if(h&&!j?i=b.$tb.find('.fr-command[data-cmd="'+h+'"]'):h&&j&&(i=b.$tb.find('.fr-command[data-cmd="'+h+'"][data-param1="'+j+'"]')),i.length)return c.preventDefault(),c.stopPropagation(),i.parents(".fr-toolbar").data("instance",b),"keydown"==c.type&&(b.button.exec(i),g=!0),!1;if(h&&b.commands[h])return c.preventDefault(),c.stopPropagation(),"keydown"==c.type&&(b.commands[h](),g=!0),!1}}}function e(){b.events.on("keydown",d,!0),b.events.on("keyup",d,!0)}var f=null,g=!1;return{_init:e,get:c}},a.FE.MODULES.snapshot=function(a){function b(a){for(var b=a.parentNode.childNodes,c=0,d=null,e=0;e<b.length;e++){if(d){var f=b[e].nodeType===Node.TEXT_NODE&&""===b[e].textContent,g=d.nodeType===Node.TEXT_NODE&&b[e].nodeType===Node.TEXT_NODE;f||g||c++}if(b[e]==a)return c;d=b[e]}}function c(c){var d=[];if(!c.parentNode)return[];for(;!a.node.isElement(c);)d.push(b(c)),c=c.parentNode;return d.reverse()}function d(a,b){for(;a&&a.nodeType===Node.TEXT_NODE;){var c=a.previousSibling;c&&c.nodeType==Node.TEXT_NODE&&(b+=c.textContent.length),a=c}return b}function e(a){return{scLoc:c(a.startContainer),scOffset:d(a.startContainer,a.startOffset),ecLoc:c(a.endContainer),ecOffset:d(a.endContainer,a.endOffset)}}function f(){var b={};if(a.events.trigger("snapshot.before"),b.html=(a.$wp?a.$el.html():a.$oel.get(0).outerHTML).replace(/ style=""/g,""),b.ranges=[],a.$wp&&a.selection.inEditor()&&a.core.hasFocus())for(var c=a.selection.ranges(),d=0;d<c.length;d++)b.ranges.push(e(c[d]));return a.events.trigger("snapshot.after"),b}function g(b){for(var c=a.el,d=0;d<b.length;d++)c=c.childNodes[b[d]];return c}function h(b,c){try{var d=g(c.scLoc),e=c.scOffset,f=g(c.ecLoc),h=c.ecOffset,i=a.doc.createRange();i.setStart(d,e),i.setEnd(f,h),b.addRange(i)}catch(j){console.warn(j)}}function i(b){a.$el.html()!=b.html&&a.$el.html(b.html);var c=a.selection.get();a.selection.clear(),a.events.focus(!0);for(var d=0;d<b.ranges.length;d++)h(c,b.ranges[d])}function j(b,c){return b.html==c.html&&(!a.core.hasFocus()||JSON.stringify(b.ranges)==JSON.stringify(c.ranges))}return{get:f,restore:i,equal:j}},a.FE.MODULES.undo=function(a){function b(b){var c=b.which,d=a.keys.ctrlKey(b);d&&(90==c&&b.shiftKey&&b.preventDefault(),90==c&&b.preventDefault())}function c(){return!(0===a.undo_stack.length||a.undo_index<=1)}function d(){return a.undo_index!=a.undo_stack.length}function e(b){return!(!a.undo_stack||a.undoing||a.el.querySelector(".fr-marker"))&&void("undefined"==typeof b?(b=a.snapshot.get(),a.undo_stack[a.undo_index-1]&&a.snapshot.equal(a.undo_stack[a.undo_index-1],b)||(f(),a.undo_stack.push(b),a.undo_index++,b.html!=l&&(a.events.trigger("contentChanged"),l=b.html))):(f(),a.undo_index>0?a.undo_stack[a.undo_index-1]=b:(a.undo_stack.push(b),a.undo_index++)))}function f(){if(!a.undo_stack||a.undoing)return!1;for(;a.undo_stack.length>a.undo_index;)a.undo_stack.pop()}function g(){if(a.undo_index>1){a.undoing=!0;var b=a.undo_stack[--a.undo_index-1];clearTimeout(a._content_changed_timer),a.snapshot.restore(b),l=b.html,a.popups.hideAll(),a.toolbar.enable(),a.events.trigger("contentChanged"),a.events.trigger("commands.undo"),a.undoing=!1}}function h(){if(a.undo_index<a.undo_stack.length){a.undoing=!0;var b=a.undo_stack[a.undo_index++];clearTimeout(a._content_changed_timer),a.snapshot.restore(b),l=b.html,a.popups.hideAll(),a.toolbar.enable(),a.events.trigger("contentChanged"),a.events.trigger("commands.redo"),a.undoing=!1}}function i(){a.undo_index=0,a.undo_stack=[]}function j(){a.undo_stack=[]}function k(){i(),a.events.on("initialized",function(){l=(a.$wp?a.$el.html():a.$oel.get(0).outerHTML).replace(/ style=""/g,"")}),a.events.on("blur",function(){a.el.querySelector(".fr-dragging")||a.undo.saveStep()}),a.events.on("keydown",b),a.events.on("destroy",j)}var l=null;return{_init:k,run:g,redo:h,canDo:c,canRedo:d,dropRedo:f,reset:i,saveStep:e}},a.FE.ICON_DEFAULT_TEMPLATE="font_awesome",a.FE.ICON_TEMPLATES={font_awesome:'<i class="fa fa-[NAME]" aria-hidden="true"></i>',text:'<span style="text-align: center;">[NAME]</span>',image:"<img src=[SRC] alt=[ALT] />",svg:'<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">[PATH]</svg>'},a.FE.ICONS={bold:{NAME:"bold"},italic:{NAME:"italic"},underline:{NAME:"underline"},strikeThrough:{NAME:"strikethrough"},subscript:{NAME:"subscript"},superscript:{NAME:"superscript"},color:{NAME:"tint"},outdent:{NAME:"outdent"},indent:{NAME:"indent"},undo:{NAME:"rotate-left"},redo:{NAME:"rotate-right"},insertHR:{NAME:"minus"},clearFormatting:{NAME:"eraser"},selectAll:{NAME:"mouse-pointer"}},a.FE.DefineIconTemplate=function(b,c){a.FE.ICON_TEMPLATES[b]=c},a.FE.DefineIcon=function(b,c){a.FE.ICONS[b]=c},a.FE.MODULES.icon=function(){function b(b){var c=null,d=a.FE.ICONS[b];if("undefined"!=typeof d){var e=d.template||a.FE.ICON_DEFAULT_TEMPLATE;e&&(e=a.FE.ICON_TEMPLATES[e])&&(c=e.replace(/\[([a-zA-Z]*)\]/g,function(a,c){return"NAME"==c?d[c]||b:d[c]}))}return c||b}function c(b){var c=a.FE.ICONS[b],d=a.FE.ICON_DEFAULT_TEMPLATE;return"undefined"!=typeof c?d=c.template||a.FE.ICON_DEFAULT_TEMPLATE:d}return{create:b,getTemplate:c}},a.extend(a.FE.DEFAULTS,{tooltips:!0}),a.FE.MODULES.tooltip=function(b){function c(){b.$tooltip&&b.$tooltip.removeClass("fr-visible").css("left","-3000px").css("position","fixed")}function d(c,d){if(c.data("title")||c.data("title",c.attr("title")),!c.data("title"))return!1;b.$tooltip||f(),c.removeAttr("title"),b.$tooltip.text(c.data("title")),b.$tooltip.addClass("fr-visible");var e=c.offset().left+(c.outerWidth()-b.$tooltip.outerWidth())/2;e<0&&(e=0),e+b.$tooltip.outerWidth()>a(b.o_win).width()&&(e=a(b.o_win).width()-b.$tooltip.outerWidth()),"undefined"==typeof d&&(d=b.opts.toolbarBottom);var g=d?c.offset().top-b.$tooltip.height():c.offset().top+c.outerHeight();b.$tooltip.css("position",""),b.$tooltip.css("left",e),b.$tooltip.css("top",Math.ceil(g)),"static"!=a(b.o_doc).find("body").css("position")?(b.$tooltip.css("margin-left",-a(b.o_doc).find("body").offset().left),b.$tooltip.css("margin-top",-a(b.o_doc).find("body").offset().top)):(b.$tooltip.css("margin-left",""),b.$tooltip.css("margin-top",""))}function e(e,f,g){b.opts.tooltips&&!b.helpers.isMobile()&&(b.events.$on(e,"mouseenter",f,function(c){b.node.hasClass(c.currentTarget,"fr-disabled")||b.edit.isDisabled()||d(a(c.currentTarget),g)},!0),b.events.$on(e,"mouseleave "+b._mousedown+" "+b._mouseup,f,function(){c()},!0))}function f(){b.opts.tooltips&&!b.helpers.isMobile()&&(b.shared.$tooltip?b.$tooltip=b.shared.$tooltip:(b.shared.$tooltip=a('<div class="fr-tooltip"></div>'),b.$tooltip=b.shared.$tooltip,b.opts.theme&&b.$tooltip.addClass(b.opts.theme+"-theme"),a(b.o_doc).find("body").append(b.$tooltip)),b.events.on("shared.destroy",function(){b.$tooltip.html("").removeData().remove(),b.$tooltip=null},!0))}return{hide:c,to:d,bind:e}},a.FE.MODULES.button=function(b){function c(b,c,d){for(var e=a(),f=0;f<b.length;f++){var g=a(b[f]);if(g.is(c)&&(e=e.add(g)),d&&g.is(".fr-dropdown")){var h=g.next().find(c);e=e.add(h)}}return e}function d(d,e){var f,g=a();if(!d)return g;g=g.add(c(v,d,e)),g=g.add(c(w,d,e));for(f in b.shared.popups)if(b.shared.popups.hasOwnProperty(f)){var h=b.shared.popups[f],i=h.children().not(".fr-buttons").find(d);g=g.add(i)}for(f in b.shared.modals)if(b.shared.modals.hasOwnProperty(f)){var j=b.shared.modals[f],k=j.$modal.find(d);g=g.add(k)}return g}function e(c){var e=c.next(),f=b.node.hasClass(c.get(0),"fr-active"),g=d(".fr-dropdown.fr-active").not(c),h=c.parents(".fr-toolbar, .fr-popup").data("instance")||b;if(h.helpers.isIOS()&&!h.el.querySelector(".fr-marker")&&(h.selection.save(),h.selection.clear(),h.selection.restore()),!f){var i=c.data("cmd");e.find(".fr-command").removeClass("fr-active").attr("aria-selected",!1),a.FE.COMMANDS[i]&&a.FE.COMMANDS[i].refreshOnShow&&a.FE.COMMANDS[i].refreshOnShow.apply(h,[c,e]),e.css("left",c.offset().left-c.parent().offset().left-("rtl"==b.opts.direction?e.width()-c.outerWidth():0)),b.opts.toolbarBottom?e.css("bottom",b.$tb.height()-c.position().top):e.css("top",c.position().top+c.outerHeight())}c.addClass("fr-blink").toggleClass("fr-active"),c.hasClass("fr-active")?(e.attr("aria-hidden",!1),c.attr("aria-expanded",!0)):(e.attr("aria-hidden",!0),c.attr("aria-expanded",!1)),setTimeout(function(){c.removeClass("fr-blink")},300),e.offset().left+e.outerWidth()>b.$sc.offset().left+b.$sc.outerWidth()&&e.css("margin-left",-(e.offset().left+e.outerWidth()-b.$sc.offset().left-b.$sc.outerWidth())),g.removeClass("fr-active").attr("aria-expanded",!1).next().attr("aria-hidden",!0),g.parent(".fr-toolbar:not(.fr-inline)").css("zIndex",""),0!==c.parents(".fr-popup").length||b.opts.toolbarInline||(b.node.hasClass(c.get(0),"fr-active")?b.$tb.css("zIndex",(b.opts.zIndex||1)+4):b.$tb.css("zIndex",""));var j=e.find("a.fr-command.fr-active:first");j.length?b.accessibility.focusToolbarElement(j):b.accessibility.focusToolbarElement(c)}function f(a){a.addClass("fr-blink"),setTimeout(function(){a.removeClass("fr-blink")},500);for(var b=a.data("cmd"),c=[];"undefined"!=typeof a.data("param"+(c.length+1));)c.push(a.data("param"+(c.length+1)));var e=d(".fr-dropdown.fr-active");e.length&&(e.removeClass("fr-active").attr("aria-expanded",!1).next().attr("aria-hidden",!0),e.parent(".fr-toolbar:not(.fr-inline)").css("zIndex","")),a.parents(".fr-popup, .fr-toolbar").data("instance").commands.exec(b,c)}function g(a){f(a)}function h(c){var d=c.parents(".fr-popup, .fr-toolbar").data("instance");if(0!==c.parents(".fr-popup").length||c.data("popup")||d.popups.hideAll(),d.popups.areVisible()&&!d.popups.areVisible(d)){for(var f=0;f<a.FE.INSTANCES.length;f++)a.FE.INSTANCES[f]!=d&&a.FE.INSTANCES[f].popups&&a.FE.INSTANCES[f].popups.areVisible()&&a.FE.INSTANCES[f].$el.find(".fr-marker").remove();d.popups.hideAll()}b.node.hasClass(c.get(0),"fr-dropdown")?e(c):(g(c),a.FE.COMMANDS[c.data("cmd")]&&a.FE.COMMANDS[c.data("cmd")].refreshAfterCallback!==!1&&d.button.bulkRefresh())}function i(b){var c=a(b.currentTarget);h(c)}function j(a){var b=a.find(".fr-dropdown.fr-active");b.length&&(b.removeClass("fr-active").attr("aria-expanded",!1).next().attr("aria-hidden",!0),b.parent(".fr-toolbar:not(.fr-inline)").css("zIndex",""))}function k(a){a.preventDefault(),a.stopPropagation()}function l(a){if(a.stopPropagation(),!b.helpers.isMobile())return!1}function m(c,d){b.events.bindClick(c,".fr-command:not(.fr-disabled)",i),b.events.$on(c,b._mousedown+" "+b._mouseup+" "+b._move,".fr-dropdown-menu",k,!0),b.events.$on(c,b._mousedown+" "+b._mouseup+" "+b._move,".fr-dropdown-menu .fr-dropdown-wrapper",l,!0);var e=c.get(0).ownerDocument,f="defaultView"in e?e.defaultView:e.parentWindow,g=function(d){(!d||d.type==b._mouseup&&d.target!=a("html").get(0)||"keydown"==d.type&&(b.keys.isCharacter(d.which)&&!b.keys.ctrlKey(d)||d.which==a.FE.KEYCODE.ESC))&&j(c)};b.events.$on(a(f),b._mouseup+" resize keydown",g,!0),b.opts.iframe&&b.events.$on(b.$win,b._mouseup,g,!0),b.node.hasClass(c.get(0),"fr-popup")?a.merge(w,c.find(".fr-btn").toArray()):a.merge(v,c.find(".fr-btn").toArray()),b.tooltip.bind(c,".fr-btn, .fr-title",d)}function n(a,c){var d="";if(c.html)d+="function"==typeof c.html?c.html.call(b):c.html;else{var e=c.options;"function"==typeof e&&(e=e()),d+='<ul class="fr-dropdown-list" role="presentation">';for(var f in e)if(e.hasOwnProperty(f)){var g=b.shortcuts.get(a+"."+f);g=g?'<span class="fr-shortcut">'+g+"</span>":"",d+='<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="'+a+'" data-param1="'+f+'" title="'+e[f]+'">'+b.language.translate(e[f])+"</a></li>"}d+="</ul>"}return d}function o(a,c,d){if(b.helpers.isMobile()&&c.showOnMobile===!1)return"";var e=c.displaySelection;"function"==typeof e&&(e=e(b));var f;if(e){var g="function"==typeof c.defaultSelection?c.defaultSelection(b):c.defaultSelection;f='<span style="width:'+(c.displaySelectionWidth||100)+'px">'+(g||b.language.translate(c.title))+"</span>"}else f=b.icon.create(c.icon||a),f+='<span class="fr-sr-only">'+(b.language.translate(c.title)||"")+"</span>";var h=c.popup?' data-popup="true"':"",i=c.modal?' data-modal="true"':"",j=b.shortcuts.get(a+".");j=j?" ("+j+")":"";var k=a+"-"+b.id,l='<button id="'+k+'"type="button" tabIndex="-1" role="button"'+(c.toggle?' aria-pressed="false"':"")+("dropdown"==c.type?' aria-controls="drop" aria-expanded="false" aria-haspopup="true"':"")+(c.disabled?' aria-disabled="true"':"")+' title="'+(b.language.translate(c.title)||"")+j+'" class="fr-command fr-btn'+("dropdown"==c.type?" fr-dropdown":"")+(" fr-btn-"+b.icon.getTemplate(c.icon))+(c.displaySelection?" fr-selection":"")+(c.back?" fr-back":"")+(c.disabled?" fr-disabled":"")+(d?"":" fr-hidden")+'" data-cmd="'+a+'"'+h+i+">"+f+"</button>";if("dropdown"==c.type){var m='<div class="fr-dropdown-menu" role="listbox" aria-labelledby="'+k+'" aria-hidden="true"><div class="fr-dropdown-wrapper" role="presentation"><div class="fr-dropdown-content" role="presentation">';m+=n(a,c),m+="</div></div></div>",l+=m}return l}function p(c,d){for(var e="",f=0;f<c.length;f++){var g=c[f],h=a.FE.COMMANDS[g];if(!(h&&"undefined"!=typeof h.plugin&&b.opts.pluginsEnabled.indexOf(h.plugin)<0))if(h){var i="undefined"==typeof d||d.indexOf(g)>=0;e+=o(g,h,i)}else"|"==g?e+='<div class="fr-separator fr-vs" role="separator" aria-orientation="vertical"></div>':"-"==g&&(e+='<div class="fr-separator fr-hs" role="separator" aria-orientation="horizontal"></div>')}return e}function q(c){var d,e=c.parents(".fr-popup, .fr-toolbar").data("instance")||b,f=c.data("cmd");b.node.hasClass(c.get(0),"fr-dropdown")?d=c.next():(c.removeClass("fr-active"),c.attr("aria-pressed")&&c.attr("aria-pressed",!1)),a.FE.COMMANDS[f]&&a.FE.COMMANDS[f].refresh?a.FE.COMMANDS[f].refresh.apply(e,[c,d]):b.refresh[f]&&e.refresh[f](c,d)}function r(c){var d=b.$tb?b.$tb.data("instance")||b:b;return b.events.trigger("buttons.refresh")===!1||void setTimeout(function(){for(var e=d.selection.inEditor()&&d.core.hasFocus(),f=0;f<c.length;f++){var g=a(c[f]),h=g.data("cmd");0===g.parents(".fr-popup").length?e||a.FE.COMMANDS[h]&&a.FE.COMMANDS[h].forcedRefresh?d.button.refresh(g):b.node.hasClass(g.get(0),"fr-dropdown")||(g.removeClass("fr-active"),g.attr("aria-pressed")&&g.attr("aria-pressed",!1)):g.parents(".fr-popup").is(":visible")&&d.button.refresh(g)}},0)}function s(){r(v),r(w)}function t(){v=[],w=[]}function u(){b.opts.toolbarInline?b.events.on("toolbar.show",s):(b.events.on("mouseup",s),b.events.on("keyup",s),b.events.on("blur",s),b.events.on("focus",s),b.events.on("contentChanged",s)),b.events.on("shared.destroy",t)}var v=[];(b.opts.toolbarInline||b.opts.toolbarContainer)&&(b.shared.buttons||(b.shared.buttons=[]),v=b.shared.buttons);var w=[];return b.shared.popup_buttons||(b.shared.popup_buttons=[]),w=b.shared.popup_buttons,{_init:u,buildList:p,bindCommands:m,refresh:q,bulkRefresh:s,exec:f,click:h,hideActiveDropdowns:j,getButtons:d}},a.FE.MODULES.modals=function(b){function c(a){return n[a]}function d(c,d){var e='<div tabIndex="-1" class="fr-modal'+(b.opts.theme?" "+b.opts.theme+"-theme":"")+'"><div class="fr-modal-wrapper">',f='<i title="'+b.language.translate("Cancel")+'" class="fa fa-times fr-modal-close"></i>';return e+='<div class="fr-modal-head">'+c+f+"</div>",e+='<div tabIndex="-1" class="fr-modal-body">'+d+"</div>",e+="</div></div>",a(e)}function e(c,e,f){if(b.shared.$overlay||(b.shared.$overlay=a('<div class="fr-overlay">').appendTo("body")),m=b.shared.$overlay,b.opts.theme&&m.addClass(b.opts.theme+"-theme"),!n[c]){var g=d(e,f);n[c]={$modal:g,$head:g.find(".fr-modal-head"),$body:g.find(".fr-modal-body")},b.helpers.isMobile()||g.addClass("fr-desktop"),g.appendTo("body"),b.events.bindClick(g,"i.fr-modal-close",function(){h(c)}),n[c].$body.css("margin-top",n[c].$head.outerHeight()),b.events.$on(g,"keydown",function(d){var e=d.which;return e==a.FE.KEYCODE.ESC?(h(c),b.accessibility.focusModalButton(g),!1):!(!a(d.currentTarget).is("input[type=text], textarea")&&e!=a.FE.KEYCODE.ARROW_UP&&e!=a.FE.KEYCODE.ARROW_DOWN&&!b.keys.isBrowserAction(d))||(d.preventDefault(),d.stopPropagation(),!1)},!0),h(c,!0)}return n[c]}function f(){for(var a in n){var b=n[a];b&&b.$modal&&b.$modal.removeData().remove()}m&&m.removeData().remove(),n={}}function g(a){if(n[a]){var c=n[a].$modal;c.data("instance",b),c.show(),m.show(),b.$doc.find("body").addClass("prevent-scroll"),b.helpers.isMobile()&&b.$doc.find("body").addClass("fr-mobile"),c.addClass("fr-active"),b.accessibility.focusModal(c)}}function h(a,c){if(n[a]){var d=n[a].$modal,e=d.data("instance")||b;e.events.enableBlur(),d.hide(),m.hide(),e.$doc.find("body").removeClass("prevent-scroll fr-mobile"),d.removeClass("fr-active"),c||(b.accessibility.restoreSelection(e),b.events.trigger("modals.hide"))}}function i(a){if(n[a]){var c=n[a],d=c.$modal,e=c.$body,f=b.$win.height(),g=d.find(".fr-modal-wrapper"),h=g.outerHeight(!0),i=g.height()-(e.outerHeight(!0)-e.height()),j=f-h+i,k=e.get(0).scrollHeight,l="auto";k>j&&(l=j),e.height(l)}}function j(a){var c;if("string"==typeof a){if(!n[a])return;c=n[a].$modal}else c=a;return c&&b.node.hasClass(c,"fr-active")&&b.core.sameInstance(c)||!1}function k(a){for(var b in n)if(n.hasOwnProperty(b)&&j(b)&&("undefined"==typeof a||n[b].$modal.data("instance")==a))return n[b].$modal;return!1}function l(){b.events.on("shared.destroy",f,!0)}b.shared.modals||(b.shared.modals={});var m,n=b.shared.modals;return{_init:l,get:c,create:e,show:g,hide:h,resize:i,isVisible:j,areVisible:k}},a.FE.POPUP_TEMPLATES={"text.edit":"[_EDIT_]"},a.FE.RegisterTemplate=function(b,c){a.FE.POPUP_TEMPLATES[b]=c},a.FE.MODULES.popups=function(b){function c(a,c){c.is(":visible")||(c=b.$sc),c.is(x[a].data("container"))||(x[a].data("container",c),c.append(x[a]))}function d(a,d,e,h){if(g()&&b.$el.find(".fr-marker").length>0?(b.events.disableBlur(),b.selection.restore()):(b.events.disableBlur(),b.events.focus(),b.events.enableBlur()),m([a]),!x[a])return!1;var i=b.button.getButtons(".fr-dropdown.fr-active");i.removeClass("fr-active").attr("aria-expanded",!1).parent(".fr-toolbar").css("zIndex",""),i.next().attr("aria-hidden",!0),x[a].data("instance",b),b.$tb&&b.$tb.data("instance",b);var j=x[a].outerWidth(),k=f(a);x[a].addClass("fr-active").removeClass("fr-hidden").find("input, textarea").removeAttr("disabled");var l=x[a].data("container");b.opts.toolbarInline&&l&&b.$tb&&l.get(0)==b.$tb.get(0)&&(c(a,b.$sc),e=b.$tb.offset().top-b.helpers.getPX(b.$tb.css("margin-top")),d=b.$tb.offset().left+b.$tb.outerWidth()/2+(parseFloat(b.$tb.find(".fr-arrow").css("margin-left"))||0)+b.$tb.find(".fr-arrow").outerWidth()/2,b.node.hasClass(b.$tb.get(0),"fr-above")&&e&&(e+=b.$tb.outerHeight()),h=0),l=x[a].data("container"),!b.opts.iframe||h||k||(d&&(d-=b.$iframe.offset().left),e&&(e-=b.$iframe.offset().top)),l.is(b.$tb)?b.$tb.css("zIndex",(b.opts.zIndex||1)+4):x[a].css("zIndex",(b.opts.zIndex||1)+4),d&&(d-=j/2),b.opts.toolbarBottom&&l&&b.$tb&&l.get(0)==b.$tb.get(0)&&(x[a].addClass("fr-above"),e&&(e-=x[a].outerHeight())),x[a].removeClass("fr-active"),b.position.at(d,e,x[a],h||0),x[a].addClass("fr-active"),k||b.accessibility.focusPopup(x[a]),b.opts.toolbarInline&&b.toolbar.hide(),b.events.trigger("popups.show."+a),s(a)._repositionPopup(),o()}function e(a,c){b.events.on("popups.show."+a,c)}function f(a){return x[a]&&b.node.hasClass(x[a],"fr-active")&&b.core.sameInstance(x[a])||!1}function g(a){for(var b in x)if(x.hasOwnProperty(b)&&f(b)&&("undefined"==typeof a||x[b].data("instance")==a))return x[b];return!1}function h(a){var c=null;c="string"!=typeof a?a:x[a],c&&b.node.hasClass(c,"fr-active")&&(c.removeClass("fr-active fr-above"),
b.events.trigger("popups.hide."+a),b.$tb&&(b.opts.zIndex>1?b.$tb.css("zIndex",b.opts.zIndex+1):b.$tb.css("zIndex","")),b.events.disableBlur(),c.find("input, textarea, button").filter(":focus").blur(),c.find("input, textarea").attr("disabled","disabled"))}function i(a,c){b.events.on("popups.hide."+a,c)}function j(a){var c=x[a];if(c&&!c.data("inst"+b.id)){var d=s(a);t(d,a)}return c}function k(a,c){b.events.on("popups.refresh."+a,c)}function l(c){b.events.trigger("popups.refresh."+c);for(var d=x[c].find(".fr-command"),e=0;e<d.length;e++){var f=a(d[e]);0===f.parents(".fr-dropdown-menu").length&&b.button.refresh(f)}}function m(a){"undefined"==typeof a&&(a=[]);for(var b in x)x.hasOwnProperty(b)&&a.indexOf(b)<0&&h(b)}function n(){b.shared.exit_flag=!0}function o(){b.shared.exit_flag=!1}function p(){return b.shared.exit_flag}function q(c,d){var e=a.FE.POPUP_TEMPLATES[c];"function"==typeof e&&(e=e.apply(b));for(var f in d)d.hasOwnProperty(f)&&(e=e.replace("[_"+f.toUpperCase()+"_]",d[f]));return e}function r(c,d){var e=q(c,d),f=a('<div class="fr-popup'+(b.helpers.isMobile()?" fr-mobile":" fr-desktop")+(b.opts.toolbarInline?" fr-inline":"")+'"><span class="fr-arrow"></span>'+e+"</div>");b.opts.theme&&f.addClass(b.opts.theme+"-theme"),b.opts.zIndex>1&&b.$tb.css("z-index",b.opts.zIndex+2),"auto"!=b.opts.direction&&f.removeClass("fr-ltr fr-rtl").addClass("fr-"+b.opts.direction),f.find("input, textarea").attr("dir",b.opts.direction).attr("disabled","disabled");var g=a("body");return g.append(f),f.data("container",g),x[c]=f,b.button.bindCommands(f,!1),f}function s(c){var d=x[c];return{_windowResize:function(){var a=d.data("instance")||b;!a.helpers.isMobile()&&d.is(":visible")&&(a.events.disableBlur(),a.popups.hide(c),a.events.enableBlur())},_inputFocus:function(c){var e=d.data("instance")||b,f=a(c.currentTarget);if(f.is("input:file")&&f.closest(".fr-layer").addClass("fr-input-focus"),c.preventDefault(),c.stopPropagation(),setTimeout(function(){e.events.enableBlur()},0),e.helpers.isMobile()){var g=a(e.o_win).scrollTop();setTimeout(function(){a(e.o_win).scrollTop(g)},0)}},_inputBlur:function(c){var e=d.data("instance")||b,f=a(c.currentTarget);f.is("input:file")&&f.closest(".fr-layer").removeClass("fr-input-focus"),document.activeElement!=this&&a(this).is(":visible")&&(e.events.blurActive()&&e.events.trigger("blur"),e.events.enableBlur())},_editorKeydown:function(e){var g=d.data("instance")||b;g.keys.ctrlKey(e)||e.which==a.FE.KEYCODE.ALT||e.which==a.FE.KEYCODE.ESC||(f(c)&&d.find(".fr-back:visible").length?g.button.exec(d.find(".fr-back:visible:first")):e.which!=a.FE.KEYCODE.ALT&&g.popups.hide(c))},_preventFocus:function(c){var e=d.data("instance")||b;"mouseup"==c.type&&b.button.hideActiveDropdowns(d);var f=c.originalEvent?c.originalEvent.target||c.originalEvent.originalTarget:null;"mouseup"==c.type||a(f).is(":focus")||e.events.disableBlur(),b.browser.safari&&"mousedown"==c.type&&a(f).is("input[type=file]")&&e.events.disableBlur();var g="input, textarea, button, select, label, .fr-command";return f&&!a(f).is(g)&&0===a(f).parents(g).length?(c.stopPropagation(),!1):(f&&a(f).is(g)&&c.stopPropagation(),void o())},_editorMouseup:function(){d.is(":visible")&&p()&&d.find("input:focus, textarea:focus, button:focus, select:focus").filter(":visible").length>0&&b.events.disableBlur()},_windowMouseup:function(a){if(!b.core.sameInstance(d))return!0;var e=d.data("instance")||b;d.is(":visible")&&p()&&(a.stopPropagation(),e.markers.remove(),e.popups.hide(c),o())},_windowKeydown:function(e){if(!b.core.sameInstance(d))return!0;var f=d.data("instance")||b,g=e.which;if(a.FE.KEYCODE.ESC==g){if(f.popups.isVisible(c)&&f.opts.toolbarInline)return e.stopPropagation(),f.popups.isVisible(c)&&(d.find(".fr-back:visible").length?(f.button.exec(d.find(".fr-back:visible:first")),f.accessibility.focusPopupButton(d)):d.find(".fr-dismiss:visible").length?f.button.exec(d.find(".fr-dismiss:visible:first")):(f.popups.hide(c),f.toolbar.showInline(null,!0),f.accessibility.FocusPopupButton(d))),!1;if(f.popups.isVisible(c))return d.find(".fr-back:visible").length?(f.button.exec(d.find(".fr-back:visible:first")),f.accessibility.focusPopupButton(d)):d.find(".fr-dismiss:visible").length?f.button.exec(d.find(".fr-dismiss:visible:first")):(f.popups.hide(c),f.accessibility.focusPopupButton(d)),!1}},_doPlaceholder:function(){var b=a(this).next();0===b.length&&a(this).attr("placeholder")&&a(this).after('<label for="'+a(this).attr("id")+'">'+a(this).attr("placeholder")+"</label>"),a(this).toggleClass("fr-not-empty",""!==a(this).val())},_repositionPopup:function(){if(!b.opts.height&&!b.opts.heightMax||b.opts.toolbarInline)return!0;if(b.$wp&&f(c)&&d.parent().get(0)==b.$sc.get(0)){var a=d.offset().top-b.$wp.offset().top,e=b.$wp.outerHeight();b.node.hasClass(d.get(0),"fr-above")&&(a+=d.outerHeight()),a>e||a<0?d.addClass("fr-hidden"):d.removeClass("fr-hidden")}}}}function t(a,c){b.events.on("mouseup",a._editorMouseup,!0),b.$wp&&b.events.on("keydown",a._editorKeydown),b.events.on("blur",function(){g()&&b.markers.remove(),m()}),b.$wp&&!b.helpers.isMobile()&&b.events.$on(b.$wp,"scroll.popup"+c,a._repositionPopup),b.events.on("window.mouseup",a._windowMouseup,!0),b.events.on("window.keydown",a._windowKeydown,!0),x[c].data("inst"+b.id,!0),b.events.on("destroy",function(){b.core.sameInstance(x[c])&&x[c].removeClass("fr-active").appendTo("body")},!0)}function u(c,d){var e=r(c,d),f=s(c);return t(f,c),b.events.$on(e,"mousedown mouseup touchstart touchend touch","*",f._preventFocus,!0),b.events.$on(e,"focus","input, textarea, button, select",f._inputFocus,!0),b.events.$on(e,"blur","input, textarea, button, select",f._inputBlur,!0),b.accessibility.registerPopup(c),b.events.$on(e,"keydown keyup change input","input, textarea",f._doPlaceholder,!0),b.helpers.isIOS()&&b.events.$on(e,"touchend","label",function(){a("#"+a(this).attr("for")).prop("checked",function(a,b){return!b})},!0),b.events.$on(a(b.o_win),"resize",f._windowResize,!0),e}function v(){for(var a in x)if(x.hasOwnProperty(a)){var b=x[a];b.html("").removeData().remove(),x[a]=null}x=[]}function w(){b.events.on("shared.destroy",v,!0),b.events.on("window.mousedown",n),b.events.on("window.touchmove",o),b.events.on("mousedown",function(a){g()&&(a.stopPropagation(),b.$el.find(".fr-marker").remove(),n(),b.events.disableBlur())})}b.shared.popups||(b.shared.popups={});var x=b.shared.popups;return b.shared.exit_flag=!1,{_init:w,create:u,get:j,show:d,hide:h,onHide:i,hideAll:m,setContainer:c,refresh:l,onRefresh:k,onShow:e,isVisible:f,areVisible:g}},a.FE.MODULES.position=function(b){function c(){var a=b.selection.ranges(0),c=a.getBoundingClientRect();if(0===c.top&&0===c.left&&0===c.width||0===c.height){var d=!1;0===b.$el.find(".fr-marker").length&&(b.selection.save(),d=!0);var e=b.$el.find(".fr-marker:first");e.css("display","inline"),e.css("line-height","");var f=e.offset(),g=e.outerHeight();e.css("display","none"),e.css("line-height",0),c={},c.left=f.left,c.width=0,c.height=g,c.top=f.top-(b.helpers.isMobile()?0:b.helpers.scrollTop()),c.right=1,c.bottom=1,c.ok=!0,d&&b.selection.restore()}return c}function d(a,c,d){var e=a.get(0).offsetHeight;if(!b.helpers.isMobile()&&b.$tb&&a.parent().get(0)!=b.$tb.get(0)){var f=a.parent().offset().top,g=c-e-(d||0);a.parent().get(0)==b.$sc.get(0)&&(f-=a.parent().position().top);var h=b.$sc.get(0).scrollHeight;f+c+e>b.$sc.offset().top+h&&a.parent().offset().top+g>0?(c=g,a.addClass("fr-above")):a.removeClass("fr-above")}return c}function e(a,c){var d=a.get(0).offsetWidth;return c+d>b.$sc.get(0).clientWidth-10&&(c=b.$sc.get(0).clientWidth-d-10),c<0&&(c=10),c}function f(a){var d=c();a.css({top:0,left:0});var e=d.top+d.height,f=d.left+d.width/2-a.get(0).offsetWidth/2+b.helpers.scrollLeft();b.opts.iframe||(e+=b.helpers.scrollTop()),g(f,e,a,d.height)}function g(a,c,f,g){var h=f.data("container");!h||"BODY"===h.get(0).tagName&&"static"==h.css("position")||(a&&(a-=h.offset().left),c&&(c-=h.offset().top),"BODY"!=h.get(0).tagName?(a&&(a+=h.get(0).scrollLeft),c&&(c+=h.get(0).scrollTop)):"absolute"==h.css("position")&&(a&&(a+=h.position().left),c&&(c+=h.position().top))),b.opts.iframe&&h&&b.$tb&&h.get(0)!=b.$tb.get(0)&&(a&&(a+=b.$iframe.offset().left),c&&(c+=b.$iframe.offset().top));var i=e(f,a);if(a){f.css("left",i);var j=f.data("fr-arrow");j||(j=f.find(".fr-arrow"),f.data("fr-arrow",j)),j.data("margin-left")||j.data("margin-left",b.helpers.getPX(j.css("margin-left"))),j.css("margin-left",a-i+j.data("margin-left"))}c&&f.css("top",d(f,c,g))}function h(c){var d=a(c),e=d.is(".fr-sticky-on"),f=d.data("sticky-top"),g=d.data("sticky-scheduled");if("undefined"==typeof f){d.data("sticky-top",0);var h=a('<div class="fr-sticky-dummy" style="height: '+d.outerHeight()+'px;"></div>');b.$box.prepend(h)}else b.$box.find(".fr-sticky-dummy").css("height",d.outerHeight());if(b.core.hasFocus()||b.$tb.find("input:visible:focus").length>0){var i=b.helpers.scrollTop(),j=Math.min(Math.max(i-b.$tb.parent().offset().top,0),b.$tb.parent().outerHeight()-d.outerHeight());j!=f&&j!=g&&(clearTimeout(d.data("sticky-timeout")),d.data("sticky-scheduled",j),d.outerHeight()<i-b.$tb.parent().offset().top&&d.addClass("fr-opacity-0"),d.data("sticky-timeout",setTimeout(function(){var a=b.helpers.scrollTop(),c=Math.min(Math.max(a-b.$tb.parent().offset().top,0),b.$tb.parent().outerHeight()-d.outerHeight());c>0&&"BODY"==b.$tb.parent().get(0).tagName&&(c+=b.$tb.parent().position().top),c!=f&&(d.css("top",Math.max(c,0)),d.data("sticky-top",c),d.data("sticky-scheduled",c)),d.removeClass("fr-opacity-0")},100))),e||(d.css("top","0"),d.width(b.$tb.parent().width()),d.addClass("fr-sticky-on"),b.$box.addClass("fr-sticky-box"))}else clearTimeout(a(c).css("sticky-timeout")),d.css("top","0"),d.css("position",""),d.width(""),d.data("sticky-top",0),d.removeClass("fr-sticky-on"),b.$box.removeClass("fr-sticky-box")}function i(c){if(c.offsetWidth){var d,e,f=a(c),g=f.outerHeight(),h=f.data("sticky-position"),i=a("body"==b.opts.scrollableContainer?b.o_win:b.opts.scrollableContainer).outerHeight(),j=0,k=0;"body"!==b.opts.scrollableContainer&&(j=b.$sc.offset().top,k=a(b.o_win).outerHeight()-j-i);var l="body"==b.opts.scrollableContainer?b.helpers.scrollTop():j,m=f.is(".fr-sticky-on");f.data("sticky-parent")||f.data("sticky-parent",f.parent());var n=f.data("sticky-parent"),o=n.offset().top,p=n.outerHeight();if(f.data("sticky-offset")||(f.data("sticky-offset",!0),f.after('<div class="fr-sticky-dummy" style="height: '+g+'px;"></div>')),!h){var q="auto"!==f.css("top")||"auto"!==f.css("bottom");q||f.css("position","fixed"),h={top:b.node.hasClass(f.get(0),"fr-top"),bottom:b.node.hasClass(f.get(0),"fr-bottom")},q||f.css("position",""),f.data("sticky-position",h),f.data("top",b.node.hasClass(f.get(0),"fr-top")?f.css("top"):"auto"),f.data("bottom",b.node.hasClass(f.get(0),"fr-bottom")?f.css("bottom"):"auto")}var r=function(){return o<l+d&&o+p-g>=l+d},s=function(){return o+g<l+i-e&&o+p>l+i-e};d=b.helpers.getPX(f.data("top")),e=b.helpers.getPX(f.data("bottom"));var t=h.top&&r(),u=h.bottom&&s();t||u?(f.css("width",n.width()+"px"),m||(f.addClass("fr-sticky-on"),f.removeClass("fr-sticky-off"),f.css("top")&&("auto"!=f.data("top")?f.css("top",b.helpers.getPX(f.data("top"))+j):f.data("top","auto")),f.css("bottom")&&("auto"!=f.data("bottom")?f.css("bottom",b.helpers.getPX(f.data("bottom"))+k):f.css("bottom","auto")))):b.node.hasClass(f.get(0),"fr-sticky-off")||(f.width(""),f.removeClass("fr-sticky-on"),f.addClass("fr-sticky-off"),f.css("top")&&"auto"!=f.data("top")&&h.top&&f.css("top",0),f.css("bottom")&&"auto"!=f.data("bottom")&&h.bottom&&f.css("bottom",0))}}function j(){var a=document.createElement("test"),c=a.style;return c.cssText="position:"+["-webkit-","-moz-","-ms-","-o-",""].join("sticky; position:")+" sticky;",c.position.indexOf("sticky")!==-1&&!b.helpers.isIOS()&&!b.helpers.isAndroid()&&!b.browser.chrome}function k(){if(!j())if(b._stickyElements=[],b.helpers.isIOS()){var c=function(){b.helpers.requestAnimationFrame()(c);for(var a=0;a<b._stickyElements.length;a++)h(b._stickyElements[a])};c(),b.events.$on(a(b.o_win),"scroll",function(){if(b.core.hasFocus())for(var c=0;c<b._stickyElements.length;c++){var d=a(b._stickyElements[c]),e=d.parent(),f=b.helpers.scrollTop();d.outerHeight()<f-e.offset().top&&(d.addClass("fr-opacity-0"),d.data("sticky-top",-1),d.data("sticky-scheduled",-1))}},!0)}else b.events.$on(a("body"==b.opts.scrollableContainer?b.o_win:b.opts.scrollableContainer),"scroll",l,!0),b.events.$on(a(b.o_win),"resize",l,!0),b.events.on("initialized",l),b.events.on("focus",l),b.events.$on(a(b.o_win),"resize","textarea",l,!0);b.events.on("destroy",function(){b._stickyElements=[]})}function l(){if(b._stickyElements)for(var a=0;a<b._stickyElements.length;a++)i(b._stickyElements[a])}function m(a){a.addClass("fr-sticky"),b.helpers.isIOS()&&a.addClass("fr-sticky-ios"),j()||b._stickyElements.push(a.get(0))}function n(){k()}return{_init:n,forSelection:f,addSticky:m,refresh:l,at:g,getBoundingRect:c}},a.FE.MODULES.refresh=function(b){function c(a){g(a,!b.undo.canDo())}function d(a){g(a,!b.undo.canRedo())}function e(a){if(b.node.hasClass(a.get(0),"fr-no-refresh"))return!1;for(var c=b.selection.blocks(),d=0;d<c.length;d++){for(var e=c[d].previousSibling;e&&e.nodeType==Node.TEXT_NODE&&0===e.textContent.length;)e=e.previousSibling;if("LI"!=c[d].tagName||e)return g(a,!1),!0;g(a,!0)}}function f(c){if(b.node.hasClass(c.get(0),"fr-no-refresh"))return!1;for(var d=b.selection.blocks(),e=0;e<d.length;e++){var f="rtl"==b.opts.direction||"rtl"==a(d[e]).css("direction")?"margin-right":"margin-left";if("LI"==d[e].tagName||"LI"==d[e].parentNode.tagName)return g(c,!1),!0;if(b.helpers.getPX(a(d[e]).css(f))>0)return g(c,!1),!0}g(c,!0)}function g(a,b){a.toggleClass("fr-disabled",b).attr("aria-disabled",b)}return{undo:c,redo:d,outdent:f,indent:e}},a.extend(a.FE.DEFAULTS,{editInPopup:!1}),a.FE.MODULES.textEdit=function(b){function c(){var a='<div id="fr-text-edit-'+b.id+'" class="fr-layer fr-text-edit-layer"><div class="fr-input-line"><input type="text" placeholder="'+b.language.translate("Text")+'" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="updateText" tabIndex="2">'+b.language.translate("Update")+"</button></div></div>",c={edit:a};b.popups.create("text.edit",c)}function d(){var c,d=b.popups.get("text.edit");c="INPUT"===b.$el.prop("tagName")?b.$el.attr("placeholder"):b.$el.text(),d.find("input").val(c).trigger("change"),b.popups.setContainer("text.edit",a("body")),b.popups.show("text.edit",b.$el.offset().left+b.$el.outerWidth()/2,b.$el.offset().top+b.$el.outerHeight(),b.$el.outerHeight())}function e(){b.events.$on(b.$el,b._mouseup,function(){setTimeout(function(){d()},10)})}function f(){var a=b.popups.get("text.edit"),c=a.find("input").val();0===c.length&&(c=b.opts.placeholderText),"INPUT"===b.$el.prop("tagName")?b.$el.attr("placeholder",c):b.$el.text(c),b.events.trigger("contentChanged"),b.popups.hide("text.edit")}function g(){b.opts.editInPopup&&(c(),e())}return{_init:g,update:f}},a.FE.RegisterCommand("updateText",{focus:!1,undo:!1,callback:function(){this.textEdit.update()}}),a.extend(a.FE.DEFAULTS,{toolbarBottom:!1,toolbarButtons:["fullscreen","print","bold","italic","underline","strikeThrough","subscript","superscript","fontFamily","fontSize","|","specialCharacters","color","emoticons","inlineStyle","paragraphStyle","|","paragraphFormat","align","formatOL","formatUL","outdent","indent","quote","insertHR","-","insertLink","insertImage","insertVideo","insertFile","insertTable","undo","redo","clearFormatting","selectAll","html","applyFormat","removeFormat","help"],toolbarButtonsXS:["bold","italic","fontFamily","fontSize","|","undo","redo"],toolbarButtonsSM:["bold","italic","underline","|","fontFamily","fontSize","insertLink","insertImage","table","|","undo","redo"],toolbarButtonsMD:["fullscreen","bold","italic","underline","fontFamily","fontSize","color","paragraphStyle","paragraphFormat","align","formatOL","formatUL","outdent","indent","quote","insertHR","-","insertLink","insertImage","insertVideo","insertFile","insertTable","undo","redo","clearFormatting"],toolbarContainer:null,toolbarInline:!1,toolbarSticky:!0,toolbarStickyOffset:0,toolbarVisibleWithoutSelection:!1}),a.FE.MODULES.toolbar=function(b){function c(a,b){for(var c=0;c<b.length;c++)"-"!=b[c]&&"|"!=b[c]&&a.indexOf(b[c])<0&&a.push(b[c])}function d(){var d=a.merge([],e());c(d,b.opts.toolbarButtonsXS||[]),c(d,b.opts.toolbarButtonsSM||[]),c(d,b.opts.toolbarButtonsMD||[]),c(d,b.opts.toolbarButtons);for(var f=d.length-1;f>=0;f--)"-"!=d[f]&&"|"!=d[f]&&d.indexOf(d[f])<f&&d.splice(f,1);var g=b.button.buildList(d,e());b.$tb.append(g),b.button.bindCommands(b.$tb)}function e(){var a=b.helpers.screenSize();return v[a]}function f(){var a=e();b.$tb.find(".fr-separator").remove(),b.$tb.find("> .fr-command").addClass("fr-hidden");for(var c=0;c<a.length;c++)if("|"==a[c]||"-"==a[c])b.$tb.append(b.button.buildList([a[c]]));else{var d=b.$tb.find('> .fr-command[data-cmd="'+a[c]+'"]'),f=null;b.node.hasClass(d.next().get(0),"fr-dropdown-menu")&&(f=d.next()),d.removeClass("fr-hidden").appendTo(b.$tb),f&&f.appendTo(b.$tb)}}function g(){b.events.$on(a(b.o_win),"resize",f),b.events.$on(a(b.o_win),"orientationchange",f)}function h(c,d){setTimeout(function(){if((!c||c.which!=a.FE.KEYCODE.ESC)&&b.selection.inEditor()&&b.core.hasFocus()&&!b.popups.areVisible()&&(b.opts.toolbarVisibleWithoutSelection||!b.selection.isCollapsed()&&!b.keys.isIME()||d)){if(b.$tb.data("instance",b),b.events.trigger("toolbar.show",[c])===!1)return!1;b.$tb.show(),b.opts.toolbarContainer||b.position.forSelection(b.$tb),b.opts.zIndex>1?b.$tb.css("z-index",b.opts.zIndex+1):b.$tb.css("z-index",null)}},0)}function i(){var a=b.button.getButtons(".fr-dropdown.fr-active");return!!a.next().find(b.o_doc.activeElement).length||void(b.events.trigger("toolbar.hide")!==!1&&b.$tb.hide())}function j(){return b.events.trigger("toolbar.show")!==!1&&void b.$tb.show()}function k(c){clearTimeout(w),c&&c.which==a.FE.KEYCODE.ESC||(w=setTimeout(h,b.opts.typingTimer))}function l(){b.events.on("window.mousedown",i),b.events.on("keydown",i),b.events.on("blur",i),b.events.on("window.mouseup",h),b.helpers.isMobile()?b.helpers.isIOS()||(b.events.on("window.touchend",h),b.browser.mozilla&&setInterval(h,200)):b.events.on("window.keyup",k),b.events.on("keydown",function(b){b&&b.which==a.FE.KEYCODE.ESC&&i()}),b.events.on("keydown",function(b){if(b.which==a.FE.KEYCODE.ALT)return b.stopPropagation(),!1},!0),b.events.$on(b.$wp,"scroll.toolbar",h),b.events.on("commands.after",h),b.helpers.isMobile()&&(b.events.$on(b.$doc,"selectionchange",k),b.events.$on(b.$doc,"orientationchange",h))}function m(){b.opts.toolbarInline?(b.$sc.append(b.$tb),b.$tb.data("container",b.$sc),b.$tb.addClass("fr-inline"),b.$tb.prepend('<span class="fr-arrow"></span>'),l(),b.opts.toolbarBottom=!1):(b.opts.toolbarBottom&&!b.helpers.isIOS()?(b.$box.append(b.$tb),b.$tb.addClass("fr-bottom"),b.$box.addClass("fr-bottom")):(b.opts.toolbarBottom=!1,b.$box.prepend(b.$tb),b.$tb.addClass("fr-top"),b.$box.addClass("fr-top")),b.$tb.addClass("fr-basic"),b.opts.toolbarSticky&&(b.opts.toolbarStickyOffset&&(b.opts.toolbarBottom?b.$tb.css("bottom",b.opts.toolbarStickyOffset):b.$tb.css("top",b.opts.toolbarStickyOffset)),b.position.addSticky(b.$tb)))}function n(){b.$tb.html("").removeData().remove(),b.$tb=null}function o(){b.$box.removeClass("fr-top fr-bottom fr-inline fr-basic"),b.$box.find(".fr-sticky-dummy").remove()}function p(){b.opts.theme&&b.$tb.addClass(b.opts.theme+"-theme"),b.opts.zIndex>1&&b.$tb.css("z-index",b.opts.zIndex+1),"auto"!=b.opts.direction&&b.$tb.removeClass("fr-ltr fr-rtl").addClass("fr-"+b.opts.direction),b.helpers.isMobile()?b.$tb.addClass("fr-mobile"):b.$tb.addClass("fr-desktop"),b.opts.toolbarContainer?(b.opts.toolbarInline&&(l(),i()),b.opts.toolbarBottom?b.$tb.addClass("fr-bottom"):b.$tb.addClass("fr-top")):m(),t=b.$tb.get(0).ownerDocument,u="defaultView"in t?t.defaultView:t.parentWindow,d(),g(),b.accessibility.registerToolbar(b.$tb),b.events.$on(b.$tb,b._mousedown+" "+b._mouseup,function(a){var c=a.originalEvent?a.originalEvent.target||a.originalEvent.originalTarget:null;if(c&&"INPUT"!=c.tagName&&!b.edit.isDisabled())return a.stopPropagation(),a.preventDefault(),!1},!0)}function q(){return b.$sc=a(b.opts.scrollableContainer),!!b.$wp&&(b.opts.toolbarContainer?(b.shared.$tb?(b.$tb=b.shared.$tb,b.opts.toolbarInline&&l()):(b.shared.$tb=a('<div class="fr-toolbar"></div>'),b.$tb=b.shared.$tb,a(b.opts.toolbarContainer).append(b.$tb),p(),b.$tb.data("instance",b)),b.opts.toolbarInline?b.$box.addClass("fr-inline"):b.$box.addClass("fr-basic"),b.events.on("focus",function(){b.$tb.data("instance",b)},!0),b.opts.toolbarInline=!1):b.opts.toolbarInline?(b.$box.addClass("fr-inline"),b.shared.$tb?(b.$tb=b.shared.$tb,l()):(b.shared.$tb=a('<div class="fr-toolbar"></div>'),b.$tb=b.shared.$tb,p())):(b.$box.addClass("fr-basic"),b.$tb=a('<div class="fr-toolbar"></div>'),p(),b.$tb.data("instance",b)),b.events.on("destroy",o,!0),void b.events.on(b.opts.toolbarInline||b.opts.toolbarContainer?"shared.destroy":"destroy",n,!0))}function r(){!x&&b.$tb&&(b.$tb.find("> .fr-command").addClass("fr-disabled fr-no-refresh").attr("aria-disabled",!0),x=!0)}function s(){x&&b.$tb&&(b.$tb.find("> .fr-command").removeClass("fr-disabled fr-no-refresh").attr("aria-disabled",!1),x=!1),b.button.bulkRefresh()}var t,u,v=[];v[a.FE.XS]=b.opts.toolbarButtonsXS||b.opts.toolbarButtons,v[a.FE.SM]=b.opts.toolbarButtonsSM||b.opts.toolbarButtons,v[a.FE.MD]=b.opts.toolbarButtonsMD||b.opts.toolbarButtons,v[a.FE.LG]=b.opts.toolbarButtons;var w=null,x=!1;return{_init:q,hide:i,show:j,showInline:h,disable:r,enable:s}}});
/*!
 * froala_editor v2.5.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2017 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c)}:a(window.jQuery)}(function(a){a.extend(a.FE.DEFAULTS,{fontSize:["8","9","10","11","12","14","18","24","30","36","48","60","72","96"],fontSizeSelection:!1,fontSizeDefaultSelection:"12"}),a.FE.PLUGINS.fontSize=function(b){function c(a){b.format.applyStyle("font-size",a)}function d(c,d){var e=a(b.selection.element()).css("font-size");d.find(".fr-command.fr-active").removeClass("fr-active").attr("aria-selected",!1),d.find('.fr-command[data-param1="'+e+'"]').addClass("fr-active").attr("aria-selected",!0);var f=d.find(".fr-dropdown-list"),g=d.find(".fr-active").parent();g.length?f.parent().scrollTop(g.offset().top-f.offset().top-(f.parent().outerHeight()/2-g.outerHeight()/2)):f.parent().scrollTop(0)}function e(c){if(b.opts.fontSizeSelection){var d=b.helpers.getPX(a(b.selection.element()).css("font-size"));c.find("> span").text(d)}}return{apply:c,refreshOnShow:d,refresh:e}},a.FE.RegisterCommand("fontSize",{type:"dropdown",title:"Font Size",displaySelection:function(a){return a.opts.fontSizeSelection},displaySelectionWidth:30,defaultSelection:function(a){return a.opts.fontSizeDefaultSelection},html:function(){for(var a='<ul class="fr-dropdown-list" role="presentation">',b=this.opts.fontSize,c=0;c<b.length;c++){var d=b[c];a+='<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="fontSize" data-param1="'+d+'px" title="'+d+'">'+d+"</a></li>"}return a+="</ul>"},callback:function(a,b){this.fontSize.apply(b)},refresh:function(a){this.fontSize.refresh(a)},refreshOnShow:function(a,b){this.fontSize.refreshOnShow(a,b)},plugin:"fontSize"}),a.FE.DefineIcon("fontSize",{NAME:"text-height"})});
/*!
 * froala_editor v2.5.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2017 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c)}:a(window.jQuery)}(function(a){a.extend(a.FE.DEFAULTS,{paragraphFormat:{N:"Normal",H1:"Heading 1",H2:"Heading 2",H3:"Heading 3",H4:"Heading 4",PRE:"Code"},paragraphFormatSelection:!1}),a.FE.PLUGINS.paragraphFormat=function(b){function c(c,d){var e=b.html.defaultTag();if(d&&d.toLowerCase()!=e)if(c.find("ul, ol").length>0){var f=a("<"+d+">");c.prepend(f);for(var g=b.node.contents(c.get(0))[0];g&&["UL","OL"].indexOf(g.tagName)<0;){var h=g.nextSibling;f.append(g),g=h}}else c.html("<"+d+">"+c.html()+"</"+d+">")}function d(c,d){var e=b.html.defaultTag();d||(d='div class="fr-temp-div" data-empty="true"'),d.toLowerCase()==e?c.replaceWith(c.html()):c.replaceWith(a("<"+d+">").html(c.html()))}function e(c,d){var e=b.html.defaultTag();d||(d='div class="fr-temp-div"'+(b.node.isEmpty(c.get(0),!0)?' data-empty="true"':"")),d.toLowerCase()==e?(b.node.isEmpty(c.get(0),!0)||c.append("<br/>"),c.replaceWith(c.html())):c.replaceWith(a("<"+d+">").html(c.html()))}function f(c,d){d||(d='div class="fr-temp-div"'+(b.node.isEmpty(c.get(0),!0)?' data-empty="true"':"")),c.replaceWith(a("<"+d+" "+b.node.attributes(c.get(0))+">").html(c.html()))}function g(g){"N"==g&&(g=b.html.defaultTag()),b.selection.save(),b.html.wrap(!0,!0,!0,!0),b.selection.restore();var h=b.selection.blocks();b.selection.save(),b.$el.find("pre").attr("skip",!0);for(var i=0;i<h.length;i++)if(h[i].tagName!=g&&!b.node.isList(h[i])){var j=a(h[i]);"LI"==h[i].tagName?c(j,g):"LI"==h[i].parentNode.tagName&&h[i]?d(j,g):["TD","TH"].indexOf(h[i].parentNode.tagName)>=0?e(j,g):f(j,g)}b.$el.find('pre:not([skip="true"]) + pre:not([skip="true"])').each(function(){a(this).prev().append("<br>"+a(this).html()),a(this).remove()}),b.$el.find("pre").removeAttr("skip"),b.html.unwrap(),b.selection.restore()}function h(a,c){var d=b.selection.blocks();if(d.length){var e=d[0],f="N",g=b.html.defaultTag();e.tagName.toLowerCase()!=g&&e!=b.el&&(f=e.tagName),c.find('.fr-command[data-param1="'+f+'"]').addClass("fr-active").attr("aria-selected",!0)}else c.find('.fr-command[data-param1="N"]').addClass("fr-active").attr("aria-selected",!0)}function i(a){if(b.opts.paragraphFormatSelection){var c=b.selection.blocks();if(c.length){var d=c[0],e="N",f=b.html.defaultTag();d.tagName.toLowerCase()!=f&&d!=b.el&&(e=d.tagName),["LI","TD","TH"].indexOf(e)>=0&&(e="N"),a.find("> span").text(b.opts.paragraphFormat[e])}else a.find("> span").text(b.opts.paragraphFormat.N)}}return{apply:g,refreshOnShow:h,refresh:i}},a.FE.RegisterCommand("paragraphFormat",{type:"dropdown",displaySelection:function(a){return a.opts.paragraphFormatSelection},defaultSelection:"Normal",displaySelectionWidth:100,html:function(){var a='<ul class="fr-dropdown-list" role="presentation">',b=this.opts.paragraphFormat;for(var c in b)if(b.hasOwnProperty(c)){var d=this.shortcuts.get("paragraphFormat."+c);d=d?'<span class="fr-shortcut">'+d+"</span>":"",a+='<li role="presentation"><'+("N"==c?this.html.defaultTag()||"DIV":c)+' style="padding: 0 !important; margin: 0 !important;" role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="paragraphFormat" data-param1="'+c+'" title="'+this.language.translate(b[c])+'">'+this.language.translate(b[c])+"</a></"+("N"==c?this.html.defaultTag()||"DIV":c)+"></li>"}return a+="</ul>"},title:"Paragraph Format",callback:function(a,b){this.paragraphFormat.apply(b)},refresh:function(a){this.paragraphFormat.refresh(a)},refreshOnShow:function(a,b){this.paragraphFormat.refreshOnShow(a,b)},plugin:"paragraphFormat"}),a.FE.DefineIcon("paragraphFormat",{NAME:"paragraph"})});
/*!
 * froala_editor v2.5.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2017 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c)}:a(window.jQuery)}(function(a){a.extend(a.FE.DEFAULTS,{paragraphStyles:{"fr-text-gray":"Gray","fr-text-bordered":"Bordered","fr-text-spaced":"Spaced","fr-text-uppercase":"Uppercase"},paragraphMultipleStyles:!0}),a.FE.PLUGINS.paragraphStyle=function(b){function c(c,d,e){"undefined"==typeof d&&(d=b.opts.paragraphStyles),"undefined"==typeof e&&(e=b.opts.paragraphMultipleStyles);var f="";e||(f=Object.keys(d),f.splice(f.indexOf(c),1),f=f.join(" ")),b.selection.save(),b.html.wrap(!0,!0,!0,!0),b.selection.restore();var g=b.selection.blocks();b.selection.save();for(var h=a(g[0]).hasClass(c),i=0;i<g.length;i++)a(g[i]).removeClass(f).toggleClass(c,!h),a(g[i]).hasClass("fr-temp-div")&&a(g[i]).removeClass("fr-temp-div"),""===a(g[i]).attr("class")&&a(g[i]).removeAttr("class");b.html.unwrap(),b.selection.restore()}function d(c,d){var e=b.selection.blocks();if(e.length){var f=a(e[0]);d.find(".fr-command").each(function(){var b=a(this).data("param1"),c=f.hasClass(b);a(this).toggleClass("fr-active",c).attr("aria-selected",c)})}}function e(){}return{_init:e,apply:c,refreshOnShow:d}},a.FE.RegisterCommand("paragraphStyle",{type:"dropdown",html:function(){var a='<ul class="fr-dropdown-list" role="presentation">',b=this.opts.paragraphStyles;for(var c in b)b.hasOwnProperty(c)&&(a+='<li role="presentation"><a class="fr-command '+c+'" tabIndex="-1" role="option" data-cmd="paragraphStyle" data-param1="'+c+'" title="'+this.language.translate(b[c])+'">'+this.language.translate(b[c])+"</a></li>");return a+="</ul>"},title:"Paragraph Style",callback:function(a,b){this.paragraphStyle.apply(b)},refreshOnShow:function(a,b){this.paragraphStyle.refreshOnShow(a,b)},plugin:"paragraphStyle"}),a.FE.DefineIcon("paragraphStyle",{NAME:"magic"})});
/*!
 * froala_editor v2.5.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2017 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c)}:a(window.jQuery)}(function(a){a.FE.PLUGINS.align=function(b){function c(c){b.selection.save(),b.html.wrap(!0,!0,!0,!0),b.selection.restore();for(var d=b.selection.blocks(),e=0;e<d.length;e++)b.helpers.getAlignment(a(d[e].parentNode))==c?a(d[e]).css("text-align","").removeClass("fr-temp-div"):a(d[e]).css("text-align",c).removeClass("fr-temp-div"),""===a(d[e]).attr("class")&&a(d[e]).removeAttr("class"),""===a(d[e]).attr("style")&&a(d[e]).removeAttr("style");b.selection.save(),b.html.unwrap(),b.selection.restore()}function d(c){var d=b.selection.blocks();if(d.length){var e=b.helpers.getAlignment(a(d[0]));c.find("> *:first").replaceWith(b.icon.create("align-"+e))}}function e(c,d){var e=b.selection.blocks();if(e.length){var f=b.helpers.getAlignment(a(e[0]));d.find('a.fr-command[data-param1="'+f+'"]').addClass("fr-active").attr("aria-selected",!0)}}return{apply:c,refresh:d,refreshOnShow:e}},a.FE.DefineIcon("align",{NAME:"align-left"}),a.FE.DefineIcon("align-left",{NAME:"align-left"}),a.FE.DefineIcon("align-right",{NAME:"align-right"}),a.FE.DefineIcon("align-center",{NAME:"align-center"}),a.FE.DefineIcon("align-justify",{NAME:"align-justify"}),a.FE.RegisterCommand("align",{type:"dropdown",title:"Align",options:{left:"Align Left",center:"Align Center",right:"Align Right",justify:"Align Justify"},html:function(){var b='<ul class="fr-dropdown-list" role="presentation">',c=a.FE.COMMANDS.align.options;for(var d in c)c.hasOwnProperty(d)&&(b+='<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="align" data-param1="'+d+'" title="'+this.language.translate(c[d])+'">'+this.icon.create("align-"+d)+'<span class="fr-sr-only">'+this.language.translate(c[d])+"</span></a></li>");return b+="</ul>"},callback:function(a,b){this.align.apply(b)},refresh:function(a){this.align.refresh(a)},refreshOnShow:function(a,b){this.align.refreshOnShow(a,b)},plugin:"align"})});
/*!
 * froala_editor v2.5.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2017 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c)}:a(window.jQuery)}(function(a){a.FE.PLUGINS.fullscreen=function(b){function c(){return b.$box.hasClass("fr-fullscreen")}function d(){i=b.helpers.scrollTop(),b.$box.toggleClass("fr-fullscreen"),a("body").toggleClass("fr-fullscreen"),j=a('<div style="display: none;"></div>'),b.$box.after(j),b.helpers.isMobile()&&(b.$tb.data("parent",b.$tb.parent()),b.$tb.prependTo(b.$box),b.$tb.data("sticky-dummy")&&b.$tb.after(b.$tb.data("sticky-dummy"))),k=b.opts.height,l=b.opts.heightMax,m=b.opts.zIndex,b.opts.height=b.o_win.innerHeight-(b.opts.toolbarInline?0:b.$tb.outerHeight()),b.opts.zIndex=9990,b.opts.heightMax=null,b.size.refresh(),b.opts.toolbarInline&&b.toolbar.showInline();for(var c=b.$box.parent();!c.is("body");)c.data("z-index",c.css("z-index")).css("z-index","9990"),c=c.parent();b.events.trigger("charCounter.update"),b.$win.trigger("scroll")}function e(){b.$box.toggleClass("fr-fullscreen"),a("body").toggleClass("fr-fullscreen"),b.$tb.prependTo(b.$tb.data("parent")),b.$tb.data("sticky-dummy")&&b.$tb.after(b.$tb.data("sticky-dummy")),b.opts.height=k,b.opts.heightMax=l,b.opts.zIndex=m,b.size.refresh(),a(b.o_win).scrollTop(i),b.opts.toolbarInline&&b.toolbar.showInline(),b.events.trigger("charCounter.update"),b.opts.toolbarSticky&&b.opts.toolbarStickyOffset&&(b.opts.toolbarBottom?b.$tb.css("bottom",b.opts.toolbarStickyOffset).data("bottom",b.opts.toolbarStickyOffset):b.$tb.css("top",b.opts.toolbarStickyOffset).data("top",b.opts.toolbarStickyOffset));for(var c=b.$box.parent();!c.is("body");)c.data("z-index")&&(c.css("z-index",""),c.css("z-index")!=c.data("z-index")&&c.css("z-index",c.data("z-index")),c.removeData("z-index")),c=c.parent();b.$win.trigger("scroll")}function f(){c()?e():d(),g(b.$tb.find('.fr-command[data-cmd="fullscreen"]'))}function g(a){var d=c();a.toggleClass("fr-active",d).attr("aria-pressed",d),a.find("> *:not(.fr-sr-only)").replaceWith(d?b.icon.create("fullscreenCompress"):b.icon.create("fullscreen"))}function h(){return!!b.$wp&&(b.events.$on(a(b.o_win),"resize",function(){c()&&(e(),d())}),b.events.on("toolbar.hide",function(){if(c()&&b.helpers.isMobile())return!1}),void b.events.on("destroy",function(){c()&&e()},!0))}var i,j,k,l,m;return{_init:h,toggle:f,refresh:g,isActive:c}},a.FE.RegisterCommand("fullscreen",{title:"Fullscreen",undo:!1,focus:!1,accessibilityFocus:!0,forcedRefresh:!0,toggle:!0,callback:function(){this.fullscreen.toggle()},refresh:function(a){this.fullscreen.refresh(a)},plugin:"fullscreen"}),a.FE.DefineIcon("fullscreen",{NAME:"expand"}),a.FE.DefineIcon("fullscreenCompress",{NAME:"compress"})});
/*!
 * froala_editor v2.5.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2017 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c)}:a(window.jQuery)}(function(a){a.extend(a.FE.POPUP_TEMPLATES,{"link.edit":"[_BUTTONS_]","link.insert":"[_BUTTONS_][_INPUT_LAYER_]"}),a.extend(a.FE.DEFAULTS,{linkEditButtons:["linkOpen","linkStyle","linkEdit","linkRemove"],linkInsertButtons:["linkBack","|","linkList"],linkAttributes:{},linkAutoPrefix:"http://",linkStyles:{"fr-green":"Green","fr-strong":"Thick"},linkMultipleStyles:!0,linkConvertEmailAddress:!0,linkAlwaysBlank:!1,linkAlwaysNoFollow:!1,linkList:[{text:"Froala",href:"https://froala.com",target:"_blank"},{text:"Google",href:"https://google.com",target:"_blank"},{displayText:"Facebook",href:"https://facebook.com"}],linkText:!0}),a.FE.PLUGINS.link=function(b){function c(){var c=b.image?b.image.get():null;if(!c&&b.$wp){var d=b.selection.ranges(0).commonAncestorContainer;if(d&&(d.contains&&d.contains(b.el)||!b.el.contains(d)||b.el==d)&&(d=null),d&&"A"===d.tagName)return d;var e=b.selection.element(),f=b.selection.endElement();return"A"==e.tagName||b.node.isElement(e)||(e=a(e).parentsUntil(b.$el,"a:first").get(0)),"A"==f.tagName||b.node.isElement(f)||(f=a(f).parentsUntil(b.$el,"a:first").get(0)),f&&(f.contains&&f.contains(b.el)||!b.el.contains(f)||b.el==f)&&(f=null),e&&(e.contains&&e.contains(b.el)||!b.el.contains(e)||b.el==e)&&(e=null),f&&f==e&&"A"==f.tagName?e:null}return"A"==b.el.tagName?b.el:c&&c.get(0).parentNode&&"A"==c.get(0).parentNode.tagName?c.get(0).parentNode:void 0}function d(){var a=b.image?b.image.get():null,c=[];if(a)"A"==a.get(0).parentNode.tagName&&c.push(a.get(0).parentNode);else{var d,e,f,g;if(b.win.getSelection){var h=b.win.getSelection();if(h.getRangeAt&&h.rangeCount){g=b.doc.createRange();for(var i=0;i<h.rangeCount;++i)if(d=h.getRangeAt(i),e=d.commonAncestorContainer,e&&1!=e.nodeType&&(e=e.parentNode),e&&"a"==e.nodeName.toLowerCase())c.push(e);else{f=e.getElementsByTagName("a");for(var j=0;j<f.length;++j)g.selectNodeContents(f[j]),g.compareBoundaryPoints(d.END_TO_START,d)<1&&g.compareBoundaryPoints(d.START_TO_END,d)>-1&&c.push(f[j])}}}else if(b.doc.selection&&"Control"!=b.doc.selection.type)if(d=b.doc.selection.createRange(),e=d.parentElement(),"a"==e.nodeName.toLowerCase())c.push(e);else{f=e.getElementsByTagName("a"),g=b.doc.body.createTextRange();for(var k=0;k<f.length;++k)g.moveToElementText(f[k]),g.compareEndPoints("StartToEnd",d)>-1&&g.compareEndPoints("EndToStart",d)<1&&c.push(f[k])}}return c}function e(d){g(),setTimeout(function(){if(!d||d&&(1==d.which||"mouseup"!=d.type)){var e=c(),g=b.image?b.image.get():null;if(e&&!g){if(b.image){var h=b.node.contents(e);if(1==h.length&&"IMG"==h[0].tagName){var i=b.selection.ranges(0);return 0===i.startOffset&&0===i.endOffset?a(e).before(a.FE.MARKERS):a(e).after(a.FE.MARKERS),b.selection.restore(),!1}}d&&d.stopPropagation(),f(e)}}},b.helpers.isIOS()?100:0)}function f(c){var d=b.popups.get("link.edit");d||(d=h());var e=a(c);b.popups.isVisible("link.edit")||b.popups.refresh("link.edit"),b.popups.setContainer("link.edit",b.$sc);var f=e.offset().left+a(c).outerWidth()/2,g=e.offset().top+e.outerHeight();b.popups.show("link.edit",f,g,e.outerHeight())}function g(){b.popups.hide("link.edit")}function h(){var a="";b.opts.linkEditButtons.length>1&&("A"==b.el.tagName&&b.opts.linkEditButtons.indexOf("linkRemove")>=0&&b.opts.linkEditButtons.splice(b.opts.linkEditButtons.indexOf("linkRemove"),1),a='<div class="fr-buttons">'+b.button.buildList(b.opts.linkEditButtons)+"</div>");var d={buttons:a},e=b.popups.create("link.edit",d);return b.$wp&&b.events.$on(b.$wp,"scroll.link-edit",function(){c()&&b.popups.isVisible("link.edit")&&f(c())}),e}function i(){}function j(){var d=b.popups.get("link.insert"),e=c();if(e){var f,g,h=a(e),i=d.find('input.fr-link-attr[type="text"]'),j=d.find('input.fr-link-attr[type="checkbox"]');for(f=0;f<i.length;f++)g=a(i[f]),g.val(h.attr(g.attr("name")||""));for(j.prop("checked",!1),f=0;f<j.length;f++)g=a(j[f]),h.attr(g.attr("name"))==g.data("checked")&&g.prop("checked",!0);d.find('input.fr-link-attr[type="text"][name="text"]').val(h.text())}else d.find('input.fr-link-attr[type="text"]').val(""),d.find('input.fr-link-attr[type="checkbox"]').prop("checked",!1),d.find('input.fr-link-attr[type="text"][name="text"]').val(b.selection.text());d.find("input.fr-link-attr").trigger("change");var k=b.image?b.image.get():null;k?d.find('.fr-link-attr[name="text"]').parent().hide():d.find('.fr-link-attr[name="text"]').parent().show()}function k(){var a=b.$tb.find('.fr-command[data-cmd="insertLink"]'),c=b.popups.get("link.insert");if(c||(c=l()),!c.hasClass("fr-active"))if(b.popups.refresh("link.insert"),b.popups.setContainer("link.insert",b.$tb||b.$sc),a.is(":visible")){var d=a.offset().left+a.outerWidth()/2,e=a.offset().top+(b.opts.toolbarBottom?10:a.outerHeight()-10);b.popups.show("link.insert",d,e,a.outerHeight())}else b.position.forSelection(c),b.popups.show("link.insert")}function l(a){if(a)return b.popups.onRefresh("link.insert",j),b.popups.onHide("link.insert",i),!0;var d="";b.opts.linkInsertButtons.length>=1&&(d='<div class="fr-buttons">'+b.button.buildList(b.opts.linkInsertButtons)+"</div>");var e='<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10" height="10" viewBox="0 0 32 32"><path d="M27 4l-15 15-7-7-5 5 12 12 20-20z" fill="#FFF"></path></svg>',f="",g=0;f='<div class="fr-link-insert-layer fr-layer fr-active" id="fr-link-insert-layer-'+b.id+'">',f+='<div class="fr-input-line"><input id="fr-link-insert-layer-url-'+b.id+'" name="href" type="text" class="fr-link-attr" placeholder="URL" tabIndex="'+ ++g+'"></div>',b.opts.linkText&&(f+='<div class="fr-input-line"><input id="fr-link-insert-layer-text-'+b.id+'" name="text" type="text" class="fr-link-attr" placeholder="'+b.language.translate("Text")+'" tabIndex="'+ ++g+'"></div>');for(var h in b.opts.linkAttributes)if(b.opts.linkAttributes.hasOwnProperty(h)){var k=b.opts.linkAttributes[h];f+='<div class="fr-input-line"><input name="'+h+'" type="text" class="fr-link-attr" placeholder="'+b.language.translate(k)+'" tabIndex="'+ ++g+'"></div>'}b.opts.linkAlwaysBlank||(f+='<div class="fr-checkbox-line"><span class="fr-checkbox"><input name="target" class="fr-link-attr" data-checked="_blank" type="checkbox" id="fr-link-target-'+b.id+'" tabIndex="'+ ++g+'"><span>'+e+'</span></span><label for="fr-link-target-'+b.id+'">'+b.language.translate("Open in new tab")+"</label></div>"),f+='<div class="fr-action-buttons"><button class="fr-command fr-submit" role="button" data-cmd="linkInsert" href="#" tabIndex="'+ ++g+'" type="button">'+b.language.translate("Insert")+"</button></div></div>";var l={buttons:d,input_layer:f},m=b.popups.create("link.insert",l);return b.$wp&&b.events.$on(b.$wp,"scroll.link-insert",function(){var a=b.image?b.image.get():null;a&&b.popups.isVisible("link.insert")&&u(),c&&b.popups.isVisible("link.insert")&&s()}),m}function m(){var d=c(),e=b.image?b.image.get():null;return b.events.trigger("link.beforeRemove",[d])!==!1&&void(e&&d?(e.unwrap(),b.image.edit(e)):d&&(b.selection.save(),a(d).replaceWith(a(d).html()),b.selection.restore(),g()))}function n(){b.events.on("keyup",function(b){b.which!=a.FE.KEYCODE.ESC&&e(b)}),b.events.on("window.mouseup",e),b.helpers.isMobile()&&b.events.$on(b.$doc,"selectionchange",e),l(!0),"A"==b.el.tagName&&b.$el.addClass("fr-view"),b.events.on("toolbar.esc",function(){if(b.popups.isVisible("link.edit"))return b.events.disableBlur(),b.events.focus(),!1},!0)}function o(c){var d,e,f=b.opts.linkList[c],g=b.popups.get("link.insert"),h=g.find('input.fr-link-attr[type="text"]'),i=g.find('input.fr-link-attr[type="checkbox"]');for(e=0;e<h.length;e++)d=a(h[e]),f[d.attr("name")]?d.val(f[d.attr("name")]):"text"!=d.attr("name")&&d.val("");for(e=0;e<i.length;e++)d=a(i[e]),d.prop("checked",d.data("checked")==f[d.attr("name")]);b.accessibility.focusPopup(g)}function p(){var c,d,e=b.popups.get("link.insert"),f=e.find('input.fr-link-attr[type="text"]'),g=e.find('input.fr-link-attr[type="checkbox"]'),h=f.filter('[name="href"]').val(),i=f.filter('[name="text"]').val(),j={};for(d=0;d<f.length;d++)c=a(f[d]),["href","text"].indexOf(c.attr("name"))<0&&(j[c.attr("name")]=c.val());for(d=0;d<g.length;d++)c=a(g[d]),c.is(":checked")?j[c.attr("name")]=c.data("checked"):j[c.attr("name")]=c.data("unchecked")||null;var k=b.helpers.scrollTop();r(h,i,j),a(b.o_win).scrollTop(k)}function q(){if(!b.selection.isCollapsed()){b.selection.save();for(var c=b.$el.find(".fr-marker").addClass("fr-unprocessed").toArray();c.length;){var d=a(c.pop());d.removeClass("fr-unprocessed");var e=b.node.deepestParent(d.get(0));if(e){var f=d.get(0),g="",h="";do f=f.parentNode,b.node.isBlock(f)||(g+=b.node.closeTagString(f),h=b.node.openTagString(f)+h);while(f!=e);var i=b.node.openTagString(d.get(0))+d.html()+b.node.closeTagString(d.get(0));d.replaceWith('<span id="fr-break"></span>');var j=a(e).html();j=j.replace(/<span id="fr-break"><\/span>/g,g+i+h),a(e).html(j)}c=b.$el.find(".fr-marker.fr-unprocessed").toArray()}b.selection.restore()}}function r(f,g,h){if("undefined"==typeof h&&(h={}),b.events.trigger("link.beforeInsert",[f,g,h])===!1)return!1;var i=b.image?b.image.get():null;i||"A"==b.el.tagName?"A"==b.el.tagName&&b.$el.focus():(b.selection.restore(),b.popups.hide("link.insert"));var j=f;if(b.opts.linkConvertEmailAddress){var k=/^[\w._]+@[a-z\u00a1-\uffff0-9_-]+?\.[a-z\u00a1-\uffff0-9]{2,}$/i;k.test(f)&&!/^mailto:.*/i.test(f)&&(f="mailto:"+f)}if(""===b.opts.linkAutoPrefix||/^(mailto|tel|sms|notes|data):.*/i.test(f)||/^data:image.*/i.test(f)||/^(https?:|ftps?:|file:|)\/\//i.test(f)||["/","{","[","#","("].indexOf((f||"")[0])<0&&(f=b.opts.linkAutoPrefix+f),f=b.helpers.sanitizeURL(f),b.opts.linkAlwaysBlank&&(h.target="_blank"),b.opts.linkAlwaysNoFollow&&(h.rel="nofollow"),"_blank"==h.target&&(h.rel?h.rel+=" noopener noreferrer":h.rel="noopener noreferrer"),g=g||"",f===b.opts.linkAutoPrefix){var l=b.popups.get("link.insert");return l.find('input[name="href"]').addClass("fr-error"),b.events.trigger("link.bad",[j]),!1}var m,n=c();if(n)m=a(n),m.attr("href",f),g.length>0&&m.text()!=g&&!i&&m.text(g),i||m.prepend(a.FE.START_MARKER).append(a.FE.END_MARKER),m.attr(h),i||b.selection.restore();else{i?i.wrap('<a href="'+f+'"></a>'):(b.format.remove("a"),b.selection.isCollapsed()?(g=0===g.length?j:g,b.html.insert('<a href="'+f+'">'+a.FE.START_MARKER+g+a.FE.END_MARKER+"</a>"),b.selection.restore()):g.length>0&&g!=b.selection.text().replace(/\n/g,"")?(b.selection.remove(),b.html.insert('<a href="'+f+'">'+a.FE.START_MARKER+g+a.FE.END_MARKER+"</a>"),b.selection.restore()):(q(),b.format.apply("a",{href:f})));for(var o=d(),p=0;p<o.length;p++)m=a(o[p]),m.attr(h),m.removeAttr("_moz_dirty");1==o.length&&b.$wp&&!i&&(a(o[0]).prepend(a.FE.START_MARKER).append(a.FE.END_MARKER),b.selection.restore())}if(i){var r=b.popups.get("link.insert");r.find("input:focus").blur(),b.image.edit(i)}else e()}function s(){g();var d=c();if(d){var e=b.popups.get("link.insert");e||(e=l()),b.popups.isVisible("link.insert")||(b.popups.refresh("link.insert"),b.selection.save(),b.helpers.isMobile()&&(b.events.disableBlur(),b.$el.blur(),b.events.enableBlur())),b.popups.setContainer("link.insert",b.$sc);var f=(b.image?b.image.get():null)||a(d),h=f.offset().left+f.outerWidth()/2,i=f.offset().top+f.outerHeight();b.popups.show("link.insert",h,i,f.outerHeight())}}function t(){var a=b.image?b.image.get():null;if(a)b.image.back();else{b.events.disableBlur(),b.selection.restore(),b.events.enableBlur();var d=c();d&&b.$wp?(b.selection.restore(),g(),e()):"A"==b.el.tagName?(b.$el.focus(),e()):(b.popups.hide("link.insert"),b.toolbar.showInline())}}function u(){var a=b.image?b.image.get():null;if(a){var c=b.popups.get("link.insert");c||(c=l()),j(!0),b.popups.setContainer("link.insert",b.$sc);var d=a.offset().left+a.outerWidth()/2,e=a.offset().top+a.outerHeight();b.popups.show("link.insert",d,e,a.outerHeight())}}function v(d,f,g){"undefined"==typeof g&&(g=b.opts.linkMultipleStyles),"undefined"==typeof f&&(f=b.opts.linkStyles);var h=c();if(!h)return!1;if(!g){var i=Object.keys(f);i.splice(i.indexOf(d),1),a(h).removeClass(i.join(" "))}a(h).toggleClass(d),e()}return{_init:n,remove:m,showInsertPopup:k,usePredefined:o,insertCallback:p,insert:r,update:s,get:c,allSelected:d,back:t,imageLink:u,applyStyle:v}},a.FE.DefineIcon("insertLink",{NAME:"link"}),a.FE.RegisterShortcut(a.FE.KEYCODE.K,"insertLink",null,"K"),a.FE.RegisterCommand("insertLink",{title:"Insert Link",undo:!1,focus:!0,refreshOnCallback:!1,popup:!0,callback:function(){this.popups.isVisible("link.insert")?(this.$el.find(".fr-marker").length&&(this.events.disableBlur(),this.selection.restore()),this.popups.hide("link.insert")):this.link.showInsertPopup()},plugin:"link"}),a.FE.DefineIcon("linkOpen",{NAME:"external-link"}),a.FE.RegisterCommand("linkOpen",{title:"Open Link",undo:!1,refresh:function(a){var b=this.link.get();b?a.removeClass("fr-hidden"):a.addClass("fr-hidden")},callback:function(){var a=this.link.get();a&&this.o_win.open(a.href)}}),a.FE.DefineIcon("linkEdit",{NAME:"edit"}),a.FE.RegisterCommand("linkEdit",{title:"Edit Link",undo:!1,refreshAfterCallback:!1,popup:!0,callback:function(){this.link.update()},refresh:function(a){var b=this.link.get();b?a.removeClass("fr-hidden"):a.addClass("fr-hidden")}}),a.FE.DefineIcon("linkRemove",{NAME:"unlink"}),a.FE.RegisterCommand("linkRemove",{title:"Unlink",callback:function(){this.link.remove()},refresh:function(a){var b=this.link.get();b?a.removeClass("fr-hidden"):a.addClass("fr-hidden")}}),a.FE.DefineIcon("linkBack",{NAME:"arrow-left"}),a.FE.RegisterCommand("linkBack",{title:"Back",undo:!1,focus:!1,back:!0,refreshAfterCallback:!1,callback:function(){this.link.back()},refresh:function(a){var b=this.link.get()&&this.doc.hasFocus(),c=this.image?this.image.get():null;c||b||this.opts.toolbarInline?(a.removeClass("fr-hidden"),a.next(".fr-separator").removeClass("fr-hidden")):(a.addClass("fr-hidden"),a.next(".fr-separator").addClass("fr-hidden"))}}),a.FE.DefineIcon("linkList",{NAME:"search"}),a.FE.RegisterCommand("linkList",{title:"Choose Link",type:"dropdown",focus:!1,undo:!1,refreshAfterCallback:!1,html:function(){for(var a='<ul class="fr-dropdown-list" role="presentation">',b=this.opts.linkList,c=0;c<b.length;c++)a+='<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="linkList" data-param1="'+c+'">'+(b[c].displayText||b[c].text)+"</a></li>";return a+="</ul>"},callback:function(a,b){this.link.usePredefined(b)}}),a.FE.RegisterCommand("linkInsert",{focus:!1,refreshAfterCallback:!1,callback:function(){this.link.insertCallback()},refresh:function(a){var b=this.link.get();b?a.text(this.language.translate("Update")):a.text(this.language.translate("Insert"))}}),a.FE.DefineIcon("imageLink",{NAME:"link"}),a.FE.RegisterCommand("imageLink",{title:"Insert Link",undo:!1,focus:!1,popup:!0,callback:function(){this.link.imageLink()},refresh:function(a){var b,c=this.link.get();c?(b=a.prev(),b.hasClass("fr-separator")&&b.removeClass("fr-hidden"),a.addClass("fr-hidden")):(b=a.prev(),b.hasClass("fr-separator")&&b.addClass("fr-hidden"),a.removeClass("fr-hidden"))}}),a.FE.DefineIcon("linkStyle",{NAME:"magic"}),a.FE.RegisterCommand("linkStyle",{title:"Style",type:"dropdown",html:function(){var a='<ul class="fr-dropdown-list" role="presentation">',b=this.opts.linkStyles;for(var c in b)b.hasOwnProperty(c)&&(a+='<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="linkStyle" data-param1="'+c+'">'+this.language.translate(b[c])+"</a></li>");return a+="</ul>"},callback:function(a,b){this.link.applyStyle(b)},refreshOnShow:function(b,c){var d=this.link.get();if(d){var e=a(d);c.find(".fr-command").each(function(){var b=a(this).data("param1"),c=e.hasClass(b);a(this).toggleClass("fr-active",c).attr("aria-selected",c)})}}})});
/*!
 * froala_editor v2.5.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2017 Froala Labs
 */


!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c)}:a(window.jQuery)}(function(a){a.FE.PLUGINS.lists=function(b){function c(a){return'<span class="fr-open-'+a.toLowerCase()+'"></span>'}function d(a){return'<span class="fr-close-'+a.toLowerCase()+'"></span>'}function e(b,c){for(var d=[],e=0;e<b.length;e++){var f=b[e].parentNode;"LI"==b[e].tagName&&f.tagName!=c&&d.indexOf(f)<0&&d.push(f)}for(e=d.length-1;e>=0;e--){var g=a(d[e]);g.replaceWith("<"+c.toLowerCase()+">"+g.html()+"</"+c.toLowerCase()+">")}}function f(c,d){e(c,d);for(var f=b.html.defaultTag(),g=0;g<c.length;g++)"LI"!=c[g].tagName&&(f&&c[g].tagName.toLowerCase()==f?a(c[g]).replaceWith("<"+d+"><li"+b.node.attributes(c[g])+">"+a(c[g]).html()+"</li></"+d+">"):a(c[g]).wrap("<"+d+"><li></li></"+d+">"));b.clean.lists()}function g(e){var f,g;for(f=e.length-1;f>=0;f--)for(g=f-1;g>=0;g--)if(a(e[g]).find(e[f]).length||e[g]==e[f]){e.splice(f,1);break}var h=[];for(f=0;f<e.length;f++){var i=a(e[f]),j=e[f].parentNode,k=i.attr("class");i.before(d(j.tagName)),"LI"==j.parentNode.tagName?(i.before(d("LI")),i.after(c("LI"))):(k&&i.wrapInner("<"+b.html.defaultTag()+' class="'+k+'"></'+b.html.defaultTag()+">"),b.node.isEmpty(i.get(0),!0)||0!==i.find(b.html.blockTagsQuery()).length||i.append("<br>"),i.append(c("LI")),i.prepend(d("LI"))),i.after(c(j.tagName)),"LI"==j.parentNode.tagName&&(j=j.parentNode.parentNode),h.indexOf(j)<0&&h.push(j)}for(f=0;f<h.length;f++){var l=a(h[f]),m=l.html();m=m.replace(/<span class="fr-close-([a-z]*)"><\/span>/g,"</$1>"),m=m.replace(/<span class="fr-open-([a-z]*)"><\/span>/g,"<$1>"),l.replaceWith(b.node.openTagString(l.get(0))+m+b.node.closeTagString(l.get(0)))}b.$el.find("li:empty").remove(),b.$el.find("ul:empty, ol:empty").remove(),b.clean.lists(),b.html.wrap()}function h(a,b){for(var c=!0,d=0;d<a.length;d++){if("LI"!=a[d].tagName)return!1;a[d].parentNode.tagName!=b&&(c=!1)}return c}function i(a){b.selection.save(),b.html.wrap(!0,!0,!0,!0),b.selection.restore();for(var c=b.selection.blocks(),d=0;d<c.length;d++)"LI"!=c[d].tagName&&"LI"==c[d].parentNode.tagName&&(c[d]=c[d].parentNode);b.selection.save(),h(c,a)?g(c):f(c,a),b.html.unwrap(),b.selection.restore()}function j(c,d){var e=a(b.selection.element());if(e.get(0)!=b.el){var f=e.get(0);f="LI"!=f.tagName&&f.firstElementChild&&"LI"!=f.firstElementChild.tagName?e.parents("li").get(0):"LI"==f.tagName||f.firstElementChild?f.firstElementChild&&"LI"==f.firstElementChild.tagName?e.get(0).firstChild:e.get(0):e.parents("li").get(0),f&&f.parentNode.tagName==d&&b.el.contains(f.parentNode)&&c.addClass("fr-active")}}function k(c){b.selection.save();for(var d=0;d<c.length;d++){var e=c[d].previousSibling;if(e){var f=a(c[d]).find("> ul, > ol").last().get(0);if(f){for(var g=a("<li>").prependTo(a(f)),h=b.node.contents(c[d])[0];h&&!b.node.isList(h);){var i=h.nextSibling;g.append(h),h=i}a(e).append(a(f)),a(c[d]).remove()}else{var j=a(e).find("> ul, > ol").last().get(0);if(j)a(j).append(a(c[d]));else{var k=a("<"+c[d].parentNode.tagName+">");a(e).append(k),k.append(a(c[d]))}}}}b.clean.lists(),b.selection.restore()}function l(a){b.selection.save(),g(a),b.selection.restore()}function m(a){if("indent"==a||"outdent"==a){for(var c=!1,d=b.selection.blocks(),e=[],f=0;f<d.length;f++)"LI"==d[f].tagName?(c=!0,e.push(d[f])):"LI"==d[f].parentNode.tagName&&(c=!0,e.push(d[f].parentNode));c&&("indent"==a?k(e):l(e))}}function n(){b.events.on("commands.after",m),b.events.on("keydown",function(c){if(c.which==a.FE.KEYCODE.TAB){for(var d=b.selection.blocks(),e=[],f=0;f<d.length;f++)"LI"==d[f].tagName?e.push(d[f]):"LI"==d[f].parentNode.tagName&&e.push(d[f].parentNode);if(e.length>1||e.length&&(b.selection.info(e[0]).atStart||b.node.isEmpty(e[0])))return c.preventDefault(),c.stopPropagation(),c.shiftKey?l(e):k(e),!1}},!0)}return{_init:n,format:i,refresh:j}},a.FE.RegisterCommand("formatUL",{title:"Unordered List",refresh:function(a){this.lists.refresh(a,"UL")},callback:function(){this.lists.format("UL")},plugin:"lists"}),a.FE.RegisterCommand("formatOL",{title:"Ordered List",refresh:function(a){this.lists.refresh(a,"OL")},callback:function(){this.lists.format("OL")},plugin:"lists"}),a.FE.DefineIcon("formatUL",{NAME:"list-ul"}),a.FE.DefineIcon("formatOL",{NAME:"list-ol"})});
/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);
/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);
/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);
/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);












/**
  *
  * jPanelMenu 1.3.0 (http://jpanelmenu.com)
  * By Anthony Colangelo (http://acolangelo.com)
  *
* */

(function(e){e.jPanelMenu=function(t){if(typeof t=="undefined"||t==null)t={};var n={options:e.extend({menu:"#menu",trigger:".menu-trigger",excludedPanelContent:"style, script",direction:"left",openPosition:"250px",animated:!0,closeOnContentClick:!0,keyboardShortcuts:[{code:27,open:!1,close:!0}],duration:150,openDuration:t.duration||150,closeDuration:t.duration||150,easing:"ease-in-out",openEasing:t.easing||"ease-in-out",closeEasing:t.easing||"ease-in-out",before:function(){},beforeOpen:function(){},beforeClose:function(){},after:function(){},afterOpen:function(){},afterClose:function(){},beforeOn:function(){},afterOn:function(){},beforeOff:function(){},afterOff:function(){}},t),settings:{transitionsSupported:"WebkitTransition"in document.body.style||"MozTransition"in document.body.style||"msTransition"in document.body.style||"OTransition"in document.body.style||"Transition"in document.body.style,shiftFixedChildren:!1,panelPosition:"relative",positionUnits:"px"},menu:"#jPanelMenu-menu",panel:".jPanelMenu-panel",fixedChildren:[],timeouts:{},clearTimeouts:function(){clearTimeout(n.timeouts.open);clearTimeout(n.timeouts.afterOpen);clearTimeout(n.timeouts.afterClose)},setPositionUnits:function(){var e=!1,t=["%","px","em"];for(unitID in t){var r=t[unitID];if(n.options.openPosition.toString().substr(-r.length)==r){e=!0;n.settings.positionUnits=r}}e||(n.options.openPosition=parseInt(n.options.openPosition)+n.settings.positionUnits)},checkFixedChildren:function(){n.disableTransitions();var t={position:e(n.panel).css("position")};t[n.options.direction]=e(n.panel).css(n.options.direction)=="auto"?0:e(n.panel).css(n.options.direction);e(n.panel).find("> *").each(function(){e(this).css("position")=="fixed"&&e(this).css(n.options.direction)=="auto"&&n.fixedChildren.push(this)});if(n.fixedChildren.length>0){var r={position:"relative"};r[n.options.direction]="1px";n.setPanelStyle(r);parseInt(e(n.fixedChildren[0]).offset().left)==0&&(n.settings.shiftFixedChildren=!0)}n.setPanelStyle(t)},setjPanelMenuStyles:function(){var t="#fff",r=e("html").css("background-color"),i=e("body").css("background-color");i!="transparent"&&i!="rgba(0, 0, 0, 0)"?t=i:r!="transparent"&&r!="rgba(0, 0, 0, 0)"?t=r:t="#fff";e("#jPanelMenu-style-master").length==0&&e("body").append('<style id="jPanelMenu-style-master">body{width:100%}.jPanelMenu,body{overflow-x:hidden}#jPanelMenu-menu{display:block;position:fixed;top:0;'+n.options.direction+":0;height:100%;z-index:-1;overflow-x:hidden;overflow-y:scroll;-webkit-overflow-scrolling:touch}.jPanelMenu-panel{position:static;"+n.options.direction+":0;top:0;z-index:2;width:100%;min-height:100%;background:"+t+"}</style>")},setMenuState:function(t){var n=t?"open":"closed";e("body").attr("data-menu-position",n)},getMenuState:function(){return e("body").attr("data-menu-position")},menuIsOpen:function(){return n.getMenuState()=="open"?!0:!1},setMenuStyle:function(t){e(n.menu).css(t)},setPanelStyle:function(t){e(n.panel).css(t)},showMenu:function(){n.setMenuStyle({display:"block"});n.setMenuStyle({"z-index":"1"})},hideMenu:function(){n.setMenuStyle({"z-index":"-1"});n.setMenuStyle({display:"none"})},enableTransitions:function(t,r){var i=t/1e3,s=n.getCSSEasingFunction(r);n.disableTransitions();e("body").append('<style id="jPanelMenu-style-transitions">.jPanelMenu-panel{-webkit-transition: all '+i+"s "+s+"; -moz-transition: all "+i+"s "+s+"; -o-transition: all "+i+"s "+s+"; transition: all "+i+"s "+s+";}</style>")},disableTransitions:function(){e("#jPanelMenu-style-transitions").remove()},enableFixedTransitions:function(t,r,i,s){var o=i/1e3,u=n.getCSSEasingFunction(s);n.disableFixedTransitions(r);e("body").append('<style id="jPanelMenu-style-fixed-'+r+'">'+t+"{-webkit-transition: all "+o+"s "+u+"; -moz-transition: all "+o+"s "+u+"; -o-transition: all "+o+"s "+u+"; transition: all "+o+"s "+u+";}</style>")},disableFixedTransitions:function(t){e("#jPanelMenu-style-fixed-"+t).remove()},getCSSEasingFunction:function(e){switch(e){case"linear":return e;case"ease":return e;case"ease-in":return e;case"ease-out":return e;case"ease-in-out":return e;default:return"ease-in-out"}},getJSEasingFunction:function(e){switch(e){case"linear":return e;default:return"swing"}},openMenu:function(t){if(typeof t=="undefined"||t==null)t=n.options.animated;n.clearTimeouts();n.options.before();n.options.beforeOpen();n.setMenuState(!0);n.setPanelStyle({position:"relative"});n.showMenu();var r={none:t?!1:!0,transitions:t&&n.settings.transitionsSupported?!0:!1};if(r.transitions||r.none){r.none&&n.disableTransitions();r.transitions&&n.enableTransitions(n.options.openDuration,n.options.openEasing);var i={};i[n.options.direction]=n.options.openPosition;n.setPanelStyle(i);n.settings.shiftFixedChildren&&e(n.fixedChildren).each(function(){var t=e(this).prop("tagName").toLowerCase()+" "+e(this).attr("class"),i=t.replace(" ","."),t=t.replace(" ","-");r.none&&n.disableFixedTransitions(t);r.transitions&&n.enableFixedTransitions(i,t,n.options.openDuration,n.options.openEasing);var s={};s[n.options.direction]=n.options.openPosition;e(this).css(s)});n.timeouts.afterOpen=setTimeout(function(){n.disableTransitions();n.settings.shiftFixedChildren&&e(n.fixedChildren).each(function(){var t=e(this).prop("tagName").toLowerCase()+" "+e(this).attr("class"),t=t.replace(" ","-");n.disableFixedTransitions(t)});n.options.after();n.options.afterOpen();n.initiateContentClickListeners()},n.options.openDuration)}else{var s=n.getJSEasingFunction(n.options.openEasing),o={};o[n.options.direction]=n.options.openPosition;e(n.panel).stop().animate(o,n.options.openDuration,s,function(){n.options.after();n.options.afterOpen();n.initiateContentClickListeners()});n.settings.shiftFixedChildren&&e(n.fixedChildren).each(function(){var t={};t[n.options.direction]=n.options.openPosition;e(this).stop().animate(t,n.options.openDuration,s)})}},closeMenu:function(t){if(typeof t=="undefined"||t==null)t=n.options.animated;n.clearTimeouts();n.options.before();n.options.beforeClose();n.setMenuState(!1);var r={none:t?!1:!0,transitions:t&&n.settings.transitionsSupported?!0:!1};if(r.transitions||r.none){r.none&&n.disableTransitions();r.transitions&&n.enableTransitions(n.options.closeDuration,n.options.closeEasing);var i={};i[n.options.direction]=0+n.settings.positionUnits;n.setPanelStyle(i);n.settings.shiftFixedChildren&&e(n.fixedChildren).each(function(){var t=e(this).prop("tagName").toLowerCase()+" "+e(this).attr("class"),i=t.replace(" ","."),t=t.replace(" ","-");r.none&&n.disableFixedTransitions(t);r.transitions&&n.enableFixedTransitions(i,t,n.options.closeDuration,n.options.closeEasing);var s={};s[n.options.direction]=0+n.settings.positionUnits;e(this).css(s)});n.timeouts.afterClose=setTimeout(function(){n.setPanelStyle({position:n.settings.panelPosition});n.disableTransitions();n.settings.shiftFixedChildren&&e(n.fixedChildren).each(function(){var t=e(this).prop("tagName").toLowerCase()+" "+e(this).attr("class"),t=t.replace(" ","-");n.disableFixedTransitions(t)});n.hideMenu();n.options.after();n.options.afterClose();n.destroyContentClickListeners()},n.options.closeDuration)}else{var s=n.getJSEasingFunction(n.options.closeEasing),o={};o[n.options.direction]=0+n.settings.positionUnits;e(n.panel).stop().animate(o,n.options.closeDuration,s,function(){n.setPanelStyle({position:n.settings.panelPosition});n.hideMenu();n.options.after();n.options.afterClose();n.destroyContentClickListeners()});n.settings.shiftFixedChildren&&e(n.fixedChildren).each(function(){var t={};t[n.options.direction]=0+n.settings.positionUnits;e(this).stop().animate(t,n.options.closeDuration,s)})}},triggerMenu:function(e){n.menuIsOpen()?n.closeMenu(e):n.openMenu(e)},initiateClickListeners:function(){e(document).on("click",n.options.trigger,function(){n.triggerMenu(n.options.animated);return!1})},destroyClickListeners:function(){e(document).off("click",n.options.trigger,null)},initiateContentClickListeners:function(){if(!n.options.closeOnContentClick)return!1;e(document).on("click",n.panel,function(e){n.menuIsOpen()&&n.closeMenu(n.options.animated)});e(document).on("touchend",n.panel,function(e){n.menuIsOpen()&&n.closeMenu(n.options.animated)})},destroyContentClickListeners:function(){if(!n.options.closeOnContentClick)return!1;e(document).off("click",n.panel,null);e(document).off("touchend",n.panel,null)},initiateKeyboardListeners:function(){var t=["input","textarea"];e(document).on("keydown",function(r){var i=e(r.target),s=!1;e.each(t,function(){i.is(this.toString())&&(s=!0)});if(s)return!0;for(mapping in n.options.keyboardShortcuts)if(r.which==n.options.keyboardShortcuts[mapping].code){var o=n.options.keyboardShortcuts[mapping];o.open&&o.close?n.triggerMenu(n.options.animated):o.open&&!o.close&&!n.menuIsOpen()?n.openMenu(n.options.animated):!o.open&&o.close&&n.menuIsOpen()&&n.closeMenu(n.options.animated);return!1}})},destroyKeyboardListeners:function(){e(document).off("keydown",null)},setupMarkup:function(){e("html").addClass("jPanelMenu");e("body > *").not(n.menu+", "+n.options.excludedPanelContent).wrapAll('<div class="'+n.panel.replace(".","")+'"/>');e(n.options.menu).clone().attr("id",n.menu.replace("#","")).insertAfter("body > "+n.panel)},resetMarkup:function(){e("html").removeClass("jPanelMenu");e("body > "+n.panel+" > *").unwrap();e(n.menu).remove()},init:function(){n.options.beforeOn();n.initiateClickListeners();Object.prototype.toString.call(n.options.keyboardShortcuts)==="[object Array]"&&n.initiateKeyboardListeners();n.setjPanelMenuStyles();n.setMenuState(!1);n.setupMarkup();n.setMenuStyle({width:n.options.openPosition});n.checkFixedChildren();n.setPositionUnits();n.closeMenu(!1);n.options.afterOn()},destroy:function(){n.options.beforeOff();n.closeMenu();n.destroyClickListeners();Object.prototype.toString.call(n.options.keyboardShortcuts)==="[object Array]"&&n.destroyKeyboardListeners();n.resetMarkup();var t={};t[n.options.direction]="auto";e(n.fixedChildren).each(function(){e(this).css(t)});n.fixedChildren=[];n.options.afterOff()}};return{on:n.init,off:n.destroy,trigger:n.triggerMenu,open:n.openMenu,close:n.closeMenu,isOpen:n.menuIsOpen,menu:n.menu,getMenu:function(){return e(n.menu)},panel:n.panel,getPanel:function(){return e(n.panel)}}}})(jQuery);
/*! modernizr 3.2.0 (Custom Build) | MIT *
 * http://modernizr.com/download/?-inlinesvg-domprefixes-hasevent-prefixed-prefixes-shiv-testallprops-testprop-teststyles !*/

!function(e,t,n){function r(e,t){return typeof e===t}function o(){var e,t,n,o,i,a,s;for(var l in C)if(C.hasOwnProperty(l)){if(e=[],t=C[l],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(o=r(t.fn,"function")?t.fn():t.fn,i=0;i<e.length;i++)a=e[i],s=a.split("."),1===s.length?Modernizr[s[0]]=o:(!Modernizr[s[0]]||Modernizr[s[0]]instanceof Boolean||(Modernizr[s[0]]=new Boolean(Modernizr[s[0]])),Modernizr[s[0]][s[1]]=o),y.push((o?"":"no-")+s.join("-"))}}function i(e){var t=x.className,n=Modernizr._config.classPrefix||"";if(_&&(t=t.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),_?x.className.baseVal=t:x.className=t)}function a(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function s(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):_?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function l(e,t){return!!~(""+e).indexOf(t)}function u(){var e=t.body;return e||(e=s(_?"svg":"body"),e.fake=!0),e}function f(e,n,r,o){var i,a,l,f,c="modernizr",d=s("div"),p=u();if(parseInt(r,10))for(;r--;)l=s("div"),l.id=o?o[r]:c+(r+1),d.appendChild(l);return i=s("style"),i.type="text/css",i.id="s"+c,(p.fake?p:d).appendChild(i),p.appendChild(d),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(t.createTextNode(e)),d.id=c,p.fake&&(p.style.background="",p.style.overflow="hidden",f=x.style.overflow,x.style.overflow="hidden",x.appendChild(p)),a=n(d,e),p.fake?(p.parentNode.removeChild(p),x.style.overflow=f,x.offsetHeight):d.parentNode.removeChild(d),!!a}function c(e,t){return function(){return e.apply(t,arguments)}}function d(e,t,n){var o;for(var i in e)if(e[i]in t)return n===!1?e[i]:(o=t[e[i]],r(o,"function")?c(o,n||t):o);return!1}function p(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function m(t,r){var o=t.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(p(t[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var i=[];o--;)i.push("("+p(t[o])+":"+r+")");return i=i.join(" or "),f("@supports ("+i+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return n}function h(e,t,o,i){function u(){c&&(delete P.style,delete P.modElem)}if(i=r(i,"undefined")?!1:i,!r(o,"undefined")){var f=m(e,o);if(!r(f,"undefined"))return f}for(var c,d,p,h,v,g=["modernizr","tspan"];!P.style;)c=!0,P.modElem=s(g.shift()),P.style=P.modElem.style;for(p=e.length,d=0;p>d;d++)if(h=e[d],v=P.style[h],l(h,"-")&&(h=a(h)),P.style[h]!==n){if(i||r(o,"undefined"))return u(),"pfx"==t?h:!0;try{P.style[h]=o}catch(y){}if(P.style[h]!=v)return u(),"pfx"==t?h:!0}return u(),!1}function v(e,t,n,o,i){var a=e.charAt(0).toUpperCase()+e.slice(1),s=(e+" "+j.join(a+" ")+a).split(" ");return r(t,"string")||r(t,"undefined")?h(s,t,o,i):(s=(e+" "+w.join(a+" ")+a).split(" "),d(s,t,n))}function g(e,t,r){return v(e,n,n,t,r)}var y=[],C=[],E={_version:"3.2.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){C.push({name:e,fn:t,options:n})},addAsyncTest:function(e){C.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=E,Modernizr=new Modernizr;var S=E._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):[];E._prefixes=S;var b="Moz O ms Webkit",w=E._config.usePrefixes?b.toLowerCase().split(" "):[];E._domPrefixes=w;var x=t.documentElement,_="svg"===x.nodeName.toLowerCase();_||!function(e,t){function n(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function r(){var e=C.elements;return"string"==typeof e?e.split(" "):e}function o(e,t){var n=C.elements;"string"!=typeof n&&(n=n.join(" ")),"string"!=typeof e&&(e=e.join(" ")),C.elements=n+" "+e,u(t)}function i(e){var t=y[e[v]];return t||(t={},g++,e[v]=g,y[g]=t),t}function a(e,n,r){if(n||(n=t),c)return n.createElement(e);r||(r=i(n));var o;return o=r.cache[e]?r.cache[e].cloneNode():h.test(e)?(r.cache[e]=r.createElem(e)).cloneNode():r.createElem(e),!o.canHaveChildren||m.test(e)||o.tagUrn?o:r.frag.appendChild(o)}function s(e,n){if(e||(e=t),c)return e.createDocumentFragment();n=n||i(e);for(var o=n.frag.cloneNode(),a=0,s=r(),l=s.length;l>a;a++)o.createElement(s[a]);return o}function l(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return C.shivMethods?a(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/[\w\-:]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(C,t.frag)}function u(e){e||(e=t);var r=i(e);return!C.shivCSS||f||r.hasCSS||(r.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),c||l(e,r),e}var f,c,d="3.7.3",p=e.html5||{},m=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,h=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,v="_html5shiv",g=0,y={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",f="hidden"in e,c=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){f=!0,c=!0}}();var C={elements:p.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:d,shivCSS:p.shivCSS!==!1,supportsUnknownElements:c,shivMethods:p.shivMethods!==!1,type:"default",shivDocument:u,createElement:a,createDocumentFragment:s,addElements:o};e.html5=C,u(t),"object"==typeof module&&module.exports&&(module.exports=C)}("undefined"!=typeof e?e:this,t);var N=function(e){function n(t,n){var o;return t?(n&&"string"!=typeof n||(n=s(n||"div")),t="on"+t,o=t in n,!o&&r&&(n.setAttribute||(n=s("div")),n.setAttribute(t,""),o="function"==typeof n[t],n[t]!==e&&(n[t]=e),n.removeAttribute(t)),o):!1}var r=!("onblur"in t.documentElement);return n}();E.hasEvent=N,Modernizr.addTest("inlinesvg",function(){var e=s("div");return e.innerHTML="<svg/>","http://www.w3.org/2000/svg"==("undefined"!=typeof SVGRect&&e.firstChild&&e.firstChild.namespaceURI)});var j=E._config.usePrefixes?b.split(" "):[];E._cssomPrefixes=j;var k=function(t){var r,o=S.length,i=e.CSSRule;if("undefined"==typeof i)return n;if(!t)return!1;if(t=t.replace(/^@/,""),r=t.replace(/-/g,"_").toUpperCase()+"_RULE",r in i)return"@"+t;for(var a=0;o>a;a++){var s=S[a],l=s.toUpperCase()+"_"+r;if(l in i)return"@-"+s.toLowerCase()+"-"+t}return!1};E.atRule=k;var z=(E.testStyles=f,{elem:s("modernizr")});Modernizr._q.push(function(){delete z.elem});var P={style:z.elem.style};Modernizr._q.unshift(function(){delete P.style});E.testProp=function(e,t,r){return h([e],n,t,r)};E.testAllProps=v;E.prefixed=function(e,t,n){return 0===e.indexOf("@")?k(e):(-1!=e.indexOf("-")&&(e=a(e)),t?v(e,t,n):v(e,"pfx"))};E.testAllProps=g,o(),i(y),delete E.addTest,delete E.addAsyncTest;for(var T=0;T<Modernizr._q.length;T++)Modernizr._q[T]();e.Modernizr=Modernizr}(window,document);
/*! jQuery v2.2.3 | (c) jQuery Foundation | jquery.org/license */

!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=a.document,e=c.slice,f=c.concat,g=c.push,h=c.indexOf,i={},j=i.toString,k=i.hasOwnProperty,l={},m="2.2.3",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return e.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:e.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a){return n.each(this,a)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(e.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:g,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){var b=a&&a.toString();return!n.isArray(a)&&b-parseFloat(b)+1>=0},isPlainObject:function(a){var b;if("object"!==n.type(a)||a.nodeType||n.isWindow(a))return!1;if(a.constructor&&!k.call(a,"constructor")&&!k.call(a.constructor.prototype||{},"isPrototypeOf"))return!1;for(b in a);return void 0===b||k.call(a,b)},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?i[j.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=d.createElement("script"),b.text=a,d.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b){var c,d=0;if(s(a)){for(c=a.length;c>d;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):g.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:h.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,g=0,h=[];if(s(a))for(d=a.length;d>g;g++)e=b(a[g],g,c),null!=e&&h.push(e);else for(g in a)e=b(a[g],g,c),null!=e&&h.push(e);return f.apply([],h)},guid:1,proxy:function(a,b){var c,d,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(d=e.call(arguments,2),f=function(){return a.apply(b||this,d.concat(e.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:l}),"function"==typeof Symbol&&(n.fn[Symbol.iterator]=c[Symbol.iterator]),n.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){i["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=!!a&&"length"in a&&a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ga(),z=ga(),A=ga(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+M+"))|)"+L+"*\\]",O=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+N+")*)|.*)\\)|)",P=new RegExp(L+"+","g"),Q=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),R=new RegExp("^"+L+"*,"+L+"*"),S=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),T=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),U=new RegExp(O),V=new RegExp("^"+M+"$"),W={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M+"|[*])"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},X=/^(?:input|select|textarea|button)$/i,Y=/^h\d$/i,Z=/^[^{]+\{\s*\[native \w/,$=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,_=/[+~]/,aa=/'|\\/g,ba=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),ca=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},da=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(ea){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fa(a,b,d,e){var f,h,j,k,l,o,r,s,w=b&&b.ownerDocument,x=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==x&&9!==x&&11!==x)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==x&&(o=$.exec(a)))if(f=o[1]){if(9===x){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(w&&(j=w.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(o[2])return H.apply(d,b.getElementsByTagName(a)),d;if((f=o[3])&&c.getElementsByClassName&&b.getElementsByClassName)return H.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==x)w=b,s=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(aa,"\\$&"):b.setAttribute("id",k=u),r=g(a),h=r.length,l=V.test(k)?"#"+k:"[id='"+k+"']";while(h--)r[h]=l+" "+qa(r[h]);s=r.join(","),w=_.test(a)&&oa(b.parentNode)||b}if(s)try{return H.apply(d,w.querySelectorAll(s)),d}catch(y){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(Q,"$1"),b,d,e)}function ga(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ha(a){return a[u]=!0,a}function ia(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ja(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function ka(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function la(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function na(a){return ha(function(b){return b=+b,ha(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function oa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=fa.support={},f=fa.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fa.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ia(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ia(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Z.test(n.getElementsByClassName),c.getById=ia(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return"undefined"!=typeof b.getElementsByClassName&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=Z.test(n.querySelectorAll))&&(ia(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ia(function(a){var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Z.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ia(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",O)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Z.test(o.compareDocumentPosition),t=b||Z.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return ka(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?ka(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},fa.matches=function(a,b){return fa(a,null,null,b)},fa.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(T,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fa(b,n,null,[a]).length>0},fa.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fa.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fa.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fa.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fa.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fa.selectors={cacheLength:50,createPseudo:ha,match:W,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ba,ca),a[3]=(a[3]||a[4]||a[5]||"").replace(ba,ca),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fa.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fa.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return W.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&U.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ba,ca).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fa.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(P," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fa.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ha(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ha(function(a){var b=[],c=[],d=h(a.replace(Q,"$1"));return d[u]?ha(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ha(function(a){return function(b){return fa(a,b).length>0}}),contains:ha(function(a){return a=a.replace(ba,ca),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ha(function(a){return V.test(a||"")||fa.error("unsupported lang: "+a),a=a.replace(ba,ca).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Y.test(a.nodeName)},input:function(a){return X.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:na(function(){return[0]}),last:na(function(a,b){return[b-1]}),eq:na(function(a,b,c){return[0>c?c+b:c]}),even:na(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:na(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:na(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:na(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=la(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=ma(b);function pa(){}pa.prototype=d.filters=d.pseudos,d.setFilters=new pa,g=fa.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=R.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=S.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(Q," ")}),h=h.slice(c.length));for(g in d.filter)!(e=W[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fa.error(a):z(a,i).slice(0)};function qa(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function ra(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j,k=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(j=b[u]||(b[u]={}),i=j[b.uniqueID]||(j[b.uniqueID]={}),(h=i[d])&&h[0]===w&&h[1]===f)return k[2]=h[2];if(i[d]=k,k[2]=a(b,c,g))return!0}}}function sa(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ta(a,b,c){for(var d=0,e=b.length;e>d;d++)fa(a,b[d],c);return c}function ua(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function va(a,b,c,d,e,f){return d&&!d[u]&&(d=va(d)),e&&!e[u]&&(e=va(e,f)),ha(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ta(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ua(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ua(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ua(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function wa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ra(function(a){return a===b},h,!0),l=ra(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[ra(sa(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return va(i>1&&sa(m),i>1&&qa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(Q,"$1"),c,e>i&&wa(a.slice(i,e)),f>e&&wa(a=a.slice(e)),f>e&&qa(a))}m.push(c)}return sa(m)}function xa(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=F.call(i));u=ua(u)}H.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&fa.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ha(f):f}return h=fa.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xa(e,d)),f.selector=a}return f},i=fa.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ba,ca),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=W.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ba,ca),_.test(j[0].type)&&oa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qa(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,!b||_.test(a)&&oa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ia(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ia(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ja("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ia(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ja("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ia(function(a){return null==a.getAttribute("disabled")})||ja(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fa}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.uniqueSort=n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},v=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},w=n.expr.match.needsContext,x=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,y=/^.[^:#\[\.,]*$/;function z(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(y.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return h.call(b,a)>-1!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(z(this,a||[],!1))},not:function(a){return this.pushStack(z(this,a||[],!0))},is:function(a){return!!z(this,"string"==typeof a&&w.test(a)?n(a):a||[],!1).length}});var A,B=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=n.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||A,"string"==typeof a){if(e="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:B.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),x.test(e[1])&&n.isPlainObject(b))for(e in b)n.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}return f=d.getElementById(e[2]),f&&f.parentNode&&(this.length=1,this[0]=f),this.context=d,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?void 0!==c.ready?c.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};C.prototype=n.fn,A=n(d);var D=/^(?:parents|prev(?:Until|All))/,E={children:!0,contents:!0,next:!0,prev:!0};n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=w.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?h.call(n(a),this[0]):h.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.uniqueSort(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function F(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return u(a,"parentNode")},parentsUntil:function(a,b,c){return u(a,"parentNode",c)},next:function(a){return F(a,"nextSibling")},prev:function(a){return F(a,"previousSibling")},nextAll:function(a){return u(a,"nextSibling")},prevAll:function(a){return u(a,"previousSibling")},nextUntil:function(a,b,c){return u(a,"nextSibling",c)},prevUntil:function(a,b,c){return u(a,"previousSibling",c)},siblings:function(a){return v((a.parentNode||{}).firstChild,a)},children:function(a){return v(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(E[a]||n.uniqueSort(e),D.test(a)&&e.reverse()),this.pushStack(e)}});var G=/\S+/g;function H(a){var b={};return n.each(a.match(G)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?H(a):n.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){n.each(b,function(b,c){n.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==n.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return n.each(arguments,function(a,b){var c;while((c=n.inArray(b,f,c))>-1)f.splice(c,1),h>=c&&h--}),this},has:function(a){return a?n.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=g=[],c||(f=c=""),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().progress(c.notify).done(c.resolve).fail(c.reject):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=e.call(arguments),d=c.length,f=1!==d||a&&n.isFunction(a.promise)?d:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?e.call(arguments):d,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(d>1)for(i=new Array(d),j=new Array(d),k=new Array(d);d>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().progress(h(b,j,i)).done(h(b,k,c)).fail(g.reject):--f;return f||g.resolveWith(k,c),g.promise()}});var I;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(I.resolveWith(d,[n]),n.fn.triggerHandler&&(n(d).triggerHandler("ready"),n(d).off("ready"))))}});function J(){d.removeEventListener("DOMContentLoaded",J),a.removeEventListener("load",J),n.ready()}n.ready.promise=function(b){return I||(I=n.Deferred(),"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll?a.setTimeout(n.ready):(d.addEventListener("DOMContentLoaded",J),a.addEventListener("load",J))),I.promise(b)},n.ready.promise();var K=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)K(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},L=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function M(){this.expando=n.expando+M.uid++}M.uid=1,M.prototype={register:function(a,b){var c=b||{};return a.nodeType?a[this.expando]=c:Object.defineProperty(a,this.expando,{value:c,writable:!0,configurable:!0}),a[this.expando]},cache:function(a){if(!L(a))return{};var b=a[this.expando];return b||(b={},L(a)&&(a.nodeType?a[this.expando]=b:Object.defineProperty(a,this.expando,{value:b,configurable:!0}))),b},set:function(a,b,c){var d,e=this.cache(a);if("string"==typeof b)e[b]=c;else for(d in b)e[d]=b[d];return e},get:function(a,b){return void 0===b?this.cache(a):a[this.expando]&&a[this.expando][b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=a[this.expando];if(void 0!==f){if(void 0===b)this.register(a);else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in f?d=[b,e]:(d=e,d=d in f?[d]:d.match(G)||[])),c=d.length;while(c--)delete f[d[c]]}(void 0===b||n.isEmptyObject(f))&&(a.nodeType?a[this.expando]=void 0:delete a[this.expando])}},hasData:function(a){var b=a[this.expando];return void 0!==b&&!n.isEmptyObject(b)}};var N=new M,O=new M,P=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Q=/[A-Z]/g;function R(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(Q,"-$&").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:P.test(c)?n.parseJSON(c):c;
}catch(e){}O.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return O.hasData(a)||N.hasData(a)},data:function(a,b,c){return O.access(a,b,c)},removeData:function(a,b){O.remove(a,b)},_data:function(a,b,c){return N.access(a,b,c)},_removeData:function(a,b){N.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=O.get(f),1===f.nodeType&&!N.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),R(f,d,e[d])));N.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){O.set(this,a)}):K(this,function(b){var c,d;if(f&&void 0===b){if(c=O.get(f,a)||O.get(f,a.replace(Q,"-$&").toLowerCase()),void 0!==c)return c;if(d=n.camelCase(a),c=O.get(f,d),void 0!==c)return c;if(c=R(f,d,void 0),void 0!==c)return c}else d=n.camelCase(a),this.each(function(){var c=O.get(this,d);O.set(this,d,b),a.indexOf("-")>-1&&void 0!==c&&O.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){O.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=N.get(a,b),c&&(!d||n.isArray(c)?d=N.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return N.get(a,c)||N.access(a,c,{empty:n.Callbacks("once memory").add(function(){N.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=N.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),U=["Top","Right","Bottom","Left"],V=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)};function W(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return n.css(a,b,"")},i=h(),j=c&&c[3]||(n.cssNumber[b]?"":"px"),k=(n.cssNumber[b]||"px"!==j&&+i)&&T.exec(n.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,n.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var X=/^(?:checkbox|radio)$/i,Y=/<([\w:-]+)/,Z=/^$|\/(?:java|ecma)script/i,$={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};$.optgroup=$.option,$.tbody=$.tfoot=$.colgroup=$.caption=$.thead,$.th=$.td;function _(a,b){var c="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function aa(a,b){for(var c=0,d=a.length;d>c;c++)N.set(a[c],"globalEval",!b||N.get(b[c],"globalEval"))}var ba=/<|&#?\w+;/;function ca(a,b,c,d,e){for(var f,g,h,i,j,k,l=b.createDocumentFragment(),m=[],o=0,p=a.length;p>o;o++)if(f=a[o],f||0===f)if("object"===n.type(f))n.merge(m,f.nodeType?[f]:f);else if(ba.test(f)){g=g||l.appendChild(b.createElement("div")),h=(Y.exec(f)||["",""])[1].toLowerCase(),i=$[h]||$._default,g.innerHTML=i[1]+n.htmlPrefilter(f)+i[2],k=i[0];while(k--)g=g.lastChild;n.merge(m,g.childNodes),g=l.firstChild,g.textContent=""}else m.push(b.createTextNode(f));l.textContent="",o=0;while(f=m[o++])if(d&&n.inArray(f,d)>-1)e&&e.push(f);else if(j=n.contains(f.ownerDocument,f),g=_(l.appendChild(f),"script"),j&&aa(g),c){k=0;while(f=g[k++])Z.test(f.type||"")&&c.push(f)}return l}!function(){var a=d.createDocumentFragment(),b=a.appendChild(d.createElement("div")),c=d.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var da=/^key/,ea=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,fa=/^([^.]*)(?:\.(.+)|)/;function ga(){return!0}function ha(){return!1}function ia(){try{return d.activeElement}catch(a){}}function ja(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)ja(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=ha;else if(!e)return a;return 1===f&&(g=e,e=function(a){return n().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=n.guid++)),a.each(function(){n.event.add(this,b,e,d,c)})}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=N.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return"undefined"!=typeof n&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(G)||[""],j=b.length;while(j--)h=fa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=N.hasData(a)&&N.get(a);if(r&&(i=r.events)){b=(b||"").match(G)||[""],j=b.length;while(j--)if(h=fa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&N.remove(a,"handle events")}},dispatch:function(a){a=n.event.fix(a);var b,c,d,f,g,h=[],i=e.call(arguments),j=(N.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())a.rnamespace&&!a.rnamespace.test(g.namespace)||(a.handleObj=g,a.data=g.data,d=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==d&&(a.result=d)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&("click"!==a.type||isNaN(a.button)||a.button<1))for(;i!==this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>-1:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,e,f,g=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||d,e=c.documentElement,f=c.body,a.pageX=b.clientX+(e&&e.scrollLeft||f&&f.scrollLeft||0)-(e&&e.clientLeft||f&&f.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||f&&f.scrollTop||0)-(e&&e.clientTop||f&&f.clientTop||0)),a.which||void 0===g||(a.which=1&g?1:2&g?3:4&g?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,e,f=a.type,g=a,h=this.fixHooks[f];h||(this.fixHooks[f]=h=ea.test(f)?this.mouseHooks:da.test(f)?this.keyHooks:{}),e=h.props?this.props.concat(h.props):this.props,a=new n.Event(g),b=e.length;while(b--)c=e[b],a[c]=g[c];return a.target||(a.target=d),3===a.target.nodeType&&(a.target=a.target.parentNode),h.filter?h.filter(a,g):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==ia()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===ia()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ga:ha):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={constructor:n.Event,isDefaultPrevented:ha,isPropagationStopped:ha,isImmediatePropagationStopped:ha,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ga,a&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ga,a&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ga,a&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||n.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),n.fn.extend({on:function(a,b,c,d){return ja(this,a,b,c,d)},one:function(a,b,c,d){return ja(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=ha),this.each(function(){n.event.remove(this,a,c,b)})}});var ka=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,la=/<script|<style|<link/i,ma=/checked\s*(?:[^=]|=\s*.checked.)/i,na=/^true\/(.*)/,oa=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function pa(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function qa(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function ra(a){var b=na.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function sa(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(N.hasData(a)&&(f=N.access(a),g=N.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}O.hasData(a)&&(h=O.access(a),i=n.extend({},h),O.set(b,i))}}function ta(a,b){var c=b.nodeName.toLowerCase();"input"===c&&X.test(a.type)?b.checked=a.checked:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}function ua(a,b,c,d){b=f.apply([],b);var e,g,h,i,j,k,m=0,o=a.length,p=o-1,q=b[0],r=n.isFunction(q);if(r||o>1&&"string"==typeof q&&!l.checkClone&&ma.test(q))return a.each(function(e){var f=a.eq(e);r&&(b[0]=q.call(this,e,f.html())),ua(f,b,c,d)});if(o&&(e=ca(b,a[0].ownerDocument,!1,a,d),g=e.firstChild,1===e.childNodes.length&&(e=g),g||d)){for(h=n.map(_(e,"script"),qa),i=h.length;o>m;m++)j=e,m!==p&&(j=n.clone(j,!0,!0),i&&n.merge(h,_(j,"script"))),c.call(a[m],j,m);if(i)for(k=h[h.length-1].ownerDocument,n.map(h,ra),m=0;i>m;m++)j=h[m],Z.test(j.type||"")&&!N.access(j,"globalEval")&&n.contains(k,j)&&(j.src?n._evalUrl&&n._evalUrl(j.src):n.globalEval(j.textContent.replace(oa,"")))}return a}function va(a,b,c){for(var d,e=b?n.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||n.cleanData(_(d)),d.parentNode&&(c&&n.contains(d.ownerDocument,d)&&aa(_(d,"script")),d.parentNode.removeChild(d));return a}n.extend({htmlPrefilter:function(a){return a.replace(ka,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=_(h),f=_(a),d=0,e=f.length;e>d;d++)ta(f[d],g[d]);if(b)if(c)for(f=f||_(a),g=g||_(h),d=0,e=f.length;e>d;d++)sa(f[d],g[d]);else sa(a,h);return g=_(h,"script"),g.length>0&&aa(g,!i&&_(a,"script")),h},cleanData:function(a){for(var b,c,d,e=n.event.special,f=0;void 0!==(c=a[f]);f++)if(L(c)){if(b=c[N.expando]){if(b.events)for(d in b.events)e[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);c[N.expando]=void 0}c[O.expando]&&(c[O.expando]=void 0)}}}),n.fn.extend({domManip:ua,detach:function(a){return va(this,a,!0)},remove:function(a){return va(this,a)},text:function(a){return K(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=a)})},null,a,arguments.length)},append:function(){return ua(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=pa(this,a);b.appendChild(a)}})},prepend:function(){return ua(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=pa(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return ua(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return ua(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(_(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return K(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!la.test(a)&&!$[(Y.exec(a)||["",""])[1].toLowerCase()]){a=n.htmlPrefilter(a);try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(_(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return ua(this,arguments,function(b){var c=this.parentNode;n.inArray(this,a)<0&&(n.cleanData(_(this)),c&&c.replaceChild(b,this))},a)}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),f=e.length-1,h=0;f>=h;h++)c=h===f?this:this.clone(!0),n(e[h])[b](c),g.apply(d,c.get());return this.pushStack(d)}});var wa,xa={HTML:"block",BODY:"block"};function ya(a,b){var c=n(b.createElement(a)).appendTo(b.body),d=n.css(c[0],"display");return c.detach(),d}function za(a){var b=d,c=xa[a];return c||(c=ya(a,b),"none"!==c&&c||(wa=(wa||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=wa[0].contentDocument,b.write(),b.close(),c=ya(a,b),wa.detach()),xa[a]=c),c}var Aa=/^margin/,Ba=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ca=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)},Da=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e},Ea=d.documentElement;!function(){var b,c,e,f,g=d.createElement("div"),h=d.createElement("div");if(h.style){h.style.backgroundClip="content-box",h.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===h.style.backgroundClip,g.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",g.appendChild(h);function i(){h.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",h.innerHTML="",Ea.appendChild(g);var d=a.getComputedStyle(h);b="1%"!==d.top,f="2px"===d.marginLeft,c="4px"===d.width,h.style.marginRight="50%",e="4px"===d.marginRight,Ea.removeChild(g)}n.extend(l,{pixelPosition:function(){return i(),b},boxSizingReliable:function(){return null==c&&i(),c},pixelMarginRight:function(){return null==c&&i(),e},reliableMarginLeft:function(){return null==c&&i(),f},reliableMarginRight:function(){var b,c=h.appendChild(d.createElement("div"));return c.style.cssText=h.style.cssText="-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",h.style.width="1px",Ea.appendChild(g),b=!parseFloat(a.getComputedStyle(c).marginRight),Ea.removeChild(g),h.removeChild(c),b}})}}();function Fa(a,b,c){var d,e,f,g,h=a.style;return c=c||Ca(a),g=c?c.getPropertyValue(b)||c[b]:void 0,""!==g&&void 0!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),c&&!l.pixelMarginRight()&&Ba.test(g)&&Aa.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f),void 0!==g?g+"":g}function Ga(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Ha=/^(none|table(?!-c[ea]).+)/,Ia={position:"absolute",visibility:"hidden",display:"block"},Ja={letterSpacing:"0",fontWeight:"400"},Ka=["Webkit","O","Moz","ms"],La=d.createElement("div").style;function Ma(a){if(a in La)return a;var b=a[0].toUpperCase()+a.slice(1),c=Ka.length;while(c--)if(a=Ka[c]+b,a in La)return a}function Na(a,b,c){var d=T.exec(b);return d?Math.max(0,d[2]-(c||0))+(d[3]||"px"):b}function Oa(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+U[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+U[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+U[f]+"Width",!0,e))):(g+=n.css(a,"padding"+U[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+U[f]+"Width",!0,e)));return g}function Pa(b,c,e){var f=!0,g="width"===c?b.offsetWidth:b.offsetHeight,h=Ca(b),i="border-box"===n.css(b,"boxSizing",!1,h);if(d.msFullscreenElement&&a.top!==a&&b.getClientRects().length&&(g=Math.round(100*b.getBoundingClientRect()[c])),0>=g||null==g){if(g=Fa(b,c,h),(0>g||null==g)&&(g=b.style[c]),Ba.test(g))return g;f=i&&(l.boxSizingReliable()||g===b.style[c]),g=parseFloat(g)||0}return g+Oa(b,c,e||(i?"border":"content"),f,h)+"px"}function Qa(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=N.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&V(d)&&(f[g]=N.access(d,"olddisplay",za(d.nodeName)))):(e=V(d),"none"===c&&e||N.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Fa(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Ma(h)||h),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=T.exec(c))&&e[1]&&(c=W(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(n.cssNumber[h]?"":"px")),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Ma(h)||h),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=Fa(a,b,d)),"normal"===e&&b in Ja&&(e=Ja[b]),""===c||c?(f=parseFloat(e),c===!0||isFinite(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?Ha.test(n.css(a,"display"))&&0===a.offsetWidth?Da(a,Ia,function(){return Pa(a,b,d)}):Pa(a,b,d):void 0},set:function(a,c,d){var e,f=d&&Ca(a),g=d&&Oa(a,b,d,"border-box"===n.css(a,"boxSizing",!1,f),f);return g&&(e=T.exec(c))&&"px"!==(e[3]||"px")&&(a.style[b]=c,c=n.css(a,b)),Na(a,c,g)}}}),n.cssHooks.marginLeft=Ga(l.reliableMarginLeft,function(a,b){return b?(parseFloat(Fa(a,"marginLeft"))||a.getBoundingClientRect().left-Da(a,{marginLeft:0},function(){return a.getBoundingClientRect().left}))+"px":void 0}),n.cssHooks.marginRight=Ga(l.reliableMarginRight,function(a,b){return b?Da(a,{display:"inline-block"},Fa,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+U[d]+b]=f[d]||f[d-2]||f[0];return e}},Aa.test(a)||(n.cssHooks[a+b].set=Na)}),n.fn.extend({css:function(a,b){return K(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=Ca(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Qa(this,!0)},hide:function(){return Qa(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){V(this)?n(this).show():n(this).hide()})}});function Ra(a,b,c,d,e){return new Ra.prototype.init(a,b,c,d,e)}n.Tween=Ra,Ra.prototype={constructor:Ra,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||n.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Ra.propHooks[this.prop];return a&&a.get?a.get(this):Ra.propHooks._default.get(this)},run:function(a){var b,c=Ra.propHooks[this.prop];return this.options.duration?this.pos=b=n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Ra.propHooks._default.set(this),this}},Ra.prototype.init.prototype=Ra.prototype,Ra.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[n.cssProps[a.prop]]&&!n.cssHooks[a.prop]?a.elem[a.prop]=a.now:n.style(a.elem,a.prop,a.now+a.unit)}}},Ra.propHooks.scrollTop=Ra.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},n.fx=Ra.prototype.init,n.fx.step={};var Sa,Ta,Ua=/^(?:toggle|show|hide)$/,Va=/queueHooks$/;function Wa(){return a.setTimeout(function(){Sa=void 0}),Sa=n.now()}function Xa(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=U[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ya(a,b,c){for(var d,e=(_a.tweeners[b]||[]).concat(_a.tweeners["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Za(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&V(a),q=N.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?N.get(a,"olddisplay")||za(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Ua.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?za(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=N.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;N.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ya(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function $a(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function _a(a,b,c){var d,e,f=0,g=_a.prefilters.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Sa||Wa(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{},easing:n.easing._default},c),originalProperties:b,originalOptions:c,startTime:Sa||Wa(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for($a(k,j.opts.specialEasing);g>f;f++)if(d=_a.prefilters[f].call(j,a,k,j.opts))return n.isFunction(d.stop)&&(n._queueHooks(j.elem,j.opts.queue).stop=n.proxy(d.stop,d)),d;return n.map(k,Ya,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(_a,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return W(c.elem,a,T.exec(b),c),c}]},tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.match(G);for(var c,d=0,e=a.length;e>d;d++)c=a[d],_a.tweeners[c]=_a.tweeners[c]||[],_a.tweeners[c].unshift(b)},prefilters:[Za],prefilter:function(a,b){b?_a.prefilters.unshift(a):_a.prefilters.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,null!=d.queue&&d.queue!==!0||(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(V).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=_a(this,n.extend({},a),f);(e||N.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=N.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Va.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=N.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Xa(b,!0),a,d,e)}}),n.each({slideDown:Xa("show"),slideUp:Xa("hide"),slideToggle:Xa("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(Sa=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),Sa=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Ta||(Ta=a.setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){a.clearInterval(Ta),Ta=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(b,c){return b=n.fx?n.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a=d.createElement("input"),b=d.createElement("select"),c=b.appendChild(d.createElement("option"));a.type="checkbox",l.checkOn=""!==a.value,l.optSelected=c.selected,b.disabled=!0,l.optDisabled=!c.disabled,a=d.createElement("input"),a.value="t",a.type="radio",l.radioValue="t"===a.value}();var ab,bb=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return K(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),e=n.attrHooks[b]||(n.expr.match.bool.test(b)?ab:void 0)),void 0!==c?null===c?void n.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=n.find.attr(a,b),null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(G);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)}}),ab={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=bb[b]||n.find.attr;bb[b]=function(a,b,d){var e,f;return d||(f=bb[b],bb[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,bb[b]=f),e}});var cb=/^(?:input|select|textarea|button)$/i,db=/^(?:a|area)$/i;n.fn.extend({prop:function(a,b){return K(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&n.isXMLDoc(a)||(b=n.propFix[b]||b,
e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=n.find.attr(a,"tabindex");return b?parseInt(b,10):cb.test(a.nodeName)||db.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),l.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var eb=/[\t\r\n\f]/g;function fb(a){return a.getAttribute&&a.getAttribute("class")||""}n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,fb(this)))});if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=fb(c),d=1===c.nodeType&&(" "+e+" ").replace(eb," ")){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=n.trim(d),e!==h&&c.setAttribute("class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,fb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=fb(c),d=1===c.nodeType&&(" "+e+" ").replace(eb," ")){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=n.trim(d),e!==h&&c.setAttribute("class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):n.isFunction(a)?this.each(function(c){n(this).toggleClass(a.call(this,c,fb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=n(this),f=a.match(G)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=fb(this),b&&N.set(this,"__className__",b),this.setAttribute&&this.setAttribute("class",b||a===!1?"":N.get(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+fb(c)+" ").replace(eb," ").indexOf(b)>-1)return!0;return!1}});var gb=/\r/g,hb=/[\x20\t\r\n\f]+/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(gb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a)).replace(hb," ")}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],(c.selected||i===e)&&(l.optDisabled?!c.disabled:null===c.getAttribute("disabled"))&&(!c.parentNode.disabled||!n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(n.valHooks.option.get(d),f)>-1)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>-1:void 0}},l.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var ib=/^(?:focusinfocus|focusoutblur)$/;n.extend(n.event,{trigger:function(b,c,e,f){var g,h,i,j,l,m,o,p=[e||d],q=k.call(b,"type")?b.type:b,r=k.call(b,"namespace")?b.namespace.split("."):[];if(h=i=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!ib.test(q+n.event.triggered)&&(q.indexOf(".")>-1&&(r=q.split("."),q=r.shift(),r.sort()),l=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=r.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},f||!o.trigger||o.trigger.apply(e,c)!==!1)){if(!f&&!o.noBubble&&!n.isWindow(e)){for(j=o.delegateType||q,ib.test(j+q)||(h=h.parentNode);h;h=h.parentNode)p.push(h),i=h;i===(e.ownerDocument||d)&&p.push(i.defaultView||i.parentWindow||a)}g=0;while((h=p[g++])&&!b.isPropagationStopped())b.type=g>1?j:o.bindType||q,m=(N.get(h,"events")||{})[b.type]&&N.get(h,"handle"),m&&m.apply(h,c),m=l&&h[l],m&&m.apply&&L(h)&&(b.result=m.apply(h,c),b.result===!1&&b.preventDefault());return b.type=q,f||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!L(e)||l&&n.isFunction(e[q])&&!n.isWindow(e)&&(i=e[l],i&&(e[l]=null),n.event.triggered=q,e[q](),n.event.triggered=void 0,i&&(e[l]=i)),b.result}},simulate:function(a,b,c){var d=n.extend(new n.Event,c,{type:a,isSimulated:!0});n.event.trigger(d,null,b),d.isDefaultPrevented()&&c.preventDefault()}}),n.fn.extend({trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),l.focusin="onfocusin"in a,l.focusin||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a))};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=N.access(d,b);e||d.addEventListener(a,c,!0),N.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=N.access(d,b)-1;e?N.access(d,b,e):(d.removeEventListener(a,c,!0),N.remove(d,b))}}});var jb=a.location,kb=n.now(),lb=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(b){var c;if(!b||"string"!=typeof b)return null;try{c=(new a.DOMParser).parseFromString(b,"text/xml")}catch(d){c=void 0}return c&&!c.getElementsByTagName("parsererror").length||n.error("Invalid XML: "+b),c};var mb=/#.*$/,nb=/([?&])_=[^&]*/,ob=/^(.*?):[ \t]*([^\r\n]*)$/gm,pb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,qb=/^(?:GET|HEAD)$/,rb=/^\/\//,sb={},tb={},ub="*/".concat("*"),vb=d.createElement("a");vb.href=jb.href;function wb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(G)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function xb(a,b,c,d){var e={},f=a===tb;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function yb(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function zb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Ab(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:jb.href,type:"GET",isLocal:pb.test(jb.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":ub,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?yb(yb(a,n.ajaxSettings),b):yb(n.ajaxSettings,a)},ajaxPrefilter:wb(sb),ajaxTransport:wb(tb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var e,f,g,h,i,j,k,l,m=n.ajaxSetup({},c),o=m.context||m,p=m.context&&(o.nodeType||o.jquery)?n(o):n.event,q=n.Deferred(),r=n.Callbacks("once memory"),s=m.statusCode||{},t={},u={},v=0,w="canceled",x={readyState:0,getResponseHeader:function(a){var b;if(2===v){if(!h){h={};while(b=ob.exec(g))h[b[1].toLowerCase()]=b[2]}b=h[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===v?g:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return v||(a=u[c]=u[c]||a,t[a]=b),this},overrideMimeType:function(a){return v||(m.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>v)for(b in a)s[b]=[s[b],a[b]];else x.always(a[x.status]);return this},abort:function(a){var b=a||w;return e&&e.abort(b),z(0,b),this}};if(q.promise(x).complete=r.add,x.success=x.done,x.error=x.fail,m.url=((b||m.url||jb.href)+"").replace(mb,"").replace(rb,jb.protocol+"//"),m.type=c.method||c.type||m.method||m.type,m.dataTypes=n.trim(m.dataType||"*").toLowerCase().match(G)||[""],null==m.crossDomain){j=d.createElement("a");try{j.href=m.url,j.href=j.href,m.crossDomain=vb.protocol+"//"+vb.host!=j.protocol+"//"+j.host}catch(y){m.crossDomain=!0}}if(m.data&&m.processData&&"string"!=typeof m.data&&(m.data=n.param(m.data,m.traditional)),xb(sb,m,c,x),2===v)return x;k=n.event&&m.global,k&&0===n.active++&&n.event.trigger("ajaxStart"),m.type=m.type.toUpperCase(),m.hasContent=!qb.test(m.type),f=m.url,m.hasContent||(m.data&&(f=m.url+=(lb.test(f)?"&":"?")+m.data,delete m.data),m.cache===!1&&(m.url=nb.test(f)?f.replace(nb,"$1_="+kb++):f+(lb.test(f)?"&":"?")+"_="+kb++)),m.ifModified&&(n.lastModified[f]&&x.setRequestHeader("If-Modified-Since",n.lastModified[f]),n.etag[f]&&x.setRequestHeader("If-None-Match",n.etag[f])),(m.data&&m.hasContent&&m.contentType!==!1||c.contentType)&&x.setRequestHeader("Content-Type",m.contentType),x.setRequestHeader("Accept",m.dataTypes[0]&&m.accepts[m.dataTypes[0]]?m.accepts[m.dataTypes[0]]+("*"!==m.dataTypes[0]?", "+ub+"; q=0.01":""):m.accepts["*"]);for(l in m.headers)x.setRequestHeader(l,m.headers[l]);if(m.beforeSend&&(m.beforeSend.call(o,x,m)===!1||2===v))return x.abort();w="abort";for(l in{success:1,error:1,complete:1})x[l](m[l]);if(e=xb(tb,m,c,x)){if(x.readyState=1,k&&p.trigger("ajaxSend",[x,m]),2===v)return x;m.async&&m.timeout>0&&(i=a.setTimeout(function(){x.abort("timeout")},m.timeout));try{v=1,e.send(t,z)}catch(y){if(!(2>v))throw y;z(-1,y)}}else z(-1,"No Transport");function z(b,c,d,h){var j,l,t,u,w,y=c;2!==v&&(v=2,i&&a.clearTimeout(i),e=void 0,g=h||"",x.readyState=b>0?4:0,j=b>=200&&300>b||304===b,d&&(u=zb(m,x,d)),u=Ab(m,u,x,j),j?(m.ifModified&&(w=x.getResponseHeader("Last-Modified"),w&&(n.lastModified[f]=w),w=x.getResponseHeader("etag"),w&&(n.etag[f]=w)),204===b||"HEAD"===m.type?y="nocontent":304===b?y="notmodified":(y=u.state,l=u.data,t=u.error,j=!t)):(t=y,!b&&y||(y="error",0>b&&(b=0))),x.status=b,x.statusText=(c||y)+"",j?q.resolveWith(o,[l,y,x]):q.rejectWith(o,[x,y,t]),x.statusCode(s),s=void 0,k&&p.trigger(j?"ajaxSuccess":"ajaxError",[x,m,j?l:t]),r.fireWith(o,[x,y]),k&&(p.trigger("ajaxComplete",[x,m]),--n.active||n.event.trigger("ajaxStop")))}return x},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax(n.extend({url:a,type:b,dataType:e,data:c,success:d},n.isPlainObject(a)&&a))}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return n.isFunction(a)?this.each(function(b){n(this).wrapInner(a.call(this,b))}):this.each(function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return!n.expr.filters.visible(a)},n.expr.filters.visible=function(a){return a.offsetWidth>0||a.offsetHeight>0||a.getClientRects().length>0};var Bb=/%20/g,Cb=/\[\]$/,Db=/\r?\n/g,Eb=/^(?:submit|button|image|reset|file)$/i,Fb=/^(?:input|select|textarea|keygen)/i;function Gb(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||Cb.test(a)?d(a,e):Gb(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Gb(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Gb(c,a[c],b,e);return d.join("&").replace(Bb,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&Fb.test(this.nodeName)&&!Eb.test(a)&&(this.checked||!X.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(Db,"\r\n")}}):{name:b.name,value:c.replace(Db,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new a.XMLHttpRequest}catch(b){}};var Hb={0:200,1223:204},Ib=n.ajaxSettings.xhr();l.cors=!!Ib&&"withCredentials"in Ib,l.ajax=Ib=!!Ib,n.ajaxTransport(function(b){var c,d;return l.cors||Ib&&!b.crossDomain?{send:function(e,f){var g,h=b.xhr();if(h.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(g in b.xhrFields)h[g]=b.xhrFields[g];b.mimeType&&h.overrideMimeType&&h.overrideMimeType(b.mimeType),b.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest");for(g in e)h.setRequestHeader(g,e[g]);c=function(a){return function(){c&&(c=d=h.onload=h.onerror=h.onabort=h.onreadystatechange=null,"abort"===a?h.abort():"error"===a?"number"!=typeof h.status?f(0,"error"):f(h.status,h.statusText):f(Hb[h.status]||h.status,h.statusText,"text"!==(h.responseType||"text")||"string"!=typeof h.responseText?{binary:h.response}:{text:h.responseText},h.getAllResponseHeaders()))}},h.onload=c(),d=h.onerror=c("error"),void 0!==h.onabort?h.onabort=d:h.onreadystatechange=function(){4===h.readyState&&a.setTimeout(function(){c&&d()})},c=c("abort");try{h.send(b.hasContent&&b.data||null)}catch(i){if(c)throw i}},abort:function(){c&&c()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(e,f){b=n("<script>").prop({charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&f("error"===a.type?404:200,a.type)}),d.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Jb=[],Kb=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Jb.pop()||n.expando+"_"+kb++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Kb.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Kb.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Kb,"$1"+e):b.jsonp!==!1&&(b.url+=(lb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?n(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Jb.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||d;var e=x.exec(a),f=!c&&[];return e?[b.createElement(e[1])]:(e=ca([a],b,f),f&&f.length&&n(f).remove(),n.merge([],e.childNodes))};var Lb=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Lb)return Lb.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a])})}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};function Mb(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,n.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(e=d.getBoundingClientRect(),c=Mb(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Ea})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c="pageYOffset"===b;n.fn[a]=function(d){return K(this,function(a,d,e){var f=Mb(a);return void 0===e?f?f[b]:a[d]:void(f?f.scrollTo(c?f.pageXOffset:e,c?e:f.pageYOffset):a[d]=e)},a,d,arguments.length)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=Ga(l.pixelPosition,function(a,c){return c?(c=Fa(a,b),Ba.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return K(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)},size:function(){return this.length}}),n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Nb=a.jQuery,Ob=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Ob),b&&a.jQuery===n&&(a.jQuery=Nb),n},b||(a.jQuery=a.$=n),n});
(function() {
  $(function() {
    console.log("data", document.getElementById("comments-form"));
    $("#comments-form").on("ajax:success", function(ev, data) {
      return console.log("entro al comment");
    });
    $(document).on("ajax:success", "form#comments-form", function(ev, data) {
      console.log("ok", data);
      $(this).find("textarea").val("");
      return $("#comments-box").html("<%= escape_javascript(render partial: 'comments/comments_show' ) %>");
    });
    return $(document).on("ajax:error", "form#comments-form", function(ev, data) {
      return console.log("error", data);
    });
  });

}).call(this);

var s,
    app = {

        settings : {
            jpm: {}
        },
        init: function() {
            //Global settings
            s = this.settings;

            // initalize
            this.initalizers();
            this.bindUiActions();
        },
        bindUiActions: function (){
            // Should include all JS user interactions
            var self = this;
            $('.select-posts, .select-categories').removeClass("active");
            $('.select-posts,.select-categories').on('click', function () {
                self.showActiveLink();
            });

            $('.social-icon').on('click', function(){
                self.socialIconClick( $(this) );
            });
            
        },
        initalizers: function (){
            // Initalize any plugins for functions when page loads

            // JPanel Menu Plugin -
            this.jpm();

            // Fast Click for Mobile - removes 300ms delay - https://github.com/ftlabs/fastclick
            FastClick.attach(document.body);

            // Add Bg colour from JS so jPanel has time to initalize
            $('body').css({"background-color":"#333337"});
        },
        showActiveLink: function() {
            $('.select-posts, .select-categories').removeClass("active");
            var path = document.location.pathname;
            console.log(path);
            switch (path){
                case '/articles':
                    console.log('en articles');
                    $('.select-posts').addClass("active");
                    break;
                case '/categories':
                    console.log('en categories');
                    $('.select-categories').addClass("active");
                    break;
            }
        },
        socialIconClick: function(el) {
            // Post page social Icons
            // When Clicked pop up a share dialog

            var platform = el.data('platform');
            var message = el.data('message');
            var url = el.data('url');

            if (platform == 'mail'){
                // Let mail use default browser behaviour
                return true;
            } else {
                this.popItUp(platform, message, url);
                return false;
            }
        },
        popItUp : function (platform, message, url) {
            // Create the popup with the correct location URL for sharing
            var popUrl,
                newWindow;

            if( platform == 'twitter'){
                popUrl = 'http://twitter.com/home?status=' + encodeURI(message) + '+' + url;

            } else if(platform == 'facebook'){
                popUrl = 'http://www.facebook.com/share.php?u' + url + '&amp;title=' + encodeURI(message);
            }
            newWindow = window.open(popUrl,'name','height=500,width=600');
            if (window.focus) { newWindow.focus(); }
            return false;

        },
        jpm: function(){
            // Off Screen Navigation Plugin

            s.jpm = $.jPanelMenu({
                menu : '#menu-target',
                trigger: '.menu-trigger',
                animated: false,
                beforeOpen : ( function() {
                    if (matchMedia('only screen and (min-width: 992px)').matches) {
                        $('.sidebar').css("left", "250px");
                    }
                }),
                beforeClose : ( function() {
                    $('.sidebar').css("left", "0");
                    $('.writer-icon, .side-writer-icon').removeClass("fadeOutUp");
                })
            });

            s.jpm.on();
        }
    };

$(document).ready(function(){
    app.init();
});

// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//




















$('selector').froalaEditor();
