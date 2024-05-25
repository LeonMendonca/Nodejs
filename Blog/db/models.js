import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  fullName : { type:String, required:true },
  email : { type:String, required:true, unique:true },
  password : { type:String, required:true },
  profileImageUrl : { type:String, default:"/profileImages/default.png" },
  role : { type:String, enum:["member","admin"], default:"member"},

}, {timestamps:true})

userSchema.static('checkPassword',async function(password, hashPass) {
  const result = await new Promise((resolve, reject) => {
    //console.log(password,hashPass)
    bcrypt.compare(password,hashPass, function(err, result) {
      if(err) {
        reject(err)
      } else {
        resolve(result)
      }
    }) 
  })
  return result
})

userSchema.pre('save', async function(next) {
  const signInUser = this
  if(!signInUser.isModified('password')) { return }
  try {
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(signInUser.password,salt)
    signInUser.password = hashPass
    next()
  } catch (error) {
    console.log(error.message)
    next(error)
  }

})

const userModel = mongoose.model("users",userSchema)

export default userModel
