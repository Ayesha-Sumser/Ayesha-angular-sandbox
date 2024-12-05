import { Component } from '@angular/core';
import { User } from '../../models/user';
import { ApiService } from '../../services/api.service';
import { DTO } from '../../models/dto';
import { CardListTemplateComponent } from '../partial/card-list-template/card-list-template.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CardListTemplateComponent,
    RouterOutlet
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

userList: User[]=[];

constructor( private apiService: ApiService){}

ngOnInit():void{
  this.getUsers()
}

  getUsers(){
    this.apiService.request<DTO<User[]>>('userList','get').subscribe((users:DTO<User[]>)=>{
      console.log('Users from server',users);
      this.userList= users['data'];
    }
    )
  }

}
