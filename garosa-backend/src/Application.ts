import express from 'express';
import cors from 'cors';

import { appConfiguration } from './Application.config';

const app = express();

app.set('port', appConfiguration.app.port);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

export default app;
