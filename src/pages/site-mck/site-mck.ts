import {Component} from '@angular/core';
import * as $ from 'jquery';
import {CreateScheduleService} from "../../shared/services/create-schedule.service";
import {CardInfo} from "../../shared/interface/card-info.interface";
import {CONSTANTS} from "../../shared/constants";
import {DATA_MCK} from "../../data/data-mck";
import {SocialSharing} from "@ionic-native/social-sharing";
import {ModalController} from "ionic-angular";
import {ModalNotificationPage} from "../modal-notification/modal-notification";
import {InfoMapping} from "../../shared/interface/info-mapping.interface";
import {LocalNotifications} from "@ionic-native/local-notifications";

@Component({
    selector: 'page-site-mck',
    templateUrl: 'site-mck.html'
})
export class SiteMckPage {
    mckData: CardInfo[] = [];
    mckBulk: CardInfo[] = [];
    mckPlaceHolder: number = 0;
    displayLimit: number = 10;
    allowInfinite: boolean = true;
    empData: any;
    listFilter: string = "ALL";
    forShare: string[] = [];
    mckMapping: {[s: string]: number} = {};
    infoMap: InfoMapping[] = [];

    constructor(
        _createScheduleService: CreateScheduleService,
        private _socialSharingService: SocialSharing,
        private _modalCtrl: ModalController,
		private _localNotifications: LocalNotifications
    ) {
        this.empData = DATA_MCK;
        this.mckBulk = _createScheduleService.getSchedule(CONSTANTS.MCK_START_DATE, DATA_MCK, CONSTANTS.MCK_LIMIT);

		const maxCounter = 15;

        for (let counter = 0; counter < this.mckBulk.length; counter++) {
            if (this.mckMapping[this.mckBulk[counter].empId] === undefined) {
                this.mckMapping[this.mckBulk[counter].empId] = this.infoMap.length;
                this.infoMap.push({
                    id: this.mckBulk[counter].empId,
                    name: this.mckBulk[counter].name,
                    notifications: []
                });
            }

            if (this.infoMap[this.mckMapping[this.mckBulk[counter].empId]].notifications.length < maxCounter) {
                let notifDate = new Date(this.mckBulk[counter].dayToday);
                this.infoMap[this.mckMapping[this.mckBulk[counter].empId]].notifications.push(notifDate);
            }
        }

		this._localNotifications.on("click", (success) => {
			console.log('clicked');
		});
    }

    ionViewWillEnter() {
        this.mckData = [];
        this.mckPlaceHolder = 0;
        this.addData();
        this.onScrollTop();
    }

    onShowNotification() {
        const modal = this._modalCtrl.create(ModalNotificationPage, {
            location: "MCK",
            mapData: this.infoMap
        });
        modal.present();
    }

    addData() {
        for (let counter = 0; counter < this.displayLimit; counter++) {
            if (this.mckBulk[this.mckPlaceHolder]) {
                if (this.mckBulk[this.mckPlaceHolder].today) {
                    this.forShare.push(this.mckBulk[this.mckPlaceHolder].name);
                }
                this.mckData.push(this.mckBulk[this.mckPlaceHolder]);
                this.mckPlaceHolder++;
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
        $('page-site-mck div.scroll-content').animate({
            scrollTop: 0
        }, 500);
    }

    onShareMck() {
        let shareMsg: string = "Nobody is scheduled to do hoteling today for MCK.";

        if (this.forShare.length > 0) {
            shareMsg = "MCK hoteling scheduled for today";

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
            .share(shareMsg, "MCK Hoteling", "./assets/imgs/share-icon.png", null)
            .then(() => {
                console.log('Success!');
            }).catch(() => {
            console.log('Error!');
        });
    }
}
