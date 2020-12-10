import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { LocalStorageService } from '../shared/services/local-storage.service';
const APP_KEY = 'App';
@Injectable({
  providedIn: 'root'
})
export class StartAppGuard implements CanActivate {
  constructor(private localStorageService: LocalStorageService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const appConfig: any = this.localStorageService.get(APP_KEY, {
      launched: false,
      login: false,
      version: '1.7.4',
      mobile: '18960875590'
    });
    // if (appConfig.launched === false){
    //   appConfig.launched = true;
    //   this.localStorageService.set(APP_KEY,appConfig);
    //   return true;
    // }
    // else{
    //   this.router.navigateByUrl('tabs');
    //   return false;
    // }
    if (appConfig.launched === false) {
      appConfig.launched = true;
      this.localStorageService.set(APP_KEY, appConfig);
      return true;
    } else if (appConfig.login === true) {
      const curTime = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/-/g, '/');
      const CU = this.localStorageService.get('CurrentLoginedUser');
      console.log(CU.loginDate);
      const diff: any = ((new Date(curTime).getTime() - new Date(CU.loginDate).getTime()) / 1000 / 60 / 60 / 24 ).toFixed(0);
      console.log(diff);
      if ( diff - 5 > 0){
        appConfig.login = false;
        this.localStorageService.set(APP_KEY, appConfig);
        this.router.navigateByUrl('/passport/login');
      } else {
        this.router.navigateByUrl('/tabs/home');
      }
      return false;
    } else{
      this.router.navigateByUrl('/passport/login');
    }
  }
}

