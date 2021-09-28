import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compareSync } from 'bcrypt'

import { UserEntity } from '../../users/user.entity'
import { UsersService } from '../../users/users.service'
import { JwtDto } from '../dto/jwt-dto'
import { CreateUserInput } from '../../users/create-user.input'
import { TokenService } from './token.service'


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
  ) {
  }

  async login(user: CreateUserInput): Promise<any> {
    const candidate = await this.userService.findUserByEmail(user.email)
    if (!candidate) {
      throw new NotFoundException(`Пользователь с email ${user.email} не найден!`)
    }
    const isMath = compareSync(user.password, candidate.password)
    if (!isMath) {
      throw new HttpException('Пароли не совпадают!', HttpStatus.FORBIDDEN)
    }
    const accessToken = `Bearer ${this.jwtService.sign({ email: candidate.email, userId: candidate.id })}`
    const { token } = await this.tokenService.create(candidate)
    return { accessToken, refreshToken: token }
  }

  async validateUser(payload: JwtDto): Promise<UserEntity> {
    return this.userService.findUserById(payload.userId)
  }

  async register(user: CreateUserInput): Promise<UserEntity> {
    return this.userService.createUser(user)
  }
}
