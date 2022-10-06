import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
      private router: Router,
      private auth: AuthService
  ) { }
    canActivate(next:ActivatedRouteSnapshot): boolean {
      if (this.auth.isLogged!=true) {
        this.router.navigate(['sign-in']);
      }
      const userRole = this.auth.getrole();
      
      console.log(userRole)
      if(userRole=='editor+ranker')
      return true
          if (next.data['role'] && next.data['role'].indexOf(userRole) === -1) {
            this.router.navigate(['/cards']);
            return false;
         }
      return true;
    }
  
}
  

