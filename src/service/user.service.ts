import { Request } from "express";
import { sequelize } from "../config/database"
import { ResponseHelper } from "../helper/response.helper";
import { cryptPassword } from "../helper/utility.helper";
import { User } from "../model/user.model";

export const createUser = async(req: Request) => {
    const t = await sequelize.transaction();
    try {
        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: await cryptPassword(req.body.password)
        }

        const user = await User.create(userData, { transaction: t });
        await t.commit();
        return ResponseHelper.success(user, 'User created successfully');
    } catch (error: any) {
        await t.rollback();
        throw ResponseHelper.error(error.message, 500);
    }
}

export const updateUser = async(req: Request) => {
    const t = await sequelize.transaction();
    try {
        const user = await User.findByPk(req.params.id, { transaction: t });
        if(!user) throw new Error('User not found');
        user.name = req.body.name || user.name;
        
        if(req.body.email) {
            const checkEmail = await User.findOne({ where: { email: req.body.email }, transaction: t });
            if(checkEmail) {
                if(checkEmail.id !== user.id) throw new Error('Email already exists');
            }

            user.email = req.body.email;
        }
        
        if(req.body.password) {
            const password = await cryptPassword(req.body.password);
            user.password = password;
        }

        await user.save({ transaction: t });
        await t.commit();
        return ResponseHelper.success(user, 'User updated successfully');
    } catch (error: any) {
        await t.rollback();
        throw ResponseHelper.error(error.message, 500);
    }
}

export const deleteUser = async(req: Request) => {
    const t = await sequelize.transaction();
    try {
        const user = await User.findByPk(req.params.id, { transaction: t });
        if(!user) throw new Error('User not found');
        await user.destroy({ transaction: t });
        await t.commit();
        return ResponseHelper.success('User deleted successfully');
    } catch (error: any) {
        await t.rollback();
        throw ResponseHelper.error(error.message, 500);
    }
}