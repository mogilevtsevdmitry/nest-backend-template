import { Field, ID, ObjectType } from '@nestjs/graphql'
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@ObjectType({ isAbstract: true })
export abstract class BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field({ nullable: false })
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Field({ nullable: false })
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date
}