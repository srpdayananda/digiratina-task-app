import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { TOKEN_KEY } from '../../constant/constant';
import User from '../user/user.model';

export default {
    async login(req: express.Request, res: express.Response) {
        try {
            const { userName, password } = req.body;

            if (!(userName && password)) {
                return res.status(400).send({
                    success: false,
                    error: 'Both userName and password are required',
                });
            }

            const user = await User.findOne({ userName });
            if (!user) {
                return res.status(400).send({
                    success: false,
                    error: 'No registered user with the userName',
                });
            }
            const passwordMatched = await bcrypt.compare(password, user.password);
            if (!passwordMatched) {
                return res.status(400).send({
                    success: false,
                    error: 'You entered a wrong password',
                });
            }

            const token = jwt.sign({ userId: user._id, userName }, TOKEN_KEY, {
                expiresIn: '1d',
            });
            await User.updateOne({ _id: user._id }, { accessToken: token });

            const userDetails = {
                id: user._id,
                userName: user.userName,
                address: user.address,
                mobileNumber: user.mobileNumber,
                role: user.role,
                accessToken: token,
            };
            return res.status(200).send({
                success: true,
                message: 'Login successfully',
                user: userDetails,
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                error: 'Internal Server Error',
            });
        }
    },
};