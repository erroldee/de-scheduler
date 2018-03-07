import {Component} from '@angular/core';
import * as $ from 'jquery';
import {CardInfo} from "../../shared/interface/card-info.interface";
import {DATA_MCK} from "../../data/data-mck";
import {ModalController} from "ionic-angular";
import {ModalNotificationPage} from "../modal-notification/modal-notification";
import {SessionService} from "../../shared/services/session.service";
import {HomeBasePage} from "../home-base/home-base";

@Component({
    selector: 'page-site-mck',
    templateUrl: 'site-mck.html'
})
export class SiteMckPage {
    mckData: any[] = [];
    mckBulk: any[] = [];
    dataInfo: {[n: number]: CardInfo} = {};
    mckPlaceHolder: number = 0;
    displayLimit: number = 10;
    empData: any;
    listFilter: string = "ALL";

    constructor(
        private _modalCtrl: ModalController,
        private _sessionService: SessionService
    ) {
        this.empData = DATA_MCK;
        this.mckBulk = this._sessionService.mckBulk;
        this.dataInfo = this._sessionService.wfhMapped;
    }

    ionViewWillEnter() {
        this.onSelectChange(this.listFilter);
    }

    onSelectHome() {
        const modal = this._modalCtrl.create(HomeBasePage);
        modal.present();
    }

    onSelectChange(selectedValue: any) {
        if (selectedValue === 'ALL') {
            this.mckBulk = this._sessionService.mckBulk;
        } else {
            this.mckBulk = this.dataInfo[selectedValue].notifications;
        }

        this.mckData = [];
        this.mckPlaceHolder = 0;
        this.addData();
        this.onScrollTop();
    }

    onShowNotification() {
        const modal = this._modalCtrl.create(ModalNotificationPage);
        modal.present();
    }

    addData() {
        for (let counter = 0; counter < this.displayLimit; counter++) {
            if (this.mckBulk[this.mckPlaceHolder]) {
                this.mckData.push(this.mckBulk[this.mckPlaceHolder]);
                this.mckPlaceHolder++;
            }
        }
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
}
