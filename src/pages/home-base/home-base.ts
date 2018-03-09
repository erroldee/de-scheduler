import { Component } from '@angular/core';
import {ViewController} from "ionic-angular";
import {HomeBases} from "../../shared/interface/homebases.enum";
import {DefaultHomeService} from "../../shared/services/default-home.service";
import {SessionService} from "../../shared/services/session.service";
import {PushNotificationService} from "../../shared/services/push-notification.service";

@Component({
    selector: 'page-home-base',
    templateUrl: 'home-base.html',
})
export class HomeBasePage {
    baseOptions: string[] = Object.keys(HomeBases);
    selectedBase: string;

    constructor(
        private _defaultHomeService: DefaultHomeService,
        private _viewCtrl: ViewController,
        private _sessionService: SessionService,
        private _pushNotificationService: PushNotificationService
    ) {}

    ionViewDidLoad() {
        this.selectedBase = this._sessionService.homeBase;
    }

    onSelectedBase() {
        if (this.selectedBase) {
            this._defaultHomeService.setHome(HomeBases[this.selectedBase]);
            this.baseOptions.forEach((base) => {
                console.log(base);
                if (base == this.selectedBase) {
                    this._pushNotificationService.subscribeToTopic(base);
                } else {
                    this._pushNotificationService.unsubscribeFromTopic(base);
                }
            });
        }
    }

    dismiss() {
        this._viewCtrl.dismiss();
    }
}
