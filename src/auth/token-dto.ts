import { Field, ObjectType } from '@nestjs/graphql'
import { IRefreshToken } from './auth.service'

@ObjectType()
export class TokenDto implements IRefreshToken {
  @Field() accessToken: string
  @Field() token: string
  @Field() expiresIn: Date
}