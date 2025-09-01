// Cria o modelo do carrinho de compras

export type CartItem = {
  productId: string;
  quantity: number;
};

export type Cart = {
  id: number;
  items: CartItem[];
};
