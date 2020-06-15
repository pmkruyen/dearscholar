import $ from 'dom7';
import Utils from '../../utils/utils';
import Framework7Class from '../../utils/class';

class Calendar extends Framework7Class {
  constructor(app, params = {}) {
    super(params, [app]);
    const calendar = this;

    calendar.params = Utils.extend({}, app.params.calendar, params);

    let $containerEl;
    if (calendar.params.containerEl) {
      $containerEl = $(calendar.params.containerEl);
      if ($containerEl.length === 0) return calendar;
    }

    let $inputEl;
    if (calendar.params.inputEl) {
      $inputEl = $(calendar.params.inputEl);
    }

    const isHorizontal = calendar.params.direction === 'horizontal';

    let inverter = 1;
    if (isHorizontal) {
      inverter = app.rtl ? -1 : 1;
    }

    Utils.extend(calendar, {
      app,
      $containerEl,
      containerEl: $containerEl && $containerEl[0],
      inline: $containerEl && $containerEl.length > 0,
      $inputEl,
      inputEl: $inputEl && $inputEl[0],
      initialized: false,
      opened: false,
      url: calendar.params.url,
      isHorizontal,
      inverter,
      animating: false,
      hasTimePicker: calendar.params.timePicker && !calendar.params.rangePicker && !calendar.params.multiple,
    });
    calendar.dayFormatter = new Intl.DateTimeFormat(calendar.params.locale, { day: 'numeric' });
    calendar.monthFormatter = new Intl.DateTimeFormat(calendar.params.locale, { month: 'long' });
    calendar.yearFormatter = new Intl.DateTimeFormat(calendar.params.locale, { year: 'numeric' });
    calendar.timeSelectorFormatter = new Intl.DateTimeFormat(calendar.params.locale, calendar.params.timePickerFormat);

    // Auto names
    let { monthNames, monthNamesShort, dayNames, dayNamesShort } = calendar.params;
    const { monthNamesIntl, monthNamesShortIntl, dayNamesIntl, dayNamesShortIntl } = calendar.getIntlNames();
    if (monthNames === 'auto') monthNames = monthNamesIntl;
    if (monthNamesShort === 'auto') monthNamesShort = monthNamesShortIntl;
    if (dayNames === 'auto') dayNames = dayNamesIntl;
    if (dayNamesShort === 'auto') dayNamesShort = dayNamesShortIntl;

    Utils.extend(calendar, {
      monthNames,
      monthNamesShort,
      dayNames,
      dayNamesShort,
    });

    function onInputClick() {
      calendar.open();
    }
    function onInputFocus(e) {
      e.preventDefault();
    }
    function onInputClear() {
      calendar.setValue([]);
      if (calendar.opened) {
        calendar.update();
      }
    }
    function onHtmlClick(e) {
      const $targetEl = $(e.target);
      if (calendar.destroyed || !calendar.params) return;
      if (calendar.isPopover()) return;
      if (!calendar.opened || calendar.closing) return;
      if ($targetEl.closest('[class*="backdrop"]').length) return;
      if ($inputEl && $inputEl.length > 0) {
        if ($targetEl[0] !== $inputEl[0] && $targetEl.closest('.sheet-modal, .calendar-modal').length === 0) {
          calendar.close();
        }
      } else if ($(e.target).closest('.sheet-modal, .calendar-modal').length === 0) {
        calendar.close();
      }
    }

    // Events
    Utils.extend(calendar, {
      attachInputEvents() {
        calendar.$inputEl.on('click', onInputClick);
        calendar.$inputEl.on('input:clear', onInputClear);
        if (calendar.params.inputReadOnly) {
          calendar.$inputEl.on('focus mousedown', onInputFocus);
        }
      },
      detachInputEvents() {
        calendar.$inputEl.off('click', onInputClick);
        calendar.$inputEl.off('input:clear', onInputClear);
        if (calendar.params.inputReadOnly) {
          calendar.$inputEl.off('focus mousedown', onInputFocus);
        }
      },
      attachHtmlEvents() {
        app.on('click', onHtmlClick);
      },
      detachHtmlEvents() {
        app.off('click', onHtmlClick);
      },
    });
    calendar.attachCalendarEvents = function attachCalendarEvents() {
      let allowItemClick = true;
      let isTouched;
      let isMoved;
      let touchStartX;
      let touchStartY;
      let touchCurrentX;
      let touchCurrentY;
      let touchStartTime;
      let touchEndTime;
      let currentTranslate;
      let wrapperWidth;
      let wrapperHeight;
      let percentage;
      let touchesDiff;
      let isScrolling;

      const { $el, $wrapperEl } = calendar;

      function handleTouchStart(e) {
        if (isMoved || isTouched) return;
        isTouched = true;
        touchStartX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        touchCurrentX = touchStartX;
        touchStartY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        touchCurrentY = touchStartY;
        touchStartTime = (new Date()).getTime();
        percentage = 0;
        allowItemClick = true;
        isScrolling = undefined;
        currentTranslate = calendar.monthsTranslate;
      }
      function handleTouchMove(e) {
        if (!isTouched) return;
        const { isHorizontal: isH } = calendar;

        touchCurrentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
        touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        if (typeof isScrolling === 'undefined') {
          isScrolling = !!(isScrolling || Math.abs(touchCurrentY - touchStartY) > Math.abs(touchCurrentX - touchStartX));
        }
        if (isH && isScrolling) {
          isTouched = false;
          return;
        }
        e.preventDefault();
        if (calendar.animating) {
          isTouched = false;
          return;
        }
        allowItemClick = false;
        if (!isMoved) {
          // First move
          isMoved = true;
          wrapperWidth = $wrapperEl[0].offsetWidth;
          wrapperHeight = $wrapperEl[0].offsetHeight;
          $wrapperEl.transition(0);
        }

        touchesDiff = isH ? touchCurrentX - touchStartX : touchCurrentY - touchStartY;
        percentage = touchesDiff / (isH ? wrapperWidth : wrapperHeight);
        currentTranslate = ((calendar.monthsTranslate * calendar.inverter) + percentage) * 100;

        // Transform wrapper
        $wrapperEl.transform(`translate3d(${isH ? currentTranslate : 0}%, ${isH ? 0 : currentTranslate}%, 0)`);
      }
      function handleTouchEnd() {
        if (!isTouched || !isMoved) {
          isTouched = false;
          isMoved = false;
          return;
        }
        isTouched = false;
        isMoved = false;

        touchEndTime = new Date().getTime();
        if (touchEndTime - touchStartTime < 300) {
          if (Math.abs(touchesDiff) < 10) {
            calendar.resetMonth();
          } else if (touchesDiff >= 10) {
            if (app.rtl) calendar.nextMonth();
            else calendar.prevMonth();
          } else if (app.rtl) calendar.prevMonth();
          else calendar.nextMonth();
        } else if (percentage <= -0.5) {
          if (app.rtl) calendar.prevMonth();
          else calendar.nextMonth();
        } else if (percentage >= 0.5) {
          if (app.rtl) calendar.nextMonth();
          else calendar.prevMonth();
        } else {
          calendar.resetMonth();
        }

        // Allow click
        setTimeout(() => {
          allowItemClick = true;
        }, 100);
      }

      function handleDayClick(e) {
        if (!allowItemClick) return;
        let $dayEl = $(e.target).parents('.calendar-day');
        if ($dayEl.length === 0 && $(e.target).hasClass('calendar-day')) {
          $dayEl = $(e.target);
        }
        if ($dayEl.length === 0) return;
        if ($dayEl.hasClass('calendar-day-disabled')) return;
        if (!calendar.params.rangePicker) {
          if ($dayEl.hasClass('calendar-day-next')) calendar.nextMonth();
          if ($dayEl.hasClass('calendar-day-prev')) calendar.prevMonth();
        }
        const dateYear = parseInt($dayEl.attr('data-year'), 10);
        const dateMonth = parseInt($dayEl.attr('data-month'), 10);
        const dateDay = parseInt($dayEl.attr('data-day'), 10);
        calendar.emit(
          'local::dayClick calendarDayClick',
          calendar,
          $dayEl[0],
          dateYear,
          dateMonth,
          dateDay
        );
        if (!$dayEl.hasClass('calendar-day-selected') || calendar.params.multiple || calendar.params.rangePicker) {
          const valueToAdd = new Date(dateYear, dateMonth, dateDay, 0, 0, 0);
          if (calendar.hasTimePicker) {
            if (calendar.value && calendar.value[0]) {
              valueToAdd.setHours(calendar.value[0].getHours(), calendar.value[0].getMinutes());
            } else {
              valueToAdd.setHours(new Date().getHours(), new Date().getMinutes());
            }
          }
          calendar.addValue(valueToAdd);
        }
        if (calendar.params.closeOnSelect) {
          if (
            (calendar.params.rangePicker && calendar.value.length === 2)
            || !calendar.params.rangePicker
          ) {
            calendar.close();
          }
        }
      }

      function onNextMonthClick() {
        calendar.nextMonth();
      }

      function onPrevMonthClick() {
        calendar.prevMonth();
      }

      function onNextYearClick() {
        calendar.nextYear();
      }

      function onPrevYearClick() {
        calendar.prevYear();
      }

      function onMonthSelectorClick() {
        $el.append(calendar.renderMonthPicker());
      }
      function onMonthSelectorItemClick() {
        const $clickedEl = $(this);
        if ($clickedEl.hasClass('calendar-month-picker-item-current')) {
          $el.find('.calendar-month-picker').remove();
          return;
        }
        $el.find('.calendar-month-picker-item-current').add($clickedEl).toggleClass('calendar-month-picker-item-current');
        const index = $clickedEl.index();
        const localeMonthIndex = parseInt(calendar.$el.find('.calendar-month-current').attr('data-locale-month'), 10);
        const monthIndex = calendar.currentMonth;
        const diff = localeMonthIndex - monthIndex;
        const diffIndex = index - diff;
        calendar.setYearMonth(calendar.currentYear, diffIndex, 0);
        setTimeout(() => {
          $el.find('.calendar-month-picker').remove();
        }, 200);
      }

      function onYearSelectorClick() {
        $el.append(calendar.renderYearPicker());
        const $currentEl = $el.find('.calendar-year-picker-item-current');
        const $yearPickerEl = $el.find('.calendar-year-picker');
        if (!$currentEl || !$currentEl.length) return;
        $yearPickerEl.scrollTop(
          $currentEl[0].offsetTop
          - $yearPickerEl[0].offsetHeight / 2
          + $currentEl[0].offsetHeight / 2
        );
      }

      function onYearSelectorItemClick() {
        const $clickedEl = $(this);
        if ($clickedEl.hasClass('calendar-year-picker-item-current')) {
          $el.find('.calendar-year-picker').remove();
          return;
        }
        $el.find('.calendar-year-picker-item-current').add($clickedEl).toggleClass('calendar-year-picker-item-current');
        const year = parseInt($clickedEl.attr('data-year'), 10);
        calendar.setYearMonth(year, undefined, 0);
        setTimeout(() => {
          $el.find('.calendar-year-picker').remove();
        }, 200);
      }

      function onTimeSelectorClick() {
        calendar.openTimePicker();
      }
      function onTimePickerCloseClick() {
        calendar.closeTimePicker();
      }

      const passiveListener = app.touchEvents.start === 'touchstart' && app.support.passiveListener ? { passive: true, capture: false } : false;
      // Selectors clicks
      $el.find('.calendar-prev-month-button').on('click', onPrevMonthClick);
      $el.find('.calendar-next-month-button').on('click', onNextMonthClick);
      $el.find('.calendar-prev-year-button').on('click', onPrevYearClick);
      $el.find('.calendar-next-year-button').on('click', onNextYearClick);
      if (calendar.params.monthPicker) {
        $el.find('.current-month-value').on('click', onMonthSelectorClick);
        $el.on('click', '.calendar-month-picker-item', onMonthSelectorItemClick);
      }
      if (calendar.params.yearPicker) {
        $el.find('.current-year-value').on('click', onYearSelectorClick);
        $el.on('click', '.calendar-year-picker-item', onYearSelectorItemClick);
      }
      if (calendar.hasTimePicker) {
        $el.find('.calendar-time-selector a').on('click', onTimeSelectorClick);
        $el.on('click', '.calendar-time-picker-close', onTimePickerCloseClick);
      }
      // Day clicks
      $wrapperEl.on('click', handleDayClick);
      // Touch events
      if (calendar.params.touchMove) {
        $wrapperEl.on(app.touchEvents.start, handleTouchStart, passiveListener);
        app.on('touchmove:active', handleTouchMove);
        app.on('touchend:passive', handleTouchEnd);
      }

      calendar.detachCalendarEvents = function detachCalendarEvents() {
        $el.find('.calendar-prev-month-button').off('click', onPrevMonthClick);
        $el.find('.calendar-next-month-button').off('click', onNextMonthClick);
        $el.find('.calendar-prev-year-button').off('click', onPrevYearClick);
        $el.find('.calendar-next-year-button').off('click', onNextYearClick);
        if (calendar.params.monthPicker) {
          $el.find('.current-month-value').off('click', onMonthSelectorClick);
          $el.off('click', '.calendar-month-picker-item', onMonthSelectorItemClick);
        }
        if (calendar.params.yearPicker) {
          $el.find('.current-year-value').off('click', onYearSelectorClick);
          $el.off('click', '.calendar-year-picker-item', onYearSelectorItemClick);
        }
        if (calendar.hasTimePicker) {
          $el.find('.calendar-time-selector a').off('click', onTimeSelectorClick);
          $el.off('click', '.calendar-time-picker-close', onTimePickerCloseClick);
        }
        $wrapperEl.off('click', handleDayClick);
        if (calendar.params.touchMove) {
          $wrapperEl.off(app.touchEvents.start, handleTouchStart, passiveListener);
          app.off('touchmove:active', handleTouchMove);
          app.off('touchend:passive', handleTouchEnd);
        }
      };
    };

    calendar.init();

    return calendar;
  }

