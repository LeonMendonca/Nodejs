let Session = new Map();

import { nanoid } from 'nanoid';

function createSession(sessionid, payload) {
  //if session already created, and same user logged in, no need for a new session
  const doesExist = checkSessionId(sessionid);
  if(doesExist != null && doesExist?.username == payload.username) { 
    //console.log(`session id ${sessionid} exists payload ${payload}`);
    return sessionid;
  }
  const sessionId = nanoid();
  Session.set(sessionId,payload);
  Session.delete(sessionid);
  console.log(`deleted ${sessionid} at ${new Date}`)
  console.log(`created ${sessionId} at ${new Date}`);
  //delete after 10 mins
  /*
  setTimeout(() => {
    Session.delete(sessionId);
    console.log(`deleted ${sessionId} at ${new Date}`)
  },10000);
  */
  return sessionId;
}

function checkSessionId(sessionId) {
  const payload = Session.get(sessionId);
  console.log("session check",payload);
  if(!payload) {
    return null;
  }
  return payload;
}

export { createSession, checkSessionId };
