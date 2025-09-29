import { Injectable } from '@nestjs/common';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class ProductsService {
	constructor(private readonly cacheService: CacheService) {}

	async findOne(id: number): Promise<any> {
		const cacheKey = `product:${id}`;

		// 1. Tenta buscar o produto no cache
		const cachedProduct = await this.cacheService.get<any>(cacheKey);
		if (cachedProduct) {
			console.log(`Produto ${id} encontrado no cache!`);
			return cachedProduct;
		}

		// 2. Se não estiver no cache, busca no "banco de dados"
		console.log(`Produto ${id} não encontrado no cache. Buscando no banco...`);
		
		// Lógica para buscar o produto no seu banco de dados principal (simulado)
		const productFromDb = { id, name: `Produto ${id}`, price: 100 };

		// 3. Salva o produto no cache para as próximas requisições
		await this.cacheService.set(cacheKey, productFromDb, 60); // Cache por 60 segundos

		return productFromDb;
	}
}
