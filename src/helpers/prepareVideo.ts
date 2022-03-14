import * as ffmpeg from 'fluent-ffmpeg'
import * as ffmpegPath from '@ffmpeg-installer/ffmpeg'
import { cutVideoPath } from '@/helpers/localPath'
import { cwd } from 'process'
import { existsSync, unlinkSync } from 'fs'
import { resolve } from 'path'
import getVideoLength from '@/helpers/getVideoLength'

ffmpeg.setFfmpegPath(ffmpegPath.path)

const videoPath = resolve(cwd(), 'video', 'timelapse.mp4')

export default async function prepareVideo(videoLength?: number) {
  try {
    if (!videoLength) {
      videoLength = await getVideoLength()
    }

    return new Promise<void>((resolve, reject) => {
      // Check if we have input
      if (!existsSync(videoPath)) return reject(new Error('Video not found'))

      // Clean output if needed
      if (existsSync(cutVideoPath)) unlinkSync(cutVideoPath)

      // Do the cutting
      ffmpeg(videoPath)
        .setStartTime(0)
        .withVideoFilter('setpts=24.0*PTS')
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
