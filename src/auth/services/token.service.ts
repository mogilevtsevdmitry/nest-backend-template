import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { TokenEntity } from '../token.entity'
import { UserEntity } from '../../users/user.entity'

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepo: Repository<TokenEntity>,
  ) {
  }

  async create(user: UserEntity): Promise<TokenEntity> {
    const token = new TokenEntity()
    token.user = user
    token.expiresIn = new Date(new Date().setMonth(new Date().getMonth() + 2))
    return await this.tokenRepo.save(token)
  }

  async remove(token: TokenEntity) {
    await this.tokenRepo.remove(token)
  }
}
