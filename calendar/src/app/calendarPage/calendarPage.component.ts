import { Component } from '@angular/core';
import { CalendarSlot } from 'app/calendarData/calendarSlot';

@Component({
    templateUrl: './calendarPage.component.html',
    styleUrls: ['./calendarPage.component.css']
})
export class CalendarPageComponent {
    readonly slots: CalendarSlot[] = [
        new CalendarSlot(new Date('2019-12-30T09:30:00'), new Date('2019-12-30T10:45:00'),
          'Open slot', 'Click to schedule', 'rgba(0, 150, 255, .60)', 'rgb(0, 70, 120)'),
        new CalendarSlot(new Date('2019-12-30T11:00:00'), new Date('2019-12-30T12:15:00'),
          'Open slot', 'Click to schedule', 'rgba(0, 150, 255, .60)', 'rgb(0, 70, 120)'),
        new CalendarSlot(new Date('2019-12-30T12:30:00'), new Date('2019-12-30T13:45:00'),
          'Open slot', 'Click to schedule', 'rgba(0, 150, 255, .60)', 'rgb(0, 70, 120)'),
        new CalendarSlot(new Date('2019-12-31T09:30:00'), new Date('2019-12-31T10:45:00'),
          'Open slot', 'Click to schedule', 'rgba(0, 150, 255, .60)', 'rgb(0, 70, 120)'),
        new CalendarSlot(new Date('2019-12-31T11:00:00'), new Date('2019-12-31T12:15:00'),
          'Open slot', 'Click to schedule', 'rgba(0, 150, 255, .60)', 'rgb(0, 70, 120)'),
      ];
}