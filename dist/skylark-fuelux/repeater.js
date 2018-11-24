/**
 * skylark-fuelux - A version of fuelux that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.2
 * @link https://github.com/skylarkui/skylark-fuelux/
 * @license MIT
 */
define(["skylark-utils-dom/skylark","skylark-langx/langx","skylark-utils-dom/browser","skylark-utils-dom/eventer","skylark-utils-dom/noder","skylark-utils-dom/geom","skylark-utils-dom/query","./fuelux","./loader","./selectlist","./combobox"],function(e,t,i,n,s,a,r,l){var h=r.fn.repeater,o=l.Repeater=l.WidgetBase.inherit({klassName:"Repeater",init:function(e,i){var n,s,a=this;this.$element=r(e),this.$canvas=this.$element.find(".repeater-canvas"),this.$count=this.$element.find(".repeater-count"),this.$end=this.$element.find(".repeater-end"),this.$filters=this.$element.find(".repeater-filters"),this.$loader=this.$element.find(".repeater-loader"),this.$pageSize=this.$element.find(".repeater-itemization .selectlist"),this.$nextBtn=this.$element.find(".repeater-next"),this.$pages=this.$element.find(".repeater-pages"),this.$prevBtn=this.$element.find(".repeater-prev"),this.$primaryPaging=this.$element.find(".repeater-primaryPaging"),this.$search=this.$element.find(".repeater-search").find(".search"),this.$secondaryPaging=this.$element.find(".repeater-secondaryPaging"),this.$start=this.$element.find(".repeater-start"),this.$viewport=this.$element.find(".repeater-viewport"),this.$views=this.$element.find(".repeater-views"),this.$element.on("mousedown.bs.dropdown.data-api",'[data-toggle="dropdown"]',function(e){r(this).dropdown()}),this.currentPage=0,this.currentView=null,this.isDisabled=!1,this.infiniteScrollingCallback=function(){},this.infiniteScrollingCont=null,this.infiniteScrollingEnabled=!1,this.infiniteScrollingEnd=null,this.infiniteScrollingOptions={},this.lastPageInput=0,this.options=t.mixin({},r.fn.repeater.defaults,i),this.pageIncrement=0,this.resizeTimeout={},this.stamp=(new Date).getTime()+(Math.floor(100*Math.random())+1),this.storedDataSourceOpts=null,this.syncingViewButtonState=!1,this.viewOptions={},this.viewType=null,this.$filters.selectlist(),this.$pageSize.selectlist(),this.$primaryPaging.find(".combobox").combobox(),this.$search.search({searchOnKeyPress:this.options.searchOnKeyPress,allowCancel:this.options.allowCancel}),this.$filters.on("changed.fu.selectlist",function(e,t){a.$element.trigger("filtered.fu.repeater",t),a.render({clearInfinite:!0,pageIncrement:null})}),this.$nextBtn.on("click.fu.repeater",t.proxy(this.next,this)),this.$pageSize.on("changed.fu.selectlist",function(e,t){a.$element.trigger("pageSizeChanged.fu.repeater",t),a.render({pageIncrement:null})}),this.$prevBtn.on("click.fu.repeater",t.proxy(this.previous,this)),this.$primaryPaging.find(".combobox").on("changed.fu.combobox",function(e,t){a.pageInputChange(t.text,t)}),this.$search.on("searched.fu.search cleared.fu.search",function(e,t){a.$element.trigger("searchChanged.fu.repeater",t),a.render({clearInfinite:!0,pageIncrement:null})}),this.$search.on("canceled.fu.search",function(e,t){a.$element.trigger("canceled.fu.repeater",t),a.render({clearInfinite:!0,pageIncrement:null})}),this.$secondaryPaging.on("blur.fu.repeater",function(){a.pageInputChange(a.$secondaryPaging.val())}),this.$secondaryPaging.on("keyup",function(e){13===e.keyCode&&a.pageInputChange(a.$secondaryPaging.val())}),this.$views.find("input").on("change.fu.repeater",t.proxy(this.viewChanged,this)),r(window).on("resize.fu.repeater."+this.stamp,function(){clearTimeout(a.resizeTimeout),a.resizeTimeout=setTimeout(function(){a.resize(),a.$element.trigger("resized.fu.repeater")},75)}),this.$loader.loader(),this.$loader.loader("pause"),this.options.defaultView!==-1?s=this.options.defaultView:(n=this.$views.find("label.active input"),s=n.length>0?n.val():"list"),this.setViewOptions(s),this.initViewTypes(function(){a.resize(),a.$element.trigger("resized.fu.repeater"),a.render({changeView:s})})},clear:function(e){var t=e||{};t.preserve?this.infiniteScrollingEnabled&&!t.clearInfinite||c(this.$canvas):this.$canvas.empty();var i=void 0!==t.viewChanged&&t.viewChanged,n=r.fn.repeater.viewTypes[this.viewType]||{};!i&&n.cleared&&n.cleared.call(this,{options:t})},clearPreservedDataSourceOptions:function(){this.storedDataSourceOpts=null},destroy:function(){var e;return this.$element.find("input").each(function(){r(this).attr("value",r(this).val())}),this.$canvas.empty(),e=this.$element[0].outerHTML,this.$element.find(".combobox").combobox("destroy"),this.$element.find(".selectlist").selectlist("destroy"),this.$element.find(".search").search("destroy"),this.infiniteScrollingEnabled&&r(this.infiniteScrollingCont).infinitescroll("destroy"),this.$element.remove(),r(window).off("resize.fu.repeater."+this.stamp),e},disable:function(){var e=r.fn.repeater.viewTypes[this.viewType]||{};this.$search.search("disable"),this.$filters.selectlist("disable"),this.$views.find("label, input").addClass("disabled").attr("disabled","disabled"),this.$pageSize.selectlist("disable"),this.$primaryPaging.find(".combobox").combobox("disable"),this.$secondaryPaging.attr("disabled","disabled"),this.$prevBtn.attr("disabled","disabled"),this.$nextBtn.attr("disabled","disabled"),e.enabled&&e.enabled.call(this,{status:!1}),this.isDisabled=!0,this.$element.addClass("disabled"),this.$element.trigger("disabled.fu.repeater")},enable:function(){var e=r.fn.repeater.viewTypes[this.viewType]||{};this.$search.search("enable"),this.$filters.selectlist("enable"),this.$views.find("label, input").removeClass("disabled").removeAttr("disabled"),this.$pageSize.selectlist("enable"),this.$primaryPaging.find(".combobox").combobox("enable"),this.$secondaryPaging.removeAttr("disabled"),this.$prevBtn.hasClass("page-end")||this.$prevBtn.removeAttr("disabled"),this.$nextBtn.hasClass("page-end")||this.$nextBtn.removeAttr("disabled"),this.$prevBtn.hasClass("page-end")&&this.$nextBtn.hasClass("page-end")&&this.$primaryPaging.combobox("disable"),0!==parseInt(this.$count.html(),10)?this.$pageSize.selectlist("enable"):this.$pageSize.selectlist("disable"),e.enabled&&e.enabled.call(this,{status:!0}),this.isDisabled=!1,this.$element.removeClass("disabled"),this.$element.trigger("enabled.fu.repeater")},getDataOptions:function(e){var i=e||{};void 0!==i.pageIncrement&&(null===i.pageIncrement?this.currentPage=0:this.currentPage+=i.pageIncrement);var n={};i.dataSourceOptions&&(n=i.dataSourceOptions,i.preserveDataSourceOptions&&(this.storedDataSourceOpts?this.storedDataSourceOpts=t.mixin(this.storedDataSourceOpts,n):this.storedDataSourceOpts=n)),this.storedDataSourceOpts&&(n=t.mixin(this.storedDataSourceOpts,n));var s={view:this.currentView,pageIndex:this.currentPage,filter:{text:"All",value:"all"}};this.$filters.length>0&&(s.filter=this.$filters.selectlist("selectedItem")),this.infiniteScrollingEnabled||(s.pageSize=25,this.$pageSize.length>0&&(s.pageSize=parseInt(this.$pageSize.selectlist("selectedItem").value,10)));var a=this.$search&&this.$search.find("input")&&this.$search.find("input").val();""!==a&&(s.search=a);var l=r.fn.repeater.viewTypes[this.viewType]||{},h=l.dataOptions;return h&&(s=h.call(this,s)),s=t.mixin(s,n)},infiniteScrolling:function(e,t){var i=this.$element.find(".repeater-footer"),n=this.$element.find(".repeater-viewport"),s=t||{};if(e)this.infiniteScrollingEnabled=!0,this.infiniteScrollingEnd=s.end,delete s.dataSource,delete s.end,this.infiniteScrollingOptions=s,n.css({height:n.height()+i.outerHeight()}),i.hide();else{var a=this.infiniteScrollingCont,r=a.data();delete r.infinitescroll,a.off("scroll"),a.removeClass("infinitescroll"),this.infiniteScrollingCont=null,this.infiniteScrollingEnabled=!1,this.infiniteScrollingEnd=null,this.infiniteScrollingOptions={},n.css({height:n.height()-i.outerHeight()}),i.show()}},infiniteScrollPaging:function(e){var t=this.infiniteScrollingEnd!==!0?this.infiniteScrollingEnd:void 0,i=e.page,n=e.pages;this.currentPage=void 0!==i?i:NaN,(e.end===!0||this.currentPage+1>=n)&&this.infiniteScrollingCont.infinitescroll("end",t)},initInfiniteScrolling:function(){var e=this.$canvas.find('[data-infinite="true"]:first');if(e=e.length<1?this.$canvas:e,e.data("fu.infinitescroll"))e.infinitescroll("enable");else{var i=this,n=t.mixin({},this.infiniteScrollingOptions);n.dataSource=function(e,t){i.infiniteScrollingCallback=t,i.render({pageIncrement:1})},e.infinitescroll(n),this.infiniteScrollingCont=e}},initViewTypes:function(e){var t=[];for(var i in r.fn.repeater.viewTypes)({}).hasOwnProperty.call(r.fn.repeater.viewTypes,i)&&t.push(r.fn.repeater.viewTypes[i]);t.length>0?f.call(this,0,t,e):e()},itemization:function(e){this.$count.html(void 0!==e.count?e.count:"?"),this.$end.html(void 0!==e.end?e.end:"?"),this.$start.html(void 0!==e.start?e.start:"?")},next:function(){this.$nextBtn.attr("disabled","disabled"),this.$prevBtn.attr("disabled","disabled"),this.pageIncrement=1,this.$element.trigger("nextClicked.fu.repeater"),this.render({pageIncrement:this.pageIncrement})},pageInputChange:function(e,t){var i;if(e!==this.lastPageInput){this.lastPageInput=e;var n=parseInt(e,10)-1;i=n-this.currentPage,this.$element.trigger("pageChanged.fu.repeater",[n,t]),this.render({pageIncrement:i})}},pagination:function(e){this.$primaryPaging.removeClass("active"),this.$secondaryPaging.removeClass("active");var t=e.pages;this.currentPage=void 0!==e.page?e.page:NaN;var i=0===t?0:this.currentPage+1;if(t<=this.viewOptions.dropPagingCap){this.$primaryPaging.addClass("active");var n=this.$primaryPaging.find(".dropdown-menu");n.empty();for(var s=0;s<t;s++){var a=s+1;n.append('<li data-value="'+a+'"><a href="#">'+a+"</a></li>")}this.$primaryPaging.find("input.form-control").val(i)}else this.$secondaryPaging.addClass("active"),this.$secondaryPaging.val(i);this.lastPageInput=this.currentPage+1+"",this.$pages.html(""+t),this.currentPage+1<t?(this.$nextBtn.removeAttr("disabled"),this.$nextBtn.removeClass("page-end")):(this.$nextBtn.attr("disabled","disabled"),this.$nextBtn.addClass("page-end")),this.currentPage-1>=0?(this.$prevBtn.removeAttr("disabled"),this.$prevBtn.removeClass("page-end")):(this.$prevBtn.attr("disabled","disabled"),this.$prevBtn.addClass("page-end")),0!==this.pageIncrement&&(this.pageIncrement>0?this.$nextBtn.is(":disabled")?this.$prevBtn.focus():this.$nextBtn.focus():this.$prevBtn.is(":disabled")?this.$nextBtn.focus():this.$prevBtn.focus())},previous:function(){this.$nextBtn.attr("disabled","disabled"),this.$prevBtn.attr("disabled","disabled"),this.pageIncrement=-1,this.$element.trigger("previousClicked.fu.repeater"),this.render({pageIncrement:this.pageIncrement})},render:function(e){this.disable();var t=!1,i=r.fn.repeater.viewTypes[this.viewType]||{},n=e||{};if(n.changeView&&this.currentView!==n.changeView){var s=this.currentView;this.currentView=n.changeView,this.viewType=this.currentView.split(".")[0],this.setViewOptions(this.currentView),this.$element.attr("data-currentview",this.currentView),this.$element.attr("data-viewtype",this.viewType),t=!0,n.viewChanged=t,this.$element.trigger("viewChanged.fu.repeater",this.currentView),this.infiniteScrollingEnabled&&this.infiniteScrolling(!1),i=r.fn.repeater.viewTypes[this.viewType]||{},i.selected&&i.selected.call(this,{prevView:s})}this.syncViewButtonState(),n.preserve=void 0!==n.preserve?n.preserve:!t,this.clear(n),(!this.infiniteScrollingEnabled||this.infiniteScrollingEnabled&&t)&&this.$loader.show().loader("play");var a=this.getDataOptions(n),l=this.viewOptions.dataSource,h=this;l(a,function(e){v.call(h,{data:e,dataOptions:a,options:n,viewChanged:t,viewTypeObj:i})})},resize:function(){for(var e,t,i,n=this.viewOptions.staticHeight===-1?this.$element.attr("data-staticheight"):this.viewOptions.staticHeight,s={},a=[],l=[],h=this.$element.parentsUntil(":visible"),o=0;o<h.length&&this.$element.is(":hidden");)i=h[o],r(i).is(":hidden")&&(l.push(i.style.display),i.style.display="block",a.push(i)),o++;if(this.viewType&&(s=r.fn.repeater.viewTypes[this.viewType]||{}),void 0!==n&&n!==!1&&"false"!==n){this.$canvas.addClass("scrolling"),t={bottom:this.$viewport.css("margin-bottom"),top:this.$viewport.css("margin-top")};var d="true"===n||n===!0?this.$element.height():parseInt(n,10),c=this.$element.find(".repeater-header").outerHeight(),p=this.$element.find(".repeater-footer").outerHeight(),g="auto"===t.bottom?0:parseInt(t.bottom,10),f="auto"===t.top?0:parseInt(t.top,10);e=d-c-p-g-f,this.$viewport.outerHeight(e)}else this.$canvas.removeClass("scrolling");s.resize&&s.resize.call(this,{height:this.$element.outerHeight(),width:this.$element.outerWidth()}),a.forEach(function(e,t){e.style.display=l[t]})},renderItems:function(e,t,i){if(e.render)e.render.call(this,{container:this.$canvas,data:t},i);else{if(e.before){var n=e.before.call(this,{container:this.$canvas,data:t});p(this.$canvas,n)}var s=this.$canvas.find('[data-container="true"]:last'),a=s.length>0?s:this.$canvas;if(e.renderItem){var r,l=e.repeat||"data.items",h=l.split("."),o=h[0];if("data"===o||"this"===o){r="this"===o?this:t;for(var c=h.slice(1),g=0;g<c.length;g++){if(void 0===r[c[g]]){r=[],d("WARNING: Repeater unable to find property to iterate renderItem on.");break}r=r[c[g]]}for(var f=0;f<r.length;f++){var u=e.renderItem.call(this,{container:a,data:t,index:f,subset:r});p(a,u)}}else d('WARNING: Repeater plugin "repeat" value must start with either "data" or "this"')}if(e.after){var v=e.after.call(this,{container:this.$canvas,data:t});p(this.$canvas,v)}i(t)}},setViewOptions:function(e){var i={},n=e.split(".")[1];i=this.options.views?this.options.views[n]||this.options.views[e]||{}:{},this.viewOptions=t.mixin({},this.options,i)},viewChanged:function(e){var t=r(e.target),i=t.val();this.syncingViewButtonState||(this.isDisabled||t.parents("label:first").hasClass("disabled")?this.syncViewButtonState():this.render({changeView:i,pageIncrement:null}))},syncViewButtonState:function(){var e=this.$views.find('input[value="'+this.currentView+'"]');this.syncingViewButtonState=!0,this.$views.find("input").prop("checked",!1),this.$views.find("label.active").removeClass("active"),e.length>0&&(e.prop("checked",!0),e.parents("label:first").addClass("active")),this.syncingViewButtonState=!1}}),d=function(e){window.console&&window.console.warn&&window.console.warn(e)},c=function $(e){var t=[];e.children().each(function(){var e=r(this),i=e.attr("data-preserve");"deep"===i?(e.detach(),t.push(e)):"shallow"===i&&($(e),e.detach(),t.push(e))}),e.empty(),e.append(t)},p=function(e,t){var i;if(t&&(i=t.action?t.action:"append","none"!==i&&void 0!==t.item)){var n=void 0!==t.container?r(t.container):e;n[i](t.item)}},g=function(e,t,i){var n=e+1;n<t.length?f.call(this,n,t,i):i()},f=function(e,t,i){t[e].initialize?t[e].initialize.call(this,{},function(){g.call(this,e,t,i)}):g.call(this,e,t,i)},u=function(e){var t=e.data||{};this.infiniteScrollingEnabled&&((e.viewChanged||e.options.clearInfinite)&&this.initInfiniteScrolling(),this.infiniteScrollPaging(t,e.options)),this.$loader.hide().loader("pause"),this.enable(),this.$search.trigger("rendered.fu.repeater",{data:t,options:e.dataOptions,renderOptions:e.options}),this.$element.trigger("rendered.fu.repeater",{data:t,options:e.dataOptions,renderOptions:e.options}),this.$element.trigger("loaded.fu.repeater",e.dataOptions)},v=function(e){var t=e.data||{};this.infiniteScrollingEnabled?this.infiniteScrollingCallback({}):(this.itemization(t),this.pagination(t));var i=this;this.renderItems(e.viewTypeObj,t,function(t){e.data=t,u.call(i,e)})};return o.prototype.runRenderer=o.prototype.renderItems,r.fn.repeater=function(e){var t,i=Array.prototype.slice.call(arguments,1),n=this.each(function(){var n=r(this),s=n.data("fu.repeater"),a="object"==typeof e&&e;s||n.data("fu.repeater",s=new o(this,a)),"string"==typeof e&&(t=s[e].apply(s,i))});return void 0===t?n:t},r.fn.repeater.defaults={dataSource:function(e,t){t({count:0,end:0,items:[],page:0,pages:1,start:0})},defaultView:-1,dropPagingCap:10,staticHeight:-1,views:null,searchOnKeyPress:!1,allowCancel:!0},r.fn.repeater.viewTypes={},r.fn.repeater.Constructor=o,r.fn.repeater.noConflict=function(){return r.fn.repeater=h,this},r.fn.repeater});
//# sourceMappingURL=sourcemaps/repeater.js.map
