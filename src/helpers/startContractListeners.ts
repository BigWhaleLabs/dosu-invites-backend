import * as contractAbi from '@/helpers/contractAbi.json'
import { Contract, providers, utils } from 'ethers'
import env from '@/helpers/env'

const address = '0x0d0a4686dfB7a4f4Fe87fB478fe08953b9ed216d'

export default function startContractListeners() {
  const provider = new providers.JsonRpcProvider(
    env.PROVIDER_URL,
    env.ETH_NETWORK
  )
  void provider.getBlockNumber().then((result) => {
    console.log('Connected to ethereum endpoint')
    console.log('Current block number: ' + result)
  })

  const contract = new Contract(address, contractAbi, provider)
  const filter = {
    address,
    topics: [
      utils.id('Mint(address,address,uint256)'),
      utils.id('Transfer(address,address,uint256)'),
    ],
  }
  contract.on(filter, (from, to, tokenId) => {
    console.log(from)
    console.log(to)
    console.log('Frame is:')
    console.log(tokenId)
  })
}
