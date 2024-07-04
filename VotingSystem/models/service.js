import Joi from 'joi';
import { compare } from 'bcrypt'

import { DtoRequestSignup, DtoRequestLogin } from '../dto/dtoRequest.js';
import { Dao } from './dao.js';
import { createSession, checkSessionId } from '../session.js';
import { DtoResponse, DtoResponseProfile } from '../dto/dtoResponse.js';

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

const joiSchemaLogin = Joi.object({
  uniquename : Joi.string().required(),
  aadharnumber : Joi.string().length(12).required(),
  password : Joi.string().required(),
  rememberpass : Joi.string().valid('true','false').required(),
})

class Service {
  static async serviceCreateUser(body) {
    try {
      const dtoRequest = new DtoRequestSignup(body);
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

  static async serviceAuthCheck(sessionid,body) {
    try {
      const dtoRequest = new DtoRequestLogin(body);
      const { error } = joiSchemaLogin.validate(dtoRequest);
      if(error) {
        throw new Error(JSON.stringify({joi:error.message}));
      }
      //check whether email or username
      let colname = null;
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isEmail = regex.test(dtoRequest.uniquename);
      if(isEmail) { 
        colname = 'email';
      } else {
        colname = 'username';
      }
      const [result] = await Dao.authUser(colname,dtoRequest.uniquename)

      if(!result) {
        throw new Error(JSON.stringify({uniquename:false}));
      }
      if(dtoRequest.aadharnumber != result.aadharnumber) {
        throw new Error(JSON.stringify({aadharnumber:false}));
      }
      const isPassValid = await compare(dtoRequest.password,result.password)
      if(!isPassValid) {
        throw new Error(JSON.stringify({password:false}));
      }
      
      //if validate user login details, then proceed
      const loggedInUser = new DtoResponse(result);
      console.log("session data",loggedInUser,result);
      if(dtoRequest.rememberpass === 'true' ) {
        console.log("password saved");
      } else {
        console.log("not saved");
      }
      const sid = createSession(sessionid,loggedInUser);
      return { loggedInUser, sid };
    } catch(error) {
      throw error;
    }
  }

  static async serviceGetProfile(sessionid) {
    try {
      const loggedInUser = checkSessionId(sessionid);
      console.log(loggedInUser);
      if(!loggedInUser) {
        throw new Error(JSON.stringify({sessionid:'undefined'}));
      }
      const [result] = await Dao.getUser(loggedInUser.id);
      const profileData = new DtoResponseProfile(result);
      return profileData;
    } catch(error) {
      throw error;
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
