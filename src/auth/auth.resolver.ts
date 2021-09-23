import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { AuthService } from './auth.service'
import { TokenDto } from './token-dto'
import { UsersEntity } from '../users/users.entity'
import { CreateUserInput } from '../users/create-user.input'

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {
  }

  @Mutation(() => TokenDto)
  async login(@Args('user') user: CreateUserInput): Promise<TokenDto> {
    return await this.authService.login(user)
  }

  @Mutation(() => UsersEntity)
  async register(@Args('user') user: CreateUserInput): Promise<UsersEntity> {
    return await this.authService.register(user)
  }
}
