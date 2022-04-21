import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  writeFileSync,
} from 'fs'
import { cwd } from 'process'
import { resolve } from 'path'
import env from '@/helpers/env'

let uploadedCount = 0

export default function updateTokensFolder(newCount: number) {
  console.log(`Copying tokens with the new count of ${newCount}`)
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
  for (let index = uploadedCount; index < newCount; index++) {
    copyFileSync(
      `tokens/${fileNames[index]}`,
      `${tokensFolder}/tokens/${index}.png`
    )
    const metadata = {
      description: "Dosu Invite that unlocks Dosu's features",
      external_url: `${env.WEBSITE_URL}/${index}`,
      image: `${env.TOKENS_BASE_URI}/${index}.png`,
      name: `Dosu Invite #${index}`,
      attributes: [
        {
          trait_type: 'Number',
          value: `${index}`,
        },
      ],
    }
    writeFileSync(
      `${tokensFolder}/metadata/${index}.json`,
      JSON.stringify(metadata)
    )
  }

  uploadedCount = newCount
  console.log(
    `Uploaded new tokens. Number of tokens jumped to ${uploadedCount}!`
  )
}
