import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
// Adiciona ou atualiza um valor no cache
    async set(key: string, value: any, ttl: number = 3600): Promise<void> {
        await this.cacheManager.set(key, value, ttl * 1000); 
}
// Recupera um valor do cache
async get<T>(key: string): Promise<T | undefined> {
    return await this.cacheManager.get<T>(key);
}
// Remove um valor do cache
async del(key: string): Promise<void> {
    await this.cacheManager.del(key);
}
}
