import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-mini-calendar',
  templateUrl: './mini-calendar.component.html',
  styleUrls: ['./mini-calendar.component.css']
})
export class MiniCalendarComponent implements OnInit {
  public showModal = false;
  public date;
  public nameOfWeek;
  public dateArray;
  public d = new Date();
  public year = this.d.getFullYear();
  public month = this.d.getMonth();
  public today = new Date(this.year, this.month, this.d.getDate());
  public nameOfMonth;

  constructor(private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.render();
  }

  toNextMonth(): void{
    if(this.month + 1 > 11){
      this.month = 0;
      this.year += 1;
    } else {
      this.month += 1;
    }
    this.render();
  }

  toPrevMonth(): void{
    if(this.month - 1 < 0){
      this.month = 11;
      this.year -= 1;
    } else {
      this.month -= 1;
    }
    this.render();
  }

  clickAtData(data): void{
    this.date = data;
    this.showModal = true;
    console.log(data);
  }

  isToday(data): boolean{
    if(data !== undefined){
      return data.getTime() === this.today.getTime();
    } else {
      return false;
    }
  };

  render(): void{
    [this.nameOfWeek, this.dateArray] = this.calendarService
    .getArrayOfDatas(this.year, this.month);
    this.nameOfMonth = this.calendarService.getNameOfMonth(this.month);
  }

  closeModal(): void{
    this.showModal = false;
  }
}
