import { create } from 'ipfs'
import { existsSync, rmSync } from 'fs'
import { ipfsRepoPath } from '@/helpers/localPath'

export default async function startIpfs() {
  if (existsSync(ipfsRepoPath)) {
    rmSync(ipfsRepoPath, { recursive: true })
  }

  const ipfsNode = await create({
    repo: ipfsRepoPath,
    disposable: false,
    init: false,
    start: false,
  })

  return ipfsNode
}
