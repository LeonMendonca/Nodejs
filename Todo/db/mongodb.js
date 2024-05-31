import { connect } from 'mongoose'

const uri = process.env.MONGODB_URI
async function MongoDbConnect() {
  return connect(uri)
}

export { MongoDbConnect }
