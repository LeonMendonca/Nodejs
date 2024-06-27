import { Router } from 'express';
//import { resolve, join } from 'path';

import { createUser } from '../utils/dbOps.js';
import { Controllers } from '../controllers/controllers.js';

const reqHandler = Router();

reqHandler.post('/signup',Controllers.CreateUser)

export { reqHandler }
