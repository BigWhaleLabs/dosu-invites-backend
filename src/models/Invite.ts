import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true } })
export class Invite {
  @prop({ index: true, required: true, type: () => String })
  ethAddress!: string
}

export const InviteModel = getModelForClass(Invite, {
  schemaOptions: { timestamps: true },
})
