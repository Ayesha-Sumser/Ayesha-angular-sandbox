import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { User } from '../../../models/user';
import { get } from 'http';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
 
@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit, OnDestroy {
 
  userId: string | null = '';
  userDetails?:User;
  routerSubscription?: Subscription;
 
  constructor(private apiService:ApiService, private router:Router, private activatedRoute:ActivatedRoute){}
 
  ngOnInit(){
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.userId){
      this.getUserDetails();
    }
    if(!this.routerSubscription){
     this.routerSubscription = this.router.events.subscribe(eventResult =>{ //reference to unsubscribe later
      console.log('Event result:',eventResult);
      if(eventResult instanceof NavigationEnd && eventResult.url.includes('/users/views/')){ //restricted to this path
        this.userId = this.activatedRoute.snapshot.paramMap.get('id');
        if(this.userId){
          this.getUserDetails();
        }
      }
    })
  }
}
 
  getUserDetails(){
    this.apiService.request('userDetails','get',undefined, this.userId).subscribe(result =>{
      console.log('Get user details',result);
      this.userDetails = result;
    })
  }
  ngOnDestroy(){
    this.routerSubscription?.unsubscribe();//we have unsubscribe 
  }

}