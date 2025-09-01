import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProductService } from './service/ProductService'
import { ProductResolver } from './app.resolver'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo'
import { join } from 'path'
import { CarMarketService } from './service/CarMarketService';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    CartModule,
  ],
  controllers: [AppController],
  providers: [CarMarketService,AppService, ProductService, ProductResolver],
})
export class AppModule {}
