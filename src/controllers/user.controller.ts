import { Request, Response } from 'express';
import { createUser, deleteUser, updateUser } from '../service/user.service';
import { ResponseHelper } from '../helper/response.helper';
import { db } from '../config/database';
import * as pagination from '../helper/pagination.helper';
import { User } from '../../prisma/src/generated/prisma';

export const index = async (req: Request, res: Response) => {
    const result = await pagination.paginate<User>(db.user, {
        limit: 15,
        page: Number(req.query.page || 1),
    }, {

    });
    return res.json(result);
}

export const create = async (req: Request, res: Response) => {
    const result = await createUser(req);
    return res.status(result.code).json(result);
}

export const show = async (req: Request, res: Response) => {
    const result = await db.user.findFirst({ where: { id: Number(req.params.id) } });
    if(result) {
        return res.json(ResponseHelper.success(result, 'User found'));
    }
    
    return res.status(404).json(ResponseHelper.notFound('Data not found'));
}

export const update = async (req: Request, res: Response) => {
    const result = await updateUser(req);
    return res.status(result.code).json(result);
}

export const destroy = async (req: Request, res: Response) => {
    const result = await deleteUser(req);
    return res.status(result.code).json(result);
}