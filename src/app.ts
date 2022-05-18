import 'module-alias/register'
import 'source-map-support/register'

import dosuInvites from '@/helpers/dosuInvites'
import env from '@/helpers/env'
import updateTokensFolder from '@/helpers/updateTokensFolder'

async function refreshTokensOnIpfs() {
  try {
    const numberOfTokensMinted = (await dosuInvites.totalSupply()).toNumber()
    updateTokensFolder(numberOfTokensMinted)
  } catch (error) {
    console.error(error)
  }
}

void (async () => {
  console.log('Launching the app...')
  await refreshTokensOnIpfs()
  dosuInvites.on(dosuInvites.filters.Mint(), refreshTokensOnIpfs)
  console.log(
    `App was launched and is listening to changes on ${dosuInvites.address}!`
  )
})()
