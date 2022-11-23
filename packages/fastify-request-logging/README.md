# Fastify request logging

## Installation

Install @s9y/fastify-request-logging with npm

```bash
# npm
npm install @s9y/fastify-request-logging

# pnpm
pnpm install @s9y/fastify-request-logging

# yarn
yarn add @s9y/fastify-request-logging
```

## Usage

Basic example

```typescript
import fastifyRouteLogging from "@s9y/fastify-request-logging"

const fastify = Fastify({ logger: true, disableRequestLogging: true })
await fastify.register(fastifyRouteLogging, { logLevel: "info" })

fastify.get("/", async () => ({ hello: "world" }))
await fastify.listen({ port: 3000 })
```

## Development

Start example fastify server with `@s9y/fastify-request-logging`.

```bash
pnpm dev:example
```

Run some requests.

```bash
curl 'http://localhost:3000/?test=1'
```
