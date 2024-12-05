import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { PermissionService } from '../services/permission.service';

export const authGuard: CanActivateFn = (route, state) => {

  const permission = inject(PermissionService);

  return permission.isAuthUser(); //to know if user is login or not
};
