import express from 'express';
import mongoose from 'mongoose';

import Book from './book.model';
import { IRequest } from '../common/interfaces/request';

export default {
    async createBook(req: IRequest, res: express.Response) {
        try {
            await Book.create({
                name: req.body.name,
                author: req.body.author,
                year: req.body.year,
                userId: mongoose.Types.ObjectId(req.user.userId),
            })
            return res.status(200).send({
                success: true,
                message: 'Book created successfully'
            })
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: 'Internal Sever Error'
            })
        }
    },
    async getBooks(req: IRequest, res: express.Response) {
        try {
            let query = { userId: req.query.id }

            const getBooks = await Book.find(query).populate('userId', ['author'])
            return res.status(200).send({
                success: true,
                message: 'Book got successfully',
                books: getBooks
            })
        }
        catch (error) {
            return res.status(400).send({
                success: false,
                message: 'Internal Sever Error'
            })
        }
    },
    async updateBook(req: IRequest, res: express.Response) {
        try {
            let query = { _id: req.body.id }

            const findBook = await Book.findOne(query);
            if (findBook) {
                let newValue = {
                    name: req.body.name,
                    author: req.body.author,
                    year: req.body.year
                }

                const updateBook = await Book.updateOne(query, newValue)
                return res.status(200).send({
                    success: true,
                    message: 'Book Update Successfully',
                    Book: updateBook
                })
            }
        }
        catch (error) {
            return res.status(400).send({
                success: false,
                message: 'Internal Sever Error'
            })
        }
    },
    async deleteBook(req: IRequest, res: express.Response) {
        try {
            const foundBook = await Book.findOne({ _id: req.query.id });
            if (!foundBook) {
                return res.status(400).send({
                    success: false,
                    message: "Failed Book Deleted!",
                    errors: ["couldn't find relevant UserId"],
                });
            }

            await Book.deleteOne({ _id: req.query.id });
            return res.status(200).send({
                success: true,
                message: "Book Deleted Successfully",
            });
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: "Internal server error",
            });
        }
    },

}