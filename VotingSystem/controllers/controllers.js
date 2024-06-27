import { Service } from '../models/service.js'

class Controllers {
  static async CreateUser() {
    try {
      console.log("user created");
      await Service.serviceCreateUser();
    } catch(error) {
      console.log(error.message) 
    }
  }
}

export { Controllers };
