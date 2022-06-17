import express from 'express';

import bookController from './book.controller'

export const bookRouter = express.Router()
bookRouter
    .route('/')
    .post(bookController.createBook)
    .get(bookController.getBooks)
    .put(bookController.updateBook)
    .delete(bookController.deleteBook);