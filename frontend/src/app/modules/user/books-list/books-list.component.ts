import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IBook } from '../../../shared/interface/book.interfaces'

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  @Input('books') books!: IBook[];
  @Output() onEdit!: EventEmitter<IBook>;
  @Output() onDelete!: EventEmitter<string>

  constructor() {
    this.onEdit = new EventEmitter<IBook>();
    this.onDelete = new EventEmitter<string>()
  }

  ngOnInit(): void {
  }

  editClickListener(book: IBook) {
    this.onEdit.emit(book)
  }

  deleteClickListener(book: IBook) {
    this.onDelete.emit(book._id)
  }

}
