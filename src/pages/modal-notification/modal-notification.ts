import {Component} from '@angular/core';
import {ViewController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {SetNotificationsService} from "../../shared/services/set-notifications.service";
import {SessionService} from "../../shared/services/session.service";
import {CardInfo} from "../../shared/interface/card-info.interface";

@Component({
    selector: 'page-modal-notification',
    templateUrl: 'modal-notification.html',
})
export class ModalNotificationPage {
    enableNotifications: boolean = false;
    dataInfo: {[n: number]: CardInfo} = {};
    selectedInfo: number;
    infoMap: any[] = [];

    constructor(
        private _viewCtrl: ViewController,
        private _storage: Storage,
        private _setNotificationService: SetNotificationsService,
        private _sessionService: SessionService
    ) {}

    ionViewDidLoad() {
        this._storage.get('enableNotification').then(
            (value) => {
                this.enableNotifications = value;
            }
        );

        this._storage.get('selectedInfo').then(
            (value) => {
                this.selectedInfo = value;
            }
        );

        this.dataInfo = this._sessionService.wfhMapped;

        for (let x in this.dataInfo) {
            this.infoMap.push({
                id: x,
                name: this.dataInfo[x].name
            });
        }
    }

    toggleNotification() {
        this._storage.set('enableNotification', this.enableNotifications);

        if (!this.enableNotifications) {
            this._setNotificationService.cancelAllNotifications();
        } else {
            this.onSelectedInfo();
        }
    }

    onSelectedInfo() {
        if (this.selectedInfo) {
            this._storage.set('selectedInfo', this.selectedInfo);
            this._setNotificationService.createNotifications(this.dataInfo[this.selectedInfo].notifications);
        }
    }

    dismiss() {
        this._viewCtrl.dismiss();
    }
}
