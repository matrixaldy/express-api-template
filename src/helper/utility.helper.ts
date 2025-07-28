import { config } from "../config/config";

export const cryptPassword = async (password: string) => {
    const bcrypt = require('bcrypt');
    const saltRound = await bcrypt.genSaltSync(10);

    const pass = password+config.key;

    return await bcrypt.hash(pass, saltRound);
};

export const hashPassword = async (password: string, hashedPassword: string) => {
    const bcrypt = require('bcrypt');
    const pass = password+config.key;

    return bcrypt.compare(pass, hashedPassword);
}