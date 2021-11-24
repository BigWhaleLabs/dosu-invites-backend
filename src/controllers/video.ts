import * as crypto from 'crypto'
import * as fs from 'fs'
import { Controller, Get } from 'amala'
import { ethers } from 'ethers'
import getVideoDurationInSeconds from 'get-video-duration'

@Controller('/video')
export default class LoginController {
  @Get('/')
  async getFramesWithAddresses() {
    const framesToEthMapPath = 'src/assets/framesToEthMap.json'
    const videoPath = 'src/assets/timelapse.mp4'
    try {
      if (!fs.existsSync(framesToEthMapPath)) {
        const stream = fs.createReadStream(videoPath)
        const seconds = await getVideoDurationInSeconds(stream)
        let frames = Math.round(seconds * 24)
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
