import { Body, Controller, IsString, Post } from 'amala'
import { contract } from '@/helpers/useContract'

class NFTBody {
  @IsString()
  ethAddress: string
}

@Controller('/nft')
export default class NFTController {
  @Post('/')
  async mintNFT(@Body() { ethAddress }: NFTBody) {
    try {
      const transaction = await contract.mint(ethAddress)
      await transaction.wait()
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
}
