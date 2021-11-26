import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ErrorMessageComponent } from './error-message/error-message.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { ResponsiveContainerComponent } from './responsive-container/responsive-container.component';

@NgModule({
  declarations: [
    ResponsiveContainerComponent,
    InputFieldComponent,
    ErrorMessageComponent
  ],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule
  ],
  exports: [
    ResponsiveContainerComponent,
    InputFieldComponent,
    ErrorMessageComponent
  ]
})
export class ComponentsModule { }
