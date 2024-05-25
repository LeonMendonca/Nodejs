import userModel from '../db/models.js'
import { setToken } from './jwt.js'

async function updateUser(userData) {
  try {
    const newUser = await userModel.findOneAndUpdate({_id:userData.id},{ 
      $set:{ 
        fullName:userData.name, 
        email:userData.email, 
        profileImageUrl:userData.filepath 
      } 
    })
    newPayload = {
      _id:userData.id,
      fullName:userData.name,
      email:userData.email,
      role:userData.role,
      profileImageUrl:userData.filepath
    }
    //console.log("new User:",newUser)
    //console.log('new payload',newPayload)
    const newToken = setToken(newPayload)
    //console.log(newToken)
    return newToken
  } catch(error) {
    console.log("updateUser",error.message)
  }
    //console.log(userData)
}

export default updateUser
