import jwt from 'jsonwebtoken'
const secret = "35vWHWM'xADPTV2"

function setToken(rawData) {
  payload = {
    id:rawData._id,
    name:rawData.fullName,
    email:rawData.email,
    role:rawData.role,
    profileImage:rawData.profileImageUrl
  }
  console.log('set token',payload)
  return jwt.sign(payload,secret)
}

function getPayload(tokenData) {
  try {
    return jwt.verify(tokenData,secret)
  } catch(error) {
    return null
  }
}

export { setToken, getPayload }
