import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarMarketService } from './service/CarMarketService';
import { ProductService } from './service/ProductService';
import { ProductsService } from './service/ProductsService';
import { CacheService } from './cache/cache.service';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: async () =>
        await redisStore({
          socket: {
            host: 'localhost', // Host do Redis
            port: 6379, // Porta do Redis
          },
        }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CarMarketService,
    ProductService,
    ProductsService,
    CacheService,
  ],
})
export class AppModule {}
