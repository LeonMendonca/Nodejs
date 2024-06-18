import express from 'express';
import { resolve } from 'path';

import { html } from './routers/htmlRouter.js';
import { reqHandler } from './routers/reqHandler.js';

const app = express();
const port = process.env.PORT;


app.use(express.static(resolve('./public')));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/',html);
app.use('/',reqHandler);

app.use(function(req,res) {
  res.status(404).send('404')
})
app.listen(port,()=> {
  console.log(`listening to port ${port}`);
})
