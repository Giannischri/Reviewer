import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService,private router:Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    const user=this.auth.userData
    console.log(next.queryParams)
    console.log(next.params)
    if(user){
      console.log(user);
     if(user.roles?.employee?.editor==true || user.roles?.admin==true)
     return true;
     else 
     return false;
    }
    else{
    this.router.navigate(["/sign-in"],{ queryParams: { retUrl: state.url} });
    return false;
    }
  }
  
}
