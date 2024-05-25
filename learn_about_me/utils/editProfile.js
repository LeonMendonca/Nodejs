import userModel from '../models/user.js'

async function Edit(userData, currentUser) {
  try {
    await userModel.updateOne({username:currentUser},{ $set:{bio:userData.bio, displayName:userData.displayname} })
  } catch (error) {
    console.log(error.message)
  }
  //console.log("Edit func",userData)
}

export default Edit
