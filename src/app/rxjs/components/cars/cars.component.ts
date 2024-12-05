import { Component } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Car } from '../../../models/car';
import { CarsService } from '../../services/cars.service';
import { CardListTemplateComponent } from "../../../components/partial/card-list-template/card-list-template.component";
import { CommonModule } from '@angular/common';
import { error } from 'console';
import { Starship } from '../../../models/starship';
import { FormsModule } from '@angular/forms';
import { CarsStore } from '../../store/cars.store';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [
    CardListTemplateComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.scss'
})
export class CarsComponent {

searchText : String = '';
cars$? : Observable<Car[]>;
filterCars$? : Observable<Car[]>;

constructor(
  private carsService: CarsService,
  private carsStore: CarsStore,
){}

ngOnInit():void{
  // this.loadCars();
  this.reloadCars();
}

loadCars(){//assign carlist here
  this.cars$ = this.carsService.loadAllCars() //do not need to subscribe
                  .pipe(
                    catchError((err:any) => {
                      const message = 'Could not load cars';
                      console.log('load cars error',message,err);
                      return throwError(() => new Error(err));
                    })
                  );
  this.filterCars$ = this.cars$;
}

reloadCars(){
  this.cars$ = this.carsStore.cars$;
  this.filterCars$ = this.cars$;
}

searchCar(){
  const text = this.searchText.toLowerCase();
  this.filterCars$ = this.cars$;

  if(this.searchText){
    //   //stateless method
    // this.filterCars$ = this.cars$!
    //     .pipe(
    //       map(cars => cars.filter(car => {
    //         return (
    //           car.name.toLowerCase().includes(text) || 
    //           car.body_type.toLowerCase().includes(text) //need to add return and then add more
    //         )
    //       }))
    //     );
    //     return;

    //this is the statefull method
    this.filterCars$ = this.carsStore.filterByCategory(text);
    return;
  }
}

clearSearch(){
  this.searchText = '';
  this.searchCar(); //call our method
}
}
