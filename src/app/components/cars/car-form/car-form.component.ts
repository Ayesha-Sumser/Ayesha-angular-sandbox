import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Car } from '../../../models/car';
import { ApiService } from '../../../services/api.service';
import Swal from 'sweetalert2';
import { UploadDirective } from '../../../directives/upload.directive';

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    UploadDirective,
  ],
  templateUrl: './car-form.component.html',
  styleUrl: './car-form.component.scss'
})
export class CarFormComponent {
  carForm?: FormGroup;
  carSlug: string | null = '';
  carDetails? : Car;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private apiService : ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.carSlug = this.activatedRoute.snapshot.paramMap.get('slug');
    console.log('Car Slug: ', this.carSlug);
   
    if(this.carSlug){
      this.getCar();
    }

    this.carForm = this.formBuilder.group({
      ref: ['', Validators.required],
      name: ['', Validators.required],
      body_type: ['', Validators.required],
      engine: ['', Validators.required],
      mileage: ['', Validators.required],
      fuel_type: ['', Validators.required],
      transmission: ['', Validators.required],
      door_count: ['', Validators.required],
      image_car: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      desc_excerpt: ['', Validators.required],
      date_online: ['', Validators.required],
      date_offline: ['', Validators.required],
      currency: ['', Validators.required],
      contact_phone: ['', Validators.required],
      contact_email: ['', [Validators.required, Validators.email]],
    })

  }

  saveCar() {
    console.log('Value of car form: ', this.carForm?.value);
    this.apiService.request('addCar','post',this.carForm?.value).subscribe(result =>{
      console.log('Add car result : ',result);
      if(result){
        Swal.fire('Success','Your car details has been added successfully','success').then(swalResult =>{
          console.log('Swal result: ',swalResult);
          if(swalResult.value){
            this.router.navigate(['/cars']);
          }
        });
      }
    });
  }
 

  getCar(){
    this.apiService.request('carDetails', 'get', undefined,this.carSlug).subscribe(car =>{
      console.log('Get car: ',car);
      if(car){
        this.carForm?.patchValue(car);
        this.carDetails = car; 
      }
    })
  }

  editCar(){
    this.apiService.request('editCar', 'put', this.carForm?.value, this.carSlug).subscribe(result =>{
      console.log('Edit car: ', result);
      if(result){
        Swal.fire('Success', 'Your car details has been updated', 'success').then(swalResult => {
          console.log('Swal result: ', swalResult);
          if (swalResult.value){
            this.router.navigate(['/cars']);
          }
        })
      }
    })
  }

  uploadImage(event:any){
    const fileUpload = event.target.files[0];
    console.log('Event: ', fileUpload);
    const formData: FormData = new FormData();
    formData.append('image', fileUpload, fileUpload.name);
    if (fileUpload){
      this.apiService.request('imageUpload', 'post', formData).subscribe(result =>{
        console.log('upload image result: ', result);
        this.carForm?.controls['image_car'].setValue(result.secure_url);
        this.carDetails!.image_car = result.secure_url;
      })
    }
  }

}