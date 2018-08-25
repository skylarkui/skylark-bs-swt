/**
 * skylark-ui-swt - The skylark standard widget tookit
 * @author Hudaokeji, Inc.
 * @version v0.9.2
 * @link https://github.com/skylarkui/skylark-ui-swt/
 * @license MIT
 */
define(["skylark-utils/langx","skylark-utils/browser","skylark-utils/eventer","skylark-utils/noder","skylark-utils/geom","skylark-utils/velm","skylark-utils/query","./sbswt"],function(e,t,i,s,n,o,l,h){var r=l.fn.combobox,d=h.Combobox=h.WidgetBase.inherit({klassName:"Combobox",init:function(t,i){this.$element=l(t),this.options=e.mixin({},l.fn.combobox.defaults,i),this.$dropMenu=this.$element.find(".dropdown-menu"),this.$input=this.$element.find("input"),this.$button=this.$element.find(".btn"),this.$button.dropdown(),this.$inputGroupBtn=this.$element.find(".input-group-btn"),this.$element.on("click.fu.combobox","a",e.proxy(this.itemclicked,this)),this.$element.on("change.fu.combobox","input",e.proxy(this.inputchanged,this)),this.$element.on("shown.bs.dropdown",e.proxy(this.menuShown,this)),this.$input.on("keyup.fu.combobox",e.proxy(this.keypress,this)),this.setDefaultSelection();var s=this.$dropMenu.children("li");0===s.length&&this.$button.addClass("disabled"),this.options.filterOnKeypress&&this.options.filter(this.$dropMenu.find("li"),this.$input.val(),this)},destroy:function(){return this.$element.remove(),this.$element.find("input").each(function(){l(this).attr("value",l(this).val())}),this.$element[0].outerHTML},doSelect:function(e){"undefined"!=typeof e[0]?(this.$element.find("li.selected:first").removeClass("selected"),this.$selectedItem=e,this.$selectedItem.addClass("selected"),this.$input.val(this.$selectedItem.text().trim())):(this.$selectedItem=null,this.$element.find("li.selected:first").removeClass("selected"))},clearSelection:function(){this.$selectedItem=null,this.$input.val(""),this.$dropMenu.find("li").removeClass("selected")},menuShown:function(){this.options.autoResizeMenu&&this.resizeMenu()},resizeMenu:function(){var e=this.$element.outerWidth();this.$dropMenu.outerWidth(e)},selectedItem:function(){var t=this.$selectedItem,i={};if(t){var s=this.$selectedItem.text().trim();i=e.mixin({text:s},this.$selectedItem.data())}else i={text:this.$input.val().trim(),notFound:!0};return i},selectByText:function(e){var t=l([]);this.$element.find("li").each(function(){if((this.textContent||this.innerText||l(this).text()||"").trim().toLowerCase()===(e||"").trim().toLowerCase())return t=l(this),!1}),this.doSelect(t)},selectByValue:function(e){var t='li[data-value="'+e+'"]';this.selectBySelector(t)},selectByIndex:function(e){var t="li:eq("+e+")";this.selectBySelector(t)},selectBySelector:function(e){var t=this.$element.find(e);this.doSelect(t)},setDefaultSelection:function(){var e="li[data-selected=true]:first",t=this.$element.find(e);t.length>0&&(this.selectBySelector(e),t.removeData("selected"),t.removeAttr("data-selected"))},enable:function(){this.$element.removeClass("disabled"),this.$input.removeAttr("disabled"),this.$button.removeClass("disabled")},disable:function(){this.$element.addClass("disabled"),this.$input.attr("disabled",!0),this.$button.addClass("disabled")},itemclicked:function(e){this.$selectedItem=l(e.target).parent(),this.$input.val(this.$selectedItem.text().trim()).trigger("change",{synthetic:!0});var t=this.selectedItem();this.$element.trigger("changed.fu.combobox",t),e.preventDefault(),this.$element.find(".dropdown-toggle").focus()},keypress:function(e){var t=13,i=27,s=37,n=38,o=39,l=40,h=e.which===n||e.which===l||e.which===s||e.which===o;if(this.options.showOptionsOnKeypress&&!this.$inputGroupBtn.hasClass("open")&&(this.$button.dropdown("toggle"),this.$input.focus()),e.which===t){e.preventDefault();var r=this.$dropMenu.find("li.selected").text().trim();r.length>0?this.selectByText(r):this.selectByText(this.$input.val()),this.$inputGroupBtn.removeClass("open")}else if(e.which===i)e.preventDefault(),this.clearSelection(),this.$inputGroupBtn.removeClass("open");else if(this.options.showOptionsOnKeypress&&(e.which===l||e.which===n)){e.preventDefault();var d=this.$dropMenu.find("li.selected");d.length>0&&(d=e.which===l?d.next(":not(.hidden)"):d.prev(":not(.hidden)")),0===d.length&&(d=e.which===l?this.$dropMenu.find("li:not(.hidden):first"):this.$dropMenu.find("li:not(.hidden):last")),this.doSelect(d)}this.options.filterOnKeypress&&!h&&this.options.filter(this.$dropMenu.find("li"),this.$input.val(),this),this.previousKeyPress=e.which},inputchanged:function(e,t){var i=l(e.target).val();if(t&&t.synthetic)return void this.selectByText(i);this.selectByText(i);var s=this.selectedItem();0===s.text.length&&(s={text:i}),this.$element.trigger("changed.fu.combobox",s)}});return d.prototype.getValue=d.prototype.selectedItem,l.fn.combobox=function(e){var t,i=Array.prototype.slice.call(arguments,1),s=this.each(function(){var s=l(this),n=s.data("fu.combobox"),o="object"==typeof e&&e;n||s.data("fu.combobox",n=new d(this,o)),"string"==typeof e&&(t=n[e].apply(n,i))});return void 0===t?s:t},l.fn.combobox.defaults={autoResizeMenu:!0,filterOnKeypress:!1,showOptionsOnKeypress:!1,filter:function(e,t,i){var s=0;i.$dropMenu.find(".empty-indicator").remove(),e.each(function(e){var i=l(this),n=l(this).text().trim();i.removeClass(),n===t?(i.addClass("text-success"),s++):n.substr(0,t.length)===t?(i.addClass("text-info"),s++):i.addClass("hidden")}),0===s&&i.$dropMenu.append('<li class="empty-indicator text-muted"><em>No Matches</em></li>')}},l.fn.combobox.Constructor=d,l.fn.combobox.noConflict=function(){return l.fn.combobox=r,this},l.fn.combobox});
//# sourceMappingURL=sourcemaps/combobox.js.map
