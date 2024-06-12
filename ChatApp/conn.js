import Redis from 'ioredis'

async function ConnectRedis() {
  const redis = new Redis({
    host:'redis-11763.c264.ap-south-1-1.ec2.redns.redis-cloud.com',
    port:11763,
    password:'nF5KlNWV6j7NIuf6WJOQ8gTvLkyCmg7D'
  })

  redis.on('connect',()=> {
    console.log("connected to redis")
  })

  redis.on('error',(error)=> {
    console.log(error.message)
  })

  return redis;
}

export { ConnectRedis }
