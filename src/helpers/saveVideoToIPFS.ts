import { createReadStream, existsSync } from 'fs'
import { cutVideoPath } from '@/helpers/localPath'
import startIpfs from '@/helpers/startIPFS'

export default async function saveVideoToIPFS() {
  try {
    if (!existsSync(cutVideoPath)) {
      return new Error('Cut Video not found')
    }
    const ipfsNode = await startIpfs()
    const { cid } = await ipfsNode.add({
      path: 'invites.mp4',
      content: createReadStream(cutVideoPath),
      type: 'file',
      mtime: new Date(),
    })
    console.log(
      `Link to video: https://ipfs.io/ipfs/${cid}?filename=invites.mp4`
    )
  } catch (error) {
    console.error(error)
  }
}
