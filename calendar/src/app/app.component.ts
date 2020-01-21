import { Component } from '@angular/core';
import { CalendarSlot } from './calendarData/calendarSlot';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calendar';

  slots: CalendarSlot[] = [
    new CalendarSlot(new Date('2019-12-30T09:30:00'), new Date('2019-12-30T10:45:00'),
      'Open slot', 'Click to schedule', 'rgba(0, 150, 255, .50)', 'rgb(0, 70, 120)')
  ];
}
