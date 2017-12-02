/**
 * skylark-bs-swt - The skylark bootstrap standard widget tookit
 * @author Hudaokeji, Inc.
 * @version v0.9.0-beta
 * @link https://github.com/skylarkui/skylark-bs-swt/
 * @license MIT
 */
define(["skylark-utils/langx","skylark-utils/browser","skylark-utils/eventer","skylark-utils/noder","skylark-utils/geom","skylark-utils/query","./sbswt"],function(t,a,e,n,i,s,r){"use strict";function d(t){return this.each(function(){var a=s(this),e=a.data("bs.tab");e||a.data("bs.tab",e=new l(this)),"string"==typeof t&&e[t]()})}var l=r.Tab=r.WidgetBase.inherit({klassName:"Tab",init:function(a,e){this.element=s(a),this.element.on("click.bs.tab.data-api",t.proxy(function(t){t.preventDefault(),this.show()},this))},show:function(){var t=this.element,a=t.closest("ul:not(.dropdown-menu)"),n=t.data("target");if(n||(n=t.attr("href"),n=n&&n.replace(/.*(?=#[^\s]*$)/,"")),!t.parent("li").hasClass("active")){var i=a.find(".active:last a"),r=e.create("hide.bs.tab",{relatedTarget:t[0]}),d=e.create("show.bs.tab",{relatedTarget:i[0]});if(i.trigger(r),t.trigger(d),!d.isDefaultPrevented()&&!r.isDefaultPrevented()){var l=s(n);this.activate(t.closest("li"),a),this.activate(l,l.parent(),function(){i.trigger({type:"hidden.bs.tab",relatedTarget:t[0]}),t.trigger({type:"shown.bs.tab",relatedTarget:i[0]})})}}},activate:function(t,e,n){function i(){s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),t.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),r?(t[0].offsetWidth,t.addClass("in")):t.removeClass("fade"),t.parent(".dropdown-menu").length&&t.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),n&&n()}var s=e.find("> .active"),r=n&&a.support.transition&&(s.length&&s.hasClass("fade")||!!e.find("> .fade").length);s.length&&r?s.one("bsTransitionEnd",i).emulateTransitionEnd(l.TRANSITION_DURATION):i(),s.removeClass("in")}});l.VERSION="3.3.7",l.TRANSITION_DURATION=150;var o=s.fn.tab;s.fn.tab=d,s.fn.tab.Constructor=l,s.fn.tab.noConflict=function(){return s.fn.tab=o,this}});
//# sourceMappingURL=sourcemaps/tab.js.map
