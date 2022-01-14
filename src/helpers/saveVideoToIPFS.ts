import { createReadStream, existsSync } from 'fs'
import cutVideoPath from '@/helpers/cutVideoPath'
import startIpfs from '@/helpers/startIPFS'

export default async function saveVideoToIPFS() {
  try {
    if (!existsSync(cutVideoPath)) {
      return new Error('Cut Video not found')
    }
    const ipfsClient = startIpfs()
    const { cid } = await ipfsClient.add(
      {
        path: 'invites.mp4',
        content: createReadStream(cutVideoPath),
        type: 'file',
        mtime: new Date(),
      },
      { pin: true }
    )
    console.log(
      `Link to the video: https://ipfs.io/ipfs/${cid}?filename=invites.mp4`
    )
  } catch (error) {
    console.error(error)
  }
}
