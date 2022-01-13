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
    await ipfsNode.add({
      content: video,
      path: cutVideoPath,
      type: 'video',
    })
    const result = await ipfsNode.cat(
      'https://ipfs.io/ipfs/QmZKJhzdCdKFAnLVvKuHdZx5KFSJm4uJF9dm33esLT2wam'
    )
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}
