import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HeroesPageRoutingModule } from './heroes-routing.module';
import { HeroesPage } from './heroes.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    HeroesPageRoutingModule
  ],
  declarations: [HeroesPage]
})
export class HeroesPageModule {}
