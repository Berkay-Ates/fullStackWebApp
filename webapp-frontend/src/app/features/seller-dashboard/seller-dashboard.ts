import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product/product';
import { Product } from '../../core/models/product.models';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog';
import { ProductCategory } from '../../static/enums/product_categories';
import { OrderListComponent } from '../order-list-component/order-list-component';
import { OrderService } from '../../core/services/order/order';
import { LOCAL_STORAGE_KEYS } from '../../core/constants/keys';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seller-dashboard.html',
  styleUrls: ['./seller-dashboard.scss']
})

export class SellerDashboard implements OnInit {
  productService = inject(ProductService);
  orderService = inject(OrderService)

  dialog = inject(MatDialog);
  products: Product[] = [];

  async ngOnInit(): Promise<void> {
    this.products = await this.productService.getProductsByCustomer(this.getUserData().userId);
  }

  categories = Object.entries(ProductCategory).map(([key, value]) => ({
    key,
    value
  }));

  async goToAddProduct() {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '400px',
    });

    const result = await dialogRef.afterClosed().toPromise();
    console.log('Dialog kapandı, dönen veri:', result);
    if (result != null) {
      this.products = await this.productService.getProductsByCustomer(this.getUserData().userId);
    }
  }

  async deleteProduct(productId: bigint) {
    const res = await this.productService.deleteProduct(productId);

    if (res == null) {
      this.products = await this.productService.getProductsByCustomer(this.getUserData().userId);
    }
  }

  async updateProduct(product: Product) {

    const res = await this.productService.updateProduct(product, product.id);
    this.products = await this.productService.getProductsByCustomer(this.getUserData().userId);

  }

  navigateToSellerProfile() {

  }

  async showOrders() {
    try {
      console.log(this.getUserData());
      const result = await this.orderService.getOrdersBySeller(this.getUserData().userId);
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

  getUserData() {
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
