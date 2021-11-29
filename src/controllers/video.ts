import * as fs from 'fs'
import { Context } from 'koa'
import { Controller, Ctx, Get, Params } from 'amala'
import { IsInt, Type } from 'amala'
import invites from '@/helpers/invites'
import invitesVideoPath from '@/helpers/invitesVideoPath'

class RangeParams {
  @Type(() => Number)
  @IsInt()
  range!: number
}

@Controller('/video')
export default class LoginController {
  @Get('/')
  video(
    @Ctx() ctx: Context,
    @Params({ require: true }) { range: start }: RangeParams
  ) {
    const videoSize = fs.statSync(invitesVideoPath).size
    const chunkSize = 10 ** 6
    const end = Math.min(start + chunkSize, videoSize - 1)
    const contentLength = end - start + 1
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
  invites() {
    return invites
  }
}
