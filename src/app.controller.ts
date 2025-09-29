import { AppService } from './app.service'
import { ProductService } from './service/ProductService'
import { ProductsService } from './service/ProductsService'
import { CarMarketService } from './service/CarMarketService'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common'

@Controller()
export class AppController {
  constructor(
    private readonly carMarketService: CarMarketService,
    private readonly productService: ProductService,
    private readonly productsService: ProductsService, // <- cache service
  ) {}

  // ----------- Carrinho -----------
  @Get('cart/:cartId')
  getCart(@Param('cartId', ParseIntPipe) cartId: number) {
    return this.carMarketService.getCart(cartId)
  }

  @Post('cart/:cartId/items')
  addItem(
    @Param('cartId', ParseIntPipe) cartId: number,
    @Body() dto: { productId: number; quantity: number },
  ) {
    const item = {
      productId: dto.productId.toString(),
      quantity: dto.quantity,
    }
    return this.carMarketService.addItem(cartId, item)
  }

  @Put('cart/:cartId/items/:productId')
  updateItem(
    @Param('cartId', ParseIntPipe) cartId: number,
    @Param('productId', ParseIntPipe) productId: number,
    @Body() dto: { quantity: number },
  ) {
    return this.carMarketService.updateItem(
      cartId,
      productId.toString(),
      dto.quantity,
    )
  }

  @Delete('cart/:cartId/items/:productId')
  @HttpCode(204)
  removeItem(
    @Param('cartId', ParseIntPipe) cartId: number,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    this.carMarketService.removeItem(cartId, productId.toString())
  }

  @Post('cart/add')
  async addToCart(@Body() dto: { productId: string; quantity: number }) {
    // atraso artificial de 1 segundo
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      message: 'Item adicionado ao carrinho (simulação de atraso)',
      item: dto,
    }
  }

  // ----------- Produtos (sem cache) -----------
  @Get('products')
  getProducts() {
    return this.productService.findAll()
  }

  @Get('products/:id')
  getProductById(@Param('id') id: string) {
    return this.productService.findProductById(id)
  }

  // ----------- Produtos (com cache Redis) -----------
  @Get('products-cache/:id')
  getProductCache(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id)
  }

  // ----------- Hello World -----------
  @Get()
  getHello(): string {
    return 'Hello world'
  }
}
