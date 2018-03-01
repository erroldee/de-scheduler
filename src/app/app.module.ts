import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {TabSitesPage} from "../pages/tab-sites/tab-sites";
import {SiteMckPage} from "../pages/site-mck/site-mck";
import {SiteQcPage} from "../pages/site-qc/site-qc";
import {ModalNotificationPage} from "../pages/modal-notification/modal-notification";
import {ShowOnScrollDirective} from "../shared/directives/show-on-scroll.directive";
import {IonicStorageModule} from "@ionic/storage";
import {CreateScheduleService} from "../shared/services/create-schedule.service";
import {SetNotificationsService} from "../shared/services/set-notifications.service";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {SocialSharing} from "@ionic-native/social-sharing";

@NgModule({
    declarations: [
        MyApp,
        TabSitesPage,
        SiteMckPage,
        SiteQcPage,
        ModalNotificationPage,
        ShowOnScrollDirective
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        TabSitesPage,
        SiteMckPage,
        SiteQcPage,
        ModalNotificationPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {
            provide: ErrorHandler,
            useClass: IonicErrorHandler
        },
        CreateScheduleService,
        SocialSharing,
        SetNotificationsService,
        LocalNotifications
    ]
})
export class AppModule {}
