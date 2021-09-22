import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  const port = app.get(ConfigService).get<number>('API_PORT')
  await app.listen(port || 3000, () => {
    console.log(`Приложение запустилось на ${port}`)
  })
}

bootstrap()