  get view() {
    const { $inputEl, app, params } = this;
    let view;
    if (params.view) {
      view = params.view;
    } else if ($inputEl) {
      view = $inputEl.parents('.view').length && $inputEl.parents('.view')[0].f7View;
    }
    if (!view) view = app.views.main;
    return view;
  }

  getIntlNames() {
    const calendar = this;
    const locale = calendar.params.locale;

    const monthNamesIntl = [];
    const monthNamesShortIntl = [];
    const dayNamesIntl = [];
    const dayNamesShortIntl = [];
    const formatterMonthNames = new Intl.DateTimeFormat(locale, { month: 'long' });
    const formatterMonthNamesShort = new Intl.DateTimeFormat(locale, { month: 'short' });
    const formatterDayNames = new Intl.DateTimeFormat(locale, { weekday: 'long' });
    const formatterDayNamesShort = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    let year;
    let yearStarted;
    let yearEnded;
    for (let i = 0; i < 24; i += 1) {
      const date = new Date().setMonth(i, 1);
      const currentYear = calendar.yearFormatter.format(date);

      if (year && currentYear !== year) {
        if (yearStarted) yearEnded = true;
        yearStarted = true;
        year = currentYear;
      }
      if (!year) {
        year = currentYear;
      }
      if (yearStarted && year === currentYear && !yearEnded) {
        monthNamesIntl.push(formatterMonthNames.format(date));
        monthNamesShortIntl.push(formatterMonthNamesShort.format(date));
      }
    }
    const weekDay = new Date().getDay();
    for (let i = 0; i < 7; i += 1) {
      const date = new Date().getTime() + (i - weekDay) * 24 * 60 * 60 * 1000;
      dayNamesIntl.push(formatterDayNames.format(date));
      dayNamesShortIntl.push(formatterDayNamesShort.format(date));
    }

    return {
      monthNamesIntl,
      monthNamesShortIntl,
      dayNamesIntl,
      dayNamesShortIntl,
    };
  }

