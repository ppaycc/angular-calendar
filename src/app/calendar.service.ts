import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {LoadingService} from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  public names: Array<string> = ["Январь", "Февраль", "Март",
    "Апрель", "Май", "Июнь", "Июль", "Август",
    "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

  constructor(public http: HttpClient,
              private loading: LoadingService) { }

  getNameOfMonth(month): string{
    return this.names[month];
  }

  addEvent(event): void{
    console.log('Add new event', event);
    this.http.post('http://localhost:8008/api/calendar-event/create', event).subscribe(() => {
    });
  }

  deleteEvent(id): void {
    this.http.get('http://localhost:8008/api/calendar-event/delete/' + id).subscribe(() => {
    });
  }

  editEvent(editedEvent): void{
    this.http.post('http://localhost:8008/api/calendar-event/update', editedEvent).subscribe(() => {
    });
  }

  getEventsBetweenDates({from, to}): any{
    const body = {
      $and: [
        {date: {
          $gte: new Date(from).toISOString()
        }},
        {date: {
          $lte: new Date(to).toISOString()
        }}
      ]
    };
    return this.http.post('http://localhost:8008/api/calendar-event/get', body);
  }

  getArrayOfDatas(year, month): any{
    let d = new Date(year, month);
      let table: any = [{day:'пн'}, {day:'вт'}, {day:'ср'}, {day:'чт'}, {day:'пт'}, {day:'сб'}, {day:'вс'}];
      for (let i = 0; i < getDay(d); i++) {
          table.push({day: -1});
      }
      while (d.getMonth() === month) {
          table.push({day: d.getDate(), fullDate: new Date(year, month, d.getDate())});
          d.setDate(d.getDate() + 1);
      }
      if (getDay(d) !== 0) {
          for (let i = getDay(d); i < 7; i++) {
              table.push({day: -1});
          }
      }
      const arr = [];
      const datas = table.splice(0,7)
      while (table.length > 0){
          arr.push(table.splice(0, 7));
      }
      return [datas, arr];
      function getDay(date) { // получить номер дня недели, от 0 (пн) до 6 (вс)
        let day = date.getDay();
        if (day === 0) day = 7; // сделать воскресенье (0) последним днем
        return day - 1;
    }
  }
}
