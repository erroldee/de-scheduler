import {Component} from "@angular/core";
import {SiteMckPage} from "../site-mck/site-mck";
import {SiteQcPage} from "../site-qc/site-qc";

@Component({
    selector: 'page-tab-sites',
    template: `
        <ion-tabs>
            <ion-tab [root]="mckPage" tabTitle="McKinley" tabIcon="home"></ion-tab>
            <ion-tab [root]="qcPage" tabTitle="Quezon City" tabIcon="people"></ion-tab>
        </ion-tabs>
    `
})
export class TabSitesPage {
    mckPage: object = SiteMckPage;
    qcPage: object = SiteQcPage;
}
