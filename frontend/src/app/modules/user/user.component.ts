import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { BookService } from 'src/app/core/services/book/book.service';
import { DataService } from 'src/app/core/services/data/data.service';
import { ConformationPopupComponent } from 'src/app/shared/components/conformation-popup/conformation-popup.component';
import { IBook } from '../../shared/interface/book.interfaces';
import { BookAddEditComponent } from './book-add-edit/book-add-edit.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('onAddEditBookModal') onAddEditBookModal!: BookAddEditComponent;
  @ViewChild('deleteBookModal') deleteBookModal!: ConformationPopupComponent;
  booksList: Array<IBook>;
  id!: string;
  deleteBookId!: string | null;

  constructor(
    private booksService: BookService,
    private toastr: ToastrService,
    private dataService: DataService
  ) {
    this.booksList = [];
    this.deleteBookId = null;
  }

  ngOnInit(): void {
    this.getLoggedUser()
    this.getbooksList()
  }

  onRefetch(refetch: boolean) {
    if (refetch) {
      this.getbooksList();
    }
  }
  getLoggedUser() {
    this.dataService.getLoggedUser().subscribe((loggedUser) => {
      if (loggedUser) {
        this.id = loggedUser.id;
      }
    })
  }

  addBookModal() {
    this.onAddEditBookModal.openModal()
  }

  onEditBook(book: IBook) {
    this.onAddEditBookModal.openModal(book)
  }

  getbooksList() {
    this.booksService.getBooks(this.id).subscribe((response) => {
      if (response.success) {
        this.booksList = response?.books || []
      }
    }, (err) => {
      const errors = err?.error?.errors
      if (errors.length) {
        errors.map((message: string) => this.toastr.error(message))
      }
    })
  }

  onDeleteBook(bookId: string) {
    if (bookId) {
      this.deleteBookId = bookId;
      const message: string = 'Are you sure you want to delete this book ..?'
      this.deleteBookModal.openModal(message)
    }
  }

  onConform(isConform: boolean) {
    if (isConform && this.deleteBookId) {
      this.booksService.deleteBook(this.deleteBookId).subscribe((response) => {
        if (response.success) {
          this.toastr.success(response.message);
          this.deleteBookId = null
          this.getbooksList()
        }
      }, (err) => {
        const errors = err?.error?.errors;
        if (errors.length) {
          errors.map((message: string) => this.toastr.error(message))
        }
      })

    }
  }


}
