import { BaseEntity } from '../base/base.entity'
import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, OneToMany } from 'typeorm'

import { TokenEntity } from '../auth/token.entity'

@ObjectType()
@Entity('users')
export class UserEntity extends BaseEntity {
  @Field({ nullable: false })
  @Column({ unique: true, nullable: false })
  email: string

  @Field({ nullable: false })
  @Column({ nullable: false })
  password: string

  @Field(() => [TokenEntity], { nullable: false })
  @OneToMany(() => TokenEntity, token => token.user)
  token: TokenEntity[]
}
