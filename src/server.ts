import express from 'express';
import { json } from 'body-parser';
import { apiRouter } from './router/router'
import mongoose from './mongoDb';
import {personRoutes} from './router/person.routes'

const app = express()
app.use(json())
app.use(apiRouter)
app.use(personRoutes);

mongoose.connect();

app.listen(3000, () => {
  console.log('server is listening on port 3000')
})