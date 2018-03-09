import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeBasePage } from './home-base';

@NgModule({
    declarations: [
        HomeBasePage,
    ],
    imports: [
        IonicPageModule.forChild(HomeBasePage),
    ],
})
export class HomeBasePageModule {}
