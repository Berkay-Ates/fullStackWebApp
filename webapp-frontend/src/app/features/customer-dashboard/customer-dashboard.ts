import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product/product';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../../core/models/product.models';
import { CommonModule } from '@angular/common';
import { BasketItem } from '../../core/models/basketItem.model';
import { OrderService } from '../../core/services/order/order';
import { OrderPost } from '../../core/models/orderModels/order.post.model';
import { OrderItemPost } from '../../core/models/orderItemModels/order_item.post.model';
import { LOCAL_STORAGE_KEYS } from '../../core/constants/keys';

@Component({
  selector: 'app-customer-dashboard',
  imports: [CommonModule],
  templateUrl: './customer-dashboard.html',
  styleUrl: './customer-dashboard.scss'
})
export class CustomerDashboard implements OnInit {

  productService = inject(ProductService);
  orderService = inject(OrderService)
  dialog = inject(MatDialog);
  products: Product[] = [];
  basket: BasketItem[] = [];

  async ngOnInit(): Promise<void> {
    this.products = await this.productService.getProducts();
  }

  addToBasket(product: Product): void {
    const item = this.basket.find(b => b.product.id === product.id);

    if (this.getRemainingStock(product) <= 0) return;

    if (item) {
      item.quantity++;
    } else {
      this.basket.push({ product, quantity: 1 });
    }
  }

  removeFromBasket(product: Product): void {
    const itemIndex = this.basket.findIndex(b => b.product.id === product.id);
    if (itemIndex >= 0) {
      const item = this.basket[itemIndex];
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        this.basket.splice(itemIndex, 1);
      }
    }
  }

  removeAllFromBasket(product: Product): void {
    const itemIndex = this.basket.findIndex(b => b.product.id === product.id);
    if (itemIndex >= 0) {
      this.basket.splice(itemIndex, 1);
    }
  }

  getRemainingStock(product: Product): number {
    const item = this.basket.find(b => b.product.id === product.id);
    return product.stockQuantity - (item?.quantity || 0);
  }

  getQuantity(product: Product): number {
    const item = this.basket.find(b => b.product.id === product.id);
    return item?.quantity || 0;
  }

  isInBasket(product: Product): boolean {
    return this.basket.some(b => b.product.id === product.id);
  }

  async placeOrder() {
    if (this.basket.length === 0) return;
    console.log("Sipariş verildi:", this.basket);

    const orderItems: OrderItemPost[] = this.basket.map((item): OrderItemPost => ({
      productId: item.product.id,
      sellerId: item.product.sellerId,
      quantity: item.quantity,
      category: item.product.category,
      unitPrice: item.product.price,
    }));

    const orderPost: OrderPost = {
      customerId: this.getUserDate().userId,
      totalAmount: 0,
      orderItems: orderItems,
    }

    try {
      const result = await this.orderService.createOrder(orderPost);
      console.log(result);
      this.basket = [];

    } catch (error) {
      console.log(error);
    }

  }

  showOrders() { }


  getUserDate() {
    let parsedData: any = null;
    const storedUserData = localStorage.getItem(LOCAL_STORAGE_KEYS.user);

    try {
      if (storedUserData) {
        parsedData = JSON.parse(storedUserData);
      }
    } catch (err) {
      console.warn('No JWT exists in the local storage.', err);
    }

    return parsedData;
  }
}