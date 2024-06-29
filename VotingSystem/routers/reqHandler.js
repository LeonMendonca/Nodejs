import { Router } from 'express';

import { Controllers } from '../controllers/controllers.js';

const reqHandler = Router();

reqHandler.post('/signup',Controllers.CreateUser)

export { reqHandler }
