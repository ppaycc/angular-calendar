import { ControllerCalendarService } from './../controller-calendar.service';
import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { Observable } from 'rxjs';
import {LoadingService} from '../loading.service';

@Component({
  selector: 'app-main-week-mounth',
  templateUrl: './main-celendar-week.component.html',
  styleUrls: ['./main-celendar-week.component.css']
})
export class MainCelendarWeekComponent implements OnInit {
  public showModal = false;
  public showModalAllEvents = false;
  public eventsForModalAdd = [];
  public date;
  public dataArray;
  public nameOfWeek;
  public curentMounth$: Observable<any>;
  public Week$: Observable<any>;
  public curentWeek = 0;
  public maxWeeks$: Observable<any>;
  public maxWeeks;
  public events: any = {};

  constructor(private clendar: CalendarService,
    private controllerCalendar: ControllerCalendarService,
              private loading: LoadingService) { }

  ngOnInit(): void {
    // непонятный момент, узнать как работает
    this.curentMounth$ = this.controllerCalendar.mounth$;
    this.Week$ = this.controllerCalendar.week$;
    this.curentMounth$.subscribe(() => {
      this.render();
      this.controllerCalendar.setMaxWeek(this.dataArray.length-1);
    });
    this.Week$.subscribe((data) => {
      this.curentWeek = data;
      this.render();
    });
    this.maxWeeks$ = this.controllerCalendar.maxWeeks$;
    this.maxWeeks$.subscribe((maxWeeks) => {
      this.maxWeeks = maxWeeks;
      this.render();
    });
  }

  getEvents(): void{
    const week = this.curentWeek;
    let from: any;
    let to: any;
    for (let i = 0; i < 7; i++){
      if (this.dataArray[week][i].fullDate){
        from = this.dataArray[week][i].fullDate;
        break;
      }
    }
    for (let i = 6; i >= 0; i--){
      if (this.dataArray[week][i].fullDate){
        to = this.dataArray[week][i].fullDate;
        break;
      }
    }
    this.clendar.getEventsBetweenDates({from, to}).subscribe(d => {
      this.convertEvents(d.items);
      // this.loading.removeFetch();
    });
  }
  convertEvents(events): void{
    if(events.length){
      this.events = {};
      for(let i = 0; i < events.length; i++){
        this.events = {
          ...this.events,
          [new Date(events[i].date).getTime()]: this.events[new Date(events[i].date).getTime()] ? [...this.events[new Date(events[i].date).getTime()], events[i]] : [events[i]]
      }
      }
    }
  }
  getDate(date): string{
    return `${new Date(date.fullDate).getTime()}`
  }
  render(): void{
    [this.nameOfWeek, this.dataArray] = this.clendar
    .getArrayOfDatas(this.controllerCalendar.getYear(), this.controllerCalendar.getMounth());
    this.getEvents();
  }
  clickDate(event, data): void{
    event.stopPropagation();
    console.log(event);
    this.date = data;
    this.showModal = true;
  }
  log(event, date){
    event.stopPropagation();
    console.log(date);
  }
  closeModal(): void{
    this.showModal = false;
  }
  openModalAllEvents(event, data): void{
    event.stopPropagation();
    this.eventsForModalAdd = data;
    this.showModalAllEvents = true;
  }
  closeModalAllEvents(): void{
    this.showModalAllEvents = false;
  }
}
