import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserEntity } from './user.entity'
import { UsersService } from './users.service'
import { CreateUserInput } from './create-user.input'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/gql-auth.guard'
import { CurrentUser } from '../auth/current-user.decorator'

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {
  }

  @Query(() => [UserEntity])
  async findAllUsers(): Promise<UserEntity[]> {
    return await this.usersService.findAllUsers()
  }

  @Query(() => UserEntity)
  async findUserById(@Args('id', { type: () => ID }) id: number): Promise<UserEntity> {
    return await this.usersService.findUserById(id)
  }

  @Query(() => UserEntity)
  async findUserByEmail(@Args('email') email: string): Promise<UserEntity> {
    return await this.usersService.findUserByEmail(email)
  }

  @Mutation(() => UserEntity)
  async createUser(@Args('userInput') userInput: CreateUserInput): Promise<UserEntity> {
    return await this.usersService.createUser(userInput)
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    return await this.usersService.removeUser(id)
  }

  @Query(() => UserEntity)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: UserEntity) {
    return this.usersService.findUserById(user.id)
  }
}
