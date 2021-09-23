import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class JwtDto {
  @Field() email: string
  @Field(() => ID) userId: number
}