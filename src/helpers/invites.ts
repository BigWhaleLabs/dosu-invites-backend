import * as crypto from 'crypto'
import { ethers } from 'ethers'
import nftInvitesCount from '@/helpers/nftInvitesCount'

export default new Array(nftInvitesCount).fill(0).map(() => {
  const privateKey = '0x' + crypto.randomBytes(32).toString('hex')
  const { address } = new ethers.Wallet(privateKey)
  return address
})
