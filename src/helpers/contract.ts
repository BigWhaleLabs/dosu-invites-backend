import { BigNumber, EventFilter, ethers } from 'ethers'
import { caching } from 'cache-manager'
import env from '@/helpers/env'
import getContractABI from '@/helpers/getContractABI'
import prepareVideo from '@/helpers/prepareVideo'
import saveFramesToIpfs from '@/helpers/saveFramesToIpfs'

type TokenToAddressMap = { [tokenId: number]: string }

const cache = caching({ store: 'memory', max: 100, ttl: 10 })

const contractAbi = getContractABI()
const provider = new ethers.providers.InfuraProvider(env.ETH_NETWORK, {
  projectId: env.INFURA_PROJECT_ID,
  projectSecret: env.INFURA_PROJECT_SECRET,
})
export const contract = new ethers.Contract(
  env.CONTRACT_ADDRESS,
  contractAbi,
  provider
)

export function setupContractListeners() {
  const filter: EventFilter = {
    address: env.CONTRACT_ADDRESS,
    topics: [ethers.utils.id('Mint(address,uint256)')],
  }

  contract.on(filter, async (_to: string, tokenId: BigNumber) => {
    console.log('Updating the video...')
    await getTokenToAddressMap(true) // Update cached list of invites
    await prepareVideo(+tokenId)
    await saveFramesToIpfs()
    console.log('The video was updated!')
  })
}

export async function getTokenToAddressMap(update?: boolean) {
  const tokenToAddressMap = await cache.get<TokenToAddressMap | null>(
    'TokenToAddressMap'
  )
  if (!tokenToAddressMap || update) {
    const invites = await contract.getMintedInvites()
    const tokenToAddressMap: TokenToAddressMap = {}
    for (const data of invites) {
      tokenToAddressMap[+data.tokenId - 1] = data.ethAddress
    }
    await cache.set('TokenToAddressMap', tokenToAddressMap)
    return tokenToAddressMap
  }
  return tokenToAddressMap
}

export async function checkInWhiteList(ethAddress: string) {
  return await contract.whitelist(ethAddress)
}
