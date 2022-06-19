import { HttpResponse } from './common';
import { IBook } from '../interface/book.interface'

export type GetBooksResponseProps = HttpResponse & {
    books: Array<IBook>;
}