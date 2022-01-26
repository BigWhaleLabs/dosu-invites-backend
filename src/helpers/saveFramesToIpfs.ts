import * as ffmpeg from 'fluent-ffmpeg'
import * as ffmpegPath from '@ffmpeg-installer/ffmpeg'
import { contract, getTokenToAddressMap } from '@/helpers/contract'
import { cutVideoFramesPath, cutVideoPath } from '@/helpers/localPath'
import { existsSync, readFileSync } from 'fs'
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
      const { cid } = await ipfsClient
        .add(
          {
            path: `dosu/invites/${file}`,
            content: readFileSync(`${cutVideoFramesPath}/${file}`),
            type: 'file',
            mtime: new Date(),
          },
          { pin: true }
        )
        .then()
      await ipfsClient.name.publish(`/ipfs/${cid}`).then((res) => {
        console.log(`https://gateway.ipfs.io/ipns/${res.name}`)
      })
      // contract.setTokenURI(file[0], cid.toString())
      // Link to the frame: https://ipfs.io/ipfs/${cid}?filename=${file}
    })
  } catch (error) {
    console.error(error)
  }
}
