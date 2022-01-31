import * as ffmpeg from 'fluent-ffmpeg'
import * as ffmpegPath from '@ffmpeg-installer/ffmpeg'
import { cutVideoFramesPath, cutVideoPath } from '@/helpers/localPath'
import { existsSync, mkdirSync, readFileSync, readdirSync } from 'fs'
import { getTokenToAddressMap } from '@/helpers/contract'
import getIpfsClient from '@/helpers/getIpfsClient'
import extractFrame = require('ffmpeg-extract-frame')

ffmpeg.setFfmpegPath(ffmpegPath.path)

type IpfsFile = {
  path: string
  content: Buffer
  type: string
  pin?: boolean
}

export default async function saveFramesToIpfs(tokenId?: number) {
  try {
    if (!existsSync(cutVideoPath)) {
      return new Error('Cut Video not found')
    }

    if (!existsSync(cutVideoFramesPath)) {
      mkdirSync(cutVideoFramesPath)
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

    const files: IpfsFile[] = []

    readdirSync(cutVideoFramesPath).forEach((file) => {
      if (tokenId !== undefined) {
        // Save only specified file
        const re = new RegExp(`^${tokenId}-.*?`, 'g')
        if (file.match(re)) {
          const name = file.toLowerCase()
          files.push({
            path: `video/cutVideoFrames/${name}`,
            content: readFileSync(`${cutVideoFramesPath}/${name}`),
            type: 'file',
            pin: true,
          })
        }
        return
      }

      const name = file.toLowerCase() // Because addresses stored in lower case in the contract

      files.push({
        path: `video/cutVideoFrames/${name}`,
        content: readFileSync(`${cutVideoFramesPath}/${name}`),
        type: 'file',
        pin: true,
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
