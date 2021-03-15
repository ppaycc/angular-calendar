import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {LoadingService} from '../loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  public showLoading = false;
  public checkLoading$: Observable<any>;
  constructor(private loading: LoadingService) { }

  ngOnInit(): void {
    this.checkLoading$ = this.loading.countOfFetch$;
    this.checkLoading$.subscribe(() => {
      this.showLoading = this.loading.isLoading();
    });
    // this.loading.addFetch();
    // setTimeout(() => {
    //   this.loading.removeFetch();
    // }, 2000);
  }

}
