// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

fastify.register(require('fastify-postgres'), {
  connectionString: 'postgres://postgres@localhost/postgres'
})

// Declare a route
fastify.get('/health', async (request, reply) => {
  const client = await fastify.pg.connect()
  const { rows } = await client.query(
    'SELECT version()', [],
  )
  client.release()
  return { db: rows }
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()