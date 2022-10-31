import Fastify from "fastify"
import fastifyRouteLogging from "../src/index"

async function start() {
  const fastify = Fastify({ logger: true, disableRequestLogging: true })

  await fastify.register(fastifyRouteLogging, { logLevel: "info" })

  fastify.get("/", async () => ({ hello: "world" }))

  await fastify.listen({ port: 3000 })
}

start().catch((err) => {
  console.log(err)
  process.exit(1)
})
