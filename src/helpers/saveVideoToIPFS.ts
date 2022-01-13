import { createReadStream, existsSync } from 'fs'
import { cutVideoPath } from '@/helpers/localPath'
import startIpfs from '@/helpers/startIPFS'

export default async function saveVideoToIPFS() {
  try {
    if (!existsSync(cutVideoPath)) {
      return new Error('Cut Video not found')
    }
    const ipfsNode = await startIpfs()
    await ipfsNode.add({
      path: 'invites.mp4',
      content: createReadStream(cutVideoPath),
      type: 'file',
      mtime: new Date(),
    })
  } catch (error) {
    console.error(error)
  }
}
