import * as ffmpeg from 'fluent-ffmpeg'
import * as ffmpegPath from '@ffmpeg-installer/ffmpeg'
import { MintedNFTModel } from '@/models/MintedNFT'
import { existsSync, unlinkSync } from 'fs'
import invitesVideoPath from '@/helpers/invitesVideoPath'

ffmpeg.setFfmpegPath(ffmpegPath.path)

const videoPath = `${__dirname}/../../video/timelapse.mp4`

export default async function prepareVideo() {
  const invites = await MintedNFTModel.find({})

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
      .withVideoFilter('setpts=24.0*PTS')
      .setDuration(invites.length)
      .output(invitesVideoPath)
      .on('error', (error) => reject(error))
      .on('end', (error) => (error ? reject(error) : resolve()))
      .run()
  })
}
