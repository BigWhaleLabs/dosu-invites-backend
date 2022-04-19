import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'fs'
import { resolve } from 'path'
import env from '@/helpers/env'

const uploadedCount = 0

export default function uploadTokensToIpfs(newCount: number) {
  console.log(`Uploading tokens to IPFS with the new count of ${newCount}`)
  if (newCount === uploadedCount) {
    console.log('No new tokens to upload to ipfs')
    return
  }

  const tokensFolder = resolve(env.TOKENS_FOLDER)
  const rmTmp = () => rmSync(tokensFolder, { recursive: true })

  if (existsSync(tokensFolder)) rmTmp()
  mkdirSync(tokensFolder)

  const files = readdirSync('tokens').filter((name) => name !== '.gitkeep')
  for (let id = 0; id < newCount; id++)
    copyFileSync(`tokens/${files[id]}`, `${tokensFolder}/${id}.png`)

  rmTmp()
}
