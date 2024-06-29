import Joi from 'joi';

import { DtoRequest } from '../dto/dtoRequest.js';
import { Dao } from './dao.js';

//custom date function
const date = Joi.string().custom((value,error) => {
  const date = new Date(value);
  //true if date format is incorrect
  if(isNaN(date)) {
    return error.message('"date" invalid date format');
  }
  return value;
})

const joiSchema = Joi.object({
  aadharnumber: Joi.string().length(12).required(),
  password: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9!@#$%^&*(),.?":'{}|<>]*$/)).required(),
  confirmpassword: Joi.ref('password'),
  currentaddress: Joi.string().required(),
  date: date.required(),
  district: Joi.string().required(),
  email: Joi.string().email().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  gender: Joi.string().valid('male','female','others').required(),
  permanentaddress: Joi.string().required(),
  phonenumber: Joi.string().length(10).required(),
  state: Joi.string().required(),
  taluka: Joi.string().required(),
  tnc: Joi.string().valid('true').required(),
  username: Joi.string().required(),
  zipcode: Joi.string().length(6).required()
})

class Service {
  static async serviceCreateUser(body) {
    try {
      console.log('service create user',body);
      const dtoRequest = new DtoRequest(body);
      const { error } = joiSchema.validate(dtoRequest);
      if(error) {
        throw error;
      }
      console.log('no error');
      await Dao.createUser(body);
      console.log(dtoRequest);
    } catch(error) {
      const regEx = /Duplicate entry '([^']+)' for key '([^']+)'/
      const match = error.message.match(regEx);
      const errorColumn = match[2].split('.')[1]
      if(errorColumn === 'username') { 
        throw new Error(JSON.stringify({username:false}));
      } else if(errorColumn === 'email') { 
        throw new Error(JSON.stringify({email:false}));
      } else {
        throw error;
      };
    }
  }
}
/*
async function(req,res) {
  try {
    const regDetail = req.body;
    await createUser(regDetail);
    res.json({uniqueName:true, uniqueEmail:true});
  } catch(error) {
      }
}
*/

export { Service };
