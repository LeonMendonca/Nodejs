import Redis from 'ioredis'

async function RedisDbConnect() {
  const redis = new Redis({
    host:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT,
    password:process.env.REDIS_PASS
  })

  redis.on('connect',()=> {
    console.log("connected to Redis")
  })

  redis.on('error',(error)=> {
    console.error(error.message)
  })

  return redis
}

export { RedisDbConnect }
