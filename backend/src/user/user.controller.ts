import express from "express";
import bcrypt from "bcrypt";

import { RoleEnum } from "../common/enums/role";
import { IRequest } from "../common/interfaces/request";
import User from './user.model';
import isAdmin from '../common/permissions/isAdmin';


export default {
    async createUser(req: IRequest, res: express.Response) {
        try {
            const isAdminRole = await isAdmin(req.user.userId);
            if (!isAdminRole) {
                return res.status(400).send({
                    success: false,
                    message: "You Have not Permission",
                });
            }

            const reqBody = req.body;
            const errors = [];
            if (!reqBody.userName) {
                errors.push("userName is required");
            }
            if (!reqBody.name) {
                errors.push("Name is required");
            }
            if (!reqBody.address) {
                errors.push("address is required");
            }
            if (!reqBody.mobileNumber) {
                errors.push("mobileNumber is required");
            }
            if (!reqBody.password) {
                errors.push("Password is required");
            }
            if (reqBody.password && !(reqBody.password.length > 7)) {
                errors.push("Password is minium 8 characters");
            }

            const roleKeys = Object.keys(RoleEnum).includes(reqBody.role);
            if (!roleKeys) {
                errors.push(
                    "Please enter valid role.. Valid role are ADMIN & USER"
                );
            }

            const foundUser = await User.findOne({ userName: req.body.userName });
            if (foundUser) {
                errors.push("User with userName is already added");
            }
            if (errors.length > 0) {
                return res.status(400).send({
                    success: false,
                    message: "Failed User Created",
                    errors: errors,
                });
            }
            if (!foundUser) {
                const bPassword = await bcrypt.hash("12345678", 10);
                await User.create({
                    userName: req.body.userName,
                    name: req.body.name,
                    address: req.body.address,
                    mobileNumber: req.body.mobileNumber,
                    password: bPassword,
                    role: req.body.role,
                    accessToken: null,
                });
            }

            return res.status(200).send({
                success: true,
                message: "User Created Successfully",
            });
        } catch (error) {
            return res.status(400).send({ success: false, message: "Internal server error" });
        }
    },
    async getUsers(req: IRequest, res: express.Response) {
        try {
            const isAdminRole = await isAdmin(req.user.userId);
            if (!isAdminRole) {
                return res.status(400).send({
                    success: false,
                    message: "You Have not Permission",
                });
            }

            let query = { role: RoleEnum.USER }

            const foundUsers = await User.find(query);
            const modifyUser = foundUsers.map((user: any) => {
                return { id: user._id, userName: user.userName, name: user.name, address: user.address, mobileNumber: user.mobileNumber, role: user.role }
            })

            return res.status(200).send({
                success: true,
                message: "User Getting Successfully",
                users: modifyUser,
            });
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: "Internal server error",
            });
        }
    },
    async updateUser(req: IRequest, res: express.Response) {
        try {
            const isAdminRole = await isAdmin(req.user.userId);
            if (!isAdminRole) {
                return res.status(400).send({
                    success: false,
                    message: "You Have not Permission",
                });
            }
            const foundUser = await User.findOne({ _id: req.body.id });
            if (!foundUser) {
                return res.status(400).send({
                    success: false,
                    message: "Failed User Updated!",
                    errors: ["couldn't find relevant UserId"],
                });
            }
            const query = { _id: req.body.id };
            const newValue = {
                name: req.body.name,
                address: req.body.address,
                mobileNumber: req.body.mobileNumber,
            };

            const updateUser = await User.updateOne(query, newValue);
            return res.status(200).send({
                success: true,
                message: "User Updated Successfully",
                user: updateUser
            });
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: "Internal server error",
            });
        }
    },
    async deleteUser(req: IRequest, res: express.Response) {
        try {
            const isAdminRole = await isAdmin(req.user.userId);
            if (!isAdminRole) {
                return res.status(400).send({
                    success: false,
                    message: "You Have not Permission",
                });
            }

            const foundUser = await User.findOne({ _id: req.query.id });
            if (!foundUser) {
                return res.status(400).send({
                    success: false,
                    message: "Failed User Deleted!",
                    errors: ["couldn't find relevant UserId"],
                });
            }

            await User.deleteOne({ _id: req.query.id });
            return res.status(200).send({
                success: true,
                message: "User Deleted Successfully",
            });
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: "Internal server error",
            });
        }
    },
}


