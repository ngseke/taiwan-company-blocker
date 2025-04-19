"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[395],{3216:(e,t,n)=>{function r(e,t){var n=t&&t.cache?t.cache:i,r=t&&t.serializer?t.serializer:l;return(t&&t.strategy?t.strategy:function(e,t){var n,r,l=1===e.length?o:a;return n=t.cache.create(),r=t.serializer,l.bind(this,e,n,r)})(e,{cache:n,serializer:r})}function o(e,t,n,r){var o=null==r||"number"==typeof r||"boolean"==typeof r?r:n(r),a=t.get(o);return void 0===a&&(a=e.call(this,r),t.set(o,a)),a}function a(e,t,n){var r=Array.prototype.slice.call(arguments,3),o=n(r),a=t.get(o);return void 0===a&&(a=e.apply(this,r),t.set(o,a)),a}n.r(t),n.d(t,{memoize:()=>r,strategies:()=>c});var l=function(){return JSON.stringify(arguments)},u=function(){function e(){this.cache=Object.create(null)}return e.prototype.get=function(e){return this.cache[e]},e.prototype.set=function(e,t){this.cache[e]=t},e}(),i={create:function(){return new u}},c={variadic:function(e,t){var n,r;return n=t.cache.create(),r=t.serializer,a.bind(this,e,n,r)},monadic:function(e,t){var n,r;return n=t.cache.create(),r=t.serializer,o.bind(this,e,n,r)}}},3896:(e,t,n)=>{n.d(t,{_:()=>r});function r(){return(r=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(null,arguments)}},866:(e,t,n)=>{n.d(t,{default:()=>c});var r=n(3896),o=n(351),a=n.n(o),l=n(2992),u=n(5073),i=n(6028),c=(0,u.forwardRef)(function(e,t){let{defaultLocale:n,href:o,locale:c,localeCookie:s,onClick:f,prefetch:d,unprefixed:p,...h}=e,m=(0,i.A)(),g=null!=c&&c!==m,y=c||m,b=function(){let[e,t]=(0,u.useState)();return(0,u.useEffect)(()=>{t(window.location.host)},[]),e}(),v=b&&p&&(p.domains[b]===y||!Object.keys(p.domains).includes(b)&&m===n&&!c)?p.pathname:o,P=(0,l.usePathname)();return g&&(d&&console.error("The `prefetch` prop is currently not supported when using the `locale` prop on `Link` to switch the locale.`"),d=!1),u.createElement(a(),(0,r._)({ref:t,href:v,hrefLang:g?c:void 0,onClick:function(e){(function(e,t,n,r){if(!e||!(r!==n&&null!=r)||!t)return;let o=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window.location.pathname;return"/"===e?t:t.replace(e,"")}(t),{name:a,...l}=e;l.path||(l.path=""!==o?o:"/");let u="".concat(a,"=").concat(r,";");for(let[e,t]of Object.entries(l))u+="".concat("maxAge"===e?"max-age":e),"boolean"!=typeof t&&(u+="="+t),u+=";";document.cookie=u})(s,P,m,c),f&&f(e)},prefetch:d},h))})},5564:(e,t,n)=>{n.d(t,{default:()=>f});var r=n(3896),o=n(2992),a=n(5073),l=n(6028);function u(e){return("object"==typeof e?null==e.host&&null==e.hostname:!/^[a-z]+:/i.test(e))&&!function(e){let t="object"==typeof e?e.pathname:e;return null!=t&&!t.startsWith("/")}(e)}function i(e,t){let n;return"string"==typeof e?n=c(t,e):(n={...e},e.pathname&&(n.pathname=c(t,e.pathname))),n}function c(e,t){let n=e;return/^\/(\?.*)?$/.test(t)&&(t=t.slice(1)),n+=t}n(3884);var s=n(866);let f=(0,a.forwardRef)(function(e,t){let{href:n,locale:c,localeCookie:f,localePrefixMode:d,prefix:p,...h}=e,m=(0,o.usePathname)(),g=(0,l.A)(),y=c!==g,[b,v]=(0,a.useState)(()=>u(n)&&("never"!==d||y)?i(n,p):n);return(0,a.useEffect)(()=>{m&&v(function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:t,r=arguments.length>3?arguments[3]:void 0,o=arguments.length>4?arguments[4]:void 0;if(!u(e))return e;let a=r===o||r.startsWith("".concat(o,"/"));return(t!==n||a)&&null!=o?i(e,o):e}(n,c,g,m,p))},[g,n,c,m,p]),a.createElement(s.default,(0,r._)({ref:t,href:b,locale:c,localeCookie:f},h))});f.displayName="ClientLink"},6028:(e,t,n)=>{n.d(t,{A:()=>u});var r=n(2992),o=n(7584);let a="locale",l=!1;function u(){let e;let t=(0,r.useParams)();try{e=(0,o.Y)()}catch(n){if("string"!=typeof(null==t?void 0:t[a]))throw n;l||(console.warn("Deprecation warning: `useLocale` has returned a default from `useParams().locale` since no `NextIntlClientProvider` ancestor was found for the calling component. This behavior will be removed in the next major version. Please ensure all Client Components that use `next-intl` are wrapped in a `NextIntlClientProvider`."),l=!0),e=t[a]}return e}},9612:(e,t,n)=>{n.d(t,{default:()=>l});var r=n(3896),o=n(5073),a=n(3393);function l(e){let{locale:t,...n}=e;if(!t)throw Error("Failed to determine locale in `NextIntlClientProvider`, please provide the `locale` prop explicitly.\n\nSee https://next-intl.dev/docs/configuration#locale");return o.createElement(a.D,(0,r._)({locale:t},n))}},2992:(e,t,n)=>{var r=n(368);n.o(r,"useParams")&&n.d(t,{useParams:function(){return r.useParams}}),n.o(r,"usePathname")&&n.d(t,{usePathname:function(){return r.usePathname}})},351:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return m}});let r=n(4918),o=n(3285),a=r._(n(5073)),l=n(3898),u=n(132),i=n(9642),c=n(8627),s=n(8887),f=n(2276),d=n(462);function p(e,t,n){"undefined"!=typeof window&&(async()=>e.prefetch(t,n))().catch(e=>{})}function h(e){return"string"==typeof e?e:(0,l.formatUrl)(e)}n(225);let m=a.default.forwardRef(function(e,t){let n,r;let{href:l,as:m,children:g,prefetch:y=null,passHref:b,replace:v,shallow:P,scroll:C,onClick:E,onMouseEnter:w,onTouchStart:j,legacyBehavior:_=!1,...k}=e;n=g,_&&("string"==typeof n||"number"==typeof n)&&(n=(0,o.jsx)("a",{children:n}));let O=a.default.useContext(u.AppRouterContext),x=!1!==y,M=null===y?c.PrefetchKind.AUTO:c.PrefetchKind.FULL,{href:I,as:T}=a.default.useMemo(()=>{let e=h(l);return{href:e,as:m?h(m):e}},[l,m]),N=a.default.useRef(I),F=a.default.useRef(T);_&&(r=a.default.Children.only(n));let R=_?r&&"object"==typeof r&&r.ref:t,[A,S,L]=(0,i.useIntersection)({rootMargin:"200px"}),z=a.default.useCallback(e=>{(F.current!==T||N.current!==I)&&(L(),F.current=T,N.current=I),A(e)},[T,I,L,A]),D=(0,s.useMergedRef)(z,R);a.default.useEffect(()=>{O&&S&&x&&p(O,I,{kind:M})},[T,I,S,x,O,M]);let U={ref:D,onClick(e){_||"function"!=typeof E||E(e),_&&r.props&&"function"==typeof r.props.onClick&&r.props.onClick(e),O&&!e.defaultPrevented&&function(e,t,n,r,o,l,u){let{nodeName:i}=e.currentTarget;"A"===i.toUpperCase()&&function(e){let t=e.currentTarget.getAttribute("target");return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||(e.preventDefault(),a.default.startTransition(()=>{let e=null==u||u;"beforePopState"in t?t[o?"replace":"push"](n,r,{shallow:l,scroll:e}):t[o?"replace":"push"](r||n,{scroll:e})}))}(e,O,I,T,v,P,C)},onMouseEnter(e){_||"function"!=typeof w||w(e),_&&r.props&&"function"==typeof r.props.onMouseEnter&&r.props.onMouseEnter(e),O&&x&&p(O,I,{kind:M})},onTouchStart:function(e){_||"function"!=typeof j||j(e),_&&r.props&&"function"==typeof r.props.onTouchStart&&r.props.onTouchStart(e),O&&x&&p(O,I,{kind:M})}};return(0,f.isAbsoluteUrl)(T)?U.href=T:_&&!b&&("a"!==r.type||"href"in r.props)||(U.href=(0,d.addBasePath)(T)),_?a.default.cloneElement(r,U):(0,o.jsx)("a",{...k,...U,children:n})});("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},6065:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{cancelIdleCallback:function(){return r},requestIdleCallback:function(){return n}});let n="undefined"!=typeof self&&self.requestIdleCallback&&self.requestIdleCallback.bind(window)||function(e){let t=Date.now();return self.setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-t))}})},1)},r="undefined"!=typeof self&&self.cancelIdleCallback&&self.cancelIdleCallback.bind(window)||function(e){return clearTimeout(e)};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9642:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useIntersection",{enumerable:!0,get:function(){return i}});let r=n(5073),o=n(6065),a="function"==typeof IntersectionObserver,l=new Map,u=[];function i(e){let{rootRef:t,rootMargin:n,disabled:i}=e,c=i||!a,[s,f]=(0,r.useState)(!1),d=(0,r.useRef)(null),p=(0,r.useCallback)(e=>{d.current=e},[]);return(0,r.useEffect)(()=>{if(a){if(c||s)return;let e=d.current;if(e&&e.tagName)return function(e,t,n){let{id:r,observer:o,elements:a}=function(e){let t;let n={root:e.root||null,margin:e.rootMargin||""},r=u.find(e=>e.root===n.root&&e.margin===n.margin);if(r&&(t=l.get(r)))return t;let o=new Map;return t={id:n,observer:new IntersectionObserver(e=>{e.forEach(e=>{let t=o.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)})},e),elements:o},u.push(n),l.set(n,t),t}(n);return a.set(e,t),o.observe(e),function(){if(a.delete(e),o.unobserve(e),0===a.size){o.disconnect(),l.delete(r);let e=u.findIndex(e=>e.root===r.root&&e.margin===r.margin);e>-1&&u.splice(e,1)}}}(e,e=>e&&f(e),{root:null==t?void 0:t.current,rootMargin:n})}else if(!s){let e=(0,o.requestIdleCallback)(()=>f(!0));return()=>(0,o.cancelIdleCallback)(e)}},[c,n,t,s,d.current]),[p,s,(0,r.useCallback)(()=>{f(!1)},[])]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8887:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useMergedRef",{enumerable:!0,get:function(){return o}});let r=n(5073);function o(e,t){let n=(0,r.useRef)(()=>{}),o=(0,r.useRef)(()=>{});return(0,r.useMemo)(()=>e&&t?r=>{null===r?(n.current(),o.current()):(n.current=a(e,r),o.current=a(t,r))}:e||t,[e,t])}function a(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let n=e(t);return"function"==typeof n?n:()=>e(null)}}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},3898:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{formatUrl:function(){return a},formatWithValidation:function(){return u},urlObjectKeys:function(){return l}});let r=n(6399)._(n(7954)),o=/https?|ftp|gopher|file/;function a(e){let{auth:t,hostname:n}=e,a=e.protocol||"",l=e.pathname||"",u=e.hash||"",i=e.query||"",c=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?c=t+e.host:n&&(c=t+(~n.indexOf(":")?"["+n+"]":n),e.port&&(c+=":"+e.port)),i&&"object"==typeof i&&(i=String(r.urlQueryToSearchParams(i)));let s=e.search||i&&"?"+i||"";return a&&!a.endsWith(":")&&(a+=":"),e.slashes||(!a||o.test(a))&&!1!==c?(c="//"+(c||""),l&&"/"!==l[0]&&(l="/"+l)):c||(c=""),u&&"#"!==u[0]&&(u="#"+u),s&&"?"!==s[0]&&(s="?"+s),""+a+c+(l=l.replace(/[?#]/g,encodeURIComponent))+(s=s.replace("#","%23"))+u}let l=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function u(e){return a(e)}},7954:(e,t)=>{function n(e){let t={};return e.forEach((e,n)=>{void 0===t[n]?t[n]=e:Array.isArray(t[n])?t[n].push(e):t[n]=[t[n],e]}),t}function r(e){return"string"!=typeof e&&("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function o(e){let t=new URLSearchParams;return Object.entries(e).forEach(e=>{let[n,o]=e;Array.isArray(o)?o.forEach(e=>t.append(n,r(e))):t.set(n,r(o))}),t}function a(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return n.forEach(t=>{Array.from(t.keys()).forEach(t=>e.delete(t)),t.forEach((t,n)=>e.append(n,t))}),e}Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{assign:function(){return a},searchParamsToUrlQuery:function(){return n},urlQueryToSearchParams:function(){return o}})},2276:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{DecodeError:function(){return h},MiddlewareNotFoundError:function(){return b},MissingStaticPage:function(){return y},NormalizeError:function(){return m},PageNotFoundError:function(){return g},SP:function(){return d},ST:function(){return p},WEB_VITALS:function(){return n},execOnce:function(){return r},getDisplayName:function(){return i},getLocationOrigin:function(){return l},getURL:function(){return u},isAbsoluteUrl:function(){return a},isResSent:function(){return c},loadGetInitialProps:function(){return f},normalizeRepeatedSlashes:function(){return s},stringifyError:function(){return v}});let n=["CLS","FCP","FID","INP","LCP","TTFB"];function r(e){let t,n=!1;return function(){for(var r=arguments.length,o=Array(r),a=0;a<r;a++)o[a]=arguments[a];return n||(n=!0,t=e(...o)),t}}let o=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,a=e=>o.test(e);function l(){let{protocol:e,hostname:t,port:n}=window.location;return e+"//"+t+(n?":"+n:"")}function u(){let{href:e}=window.location,t=l();return e.substring(t.length)}function i(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function c(e){return e.finished||e.headersSent}function s(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?"?"+t.slice(1).join("?"):"")}async function f(e,t){let n=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await f(t.Component,t.ctx)}:{};let r=await e.getInitialProps(t);if(n&&c(n))return r;if(!r)throw Error('"'+i(e)+'.getInitialProps()" should resolve to an object. But found "'+r+'" instead.');return r}let d="undefined"!=typeof performance,p=d&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class h extends Error{}class m extends Error{}class g extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message="Cannot find module for page: "+e}}class y extends Error{constructor(e,t){super(),this.message="Failed to load static file for page: "+e+" "+t}}class b extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function v(e){return JSON.stringify({message:e.message,stack:e.stack})}},3438:(e,t,n)=>{let r=n(5073).createContext(void 0);t.IntlContext=r},3393:(e,t,n)=>{var r=n(5073),o=n(1249),a=n(3438);n(3216);var l=function(e){return e&&e.__esModule?e:{default:e}}(r);t.D=function(e){let{children:t,defaultTranslationValues:n,formats:u,getMessageFallback:i,locale:c,messages:s,now:f,onError:d,timeZone:p}=e,h=r.useMemo(()=>o.createCache(),[c]),m=r.useMemo(()=>o.createIntlFormatters(h),[h]),g=r.useMemo(()=>({...o.initializeConfig({locale:c,defaultTranslationValues:n,formats:u,getMessageFallback:i,messages:s,now:f,onError:d,timeZone:p}),formatters:m,cache:h}),[h,n,u,m,i,c,s,f,d,p]);return l.default.createElement(a.IntlContext.Provider,{value:g},t)}},6889:(e,t,n)=>{var r=n(5073),o=n(3438);function a(){let e=r.useContext(o.IntlContext);if(!e)throw Error(void 0);return e}t.useIntlContext=a,t.useLocale=function(){return a().locale}},7584:(e,t,n)=>{var r=n(6889);n(5073),n(3438),t.Y=r.useLocale},1249:(e,t,n)=>{var r=n(3216);function o(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter(Boolean).join(".")}function a(e){return o(e.namespace,e.key)}function l(e){console.error(e)}function u(e,t){return r.memoize(e,{cache:{create:()=>({get:e=>t[e],set(e,n){t[e]=n}})},strategy:r.strategies.variadic})}function i(e,t){return u(function(){for(var t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];return new e(...n)},t)}t.createCache=function(){return{dateTime:{},number:{},message:{},relativeTime:{},pluralRules:{},list:{},displayNames:{}}},t.createIntlFormatters=function(e){return{getDateTimeFormat:i(Intl.DateTimeFormat,e.dateTime),getNumberFormat:i(Intl.NumberFormat,e.number),getPluralRules:i(Intl.PluralRules,e.pluralRules),getRelativeTimeFormat:i(Intl.RelativeTimeFormat,e.relativeTime),getListFormat:i(Intl.ListFormat,e.list),getDisplayNames:i(Intl.DisplayNames,e.displayNames)}},t.defaultGetMessageFallback=a,t.defaultOnError=l,t.initializeConfig=function(e){let{getMessageFallback:t,messages:n,onError:r,...o}=e;return{...o,messages:n,onError:r||l,getMessageFallback:t||a}},t.joinPath=o,t.memoFn=u}}]);