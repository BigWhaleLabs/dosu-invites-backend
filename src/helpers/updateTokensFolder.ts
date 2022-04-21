import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'fs'
import { cwd } from 'process'
import { resolve } from 'path'
import env from '@/helpers/env'

let uploadedCount = 0

export default function uploadTokensToIpfs(newCount: number) {
  console.log(`Taking tokens with the new count of ${newCount}`)
  if (newCount === uploadedCount) {
    console.log('No new tokens to upload to ipfs')
    return
  }

  const tokensFolder = resolve(env.PUBLIC_TOKENS_FOLDER)
  if (!existsSync(tokensFolder)) mkdirSync(tokensFolder)

  // Copy new files
  const fileNames = readdirSync(resolve(cwd(), 'tokens')).filter(
    (name) => name !== '.gitkeep'
  )
  for (let index = uploadedCount; index < newCount; index++)
    copyFileSync(`tokens/${fileNames[index]}`, `${tokensFolder}/${index}.png`)

  uploadedCount = newCount
  console.log(
    `Uploaded new tokens. Number of tokens jumped to ${uploadedCount}!`
  )
}
