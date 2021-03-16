import { InterseptorService } from './interseptor.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CalendarService } from './calendar.service';
import { MiniCalendarComponent } from './mini-calendar/mini-calendar.component';
import { HeaderComponent } from './header/header.component';
import { MainCelendarWeekComponent } from './main-celendar-week/main-celendar-week.component';
import { MainCelendarMounthComponent } from './main-celendar-mounth/main-celendar-mounth.component';
import { ControllerCalendarService } from './controller-calendar.service';
import { ModalAddComponent } from './modal-add/modal-add.component';
import { EventItemComponent } from './event-item/event-item.component';
import { ModalAllEventsComponent } from './modal-all-events/modal-all-events.component';
import { LoadingComponent } from './loading/loading.component';
import { LoadingService } from './loading.service';

const routes = [
  {path: 'mounth', component: MainCelendarMounthComponent},
  {path: 'week', component: MainCelendarWeekComponent},
  { path: '',   redirectTo: '/mounth', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    MiniCalendarComponent,
    HeaderComponent,
    MainCelendarWeekComponent,
    MainCelendarMounthComponent,
    ModalAddComponent,
    EventItemComponent,
    ModalAllEventsComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CalendarService, 
    ControllerCalendarService, 
    LoadingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterseptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
