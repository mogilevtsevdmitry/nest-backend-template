import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GqlExecutionContext } from '@nestjs/graphql'

import { AuthService } from './services/auth.service'

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {

  constructor(
    private authService: AuthService,
  ) {
    super()
  }

  // canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> | any {
  //   const ctx = GqlExecutionContext.create(context)
  //   const token = ExtractJwt.fromAuthHeaderAsBearerToken()
  //   console.log('token', ctx, token)
  //   return ctx.getContext().req
  // }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req
  }

}
