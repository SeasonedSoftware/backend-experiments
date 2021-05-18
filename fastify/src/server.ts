// Require the framework and instantiate it
import fastify from 'fastify'
import fastifyPostgres from 'fastify-postgres'

const server = fastify({ logger: true })

server.register(fastifyPostgres, {
  connectionString: 'postgres://postgres@localhost/postgres'
})

// Declare a route
server.get('/health', async (request, reply) => {
  const client = await server.pg.connect()
  const { rows } = await client.query(
    'SELECT version()', [],
  )
  client.release()
  return { db: rows }
})

// Run the server!
const start = async () => {
  try {
    await server.listen(3000)
    server.log.info(`server listening on ${server.server.address().port}`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

console.log('>>>>>>>>>>> TEST 1')

start()

console.log('>>>>>>>>>>> TEST 2')