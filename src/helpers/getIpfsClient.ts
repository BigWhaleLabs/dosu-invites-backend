import { create } from 'ipfs-http-client'

export default function getIpfsClient() {
  const ipfsClient = create({
    url: 'http://localhost:5001/api/v0',
  })

  return ipfsClient
}
