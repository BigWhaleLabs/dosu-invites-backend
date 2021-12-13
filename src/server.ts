import 'module-alias/register'
import 'source-map-support/register'

import prepareVideo from '@/helpers/prepareVideo'
import runMongo from '@/models/index'
import startApp from '@/helpers/startApp'

void (async () => {
  await runMongo()
  console.log('Mongo connected')
  console.log('Cutting the video...')
  await prepareVideo()
  console.log('Video was cut!')
  console.log('Starting the app...')
  await startApp()
})()
