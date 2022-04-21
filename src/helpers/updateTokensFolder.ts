import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'fs'
import { resolve } from 'path'
import env from '@/helpers/env'

let uploadedCount = 0

export default function uploadTokensToIpfs(newCount: number) {
  console.log(`Taking tokens with the new count of ${newCount}`)
  if (newCount === uploadedCount) {
    console.log('No new tokens to upload to ipfs')
    return
  }

  const tokensFolder = resolve(env.TOKENS_FOLDER)
  if (!existsSync(tokensFolder)) mkdirSync(tokensFolder)

  // Copy new files
  const files = readdirSync('tokens').filter((name) => name !== '.gitkeep')
  for (uploadedCount; uploadedCount < newCount; uploadedCount++)
    copyFileSync(
      `tokens/${files[uploadedCount]}`,
      `${tokensFolder}/${uploadedCount}.png`
    )

  uploadedCount = newCount
  console.log(`Now you have ${uploadedCount} tokens`)
}
