import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CalendarPageComponent } from 'app/calendarPage/calendarPage.component';
import { NotFoundComponent } from 'app/notFound/notFound.component';

import { CalendarComponent } from 'app/calendar/calendar.component';

const appRoutes: Routes = [
  {
    path: 'calendar',
    component: CalendarPageComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '',
    redirectTo: '/calendar',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CalendarPageComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }