import { HttpResponse } from './common';
import { IUser } from '../interface/user.interface'

export type AuthInputProps = {
    userName: string;
    password: string
}

export type AuthResponseProps = HttpResponse & {
    user: IUser;
}