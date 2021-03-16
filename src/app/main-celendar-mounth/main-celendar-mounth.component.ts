import { ControllerCalendarService } from './../controller-calendar.service';
import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { Observable } from 'rxjs';
import {LoadingService} from '../loading.service';

@Component({
  selector: 'app-main-celendar-mounth',
  templateUrl: './main-celendar-mounth.component.html',
  styleUrls: ['./main-celendar-mounth.component.css']
})
export class MainCelendarMounthComponent implements OnInit {
  public showModal = false;
  public showModalAllEvents = false;
  public eventsForModalAdd = [];
  public date;
  public dataArray;
  public nameOfWeek;
  public curentMounth$: Observable<any>;
  public events: any = {};

  constructor(private clendar: CalendarService,
    private controllerCalendar: ControllerCalendarService,
              private loading: LoadingService) { }

  ngOnInit(): void {
    // непонятный момент, узнать как работает
    this.curentMounth$ = this.controllerCalendar.week$;
    this.curentMounth$.subscribe(() => {
      this.render();
    });
  }
  render(): void{
    [this.nameOfWeek, this.dataArray] = this.clendar
    .getArrayOfDatas(this.controllerCalendar.getYear(), this.controllerCalendar.getMounth());
    this.getEvents();
  }
  getEvents(): void{
    let from: any;
    let to: any;
    for (let i = 0; i < this.dataArray[0].length; i++){
      if (this.dataArray[0][i].fullDate){
        from = this.dataArray[0][i].fullDate;
        break;
      }
    }
    for (let i = this.dataArray[this.dataArray.length-1].length-1; i >= 0; i--){
      if (this.dataArray[this.dataArray.length-1][i].fullDate){
        to = this.dataArray[this.dataArray.length-1][i].fullDate;
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
  clickDate(event, data): void{
    event.stopPropagation();
    console.log(data);
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
  getDate(smt): any{
    return `${new Date(smt.fullDate).getTime()}`
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
