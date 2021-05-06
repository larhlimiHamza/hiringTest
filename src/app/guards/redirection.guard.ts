import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {FirebaseService} from "../services/firebase.service";

@Injectable({
  providedIn: 'root'
})
export class RedirectionGuard implements CanActivate {
  constructor(
    public firebaseService:FirebaseService,
    public router:Router,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.firebaseService.isLoggedIn()){
      this.router.navigate(['../home']);
      return false;
    }
  else{
      return true;
    }  }

}
