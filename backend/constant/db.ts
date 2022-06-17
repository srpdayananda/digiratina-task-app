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
            const user1 = await User.findOne({ userName: "admin@digiratina.com" })
            console.log('🚀...Database connected successfully...🚀')
            const hashPassword = await bcrypt.hash('12345678', 10)

            if (!user1) {
                await User.create({
                    userName: 'admin@digiratina.com',
                    password: hashPassword,
                    address: 'No-171, sandala, sole wewa',
                    mobileNumber: "0771642571",
                    role: 'ADMIN',
                    accessToken: null,
                });
                const user2 = await User.findOne({ userName: 'user@digiratina.com' })
                if (!user2) {
                    await User.create({
                        userName: 'user@digiratina.com',
                        password: hashPassword,
                        address: 'No-300,galgamuwa',
                        mobileNumber: "0777344567",
                        role: 'USER',
                        accessToken: null,
                    })
                }
            }
        }
        catch (error) {
            console.error(JSON.stringify(error))
        }
    }
}