import { Component, Input, SimpleChanges } from '@angular/core';
import { CalendarSlot } from 'app/calendarData/calendarSlot';


@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  @Input()
  startDate: string;

  @Input()
  endDate: string;

  @Input()
  hourHeight: number;

  @Input()
  slots: CalendarSlot[];

  readonly displayHours = ['', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM',
    '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM',
    '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'];

  viewDays: ViewDay[];

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['startDate'] || changes['endDate']) {
      this.recalculateViewDays();
    }
  }

  // Recalculates data about visible day of week
  recalculateViewDays() {
    // Extract usable start and end date times from input properties
    let roundedStart = Date.parse(this.startDate);
    let roundedEnd = Date.parse(this.endDate);
    if (isNaN(roundedStart)) {
      throw "Invalid startDate value: " + this.startDate;
    }
    if (isNaN(roundedEnd)) {
      throw "Invalid endDate value: " + this.endDate;
    }
    let roundedStartDate = zeroHoursMinSec(new Date(roundedStart));
    let roundedEndDate = zeroHoursMinSec(new Date(roundedEnd));

    // Create a map of dates to slots
    let dayToSlots: Map<number, ViewSlot[]> = new Map();
    for (let slot of this.slots) {
      // TODO: Handle case of multiple day event
      let slotDay = zeroHoursMinSec(slot.startTime);

      // Calculate display offset of the slot
      // TODO: Round time to nearest 15 or 30 min?
      let offsetHours = slot.startTime.getHours() + (slot.startTime.getMinutes() / 60) +
        (slot.startTime.getSeconds() / 3600);
      let offsetPx = offsetHours * this.hourHeight;

      // Calculate display height of the slot
      let heightHours = (slot.endTime.getTime() - slot.startTime.getTime()) / 3600000;
      if (heightHours < .5) {
        heightHours = .5;
      }
      let heightPx = heightHours * this.hourHeight;

      let viewSlot = new ViewSlot(slot, offsetPx, heightPx);
      let slotDays = dayToSlots.get(slotDay.getTime());
      if (!slotDays) {
        slotDays = [];
      }
      slotDays.push(viewSlot);
      dayToSlots.set(slotDay.getTime(), slotDays);
    }

    // Loop through the dates building up the view data
    let dateIter = roundedStartDate;
    let endTime = roundedEndDate.getTime();
    let newViewDays: ViewDay[] = [];

    while (dateIter.getTime() <= endTime) {
      let viewSlots = dayToSlots.get(dateIter.getTime());

      newViewDays.push(new ViewDay(monthNames[dateIter.getMonth()],
          dayOfWeekNames[dateIter.getDay()],
          dateIter.getDate(),
          dateIter.getFullYear(),
          viewSlots));
      dateIter.setDate(dateIter.getDate() + 1);
    }

    this.viewDays = newViewDays;
  }

  // Returns the ngStyle values for a ViewSlot
  getSlotStyles(viewSlot: ViewSlot): Object {
    return {
      top: viewSlot.calcOffset + 'px',
      height: viewSlot.calcHeight + 'px',
      'background-color': viewSlot.calendarSlot.backgroundColor,
      color: viewSlot.calendarSlot.fontColor
    };
  }
}

// Date strings
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];
const dayOfWeekNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

// Data for a day being examined
class ViewDay {
  month: string;
  dayOfWeek: string;
  dayNumber: number;
  year: number;
  viewSlots: ViewSlot[];

  constructor(month: string, dayOfWeek: string, dayNumber: number, year: number, viewSlots: ViewSlot[]) {
    this.month = month;
    this.dayOfWeek = dayOfWeek;
    this.dayNumber = dayNumber;
    this.year = year;
    this.viewSlots = viewSlots;
  }
}

// Data for a slot
// Currently not much besides input CalendarSlot, but a real implementation would need
// some way of knowing how many other concurrent slots there are to size width.
class ViewSlot {
  calendarSlot: CalendarSlot
  calcOffset: number
  calcHeight: number

  constructor(calendarSlot: CalendarSlot, calcOffset: number, calcHeight: number) {
    this.calendarSlot = calendarSlot;
    this.calcOffset = calcOffset;
    this.calcHeight = calcHeight;
  }
}

// Returns a copy of the given date with the hours minutes and seconds zeroed out.
function zeroHoursMinSec(date: Date): Date {
  let d = new Date(date.getTime());
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  return d;
}