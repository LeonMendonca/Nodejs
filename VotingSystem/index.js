import express from 'express';
import { resolve } from 'path';
import cookieParser from 'cookie-parser';

import { html } from './routers/htmlRouter.js';
import { reqHandler } from './routers/reqHandler.js';
import { SqlConnect } from './models/db/sqlConn.js';

const sql = SqlConnect();
let pool;

const app = express();
const port = process.env.PORT;


app.use(express.static(resolve('./public')));
app.use(express.static(resolve('./dist')));

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());

app.use('/',html);
app.use('/',reqHandler);

app.use(function(req,res) {
  res.status(404).send('404')
})

try {
  pool = await sql;
  app.listen(port,()=> {
    console.log(`listening to port ${port}`);
  })
} catch (err) {
  console.log(err.message);
}

export { pool };
