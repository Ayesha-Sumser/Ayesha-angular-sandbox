import { BehaviorSubject, catchError, map, Observable, tap, throwError } from "rxjs";
import { Car } from "../../models/car";
import { ApiService } from "../../services/api.service";
import { DTO } from "../../models/dto";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn:'root'
})
export class CarsStore {
    private subject = new BehaviorSubject<Car[]>([]);

    cars$? : Observable<Car[]> = this.subject.asObservable()

    constructor(private apiService : ApiService){
    this.loadAllCars();
    }

    private loadAllCars(){
    this.apiService.request<DTO<Car[]>>('carList','get')
        .pipe(
            map(result => result.data),
            catchError((err:any) => {
                const message = 'Could not load cars';
                console.log('load cars error',message,err);
                return throwError(() => new Error(err));
              }),
              tap(cars => this.subject.next(cars))
        )
        .subscribe() //request won't fire if we have no subscribers
    }

    filterByCategory(category:string):Observable<Car[]> | undefined {
        return this.cars$?.pipe(
            map(cars => cars.filter(car => car.name.toLowerCase().includes(category)))
        )
    }

}
