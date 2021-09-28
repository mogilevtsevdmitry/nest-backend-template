import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class RefreshTokenDto {
  @Field() token: string
  @Field() expiresIn: Date
}