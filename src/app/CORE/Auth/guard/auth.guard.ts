import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router)

  if(tokenService.getToken()){
    const url = router.createUrlTree(['/sale'])
    return url;
  }else{
    return true;
  }
};
