import fp from "fastify-plugin"
import { matchesGlob } from "./utils"
// We always need atleast this import, otherwise ts will break
// import type {} from "fastify"
// See more here:
// https://github.com/microsoft/TypeScript/issues/42873
// https://github.com/microsoft/TypeScript/issues/47663
import type { FastifyRequest, LogLevel } from "fastify"

interface Opts {
  disabled?: boolean
  ignoredEndpointGlobs?: string[]
  logLevel?: LogLevel
}

function getRequestProperties(req: FastifyRequest) {
  return {
    id: req.id,
    url: req.url,
    protocol: req.protocol,
    method: req.method,
    hostname: req.hostname,
    params: req.params,
    query: req.query,
    routerMethod: req.routerMethod,
    routerPath: req.routerPath,
  }
}

const plugin = fp<Opts>(
  async (fastify, opts) => {
    const { ignoredEndpointGlobs = [], disabled = false, logLevel = "debug" } = opts

    fastify.addHook("onRequest", async (req, reply) => {
      if (matchesGlob(req.raw.url, ignoredEndpointGlobs) || disabled) {
        return
      }

      reply.log[logLevel](
        { ...getRequestProperties(req), lifecycle: "request" },
        `${req.routerMethod} ${req.routerPath}`
      )
    })

    fastify.addHook("onResponse", async (req, reply) => {
      if (matchesGlob(req.raw.url, ignoredEndpointGlobs) || disabled) {
        return
      }

      reply.log[logLevel](
        { ...getRequestProperties(req), responseTime: reply.getResponseTime(), lifecycle: "response" },
        `${req.routerMethod} ${req.routerPath}`
      )
    })
  },
  {
    fastify: ">=4.0.0",
    name: "@s9y/fastify-request-logging",
  }
)

export default plugin
