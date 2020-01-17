import { Component, Input, SimpleChanges } from '@angular/core';
import { getLocaleDateTimeFormat } from '@angular/common';

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

  viewDays: ViewDay[];
  displayHours = ['1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM',
          '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM',
          '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'];

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
    let roundedStartDate = new Date(roundedStart);
    roundedStartDate.setHours(0);
    roundedStartDate.setMinutes(0);
    roundedStartDate.setSeconds(0);
    let roundedEndDate = new Date(roundedEnd);
    roundedEndDate.setHours(0);
    roundedEndDate.setMinutes(0);
    roundedEndDate.setSeconds(0);

    // Loop through the dates building up the view data
    let dateIter = roundedStartDate;
    let endTime = roundedEndDate.getTime();
    let newViewDays: ViewDay[] = [];

    while (dateIter.getTime() <= endTime) {
      newViewDays.push(new ViewDay(monthNames[dateIter.getMonth()],
          dayOfWeekNames[dateIter.getDay()],
          dateIter.getDate(),
          dateIter.getFullYear()));
      dateIter.setDate(dateIter.getDate() + 1);
    }

    this.viewDays = newViewDays;
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

  constructor(month: string, dayOfWeek: string, dayNumber: number, year: number) {
    this.month = month;
    this.dayOfWeek = dayOfWeek;
    this.dayNumber = dayNumber;
    this.year = year;
  }
}