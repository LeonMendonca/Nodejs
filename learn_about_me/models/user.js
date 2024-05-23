import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

var userSchema = new mongoose.Schema({
  username : {type:String, required:true, unique:true},
  password : {type:String, required:true},
  createdAt : {type:Date, default:Date.now},
  bio : {type:String,default:null},
  displayName : String,
})

//When you define a method using userSchema.methods, it becomes available to all instances of the model created from this schema.
/*
userSchema.methods.name = function() {
  if(!this.displayName) {
    this.displayName = this.username
  }
  return this.displayName
}
*/
userSchema.methods.checkPassword = async function(password) {
  //console.log(password,this.password)
  const result = await new Promise((resolve, reject) => {
    bcrypt.compare(password,this.password, function (err, result) {
      if(err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
  return result
}


//a middleware function
userSchema.pre('save', async function(next) {
  try {
    //hash the password
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(this.password,salt)
    this.password = hashPass
    //check for displayName
    if(!this.displayName) {
      this.displayName = this.username
    }
    //this.bio=undefined
    next()
  } catch (error) {
    console.log(error.message)
    next(error)
  }
})

const UserModel = mongoose.model('users',userSchema)

export default UserModel
