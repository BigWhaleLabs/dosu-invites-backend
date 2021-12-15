import { EventFilter, ethers } from 'ethers'
import BigNumberToNumber from '@/helpers/BigNumberToNumber'
import env from '@/helpers/env'
import getContractABI from '@/helpers/getContractABI'
import prepareVideo from '@/helpers/prepareVideo'

const contractAbi = getContractABI()
const provider = new ethers.providers.InfuraProvider(env.ETH_NETWORK, {
  projectId: env.INFURA_PROJECT_ID,
  projectSecret: env.INFURA_PROJECT_SECRET,
})
const wallet = new ethers.Wallet(env.PRIVATE_KEY, provider)

export const contract = new ethers.Contract(
  env.CONTRACT_ADDRESS,
  contractAbi,
  wallet
)

export function setupContractListeners() {
  const filter: EventFilter = {
    address: env.CONTRACT_ADDRESS,
    topics: [ethers.utils.id('Mint(address,uint256)')],
  }

  contract.on(
    filter,
    (_to: string, tokenId: { _hex: string; _isBigNumber: boolean }) => {
      void prepareVideo(BigNumberToNumber(tokenId))
    }
  )
}

export async function getTokenToAddressMap() {
  const invites = await contract.getMintedInvites()
  const tokenToAddressMap: { [tokenId: number]: string } = {}
  for (const data of invites) {
    tokenToAddressMap[BigNumberToNumber(data.tokenId) - 1] = data.ethAddress
  }
  return tokenToAddressMap
}
