/**
 * skylark-fuelux - A version of fuelux that ported to running on skylarkjs
 * @author Hudaokeji, Inc.
 * @version v0.9.2
 * @link https://github.com/skylarkui/skylark-fuelux/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx/browser","skylark-domx/eventer","skylark-domx/noder","skylark-domx/geom","skylark-domx/query","./fuelux","skylark-bootstrap3/dropdown"],function(t,e,i,a,s,n,r){var o="moment.js is not available so you cannot use this function",d=[],h=!1,l=n.fn.datepicker,c=!1,u=r.Datepicker=r.WidgetBase.inherit({klassName:"Datepicker",init:function(e,i){this.$element=n(e),this.options=t.mixin({},n.fn.datepicker.defaults,i),this.$calendar=this.$element.find(".datepicker-calendar"),this.$days=this.$calendar.find(".datepicker-calendar-days"),this.$header=this.$calendar.find(".datepicker-calendar-header"),this.$headerTitle=this.$header.find(".title"),this.$input=this.$element.find("input"),this.$inputGroupBtn=this.$element.find(".input-group-btn"),this.$wheels=this.$element.find(".datepicker-wheels"),this.$wheelsMonth=this.$element.find(".datepicker-wheels-month"),this.$wheelsYear=this.$element.find(".datepicker-wheels-year"),this.$dropdown=this.$element.find('[data-toggle="dropdown"]'),this.$dropdown.dropdown(),this.artificialScrolling=!1,this.formatDate=this.options.formatDate||this.formatDate,this.inputValue=null,this.moment=!1,this.momentFormat=null,this.parseDate=this.options.parseDate||this.parseDate,this.preventBlurHide=!1,this.restricted=this.options.restricted||[],this.restrictedParsed=[],this.restrictedText=this.options.restrictedText,this.sameYearOnly=this.options.sameYearOnly,this.selectedDate=null,this.yearRestriction=null,this.$calendar.find(".datepicker-today").on("click.fu.datepicker",t.proxy(this.todayClicked,this)),this.$days.on("click.fu.datepicker","tr td button",t.proxy(this.dateClicked,this)),this.$header.find(".next").on("click.fu.datepicker",t.proxy(this.next,this)),this.$header.find(".prev").on("click.fu.datepicker",t.proxy(this.prev,this)),this.$headerTitle.on("click.fu.datepicker",t.proxy(this.titleClicked,this)),this.$input.on("change.fu.datepicker",t.proxy(this.inputChanged,this)),this.$input.on("mousedown.fu.datepicker",t.proxy(this.showDropdown,this)),this.$inputGroupBtn.on("hidden.bs.dropdown",t.proxy(this.hide,this)),this.$inputGroupBtn.on("shown.bs.dropdown",t.proxy(this.show,this)),this.$wheels.find(".datepicker-wheels-back").on("click.fu.datepicker",t.proxy(this.backClicked,this)),this.$wheels.find(".datepicker-wheels-select").on("click.fu.datepicker",t.proxy(this.selectClicked,this)),this.$wheelsMonth.on("click.fu.datepicker","ul button",t.proxy(this.monthClicked,this)),this.$wheelsYear.on("click.fu.datepicker","ul button",t.proxy(this.yearClicked,this)),this.$wheelsYear.find("ul").on("scroll.fu.datepicker",t.proxy(this.onYearScroll,this)),this.$element.on("click.fu.datepicker.data-api",".datepicker input",function(t){t.stopPropagation()}),this.$element.on("click.fu.datepicker.data-api",".datepicker .dropdown-menu",function(t){var e=n(t.target);e.is(".datepicker-date")&&!e.closest(".restricted").length||t.stopPropagation()});var a=function(){this.checkForMomentJS()&&(h=h||window.moment,this.moment=!0,this.momentFormat=this.options.momentConfig.format,this.setCulture(this.options.momentConfig.culture),h.locale=h.locale||h.lang),this.setRestrictedDates(this.restricted),this.setDate(this.options.date)||(this.$input.val(""),this.inputValue=this.$input.val()),this.sameYearOnly&&(this.yearRestriction=this.selectedDate?this.selectedDate.getFullYear():(new Date).getFullYear())};c?a.call(this):d.push({init:a,scope:this})},backClicked:function(){this.changeView("calendar")},changeView:function(t,e){"wheels"===t?(this.$calendar.hide().attr("aria-hidden","true"),this.$wheels.show().removeAttr("aria-hidden",""),e&&this.renderWheel(e)):(this.$wheels.hide().attr("aria-hidden","true"),this.$calendar.show().removeAttr("aria-hidden",""),e&&this.renderMonth(e))},checkForMomentJS:function(){return!(!(n.isFunction(window.moment)||void 0!==h&&n.isFunction(h))||!n.isPlainObject(this.options.momentConfig)||"string"!=typeof this.options.momentConfig.culture||"string"!=typeof this.options.momentConfig.format)},dateClicked:function(t){var e,i=n(t.currentTarget).parents("td").first();i.hasClass("restricted")||(this.$days.find("td.selected").removeClass("selected"),i.addClass("selected"),e=new Date(i.attr("data-year"),i.attr("data-month"),i.attr("data-date")),this.selectedDate=e,this.$input.val(this.formatDate(e)),this.inputValue=this.$input.val(),this.hide(),this.$input.focus(),this.$element.trigger("dateClicked.fu.datepicker",e))},destroy:function(){return this.$element.remove(),this.$days.find("tbody").empty(),this.$wheelsYear.find("ul").empty(),this.$element[0].outerHTML},disable:function(){this.$element.addClass("disabled"),this.$element.find("input, button").attr("disabled","disabled"),this.$inputGroupBtn.removeClass("open")},enable:function(){this.$element.removeClass("disabled"),this.$element.find("input, button").removeAttr("disabled")},formatDate:function(t){var e=function(t){var e="0"+t;return e.substr(e.length-2)};return this.moment?h(t).format(this.momentFormat):e(t.getMonth()+1)+"/"+e(t.getDate())+"/"+t.getFullYear()},getCulture:function(){if(this.moment)return h.locale();throw o},getDate:function(){return this.selectedDate?this.selectedDate:new Date(NaN)},getFormat:function(){if(this.moment)return this.momentFormat;throw o},getFormattedDate:function(){return this.selectedDate?this.formatDate(this.selectedDate):"Invalid Date"},getRestrictedDates:function(){return this.restricted},inputChanged:function(){var t,e=this.$input.val();e!==this.inputValue&&(null===(t=this.setDate(e))?this.$element.trigger("inputParsingFailed.fu.datepicker",e):!1===t?this.$element.trigger("inputRestrictedDate.fu.datepicker",t):this.$element.trigger("changed.fu.datepicker",t))},show:function(){var t=this.selectedDate?this.selectedDate:new Date;this.changeView("calendar",t),this.$inputGroupBtn.addClass("open"),this.$element.trigger("shown.fu.datepicker")},showDropdown:function(t){this.$input.is(":focus")||this.$inputGroupBtn.hasClass("open")||this.show()},hide:function(){this.$inputGroupBtn.removeClass("open"),this.$element.trigger("hidden.fu.datepicker")},hideDropdown:function(){this.hide()},isInvalidDate:function(t){var e=t.toString();return"Invalid Date"===e||"NaN"===e},isRestricted:function(t,e,i){var a,s,n,r,o=this.restrictedParsed;if(this.sameYearOnly&&null!==this.yearRestriction&&i!==this.yearRestriction)return!0;for(a=0,n=o.length;a<n;a++)if(s=o[a].from,r=o[a].to,(i>s.year||i===s.year&&e>s.month||i===s.year&&e===s.month&&t>=s.date)&&(i<r.year||i===r.year&&e<r.month||i===r.year&&e===r.month&&t<=r.date))return!0;return!1},monthClicked:function(t){this.$wheelsMonth.find(".selected").removeClass("selected"),n(t.currentTarget).parent().addClass("selected")},next:function(){var t=this.$headerTitle.attr("data-month"),e=this.$headerTitle.attr("data-year");if(++t>11){if(this.sameYearOnly)return;t=0,e++}this.renderMonth(new Date(e,t,1))},onYearScroll:function(t){if(!this.artificialScrolling){var e,i,a=n(t.currentTarget),s="border-box"===a.css("box-sizing")?a.outerHeight():a.height(),r=a.get(0).scrollHeight,o=a.scrollTop(),d=s/(r-o)*100;if(o/r*100<5){for(e=(i=parseInt(a.find("li:first").attr("data-year"),10))-1;e>i-11;e--)a.prepend('<li data-year="'+e+'"><button type="button">'+e+"</button></li>");this.artificialScrolling=!0,a.scrollTop(a.get(0).scrollHeight-r+o),this.artificialScrolling=!1}else if(d>90)for(e=(i=parseInt(a.find("li:last").attr("data-year"),10))+1;e<i+11;e++)a.append('<li data-year="'+e+'"><button type="button">'+e+"</button></li>")}},parseDate:function(t){var e,i,a,s,n,r,o=this,d=new Date(NaN);if(t){if(this.moment)return a=function(t){var e=h(t,o.momentFormat);return!0===e.isValid()?e.toDate():d},i=function(t){var e=h(new Date(t));return!0===e.isValid()?e.toDate():d},s=function(t,e,i){var a=e(t);return o.isInvalidDate(a)?(a=i(t),o.isInvalidDate(a)?d:a):a},"string"==typeof t?s(t,a,i):s(t,i,a);if("string"==typeof t){if(e=new Date(Date.parse(t)),!this.isInvalidDate(e))return e;if(t=t.split("T")[0],(r=/^\s*(\d{4})-(\d\d)-(\d\d)\s*$/.exec(t))&&(n=parseInt(r[2],10))===(e=new Date(r[1],n-1,r[3])).getMonth()+1)return e}else if(e=new Date(t),!this.isInvalidDate(e))return e}return new Date(NaN)},prev:function(){var t=this.$headerTitle.attr("data-month"),e=this.$headerTitle.attr("data-year");if(--t<0){if(this.sameYearOnly)return;t=11,e--}this.renderMonth(new Date(e,t,1))},renderMonth:function(t){t=t||new Date;var e,i,a,s,r,o,d,h,l,c,u,p=new Date(t.getFullYear(),t.getMonth(),1).getDay(),f=new Date(t.getFullYear(),t.getMonth()+1,0).getDate(),m=new Date(t.getFullYear(),t.getMonth(),0).getDate(),g=this.$headerTitle.find(".month"),y=t.getMonth(),$=new Date,k=$.getDate(),w=$.getMonth(),D=$.getFullYear(),C=this.selectedDate,v=this.$days.find("tbody"),b=t.getFullYear();for(C&&(C={date:C.getDate(),month:C.getMonth(),year:C.getFullYear()}),g.find(".current").removeClass("current"),g.find('span[data-month="'+y+'"]').addClass("current"),this.$headerTitle.find(".year").text(b),this.$headerTitle.attr({"data-month":y,"data-year":b}),v.empty(),0!==p?(e=m-p+1,d=-1):(e=1,d=0),o=f<=35-p?5:6,s=0;s<o;s++){for(u=n("<tr></tr>"),r=0;r<7;r++)c=n("<td></td>"),-1===d?(c.addClass("last-month"),h!==d&&c.addClass("first")):1===d&&(c.addClass("next-month"),h!==d&&c.addClass("first")),a=b,(i=y+d)<0?(i=11,a--):i>11&&(i=0,a++),c.attr({"data-date":e,"data-month":i,"data-year":a}),a===D&&i===w&&e===k?c.addClass("current-day"):(a<D||a===D&&i<w||a===D&&i===w&&e<k)&&(c.addClass("past"),this.options.allowPastDates||c.addClass("restricted").attr("title",this.restrictedText)),this.isRestricted(e,i,a)&&c.addClass("restricted").attr("title",this.restrictedText),C&&a===C.year&&i===C.month&&e===C.date&&c.addClass("selected"),c.hasClass("restricted")?c.html('<span><b class="datepicker-date">'+e+"</b></span>"):c.html('<span><button type="button" class="datepicker-date">'+e+"</button></span>"),e++,l=h,h=d,-1===d&&e>m?(e=1,l!==(d=0)&&c.addClass("last")):0===d&&e>f&&(e=1,l!==(d=1)&&c.addClass("last")),s===o-1&&6===r&&c.addClass("last"),u.append(c);v.append(u)}},renderWheel:function(t){var e,i,a,s=t.getMonth(),n=this.$wheelsMonth.find("ul"),r=t.getFullYear(),o=this.$wheelsYear.find("ul");for(this.sameYearOnly?(this.$wheelsMonth.addClass("full"),this.$wheelsYear.addClass("hidden")):(this.$wheelsMonth.removeClass("full"),this.$wheelsYear.removeClass("hide hidden")),n.find(".selected").removeClass("selected"),(i=n.find('li[data-month="'+s+'"]')).addClass("selected"),n.scrollTop(n.scrollTop()+(i.position().top-n.outerHeight()/2-i.outerHeight(!0)/2)),o.empty(),e=r-10;e<r+11;e++)o.append('<li data-year="'+e+'"><button type="button">'+e+"</button></li>");(a=o.find('li[data-year="'+r+'"]')).addClass("selected"),this.artificialScrolling=!0,o.scrollTop(o.scrollTop()+(a.position().top-o.outerHeight()/2-a.outerHeight(!0)/2)),this.artificialScrolling=!1,i.find("button").focus()},selectClicked:function(){var t=this.$wheelsMonth.find(".selected").attr("data-month"),e=this.$wheelsYear.find(".selected").attr("data-year");this.changeView("calendar",new Date(e,t,1))},setCulture:function(t){if(!t)return!1;if(!this.moment)throw o;h.locale(t)},setDate:function(t){var e=this.parseDate(t);return this.isInvalidDate(e)?(this.selectedDate=null,this.renderMonth()):this.isRestricted(e.getDate(),e.getMonth(),e.getFullYear())?(this.selectedDate=!1,this.renderMonth()):(this.selectedDate=e,this.renderMonth(e),this.$input.val(this.formatDate(e))),this.inputValue=this.$input.val(),this.selectedDate},setFormat:function(t){if(!t)return!1;if(!this.moment)throw o;this.momentFormat=t},setRestrictedDates:function(t){var e,i,a=[],s=this,n=function(t){return t===-1/0?{date:-1/0,month:-1/0,year:-1/0}:t===1/0?{date:1/0,month:1/0,year:1/0}:{date:(t=s.parseDate(t)).getDate(),month:t.getMonth(),year:t.getFullYear()}};for(this.restricted=t,e=0,i=t.length;e<i;e++)a.push({from:n(t[e].from),to:n(t[e].to)});this.restrictedParsed=a},titleClicked:function(t){this.changeView("wheels",new Date(this.$headerTitle.attr("data-year"),this.$headerTitle.attr("data-month"),1))},todayClicked:function(t){var e=new Date;e.getMonth()+""===this.$headerTitle.attr("data-month")&&e.getFullYear()+""===this.$headerTitle.attr("data-year")||this.renderMonth(e)},yearClicked:function(t){this.$wheelsYear.find(".selected").removeClass("selected"),n(t.currentTarget).parent().addClass("selected")}});return u.prototype.getValue=u.prototype.getDate,n.fn.datepicker=function(t){var e,i=Array.prototype.slice.call(arguments,1),a=this.each(function(){var a=n(this),s=a.data("fu.datepicker"),r="object"==typeof t&&t;s||a.data("fu.datepicker",s=new u(this,r)),"string"==typeof t&&(e=s[t].apply(s,i))});return void 0===e?a:e},n.fn.datepicker.defaults={allowPastDates:!1,date:new Date,formatDate:null,momentConfig:{culture:"en",format:"L"},parseDate:null,restricted:[],restrictedText:"Restricted",sameYearOnly:!1},n.fn.datepicker.Constructor=u,n.fn.datepicker.noConflict=function(){return n.fn.datepicker=l,this},n.fn.datepicker});
//# sourceMappingURL=sourcemaps/datepicker.js.map
