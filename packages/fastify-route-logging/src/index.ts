import fp from "fastify-plugin"
import { matchesGlob } from "./utils"
// https://github.com/microsoft/TypeScript/issues/42873
// https://github.com/microsoft/TypeScript/issues/47663
import type {} from "fastify"

interface Opts {
  disabled?: boolean
  ignoredEndpointGlobs?: string[]
}

const defaultIgnoredEndpointGlobs: NonNullable<Opts["ignoredEndpointGlobs"]> = []

const plugin = fp<Opts>(
  async (fastify, opts) => {
    const { ignoredEndpointGlobs = defaultIgnoredEndpointGlobs, disabled = false } = opts

    fastify.addHook("onRequest", async (req, reply) => {
      if (matchesGlob(req.raw.url, ignoredEndpointGlobs) || disabled) {
        return
      }

      reply.log.debug({ req: req }, "incoming request")
    })

    fastify.addHook("onResponse", async (req, reply) => {
      if (matchesGlob(req.raw.url, ignoredEndpointGlobs) || disabled) {
        return
      }

      reply.log.debug({ res: reply, responseTime: reply.getResponseTime() }, "request completed")
    })
  },
  {
    fastify: ">=4.0.0",
    name: "@s9y/fastify-route-logging",
  }
)

export default plugin
