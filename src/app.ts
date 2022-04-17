import 'module-alias/register'
import 'source-map-support/register'

import dosuInvites from '@/helpers/dosuInvites'
import env from '@/helpers/env'
import uploadTokensToIpfs from '@/helpers/uploadTokensToIpfs'

async function refreshTokensOnIpfs() {
  const numberOfTokensMinted = (await dosuInvites.totalSupply()).toNumber()
  await uploadTokensToIpfs(numberOfTokensMinted)
}

void (async () => {
  console.log('Launching the app...')
  await refreshTokensOnIpfs()
  dosuInvites.on(dosuInvites.filters.Mint(), refreshTokensOnIpfs)
  console.log(
    `App was launched and is listening to changes on ${env.CONTRACT_ADDRESS}!`
  )
})()
