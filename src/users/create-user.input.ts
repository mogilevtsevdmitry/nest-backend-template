import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
  @Field({ nullable: false })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @Field({ nullable: false })
  @IsNotEmpty()
  @MinLength(6)
  password: string
}