import { Request, Response } from 'express';
import { User } from '../model/user.model';
import { createUser, deleteUser, updateUser } from '../service/user.service';
import { ResponseHelper } from '../helper/response.helper';

export const index = async (req: Request, res: Response) => {
    const users = await User.findAll();
    return res.json(users);
}

export const create = async (req: Request, res: Response) => {
    const result = await createUser(req);
    return res.json(result);
}

export const show = async (req: Request, res: Response) => {
    const result = await User.findByPk(req.params.id);
    if(result) {
        return res.json(ResponseHelper.success(result, 'Data found'));
    }
    
    return res.json(ResponseHelper.notFound('Data not found'));
}

export const update = async (req: Request, res: Response) => {
    const result = await updateUser(req);
    return res.json(result);
}

export const destroy = async (req: Request, res: Response) => {
    const result = await deleteUser(req);
    return res.json(result);
}