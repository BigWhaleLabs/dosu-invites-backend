import * as ffmpeg from 'fluent-ffmpeg'
import * as ffmpegPath from '@ffmpeg-installer/ffmpeg'
import { cutVideoFramesPath, cutVideoPath } from '@/helpers/localPath'
import { existsSync, mkdirSync, readdirSync, unlinkSync } from 'fs'
import { getTokenToAddressMap } from '@/helpers/contract'
import getIpfsClient from '@/helpers/getIpfsClient'
import extractFrame = require('ffmpeg-extract-frame')
import { globSource } from 'ipfs-http-client'

ffmpeg.setFfmpegPath(ffmpegPath.path)

export default async function saveFramesToIpfs() {
  try {
    if (!existsSync(cutVideoPath)) {
      return new Error('Cut Video not found')
    }

    if (!existsSync(cutVideoFramesPath)) {
      mkdirSync(cutVideoFramesPath)
    }

    // Clean cutVideoFrames folder from files
    const files = readdirSync(cutVideoFramesPath)
    files.forEach((file) => unlinkSync(`${cutVideoFramesPath}/${file}`))

    const addresses = await getTokenToAddressMap(false)

    await Promise.all(
      Object.keys(addresses).map((id: string) =>
        extractFrame({
          input: cutVideoPath,
          fps: 1,
          output: `${cutVideoFramesPath}/${id}-${addresses[
            id
          ].toLowerCase()}.png`,
          quality: 1,
          offset: +id * 1000,
        })
      )
    )

    const ipfsClient = getIpfsClient()

    for await (const file of ipfsClient.addAll(
      globSource(cutVideoFramesPath, '**/*'),
      {
        wrapWithDirectory: true,
        cidVersion: 1,
      }
    )) {
      if (file.path === '') {
        const { name } = await ipfsClient.name.publish(`/ipfs/${file.cid}`)
        console.log(`Link to IPFS: /ipfs/${file.cid}`)
        console.log(`Link to IPNS: /ipns/${name}`)
      }
    }
  } catch (error) {
    console.error(error)
  }
}
