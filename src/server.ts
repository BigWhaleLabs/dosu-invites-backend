import 'module-alias/register'
import 'source-map-support/register'
import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../.env` })
import prepareVideo from '@/helpers/prepareVideo'
import startApp from '@/helpers/startApp'

void (async () => {
  console.log('Cutting the video...')
  await prepareVideo()
  console.log('Video was cut!')
  console.log('Starting the app...')
  const app = await startApp()
  const port = process.env.PORT || 1337
  app.listen(port).on('listening', () => {
    console.log(`HTTP is listening on ${port}`)
  })
})()
