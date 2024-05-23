import commentModel from '../db/comment.js'

async function addComment(commentData) {
  try {
    const obj = await commentModel.create(commentData)
    return obj
  } catch(error) {
    console.log("addComment",error.message)
  }
}
export default addComment
