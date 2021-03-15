import { Observable } from 'rxjs';
import { ControllerCalendarService } from './../controller-calendar.service';
import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  public type = 'mounth';
  public date = new Date();
  public year = this.date.getFullYear();
  public mounth = this.date.getMonth();
  public week = 0;
  public nameOfMounth;

  public maxWeeks$: Observable<any>;
  public maxWeeks;

  constructor(private router: Router, 
    private location: Location,
    private calendar: CalendarService,
    private controllerCalendar: ControllerCalendarService) { }

  ngDoCheck(): void{
    // console.log(this.location.path().split('/')[1]);
    this.type = this.location.path().split('/')[1];
  }

  ngOnInit(): void {
    this.maxWeeks$ = this.controllerCalendar.maxWeeks$;
    this.maxWeeks$.subscribe((weeks) => {
      this.maxWeeks = weeks;
    });
    this.getNameOfMounth();
    this.setData();
  }
  prev(): void{
    if (this.type === 'mounth'){
      this.prevMounth();
    } else if (this.type === 'week'){
      this.prevWeek();
    }
  }
  next(): void{
    if (this.type === 'mounth'){
      this.nextMounth();
    } else if (this.type === 'week'){
      this.nextWeek();
    }
  }
  nextWeek(): void{
    if (this.week +1 < this.maxWeeks){
      this.week += 1;
      this.controllerCalendar.setWeek(this.week);
    } else {
      this.week = 0;
      this.nextMounth();
    }
  }
  prevWeek(): void{
    if (this.week -1 >= 0){
      this.week -= 1;
      this.controllerCalendar.setWeek(this.week);
    } else {
      this.prevMounth();
      this.week = this.maxWeeks;      
      this.controllerCalendar.setWeek(this.week);
    }
  }
  nextMounth(): void{
    if (this.mounth +1 < 12){
      this.mounth += 1;
    } else {
      this.mounth = 0;
      this.year += 1;
    }
    this.setData();
  }
  prevMounth(): void{
    if (this.mounth -1 >= 0){
      this.mounth -= 1;
    } else {
      this.mounth = 11;
      this.year -= 1;
    }
    this.setData();
  }

  setData(): void{
    this.controllerCalendar.setMounth(this.mounth);
    this.controllerCalendar.setWeek(this.week);
    this.controllerCalendar.setYear(this.year);
    this.getNameOfMounth();
  }
  
  getNameOfMounth(): void{
    this.nameOfMounth = this.calendar.getNameOfMonth(this.mounth);
  }
  
  navigateTo(location): void{
    this.type = location;
    this.router.navigate([location]);
  }
}
