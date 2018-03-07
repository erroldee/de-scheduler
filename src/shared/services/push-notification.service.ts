import {Injectable} from "@angular/core";
import {FCM} from "@ionic-native/fcm";

@Injectable()
export class PushNotificationService {
    constructor(
        private _fcm: FCM
    ) {
        this.tokenSetup();
        this.subscribeToTopic("ALL");
    }

    subscribeToTopic(topic: string) {
        this._fcm.subscribeToTopic(topic);
    }

    unsubscribeFromTopic(topic: string) {
        this._fcm.unsubscribeFromTopic(topic);
    }

    tokenSetup() {
        console.log("tokenSetup");

        this._fcm.getToken().then(token => {
            console.log('Token Received!');
            console.log('Token: ' + token);
        });

        this._fcm.onTokenRefresh().subscribe(token => {
            console.log('Token Refreshed!');
            console.log('New Token: ' + token);
        });
    }

    onNotification(callback: any) {
        this._fcm.onNotification().subscribe(callback);
    }
}
