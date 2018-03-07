import { Component } from '@angular/core';
import * as $ from 'jquery';
import {CardInfo} from "../../shared/interface/card-info.interface";
import {DATA_QC} from "../../data/data-qc";
import {ModalController} from "ionic-angular";
import {ModalNotificationPage} from "../modal-notification/modal-notification";
import {SessionService} from "../../shared/services/session.service";
import {HomeBasePage} from "../home-base/home-base";

@Component({
    selector: 'page-site-qc',
    templateUrl: 'site-qc.html',
})
export class SiteQcPage {
    qcData: any[] = [];
    qcBulk: any[] = [];
    dataInfo: {[n: number]: CardInfo} = {};
    qcPlaceHolder: number = 0;
    displayLimit: number = 10;
    empData: any;
    listFilter: string = "ALL";

    constructor(
        private _modalCtrl: ModalController,
        private _sessionService: SessionService
    ) {
        this.empData = DATA_QC;
        this.qcBulk = this._sessionService.qcBulk;
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
            this.qcBulk = this._sessionService.qcBulk;
        } else {
            this.qcBulk = this.dataInfo[selectedValue].notifications;
        }

        this.qcData = [];
        this.qcPlaceHolder = 0;
        this.addData();
        this.onScrollTop();
    }

    onShowNotification() {
        const modal = this._modalCtrl.create(ModalNotificationPage);
        modal.present();
    }

    addData() {
        for (let counter = 0; counter < this.displayLimit; counter++) {
            if (this.qcBulk[this.qcPlaceHolder]) {
                this.qcData.push(this.qcBulk[this.qcPlaceHolder]);
                this.qcPlaceHolder++;
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
        $('page-site-qc div.scroll-content').animate({
            scrollTop: 0
        }, 500);
    }
}
