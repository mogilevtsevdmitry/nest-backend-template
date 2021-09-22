import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UsersEntity } from './users.entity'
import { UsersService } from './users.service'
import { CreateUserInput } from './dto/create-user.input'

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
}
