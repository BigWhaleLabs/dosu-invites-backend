import * as ffmpeg from 'fluent-ffmpeg'
import * as ffmpegPath from '@ffmpeg-installer/ffmpeg'
import * as ffprobe from '@ffprobe-installer/ffprobe'
import * as videoshow from 'videoshow'
import { copyFileSync, existsSync, readdirSync, unlinkSync } from 'fs'
import {
  cutVideoFramesPath,
  cutVideoPath,
  framesPath,
} from '@/helpers/localPath'

ffmpeg.setFfmpegPath(ffmpegPath.path)
ffmpeg.setFfprobePath(ffprobe.path)

export default function prepareVideo(videoLength: number) {
  try {
    return new Promise<void>((resolve, reject) => {
      // Clean output if needed
      if (existsSync(cutVideoPath)) unlinkSync(cutVideoPath)

      // Take only minted frames
      readdirSync(framesPath)
        .slice(0, videoLength)
        .forEach((file) =>
          copyFileSync(`${framesPath}/${file}`, `${cutVideoFramesPath}/${file}`)
        )
      const frames = readdirSync(cutVideoFramesPath).map(
        (frame) => `${cutVideoFramesPath}/${frame}`
      )

      // Merge frames into the video with 1image/24frames
      const videoOptions = {
        fps: 24,
        loop: 1, // seconds
        transition: false,
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
