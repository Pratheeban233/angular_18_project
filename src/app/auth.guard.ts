import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  const isLoggedin = localStorage.getItem('isLoggedin');
  if (isLoggedin) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
