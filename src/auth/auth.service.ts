import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compareSync } from 'bcrypt'
import { v4 as uuid } from 'uuid'

import { UsersEntity } from '../users/users.entity'
import { UsersService } from '../users/users.service'
import { JwtDto } from './jwt-dto'
import { CreateUserInput } from '../users/create-user.input'
import { TokenDto } from './token-dto'

export interface IRefreshToken {
  token: string
  expiresIn: Date
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {
  }

  async login(user: CreateUserInput): Promise<TokenDto> {
    const candidate = await this.userService.findUserByEmail(user.email)
    if (!candidate) {
      throw new NotFoundException(`Пользователь с email ${user.email} не найден!`)
    }
    const isMath = compareSync(user.password, candidate.password)
    if (!isMath) {
      throw new HttpException('Пароли не совпадают!', HttpStatus.FORBIDDEN)
    }
    const payload: JwtDto = { email: candidate.email, userId: candidate.id }
    const accessToken = `Bearer ${this.jwtService.sign(payload)}`
    const refresh_token = await this.createRefreshToken()
    return { accessToken, token: refresh_token.token, expiresIn: refresh_token.expiresIn }
  }

  async validateUser(payload: JwtDto): Promise<UsersEntity> {
    return this.userService.findUserById(payload.userId)
  }

  async register(user: CreateUserInput): Promise<UsersEntity> {
    return this.userService.createUser(user)
  }

  async createRefreshToken(): Promise<IRefreshToken> {
    const token = uuid()
    const expiresIn = new Date(Date.now() + 12096e5)
    return { token, expiresIn }
  }
}
