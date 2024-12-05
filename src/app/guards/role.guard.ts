import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { PermissionService } from '../services/permission.service';

export const roleGuard: CanActivateFn = (route, state) => {

  const permission = inject(PermissionService);

console.log('route.data',route.data);

  if(permission.hasRole(route.data['role'])){
    return true;
  }

  return false;
};
