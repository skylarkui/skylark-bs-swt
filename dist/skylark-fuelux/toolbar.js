/**
 * skylark-fuelux - A version of fuelux that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.2
 * @link https://github.com/skylarkui/skylark-fuelux/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/browser","skylark-utils-dom/eventer","skylark-utils-dom/noder","skylark-utils-dom/geom","skylark-utils-dom/elmx","skylark-utils-dom/query","./fuelux"],function(t,n,e,a,i,o,p,r){var s=r.Toolbar=r.WidgetBase.inherit({klassName:"Toolbar",init:function(n,e){this._options=t.mixin({autoredraw:!0,buttons:{},context:{},list:[],show:!0},e),this.$container=p('<nav class="navbar"/>'),this.$el=p(n).append(this.$container),this.$container.on("mousedown.bs.dropdown.data-api",'[data-toggle="dropdown"]',function(t){p(this).dropdown()}),this.render()},render:function(){function n(n,p){t.each(n,function(t,n){var r=n.type;switch(r||(r="button"),r){case"buttongroup":e(n,p);break;case"button":a(n,p);break;case"dropdown":case"dropup":i(n,p);break;case"input":o(n,p);break;default:throw"Wrong widget button type"}})}function e(t,e){var a=p("<div/>",{"class":"btn-group",role:"group"});return e.append(a),n(t.items,a),a}function a(n,e){var a=p('<button type="button" class="btn btn-default"/>'),i=t.mixin({},n);"icon"in n&&(a.append(p("<span/>",{"class":n.icon})),delete i.icon),"text"in i&&(a.append(" "+n.text),delete i.text),a.attr(i),e.append(a)}function i(n,e){var a=p('<div class="btn-group" role="group"/>'),i=p('<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>'),o=p('<ul class="dropdown-menu"/>'),r=t.mixin({},n);"dropup"===n.type&&a.addClass("dropup"),"icon"in n&&(i.append(p("<span/>",{"class":n.icon})),delete r.icon),"text"in n&&(i.append(" "+n.text),delete r.text),i.append(' <span class="caret"/>');for(var s in n.list){var d=n.list[s],u=p("<li/>");"icon"in d&&u.append(p("<span/>",{"class":d.icon})),"text"in d&&u.append(" "+d.text),u.attr(d),o.append(u)}a.attr(r),a.append(i),a.append(o),e.append(a)}function o(n,e){var a=p('<div class="input-group"/>'),i=p('<input class="form-control"/>'),o=t.mixin({},n);if("prefix"in n){var r=p('<span class="input-group-addon"/>');r.html(n.prefix),a.append(r),delete o.prefix}if(a.append(i),"sufix"in n){var s=p('<span class="input-group-addon"/>');s.html(n.sufix),a.append(s),delete o.sufix}o.type=o.inputType,delete o.inputType,i.attr(o),e.append(a)}var r=this._options.items;r&&n(r,this.$container)}});return p.fn.toolbar=function(n){return n=n||{},this.each(function(){return new s(this,t.mixin({},n,!0))})},s});
//# sourceMappingURL=sourcemaps/toolbar.js.map
