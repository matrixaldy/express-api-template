import { Request } from "express";
import { ResponseHelper } from "../helper/response.helper";
import { cryptPassword } from "../helper/utility.helper";
import { db } from "../config/database";

export const createUser = async(req: Request) => {
    try {
        const user = await db.$transaction(async (tx) => {
            const userData = {
                name: req.body.name,
                email: req.body.email,
                password: await cryptPassword(req.body.password)
            }

            const emailCheck = await tx.user.findFirst({ where: { email: userData.email }});
            if(emailCheck) throw new Error('Email already exists');

            const result = await tx.user.create({
                data: userData
            });

            return result;
        });

        return ResponseHelper.success(user, 'User created successfully');
    } catch (error: any) {
        throw ResponseHelper.error(error.message, 500);
    }
}

export const updateUser = async(req: Request) => {
    try {
        const result = await db.$transaction(async (tx) => {
            const user = await tx.user.findFirst({ where: { id: Number(req.params.id) }});
            if(!user) throw new Error('User not found');
            user.name = req.body.name || user.name;
            
            if(req.body.email) {
                const checkEmail = await tx.user.findFirst({ where: { email: req.body.email }});
                if(checkEmail) {
                    if(checkEmail.id !== user.id) throw new Error('Email already exists');
                }

                user.email = req.body.email;
            }
            
            if(req.body.password) {
                const password = await cryptPassword(req.body.password);
                user.password = password;
            }

            return await tx.user.update({ where: { id: user.id }, data: user });
        });

        return ResponseHelper.success(result, 'User updated successfully');
    } catch (error: any) {
        throw ResponseHelper.error(error.message, 500);
    }
}

export const deleteUser = async(req: Request) => {
    try {
        await db.$transaction(async (tx) => {
            const user = await tx.user.findFirst({ where: { id: Number(req.params.id) }});
            if(!user) throw new Error('User not found');
            await tx.user.delete({ where: { id: user.id } });
        });

        return ResponseHelper.success('User deleted successfully');
    } catch (error: any) {
        throw ResponseHelper.error(error.message, 500);
    }
}