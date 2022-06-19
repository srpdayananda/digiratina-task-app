import { ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap/modal';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { BooksListComponent } from './books-list/books-list.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { BookAddEditComponent } from './book-add-edit/book-add-edit.component';


@NgModule({
  declarations: [
    UserComponent,
    BooksListComponent,
    BookAddEditComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ComponentsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserModule { }
