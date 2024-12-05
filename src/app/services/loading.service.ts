import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading: Subject<boolean> = new Subject();

  constructor() { }

  //switch on
  startLoading(){
    this.loading.next(true);
    console.log('Loading starts');
  }

  //switch off
  stopLoading(){
    this.loading.next(false);
    console.log('Stop Loading');
  }
}
