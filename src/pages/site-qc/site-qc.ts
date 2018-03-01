import { Component } from '@angular/core';
import * as $ from 'jquery';
import {CreateScheduleService} from "../../shared/services/create-schedule.service";
import {CardInfo} from "../../shared/interface/card-info.interface";
import {CONSTANTS} from "../../shared/constants";
import {DATA_QC} from "../../data/data-qc";
import {SocialSharing} from "@ionic-native/social-sharing";
import {ModalController} from "ionic-angular";
import {ModalNotificationPage} from "../modal-notification/modal-notification";
import {InfoMapping} from "../../shared/interface/info-mapping.interface";

@Component({
    selector: 'page-site-qc',
    templateUrl: 'site-qc.html',
})
export class SiteQcPage {
    qcData: CardInfo[] = [];
    qcBulk: CardInfo[] = [];
    qcPlaceHolder: number = 0;
    displayLimit: number = 10;
    allowInfinite: boolean = true;
    empData: any;
    listFilter: string = "ALL";
    forShare: string[] = [];
    qcMapping: {[s: string]: number} = {};
    infoMap: InfoMapping[] = [];

    constructor(
        _createScheduleService: CreateScheduleService,
        private _socialSharingService: SocialSharing,
        private _modalCtrl: ModalController
    ) {
        this.empData = DATA_QC;
        this.qcBulk = _createScheduleService.getSchedule(CONSTANTS.QC_START_DATE, DATA_QC, CONSTANTS.QC_LIMIT);

        const maxCounter = 15;

        for (let counter = 0; counter < maxCounter; counter++) {
            if (this.qcMapping[this.qcBulk[counter].empId] === undefined) {
                this.qcMapping[this.qcBulk[counter].empId] = this.infoMap.length;
                this.infoMap.push({
                    id: this.qcBulk[counter].empId,
                    name: this.qcBulk[counter].name,
                    notifications: []
                });
            }

            if (this.infoMap[this.qcMapping[this.qcBulk[counter].empId]].notifications.length < maxCounter) {
                let notifDate = new Date(this.qcBulk[counter].dayToday);
                this.infoMap[this.qcMapping[this.qcBulk[counter].empId]].notifications.push(notifDate);
            }
        }
    }

    ionViewWillEnter() {
        this.qcData = [];
        this.qcPlaceHolder = 0;
        this.addData();
        this.onScrollTop();
    }

    onShowNotification() {
        const modal = this._modalCtrl.create(ModalNotificationPage, {
            location: "QC",
            mapData: this.infoMap
        });
        modal.present();
    }

    addData() {
        for (let counter = 0; counter < this.displayLimit; counter++) {
            if (this.qcBulk[this.qcPlaceHolder]) {
                if (this.qcBulk[this.qcPlaceHolder].today) {
                    this.forShare.push(this.qcBulk[this.qcPlaceHolder].name);
                }
                this.qcData.push(this.qcBulk[this.qcPlaceHolder]);
                this.qcPlaceHolder++;
            }
        }
    }

    onSelectChange(selectedValue: any) {
        this.allowInfinite = (selectedValue === 'ALL');
    }

    doInfinite(infiniteScroll) {
        console.log('Begin async operation');

        setTimeout(() => {
            this.addData();

            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 500);
    }

    onScrollTop() {
        $('page-site-qc div.scroll-content').animate({
            scrollTop: 0
        }, 500);
    }

    onShareQc() {
        let shareMsg: string = "Nobody is scheduled to do hoteling today for QC.";

        if (this.forShare.length > 0) {
            shareMsg = "QC hoteling scheduled for today";

            shareMsg += (this.forShare.length > 1) ? " are " : " is ";

            for (let counter = 0; counter < this.forShare.length; counter++) {
                if (counter === 0) {
                    shareMsg += this.forShare[counter];
                } else if (counter === (this.forShare.length - 1)) {
                    shareMsg += ", and " + this.forShare[counter];
                } else {
                    shareMsg += ", " + this.forShare[counter];
                }
            }

            shareMsg += ".";
        }

        this._socialSharingService
            .share(shareMsg, "QC Hoteling", "./assets/imgs/share-icon.png", null)
            .then(() => {
                console.log('Success!');
            }).catch(() => {
                console.log('Error!');
            });
    }
}
