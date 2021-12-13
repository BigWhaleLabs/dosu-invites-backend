import { InviteModel } from '@/models/Invite'

export default async function nftInvites() {
  const nftInvites = await InviteModel.find({
    ethAddress: { $exists: true },
  }).select(['-_id', '-inviter', '-createdAt', '-updatedAt', '-__v'])
  return nftInvites
}
