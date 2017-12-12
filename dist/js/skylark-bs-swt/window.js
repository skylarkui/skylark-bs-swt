/**
 * skylark-bs-swt - The skylark bootstrap standard widget tookit
 * @author Hudaokeji, Inc.
 * @version v0.9.0-beta
 * @link https://github.com/skylarkui/skylark-bs-swt/
 * @license MIT
 */
define(["skylark-utils/langx","skylark-utils/browser","skylark-utils/datax","skylark-utils/eventer","skylark-utils/noder","skylark-utils/geom","skylark-utils/velm","skylark-utils/query","skylark-utils/mover","./sbswt"],function(t,e,i,s,n,o,a,l,d,h){var r="bsw",c=h.Window=h.WidgetBase.inherit({klassName:"Window",init:function(e,i){i=i||{};var s={selectors:{handle:".window-header",title:".window-title",body:".window-body",footer:".window-footer"},elements:{handle:null,title:null,body:null,footer:null},references:{body:l("body"),window:l(window)},effect:"fade",parseHandleForTitle:!0,maximized:!1,maximizable:!1,title:"No Title",bodyContent:"",footerContent:""};i=this.options=t.mixin({},s,i,!0);var n=this;return this.$el=l(e),this.$el.hasClass("window")||this.$el.addClass("window"),this.$el.data("window",this),this.$el.find(i.selectors.handle).length<=0&&this.$el.prepend('<div class="window-header"><h4 class="window-title"></h4></div>'),i.elements.handle=this.$el.find(i.selectors.handle),i.elements.title=this.$el.find(i.selectors.title),i.elements.body=this.$el.find(i.selectors.body),i.elements.footer=this.$el.find(i.selectors.footer),i.elements.title.html(i.title),i.maximizable&&(i.elements.buttons={},i.elements.buttons.maximize=l('<button data-maximize="window"><i class="glyphicon glyphicon-chevron-up"></i></button>'),i.elements.handle.prepend(i.elements.buttons.maximize),i.elements.buttons.restore=l('<button data-restore="window"><i class="glyphicon glyphicon-modal-window"></i></button>'),i.elements.handle.prepend(i.elements.buttons.restore)),n.$el.find("[data-dismiss=window]").length<=0&&i.elements.handle.prepend('<button type="button" class="close" data-dismiss="window" aria-hidden="true"><i class="glyphicon glyphicon-remove"></i></button>'),i.elements.body.html(i.bodyContent),i.elements.footer.html(i.footerContent),this.undock(),this.setSticky(i.sticky),this},undock:function(){var t=this;this.$el.css("visibility","hidden"),this.$el.appendTo("body"),this.centerWindow(),/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&this.options.references.window.bind("orientationchange resize",function(e){t.centerWindow()}),this.$el.on("touchmove",function(t){t.stopPropagation()}),this.initHandlers(),this.$el.hide(),this.options.id?this.id=this.options.id:this.id="",this.show()},maximize:function(){this.$el.removeClass("minimized"),this.$el.addClass("maximized"),this.state="maximized";var t=0;this.options.window_manager&&(t=this.options.window_manager.getContainer().height()),this.$el.css({top:parseInt(l("body").css("padding-top"),10),left:0,right:0,bottom:t,maxWidth:"none",width:"auto",height:"auto"}),this.$el.trigger(r+".maximize")},restore:function(){this.$el.removeClass("minimized"),this.$el.removeClass("maximized"),this.$el.removeAttr("style"),this.state=void 0,this.$el.css({top:this.window_info.top,left:this.window_info.left,width:this.window_info.width,height:this.window_info.height}),this.$el.removeProp("style"),this.$el.trigger(r+".restore")},show:function(t){var e=this;this.$el.css("visibility","visible");var i=function(){e.$el.trigger(r+".show"),t&&t.call(e,arguments)};"fade"===this.options.effect?this.$el.fadeIn(void 0,void 0,i):i.call(this.$el)},setEffect:function(t){this.options.effect=t},getEffect:function(){return this.options.effect},centerWindow:function(){var t,e,i,s=parseInt(this.options.references.body.position().top,10)+parseInt(this.options.references.body.css("paddingTop"),10);this.options.sticky?(e=this.options.references.window.width()/2-this.$el.width()/2,t=this.options.references.window.height()/2-this.$el.height()/2):(e=this.options.references.window.width()/2-this.$el.width()/2,t=this.options.references.window.height()/2-this.$el.height()/2),t<s&&(t=s),i=this.options.references.window.height()-s-(parseInt(this.options.elements.handle.css("height"),10)+parseInt(this.options.elements.footer.css("height"),10))-45,this.options.elements.body.css("maxHeight",i),this.$el.css("left",e),this.$el.css("top",t),this.$el&&this.$el.length>0&&(this.window_info={top:this.$el.position().top,left:this.$el.position().left,width:this.$el.outerWidth(),height:this.$el.outerHeight()}),this.$el.trigger(r+".centerWindow")},close:function(t){var e=this;this.options.parent?(this.options.parent.clearBlocker(),this.options.window_manager&&this.options.window_manager.setFocused(this.options.parent)):this.options.window_manager&&this.options.window_manager.windows.length>0&&this.options.window_manager.setNextFocused();var i=function(){e.$el.trigger(r+".close"),e.$el.remove(),t&&t.call(e)};"fade"===this.options.effect?this.$el.fadeOut(i):i.call(e.$el),this.$windowTab&&("fade"===this.options.effect?this.$windowTab.fadeOut(400,function(){e.$windowTab.remove()}):(this.$windowTab.hide(),this.$windowTab.remove()))},on:function(){this.$el.on.apply(this.$el,arguments)},sendToBack:function(){var t=!1;return this.options.window_manager&&(t=this.options.window_manager.sendToBack(this)),t},setActive:function(t){t?(this.$el.addClass("active"),this.$windowTab&&this.$windowTab.addClass("label-primary"),this.$el.trigger("active")):(this.$el.removeClass("active"),this.$windowTab&&(this.$windowTab.removeClass("label-primary"),this.$windowTab.addClass("label-default")),this.$el.trigger("inactive"))},setIndex:function(t){this.$el.css("zIndex",t)},setWindowTab:function(t){this.$windowTab=t},getWindowTab:function(){return this.$windowTab},getTitle:function(){return this.options.title},getElement:function(){return this.$el},setSticky:function(t){this.options.sticky=t,t===!1?this.$el.css({position:"absolute"}):this.$el.css({position:"fixed"})},getSticky:function(){return this.options.sticky},setManager:function(t){this.options.window_manager=t},initHandlers:function(){var t=this;this.$el.find("[data-dismiss=window]").on("click",function(e){e.stopPropagation(),e.preventDefault(),t.options.blocker||t.close()}),this.$el.find("[data-maximize=window]").on("click",function(e){e.stopPropagation(),e.preventDefault(),t.options.blocker||t.maximize()}),this.$el.find("[data-restore=window]").on("click",function(e){t.options.blocker||t.restore()}),this.moveable=d.movable(this.$el[0],{handle:this.options.elements.title[0]})},resize:function(t){t=t||{},t.top&&this.$el.css("top",t.top),t.left&&this.$el.css("left",t.left),t.height&&this.$el.css("height",t.height),t.width&&this.$el.css("width",t.width),this.$el.trigger(r+".resize")},setBlocker:function(t){this.options.blocker=t,this.$el.find(".disable-shade").remove();var e='<div class="disable-shade"></div>';this.options.elements.body.append(e),this.options.elements.body.addClass("disable-scroll"),this.options.elements.footer.append(e),"fade"===this.options.effect?this.$el.find(".disable-shade").fadeIn():this.$el.find(".disable-shade").show(),this.options.blocker.getParent()||this.options.blocker.setParent(this)},getBlocker:function(){return this.options.blocker},clearBlocker:function(){this.options.elements.body.removeClass("disable-scroll"),"fade"===this.options.effect?this.$el.find(".disable-shade").fadeOut(function(){this.remove()}):(this.$el.find(".disable-shade").hide(),this.remove()),delete this.options.blocker},setParent:function(t){this.options.parent=t,this.options.parent.getBlocker()||this.options.parent.setBlocker(this)},getParent:function(){return this.options.parent},blink:function(){var t=this,e=this.$el.hasClass("active"),i=this.getWindowTab(),s=i?i.hasClass("label-primary"):void 0,n=setInterval(function(){t.$el.toggleClass("active"),i&&i.toggleClass("label-primary")},250);setTimeout(function(){clearInterval(n),e&&t.$el.addClass("active"),i&&s&&i.addClass("label-primary")},1e3)}});i.window=function(t,e){var i=this.data(t,"sbswt.window");i||this.data(t,"sbswt.window",i=new c(t)),"string"==typeof option&&i[e]()},l.fn.window=function(t){return this.each(function(){i.window(this,t)})},a.partial("window",function(t){i.window(this.domNode,t)}),l("[data-window-target]").off("click"),l("[data-window-target]").on("click",function(){var t=l(this),e={selectors:{}};t.data("windowTitle")&&(e.title=t.data("windowTitle")),t.data("titleHandle")&&(e.selectors.title=t.data("titleHandle")),t.data("windowHandle")&&(e.selectors.handle=t.data("windowHandle")),t.data("clone")&&(e.clone=t.data("windowHandle")),l(t.data("windowTarget")).window(e)});var w=h.WindowManager=h.WidgetBase.inherit({klassName:"WindowManager",init:function(t){return this.windows=[],t=t||{},this.initialize(t),this},findWindowByID:function(e){var i=null;return t.each(this.windows,function(t,s){console.log(arguments),s.id===e&&(i=s)}),i},destroyWindow:function(e){var i=this,s=!1;return t.each(this.windows,function(t,n){n===e&&(e.close(),i.windows.splice(t,1),i.resortWindows(),s=!0)}),s},closeWindow:function(t){this.destroyWindow(t)},resortWindows:function(){var e=900;t.each(this.windows,function(t,i){i.setIndex(e+t)})},setFocused:function(e){for(var i;e.getBlocker();)e=e.getBlocker();t.each(this.windows,function(t,s){s.setActive(!1),s===e&&(i=t)}),this.windows.push(this.windows.splice(i,1)[0]),e.setActive(!0),this.resortWindows()},sendToBack:function(t){var e=this.windows.splice(this.windows.indexOf(t),1)[0];return this.windows.unshift(e),this.resortWindows(),!0},initialize:function(t){this.options=t,this.elements={},this.options.container&&(this.elements.container=l(this.options.container),this.elements.container.addClass("window-pane"))},getContainer:function(){var t;return this.elements&&this.elements.container&&(t=this.elements.container),t},setNextFocused:function(){this.setFocused(this.windows[this.windows.length-1])},addWindow:function(t){var e=this;return t.getElement().on("focused",function(i){e.setFocused(t)}),t.getElement().on("close",function(){e.destroyWindow(t),t.getWindowTab()&&t.getWindowTab().remove()}),t.on("bsw.restore",function(){e.resortWindows()}),this.options.container&&(t.setWindowTab(l('<span class="label label-default">'+t.getTitle()+'<button class="close">x</button></span>')),t.getWindowTab().find(".close").on("click",function(e){var i=t.getBlocker();i?i.blink():t.close()}),t.getWindowTab().on("click",function(i){var s=t.getBlocker();s?s.blink():(e.setFocused(t),t.getSticky()&&window.scrollTo(0,t.getElement().position().top))}),l(this.options.container).append(t.getWindowTab())),this.windows.push(t),t.setManager(this),this.setFocused(t),t},createWindow:function(e){var i=t.mixin({},e);this.options.windowTemplate&&!i.template&&(i.template=this.options.windowTemplate);var s=new c(i.template,i);return this.addWindow(s)}});return t.mixin(h,{Window:c,WindowManager:w}),l.fn.window});
//# sourceMappingURL=sourcemaps/window.js.map
