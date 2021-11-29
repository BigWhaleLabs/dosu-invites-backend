import * as dotenv from 'dotenv'
import { cleanEnv, num } from 'envalid'

dotenv.config({ path: `${__dirname}/../.env` })

// eslint-disable-next-line node/no-process-env
export default cleanEnv(process.env, {
  PORT: num({ default: 1337 }),
})
