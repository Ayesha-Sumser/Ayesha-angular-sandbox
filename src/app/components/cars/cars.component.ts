import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Car } from '../../models/car';
import { CardListTemplateComponent } from '../partial/card-list-template/card-list-template.component';
import { RouterLink } from '@angular/router';
import { TableListTemplateComponent } from '../partial/table-list-template/table-list-template.component';
import { ApiService } from '../../services/api.service';
import { DTO } from '../../models/dto';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [
    FormsModule,
    TooltipModule,
    CardListTemplateComponent,
    TableListTemplateComponent,
    RouterLink,
  ],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.scss'
})
export class CarsComponent {
  carList: Car[] = [];
  filterCarList: Car[] = [];
  searchText: string = '';
  isCardVisible: boolean = true;

  constructor(
    private dataService: DataService,
    private storageService: StorageService,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    // this.getDSCars();
    //this.getStorageCars();
    this.getCars();
    //this.getCarsPromise();
  }

  getDSCars() {
    this.carList = this.dataService.getCars();
    this.filterCarList = this.carList;
    console.log('Get cars:', this.carList);
  }

  getStorageCars() {
    this.carList = this.storageService.get('cars');
    if (!this.carList || !this.carList.length) {
      this.dataService.seedCar();
    }
    else {
      this.filterCarList = this.carList;
    }
  }

  getCars() {
    this.apiService.request<DTO<Car[]>>('carList', 'get').subscribe((cars:DTO<Car[]>) => {
      console.log('Cars from server: ', cars);
      this.carList = cars.data;
      this.filterCarList = this.carList;
    });
  }

  async getCarsPromise(){
    const result:DTO<Car[]> = await this.apiService.request('carList','get').toPromise();
    console.log('Result promise: ',result)
    if(result){
      this.carList = result.data;
    }
  }

  searchCar() {
    console.log('Search text:', this.searchText);
    const text = this.searchText.toLocaleLowerCase();
    this.filterCarList = this.carList;
    if (this.searchText) {
      this.filterCarList = this.carList.filter(car => {
        return (
          car.name.toLocaleLowerCase().includes(text) ||
          car.body_type.toLocaleLowerCase().includes(text)
        )
      })
      console.log('filterCarList:', this.filterCarList);
      return;
    }
  }

  clearSearch() {
    this.searchText = '';
    this.searchCar();
  }

  toggle() {
    this.isCardVisible = !this.isCardVisible;
  }

  deleteCar(id: string) {
    console.log('car id', id);
    this.carList = this.carList.filter(car => car._id != id);
    this.filterCarList = this.carList;
    this.storageService.set('cars', this.carList);
  }

}