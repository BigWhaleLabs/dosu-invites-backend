import * as fs from 'fs'
import { Body, Controller, Ctx, Get, Header, IsString, Post } from 'amala'
import { Context } from 'koa'
import { InviteModel } from '@/models/Invite'
import { getTokenToAddressMap } from '@/helpers/useContract'
import getBytesFromHeader from '@/helpers/getBytesFromHeader'
import invitesVideoPath from '@/helpers/invitesVideoPath'

class InviteBody {
  @IsString()
  ethAddress: string
}

@Controller('/video')
export default class VideoController {
  @Get('/')
  video(@Ctx() ctx: Context, @Header('range') range: string) {
    if (!range) {
      ctx.throw(406)
    }
    const videoSize = fs.statSync(invitesVideoPath).size
    const { start, end, contentLength } = getBytesFromHeader(range, videoSize)
    const headers = {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4',
    }
    ctx.res.writeHead(206, headers)
    const videoStream = fs.createReadStream(invitesVideoPath, { start, end })
    return videoStream
  }

  @Get('/invites')
  async invites() {
    return await getTokenToAddressMap()
  }

  @Post('/invite')
  async invite(@Body({ required: true }) { ethAddress }: InviteBody) {
    const invite = await InviteModel.findOne({ ethAddress })
    if (!invite) {
      return false
    }
    return true
  }
}
