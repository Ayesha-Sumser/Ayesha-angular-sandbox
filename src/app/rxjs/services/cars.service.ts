import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { map, Observable, share, shareReplay } from 'rxjs';
import { Car } from '../../models/car';
import { DTO } from '../../models/dto';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private apiService: ApiService) { }

  loadAllCars():Observable<Car[]>{  //stateless observable service
    return this.apiService.request<DTO<(Car[])>>('carList','get')
          .pipe(
            map(result => result.data),
            shareReplay()
          );
  }
}
