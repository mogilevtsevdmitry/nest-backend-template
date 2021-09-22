import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { UsersEntity } from './users.entity'
import { Repository } from 'typeorm'
import { CreateUserInput } from './dto/create-user.input'
import { Helper } from './helper'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepo: Repository<UsersEntity>
  ) {
  }

  async createUser(createUserInput: CreateUserInput): Promise<UsersEntity> {
    const { email, password } = createUserInput
    const candidate = await this.findUserByEmail(email)
    if (candidate) {
      throw new HttpException('', HttpStatus.CONFLICT)
    }
    const hashedPassword = await Helper.hash(password)
    const user = await this.userRepo.create({ email, password: hashedPassword })
    return await this.userRepo.save(user)
  }

  async findAllUsers(): Promise<UsersEntity[]> {
    return await this.userRepo.find()
  }

  async findUserById(id: number): Promise<UsersEntity> {
    return await this.userRepo.findOne({ id })
  }

  async findUserByEmail(email: string): Promise<UsersEntity> {
    return await this.userRepo.findOne({ email })
  }

  async removeUser(id: number): Promise<boolean> {
    return !!await this.userRepo.delete({ id })
  }
}
