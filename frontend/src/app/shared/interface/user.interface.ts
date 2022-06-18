import { Role } from '../enums/role.enum'

export interface IUser {
    id: string,
    username: string;
    password: string;
    name: string;
    address: string;
    mobileNumber: number;
    role: Role;
    accessToken?: string;
}