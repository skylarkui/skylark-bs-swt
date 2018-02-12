/**
 * skylark-bs-swt - The skylark bootstrap standard widget tookit
 * @author Hudaokeji, Inc.
 * @version v0.9.0-beta
 * @link https://github.com/skylarkui/skylark-bs-swt/
 * @license MIT
 */
define(["skylark-utils/langx","skylark-utils/browser","skylark-utils/eventer","skylark-utils/noder","skylark-utils/geom","skylark-utils/velm","skylark-utils/query","./sbswt"],function(e,t,a,n,i,s,o,l){var r=!1,c={element:!1,reference:!1,position_x:0,position_y:0,items:[],html:"",is_visible:!1},d={settings:{hide_onmouseleave:0,icons:!0},_trigger:function(e){o(document).trigger("context_"+e+".vakata",{reference:c.reference,element:c.element,position:{x:c.position_x,y:c.position_y}})},_execute:function(e){return e=c.items[e],!(!e||e._disabled&&(!o.isFunction(e._disabled)||e._disabled({item:e,reference:c.reference,element:c.element}))||!e.action)&&e.action.call(null,{item:e,reference:c.reference,element:c.element,position:{x:c.position_x,y:c.position_y}})},_parse:function(e,t){if(!e)return!1;t||(c.html="",c.items=[]);var a,n="",i=!1;return t&&(n+="<ul>"),o.each(e,function(e,t){return!t||(c.items.push(t),!i&&t.separator_before&&(n+="<li class='vakata-context-separator'><a href='#' "+(d.settings.icons?"":'style="margin-left:0px;"')+">&#160;</a></li>"),i=!1,n+="<li class='"+(t._class||"")+(t._disabled===!0||o.isFunction(t._disabled)&&t._disabled({item:t,reference:c.reference,element:c.element})?" vakata-contextmenu-disabled ":"")+"' "+(t.shortcut?" data-shortcut='"+t.shortcut+"' ":"")+">",n+="<a href='#' rel='"+(c.items.length-1)+"' "+(t.title?"title='"+t.title+"'":"")+">",d.settings.icons&&(n+="<i ",t.icon&&(n+=t.icon.indexOf("/")!==-1||t.icon.indexOf(".")!==-1?" style='background:url(\""+t.icon+"\") center center no-repeat' ":" class='"+t.icon+"' "),n+="></i><span class='vakata-contextmenu-sep'>&#160;</span>"),n+=(o.isFunction(t.label)?t.label({item:e,reference:c.reference,element:c.element}):t.label)+(t.shortcut?' <span class="vakata-contextmenu-shortcut vakata-contextmenu-shortcut-'+t.shortcut+'">'+(t.shortcut_label||"")+"</span>":"")+"</a>",t.submenu&&(a=d._parse(t.submenu,!0),a&&(n+=a)),n+="</li>",void(t.separator_after&&(n+="<li class='vakata-context-separator'><a href='#' "+(d.settings.icons?"":'style="margin-left:0px;"')+">&#160;</a></li>",i=!0)))}),n=n.replace(/<li class\='vakata-context-separator'\><\/li\>$/,""),t&&(n+="</ul>"),t||(c.html=n,d._trigger("parse")),n.length>10&&n},_show_submenu:function(e){if(e=o(e),e.length&&e.children("ul").length){var t=e.children("ul"),a=e.offset().left,n=a+e.outerWidth(),i=e.offset().top,s=t.width(),l=t.height(),c=o(window).width()+o(window).scrollLeft(),d=o(window).height()+o(window).scrollTop();r?e[n-(s+10+e.outerWidth())<0?"addClass":"removeClass"]("vakata-context-left"):e[n+s>c&&a>c-n?"addClass":"removeClass"]("vakata-context-right"),i+l+10>d&&t.css("bottom","-1px"),e.hasClass("vakata-context-right")?a<s&&t.css("margin-right",a-s):c-n<s&&t.css("margin-left",c-n-s),t.show()}},show:function(e,t,a){var n,i,s,l,h,u,v,m,f=!0;switch(c.element&&c.element.length&&c.element.width(""),f){case!t&&!e:return!1;case!!t&&!!e:c.reference=e,c.position_x=t.x,c.position_y=t.y;break;case!t&&!!e:c.reference=e,n=e.offset(),c.position_x=n.left+e.outerHeight(),c.position_y=n.top;break;case!!t&&!e:c.position_x=t.x,c.position_y=t.y}e&&!a&&o(e).data("vakata_contextmenu")&&(a=o(e).data("vakata_contextmenu")),d._parse(a)&&c.element.html(c.html),c.items.length&&(c.element.appendTo(document.body),i=c.element,s=c.position_x,l=c.position_y,h=i.width(),u=i.height(),v=o(window).width()+o(window).scrollLeft(),m=o(window).height()+o(window).scrollTop(),r&&(s-=i.outerWidth()-o(e).outerWidth(),s<o(window).scrollLeft()+20&&(s=o(window).scrollLeft()+20)),s+h+20>v&&(s=v-(h+20)),l+u+20>m&&(l=m-(u+20)),c.element.css({left:s,top:l}).show().find("a").first().focus().parent().addClass("vakata-context-hover"),c.is_visible=!0,this._trigger("show"))},hide:function(){c.is_visible&&(c.element.hide().find("ul").hide().end().find(":focus").blur().end().detach(),c.is_visible=!1,this._trigger("hide"))}};return o(function(){r="rtl"===o(document.body).css("direction");var e=!1;c.element=o("<ul class='vakata-context'></ul>"),c.element.on("mouseenter","li",function(t){t.stopImmediatePropagation(),n.contains(this,t.relatedTarget)||(e&&clearTimeout(e),c.element.find(".vakata-context-hover").removeClass("vakata-context-hover").end(),o(this).siblings().find("ul").hide().end().end().parentsUntil(".vakata-context","li").addBack().addClass("vakata-context-hover"),d._show_submenu(this))}).on("mouseleave","li",function(e){n.contains(this,e.relatedTarget)||o(this).find(".vakata-context-hover").addBack().removeClass("vakata-context-hover")}).on("mouseleave",function(t){o(this).find(".vakata-context-hover").removeClass("vakata-context-hover"),d.settings.hide_onmouseleave&&(e=setTimeout(function(e){return function(){d.hide()}}(this),d.settings.hide_onmouseleave))}).on("click","a",function(e){e.preventDefault(),o(this).blur().parent().hasClass("vakata-context-disabled")||d._execute(o(this).attr("rel"))===!1||d.hide()}).on("keydown","a",function(e){var t=null;switch(e.which){case 13:case 32:e.type="click",e.preventDefault(),o(e.currentTarget).trigger(e);break;case 37:c.is_visible&&(c.element.find(".vakata-context-hover").last().closest("li").first().find("ul").hide().find(".vakata-context-hover").removeClass("vakata-context-hover").end().end().children("a").focus(),e.stopImmediatePropagation(),e.preventDefault());break;case 38:c.is_visible&&(t=c.element.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").prevAll("li:not(.vakata-context-separator)").first(),t.length||(t=c.element.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").last()),t.addClass("vakata-context-hover").children("a").focus(),e.stopImmediatePropagation(),e.preventDefault());break;case 39:c.is_visible&&(c.element.find(".vakata-context-hover").last().children("ul").show().children("li:not(.vakata-context-separator)").removeClass("vakata-context-hover").first().addClass("vakata-context-hover").children("a").focus(),e.stopImmediatePropagation(),e.preventDefault());break;case 40:c.is_visible&&(t=c.element.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").nextAll("li:not(.vakata-context-separator)").first(),t.length||(t=c.element.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").first()),t.addClass("vakata-context-hover").children("a").focus(),e.stopImmediatePropagation(),e.preventDefault());break;case 27:d.hide(),e.preventDefault()}}).on("keydown",function(e){e.preventDefault();var t=c.element.find(".vakata-contextmenu-shortcut-"+e.which).parent();t.parent().not(".vakata-context-disabled")&&t.click()}),o(document).on("mousedown.vakata.jstree",function(e){c.is_visible&&c.element[0]!==e.target&&!n.contains(c.element[0],e.target)&&d.hide()}).on("context_show.vakata.jstree",function(e,t){c.element.find("li:has(ul)").children("a").addClass("vakata-context-parent"),r&&c.element.addClass("vakata-context-rtl").css("direction","rtl"),c.element.find("ul").hide().end()})}),d});
//# sourceMappingURL=sourcemaps/menu.js.map