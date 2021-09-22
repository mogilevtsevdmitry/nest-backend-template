import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DbConfigService } from './config/db-config.service'
import { GraphQLModule } from '@nestjs/graphql'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: DbConfigService,
      inject: [DbConfigService]
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      definitions: {
        emitTypenameField: true
      }
    }),
    UsersModule
  ],
  controllers: [],
  providers: [DbConfigService]
})
export class AppModule {
}
