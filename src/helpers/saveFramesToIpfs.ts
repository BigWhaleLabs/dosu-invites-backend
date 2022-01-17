import * as ffmpeg from 'fluent-ffmpeg'
import * as ffmpegPath from '@ffmpeg-installer/ffmpeg'
import { cutVideoFramesPath, cutVideoPath } from '@/helpers/localPath'
import { existsSync, readFileSync } from 'fs'
import getIpfsClient from '@/helpers/getIpfsClient'
import extractFrames = require('ffmpeg-extract-frames')
import { readdirSync } from 'fs'

ffmpeg.setFfmpegPath(ffmpegPath.path)

export default async function saveFramesToIpfs() {
  try {
    if (!existsSync(cutVideoPath)) {
      return new Error('Cut Video not found')
    }

    // Get video frames
    await extractFrames({
      fps: 1,
      input: cutVideoPath,
      output: `${cutVideoFramesPath}/%d.png`,
    })

    const ipfsClient = getIpfsClient()

    readdirSync(cutVideoFramesPath).forEach(async (file) => {
      const { cid } = await ipfsClient.add(
        {
          path: file,
          content: readFileSync(`${cutVideoFramesPath}/${file}`),
          type: 'file',
          mtime: new Date(),
        },
        { pin: true }
      )
      console.log(
        `Link to the frame: https://ipfs.io/ipfs/${cid}?filename=${file}`
      )
    })
  } catch (error) {
    console.error(error)
  }
}
