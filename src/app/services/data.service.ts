import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
 
@Injectable({
  providedIn: 'root'
})
export class DataService {
 
  carList = [
    {
      _id: '5db57675ddb3ad0d6139bd1b',
      ref: '26416',
      slug: 'Mitsubishi',
      name: 'Mitsubishi',
      body_type: 'Sedan',
      engine: '1193 F4',
      mileage: 'N/A',
      fuel_type: 'N/A ',
      transmission: 'Automatic, Manual',
      door_count: '5',
      image_car:
        'https://www.cyclecarriage.com/sg/-/media/jccl/mit/images/car-models/attrage/design-images/feature_single_exterior-design_02_desktop_1440x1440.jpg',
      price: 725000,
      description: 'This is a Mitsubishi',
      desc_excerpt: 'Mitsubishi',
      date_online: '2019-10-01',
      date_offline: '2019-12-01',
      currency: 'MUR',
      contact_phone: '67554234',
      contact_email: 'test@mail.com',
    },
    {
      _id: '5db71ebdc685060017250b5f',
      ref: 'MER326473',
      name: 'BMW',
      body_type: 'N/A',
      engine: '6.2 L',
      mileage: '58 225',
      fuel_type: 'Gasoline',
      transmission: 'AT',
      door_count: '5',
      image_car:
        'https://res.cloudinary.com/djzskjmzy/image/upload/v1598864714/m8vi9dewdur9pvbrzd8v.jpg',
      price: 126000000,
      slug: 'BMW',
      description: 'This is a BMW',
      desc_excerpt: 'BMW',
      date_online: '2019-10-01',
      date_offline: '2020-02-02',
      currency: 'MUR',
      contact_phone: '3781596436',
      contact_email: 'merdz@gmail.com',
    },
    {
      _id: '5f1d2a81cd48360017d8faea',
      ref: '30990',
      name: 'Honday',
      body_type: '2.0 TFSI quattro',
      engine: 'AUDI',
      mileage: '575',
      fuel_type: 'Petrol',
      transmission: 'Direct Injection',
      door_count: '4',
      image_car:
        'https://res.cloudinary.com/djzskjmzy/image/upload/v1597314245/ky5r5xcdcotkltn4yvst.jpg',
      price: 133364560.3,
      slug: 'Honday',
      description:
        'We’re supporting health care providers by donating protective equipment and making protective face shields. We’re also pledging $1 million to food banks and encouraging our associates to volunteer remotely.',
      desc_excerpt:
        'We’re supporting health care providers by donating protective equipment and making protective face shields. We’re also pledging $1 million to food banks and encouraging our associates to volunteer remotely.',
      date_online: '2020-08-06',
      date_offline: '2020-08-13',
      currency: 'MUR',
      contact_phone: '53687543',
      contact_email: 'honday@yopmail.com',
    },
  ]; 
 
 
  constructor(private storageService: StorageService) { }
 
  getCars(){
    return this.carList;
  }

  seedCar(){
    this.storageService.set('cars',this.carList);
  }
}