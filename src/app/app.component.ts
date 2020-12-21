import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkPermissions();
    });
  }

  checkPermissions() {
    // @ts-ignore
    // tslint:disable-next-line: one-variable-per-declaration
    const permissions = cordova.plugins.permissions,
        permissionList = [permissions.CAMERA, permissions.WRITE_EXTERNAL_STORAGE];
    function errorCallback() {
        console.warn('permissions is not turned on');
    }
    function checkPermissionCallback(status) {
        if (!status.hasPermission) {
            permissions.requestPermissions(
                permissionList,
                // tslint:disable-next-line: no-shadowed-variable
                status => {
                    if (!status.hasPermission) { errorCallback(); }
                },
                errorCallback);
        }
    }
    permissions.hasPermission(permissionList, checkPermissionCallback, null);
}
}
