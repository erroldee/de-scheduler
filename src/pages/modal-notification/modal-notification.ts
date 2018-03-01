import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {InfoMapping} from "../../shared/interface/info-mapping.interface";
import {SetNotificationsService} from "../../shared/services/set-notifications.service";

@Component({
    selector: 'page-modal-notification',
    templateUrl: 'modal-notification.html',
})
export class ModalNotificationPage {
    enableNotifications: boolean;
    location: string;
    infoMap: InfoMapping[];
    selectedInfo: number;
    dataMapping: {[s: string]: number} = {};

    constructor(
        private _navParams: NavParams,
        private _viewCtrl: ViewController,
        private _storage: Storage,
        private _setNotificationService: SetNotificationsService
    ) {}

    ionViewDidLoad() {
        this.location = this._navParams.get('location');
        this.infoMap = this._navParams.get('mapData');

        this._storage.get('enableNotification' + this.location).then(
            (value) => {
                this.enableNotifications = value;
            }
        );

        this._storage.get('selectedInfo' + this.location).then(
            (value) => {
                this.selectedInfo = value;
            }
        );

        for (let counter = 0; counter < this.infoMap.length; counter++) {
            this.dataMapping[this.infoMap[counter].id] = counter;
        }
    }

    toggleNotification() {
        this._storage.set('enableNotification' + this.location, this.enableNotifications);
        if (!this.enableNotifications) {
            this._setNotificationService.cancelAllNotifications();
        } else {
            this._storage.set('enableNotification' + (this.location === "MCK" ? "QC" : "MCK"), false);
            this.onSelectedInfo();
        }
    }

    onSelectedInfo() {
        if (this.selectedInfo || this.selectedInfo === 0) {
            this._storage.set('selectedInfo' + this.location, this.selectedInfo);
            this._setNotificationService.createNotifications(this.infoMap[this.dataMapping[this.selectedInfo]].notifications);
        }
    }

    dismiss() {
        this._viewCtrl.dismiss();
    }
}
