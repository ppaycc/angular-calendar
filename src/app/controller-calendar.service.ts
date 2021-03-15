import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControllerCalendarService implements OnInit {
  public year;
  public mounth$: BehaviorSubject<any> = new BehaviorSubject(0);
  public week$: BehaviorSubject<any> = new BehaviorSubject(0);
  public maxWeeks$: BehaviorSubject<any> = new BehaviorSubject(0);

  constructor() { }
  ngOnInit(): void{}
  setMaxWeek(maxWeek): void{
    this.maxWeeks$.next(maxWeek);
  }
  getMaxWeek(): any{
    return this.maxWeeks$;
  }
  setYear(year): void{
    this.year = year;
  }
  getYear(): number{
    return this.year;
  }
  setWeek(week): void{
    this.week$.next(week);
  }
  getWeek(): any{
    return this.week$.value;
  }
  setMounth(mounth): void{
    this.mounth$.next(mounth);
  }
  getMounth(): any{
    return this.mounth$.value;
  }

}
