import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingService } from '../../services/setting.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profileForm? : FormGroup;
  selectedTheme: string ='';

  constructor(
    private formBuilder:FormBuilder, 
    private settingService:SettingService,
  ){}

  ngOnInit():void{
    this.profileForm =  this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
    })
  }

  updateTheme(){
    console.log('Theme value :',this.selectedTheme);
    this.settingService.theme = this.selectedTheme;
  }
}