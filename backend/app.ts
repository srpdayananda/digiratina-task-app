import express from 'express';
import cors from 'cors';

import DB from './config/db';

import auth from './middlewares/auth';

import { authRouter } from './src/auth';
import { userRouter } from './src/user';
import { bookRouter } from './src/book';

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