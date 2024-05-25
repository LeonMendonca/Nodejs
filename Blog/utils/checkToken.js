import { getPayload } from './jwt.js'

function buildMiddleware(app) {
  return function(req,res,next) {
    const tokenCookie = req.cookies.token
    if(!tokenCookie) {
      return next()
    }
    const userPayload = getPayload(tokenCookie)
    if(userPayload) {
      app.locals.currentUser = userPayload
    }
    next()
  }

}
export default buildMiddleware
