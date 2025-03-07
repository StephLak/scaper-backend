import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';

import { User } from '../models/user';
import { validateRequest } from '../../shared/middlewares';
import { BadRequestError } from '../../shared/errors';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage("Email must be valid"),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters')
    ], 
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                throw new BadRequestError('Email already in use');
            } else {
                const user = User.build({ email, password});
                await user.save();

                res.status(201).send(user);
            }
        } catch (error) {
            next(error);
       }
});

export { router as signupRouter };