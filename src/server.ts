import 'module-alias/register'
import 'source-map-support/register'

import { setupContractListeners } from '@/helpers/contract'
import extractVideoFrames from '@/helpers/extractVideoFrames'
import prepareVideo from '@/helpers/prepareVideo'
import runMongo from '@/models/index'
import saveFramesToIpfs from '@/helpers/saveFramesToIpfs'
import startApp from '@/helpers/startApp'

void (async () => {
  await runMongo()
  console.log('Mongo connected')
  console.log('Extracting video frames...')
  await extractVideoFrames()
  console.log('Got video frames!')
  console.log('Merging frames back...')
  await prepareVideo()
  console.log('Video was created!')
  console.log('Saving frames into IPFS...')
  await saveFramesToIpfs()
  console.log('Video frames saved into IPFS')
  console.log('Setting up contract listeners...')
  setupContractListeners()
  console.log('Contract listeners were set')
  console.log('Starting the app...')
  await startApp()
})()
