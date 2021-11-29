import * as ffmpeg from 'fluent-ffmpeg'
import * as ffmpegPath from '@ffmpeg-installer/ffmpeg'
import { existsSync, unlinkSync } from 'fs'
import invitesVideoPath from '@/helpers/invitesVideoPath'
import nftInvitesCount from '@/helpers/nftInvitesCount'

ffmpeg.setFfmpegPath(ffmpegPath.path)

const videoPath = `${__dirname}/../../video/timelapse.mp4`

export default function prepareVideo() {
  return new Promise<void>((resolve, reject) => {
    // Check if we have input
    if (!existsSync(videoPath)) {
      return reject(new Error('Video not found'))
    }
    // Clean output if needed
    if (existsSync(invitesVideoPath)) {
      unlinkSync(invitesVideoPath)
    }
    // Do the cutting
    ffmpeg(videoPath)
      .setStartTime(0)
      .setDuration(nftInvitesCount / 24)
      .output(invitesVideoPath)
      .on('error', (error) => reject(error))
      .on('end', (error) => (error ? reject(error) : resolve()))
      .run()
  })
}
