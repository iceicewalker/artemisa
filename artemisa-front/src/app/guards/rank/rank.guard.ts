import { Injectable, NgZone } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class RankGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router, private zone: NgZone){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const ranks = route.data['ranks'];
      const auth = getAuth();
      return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(async (user) => {
          const docRef = await getDoc(this.userService.doc(user.uid))
          if (docRef.exists()) {
            if(ranks.indexOf(Number(docRef.data()['rango'])) > -1){
              resolve(true);
            }else{
              this.redirectTo("/");
              reject("No permissions");
              resolve(false);
            }
          } else {
            this.redirectTo("/");
            reject("No permissions");
            resolve(false);
          }
          resolve(true);
        });
      });
    }
    private redirectTo(url: string){
      this.zone.run(() => {
        this.router.navigateByUrl(url);
      });
    }
}
