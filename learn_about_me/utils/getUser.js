import userModel from '../models/user.js'

async function getUser() {
  const arrayUser = await userModel.find()
  return arrayUser
}

export default getUser
