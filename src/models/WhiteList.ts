import { getModelForClass, prop } from '@typegoose/typegoose'

export class WhiteList {
  @prop({ required: true, unique: true })
  frame: number
  @prop({ required: true, unique: true })
  ethAddress: string
}

export const WhiteListModel = getModelForClass(WhiteList, {
  schemaOptions: { timestamps: true },
})