  normalizeDate(date) {
    const calendar = this;
    const d = new Date(date);
    if (calendar.hasTimePicker) {
      return new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes());
    }
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  normalizeValues(values) {
    const calendar = this;
    let newValues = [];
    if (values && Array.isArray(values)) {
      newValues = values.map(val => calendar.normalizeDate(val));
    }
    return newValues;
  }

  initInput() {
    const calendar = this;
    if (!calendar.$inputEl) return;
    if (calendar.params.inputReadOnly) calendar.$inputEl.prop('readOnly', true);
  }

  isPopover() {
    const calendar = this;
    const { app, modal, params } = calendar;
    if (params.openIn === 'sheet') return false;
    if (modal && modal.type !== 'popover') return false;

    if (!calendar.inline && calendar.inputEl) {
      if (params.openIn === 'popover') return true;
      if (app.device.ios) {
        return !!app.device.ipad;
      }
      if (app.width >= 768) {
        return true;
      }
      if (app.device.desktop && app.theme === 'aurora') {
        return true;
      }
    }
    return false;
  }

  formatDate(d) {
    const calendar = this;
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth();
    const month1 = month + 1;
    const day = date.getDate();
    const weekDay = date.getDay();
    const { monthNames, monthNamesShort, dayNames, dayNamesShort } = calendar;
    const { dateFormat, locale } = calendar.params;

    function twoDigits(number) {
      return (number < 10) ? `0${number}` : number;
    }
    if (typeof dateFormat === 'string') {
      const tokens = {
        yyyy: year,
        yy: String(year).substring(2),
        mm: twoDigits(month1),
        m: month1,
        MM: monthNames[month],
        M: monthNamesShort[month],
        dd: twoDigits(day),
        d: day,
        DD: dayNames[weekDay],
        D: dayNamesShort[weekDay],
      };
      if (calendar.params.timePicker) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        let hours12 = hours;
        if (hours > 12) hours12 = hours - 12;
        if (hours === 0) hours12 = 12;
        const a = hours >= 12 && hours !== 0 ? 'pm' : 'am';

        Object.assign(tokens, {
          HH: twoDigits(hours),
          H: hours,
          hh: twoDigits(hours12),
          h: hours12,
          ss: twoDigits(seconds),
          s: seconds,
          ':mm': twoDigits(minutes),
          ':m': minutes,
          a,
          A: a.toUpperCase(),
        });
      }
      const regexp = new RegExp(
        Object.keys(tokens).map(t => `(${t})`).join('|'),
        'g',
      );
      return dateFormat.replace(regexp, (token) => {
        if (token in tokens) return tokens[token];
        return token;
      });
    }
    if (typeof dateFormat === 'function') {
      return dateFormat(date);
    }
    // Intl Object
    const formatter = new Intl.DateTimeFormat(locale, dateFormat);
    return formatter.format(date);
  }

  formatValue() {
    const calendar = this;
    const { value } = calendar;
    if (calendar.params.formatValue) {
      return calendar.params.formatValue.call(calendar, value);
    }
    return value
      .map(v => calendar.formatDate(v))
      .join(calendar.params.rangePicker ? ' - ' : ', ');
  }

  addValue(newValue) {
    const calendar = this;
    const { multiple, rangePicker, rangePickerMinDays, rangePickerMaxDays } = calendar.params;
    if (multiple) {
      if (!calendar.value) calendar.value = [];
      let inValuesIndex;
      for (let i = 0; i < calendar.value.length; i += 1) {
        if (new Date(newValue).getTime() === new Date(calendar.value[i]).getTime()) {
          inValuesIndex = i;
        }
      }
      if (typeof inValuesIndex === 'undefined') {
        calendar.value.push(newValue);
      } else {
        calendar.value.splice(inValuesIndex, 1);
      }
      calendar.updateValue();
    } else if (rangePicker) {
      if (!calendar.value) calendar.value = [];
      if (calendar.value.length === 2 || calendar.value.length === 0) {
        calendar.value = [];
      }

      if ((calendar.value.length === 0
        || ((Math.abs(calendar.value[0].getTime() - newValue.getTime()) >= (rangePickerMinDays - 1) * 60 * 60 * 24 * 1000) && (rangePickerMaxDays === 0 || Math.abs(calendar.value[0].getTime() - newValue.getTime()) <= (rangePickerMaxDays - 1) * 60 * 60 * 24 * 1000)))) calendar.value.push(newValue);
      else calendar.value = [];

      calendar.value.sort((a, b) => a - b);
      calendar.updateValue();
    } else {
      calendar.value = [newValue];
      calendar.updateValue();
    }
  }

  setValue(values) {
    const calendar = this;
    const currentValue = calendar.value;
    if (Array.isArray(currentValue) && Array.isArray(values) && currentValue.length === values.length) {
      let equal = true;
      currentValue.forEach((v, index) => {
        if (v !== values[index]) equal = false;
      });
      if (equal) return;
    }
    calendar.value = values;
    calendar.updateValue();
  }

  getValue() {
    const calendar = this;
    return calendar.value;
  }

  updateValue(onlyHeader) {
    const calendar = this;
    const {
      $el,
      $wrapperEl,
      $inputEl,
      value,
      params,
    } = calendar;
    let i;
    if ($el && $el.length > 0) {
      $wrapperEl.find('.calendar-day-selected').removeClass('calendar-day-selected');
      let valueDate;
      if (params.rangePicker && value.length === 2) {
        for (i = new Date(value[0]).getTime(); i <= new Date(value[1]).getTime(); i += 24 * 60 * 60 * 1000) {
          valueDate = new Date(i);
          $wrapperEl.find(`.calendar-day[data-date="${valueDate.getFullYear()}-${valueDate.getMonth()}-${valueDate.getDate()}"]`).addClass('calendar-day-selected');
        }
      } else {
        for (i = 0; i < calendar.value.length; i += 1) {
          valueDate = new Date(value[i]);
          $wrapperEl.find(`.calendar-day[data-date="${valueDate.getFullYear()}-${valueDate.getMonth()}-${valueDate.getDate()}"]`).addClass('calendar-day-selected');
        }
      }
    }
    if (!onlyHeader) {
      calendar.emit('local::change calendarChange', calendar, value);
    }

    if ($el && $el.length > 0 && calendar.hasTimePicker) {
      $el.find('.calendar-time-selector a').text(value && value.length ? calendar.timeSelectorFormatter.format(value[0]) : calendar.params.timePickerPlaceholder);
    }

    if (($inputEl && $inputEl.length) || params.header) {
      const inputValue = calendar.formatValue(value);
      if (params.header && $el && $el.length) {
        $el.find('.calendar-selected-date').text(inputValue);
      }
      if ($inputEl && $inputEl.length && !onlyHeader) {
        $inputEl.val(inputValue);
        $inputEl.trigger('change');
      }
    }
  }

  updateCurrentMonthYear(dir) {
    const calendar = this;
    const { $months, $el, monthNames } = calendar;
    let currentLocaleMonth;
    let currentLocaleYear;
    if (typeof dir === 'undefined') {
      calendar.currentMonth = parseInt($months.eq(1).attr('data-month'), 10);
      calendar.currentYear = parseInt($months.eq(1).attr('data-year'), 10);
      currentLocaleMonth = $months.eq(1).attr('data-locale-month');
      currentLocaleYear = $months.eq(1).attr('data-locale-year');
    } else {
      calendar.currentMonth = parseInt($months.eq(dir === 'next' ? ($months.length - 1) : 0).attr('data-month'), 10);
      calendar.currentYear = parseInt($months.eq(dir === 'next' ? ($months.length - 1) : 0).attr('data-year'), 10);
      currentLocaleMonth = $months.eq(dir === 'next' ? ($months.length - 1) : 0).attr('data-locale-month');
      currentLocaleYear = $months.eq(dir === 'next' ? ($months.length - 1) : 0).attr('data-locale-year');
    }
    $el.find('.current-month-value').text(monthNames[currentLocaleMonth]);
    $el.find('.current-year-value').text(currentLocaleYear);
  }

  update() {
    const calendar = this;
    const { currentYear, currentMonth, $wrapperEl } = calendar;
    const currentDate = new Date(currentYear, currentMonth);
    const prevMonthHtml = calendar.renderMonth(currentDate, 'prev');
    const currentMonthHtml = calendar.renderMonth(currentDate);
    const nextMonthHtml = calendar.renderMonth(currentDate, 'next');

    $wrapperEl
      .transition(0)
      .html(`${prevMonthHtml}${currentMonthHtml}${nextMonthHtml}`)
      .transform('translate3d(0,0,0)');
    calendar.$months = $wrapperEl.find('.calendar-month');
    calendar.monthsTranslate = 0;
    calendar.setMonthsTranslate();
    calendar.$months.each((index, monthEl) => {
      calendar.emit(
        'local::monthAdd calendarMonthAdd',
        monthEl
      );
    });
  }

  onMonthChangeStart(dir) {
    const calendar = this;
    const { $months, currentYear, currentMonth } = calendar;
    calendar.updateCurrentMonthYear(dir);
    $months.removeClass('calendar-month-current calendar-month-prev calendar-month-next');
    const currentIndex = dir === 'next' ? $months.length - 1 : 0;

    $months.eq(currentIndex).addClass('calendar-month-current');
    $months.eq(dir === 'next' ? currentIndex - 1 : currentIndex + 1).addClass(dir === 'next' ? 'calendar-month-prev' : 'calendar-month-next');

    calendar.emit(
      'local::monthYearChangeStart calendarMonthYearChangeStart',
      calendar,
      currentYear,
      currentMonth
    );
  }

  onMonthChangeEnd(dir, rebuildBoth) {
    const calendar = this;
    const { currentYear, currentMonth, $wrapperEl, monthsTranslate } = calendar;
    calendar.animating = false;
    let nextMonthHtml;
    let prevMonthHtml;
    let currentMonthHtml;
    $wrapperEl
      .find('.calendar-month:not(.calendar-month-prev):not(.calendar-month-current):not(.calendar-month-next)')
      .remove();

    if (typeof dir === 'undefined') {
      dir = 'next'; // eslint-disable-line
      rebuildBoth = true; // eslint-disable-line
    }
    if (!rebuildBoth) {
      currentMonthHtml = calendar.renderMonth(new Date(currentYear, currentMonth), dir);
    } else {
      $wrapperEl.find('.calendar-month-next, .calendar-month-prev').remove();
      prevMonthHtml = calendar.renderMonth(new Date(currentYear, currentMonth), 'prev');
      nextMonthHtml = calendar.renderMonth(new Date(currentYear, currentMonth), 'next');
    }
    if (dir === 'next' || rebuildBoth) {
      $wrapperEl.append(currentMonthHtml || nextMonthHtml);
    }
    if (dir === 'prev' || rebuildBoth) {
      $wrapperEl.prepend(currentMonthHtml || prevMonthHtml);
    }
    const $months = $wrapperEl.find('.calendar-month');
    calendar.$months = $months;
    calendar.setMonthsTranslate(monthsTranslate);
    calendar.emit(
      'local::monthAdd calendarMonthAdd',
      calendar,
      dir === 'next' ? $months.eq($months.length - 1)[0] : $months.eq(0)[0]
    );
    calendar.emit(
      'local::monthYearChangeEnd calendarMonthYearChangeEnd',
      calendar,
      currentYear,
      currentMonth
    );
  }

  setMonthsTranslate(translate) {
    const calendar = this;
    const { $months, isHorizontal: isH, inverter } = calendar;
    // eslint-disable-next-line
    translate = translate || calendar.monthsTranslate || 0;
    if (typeof calendar.monthsTranslate === 'undefined') {
      calendar.monthsTranslate = translate;
    }
    $months.removeClass('calendar-month-current calendar-month-prev calendar-month-next');
    const prevMonthTranslate = -(translate + 1) * 100 * inverter;
    const currentMonthTranslate = -translate * 100 * inverter;
    const nextMonthTranslate = -(translate - 1) * 100 * inverter;
    $months.eq(0)
      .transform(`translate3d(${isH ? prevMonthTranslate : 0}%, ${isH ? 0 : prevMonthTranslate}%, 0)`)
      .addClass('calendar-month-prev');
    $months.eq(1)
      .transform(`translate3d(${isH ? currentMonthTranslate : 0}%, ${isH ? 0 : currentMonthTranslate}%, 0)`)
      .addClass('calendar-month-current');
    $months.eq(2)
      .transform(`translate3d(${isH ? nextMonthTranslate : 0}%, ${isH ? 0 : nextMonthTranslate}%, 0)`)
      .addClass('calendar-month-next');
  }

  nextMonth(transition) {
    const calendar = this;
    const { params, $wrapperEl, inverter, isHorizontal: isH } = calendar;
    if (typeof transition === 'undefined' || typeof transition === 'object') {
      transition = ''; // eslint-disable-line
      if (!params.animate) transition = 0; // eslint-disable-line
    }
    const nextMonth = parseInt(calendar.$months.eq(calendar.$months.length - 1).attr('data-month'), 10);
    const nextYear = parseInt(calendar.$months.eq(calendar.$months.length - 1).attr('data-year'), 10);
    const nextDate = new Date(nextYear, nextMonth);
    const nextDateTime = nextDate.getTime();
    const transitionEndCallback = !calendar.animating;
    if (params.maxDate) {
      if (nextDateTime > new Date(params.maxDate).getTime()) {
        calendar.resetMonth();
        return;
      }
    }
    calendar.monthsTranslate -= 1;
    if (nextMonth === calendar.currentMonth) {
      const nextMonthTranslate = -(calendar.monthsTranslate) * 100 * inverter;
      const nextMonthHtml = $(calendar.renderMonth(nextDateTime, 'next'))
        .transform(`translate3d(${isH ? nextMonthTranslate : 0}%, ${isH ? 0 : nextMonthTranslate}%, 0)`)
        .addClass('calendar-month-next');
      $wrapperEl.append(nextMonthHtml[0]);
      calendar.$months = $wrapperEl.find('.calendar-month');
      calendar.emit(
        'local::monthAdd calendarMonthAdd',
        calendar.$months.eq(calendar.$months.length - 1)[0]
      );
    }
    calendar.animating = true;
    calendar.onMonthChangeStart('next');
    const translate = (calendar.monthsTranslate * 100) * inverter;

    $wrapperEl.transition(transition).transform(`translate3d(${isH ? translate : 0}%, ${isH ? 0 : translate}%, 0)`);
    if (transitionEndCallback) {
      $wrapperEl.transitionEnd(() => {
        calendar.onMonthChangeEnd('next');
      });
    }
    if (!params.animate) {
      calendar.onMonthChangeEnd('next');
    }
  }

  prevMonth(transition) {
    const calendar = this;
    const { params, $wrapperEl, inverter, isHorizontal: isH } = calendar;
    if (typeof transition === 'undefined' || typeof transition === 'object') {
      transition = ''; // eslint-disable-line
      if (!params.animate) transition = 0; // eslint-disable-line
    }
    const prevMonth = parseInt(calendar.$months.eq(0).attr('data-month'), 10);
    const prevYear = parseInt(calendar.$months.eq(0).attr('data-year'), 10);
    const prevDate = new Date(prevYear, prevMonth + 1, -1);
    const prevDateTime = prevDate.getTime();
    const transitionEndCallback = !calendar.animating;
    if (params.minDate) {
      let minDate = new Date(params.minDate);
      minDate = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
      if (prevDateTime < minDate.getTime()) {
        calendar.resetMonth();
        return;
      }
    }
    calendar.monthsTranslate += 1;
    if (prevMonth === calendar.currentMonth) {
      const prevMonthTranslate = -(calendar.monthsTranslate) * 100 * inverter;
      const prevMonthHtml = $(calendar.renderMonth(prevDateTime, 'prev'))
        .transform(`translate3d(${isH ? prevMonthTranslate : 0}%, ${isH ? 0 : prevMonthTranslate}%, 0)`)
        .addClass('calendar-month-prev');
      $wrapperEl.prepend(prevMonthHtml[0]);
      calendar.$months = $wrapperEl.find('.calendar-month');
      calendar.emit(
        'local::monthAdd calendarMonthAdd',
        calendar.$months.eq(0)[0]
      );
    }
    calendar.animating = true;
    calendar.onMonthChangeStart('prev');
    const translate = (calendar.monthsTranslate * 100) * inverter;
    $wrapperEl
      .transition(transition)
      .transform(`translate3d(${isH ? translate : 0}%, ${isH ? 0 : translate}%, 0)`);
    if (transitionEndCallback) {
      $wrapperEl.transitionEnd(() => {
        calendar.onMonthChangeEnd('prev');
      });
    }
    if (!params.animate) {
      calendar.onMonthChangeEnd('prev');
    }
  }

  resetMonth(transition = '') {
    const calendar = this;
    const { $wrapperEl, inverter, isHorizontal: isH, monthsTranslate } = calendar;
    const translate = (monthsTranslate * 100) * inverter;
    $wrapperEl
      .transition(transition)
      .transform(`translate3d(${isH ? translate : 0}%, ${isH ? 0 : translate}%, 0)`);
  }
  // eslint-disable-next-line
  setYearMonth(year, month, transition) {
    const calendar = this;
    const { params, isHorizontal: isH, $wrapperEl, inverter } = calendar;
    // eslint-disable-next-line
    if (typeof year === 'undefined') year = calendar.currentYear;
    // eslint-disable-next-line
    if (typeof month === 'undefined') month = calendar.currentMonth;
    if (typeof transition === 'undefined' || typeof transition === 'object') {
      // eslint-disable-next-line
      transition = '';
      // eslint-disable-next-line
      if (!params.animate) transition = 0;
    }
    let targetDate;
    if (year < calendar.currentYear) {
      targetDate = new Date(year, month + 1, -1).getTime();
    } else {
      targetDate = new Date(year, month).getTime();
    }
    if (params.maxDate && targetDate > new Date(params.maxDate).getTime()) {
      return false;
    }
    if (params.minDate) {
      let minDate = new Date(params.minDate);
      minDate = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
      if (targetDate < minDate.getTime()) {
        return false;
      }
    }
    const currentDate = new Date(calendar.currentYear, calendar.currentMonth).getTime();
    const dir = targetDate > currentDate ? 'next' : 'prev';
    const newMonthHTML = calendar.renderMonth(new Date(year, month));
    calendar.monthsTranslate = calendar.monthsTranslate || 0;
    const prevTranslate = calendar.monthsTranslate;
    let monthTranslate;
    const transitionEndCallback = !calendar.animating && transition !== 0;
    if (targetDate > currentDate) {
      // To next
      calendar.monthsTranslate -= 1;
      if (!calendar.animating) calendar.$months.eq(calendar.$months.length - 1).remove();
      $wrapperEl.append(newMonthHTML);
      calendar.$months = $wrapperEl.find('.calendar-month');
      monthTranslate = -(prevTranslate - 1) * 100 * inverter;
      calendar.$months
        .eq(calendar.$months.length - 1)
        .transform(`translate3d(${isH ? monthTranslate : 0}%, ${isH ? 0 : monthTranslate}%, 0)`)
        .addClass('calendar-month-next');
    } else {
      // To prev
      calendar.monthsTranslate += 1;
      if (!calendar.animating) calendar.$months.eq(0).remove();
      $wrapperEl.prepend(newMonthHTML);
      calendar.$months = $wrapperEl.find('.calendar-month');
      monthTranslate = -(prevTranslate + 1) * 100 * inverter;
      calendar.$months
        .eq(0)
        .transform(`translate3d(${isH ? monthTranslate : 0}%, ${isH ? 0 : monthTranslate}%, 0)`)
        .addClass('calendar-month-prev');
    }
    calendar.emit(
      'local::monthAdd calendarMonthAdd',
      dir === 'next'
        ? calendar.$months.eq(calendar.$months.length - 1)[0]
        : calendar.$months.eq(0)[0]
    );

    calendar.animating = true;
    calendar.onMonthChangeStart(dir);
    const wrapperTranslate = (calendar.monthsTranslate * 100) * inverter;
    $wrapperEl
      .transition(transition)
      .transform(`translate3d(${isH ? wrapperTranslate : 0}%, ${isH ? 0 : wrapperTranslate}%, 0)`);
    if (transitionEndCallback) {
      $wrapperEl.transitionEnd(() => {
        calendar.onMonthChangeEnd(dir, true);
      });
    }
    if (!params.animate || transition === 0) {
      calendar.onMonthChangeEnd(dir, true);
    }
  }

  nextYear() {
    const calendar = this;
    calendar.setYearMonth(calendar.currentYear + 1);
  }

  prevYear() {
    const calendar = this;
    calendar.setYearMonth(calendar.currentYear - 1);
  }
  // eslint-disable-next-line
  dateInRange(dayDate, range) {
    let match = false;
    let i;
    if (!range) return false;
    if (Array.isArray(range)) {
      for (i = 0; i < range.length; i += 1) {
        if (range[i].from || range[i].to) {
          if (range[i].from && range[i].to) {
            if ((dayDate <= new Date(range[i].to).getTime()) && (dayDate >= new Date(range[i].from).getTime())) {
              match = true;
            }
          } else if (range[i].from) {
            if (dayDate >= new Date(range[i].from).getTime()) {
              match = true;
            }
          } else if (range[i].to) {
            if (dayDate <= new Date(range[i].to).getTime()) {
              match = true;
            }
          }
        } else if (range[i].date) {
          if (dayDate === new Date(range[i].date).getTime()) {
            match = true;
          }
        } else if (dayDate === new Date(range[i]).getTime()) {
          match = true;
        }
      }
    } else if (range.from || range.to) {
      if (range.from && range.to) {
        if ((dayDate <= new Date(range.to).getTime()) && (dayDate >= new Date(range.from).getTime())) {
          match = true;
        }
      } else if (range.from) {
        if (dayDate >= new Date(range.from).getTime()) {
          match = true;
        }
      } else if (range.to) {
        if (dayDate <= new Date(range.to).getTime()) {
          match = true;
        }
      }
    } else if (range.date) {
      match = dayDate === new Date(range.date).getTime();
    } else if (typeof range === 'function') {
      match = range(new Date(dayDate));
    }
    return match;
  }
  // eslint-disable-next-line
  daysInMonth(date) {
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  }

  renderMonths(date) {
    const calendar = this;
    if (calendar.params.renderMonths) {
      return calendar.params.renderMonths.call(calendar, date);
    }
    return `
    <div class="calendar-months-wrapper">
    ${calendar.renderMonth(date, 'prev')}
    ${calendar.renderMonth(date)}
    ${calendar.renderMonth(date, 'next')}
    </div>
  `.trim();
  }

  renderMonth(d, offset) {
    const calendar = this;
    const { params, value } = calendar;
    if (params.renderMonth) {
      return params.renderMonth.call(calendar, d, offset);
    }
    let date = new Date(d);
    let year = date.getFullYear();
    let month = date.getMonth();
    let localeMonth = calendar.monthNames.indexOf(calendar.monthFormatter.format(date));
    if (localeMonth < 0) localeMonth = month;
    let localeYear = calendar.yearFormatter.format(date);

    if (offset === 'next') {
      if (month === 11) date = new Date(year + 1, 0);
      else date = new Date(year, month + 1, 1);
    }
    if (offset === 'prev') {
      if (month === 0) date = new Date(year - 1, 11);
      else date = new Date(year, month - 1, 1);
    }
    if (offset === 'next' || offset === 'prev') {
      month = date.getMonth();
      year = date.getFullYear();
      localeMonth = calendar.monthNames.indexOf(calendar.monthFormatter.format(date));
      if (localeMonth < 0) localeMonth = month;
      localeYear = calendar.yearFormatter.format(date);
    }

    const currentValues = [];
    const today = new Date().setHours(0, 0, 0, 0);
    const minDate = params.minDate ? new Date(params.minDate).getTime() : null;
    const maxDate = params.maxDate ? new Date(params.maxDate).getTime() : null;
    const rows = 6;
    const cols = 7;
    const daysInPrevMonth = calendar.daysInMonth(new Date(date.getFullYear(), date.getMonth()).getTime() - (10 * 24 * 60 * 60 * 1000));
    const daysInMonth = calendar.daysInMonth(date);
    const minDayNumber = params.firstDay === 6 ? 0 : 1;

    let monthHtml = '';
    let dayIndex = 0 + (params.firstDay - 1);
    let disabled;
    let hasEvents;
    let firstDayOfMonthIndex = new Date(date.getFullYear(), date.getMonth()).getDay();
    if (firstDayOfMonthIndex === 0) firstDayOfMonthIndex = 7;

    if (value && value.length) {
      for (let i = 0; i < value.length; i += 1) {
        currentValues.push(new Date(value[i]).setHours(0, 0, 0, 0));
      }
    }

    for (let row = 1; row <= rows; row += 1) {
      let rowHtml = '';
      for (let col = 1; col <= cols; col += 1) {
        dayIndex += 1;
        let dayDate;
        let dayNumber = dayIndex - firstDayOfMonthIndex;
        let addClass = '';
        if (row === 1 && col === 1 && dayNumber > minDayNumber && params.firstDay !== 1) {
          dayIndex -= 7;
          dayNumber = dayIndex - firstDayOfMonthIndex;
        }

        const weekDayIndex = ((col - 1) + params.firstDay > 6)
          ? ((col - 1 - 7) + params.firstDay)
          : ((col - 1) + params.firstDay);

        if (dayNumber < 0) {
          dayNumber = daysInPrevMonth + dayNumber + 1;
          addClass += ' calendar-day-prev';
          dayDate = new Date(month - 1 < 0 ? year - 1 : year, month - 1 < 0 ? 11 : month - 1, dayNumber).getTime();
        } else {
          dayNumber += 1;
          if (dayNumber > daysInMonth) {
            dayNumber -= daysInMonth;
            addClass += ' calendar-day-next';
            dayDate = new Date(month + 1 > 11 ? year + 1 : year, month + 1 > 11 ? 0 : month + 1, dayNumber).getTime();
          } else {
            dayDate = new Date(year, month, dayNumber).getTime();
          }
        }
        // Today
        if (dayDate === today) addClass += ' calendar-day-today';

        // Selected
        if (params.rangePicker && currentValues.length === 2) {
          if (dayDate >= currentValues[0] && dayDate <= currentValues[1]) addClass += ' calendar-day-selected';
        } else if (currentValues.indexOf(dayDate) >= 0) addClass += ' calendar-day-selected';
        // Weekend
        if (params.weekendDays.indexOf(weekDayIndex) >= 0) {
          addClass += ' calendar-day-weekend';
        }
        // Events
        let eventsHtml = '';
        hasEvents = false;
        if (params.events) {
          if (calendar.dateInRange(dayDate, params.events)) {
            hasEvents = true;
          }
        }
        if (hasEvents) {
          addClass += ' calendar-day-has-events';
          eventsHtml = `
            <span class="calendar-day-events">
              <span class="calendar-day-event"></span>
            </span>
          `;
          if (Array.isArray(params.events)) {
            const eventDots = [];
            params.events.forEach((ev) => {
              const color = ev.color || '';
              if (eventDots.indexOf(color) < 0 && calendar.dateInRange(dayDate, ev)) {
                eventDots.push(color);
              }
            });
            eventsHtml = `
              <span class="calendar-day-events">
                ${eventDots.map(color => `
                  <span class="calendar-day-event" style="${color ? `background-color: ${color}` : ''}"></span>
                `.trim()).join('')}
              </span>
            `;
          }
        }
        // Custom Ranges
        if (params.rangesClasses) {
          for (let k = 0; k < params.rangesClasses.length; k += 1) {
            if (calendar.dateInRange(dayDate, params.rangesClasses[k].range)) {
              addClass += ` ${params.rangesClasses[k].cssClass}`;
            }
          }
        }
        // Disabled
        disabled = false;
        if ((minDate && dayDate < minDate) || (maxDate && dayDate > maxDate)) {
          disabled = true;
        }
        if (params.disabled) {
          if (calendar.dateInRange(dayDate, params.disabled)) {
            disabled = true;
          }
        }
        if (disabled) {
          addClass += ' calendar-day-disabled';
        }

        dayDate = new Date(dayDate);
        const dayYear = dayDate.getFullYear();
        const dayMonth = dayDate.getMonth();
        const dayNumberDisplay = calendar.dayFormatter.format(dayDate);
        rowHtml += `
          <div data-year="${dayYear}" data-month="${dayMonth}" data-day="${dayNumber}" class="calendar-day${addClass}" data-date="${dayYear}-${dayMonth}-${dayNumber}">
            <span class="calendar-day-number">${dayNumberDisplay}${eventsHtml}</span>
          </div>`.trim();
      }
      monthHtml += `<div class="calendar-row">${rowHtml}</div>`;
    }
    monthHtml = `<div class="calendar-month" data-year="${year}" data-month="${month}" data-locale-year="${localeYear}" data-locale-month="${localeMonth}">${monthHtml}</div>`;
    return monthHtml;
  }

  renderWeekHeader() {
    const calendar = this;
    if (calendar.params.renderWeekHeader) {
      return calendar.params.renderWeekHeader.call(calendar);
    }
    const { params } = calendar;
    let weekDaysHtml = '';
    for (let i = 0; i < 7; i += 1) {
      const dayIndex = (i + params.firstDay > 6)
        ? ((i - 7) + params.firstDay)
        : (i + params.firstDay);
      const dayName = calendar.dayNamesShort[dayIndex];
      weekDaysHtml += `<div class="calendar-week-day">${dayName}</div>`;
    }
    return `
    <div class="calendar-week-header">
      ${weekDaysHtml}
    </div>
  `.trim();
  }

  renderMonthSelector() {
    const calendar = this;
    if (calendar.params.renderMonthSelector) {
      return calendar.params.renderMonthSelector.call(calendar);
    }

    return `
    <div class="calendar-month-selector">
      <a class="link icon-only calendar-prev-month-button">
        <i class="icon icon-prev"></i>
      </a>
      ${calendar.params.monthPicker ? `
        <a class="current-month-value link"></a>
      ` : `
        <span class="current-month-value"></span>
      `}
      <a class="link icon-only calendar-next-month-button">
        <i class="icon icon-next"></i>
      </a>
    </div>
  `.trim();
  }

  renderMonthPicker() {
    const calendar = this;
    const localeMonth = parseInt(calendar.$el.find('.calendar-month-current').attr('data-locale-month'), 10);
    return `
      <div class="calendar-month-picker">
        ${calendar.monthNames.map((m, index) => `
          <div class="calendar-month-picker-item ${localeMonth === index ? 'calendar-month-picker-item-current' : ''}">
            <span>${m}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderYearSelector() {
    const calendar = this;
    if (calendar.params.renderYearSelector) {
      return calendar.params.renderYearSelector.call(calendar);
    }
    return `
    <div class="calendar-year-selector">
      <a class="link icon-only calendar-prev-year-button">
        <i class="icon icon-prev"></i>
      </a>
      ${calendar.params.yearPicker ? `
        <a class="current-year-value link"></a>
      ` : `
        <span class="current-year-value"></span>
      `}
      <a class="link icon-only calendar-next-year-button">
        <i class="icon icon-next"></i>
      </a>
    </div>
  `.trim();
  }

  renderYearPicker() {
    const calendar = this;
    const currentYear = calendar.currentYear;
    let yearMin = calendar.params.yearPickerMin || new Date().getFullYear() - 100;
    if (calendar.params.minDate) {
      yearMin = Math.max(yearMin, new Date(calendar.params.minDate).getFullYear());
    }
    let yearMax = calendar.params.yearPickerMax || new Date().getFullYear() + 100;
    if (calendar.params.maxDate) {
      yearMax = Math.min(yearMax, new Date(calendar.params.maxDate).getFullYear());
    }
    const years = [];
    for (let i = yearMin; i <= yearMax; i += 1) {
      years.push(i);
    }
    return `
      <div class="calendar-year-picker">
        ${years.map(year => `
          <div data-year="${year}" class="calendar-year-picker-item ${year === currentYear ? 'calendar-year-picker-item-current' : ''}">
            <span>${calendar.yearFormatter.format(new Date().setFullYear(year))}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  // eslint-disable-next-line
  renderTimeSelector() {
    const calendar = this;
    const value = calendar.value && calendar.value[0];
    let timeString;
    if (value) timeString = calendar.timeSelectorFormatter.format(value);
    return `
      <div class="calendar-time-selector"><a class="link">${timeString || calendar.params.timePickerPlaceholder}</a></div>
    `;
  }

  renderHeader() {
    const calendar = this;
    if (calendar.params.renderHeader) {
      return calendar.params.renderHeader.call(calendar);
    }
    return `
    <div class="calendar-header">
      <div class="calendar-selected-date">${calendar.params.headerPlaceholder}</div>
    </div>
  `.trim();
  }

  renderFooter() {
    const calendar = this;
    const app = calendar.app;
    if (calendar.params.renderFooter) {
      return calendar.params.renderFooter.call(calendar);
    }
    return `
    <div class="calendar-footer">
      <a class="${app.theme === 'md' ? 'button' : 'link'} calendar-close sheet-close popover-close">${calendar.params.toolbarCloseText}</a>
    </div>
  `.trim();
  }

  renderToolbar() {
    const calendar = this;
    if (calendar.params.renderToolbar) {
      return calendar.params.renderToolbar.call(calendar, calendar);
    }
    return `
    <div class="toolbar toolbar-top no-shadow">
      <div class="toolbar-inner">
        ${calendar.params.monthSelector ? calendar.renderMonthSelector() : ''}
        ${calendar.params.yearSelector ? calendar.renderYearSelector() : ''}
      </div>
    </div>
  `.trim();
  }
  // eslint-disable-next-line
  renderInline() {
    const calendar = this;
    const { cssClass, toolbar, header, footer, rangePicker, weekHeader } = calendar.params;
    const { value, hasTimePicker } = calendar;
    const date = value && value.length ? value[0] : new Date().setHours(0, 0, 0);
    const inlineHtml = `
    <div class="calendar calendar-inline ${rangePicker ? 'calendar-range' : ''} ${cssClass || ''}">
      ${header ? calendar.renderHeader() : ''}
      ${toolbar ? calendar.renderToolbar() : ''}
      ${weekHeader ? calendar.renderWeekHeader() : ''}
      <div class="calendar-months">
        ${calendar.renderMonths(date)}
      </div>
      ${hasTimePicker ? calendar.renderTimeSelector() : ''}
      ${footer ? calendar.renderFooter() : ''}
    </div>
  `.trim();

    return inlineHtml;
  }

  renderCustomModal() {
    const calendar = this;
    const { cssClass, toolbar, header, footer, rangePicker, weekHeader } = calendar.params;
    const { value, hasTimePicker } = calendar;
    const date = value && value.length ? value[0] : new Date().setHours(0, 0, 0);
    const sheetHtml = `
    <div class="calendar calendar-modal ${rangePicker ? 'calendar-range' : ''} ${cssClass || ''}">
      ${header ? calendar.renderHeader() : ''}
      ${toolbar ? calendar.renderToolbar() : ''}
      ${weekHeader ? calendar.renderWeekHeader() : ''}
      <div class="calendar-months">
        ${calendar.renderMonths(date)}
      </div>
      ${hasTimePicker ? calendar.renderTimeSelector() : ''}
      ${footer ? calendar.renderFooter() : ''}
    </div>
  `.trim();

    return sheetHtml;
  }

  renderSheet() {
    const calendar = this;
    const { cssClass, toolbar, header, footer, rangePicker, weekHeader } = calendar.params;
    const { value, hasTimePicker } = calendar;
    const date = value && value.length ? value[0] : new Date().setHours(0, 0, 0);
    const sheetHtml = `
    <div class="sheet-modal calendar calendar-sheet ${rangePicker ? 'calendar-range' : ''} ${cssClass || ''}">
      ${header ? calendar.renderHeader() : ''}
      ${toolbar ? calendar.renderToolbar() : ''}
      ${weekHeader ? calendar.renderWeekHeader() : ''}
      <div class="sheet-modal-inner calendar-months">
        ${calendar.renderMonths(date)}
      </div>
      ${hasTimePicker ? calendar.renderTimeSelector() : ''}
      ${footer ? calendar.renderFooter() : ''}
    </div>
  `.trim();

    return sheetHtml;
  }

  renderPopover() {
    const calendar = this;
    const { cssClass, toolbar, header, footer, rangePicker, weekHeader } = calendar.params;
    const { value, hasTimePicker } = calendar;
    const date = value && value.length ? value[0] : new Date().setHours(0, 0, 0);
    const popoverHtml = `
    <div class="popover calendar-popover">
      <div class="popover-inner">
        <div class="calendar ${rangePicker ? 'calendar-range' : ''} ${cssClass || ''}">
        ${header ? calendar.renderHeader() : ''}
        ${toolbar ? calendar.renderToolbar() : ''}
        ${weekHeader ? calendar.renderWeekHeader() : ''}
        <div class="calendar-months">
          ${calendar.renderMonths(date)}
        </div>
        ${hasTimePicker ? calendar.renderTimeSelector() : ''}
        ${footer ? calendar.renderFooter() : ''}
        </div>
      </div>
    </div>
  `.trim();

    return popoverHtml;
  }

  render() {
    const calendar = this;
    const { params } = calendar;
    if (params.render) return params.render.call(calendar);
    if (!calendar.inline) {
      let modalType = params.openIn;
      if (modalType === 'auto') modalType = calendar.isPopover() ? 'popover' : 'sheet';

      if (modalType === 'popover') return calendar.renderPopover();
      if (modalType === 'sheet') return calendar.renderSheet();
      return calendar.renderCustomModal();
    }
    return calendar.renderInline();
  }

  openTimePicker() {
    const calendar = this;
    const { $el, app } = calendar;
    if (!$el || !$el.length) return;
    $el.append('<div class="calendar-time-picker"></div>');
    const hoursArr = [];
    const minutesArr = [];
    for (let i = 0; i <= 23; i += 1) { hoursArr.push(i); }
    for (let i = 0; i <= 59; i += 1) { minutesArr.push(i); }
    let value;
    if (calendar.value && calendar.value.length) {
      value = [calendar.value[0].getHours(), calendar.value[0].getMinutes()];
    } else {
      value = [new Date().getHours(), new Date().getMinutes()];
    }
    calendar.timePickerInstance = app.picker.create({
      containerEl: $el.find('.calendar-time-picker'),
      value,
      toolbar: true,
      rotateEffect: false,
      toolbarCloseText: calendar.params.toolbarCloseText,
      cols: [
        {
          values: hoursArr,
        },
        {
          divider: true,
          content: ':',
        },
        {
          values: minutesArr,
          displayValues: minutesArr.map(m => (m < 10 ? `0${m}` : m)),
        },
      ],
    });
    calendar.timePickerInstance.$el.find('.toolbar a').removeClass('sheet-close popover-close').addClass('calendar-time-picker-close');
  }

  closeTimePicker() {
    const calendar = this;
    if (calendar.timePickerInstance) {
      const [hours, minutes] = calendar.timePickerInstance.value.map(v => parseInt(v, 10));
      let value = calendar.value && calendar.value.length && calendar.value[0];
      if (!value) {
        value = new Date();
        value.setHours(hours, minutes, 0, 0);
      } else {
        value = new Date(value);
        value.setHours(hours, minutes);
      }
      calendar.setValue([value]);
      calendar.timePickerInstance.close();
      calendar.timePickerInstance.destroy();
      delete calendar.timePickerInstance;
    }
    if (calendar.$el && calendar.$el.length) {
      calendar.$el.find('.calendar-time-picker').remove();
    }
  }

  onOpen() {
    const calendar = this;
    const { initialized, $el, app, $inputEl, inline, value, params } = calendar;
    calendar.closing = false;
    calendar.opened = true;
    calendar.opening = true;

    // Init main events
    calendar.attachCalendarEvents();

    const updateValue = !value && params.value;

    // Set value
    if (!initialized) {
      if (value) calendar.setValue(value, 0);
      else if (params.value) {
        calendar.setValue(calendar.normalizeValues(params.value), 0);
      }
    } else if (value) {
      calendar.setValue(value, 0);
    }

    // Update current month and year
    calendar.updateCurrentMonthYear();

    // Set initial translate
    calendar.monthsTranslate = 0;
    calendar.setMonthsTranslate();

    // Update input value
    if (updateValue) calendar.updateValue();
    else if (params.header && value) {
      calendar.updateValue(true);
    }

    // Extra focus
    if (!inline && $inputEl && $inputEl.length && app.theme === 'md') {
      $inputEl.trigger('focus');
    }

    calendar.initialized = true;

    calendar.$months.each((index, monthEl) => {
      calendar.emit('local::monthAdd calendarMonthAdd', monthEl);
    });

    // Trigger events
    if ($el) {
      $el.trigger('calendar:open');
    }
    if ($inputEl) {
      $inputEl.trigger('calendar:open');
    }
    calendar.emit('local::open calendarOpen', calendar);
  }

  onOpened() {
    const calendar = this;
    calendar.opening = false;
    if (calendar.$el) {
      calendar.$el.trigger('calendar:opened');
    }
    if (calendar.$inputEl) {
      calendar.$inputEl.trigger('calendar:opened');
    }
    calendar.emit('local::opened calendarOpened', calendar);
  }

  onClose() {
    const calendar = this;
    const app = calendar.app;
    calendar.opening = false;
    calendar.closing = true;

    if (calendar.$inputEl && app.theme === 'md') {
      calendar.$inputEl.trigger('blur');
    }
    if (calendar.detachCalendarEvents) {
      calendar.detachCalendarEvents();
    }

    if (calendar.$el) {
      calendar.$el.trigger('calendar:close');
    }
    if (calendar.$inputEl) {
      calendar.$inputEl.trigger('calendar:close');
    }
    calendar.emit('local::close calendarClose', calendar);
  }

  onClosed() {
    const calendar = this;
    calendar.opened = false;
    calendar.closing = false;

    if (!calendar.inline) {
      Utils.nextTick(() => {
        if (calendar.modal && calendar.modal.el && calendar.modal.destroy) {
          if (!calendar.params.routableModals) {
            calendar.modal.destroy();
          }
        }
        delete calendar.modal;
      });
    }
    if (calendar.timePickerInstance) {
      if (calendar.timePickerInstance.destroy) calendar.timePickerInstance.destroy();
      delete calendar.timePickerInstance;
    }
    if (calendar.$el) {
      calendar.$el.trigger('calendar:closed');
    }
    if (calendar.$inputEl) {
      calendar.$inputEl.trigger('calendar:closed');
    }
    calendar.emit('local::closed calendarClosed', calendar);
  }

  open() {
    const calendar = this;
    const { app, opened, inline, $inputEl, params } = calendar;
    if (opened) return;

    if (inline) {
      calendar.$el = $(calendar.render());
      calendar.$el[0].f7Calendar = calendar;
      calendar.$wrapperEl = calendar.$el.find('.calendar-months-wrapper');
      calendar.$months = calendar.$wrapperEl.find('.calendar-month');
      calendar.$containerEl.append(calendar.$el);
      calendar.onOpen();
      calendar.onOpened();
      return;
    }
    let modalType = params.openIn;
    if (modalType === 'auto') {
      modalType = calendar.isPopover() ? 'popover' : 'sheet';
    }
    const modalContent = calendar.render();

    const modalParams = {
      targetEl: $inputEl,
      scrollToEl: params.scrollToInput ? $inputEl : undefined,
      content: modalContent,
      backdrop: params.backdrop === true || (modalType === 'popover' && app.params.popover.backdrop !== false && params.backdrop !== false),
      closeByBackdropClick: params.closeByBackdropClick,
      on: {
        open() {
          const modal = this;
          calendar.modal = modal;
          calendar.$el = modalType === 'popover' ? modal.$el.find('.calendar') : modal.$el;
          calendar.$wrapperEl = calendar.$el.find('.calendar-months-wrapper');
          calendar.$months = calendar.$wrapperEl.find('.calendar-month');
          calendar.$el[0].f7Calendar = calendar;
          if (modalType === 'customModal') {
            $(calendar.$el).find('.calendar-close').once('click', () => {
              calendar.close();
            });
          }
          calendar.onOpen();
        },
        opened() { calendar.onOpened(); },
        close() { calendar.onClose(); },
        closed() { calendar.onClosed(); },
      },
    };
    if (modalType === 'sheet') {
      modalParams.push = params.sheetPush;
      modalParams.swipeToClose = params.sheetSwipeToClose;
    }
    if (params.routableModals && calendar.view) {
      calendar.view.router.navigate({
        url: calendar.url,
        route: {
          path: calendar.url,
          [modalType]: modalParams,
        },
      });
    } else {
      calendar.modal = app[modalType].create(modalParams);
      calendar.modal.open();
    }
  }

  close() {
    const calendar = this;
    const { opened, inline } = calendar;
    if (!opened) return;
    if (inline) {
      calendar.onClose();
      calendar.onClosed();
      return;
    }
    if (calendar.params.routableModals && calendar.view) {
      calendar.view.router.back();
    } else {
      calendar.modal.close();
    }
  }

  init() {
    const calendar = this;

    calendar.initInput();

    if (calendar.inline) {
      calendar.open();
      calendar.emit('local::init calendarInit', calendar);
      return;
    }

    if (!calendar.initialized && calendar.params.value) {
      calendar.setValue(calendar.normalizeValues(calendar.params.value));
    }

    // Attach input Events
    if (calendar.$inputEl) {
      calendar.attachInputEvents();
    }
    if (calendar.params.closeByOutsideClick) {
      calendar.attachHtmlEvents();
    }
    calendar.emit('local::init calendarInit', calendar);
  }

  destroy() {
    const calendar = this;
    if (calendar.destroyed) return;
    const { $el } = calendar;
    calendar.emit('local::beforeDestroy calendarBeforeDestroy', calendar);
    if ($el) $el.trigger('calendar:beforedestroy');

    calendar.close();

    // Detach Events
    if (calendar.$inputEl) {
      calendar.detachInputEvents();
    }
    if (calendar.params.closeByOutsideClick) {
      calendar.detachHtmlEvents();
    }

    if (calendar.timePickerInstance) {
      if (calendar.timePickerInstance.destroy) calendar.timePickerInstance.destroy();
      delete calendar.timePickerInstance;
    }

    if ($el && $el.length) delete calendar.$el[0].f7Calendar;
    Utils.deleteProps(calendar);
    calendar.destroyed = true;
  }
}

export default Calendar;
