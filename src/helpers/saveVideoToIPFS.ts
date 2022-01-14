import { createReadStream, existsSync } from 'fs'
import { cutVideoPath } from '@/helpers/localPath'
import startIpfs from '@/helpers/startIPFS'

export default async function saveVideoToIPFS() {
  try {
    if (!existsSync(cutVideoPath)) {
      return new Error('Cut Video not found')
    }
    const video = createReadStream(cutVideoPath)
    const ipfsNode = await startIpfs()
    const { cid } = await ipfsNode.add({
      content: video,
      path: cutVideoPath,
      type: 'video',
    })
    console.log('Video path: ' + cid)
  } catch (error) {
    console.error(error)
  }
}
