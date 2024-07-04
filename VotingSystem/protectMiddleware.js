import { checkSessionId } from './session.js';

function protector(req, res, next) {
    const authHeader = req.headers['authentication'];
    if (!authHeader) {
      console.log('No authentication header');
      return res.json({error:JSON.stringify({authHeader:false})});
    }

    const sessionId = authHeader.split(' ')[1];
    if (!sessionId) {
      console.log('No session ID found');
      return res.json({error:JSON.stringify({sessionId:false})});
    }

    const isValidSid = checkSessionId(sessionId);
    console.log('Session ID valid:', isValidSid);

    if (!isValidSid) {
      console.log('Redirecting to login page');
      return res.json({error:JSON.stringify({sessionId:false})});
    }

    console.log('Session ID valid, proceeding');
    next();
}

export { protector };
