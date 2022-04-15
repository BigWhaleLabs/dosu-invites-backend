import 'module-alias/register'
import 'source-map-support/register'

import { getTokenToAddressMap } from '@/helpers/contract'
import { setupContractListeners } from '@/helpers/contract'
import { tmpVideoPath } from '@/helpers/localPath'
import { unlinkSync } from 'fs'
import prepareVideo from '@/helpers/prepareVideo'
import saveFramesToIpfs from '@/helpers/saveFramesToIpfs'
import startApp from '@/helpers/startApp'

void (async () => {
  const tokenToAddressMap = await getTokenToAddressMap()
  if (Object.keys(tokenToAddressMap).length) {
    console.log('Merging frames into the video...')
    await prepareVideo(await getTokenToAddressMap())
    unlinkSync(tmpVideoPath)
    console.log('Video was created!')
  }
  console.log('Saving frames into IPFS...')
  await saveFramesToIpfs()
  console.log('Video frames saved into IPFS')
  console.log('Setting up contract listeners...')
  setupContractListeners()
  console.log('Contract listeners were set')
  console.log('Starting the app...')
  await startApp()
})()
