import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  let activeRequest = 0;
  const loadingService = inject(LoadingService);

  if(activeRequest == 0){
    console.log('Active Request',activeRequest);
    loadingService.startLoading();//no previous active request we will start loading and increase active request after the if
  }
  activeRequest++;

  return next(req).pipe( //hooking pipe(a method from rxjs) in the reponse we are getting 
    finalize(() =>{
      if(activeRequest>0){//checking for any active request
        activeRequest--;
      }
      if(activeRequest ==0 ){
        loadingService.stopLoading();// if all the request are done(no pending request) then we are going to stop loading
      }
    })
  );
};
