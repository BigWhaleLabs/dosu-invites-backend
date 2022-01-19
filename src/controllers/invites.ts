import { Body, Controller, Get, IsString, Post } from 'amala'
import {
  checkInWhiteList,
  getTokenToAddressMap,
} from '@/helpers/contract/contract'

class InviteBody {
  @IsString()
  ethAddress: string
}

@Controller('/invites')
export default class InvitesController {
  @Get('/')
  invites() {
    return getTokenToAddressMap()
  }

  @Post('/invite')
  invite(@Body({ required: true }) { ethAddress }: InviteBody) {
    return checkInWhiteList(ethAddress)
  }
}
