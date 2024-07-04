import { Service } from '../models/service.js'

class Controllers {
  static async CreateUser(req,res) {
    try {
      await Service.serviceCreateUser(req.body);
      res.json({status:'user created'});
    } catch(error) {
      res.json({error:error.message});
    }
  }

  static async AuthUser(req,res) {
    try {
      const sessionId = req.headers?.authentication.split(' ')[1];
      const { loggedInUser, sid } = await Service.serviceAuthCheck(sessionId,req.body);
      res.header('Authentication',`Bearer ${sid}`).json({status:loggedInUser});
    } catch(error) {
      res.json({error:error.message});
    }
  }

  static async GetProfile(req,res) {
    try {
      const userProfileData = await Service.serviceGetProfile(req.body?.sid);
      res.json({status:userProfileData});
    } catch(error) {
      res.json({error:error.message});
    }
  }
}

export { Controllers };
