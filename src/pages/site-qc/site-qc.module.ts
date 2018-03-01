import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SiteQcPage } from './site-qc';

@NgModule({
    declarations: [
        SiteQcPage,
    ],
    imports: [
        IonicPageModule.forChild(SiteQcPage),
    ],
})
export class SiteQcPageModule {}
