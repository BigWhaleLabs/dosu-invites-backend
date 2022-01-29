import { create } from 'ipfs-http-client'
import env from '@/helpers/env'

export default function getIpfsClient() {
  const ipfsClient = create({
    url: env.IPFS_PATH,
  })

  return ipfsClient
}
