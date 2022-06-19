import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, TemplateRef, EventEmitter, Output } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BookService } from '../../../core/services/book/book.service'
import { ToastrService } from 'ngx-toastr';
import { IBook } from 'src/app/shared/interface/book.interface';

@Component({
  selector: 'app-book-add-edit',
  templateUrl: './book-add-edit.component.html',
  styleUrls: ['./book-add-edit.component.css']
})
export class BookAddEditComponent implements OnInit {
  @ViewChild('template') template!: TemplateRef<any>
  modalRef?: BsModalRef;
  form!: FormGroup;
  @Output() refetch!: EventEmitter<boolean>
  editBookId!: string | null;

  constructor(
    private bookService: BookService,
    private toastr: ToastrService,
    private modalService: BsModalService,
  ) {
    this.refetch = new EventEmitter(false)
    this.editBookId = null
  }

  ngOnInit(): void {
  }

  get f() {
    return this.form.controls
  }

  openModal(book?: IBook) {
    if (book) {
      this.editBookId = book._id;
      this.form = new FormGroup({
        name: new FormControl(book.name, Validators.required),
        author: new FormControl(book.author, Validators.required),
        year: new FormControl(book.year, Validators.required)
      })

    } else {
      this.form = new FormGroup({
        name: new FormControl('', Validators.required),
        author: new FormControl('', Validators.required),
        year: new FormControl('', Validators.required)
      })
    }

    this.modalRef = this.modalService.show(this.template, {
      class: 'bs-modal-top-20',
      animated: true,
      ignoreBackdropClick: true
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    if (this.editBookId) {
      this.onUpdateBook();
      return;
    }
    this.onCreateBook()
  }

  onClosed() {
    this.modalRef?.hide();
    setTimeout(() => {
      this.form.reset()
      this.editBookId = null
    }, 500)
  }

  onUpdateBook() {
    const props = {
      id: this.editBookId,
      name: this.form.controls['name'].value,
      author: this.form.controls['author'].value,
      year: this.form.controls['year'].value
    }
    this.bookService.updateBook(props).subscribe((response) => {
      if (response.success) {
        this.toastr.success(response.message)
        this.modalService.hide()
        setTimeout(() => {
          this.form.reset();
          this.editBookId = null
        }, 500);
        this.refetch.emit(true)
      }
    }, (err) => {
      const errors = err?.error?.errors;
      if (errors.length) {
        errors.map((message: string) => this.toastr.error(message))
      }
    })
  }

  onCreateBook() {
    this.bookService.createBook(this.form.value).subscribe((response) => {
      if (response.success) {
        this.toastr.success(response.message)
        this.modalRef?.hide()
        setTimeout(() => {
          this.form.reset()
        }, 500)
        this.refetch.emit(true)
      }
    }, (err) => {
      const errors = err?.error?.errors;
      if (errors.length) {
        errors.map((message: string) => this.toastr.error(message))
      }
    })
  }

}
