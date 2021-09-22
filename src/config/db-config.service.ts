import { Injectable } from '@nestjs/common'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class DbConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) {
  }

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: this.config.get<'aurora-data-api'>('DB_TYPE'),
      username: this.config.get<string>('DB_USERNAME'),
      password: this.config.get<string>('DB_PASSWORD'),
      port: this.config.get<number>('DB_PORT') || 5432,
      database: this.config.get<string>('DB_DATABASE'),
      host: this.config.get<string>('DB_HOST'),
      entities: [__dirname + '**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
      dropSchema: false,
      logging: true
    }
  }
}
