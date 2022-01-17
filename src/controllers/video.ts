import { Context } from 'koa'
import { Controller, Ctx, Get, Header } from 'amala'
import { createReadStream, statSync } from 'fs'
import { cutVideoPath } from '@/helpers/localPath'
import getBytesFromHeader from '@/helpers/getBytesFromHeader'

@Controller('/video')
export default class VideoController {
  @Get('/')
  video(@Ctx() ctx: Context, @Header('range') range: string) {
    if (!range) {
      ctx.throw(406)
    }
    const videoSize = statSync(cutVideoPath).size
    const { start, end, contentLength } = getBytesFromHeader(range, videoSize)
    const headers = {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4',
    }
    ctx.res.writeHead(206, headers)
    const videoStream = createReadStream(cutVideoPath, { start, end })
    return videoStream
  }
}
