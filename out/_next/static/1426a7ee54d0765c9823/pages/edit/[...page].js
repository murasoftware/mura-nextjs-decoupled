(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"7W2i":function(t,e,n){var r=n("SksO");t.exports=function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&r(t,e)}},"91Zj":function(t,e,n){"use strict";n.r(e),n.d(e,"__N_SSG",(function(){return s})),n.d(e,"default",(function(){return f}));var r=n("q1tI"),o=n.n(r),i=n("YFqc"),c=n.n(i),a=(o.a.createElement,n("iq+K")),u=o.a.createElement,s=!0;function f(t){console.log("Name -> props",t);t.route;var e=t.content;t.title,t.children;return console.log("Name -> content",e),u(a.a,t,u("nav",null,e.map((function(t){return u(c.a,{key:"".concat(t.filename),href:"".concat(t.filename)},u("a",null,t.menutitle))}))))}},Nsbk:function(t,e){function n(e){return t.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},n(e)}t.exports=n},PJYZ:function(t,e){t.exports=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}},YFqc:function(t,e,n){t.exports=n("cTJO")},a1gu:function(t,e,n){var r=n("cDf5"),o=n("PJYZ");t.exports=function(t,e){return!e||"object"!==r(e)&&"function"!==typeof e?o(t):e}},cTJO:function(t,e,n){"use strict";var r=n("lwsE"),o=n("W8MJ"),i=n("7W2i"),c=n("a1gu"),a=n("Nsbk");function u(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=a(t);if(e){var o=a(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return c(this,n)}}var s=n("TqRt"),f=n("284h");e.__esModule=!0,e.default=void 0;var l,p=f(n("q1tI")),h=n("QmWs"),v=n("g/15"),d=s(n("nOHt")),y=n("elyg");function m(t){return t&&"object"===typeof t?(0,v.formatWithValidation)(t):t}var g=new Map,w=window.IntersectionObserver,b={};var O=function(t,e){var n=l||(w?l=new w((function(t){t.forEach((function(t){if(g.has(t.target)){var e=g.get(t.target);(t.isIntersecting||t.intersectionRatio>0)&&(l.unobserve(t.target),g.delete(t.target),e())}}))}),{rootMargin:"200px"}):void 0);return n?(n.observe(t),g.set(t,e),function(){try{n.unobserve(t)}catch(e){console.error(e)}g.delete(t)}):function(){}},_=function(t){i(n,t);var e=u(n);function n(t){var o;return r(this,n),(o=e.call(this,t)).p=void 0,o.cleanUpListeners=function(){},o.formatUrls=function(t){var e=null,n=null,r=null;return function(o,i){if(r&&o===e&&i===n)return r;var c=t(o,i);return e=o,n=i,r=c,c}}((function(t,e){return{href:m(t),as:e?m(e):e}})),o.linkClicked=function(t){var e=t.currentTarget,n=e.nodeName,r=e.target;if("A"!==n||!(r&&"_self"!==r||t.metaKey||t.ctrlKey||t.shiftKey||t.nativeEvent&&2===t.nativeEvent.which)){var i=o.formatUrls(o.props.href,o.props.as),c=i.href,a=i.as;if(function(t){var e=(0,h.parse)(t,!1,!0),n=(0,h.parse)((0,v.getLocationOrigin)(),!1,!0);return!e.host||e.protocol===n.protocol&&e.host===n.host}(c)){var u=window.location.pathname;c=(0,h.resolve)(u,c),a=a?(0,h.resolve)(u,a):c,t.preventDefault();var s=o.props.scroll;null==s&&(s=a.indexOf("#")<0),d.default[o.props.replace?"replace":"push"](c,a,{shallow:o.props.shallow}).then((function(t){t&&s&&(window.scrollTo(0,0),document.body.focus())}))}}},o.p=!1!==t.prefetch,o}return o(n,[{key:"componentWillUnmount",value:function(){this.cleanUpListeners()}},{key:"getPaths",value:function(){var t=window.location.pathname,e=this.formatUrls(this.props.href,this.props.as),n=e.href,r=e.as,o=(0,h.resolve)(t,n);return[o,r?(0,h.resolve)(t,r):o]}},{key:"handleRef",value:function(t){var e=this;this.p&&w&&t&&t.tagName&&(this.cleanUpListeners(),b[this.getPaths().join("%")]||(this.cleanUpListeners=O(t,(function(){e.prefetch()}))))}},{key:"prefetch",value:function(t){if(this.p){var e=this.getPaths();d.default.prefetch(e[0],e[1],t).catch((function(t){0})),b[e.join("%")]=!0}}},{key:"render",value:function(){var t=this,e=this.props.children,n=this.formatUrls(this.props.href,this.props.as),r=n.href,o=n.as;o=o?(0,y.addBasePath)(o):o,r=(0,y.addBasePath)(r),"string"===typeof e&&(e=p.default.createElement("a",null,e));var i=p.Children.only(e),c={ref:function(e){t.handleRef(e),i&&"object"===typeof i&&i.ref&&("function"===typeof i.ref?i.ref(e):"object"===typeof i.ref&&(i.ref.current=e))},onMouseEnter:function(e){i.props&&"function"===typeof i.props.onMouseEnter&&i.props.onMouseEnter(e),t.prefetch({priority:!0})},onClick:function(e){i.props&&"function"===typeof i.props.onClick&&i.props.onClick(e),e.defaultPrevented||t.linkClicked(e)}};return!this.props.passHref&&("a"!==i.type||"href"in i.props)||(c.href=o||r),p.default.cloneElement(i,c)}}]),n}(p.Component);e.default=_},"iq+K":function(t,e,n){"use strict";var r=n("q1tI"),o=n.n(r).a.createElement,i=function(t){return console.log("MainLayout -> props",t.children),o("div",null,t.children)};e.a=i},msox:function(t,e,n){"use strict";function r(){return(r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}n.r(e),n.d(e,"__N_SSP",(function(){return l}));var o=n("q1tI"),i=n.n(o),c=i.a.createElement,a=function(t){return c("div",null,t.children)},u=n("nOHt"),s=n("91Zj"),f=i.a.createElement;var l=!0;e.default=function(t){var e=Object(u.useRouter)();return f(a,null,f("h1",null,"This is your edit layout"),f(s.default,r({},t,{route:"/".concat(e.query.page)})))}},t5bo:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/edit/[...page]",function(){return n("msox")}])}},[["t5bo",0,1,2]]]);