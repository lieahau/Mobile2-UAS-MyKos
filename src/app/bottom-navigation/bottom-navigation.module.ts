import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BottomNavigationPage } from './bottom-navigation.page';
import { BottomNavigationRoutingModule } from './bottom-navigation-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BottomNavigationRoutingModule
  ],
  declarations: [BottomNavigationPage]
})
export class BottomNavigationPageModule {}
