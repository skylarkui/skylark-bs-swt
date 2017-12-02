/**
 * skylark-bs-swt - The skylark bootstrap standard widget tookit
 * @author Hudaokeji, Inc.
 * @version v0.9.0-beta
 * @link https://github.com/skylarkui/skylark-bs-swt/
 * @license MIT
 */
define(["skylark-utils/langx","skylark-utils/browser","skylark-utils/eventer","skylark-utils/noder","skylark-utils/geom","skylark-utils/query","./sbswt"],function(t,e,i,a,s,n,r){var o="Invalid Date",h="moment.js is not available so you cannot use this function",d=[],l=!1,c=n.fn.datepicker,u=!1,p=r.Datepicker=r.WidgetBase.inherit({klassName:"Datepicker",init:function(e,i){this.$element=n(e),this.options=t.mixin(!0,{},n.fn.datepicker.defaults,i),this.$calendar=this.$element.find(".datepicker-calendar"),this.$days=this.$calendar.find(".datepicker-calendar-days"),this.$header=this.$calendar.find(".datepicker-calendar-header"),this.$headerTitle=this.$header.find(".title"),this.$input=this.$element.find("input"),this.$inputGroupBtn=this.$element.find(".input-group-btn"),this.$wheels=this.$element.find(".datepicker-wheels"),this.$wheelsMonth=this.$element.find(".datepicker-wheels-month"),this.$wheelsYear=this.$element.find(".datepicker-wheels-year"),this.$dropdown=this.$element.find('[data-toggle="dropdown"]'),this.$dropdown.dropdown(),this.artificialScrolling=!1,this.formatDate=this.options.formatDate||this.formatDate,this.inputValue=null,this.moment=!1,this.momentFormat=null,this.parseDate=this.options.parseDate||this.parseDate,this.preventBlurHide=!1,this.restricted=this.options.restricted||[],this.restrictedParsed=[],this.restrictedText=this.options.restrictedText,this.sameYearOnly=this.options.sameYearOnly,this.selectedDate=null,this.yearRestriction=null,this.$calendar.find(".datepicker-today").on("click.fu.datepicker",t.proxy(this.todayClicked,this)),this.$days.on("click.fu.datepicker","tr td button",t.proxy(this.dateClicked,this)),this.$header.find(".next").on("click.fu.datepicker",t.proxy(this.next,this)),this.$header.find(".prev").on("click.fu.datepicker",t.proxy(this.prev,this)),this.$headerTitle.on("click.fu.datepicker",t.proxy(this.titleClicked,this)),this.$input.on("change.fu.datepicker",t.proxy(this.inputChanged,this)),this.$input.on("mousedown.fu.datepicker",t.proxy(this.showDropdown,this)),this.$inputGroupBtn.on("hidden.bs.dropdown",t.proxy(this.hide,this)),this.$inputGroupBtn.on("shown.bs.dropdown",t.proxy(this.show,this)),this.$wheels.find(".datepicker-wheels-back").on("click.fu.datepicker",t.proxy(this.backClicked,this)),this.$wheels.find(".datepicker-wheels-select").on("click.fu.datepicker",t.proxy(this.selectClicked,this)),this.$wheelsMonth.on("click.fu.datepicker","ul button",t.proxy(this.monthClicked,this)),this.$wheelsYear.on("click.fu.datepicker","ul button",t.proxy(this.yearClicked,this)),this.$wheelsYear.find("ul").on("scroll.fu.datepicker",t.proxy(this.onYearScroll,this)),this.$element.on("click.fu.datepicker.data-api",".datepicker input",function(t){t.stopPropagation()});var a=function(){this.checkForMomentJS()&&(l=l||window.moment,this.moment=!0,this.momentFormat=this.options.momentConfig.format,this.setCulture(this.options.momentConfig.culture),l.locale=l.locale||l.lang),this.setRestrictedDates(this.restricted),this.setDate(this.options.date)||(this.$input.val(""),this.inputValue=this.$input.val()),this.sameYearOnly&&(this.yearRestriction=this.selectedDate?this.selectedDate.getFullYear():(new Date).getFullYear())};u?a.call(this):d.push({init:a,scope:this})},backClicked:function(){this.changeView("calendar")},changeView:function(t,e){"wheels"===t?(this.$calendar.hide().attr("aria-hidden","true"),this.$wheels.show().removeAttr("aria-hidden",""),e&&this.renderWheel(e)):(this.$wheels.hide().attr("aria-hidden","true"),this.$calendar.show().removeAttr("aria-hidden",""),e&&this.renderMonth(e))},checkForMomentJS:function(){return!(!(n.isFunction(window.moment)||"undefined"!=typeof l&&n.isFunction(l))||!n.isPlainObject(this.options.momentConfig)||"string"!=typeof this.options.momentConfig.culture||"string"!=typeof this.options.momentConfig.format)},dateClicked:function(t){var e,i=n(t.currentTarget).parents("td:first");i.hasClass("restricted")||(this.$days.find("td.selected").removeClass("selected"),i.addClass("selected"),e=new Date(i.attr("data-year"),i.attr("data-month"),i.attr("data-date")),this.selectedDate=e,this.$input.val(this.formatDate(e)),this.inputValue=this.$input.val(),this.hide(),this.$input.focus(),this.$element.trigger("dateClicked.fu.datepicker",e))},destroy:function(){return this.$element.remove(),this.$days.find("tbody").empty(),this.$wheelsYear.find("ul").empty(),this.$element[0].outerHTML},disable:function(){this.$element.addClass("disabled"),this.$element.find("input, button").attr("disabled","disabled"),this.$inputGroupBtn.removeClass("open")},enable:function(){this.$element.removeClass("disabled"),this.$element.find("input, button").removeAttr("disabled")},formatDate:function(t){var e=function(t){var e="0"+t;return e.substr(e.length-2)};return this.moment?l(t).format(this.momentFormat):e(t.getMonth()+1)+"/"+e(t.getDate())+"/"+t.getFullYear()},getCulture:function(){if(this.moment)return l.locale();throw h},getDate:function(){return this.selectedDate?this.selectedDate:new Date(NaN)},getFormat:function(){if(this.moment)return this.momentFormat;throw h},getFormattedDate:function(){return this.selectedDate?this.formatDate(this.selectedDate):o},getRestrictedDates:function(){return this.restricted},inputChanged:function(){var t,e=this.$input.val();e!==this.inputValue&&(t=this.setDate(e),null===t?this.$element.trigger("inputParsingFailed.fu.datepicker",e):t===!1?this.$element.trigger("inputRestrictedDate.fu.datepicker",t):this.$element.trigger("changed.fu.datepicker",t))},show:function(){var t=this.selectedDate?this.selectedDate:new Date;this.changeView("calendar",t),this.$inputGroupBtn.addClass("open"),this.$element.trigger("shown.fu.datepicker")},showDropdown:function(t){this.$input.is(":focus")||this.$inputGroupBtn.hasClass("open")||this.show()},hide:function(){this.$inputGroupBtn.removeClass("open"),this.$element.trigger("hidden.fu.datepicker")},hideDropdown:function(){this.hide()},isInvalidDate:function(t){var e=t.toString();return e===o||"NaN"===e},isRestricted:function(t,e,i){var a,s,n,r,o=this.restrictedParsed;if(this.sameYearOnly&&null!==this.yearRestriction&&i!==this.yearRestriction)return!0;for(a=0,n=o.length;a<n;a++)if(s=o[a].from,r=o[a].to,(i>s.year||i===s.year&&e>s.month||i===s.year&&e===s.month&&t>=s.date)&&(i<r.year||i===r.year&&e<r.month||i===r.year&&e===r.month&&t<=r.date))return!0;return!1},monthClicked:function(t){this.$wheelsMonth.find(".selected").removeClass("selected"),n(t.currentTarget).parent().addClass("selected")},next:function(){var t=this.$headerTitle.attr("data-month"),e=this.$headerTitle.attr("data-year");if(t++,t>11){if(this.sameYearOnly)return;t=0,e++}this.renderMonth(new Date(e,t,1))},onYearScroll:function(t){if(!this.artificialScrolling){var e,i,a=n(t.currentTarget),s="border-box"===a.css("box-sizing")?a.outerHeight():a.height(),r=a.get(0).scrollHeight,o=a.scrollTop(),h=s/(r-o)*100,d=o/r*100;if(d<5){for(i=parseInt(a.find("li:first").attr("data-year"),10),e=i-1;e>i-11;e--)a.prepend('<li data-year="'+e+'"><button type="button">'+e+"</button></li>");this.artificialScrolling=!0,a.scrollTop(a.get(0).scrollHeight-r+o),this.artificialScrolling=!1}else if(h>90)for(i=parseInt(a.find("li:last").attr("data-year"),10),e=i+1;e<i+11;e++)a.append('<li data-year="'+e+'"><button type="button">'+e+"</button></li>")}},parseDate:function(t){var e,i,a,s,n,r,o,h=this,d=new Date(NaN);if(t){if(this.moment)return s=function(t){var e=l(t,h.momentFormat);return!0===e.isValid()?e.toDate():d},a=function(t){var e=l(new Date(t));return!0===e.isValid()?e.toDate():d},n=function(t,e,i){var a=e(t);return h.isInvalidDate(a)?(a=i(t),h.isInvalidDate(a)?d:a):a},"string"==typeof t?n(t,s,a):n(t,a,s);if("string"==typeof t){if(e=new Date(Date.parse(t)),!this.isInvalidDate(e))return e;if(t=t.split("T")[0],i=/^\s*(\d{4})-(\d\d)-(\d\d)\s*$/,o=i.exec(t),o&&(r=parseInt(o[2],10),e=new Date(o[1],r-1,o[3]),r===e.getMonth()+1))return e}else if(e=new Date(t),!this.isInvalidDate(e))return e}return new Date(NaN)},prev:function(){var t=this.$headerTitle.attr("data-month"),e=this.$headerTitle.attr("data-year");if(t--,t<0){if(this.sameYearOnly)return;t=11,e--}this.renderMonth(new Date(e,t,1))},renderMonth:function(t){t=t||new Date;var e,i,a,s,r,o,h,d,l,c,u,p=new Date(t.getFullYear(),t.getMonth(),1).getDay(),f=new Date(t.getFullYear(),t.getMonth()+1,0).getDate(),m=new Date(t.getFullYear(),t.getMonth(),0).getDate(),g=this.$headerTitle.find(".month"),y=t.getMonth(),$=new Date,k=$.getDate(),w=$.getMonth(),D=$.getFullYear(),C=this.selectedDate,v=this.$days.find("tbody"),b=t.getFullYear();for(C&&(C={date:C.getDate(),month:C.getMonth(),year:C.getFullYear()}),g.find(".current").removeClass("current"),g.find('span[data-month="'+y+'"]').addClass("current"),this.$headerTitle.find(".year").text(b),this.$headerTitle.attr({"data-month":y,"data-year":b}),v.empty(),0!==p?(e=m-p+1,h=-1):(e=1,h=0),o=f<=35-p?5:6,s=0;s<o;s++){for(u=n("<tr></tr>"),r=0;r<7;r++)c=n("<td></td>"),h===-1?(c.addClass("last-month"),d!==h&&c.addClass("first")):1===h&&(c.addClass("next-month"),d!==h&&c.addClass("first")),i=y+h,a=b,i<0?(i=11,a--):i>11&&(i=0,a++),c.attr({"data-date":e,"data-month":i,"data-year":a}),a===D&&i===w&&e===k?c.addClass("current-day"):(a<D||a===D&&i<w||a===D&&i===w&&e<k)&&(c.addClass("past"),this.options.allowPastDates||c.addClass("restricted").attr("title",this.restrictedText)),this.isRestricted(e,i,a)&&c.addClass("restricted").attr("title",this.restrictedText),C&&a===C.year&&i===C.month&&e===C.date&&c.addClass("selected"),c.hasClass("restricted")?c.html('<span><b class="datepicker-date">'+e+"</b></span>"):c.html('<span><button type="button" class="datepicker-date">'+e+"</button></span>"),e++,l=d,d=h,h===-1&&e>m?(e=1,h=0,l!==h&&c.addClass("last")):0===h&&e>f&&(e=1,h=1,l!==h&&c.addClass("last")),s===o-1&&6===r&&c.addClass("last"),u.append(c);v.append(u)}},renderWheel:function(t){var e,i,a,s=t.getMonth(),n=this.$wheelsMonth.find("ul"),r=t.getFullYear(),o=this.$wheelsYear.find("ul");for(this.sameYearOnly?(this.$wheelsMonth.addClass("full"),this.$wheelsYear.addClass("hidden")):(this.$wheelsMonth.removeClass("full"),this.$wheelsYear.removeClass("hide hidden")),n.find(".selected").removeClass("selected"),i=n.find('li[data-month="'+s+'"]'),i.addClass("selected"),n.scrollTop(n.scrollTop()+(i.position().top-n.outerHeight()/2-i.outerHeight(!0)/2)),o.empty(),e=r-10;e<r+11;e++)o.append('<li data-year="'+e+'"><button type="button">'+e+"</button></li>");a=o.find('li[data-year="'+r+'"]'),a.addClass("selected"),this.artificialScrolling=!0,o.scrollTop(o.scrollTop()+(a.position().top-o.outerHeight()/2-a.outerHeight(!0)/2)),this.artificialScrolling=!1,i.find("button").focus()},selectClicked:function(){var t=this.$wheelsMonth.find(".selected").attr("data-month"),e=this.$wheelsYear.find(".selected").attr("data-year");this.changeView("calendar",new Date(e,t,1))},setCulture:function(t){if(!t)return!1;if(!this.moment)throw h;l.locale(t)},setDate:function(t){var e=this.parseDate(t);return this.isInvalidDate(e)?(this.selectedDate=null,this.renderMonth()):this.isRestricted(e.getDate(),e.getMonth(),e.getFullYear())?(this.selectedDate=!1,this.renderMonth()):(this.selectedDate=e,this.renderMonth(e),this.$input.val(this.formatDate(e))),this.inputValue=this.$input.val(),this.selectedDate},setFormat:function(t){if(!t)return!1;if(!this.moment)throw h;this.momentFormat=t},setRestrictedDates:function(t){var e,i,a=[],s=this,n=function(t){return t===-(1/0)?{date:-(1/0),month:-(1/0),year:-(1/0)}:t===1/0?{date:1/0,month:1/0,year:1/0}:(t=s.parseDate(t),{date:t.getDate(),month:t.getMonth(),year:t.getFullYear()})};for(this.restricted=t,e=0,i=t.length;e<i;e++)a.push({from:n(t[e].from),to:n(t[e].to)});this.restrictedParsed=a},titleClicked:function(t){this.changeView("wheels",new Date(this.$headerTitle.attr("data-year"),this.$headerTitle.attr("data-month"),1))},todayClicked:function(t){var e=new Date;e.getMonth()+""===this.$headerTitle.attr("data-month")&&e.getFullYear()+""===this.$headerTitle.attr("data-year")||this.renderMonth(e)},yearClicked:function(t){this.$wheelsYear.find(".selected").removeClass("selected"),n(t.currentTarget).parent().addClass("selected")}});return p.prototype.getValue=p.prototype.getDate,n.fn.datepicker=function(t){var e,i=Array.prototype.slice.call(arguments,1),a=this.each(function(){var a=n(this),s=a.data("fu.datepicker"),r="object"==typeof t&&t;s||a.data("fu.datepicker",s=new p(this,r)),"string"==typeof t&&(e=s[t].apply(s,i))});return void 0===e?a:e},n.fn.datepicker.defaults={allowPastDates:!1,date:new Date,formatDate:null,momentConfig:{culture:"en",format:"L"},parseDate:null,restricted:[],restrictedText:"Restricted",sameYearOnly:!1},n.fn.datepicker.Constructor=p,n.fn.datepicker.noConflict=function(){return n.fn.datepicker=c,this},n.fn.datepicker});
//# sourceMappingURL=sourcemaps/datepicker.js.map
