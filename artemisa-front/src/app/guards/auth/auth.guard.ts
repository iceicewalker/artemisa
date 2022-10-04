import { Injectable, NgZone } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { getAuth } from 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private zone: NgZone){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const rank = route.data.rank;
      const isLoggedRequired = route.data.logged;
      return this.validateAccess(isLoggedRequired, rank);
  }
  private validateAccess(isLoggedRequired: boolean, rank: Number[]): Promise<boolean> { //Returns promise, true if user is logged & isLoggedRequired = false, else false
    const auth = getAuth();
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged((user) => {
        if(user){
          if(isLoggedRequired) {
            resolve(true);
          }else{
            this.redirectTo("/");
            resolve(false);
          }
        }else{
          if(isLoggedRequired) {
            resolve(false);
            this.redirectTo("/login");
          }else{
            resolve(true);
          }
        }
      }, (error) => {
        console.error(error);
        this.redirectTo("/login");
        reject(error);
      })
    })
  }
  private redirectTo(url: string){
    this.zone.run(() => {
      this.router.navigateByUrl(url);
    });
  }
}
