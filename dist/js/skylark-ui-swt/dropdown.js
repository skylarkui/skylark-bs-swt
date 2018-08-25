/**
 * skylark-ui-swt - The skylark standard widget tookit
 * @author Hudaokeji, Inc.
 * @version v0.9.2
 * @link https://github.com/skylarkui/skylark-ui-swt/
 * @license MIT
 */
define(["skylark-utils/langx","skylark-utils/browser","skylark-utils/eventer","skylark-utils/noder","skylark-utils/geom","skylark-utils/velm","skylark-utils/query","./sbswt"],function(t,e,r,n,o,a,i,d){"use strict";function s(t){var e=t.attr("data-target");e||(e=t.attr("href"),e=e&&/#[A-Za-z]/.test(e)&&e.replace(/.*(?=#[^\s]*$)/,""));var r=e&&i(e);return r&&r.length?r:t.parent()}function l(t){t&&3===t.which||(i(p).remove(),i(g).each(function(){var e=i(this),o=s(e),a={relatedTarget:this};o.hasClass("open")&&(t&&"click"==t.type&&/input|textarea/i.test(t.target.tagName)&&n.contains(o[0],t.target)||(o.trigger(t=r.create("hide.bs.dropdown",a)),t.isDefaultPrevented()||(e.attr("aria-expanded","false"),o.removeClass("open").trigger(r.create("hidden.bs.dropdown",a)))))}))}function c(t){return this.each(function(){var e=i(this),r=e.data("bs.dropdown");r||e.data("bs.dropdown",r=new u(this)),"string"==typeof t&&r[t].call(e)})}var p=".dropdown-backdrop",g='[data-toggle="dropdown"]',u=d.Dropdown=d.WidgetBase.inherit({klassName:"Dropdown",init:function(t,e){var r=this.$element=i(t);r.on("click.bs.dropdown",this.toggle),r.on("keydown.bs.dropdown",'[data-toggle="dropdown"],.dropdown-menu',this.keydown)},toggle:function(t){var e=i(this);if(!e.is(".disabled, :disabled")){var n=s(e),o=n.hasClass("open");if(l(),!o){"ontouchstart"in document.documentElement&&!n.closest(".navbar-nav").length&&i(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(i(this)).on("click",l);var a={relatedTarget:this};if(n.trigger(t=r.create("show.bs.dropdown",a)),t.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),n.toggleClass("open").trigger(r.create("shown.bs.dropdown",a))}return!1}},keydown:function(t){if(/(38|40|27|32)/.test(t.which)&&!/input|textarea/i.test(t.target.tagName)){var e=i(this);if(t.preventDefault(),t.stopPropagation(),!e.is(".disabled, :disabled")){var r=s(e),n=r.hasClass("open");if(!n&&27!=t.which||n&&27==t.which)return 27==t.which&&r.find(g).trigger("focus"),e.trigger("click");var o=" li:not(.disabled):visible a",a=r.find(".dropdown-menu"+o);if(a.length){var d=a.index(t.target);38==t.which&&d>0&&d--,40==t.which&&d<a.length-1&&d++,~d||(d=0),a.eq(d).trigger("focus")}}}}});u.VERSION="3.3.7";var h=i.fn.dropdown;return i.fn.dropdown=c,i.fn.dropdown.Constructor=u,i.fn.dropdown.noConflict=function(){return i.fn.dropdown=h,this},i(document).on("click.bs.dropdown.data-api",l).on("click.bs.dropdown.data-api",".dropdown form",function(t){t.stopPropagation()}),i.fn.dropdown});
//# sourceMappingURL=sourcemaps/dropdown.js.map
