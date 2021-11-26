import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


import { AddHeroPageRoutingModule } from './add-hero-routing.module';
import { AddHeroPage } from './add-hero.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
    AddHeroPageRoutingModule
  ],
  declarations: [AddHeroPage]
})
export class AddHeroPageModule {}
