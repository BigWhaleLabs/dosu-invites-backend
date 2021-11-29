import 'reflect-metadata'
import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyparser'
import * as cors from '@koa/cors'
import { bootstrapControllers } from 'amala'

export default async function startApp() {
  const app = new Koa()
  const router = new Router()
  await bootstrapControllers({
    app,
    router,
    basePath: '/',
    controllers: [__dirname + '/controllers/*'],
    disableVersioning: true,
  })
  app.use(cors({ origin: '*' }))
  app.use(bodyParser())
  app.use(router.routes())
  app.use(router.allowedMethods())
  return app
}
