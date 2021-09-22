import { Field, ID, ObjectType } from '@nestjs/graphql'
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@ObjectType({ isAbstract: true })
export abstract class BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field({ nullable: false })
  @CreateDateColumn()
  createdAt: string

  @Field({ nullable: false })
  @UpdateDateColumn()
  updatedAt: string
}