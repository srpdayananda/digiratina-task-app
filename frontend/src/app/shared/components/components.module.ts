import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { ConformationPopupComponent } from './conformation-popup/conformation-popup.component';


@NgModule({
  declarations: [
    HeaderComponent,
    ConformationPopupComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    ConformationPopupComponent
  ]
})
export class ComponentsModule { }
