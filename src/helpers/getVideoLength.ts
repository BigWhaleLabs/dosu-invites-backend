import { getTokenToAddressMap } from '@/helpers/contract'

export default async function getVideoLength() {
  const invites = await getTokenToAddressMap()
  return Object.keys(invites).length
}
