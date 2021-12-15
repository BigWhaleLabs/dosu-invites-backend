import { Body, Controller, Get, IsString, Post } from 'amala'
import { checkInWhiteList, getTokenToAddressMap } from '@/helpers/useContract'

class InviteBody {
  @IsString()
  ethAddress: string
}

@Controller('/video')
export default class InvitesController {
  @Get('/invites')
  async invites() {
    return await getTokenToAddressMap()
  }

  @Post('/invite')
  async invite(@Body({ required: true }) { ethAddress }: InviteBody) {
    return await checkInWhiteList(ethAddress)
  }
}
