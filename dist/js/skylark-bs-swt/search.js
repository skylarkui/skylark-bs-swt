/**
 * skylark-bs-swt - The skylark bootstrap standard widget tookit
 * @author Hudaokeji, Inc.
 * @version v0.9.0-beta
 * @link https://github.com/skylarkui/skylark-bs-swt/
 * @license MIT
 */
define(["skylark-utils/langx","skylark-utils/browser","skylark-utils/eventer","skylark-utils/noder","skylark-utils/geom","skylark-utils/query"],function(e,t,s,i,a,n){var r=n.fn.search,h=function(t,s){this.$element=n(t),this.$repeater=n(t).closest(".repeater"),this.options=e.mixin({},n.fn.search.defaults,s),"true"===this.$element.attr("data-searchOnKeyPress")&&(this.options.searchOnKeyPress=!0),this.$button=this.$element.find("button"),this.$input=this.$element.find("input"),this.$icon=this.$element.find(".glyphicon, .fuelux-icon"),this.$button.on("click.fu.search",e.proxy(this.buttonclicked,this)),this.$input.on("keyup.fu.search",e.proxy(this.keypress,this)),this.$repeater.length>0&&this.$repeater.on("rendered.fu.repeater",e.proxy(this.clearPending,this)),this.activeSearch=""};h.prototype={constructor:h,destroy:function(){return this.$element.remove(),this.$element.find("input").each(function(){n(this).attr("value",n(this).val())}),this.$element[0].outerHTML},search:function(e){this.$icon.hasClass("glyphicon")&&this.$icon.removeClass("glyphicon-search").addClass("glyphicon-remove"),this.$icon.hasClass("fuelux-icon")&&this.$icon.removeClass("fuelux-icon-search").addClass("fuelux-icon-remove"),this.activeSearch=e,this.$element.addClass("searched pending"),this.$element.trigger("searched.fu.search",e)},clear:function(){this.$icon.hasClass("glyphicon")&&this.$icon.removeClass("glyphicon-remove").addClass("glyphicon-search"),this.$icon.hasClass("fuelux-icon")&&this.$icon.removeClass("fuelux-icon-remove").addClass("fuelux-icon-search"),this.$element.hasClass("pending")&&this.$element.trigger("canceled.fu.search"),this.activeSearch="",this.$input.val(""),this.$element.trigger("cleared.fu.search"),this.$element.removeClass("searched pending")},clearPending:function(){this.$element.removeClass("pending")},action:function(){var e=this.$input.val();e&&e.length>0?this.search(e):this.clear()},buttonclicked:function(e){e.preventDefault(),n(e.currentTarget).is(".disabled, :disabled")||(this.$element.hasClass("pending")||this.$element.hasClass("searched")?this.clear():this.action())},keypress:function(e){var t=13,s=9,i=27;e.which===t?(e.preventDefault(),this.action()):e.which===s?e.preventDefault():e.which===i?(e.preventDefault(),this.clear()):this.options.searchOnKeyPress&&this.action()},disable:function(){this.$element.addClass("disabled"),this.$input.attr("disabled","disabled"),this.options.allowCancel||this.$button.addClass("disabled")},enable:function(){this.$element.removeClass("disabled"),this.$input.removeAttr("disabled"),this.$button.removeClass("disabled")}},n.fn.search=function(e){var t,s=Array.prototype.slice.call(arguments,1),i=this.each(function(){var i=n(this),a=i.data("fu.search"),r="object"==typeof e&&e;a||i.data("fu.search",a=new h(this,r)),"string"==typeof e&&(t=a[e].apply(a,s))});return void 0===t?i:t},n.fn.search.defaults={clearOnEmpty:!1,searchOnKeyPress:!1,allowCancel:!1},n.fn.search.Constructor=h,n.fn.search.noConflict=function(){return n.fn.search=r,this},n(document).on("mousedown.fu.search.data-api","[data-initialize=search]",function(e){var t=n(e.target).closest(".search");t.data("fu.search")||t.search(t.data())}),n(function(){n("[data-initialize=search]").each(function(){var e=n(this);e.data("fu.search")||e.search(e.data())})})});
//# sourceMappingURL=sourcemaps/search.js.map