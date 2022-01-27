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

    const files: { path: string; content: Buffer; type: string }[] = []

    readdirSync(cutVideoFramesPath).forEach((file) => {
      files.push({
        path: `video/cutVideoFrames/${file}`,
        content: readFileSync(`${cutVideoFramesPath}/${file}`),
        type: 'file',
      })
    })

    for await (const file of ipfsClient.addAll(files, {
      pin: true,
      wrapWithDirectory: true,
    })) {
      if (file.path === 'video/cutVideoFrames') {
        const { name } = await ipfsClient.name.publish(`/ipfs/${file.cid}`)
        console.log(`Link to IPFS: /ipfs/${file.cid}`)
        console.log(`Link to IPNS: /ipns/${name}`)
      }
    }
  } catch (error) {
    console.error(error)
  }
}
