import { DosuInvites__factory } from '@big-whale-labs/dosu-invites-contract'
import env from '@/helpers/env'
import provider from '@/helpers/provider'

export default DosuInvites__factory.connect(
  env.DOSU_INVITES_CONTRACT_ADDRESS,
  provider
)
