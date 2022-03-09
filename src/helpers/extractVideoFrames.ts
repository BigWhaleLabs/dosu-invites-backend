import { getTokenToAddressMap } from '@/helpers/contract'
import extractFrame = require('ffmpeg-extract-frame')
import { cutVideoFramesPath, videoPath } from '@/helpers/localPath'
import { existsSync, mkdirSync, readdirSync, unlinkSync } from 'fs'

export default async function extractVideoFrames() {
  if (existsSync(cutVideoFramesPath)) {
    readdirSync(cutVideoFramesPath).forEach((file) => {
      unlinkSync(`${cutVideoFramesPath}/${file}`)
    })
  } else {
    mkdirSync(cutVideoFramesPath)
  }

  const addresses = await getTokenToAddressMap(false)

  await Promise.all(
    Object.keys(addresses).map(
      async (id: string) =>
        await extractFrame({
          input: videoPath,
          fps: 24,
          output: `${cutVideoFramesPath}/${id}-${addresses[
            id
          ].toLowerCase()}.png`,
          quality: 1,
          offset: +id * 24,
        })
    )
  )
}
