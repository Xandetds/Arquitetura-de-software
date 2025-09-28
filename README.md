<div align="center">
  <h1>🛒 API de E-commerce — Arquitetura de Software</h1>
  <p>Projeto prático da disciplina de Arquitetura de Software — UniSatc</p>
</div>

---

## 📚 Sobre o Projeto
Este repositório contém a evolução de uma **API REST em NestJS** para um sistema de e-commerce, desenvolvida em duas etapas de entrega.  
O objetivo é aplicar **conceitos de arquitetura**, **escalabilidade** e **resiliência**, com testes práticos de desempenho.

---

## 🚀 Tecnologias Utilizadas
- [Node.js](https://nodejs.org/)  
- [NestJS](https://nestjs.com/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Postman](https://www.postman.com/) (testes manuais)  
- [Artillery](https://artillery.io/) (testes de carga)  
- [Redis](https://redis.io/) (cache para escalabilidade)  

---

## 📌 Estrutura da API
### Endpoints principais
- **GET `/products`** → lista todos os produtos (com suporte a paginação).  
- **GET `/products/:id`** → retorna detalhes de um produto específico.  
- **POST `/cart/add`** → adiciona item ao carrinho (com atraso artificial para simular processamento lento).  
- **GET `/cart/:id`** → retorna o carrinho com seus itens.  
- **PUT `/cart/:id/items/:productId`** → atualiza quantidade de um item no carrinho.  
- **DELETE `/cart/:id/items/:productId`** → remove um item do carrinho.  

---

# 📦 Entrega 1 — Implementação inicial
### ✔️ Objetivos
- Implementar serviço de carrinho de compras (CRUD básico).  
- Expor endpoints REST para carrinho.  
- Usar produtos mockados em memória.  
- Testar manualmente via Postman.  

### 🔨 O que foi feito
- Criação do `Cart` e `CartItem` como modelos (`model/`).  
- Implementação da lógica de carrinho (`CarMarketService`).  
- Criação do controlador REST (`AppController`).  
- Testes básicos de adicionar, atualizar, remover e buscar itens no carrinho.  
- Endpoint de produtos também exposto via GraphQL para aprendizado.  

---

# ⚡ Entrega 2 — Escalabilidade e Resiliência
### ✔️ Objetivos
- Evoluir a API, aplicando técnicas de **desempenho** e **resiliência**.  
- Introduzir simulação de processamento lento no `POST /cart/add`.  
- Executar **testes de carga** com Artillery.  
- Implementar **cache com Redis** para otimizar produtos.  
- Adicionar **timeout** no serviço de carrinho.  
- (Bônus) Circuit breaker para requisições repetidamente falhas.  

### 🔨 O que foi feito
1. **Simulação de carga**  
   - Adicionado `setTimeout` no endpoint `/cart/add` para simular operação lenta.  
   - Testes executados com **Artillery**, medindo latência, RPS e erros.  

2. **Cache com Redis**  
   - Configuração do `CacheModule` no `app.module.ts`.  
   - Criação de `CacheService` com métodos `set`, `get`, `del`.  
   - Endpoint `GET /products/:id` otimizado com padrão **Cache-Aside**.  
   - Redis local (Docker) ou Redis Cloud (free tier) configurado.  

3. **Timeout e Resiliência**  
   - Adicionado timeout no `POST /cart/add`.  
   - (Opcional) Circuit breaker implementado para interromper chamadas em falha.  

4. **Novos testes de carga**  
   - Comparação do desempenho **antes e depois do cache**.  
   - Observação de melhoria significativa no tempo de resposta.  

---

## 📊 Resultados 
- **Antes do cache:**  
  - Latência maior (cada requisição busca diretamente os dados).  
  - Maior uso de CPU/I/O.  

- **Depois do cache:**  
  - Latência reduzida (produtos já em memória via Redis).  
  - Melhor taxa de requisições por segundo (RPS).  
  - Menos gargalos em operações repetitivas.  


---

- **Disciplina:** Arquitetura de Software  
- **Instituição:** UniSatc  

