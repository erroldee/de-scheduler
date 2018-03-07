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
import {SessionService} from "../shared/services/session.service";
import {ModalNotificationPageModule} from "../pages/modal-notification/modal-notification.module";
import {SiteMckPageModule} from "../pages/site-mck/site-mck.module";
import {SiteQcPageModule} from "../pages/site-qc/site-qc.module";
import {FCM} from "@ionic-native/fcm";
import {PushNotificationService} from "../shared/services/push-notification.service";
import {DefaultHomeService} from "../shared/services/default-home.service";
import {HomeBasePageModule} from "../pages/home-base/home-base.module";
import {HomeBasePage} from "../pages/home-base/home-base";

@NgModule({
    declarations: [
        MyApp,
        TabSitesPage,
        ShowOnScrollDirective
    ],
    imports: [
        BrowserModule,
        ModalNotificationPageModule,
        SiteMckPageModule,
        SiteQcPageModule,
        HomeBasePageModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        TabSitesPage,
        SiteMckPage,
        SiteQcPage,
        ModalNotificationPage,
        HomeBasePage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {
            provide: ErrorHandler,
            useClass: IonicErrorHandler
        },
        CreateScheduleService,
        SetNotificationsService,
        LocalNotifications,
        SessionService,
        FCM,
        PushNotificationService,
        DefaultHomeService
    ]
})
export class AppModule {}
