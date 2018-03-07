import {Component} from "@angular/core";
import {SiteMckPage} from "../site-mck/site-mck";
import {SiteQcPage} from "../site-qc/site-qc";
import {SessionService} from "../../shared/services/session.service";
import {CreateScheduleService} from "../../shared/services/create-schedule.service";
import {CONSTANTS} from "../../shared/constants";
import {DATA_MCK} from "../../data/data-mck";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {Storage} from "@ionic/storage";
import {SetNotificationsService} from "../../shared/services/set-notifications.service";
import {DATA_QC} from "../../data/data-qc";
import {ToastController} from "ionic-angular";
import {PushNotificationService} from "../../shared/services/push-notification.service";

@Component({
    selector: 'page-tab-sites',
    template: `
        <ion-tabs [selectedIndex]="getSelectedTab()" *ngIf="!checkNan(getSelectedTab())">
            <ion-tab [root]="mckPage" tabTitle="McKinley" tabIcon="home"></ion-tab>
            <ion-tab [root]="qcPage" tabTitle="Quezon City" tabIcon="people"></ion-tab>
        </ion-tabs>
    `
})
export class TabSitesPage {
    mckPage: object = SiteMckPage;
    qcPage: object = SiteQcPage;

    constructor(
        private _sessionService: SessionService,
        private _localNotifications: LocalNotifications,
        private _storage: Storage,
        private _setNotificationService: SetNotificationsService,
        private _toastCtrl: ToastController,
        private _pushNotificationService: PushNotificationService,
        _createScheduleService: CreateScheduleService
    ) {
        const mckBulk = _createScheduleService.getSchedule(CONSTANTS.MCK_START_DATE, DATA_MCK, CONSTANTS.MCK_LIMIT);
        const qcBulk = _createScheduleService.getSchedule(CONSTANTS.QC_START_DATE, DATA_QC, CONSTANTS.QC_LIMIT);

        mckBulk.forEach((info) => {
            this._sessionService.mckBulk.push({
                id: info.id,
                today: info.today,
                dayToday: info.dayToday
            });

            if (typeof(this._sessionService.wfhMapped[info.id]) === 'undefined') {
                this._sessionService.wfhMapped[info.id] = {
                    name: info.name,
                    img: info.img,
                    notifications: []
                }
            }

            this._sessionService.wfhMapped[info.id].notifications.push({
                id: info.id,
                today: info.today,
                dayToday: info.dayToday
            });
        });

        qcBulk.forEach((info) => {
            this._sessionService.qcBulk.push({
                id: info.id,
                today: info.today,
                dayToday: info.dayToday
            });

            if (typeof(this._sessionService.wfhMapped[info.id]) === 'undefined') {
                this._sessionService.wfhMapped[info.id] = {
                    name: info.name,
                    img: info.img,
                    notifications: []
                }
            }

            this._sessionService.wfhMapped[info.id].notifications.push({
                id: info.id,
                today: info.today,
                dayToday: info.dayToday
            });
        });

        let notifEnabled: boolean = false;
        let selectedInfo: number = null;

        this._storage.get('enableNotification').then(
            value => {
                notifEnabled = value;
            }
        );

        this._storage.get('selectedInfo').then(
            value => {
                selectedInfo = value;
            }
        );

        if (notifEnabled && selectedInfo) {
            this._setNotificationService.createNotifications(this._sessionService.wfhMapped[selectedInfo].notifications);
        }

        this._localNotifications.on("click", () => {
            const toast = this._toastCtrl.create({
                message: CONSTANTS.NOTIFICATION_MESSAGE,
                position: 'middle',
                duration: 3000
            });

            toast.present();
        });

        this.fcmSetup();
    }

    getSelectedTab(): any {
        let tabRef;

        switch (this._sessionService.homeBase) {
            case "MCK":
                tabRef = 0;
                break;
            case "QC":
                tabRef = 1;
                break;
        }

        return tabRef;
    }

    checkNan(data) {
        return isNaN(data);
    }

    fcmSetup() {
        this._pushNotificationService.subscribeToTopic('ALL');

        this._pushNotificationService.onNotification(data => {
            if (data.wasTapped){
                console.log("Received in background");
            } else {
                console.log("Received in foreground");
            }

            if (data.pushMessage) {
                const toast = this._toastCtrl.create({
                    message: data.pushMessage,
                    position: 'bottom',
                    showCloseButton: true,
                    closeButtonText: 'DISMISS'
                });

                toast.present();
            }
        });
    }
}
