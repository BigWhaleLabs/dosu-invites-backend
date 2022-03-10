import * as ffmpeg from 'fluent-ffmpeg'
import * as ffmpegPath from '@ffmpeg-installer/ffmpeg'
import { cutVideoFramesPath } from '@/helpers/localPath'
import { existsSync } from 'fs'
import { globSource } from 'ipfs-http-client'
import getIpfsClient from '@/helpers/getIpfsClient'
import timeout from '@/helpers/tiemout'

ffmpeg.setFfmpegPath(ffmpegPath.path)

export default async function saveFramesToIpfs() {
  try {
    if (!existsSync(cutVideoFramesPath))
      return new Error('Cut video frames not found')

    const ipfsClient = getIpfsClient()

    await timeout(5000) // Wait so globSource will catch new files

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
