import express from 'express';
import cors from 'cors';

import { appConfiguration } from './Application.config';

import userRouter from './Routes/UserRoutes';
import userAccessRouter from './Routes/UserAccessRoutes';

const app = express();

app.set('port', appConfiguration.app.port);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/users', userRouter);
app.use('/accesses', userAccessRouter);

export default app;
