import { create } from 'ipfs-http-client'
// import env from '@/helpers/env'

export default function getIpfsClient() {
  // const projectId = env.INFURA_IPFS_ID
  // const projectSecret = env.INFURA_IPFS_SECRET
  // const authorization =
  //   'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')

  const ipfsClient = create({
    url: 'http://localhost:5001/api/v0',
  })

  return ipfsClient
}
