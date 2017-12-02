/**
 * skylark-bs-swt - The skylark bootstrap standard widget tookit
 * @author Hudaokeji, Inc.
 * @version v0.9.0-beta
 * @link https://github.com/skylarkui/skylark-bs-swt/
 * @license MIT
 */
define(["skylark-utils/browser","skylark-utils/langx","skylark-utils/eventer","skylark-utils/query","./sbswt","./tooltip"],function(t,o,e,n,r,i){"use strict";function s(t){return this.each(function(){var o=n(this),e=o.data("bs.popover"),r="object"==typeof t&&t;!e&&/destroy|hide/.test(t)||(e||o.data("bs.popover",e=new p(this,r)),"string"==typeof t&&e[t]())})}var p=r.Popover=i.Constructor.inherit({klassName:"Popover",getDefaults:function(){return p.DEFAULTS},setContent:function(){var t=this.tip(),o=this.getTitle(),e=this.getContent();t.find(".popover-title")[this.options.html?"html":"text"](o),t.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof e?"html":"append":"text"](e),t.removeClass("fade top bottom left right in"),t.find(".popover-title").html()||t.find(".popover-title").hide()},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var t=this.$element,o=this.options;return t.attr("data-content")||("function"==typeof o.content?o.content.call(t[0]):o.content)},arrow:function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")}});p.VERSION="3.3.7",p.DEFAULTS=o.mixin({},n.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'});var l=n.fn.popover;return n.fn.popover=s,n.fn.popover.Constructor=p,n.fn.popover.noConflict=function(){return n.fn.popover=l,this},n.fn.popover});
//# sourceMappingURL=sourcemaps/popover.js.map
