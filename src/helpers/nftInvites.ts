import { InviteModel } from '@/models/Invite'

export default async function nftInvites() {
  const nftInvites = await InviteModel.where('frame')
    .gte(0)
    .select(['frame', 'ethAddress'])
    .populate('_id')
  return nftInvites
}
