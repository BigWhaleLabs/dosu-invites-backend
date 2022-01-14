import { create } from 'ipfs-http-client'
import env from '@/helpers/env'

export default async function startIpfs() {
  const projectId = env.INFURA_IPFS_ID
  const projectSecret = env.INFURA_IPFS_SECRET
  const authorization =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')

  const ipfsClient = await create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization,
    },
  })

  return ipfsClient
}
