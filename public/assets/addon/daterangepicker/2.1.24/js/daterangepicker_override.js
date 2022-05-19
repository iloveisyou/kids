// Follow the UMD template
// Browser globals
if (window.daterangepicker) {    
    window.daterangepicker.prototype.isVaild = function() {
        if(typeof this.valid == 'undefined') {
            this.valid = false;
        }
        return this.valid;
    };    
	
		window.daterangepicker.prototype.updateElement = function () {        
        if (this.element.is('input') && !this.singleDatePicker && this.autoUpdateInput) {
            this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
            this.element.trigger('change');
        } else if (this.element.is('input') && this.autoUpdateInput) {
            this.element.val(this.startDate.format(this.locale.format));
            this.element.trigger('change');
        }
        if (this.element.is('input') && !this.singleDatePicker && !this.autoUpdateInput && this.isVaild()) {
            this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
            this.element.trigger('change');
        } else if (this.element.is('input') && !this.autoUpdateInput && this.isVaild()) {
            this.element.val(this.startDate.format(this.locale.format));
            this.element.trigger('change');
        }        
    };

    window.daterangepicker.prototype.setDate = function(date) {
        this.setStartDate(date);
        this.setEndDate(date);
    };

    window.daterangepicker.prototype.setStartDate = function(startDate) {
        if (typeof startDate === 'string')
            this.startDate = moment(startDate, this.locale.format);

        if (typeof startDate === 'object')
            this.startDate = moment(startDate);

        if (!this.timePicker)
            this.startDate = this.startDate.startOf('day');

        if (this.timePicker && this.timePickerIncrement)
            this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);

        if (this.minDate && this.startDate.isBefore(this.minDate)) {
            this.startDate = this.minDate.clone();
            if (this.timePicker && this.timePickerIncrement)
                this.startDate.minute(Math.round(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
        }

        if (this.maxDate && this.startDate.isAfter(this.maxDate)) {
            this.startDate = this.maxDate.clone();
            if (this.timePicker && this.timePickerIncrement)
                this.startDate.minute(Math.floor(this.startDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);
        }

        this.valid = true;
        if (!this.isShowing)
            this.updateElement();

        this.updateMonthsInView();
    };

    window.daterangepicker.prototype.setEndDate = function(endDate) {
        if (typeof endDate === 'string')
            this.endDate = moment(endDate, this.locale.format);

        if (typeof endDate === 'object')
            this.endDate = moment(endDate);

        if (!this.timePicker)
            this.endDate = this.endDate.endOf('day');

        if (this.timePicker && this.timePickerIncrement)
            this.endDate.minute(Math.round(this.endDate.minute() / this.timePickerIncrement) * this.timePickerIncrement);

        if (this.endDate.isBefore(this.startDate))
            this.endDate = this.startDate.clone();

        if (this.maxDate && this.endDate.isAfter(this.maxDate))
            this.endDate = this.maxDate.clone();

        if (this.dateLimit && this.startDate.clone().add(this.dateLimit).isBefore(this.endDate))
            this.endDate = this.startDate.clone().add(this.dateLimit);

        this.previousRightTime = this.endDate.clone();
        this.valid = true;
        if (!this.isShowing)
            this.updateElement();

        this.updateMonthsInView();
    };

    window.daterangepicker.prototype.renderCalendar = function (side) {
        
        //overrided...
				var isSameM = ( this.startDate.format('YYYY-MM') == this.endDate.format('YYYY-MM') );
				
				var calendar = side == 'left' ? this.leftCalendar : this.rightCalendar;
        var month = calendar.month.month();
        var year = calendar.month.year();
        var hour = calendar.month.hour();
        var minute = calendar.month.minute();
        var second = calendar.month.second();
        var daysInMonth = moment([year, month]).daysInMonth();
        var firstDay = moment([year, month, 1]);
        var lastDay = moment([year, month, daysInMonth]);
        var lastMonth = moment(firstDay).subtract(1, 'month').month();
        var lastYear = moment(firstDay).subtract(1, 'month').year();
        var daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
        var dayOfWeek = firstDay.day();

        var calendar = [];
        calendar.firstDay = firstDay;
        calendar.lastDay = lastDay;

        for (var i = 0; i < 6; i++) {
            calendar[i] = [];
        }

        //populate the calendar with date objects
        var startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
        if (startDay > daysInLastMonth)
            startDay -= 7;

        if (dayOfWeek == this.locale.firstDay)
            startDay = daysInLastMonth - 6;

        var curDate = moment([lastYear, lastMonth, startDay, 12, minute, second]);

        var col, row;
        for (var i = 0, col = 0, row = 0; i < 42; i++ , col++ , curDate = moment(curDate).add(24, 'hour')) {
            if (i > 0 && col % 7 === 0) {
                col = 0;
                row++;
            }
            calendar[row][col] = curDate.clone().hour(hour).minute(minute).second(second);
            curDate.hour(12);

            if (this.minDate && calendar[row][col].format('YYYY-MM-DD') == this.minDate.format('YYYY-MM-DD') && calendar[row][col].isBefore(this.minDate) && side == 'left') {
                calendar[row][col] = this.minDate.clone();
            }

            if (this.maxDate && calendar[row][col].format('YYYY-MM-DD') == this.maxDate.format('YYYY-MM-DD') && calendar[row][col].isAfter(this.maxDate) && side == 'right') {
                calendar[row][col] = this.maxDate.clone();
            }

        }

        //make the calendar object available to hoverDate/clickDate
        if (side == 'left') {
            this.leftCalendar.calendar = calendar;
        } else {
            this.rightCalendar.calendar = calendar;
        }

        //
        // Display the calendar
        //

        var minDate = side == 'left' ? this.minDate : this.startDate;
        var maxDate = this.maxDate;
        var selected = side == 'left' ? this.startDate : this.endDate;
        var arrow = this.locale.direction == 'ltr' ? { left: 'chevron-left', right: 'chevron-right' } : { left: 'chevron-right', right: 'chevron-left' };

        var html = '<table class="table-condensed">';
        html += '<thead>';
        html += '<tr>';

        // add empty cell for week number
        if (this.showWeekNumbers || this.showISOWeekNumbers)
            html += '<th></th>';

        if ((!minDate || minDate.isBefore(calendar.firstDay)) && (!this.linkedCalendars || side == 'left')) {
            html += '<th class="prev available"><i class="fa fa-' + arrow.left + ' glyphicon glyphicon-' + arrow.left + '"></i></th>';
        } else {
            html += '<th></th>';
        }

        var dateHtml = calendar[1][1].format("YYYY ") + this.locale.monthNames[calendar[1][1].month()];

        if (this.showDropdowns) {
            var currentMonth = calendar[1][1].month();
            var currentYear = calendar[1][1].year();
            var maxYear = (maxDate && maxDate.year()) || (currentYear + 50);
            var minYear = (minDate && minDate.year()) || (currentYear - 10);
            var inMinYear = currentYear == minYear;
            var inMaxYear = currentYear == maxYear;

            var monthHtml = '<select class="monthselect">';
            for (var m = 0; m < 12; m++) {
                if ((!inMinYear || m >= minDate.month()) && (!inMaxYear || m <= maxDate.month())) {
                    monthHtml += "<option value='" + m + "'" +
                        (m === currentMonth ? " selected='selected'" : "") +
                        ">" + this.locale.monthNames[m] + "</option>";
                } else {
                    monthHtml += "<option value='" + m + "'" +
                        (m === currentMonth ? " selected='selected'" : "") +
                        " disabled='disabled'>" + this.locale.monthNames[m] + "</option>";
                }
            }
            monthHtml += "</select>";

            var yearHtml = '<select class="yearselect">';
            for (var y = minYear; y <= maxYear; y++) {
                yearHtml += '<option value="' + y + '"' +
                    (y === currentYear ? ' selected="selected"' : '') +
                    '>' + y + '</option>';
            }
            yearHtml += '</select>';

            dateHtml = yearHtml + monthHtml;
        }

        html += '<th colspan="5" class="month">' + dateHtml + '</th>';
        if ((!maxDate || maxDate.isAfter(calendar.lastDay)) && (!this.linkedCalendars || side == 'right' || this.singleDatePicker)) {
            html += '<th class="next available"><i class="fa fa-' + arrow.right + ' glyphicon glyphicon-' + arrow.right + '"></i></th>';
        } else {
            html += '<th></th>';
        }

        html += '</tr>';
        html += '<tr>';

        // add week number label
        if (this.showWeekNumbers || this.showISOWeekNumbers)
            html += '<th class="week">' + this.locale.weekLabel + '</th>';

        $.each(this.locale.daysOfWeek, function (index, dayOfWeek) {
            html += '<th>' + dayOfWeek + '</th>';
        });

        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';

        //adjust maxDate to reflect the dateLimit setting in order to
        //grey out end dates beyond the dateLimit
        if (this.endDate == null && this.dateLimit) {
            var maxLimit = this.startDate.clone().add(this.dateLimit).endOf('day');
            if (!maxDate || maxLimit.isBefore(maxDate)) {
                maxDate = maxLimit;
            }
        }

        for (var row = 0; row < 6; row++) {
            html += '<tr>';

            // add week number
            if (this.showWeekNumbers)
                html += '<td class="week">' + calendar[row][0].week() + '</td>';
            else if (this.showISOWeekNumbers)
                html += '<td class="week">' + calendar[row][0].isoWeek() + '</td>';

            for (var col = 0; col < 7; col++) {

                var classes = [];

                //highlight today's date
                if (calendar[row][col].isSame(new Date(), "day"))
                    classes.push('today');

                //highlight weekends
                if (calendar[row][col].isoWeekday() > 5)
                    classes.push('weekend');

                //grey out the dates in other months displayed at beginning and end of this calendar
                if (calendar[row][col].month() != calendar[1][1].month())
                    classes.push('off');

                //don't allow selection of dates before the minimum date
                if (this.minDate && calendar[row][col].isBefore(this.minDate, 'day'))
                    classes.push('off', 'disabled');

                //don't allow selection of dates after the maximum date
                if (maxDate && calendar[row][col].isAfter(maxDate, 'day'))
                    classes.push('off', 'disabled');

                //don't allow selection of date if a custom function decides it's invalid
                if (this.isInvalidDate(calendar[row][col]))
                    classes.push('off', 'disabled');

                //highlight the currently selected start date
                if(!isSameM || (isSameM && side=='left')) {
                	if (calendar[row][col].format('YYYY-MM-DD') == this.startDate.format('YYYY-MM-DD'))
                    classes.push('active', 'start-date');
								}
								
                //highlight the currently selected end date
                if(!isSameM || (isSameM && side=='right')) {
                	if (this.endDate != null && calendar[row][col].format('YYYY-MM-DD') == this.endDate.format('YYYY-MM-DD'))
                    classes.push('active', 'end-date');
								}

                //highlight dates in-between the selected dates
                if(!isSameM) {
                	if (this.endDate != null && calendar[row][col] > this.startDate && calendar[row][col] < this.endDate)
                  	  classes.push('in-range');
								}

                //apply custom classes for this date
                var isCustom = this.isCustomDate(calendar[row][col]);
                if (isCustom !== false) {
                    if (typeof isCustom === 'string')
                        classes.push(isCustom);
                    else
                        Array.prototype.push.apply(classes, isCustom);
                }

                var cname = '', disabled = false;
                for (var i = 0; i < classes.length; i++) {
                    cname += classes[i] + ' ';
                    if (classes[i] == 'disabled')
                        disabled = true;
                }
                if (!disabled)
                    cname += 'available';

                html += '<td class="' + cname.replace(/^\s+|\s+$/g, '') + '" data-title="' + 'r' + row + 'c' + col + '">' + calendar[row][col].date() + '</td>';

            }
            html += '</tr>';
        }

        html += '</tbody>';
        html += '</table>';

        this.container.find('.calendar.' + side + ' .calendar-table').html(html);
    };

    window.daterangepicker.prototype.elementChanged = function () {
        if (!this.element.is('input')) return;
        this.valid = false;        
        if (!this.element.val().length) return;
        var ds = this.element.val().replace(/[^0-9]/g, "");
        var ft = this.locale.format.replace(/[^A-z]/g, "");
        if (ds.length < ft.length) return;

        if (this.singleDatePicker || ds.length < ft.length*2){
            start = moment(ds.substring(0,ft.length), this.locale.format);
            end = start;
        } else if(ds.length >= ft.length*2) {
            start = moment(ds.substring(0,ft.length), this.locale.format);
            end = moment(ds.substring(ft.length,ft.length*2), this.locale.format);
        }

        if (!start.isValid() || !end.isValid()) return;
        this.valid = true;
        this.setStartDate(start);
        this.setEndDate(end);
        this.updateView();
    };
	
    window.daterangepicker.prototype.keydown = function (e) {
        if ((e.keyCode === 9) || (e.keyCode === 13)) 
            this.hide();
        else 
            this.show();
    };
    
    window.daterangepicker.prototype.clickDate = function (e) {

	      if (!$(e.target).hasClass('available')) return;
	
	      var title = $(e.target).attr('data-title');
	      var row = title.substr(1, 1);
	      var col = title.substr(3, 1);
	      var cal = $(e.target).parents('.calendar');
	      var date = cal.hasClass('left') ? this.leftCalendar.calendar[row][col] : this.rightCalendar.calendar[row][col];
	
	      //
	      // this function needs to do a few things:
	      // * alternate between selecting a start and end date for the range,
	      // * if the time picker is enabled, apply the hour/minute/second from the select boxes to the clicked date
	      // * if autoapply is enabled, and an end date was chosen, apply the selection
	      // * if single date picker mode, and time picker isn't enabled, apply the selection immediately
	      // * if one of the inputs above the calendars was focused, cancel that manual input
	      //
	
	      if (this.endDate || date.isBefore(this.startDate, 'day')) { //picking start
	          if (this.timePicker) {
	              var hour = parseInt(this.container.find('.left .hourselect').val(), 10);
	              if (!this.timePicker24Hour) {
	                  var ampm = this.container.find('.left .ampmselect').val();
	                  if (ampm === 'PM' && hour < 12)
	                      hour += 12;
	                  if (ampm === 'AM' && hour === 12)
	                      hour = 0;
	              }
	              var minute = parseInt(this.container.find('.left .minuteselect').val(), 10);
	              var second = this.timePickerSeconds ? parseInt(this.container.find('.left .secondselect').val(), 10) : 0;
	              date = date.clone().hour(hour).minute(minute).second(second);
	          }
	          // overrided.
	          if(cal.hasClass('left')) {
	          	this.setStartDate(date.clone());
	          }
	          else {
	          	this.setEndDate(date.clone());
	          }
	          
	      } else if (!this.endDate && date.isBefore(this.startDate)) {
	          //special case: clicking the same date for start/end,
	          //but the time of the end date is before the start date
	          this.setEndDate(this.startDate.clone());
	      } else { // picking end
	          if (this.timePicker) {
	              var hour = parseInt(this.container.find('.right .hourselect').val(), 10);
	              if (!this.timePicker24Hour) {
	                  var ampm = this.container.find('.right .ampmselect').val();
	                  if (ampm === 'PM' && hour < 12)
	                      hour += 12;
	                  if (ampm === 'AM' && hour === 12)
	                      hour = 0;
	              }
	              var minute = parseInt(this.container.find('.right .minuteselect').val(), 10);
	              var second = this.timePickerSeconds ? parseInt(this.container.find('.right .secondselect').val(), 10) : 0;
	              date = date.clone().hour(hour).minute(minute).second(second);
	          }
	          this.setEndDate(date.clone());
	          if (this.autoApply) {
	            this.calculateChosenLabel();
	            this.clickApply();
	          }
	      }
	
	      if (this.singleDatePicker) {
	          this.setEndDate(this.startDate);
	          if (!this.timePicker)
	              this.clickApply();
	      }
	
	      this.updateView();
	
	      //This is to cancel the blur event handler if the mouse was in one of the inputs
	      e.stopPropagation();
	
	  }
	  
	  window.daterangepicker.prototype.updateMonthsInView = function () {
				
        if (this.endDate) {

	          //if both dates are visible already, do nothing
	          // overrided.. 
	          /*
	          if (!this.singleDatePicker && this.leftCalendar.month && this.rightCalendar.month &&
	              (this.startDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.startDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
	              &&
	              (this.endDate.format('YYYY-MM') == this.leftCalendar.month.format('YYYY-MM') || this.endDate.format('YYYY-MM') == this.rightCalendar.month.format('YYYY-MM'))
	              ) {
	              return;
	          }
						*/
	          this.leftCalendar.month = this.startDate.clone().date(2);
	          if (!this.linkedCalendars && (this.endDate.month() != this.startDate.month() || this.endDate.year() != this.startDate.year())) {
	              this.rightCalendar.month = this.endDate.clone().date(2);
	          } else {
	              this.rightCalendar.month = this.endDate.clone().date(2);
	              
	              // isSameMonth = true option overrided...
	              if(this.startDate.format('YYYY-MM') < this.endDate.format('YYYY-MM') ) 
	              	this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
	              	
	              // isSameMonth = true option overrided...
	              else if( typeof this.element.data().isSameMonth !=='undefined' && !this.element.data().isSameMonth )
	              	this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');	              	
	              
	          }
	
	      } else {
	          if (this.leftCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM') && this.rightCalendar.month.format('YYYY-MM') != this.startDate.format('YYYY-MM')) {
	              this.leftCalendar.month = this.startDate.clone().date(2);
	              this.rightCalendar.month = this.startDate.clone().date(2);
	              
	              // isSameMonth = true option overrided...
	              if(this.startDate.format('YYYY-MM') < this.endDate.format('YYYY-MM') ) 
	              	this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');
	              
	              // isSameMonth = true option overrided...
	              else if( typeof this.element.data().isSameMonth !=='undefined' && !this.element.data().isSameMonth )
	              	this.rightCalendar.month = this.startDate.clone().date(2).add(1, 'month');	              	
	          }
	      }
	      if (this.maxDate && this.linkedCalendars && !this.singleDatePicker && this.rightCalendar.month > this.maxDate) {
	        this.rightCalendar.month = this.maxDate.clone().date(2);
	        this.leftCalendar.month = this.maxDate.clone().date(2).subtract(1, 'month');
	      }
    };
    
    window.daterangepicker.prototype.hoverDate = function (e) {
    	// overrided.
    };
    
    window.daterangepicker.prototype.clickApply = function(e) {
        this.valid = true;
        
        var agt = navigator.userAgent.toLowerCase(); 
        if (agt.indexOf("chrome") != -1) this.element.focus();

        this.hide();
        
        this.element.trigger('apply.daterangepicker', this);
        
        
    };

    window.daterangepicker.prototype.clickCancel = function (e) {
        this.startDate = this.oldStartDate;
        this.endDate = this.oldEndDate;
        // overrided.
        var agt = navigator.userAgent.toLowerCase(); 
        if (agt.indexOf("chrome") != -1) this.element.focus();
            
        this.hide();            
        
        // overrided.
        //this.element.trigger('cancel.daterangepicker', this);
    };  
    
    window.daterangepicker.prototype.show = function (e) {
            //if (this.isShowing) return;
            
            // overrided
            if (this.isShowing || this.element[0].disabled ) return;

            // Create a click proxy that is private to this instance of datepicker, for unbinding
            this._outsideClickProxy = $.proxy(function(e) { this.outsideClick(e); }, this);

            // Bind global datepicker mousedown for hiding and
            $(document)
              .on('mousedown.daterangepicker', this._outsideClickProxy)
              // also support mobile devices
              .on('touchend.daterangepicker', this._outsideClickProxy)
              // also explicitly play nice with Bootstrap dropdowns, which stopPropagation when clicking them
              .on('click.daterangepicker', '[data-toggle=dropdown]', this._outsideClickProxy)
              // and also close when focus changes to outside the picker (eg. tabbing between controls)
              .on('focusin.daterangepicker', this._outsideClickProxy);

            // Reposition the picker if the window is resized while it's open
            $(window).on('resize.daterangepicker', $.proxy(function(e) { this.move(e); }, this));

            this.oldStartDate = this.startDate.clone();
            this.oldEndDate = this.endDate.clone();
            this.previousRightTime = this.endDate.clone();

            this.updateView();
            this.container.show();
            this.move();
            this.element.trigger('show.daterangepicker', this);
            this.isShowing = true;
        }     	    
    
}