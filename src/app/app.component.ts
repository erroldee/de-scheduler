import { Component } from '@angular/core';
import {Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TabSitesPage} from "../pages/tab-sites/tab-sites";
import {DefaultHomeService} from "../shared/services/default-home.service";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = TabSitesPage;

    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        defaultHomeService: DefaultHomeService
    ) {
        platform.ready().then(() => {
            defaultHomeService.getHome(base => {
                // Okay, so the platform is ready and our plugins are available.
                // Here you can do any higher level native things you might need.
                statusBar.styleDefault();
                splashScreen.hide();
            });
        });
    }
}
