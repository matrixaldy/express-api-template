import { body, query } from "express-validator";
import { User } from "../model/user.model";

export const createUserValidation = [
    body('name')
    .notEmpty().withMessage('Name is required'),
    body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),
];

export const updateUserValidation = [
    body('name')
    .notEmpty().withMessage('Name is required'),
    body('password')
    .optional({ nullable: true })
    .isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('email')
    .optional({ nullable: true })
    .isEmail().withMessage('Invalid email format'),
];

