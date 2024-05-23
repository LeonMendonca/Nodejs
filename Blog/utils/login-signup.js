import userModel from '../db/models.js'
import { setToken, getPayload } from './jwt.js'

async function signUp(signUpData) {
  try {
    const createdUser = await userModel.create(signUpData)
    return createdUser
  } catch (error) {
    //throw an error if email is already in use
    throw error
  }
}

async function login(loginData) {
  try {
    let user = await userModel.findOne({email:loginData.email})
    if(!user) {
      return null
    }
    const loginCon = await userModel.checkPassword(loginData.password,user.password)
    //make the user object with password as undefined
    user.set('password',undefined)
    if(loginCon) {
      const token = setToken(user)
      return { isValid:loginCon, currentUser:user, token:token }
    } else {
      return { isValid:loginCon, currentUser:{} }
    }
  } catch (error) {
    throw error
  }
}

export { signUp, login }
