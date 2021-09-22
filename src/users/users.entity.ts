import { BaseEntity } from '../base/base.entity'
import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity } from 'typeorm'

@ObjectType()
@Entity('users')
export class UsersEntity extends BaseEntity {
  @Field({ nullable: false })
  @Column({ unique: true, nullable: false })
  email: string

  @Field({ nullable: false })
  @Column({ nullable: false })
  password: string
}
