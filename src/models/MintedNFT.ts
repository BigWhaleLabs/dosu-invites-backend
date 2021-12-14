import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true } })
export class MintedNFT {
  @prop({ index: true, required: true, type: () => Number })
  tokenId!: number
  @prop({ index: true, required: true, type: () => String })
  ethAddress!: string
}

export const MintedNFTModel = getModelForClass(MintedNFT, {
  schemaOptions: { timestamps: true },
})
