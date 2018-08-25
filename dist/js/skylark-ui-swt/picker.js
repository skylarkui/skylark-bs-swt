/**
 * skylark-ui-swt - The skylark standard widget tookit
 * @author Hudaokeji, Inc.
 * @version v0.9.2
 * @link https://github.com/skylarkui/skylark-ui-swt/
 * @license MIT
 */
define(["skylark-utils/langx","skylark-utils/browser","skylark-utils/eventer","skylark-utils/noder","skylark-utils/geom","skylark-utils/velm","skylark-utils/query","./sbswt"],function(e,t,i,n,s,r,c,o){var l=c.fn.picker,p=o.Picker=o.WidgetBase.inherit({klassName:"Picker",init:function(t,i){var n=this;this.$element=c(t),this.options=e.mixin({},c.fn.picker.defaults,i),this.$accept=this.$element.find(".picker-accept"),this.$cancel=this.$element.find(".picker-cancel"),this.$trigger=this.$element.find(".picker-trigger"),this.$footer=this.$element.find(".picker-footer"),this.$header=this.$element.find(".picker-header"),this.$popup=this.$element.find(".picker-popup"),this.$body=this.$element.find(".picker-body"),this.clickStamp="_",this.isInput=this.$trigger.is("input"),this.$trigger.on("keydown.fu.picker",e.proxy(this.keyComplete,this)),this.$trigger.on("focus.fu.picker",e.proxy(function(t){("undefined"==typeof t||c(t.target).is("input[type=text]"))&&e.proxy(this.show(),this)},this)),this.$trigger.on("click.fu.picker",e.proxy(function(t){c(t.target).is("input[type=text]")?e.proxy(this.show(),this):e.proxy(this.toggle(),this)},this)),this.$accept.on("click.fu.picker",e.proxy(this.complete,this,"accepted")),this.$cancel.on("click.fu.picker",function(e){e.preventDefault(),n.complete("cancelled")})},complete:function(e){var t={accepted:"onAccept",cancelled:"onCancel",exited:"onExit"},i=this.options[t[e]],n={contents:this.$body};i?(i(n),this.$element.trigger(e+".fu.picker",n)):(this.$element.trigger(e+".fu.picker",n),this.hide())},keyComplete:function(e){this.isInput&&13===e.keyCode?(this.complete("accepted"),this.$trigger.blur()):27===e.keyCode&&(this.complete("exited"),this.$trigger.blur())},destroy:function(){return this.$element.remove(),c(document).off("click.fu.picker.externalClick."+this.clickStamp),this.$element[0].outerHTML},disable:function(){this.$element.addClass("disabled"),this.$trigger.attr("disabled","disabled")},enable:function(){this.$element.removeClass("disabled"),this.$trigger.removeAttr("disabled")},toggle:function(){this.$element.hasClass("showing")?this.hide():this.show()},hide:function(){this.$element.hasClass("showing")&&(this.$element.removeClass("showing"),c(document).off("click.fu.picker.externalClick."+this.clickStamp),this.$element.trigger("hidden.fu.picker"))},externalClickListener:function(e,t){(t===!0||this.isExternalClick(e))&&this.complete("exited")},isExternalClick:function(e){var t,i,n=this.$element.get(0),s=this.options.externalClickExceptions||[],r=c(e.target);if(e.target===n||r.parents(".picker").get(0)===n)return!1;for(t=0,i=s.length;t<i;t++)if(r.is(s[t])||r.parents(s[t]).length>0)return!1;return!0},show:function(){var t;if(t=c(document).find(".picker.showing"),t.length>0){if(t.data("fu.picker")&&t.data("fu.picker").options.explicit)return;t.picker("externalClickListener",{},!0)}this.$element.addClass("showing"),a(this),this.$element.trigger("shown.fu.picker"),this.clickStamp=(new Date).getTime()+(Math.floor(100*Math.random())+1),this.options.explicit||c(document).on("click.fu.picker.externalClick."+this.clickStamp,e.proxy(this.externalClickListener,this))}}),h=function(e){var t=Math.max(document.documentElement.clientHeight,window.innerHeight||0),i=c(document).scrollTop(),n=e.$popup.offset(),s=n.top+e.$popup.outerHeight(!0);return s>t+i||n.top<i},a=function(e){e.$popup.css("visibility","hidden"),f(e),h(e)&&(u(e),h(e)&&f(e)),e.$popup.css("visibility","visible")},u=function(e){e.$popup.css("top",-e.$popup.outerHeight(!0)+"px")},f=function(e){e.$popup.css("top",e.$trigger.outerHeight(!0)+"px")};return c.fn.picker=function(e){var t,i=Array.prototype.slice.call(arguments,1),n=this.each(function(){var n=c(this),s=n.data("fu.picker"),r="object"==typeof e&&e;s||n.data("fu.picker",s=new p(this,r)),"string"==typeof e&&(t=s[e].apply(s,i))});return void 0===t?n:t},c.fn.picker.defaults={onAccept:void 0,onCancel:void 0,onExit:void 0,externalClickExceptions:[],explicit:!1},c.fn.picker.Constructor=p,c.fn.picker.noConflict=function(){return c.fn.picker=l,this},c.fn.picker});
//# sourceMappingURL=sourcemaps/picker.js.map
