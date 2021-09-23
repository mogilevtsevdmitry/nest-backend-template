import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UsersEntity } from './users.entity'
import { UsersService } from './users.service'
import { CreateUserInput } from './create-user.input'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/gql-auth.guard'
import { CurrentUser } from '../auth/current-user.decorator'

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {
  }

  @Query(() => [UsersEntity])
  async findAllUsers(): Promise<UsersEntity[]> {
    return await this.usersService.findAllUsers()
  }

  @Query(() => UsersEntity)
  async findUserById(@Args('id', { type: () => ID }) id: number): Promise<UsersEntity> {
    return await this.usersService.findUserById(id)
  }

  @Query(() => UsersEntity)
  async findUserByEmail(@Args('email') email: string): Promise<UsersEntity> {
    return await this.usersService.findUserByEmail(email)
  }

  @Mutation(() => UsersEntity)
  async createUser(@Args('userInput') userInput: CreateUserInput): Promise<UsersEntity> {
    return await this.usersService.createUser(userInput)
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    return await this.usersService.removeUser(id)
  }

  @Query(() => UsersEntity)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: UsersEntity) {
    return this.usersService.findUserById(user.id)
  }
}
