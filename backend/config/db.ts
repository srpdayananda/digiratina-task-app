import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import User from '../src/user/user.model';

export default {
    async connect() {
        try {
            await mongoose.connect(
                'mongodb://localhost/digiratina_task_app',
                { useNewUrlParser: true }
            );
            const user = await User.findOne({ userName: "admin@digiratina.com" })
            console.log('🚀...Database connected successfully...🚀')
            const hashPassword = await bcrypt.hash('12345678', 10)

            if (!user) {
                await User.create({
                    userName: 'admin@digiratina.com',
                    password: hashPassword,
                    name: 'John Doe',
                    address: '123, Colombo, Sri Lanka',
                    mobileNumber: "0771642571",
                    role: 'ADMIN',
                    accessToken: null,
                });
            }
        }
        catch (error) {
            console.error(JSON.stringify(error))
        }
    }
}