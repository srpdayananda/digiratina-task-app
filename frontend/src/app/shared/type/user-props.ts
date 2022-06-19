import { HttpResponse } from './common';
import { IUser } from '../interface/user.interface'

export type GetUsersResponseProps = HttpResponse & {
    users: Array<IUser>;
}