import { Body, Controller, Get, IsNumber, Post } from 'amala'
import { getIpfsLink, getTokenToAddressMap } from '@/helpers/contract'
import getIpfsClient from '@/helpers/getIpfsClient'

class IpfsBody {
  @IsNumber()
  tokenId: number
}

@Controller('/invites')
export default class InvitesController {
  @Get('/')
  invites() {
    return getTokenToAddressMap()
  }

  @Post('/ipfs')
  async ipfs(@Body({ required: true }) { tokenId }: IpfsBody) {
    try {
      const ipfs = getIpfsClient()
      const ipnsLink = await getIpfsLink(tokenId)

      if (!ipnsLink) return

      const ipfsUri = await ipfs.resolve(ipnsLink, { recursive: true })
      // Let's use private gateway in the future: https://github.com/ipfs/go-ipfs/blob/master/docs/experimental-features.md#private-networks
      return `https://dweb.link${ipfsUri}`
    } catch (error) {
      console.error(error)
    }
  }
}
