import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';
import { PermissionService } from '../../services/permission.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
loginForm?: FormGroup;
islogin: boolean = false;
user: any;


constructor(
  private formBuilder:FormBuilder,
  private apiService: ApiService,
  private storageService: StorageService,
  public permission: PermissionService,
){

}

  ngOnInit():void{
  this.loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })
   this.user = this.storageService.get('user');
  if(this.user){
    this.islogin = true;
  }

}

  login(){
    this.apiService.request('login','post', this.loginForm?.value).subscribe(result =>{
      console.log('Login result', result);
      if(result){
        this.storageService.set('token', result['token']);
        this.storageService.set('user', result['user']);
        this.islogin= true;
      }
    })
  }

  logout(){
    this.storageService.remove('user');
    this.storageService.remove('token');
    this.islogin= false;
  }

}
