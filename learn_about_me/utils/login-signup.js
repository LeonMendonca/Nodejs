import userModel from '../models/user.js'

async function Signup(userData) {

    try {
      const createdUser = await userModel.create(userData) 
      return true
    } catch (error) {
      console.log("Signup",error.message)
      return false
    }
}

async function Login(userData) {
  try {
    const userObj = await userModel.findOne({username:userData.username})
    if(!userObj) {
      return null
    }
    var result = await userObj.checkPassword(userData.password)
    //console.log("from bcrypt:",result)
    if(result) {
      return { isValid:result, userDetail:userObj }
    } else {
      return { isValid:result, userDetail:userObj }
    }
  } catch (error) {
    console.log("Login",error.message)
  }
}
export {Signup, Login}

