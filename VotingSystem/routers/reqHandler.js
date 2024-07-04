import { Router } from 'express';

import { Controllers } from '../controllers/controllers.js';
import { protector } from '../protectMiddleware.js';

const reqHandler = Router();

reqHandler.post('/signup',Controllers.CreateUser)

reqHandler.post('/login',Controllers.AuthUser);

reqHandler.post('/profile',protector,Controllers.GetProfile);

export { reqHandler }
