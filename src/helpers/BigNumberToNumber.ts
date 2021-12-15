export default function BigNumberToNumber(bigNumber: {
  _hex: string
  _isBigNumber: boolean
}) {
  return +bigNumber._hex
}
