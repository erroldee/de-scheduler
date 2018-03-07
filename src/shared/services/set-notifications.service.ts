import {Injectable} from "@angular/core";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {CONSTANTS} from "../constants";

@Injectable()
export class SetNotificationsService {
    constructor(
        private _localNotifications: LocalNotifications
    ) {}

    createNotifications(notificationsArray: any[]) {
        this.cancelAllNotifications();

        const maxSchedule = 15;

        for (let counter = 0; counter < notificationsArray.length; counter++) {
            if (counter < maxSchedule) {
                const schedId = new Date().getTime() + counter;

                this._localNotifications.schedule({
                    id: schedId,
                    text: CONSTANTS.NOTIFICATION_MESSAGE,
                    firstAt: new Date(notificationsArray[counter].dayToday)
                });

                if (this._localNotifications.isScheduled(schedId)) {
                    console.log('scheduled! ' + schedId);
                } else {
                    console.log('oops! ' + schedId);
                }
            }
        }
    }

    cancelAllNotifications() {
        this._localNotifications.cancelAll();
    }
}
