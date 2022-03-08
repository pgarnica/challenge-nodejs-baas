import express from 'express';
import { json } from 'body-parser';
import { apiRouter } from './router/router'
import mongoose from './mongoDb';
import {personRoutes} from './router/person.routes'
import { accountRoutes } from './router/account.routes';
import { transactionRoutes } from './router/transaction.routes';
import { authenticationRoutes } from './router/authentication.routes';
import dotenv from 'dotenv'
import path from 'path'


const app = express()
app.use(json())
app.use(apiRouter)
app.use(personRoutes);
app.use(accountRoutes);
app.use(transactionRoutes)
app.use(authenticationRoutes)
app.use(
    "/apidoc",
    express.static(path.resolve(__dirname, "..", "apidoc"))
  );

mongoose.connect();
dotenv.config();
 
app.listen(process.env.PORT)