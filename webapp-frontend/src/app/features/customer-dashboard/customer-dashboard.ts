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
import { OrderListComponent } from '../order-list-component/order-list-component';
import { Router } from '@angular/router';
import { LocalStorageSingletonClass } from '../../core/singleton/localStorageObjects';
import { UserData } from '../../core/storage/localStorage/model';

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
  userData!: UserData | undefined;

  constructor(private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    this.products = await this.productService.getProducts();

    this.userData = LocalStorageSingletonClass.Instance.getUserData();

    if (this.userData === undefined) {
      this.userData = this.getUserDate();
    }

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

    const totalAmount = orderItems.reduce((sum, item) => {
      return sum + item.unitPrice * item.quantity;
    }, 0);

    const orderPost: OrderPost = {
      customerId: this.getUserDate().userId,
      totalAmount: totalAmount,
      orderItems: orderItems,
    }

    try {
      const result = await this.orderService.createOrder(orderPost);
      console.log(result);
      this.basket = [];
      this.products = await this.productService.getProducts();
    } catch (error) {
      console.log(error);
    }

  }

  async showOrders() {
    try {
      const result = await this.orderService.getOrders(this.getUserDate().userId);
      console.log(result);

      const dialogRef = this.dialog.open(OrderListComponent, {
        width: '90vw',
        maxWidth: '1200px',
        height: '80vh',
        maxHeight: '800px',
        data: result
      });

    } catch (error) {
      console.log(error);
    }
  }

  navigateCustomerProfile() {
    this.router.navigate(['/customerProfile']);
  }

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