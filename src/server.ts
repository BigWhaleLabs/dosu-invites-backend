import 'module-alias/register'
import 'source-map-support/register'

import prepareVideo from '@/helpers/prepareVideo'
import startApp from '@/helpers/startApp'

void (async () => {
  console.log('Cutting the video...')
  await prepareVideo()
  console.log('Video was cut!')
  console.log('Starting the app...')
  await startApp()
})()
