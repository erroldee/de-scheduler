import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SiteMckPage } from './site-mck';

@NgModule({
    declarations: [
        SiteMckPage
    ],
    imports: [
        IonicPageModule.forChild(SiteMckPage),
    ],
})
export class SiteMckPageModule {}
