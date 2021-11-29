import * as crypto from 'crypto'
import * as fs from 'fs'
import { Context } from 'koa'
import { Controller, Ctx, Get } from 'amala'
import { ethers } from 'ethers'

const nftInvites = 320

@Controller('/video')
export default class LoginController {
  @Get('/')
  createVideoStream(@Ctx() ctx: Context) {
    const videoPath = 'src/assets/timelapse.mp4'
    try {
      if (fs.existsSync(videoPath)) {
        const range = ctx.req.headers.range
        if (!range) {
          ctx.throw(406)
        }
        const videoSize = fs.statSync(videoPath).size
        const chunkSize = 10 ** 6

        const start = Number(range.replace(/\D/g, ''))
        const end = Math.min(start + chunkSize, videoSize - 1)

        const contentLength = end - start + 1
        const headers = {
          'Content-Range': `bytes ${start}-${end}/${videoSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': contentLength,
          'Content-Type': 'video/mp4',
        }

        ctx.res.writeHead(206, headers)
        const videoStream = fs.createReadStream(videoPath, { start, end })
        return videoStream
      } else {
        throw 'Video not found'
      }
    } catch (error) {
      ctx.status = 400
      console.error(error)
      return error
    }
  }

  @Get('/data')
  getFramesWithAddresses() {
    const framesToEthMapPath = 'src/assets/framesToEthMap.json'
    try {
      if (!fs.existsSync(framesToEthMapPath)) {
        let frames = nftInvites
        const framesToEthMap: { [frame: number]: string } = {}
        while (frames > 0) {
          const privateKey = '0x' + crypto.randomBytes(32).toString('hex')
          const { address } = new ethers.Wallet(privateKey)
          framesToEthMap[frames] = address
          frames -= 1
        }
        fs.writeFileSync(framesToEthMapPath, JSON.stringify(framesToEthMap))
      }

      const data = JSON.parse(fs.readFileSync(framesToEthMapPath).toString())
      return data
    } catch (error) {
      console.error(error)
      return error
    }
  }
}
