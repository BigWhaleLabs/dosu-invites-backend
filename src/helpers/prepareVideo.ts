import * as ffmpeg from 'fluent-ffmpeg'
import * as ffmpegPath from '@ffmpeg-installer/ffmpeg'
import * as ffprobe from '@ffprobe-installer/ffprobe'
import * as videoshow from 'videoshow'
import { TokenToAddressMap } from '@/helpers/contract'
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  unlinkSync,
} from 'fs'
import {
  cutVideoFramesPath,
  cutVideoPath,
  framesPath,
} from '@/helpers/localPath'

ffmpeg.setFfmpegPath(ffmpegPath.path)
ffmpeg.setFfprobePath(ffprobe.path)

export default function prepareVideo(tokenToAddressMap: TokenToAddressMap) {
  try {
    return new Promise<void>((resolve, reject) => {
      // Clean output if needed
      if (!existsSync(framesPath)) throw new Error('Frames folder not found')
      existsSync(cutVideoFramesPath)
        ? readdirSync(cutVideoFramesPath).forEach((file) =>
            unlinkSync(`${cutVideoFramesPath}/${file}`)
          )
        : mkdirSync(cutVideoFramesPath)
      if (existsSync(cutVideoPath)) unlinkSync(cutVideoPath)

      // Take only minted frames
      const allFrames = readdirSync(framesPath)
      const tokenToAddressMapValues = Object.values(tokenToAddressMap)
      tokenToAddressMapValues.forEach((address, index) => {
        copyFileSync(
          `${framesPath}/${allFrames[index]}`,
          `${cutVideoFramesPath}/${index}-${address.toLowerCase()}.png`
        )
      })

      const frames = readdirSync(cutVideoFramesPath).map(
        (frame) => `${cutVideoFramesPath}/${frame}`
      )

      // Merge frames into the video with 1image/24frames
      const videoOptions = {
        fps: 60,
        loop: 1,
        transition: false,
        duration: tokenToAddressMapValues.length,
        videoBitrate: 1655,
        videoCodec: 'libx264',
        size: '400x400',
        format: 'mp4',
        pixelFormat: 'yuv420p',
      }

      videoshow(frames, videoOptions)
        .save(cutVideoPath)
        .on('error', (error: string) => {
          console.error(error)
          reject()
        })
        .on('end', () => resolve())
    })
  } catch (error) {
    console.error(error)
  }
}
