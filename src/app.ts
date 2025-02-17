import express, { NextFunction, Request, Response } from 'express';
import { json } from 'body-parser';
import { signupRouter } from './user/routes/signup';
import { signinRouter } from './user/routes/signin';
import cors from 'cors';
import { NotFoundError } from './shared/errors';
import { errorHandler } from './shared/middlewares';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cors());

// Auth routes
app.use(signinRouter);
app.use(signupRouter);

// Not found routes
app.all('*', async (req: Request, res: Response, next: NextFunction) => {
    try {
        throw new NotFoundError();
    } catch (error) {
        next(error);
    }
});

app.use(errorHandler);

export default app;
