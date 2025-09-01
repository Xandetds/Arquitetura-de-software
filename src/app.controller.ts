
import { AppService } from './app.service'
import { Product } from './model/Product'
import { ProductService } from './service/ProductService'
import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CarMarketService } from './service/CarMarketService';

// Controlador de rotas REST para o carrinho de compras ( Expõe os endpoints REST do carrinho para o cliente:)

@Controller()
export class AppController {
  constructor(private readonly carMarketService: CarMarketService) {}

  @Get('cart/:cartId')
  getCart(@Param('cartId', ParseIntPipe) cartId: number) {
    return this.carMarketService.getCart(cartId);
  }

 @Post('cart/:cartId/items')
  addItem(
  @Param('cartId', ParseIntPipe) cartId: number,
  @Body() dto: { productId: number; quantity: number },
  ) {
  const item = {
    productId: dto.productId.toString(), 
    quantity: dto.quantity,
  };
  return this.carMarketService.addItem(cartId, item);
  }


 @Put('cart/:cartId/items/:productId')
  updateItem(
  @Param('cartId', ParseIntPipe) cartId: number,
  @Param('productId', ParseIntPipe) productId: number,
  @Body() dto: { quantity: number },
  ) {
  
  return this.carMarketService.updateItem(cartId, productId.toString(), dto.quantity);
  }

 @Delete('cart/:cartId/items/:productId')
 @HttpCode(204)
 removeItem(
  @Param('cartId', ParseIntPipe) cartId: number,
  @Param('productId', ParseIntPipe) productId: number,
 ) {
  // converte productId para string
  this.carMarketService.removeItem(cartId, productId.toString());
 }
}
