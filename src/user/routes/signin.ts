import jwt from 'jsonwebtoken';
import express, { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { Password } from '../services/password';
import { BadRequestError } from '../../shared/errors';
import { validateRequest } from '../../shared/middlewares';

const router = express.Router();

router.post('/api/users/signin', 
    [
        body('email') 
            .isEmail()
            .withMessage("Email must be valid"),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('Password is required')
    ],
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                throw new BadRequestError('Invalid credentials');
            }

            const passwordsMatch = await Password.compare(user.password, password);
            if (!passwordsMatch) {
                throw new BadRequestError('Invalid credentials');
            }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY!);

            res.status(200).send({token, user});
        } catch (error) {
            next(error);
        }
    }
)

export { router as signinRouter };