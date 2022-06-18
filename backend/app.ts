import express from 'express';
import cors from 'cors';

import DB from './config/db';

import auth from './middlewares/auth';

import { authRouter } from './src/auth/auth.index';
import { userRouter } from './src/user/user.index';
import { bookRouter } from './src/book/book.index';

const app = express();
const port = 3000;

DB.connect()
app.use(express.json())
app.use(cors())

app.use('/login', authRouter);
app.use('/user', auth, userRouter)
app.use('/book', auth, bookRouter)

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
})