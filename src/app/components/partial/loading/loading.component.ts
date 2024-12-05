import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxLoadingModule } from 'ngx-loading';
import { LoadingService } from '../../../services/loading.service';
 
@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    NgxLoadingModule,
    CommonModule,
  ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  loading: boolean = false;
  loading$ = this.loadingService.loading;
 
constructor(
  private loadingService:LoadingService
){}

ngOnInit(){
  this.loadingService.loading.subscribe(status =>{
    console.log('Status',status);
    this.loading = status;
  });
  }
}