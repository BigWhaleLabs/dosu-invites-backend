import { create } from 'ipfs-http-client'
import env from '@/helpers/env'

const ipfsClient = create({
  url: env.IPFS_PATH,
})

export default function getIpfsClient() {
  return ipfsClient
}
