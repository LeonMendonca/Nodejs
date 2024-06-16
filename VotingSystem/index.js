import express from 'express';
import { resolve } from 'path';

import { ejs } from './routers/ejsRouter.js'

const app = express();
const port = process.env.PORT;

app.set('views',resolve('./views'));
app.set('view engine', 'ejs')

app.use('/',ejs)

app.listen(port,()=> {
  console.log(`listening to port ${port}`);
})
