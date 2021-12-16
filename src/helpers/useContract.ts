import { BigNumber, EventFilter, ethers } from 'ethers'
import env from '@/helpers/env'
import getContractABI from '@/helpers/getContractABI'
import prepareVideo from '@/helpers/prepareVideo'

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

  contract.on(filter, (_to: string, tokenId: BigNumber) => {
    void prepareVideo(+tokenId)
  })
}

export async function getTokenToAddressMap() {
  const invites = await contract.getMintedInvites()
  const tokenToAddressMap: { [tokenId: number]: string } = {}
  for (const data of invites) {
    tokenToAddressMap[+data.tokenId - 1] = data.ethAddress
  }
  return tokenToAddressMap
}

export async function checkInWhiteList(ethAddress: string) {
  return await contract.whitelist(ethAddress)
}
