import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { UserEntity } from '../users/user.entity'

@ObjectType()
@Entity('tokens')
export class TokenEntity {
  @Field({ nullable: false })
  @PrimaryGeneratedColumn('uuid')
  token: string

  @Field({ nullable: false })
  @Column({ nullable: false }) // +2 мес
  expiresIn: Date

  @Field(() => UserEntity, { nullable: false })
  @ManyToOne(() => UserEntity, userEntity => userEntity.token)
  user: UserEntity
}