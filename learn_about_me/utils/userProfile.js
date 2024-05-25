import userModel from '../models/user.js'

async function FindOne(id) {
  try {
    const oneUser = await userModel.findOne({_id:id})
    return oneUser
  } catch (error) {
    return null
  }
}

export default FindOne
