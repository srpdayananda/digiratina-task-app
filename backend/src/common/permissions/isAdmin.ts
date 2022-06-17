import { RoleEnum } from "../enums/role";
import User from '../../user/user.model';

export default async function isAdmin(id: string) {
    const user = await User.findById(id);
    if (user.role === RoleEnum.ADMIN) {
        return true;
    }
    return false;
}