import { Injectable, NotFoundException } from '@nestjs/common';
import { Cart, CartItem } from '../model/Cart';
import { products } from '../data/Products'; 


// Serviço para gerenciar o carrinho de compras (lógica de negócio do carrinho)

@Injectable()
export class CarMarketService {
  private carts = new Map<number, Cart>();

  private getOrCreateCart(cartId: number): Cart {
    if (!this.carts.has(cartId)) {
      this.carts.set(cartId, { id: cartId, items: [] });
    }
    return this.carts.get(cartId)!;
  }

  getCart(cartId: number): Cart {
    const cart = this.carts.get(cartId);
    if (!cart) throw new NotFoundException('Carrinho não encontrado');
    return cart;
  }

  addItem(cartId: number, item: CartItem): Cart {
    const cart = this.getOrCreateCart(cartId);
    const existing = cart.items.find(i => i.productId === item.productId);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      cart.items.push(item);
    }
    return cart;
  }

  updateItem(cartId: number, productId: string, quantity: number): Cart {
    const cart = this.getCart(cartId);
    const item = cart.items.find(i => i.productId === productId);
    if (!item) throw new NotFoundException('Item não encontrado');
    item.quantity = quantity;
    return cart;
  }


  removeItem(cartId: number, productId: string): void {
    const cart = this.getCart(cartId);
    const before = cart.items.length;
    cart.items = cart.items.filter(i => i.productId !== productId);
    if (cart.items.length === before) {
      throw new NotFoundException('Item não encontrado');
    }
  }

  getCartWithDetails(cartId: number) {
    const cart = this.carts.get(cartId);
    if (!cart) throw new NotFoundException('Carrinho não encontrado');

    return cart.items.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        productId: item.productId,
        quantity: item.quantity,
        name: product?.name,
        price: product?.price,
        originalPrice: product?.originalPrice,
        image: product?.image,
        category: product?.category,
        inStock: product?.inStock,
      };
    });
  }

}



