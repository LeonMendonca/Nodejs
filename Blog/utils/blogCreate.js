import blogModel from '../db/blogModel.js'

async function blogCreate(blogData) {
  console.log(blogData) 
  const finalBlogData = {
    title:blogData.title, 
    content:blogData.content, 
    coverImage:blogData.filepath,
    createdBy:blogData.currentUserid,
    name:blogData.name
  }
  //console.log(finalBlogData)
  try {
    return await blogModel.create(finalBlogData)
  } catch (error) {
    console.log('blogCreate',error.message)
  }
}

export default blogCreate
