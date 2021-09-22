import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'
import { UsersEntity } from './users.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [UsersService, UsersResolver],
  exports: [UsersService]
})
export class UsersModule {
}
