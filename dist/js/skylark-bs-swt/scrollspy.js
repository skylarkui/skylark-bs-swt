/**
 * skylark-bs-swt - The skylark bootstrap standard widget tookit
 * @author Hudaokeji, Inc.
 * @version v0.9.0-beta
 * @link https://github.com/skylarkui/skylark-bs-swt/
 * @license MIT
 */
define(["skylark-utils/langx","skylark-utils/browser","skylark-utils/eventer","skylark-utils/noder","skylark-utils/geom","skylark-utils/query","./sbswt"],function(t,s,e,i,r,l,o){"use strict";var n=o.ScrollSpy=o.WidgetBase.inherit({klassName:"ScrollSpy",init:function(s,e){this.$body=l(document.body),this.$scrollElement=l(l(s).is(document.body)?window:s),this.options=t.mixin({},n.DEFAULTS,e),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",t.proxy(this.process,this)),this.refresh(),this.process()},getScrollHeight:function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},refresh:function(){var s=this,e="offset",i=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),t.isWindow(this.$scrollElement[0])||(e="position",i=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var t=l(this),s=t.data("target")||t.attr("href"),r=/^#./.test(s)&&l(s);return r&&r.length&&r.is(":visible")&&[[r[e]().top+i,s]]||null}).sort(function(t,s){return t[0]-s[0]}).each(function(){s.offsets.push(this[0]),s.targets.push(this[1])})},process:function(){var t,s=this.$scrollElement.scrollTop()+this.options.offset,e=this.getScrollHeight(),i=this.options.offset+e-this.$scrollElement.height(),r=this.offsets,l=this.targets,o=this.activeTarget;if(this.scrollHeight!=e&&this.refresh(),s>=i)return o!=(t=l[l.length-1])&&this.activate(t);if(o&&s<r[0])return this.activeTarget=null,this.clear();for(t=r.length;t--;)o!=l[t]&&s>=r[t]&&(void 0===r[t+1]||s<r[t+1])&&this.activate(l[t])},activate:function(t){this.activeTarget=t,this.clear();var s=this.selector+'[data-target="'+t+'"],'+this.selector+'[href="'+t+'"]',e=l(s).parents("li").addClass("active");e.parent(".dropdown-menu").length&&(e=e.closest("li.dropdown").addClass("active")),e.trigger("activate.bs.scrollspy")},clear:function(){l(this.selector).parentsUntil(this.options.target,".active").removeClass("active")}});n.VERSION="3.3.7",n.DEFAULTS={offset:10};var c=l.fn.scrollspy;return l.fn.scrollspy=function(t){return this.each(function(){var s=l(this),e=s.data("bs.scrollspy"),i="object"==typeof t&&t;e||s.data("bs.scrollspy",e=new n(this,i)),"string"==typeof t&&e[t]()})},l.fn.scrollspy.Constructor=n,l.fn.scrollspy.noConflict=function(){return l.fn.scrollspy=c,this},l.fn.scrollspy});
//# sourceMappingURL=sourcemaps/scrollspy.js.map
