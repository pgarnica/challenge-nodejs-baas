import express from 'express';
import { json } from 'body-parser';
import { apiRouter } from './router/router'
import mongoose from './mongoDb';
import {personRoutes} from './router/person.routes'
import dotenv from 'dotenv'
import { accountRoutes } from './router/account.routes';

const app = express()
app.use(json())
app.use(apiRouter)
app.use(personRoutes);
app.use(accountRoutes);

mongoose.connect();
dotenv.config();
 
app.listen(process.env.PORT)