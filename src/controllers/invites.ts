import { Body, Controller, Get, IsNumber, IsString, Post } from 'amala'
import {
  checkInAllowList,
  getIpfsLink,
  getTokenToAddressMap,
} from '@/helpers/contract'
import getIpfsClient from '@/helpers/getIpfsClient'

class InviteBody {
  @IsString()
  ethAddress: string
}

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

  @Post('/invite')
  invite(@Body({ required: true }) { ethAddress }: InviteBody) {
    return checkInAllowList(ethAddress)
  }

  @Post('/ipfs')
  async ipfs(@Body({ required: true }) { tokenId }: IpfsBody) {
    try {
      const ipfs = getIpfsClient()
      const ipnsLink = await getIpfsLink(tokenId)
      const ipfsUri = await ipfs.resolve(ipnsLink)
      return `https://gateway.ipfs.io${ipfsUri}`
    } catch (error) {
      console.error(error)
    }
  }
}
