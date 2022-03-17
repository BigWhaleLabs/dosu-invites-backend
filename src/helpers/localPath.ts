import { cwd } from 'process'
import { resolve } from 'path'

export const cutVideoPath = resolve(cwd(), 'video', 'invites.mp4')
export const tmpVideoPath = resolve(cwd(), 'video', 'tmp.mp4')
export const cutVideoFramesPath = resolve(cwd(), 'video/cutVideoFrames')

export const framesPath = resolve(cwd(), 'video/frames')
