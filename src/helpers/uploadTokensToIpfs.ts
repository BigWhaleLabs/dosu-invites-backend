import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'fs'
import { cwd } from 'process'
import { globSource } from 'ipfs-http-client'
import { resolve } from 'path'
import ipfsClient from '@/helpers/ipfsClient'

const uploadedCount = 0

export default async function uploadTokensToIpfs(newCount: number) {
  console.log(`Uploading tokens to IPFS with the new count of ${newCount}`)
  if (newCount === uploadedCount) {
    console.log('No new tokens to upload to ipfs')
    return
  }

  const tmpFolder = resolve(cwd(), 'tmp')
  const rmTmp = () => rmSync(tmpFolder, { recursive: true })

  if (existsSync(tmpFolder)) rmTmp()

  mkdirSync(tmpFolder)
  const files = readdirSync('tokens').filter((name) => name !== '.gitkeep')
  for (let id = 0; id < newCount; id++) {
    copyFileSync(`tokens/${files[id]}`, `tmp/${id}.png`)
  }

  const pushedFiles = ipfsClient.addAll(globSource(tmpFolder, '**/*'), {
    wrapWithDirectory: true,
    cidVersion: 1,
    pin: true,
  })

  for await (const file of pushedFiles) {
    if (file.path === '') {
      const { name } = await ipfsClient.name.publish(`/ipfs/${file.cid}`, {
        key: 'dosu',
      })
      console.log(`Link to IPFS: /ipfs/${file.cid}`)
      console.log(`Link to IPNS: /ipns/${name}`)
    }
  }

  rmTmp()
}
