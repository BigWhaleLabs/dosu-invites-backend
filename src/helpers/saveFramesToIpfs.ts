import * as ffmpeg from 'fluent-ffmpeg'
import * as ffmpegPath from '@ffmpeg-installer/ffmpeg'
import { cutVideoFramesPath, cutVideoPath } from '@/helpers/localPath'
import { existsSync, readFileSync } from 'fs'
import { getTokenToAddressMap } from '@/helpers/contract'
import getIpfsClient from '@/helpers/getIpfsClient'
import extractFrame = require('ffmpeg-extract-frame')
import { readdirSync } from 'fs'

ffmpeg.setFfmpegPath(ffmpegPath.path)

export default async function saveFramesToIpfs() {
  try {
    if (!existsSync(cutVideoPath)) {
      return new Error('Cut Video not found')
    }

    const addresses = await getTokenToAddressMap()

    // Get video frames
    Object.keys(addresses).forEach(async (id: string) => {
      await extractFrame({
        input: cutVideoPath,
        fps: 1,
        output: `${cutVideoFramesPath}/${id}-${addresses[id]}.png`,
        quality: 1, // From 1-31 with 31 being the worst quality
        offset: +id * 1000,
      })
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
