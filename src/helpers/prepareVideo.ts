import * as ffmpeg from 'fluent-ffmpeg'
import * as ffmpegPath from '@ffmpeg-installer/ffmpeg'
import * as ffprobe from '@ffprobe-installer/ffprobe'
import {
  cutVideoFramesPath,
  cutVideoPath,
  cutVideoPath2,
} from '@/helpers/localPath'
import { existsSync, readdirSync, unlinkSync } from 'fs'

ffmpeg.setFfmpegPath(ffmpegPath.path)
ffmpeg.setFfprobePath(ffprobe.path)

export default function prepareVideo(videoLength?: number) {
  try {
    return new Promise<void>((resolve, reject) => {
      // Clean output if needed
      if (existsSync(cutVideoPath)) {
        unlinkSync(cutVideoPath)
      }

      const inputList = readdirSync(cutVideoFramesPath)

      if (videoLength === undefined) {
        videoLength = inputList.length
      }

      // Merge frames into the video with 1image/24frames
      const f = inputList.reduce(
        (result, inputItem) =>
          result.addInput(`${cutVideoFramesPath}/${inputItem}`).inputFPS(1),
        ffmpeg()
      )

      f.fps(1)
        .setDuration(videoLength)
        .output(cutVideoPath)
        .on('error', (error) => reject(error))
        .on('end', (error) => (error ? reject(error) : resolve()))
        .run()
    })
  } catch (error) {
    console.error(error)
  }
}
