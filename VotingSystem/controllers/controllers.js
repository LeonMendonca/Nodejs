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
}

export { Controllers };
