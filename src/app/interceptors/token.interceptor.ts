import { HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { isPlatformBrowser } from '@angular/common';

export const tokenInterceptor: HttpInterceptorFn = (req:HttpRequest<unknown>, next:HttpHandlerFn) => {
  const storage = inject(StorageService);
  const token = storage.get('token');
  const platfromId: Object = inject(PLATFORM_ID);
  let isBrowser = isPlatformBrowser(platfromId);
  console.log('Inside token interceptor ', token);
  console.log('IsBrowser: ', isBrowser);

  if (isBrowser && token){
    const modifyReq = req.clone({
      headers: req.headers.set('Authorization', token)
    })
    return next(modifyReq);
  }

  return next(req);
};