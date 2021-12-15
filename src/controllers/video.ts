import * as fs from 'fs'
import { Context } from 'koa'
import { Controller, Ctx, Get, Header } from 'amala'
import getBytesFromHeader from '@/helpers/getBytesFromHeader'
import invitesVideoPath from '@/helpers/invitesVideoPath'

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
}
