import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  registrationForm?: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;


  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router) {


  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    }, {validators:this.checkPassword})
  }

  checkPassword(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm_password = group.get('confirm_password')?.value;
    return password === confirm_password ? null : { notSame: true }
  }

  register() {
    this.apiService.request('register', 'post', this.registrationForm?.value).subscribe(result => {
      console.log('Registration result', result);
      if (result) {
        Swal.fire('success', 'Registered successfuly', 'success').then(swalResult => {
          console.log('Swal result', swalResult);
          if (swalResult.value) {
            this.router.navigate(['/cars']);
          }
        })
      }
    })
  }

  togglePassword():void{
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword():void{
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}