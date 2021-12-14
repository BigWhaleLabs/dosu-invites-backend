import { EventFilter, ethers } from 'ethers'
import { MintedNFTModel } from '@/models/MintedNFT'
import env from '@/helpers/env'

export default function setupContractListeners() {
  const provider = new ethers.providers.InfuraProvider(
    env.ETH_NETWORK,
    env.INFURA_API_KEY
  )

  const filter: EventFilter = {
    address: env.CONTRACT_ADDRESS,
    topics: [ethers.utils.id('Transfer(address,address,uint256)')],
  }

  provider.on(filter, (from: string, _to: string, tokenId: number) => {
    new MintedNFTModel({ tokenId, ethAddress: from })
  })
}
