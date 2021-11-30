import 'reflect-metadata'
import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyparser'
import * as cors from '@koa/cors'
import { bootstrapControllers } from 'amala'
import env from '@/helpers/env'

export default async function startApp() {
  const app = new Koa()
  const router = new Router()
  await bootstrapControllers({
    app,
    router,
    basePath: '/',
    controllers: [__dirname + '/../controllers/*'],
    disableVersioning: true,
  })
  app.use(cors({ origin: '*' }))
  app.use(bodyParser())
  app.use(router.routes())
  app.use(router.allowedMethods())
  return new Promise<Koa>((resolve, reject) => {
    app
      .listen(env.PORT)
      .on('listening', () => {
        console.log(`HTTP is listening on ${env.PORT}`)
        resolve(app)
      })
      .on('error', (error) => {
        reject(error)
      })
  })
}
