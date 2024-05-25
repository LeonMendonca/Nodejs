import urlModel from '../model/urlmodel.js';

async function Create(shortid, orgurl) {
  const createUrl = await urlModel.create({shortId:shortid,orgUrl:orgurl})
  return createUrl
}

async function Update(shortid, editurl) {
  const updateUrl = await urlModel.findOneAndUpdate({shortId:shortid}, { $set:{orgUrl:editurl} })
  return updateUrl
}

export {Create, Update}
