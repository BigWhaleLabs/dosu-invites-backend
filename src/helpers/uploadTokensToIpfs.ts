const uploadedCount = 0

export default function uploadTokensToIpfs(newCount: number) {
  console.log(`Uploading tokens to IPFS with the new count of ${newCount}`)
  if (newCount === uploadedCount) {
    console.log('No new tokens to upload to ipfs')
    return
  }
  // TODO: Publish the files to IPFS
}
