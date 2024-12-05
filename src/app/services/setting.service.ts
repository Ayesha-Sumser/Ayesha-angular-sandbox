import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private _currentTheme = '';
  public outsetTheme: Subject<string> = new Subject();

  constructor() { }

  getTheme(){
    return this._currentTheme;
  }

  set theme(value:string){
    this._currentTheme = value;
    this.outsetTheme.next(value);
    console.log('Value from setting service: ', value);
  }
}