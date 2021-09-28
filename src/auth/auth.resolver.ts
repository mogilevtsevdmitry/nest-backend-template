import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { AuthService } from './services/auth.service'
import { TokenDto } from './dto/token-dto'
import { UserEntity } from '../users/user.entity'
import { CreateUserInput } from '../users/create-user.input'

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {
  }

  @Mutation(() => TokenDto)
  async login(@Args('user') user: CreateUserInput): Promise<TokenDto> {
    return await this.authService.login(user)
  }

  @Mutation(() => UserEntity)
  async register(@Args('user') user: CreateUserInput): Promise<UserEntity> {
    return await this.authService.register(user)
  }
}
