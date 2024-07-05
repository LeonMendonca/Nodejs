import { Router } from 'express';

import { Controllers } from '../controllers/controllers.js';
import { protector } from '../protectMiddleware.js';

const reqHandler = Router();

reqHandler.post('/signup',Controllers.CreateUser)

reqHandler.post('/login',Controllers.AuthUser);

//sends sessionid
reqHandler.get('/userprofile',protector,Controllers.GetProfile);

reqHandler.get('/candidates',Controllers.GetCandidates);

export { reqHandler }
