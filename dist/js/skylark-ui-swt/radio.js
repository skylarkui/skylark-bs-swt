/**
 * skylark-ui-swt - The skylark standard widget tookit
 * @author Hudaokeji, Inc.
 * @version v0.9.2
 * @link https://github.com/skylarkui/skylark-ui-swt/
 * @license MIT
 */
define(["skylark-utils/langx","skylark-utils/browser","skylark-utils/eventer","skylark-utils/noder","skylark-utils/geom","skylark-utils/velm","skylark-utils/query","./sbswt"],function(e,t,i,a,r,o,s,n){var d=s.fn.radio,l=function(e){window&&window.console&&window.console.error&&window.console.error(e)},h=n.Radio=n.WidgetBase.inherit({klassName:"Radio",init:function(t,i){if(this.options=e.mixin({},s.fn.radio.defaults,i),"label"!==t.tagName.toLowerCase())return void l("Radio must be initialized on the `label` that wraps the `input` element. See https://github.com/ExactTarget/fuelux/blob/master/reference/markup/radio.html for example of proper markup. Call `.radio()` on the `<label>` not the `<input>`");this.$label=s(t),this.$radio=this.$label.find('input[type="radio"]'),this.groupName=this.$radio.attr("name"),!this.options.ignoreVisibilityCheck&&this.$radio.css("visibility").match(/hidden|collapse/)&&l("For accessibility reasons, in order for tab and space to function on radio, `visibility` must not be set to `hidden` or `collapse`. See https://github.com/ExactTarget/fuelux/pull/1996 for more details.");var a=this.$radio.attr("data-toggle");this.$toggleContainer=s(a),this.$radio.on("change",e.proxy(this.itemchecked,this)),this.setInitialState()},setInitialState:function(){var e=this.$radio,t=e.prop("checked"),i=e.prop("disabled");this.setCheckedState(e,t),this.setDisabledState(e,i)},resetGroup:function(){var e=s('input[name="'+this.groupName+'"]');e.each(function(e,t){var i=s(t),a=i.parent(),r=i.attr("data-toggle"),o=s(r);a.removeClass("checked"),o.addClass("hidden")})},setCheckedState:function(e,t){var i=e,a=i.parent(),r=i.attr("data-toggle"),o=s(r);t?(this.resetGroup(),i.prop("checked",!0),a.addClass("checked"),o.removeClass("hide hidden"),a.trigger("checked.fu.radio")):(i.prop("checked",!1),a.removeClass("checked"),o.addClass("hidden"),a.trigger("unchecked.fu.radio")),a.trigger("changed.fu.radio",t)},setDisabledState:function(e,t){var i=s(e),a=this.$label;return t?(i.prop("disabled",!0),a.addClass("disabled"),a.trigger("disabled.fu.radio")):(i.prop("disabled",!1),a.removeClass("disabled"),a.trigger("enabled.fu.radio")),i},itemchecked:function(e){var t=s(e.target);this.setCheckedState(t,!0)},check:function(){this.setCheckedState(this.$radio,!0)},uncheck:function(){this.setCheckedState(this.$radio,!1)},isChecked:function(){var e=this.$radio.prop("checked");return e},enable:function(){this.setDisabledState(this.$radio,!1)},disable:function(){this.setDisabledState(this.$radio,!0)},destroy:function(){return this.$label.remove(),this.$label[0].outerHTML}});return h.prototype.getValue=h.prototype.isChecked,s.fn.radio=function(e){var t,i=Array.prototype.slice.call(arguments,1),a=this.each(function(){var a=s(this),r=a.data("fu.radio"),o="object"==typeof e&&e;r||a.data("fu.radio",r=new h(this,o)),"string"==typeof e&&(t=r[e].apply(r,i))});return void 0===t?a:t},s.fn.radio.defaults={ignoreVisibilityCheck:!1},s.fn.radio.Constructor=h,s.fn.radio.noConflict=function(){return s.fn.radio=d,this},s.fn.radio});
//# sourceMappingURL=sourcemaps/radio.js.map
