import { Body, Controller, Get, IsString, Post } from 'amala'
import { checkInWhiteList, getTokenToAddressMap } from '@/helpers/contract'

class InviteBody {
  @IsString()
  ethAddress: string
}

@Controller('/invites')
export default class InvitesController {
  @Get('/')
  async invites() {
    return await getTokenToAddressMap()
  }

  @Post('/invite')
  async invite(@Body({ required: true }) { ethAddress }: InviteBody) {
    return await checkInWhiteList(ethAddress)
  }
}
