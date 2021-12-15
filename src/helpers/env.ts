import * as dotenv from 'dotenv'
import { cleanEnv, num, str } from 'envalid'
import { cwd } from 'process'
import { resolve } from 'path'

dotenv.config({ path: resolve(cwd(), '.env') })

// eslint-disable-next-line node/no-process-env
export default cleanEnv(process.env, {
  PORT: num({ default: 1337 }),
  MONGO: str(),
  ETH_NETWORK: str(),
  CONTRACT_ADDRESS: str(),
  PRIVATE_KEY: str(),
  INFURA_PROJECT_ID: str(),
  INFURA_PROJECT_SECRET: str(),
})
