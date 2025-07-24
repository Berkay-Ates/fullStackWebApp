import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product/product';
import { Product } from '../../core/models/product.models';
import { MatDialog } from '@angular/material/dialog';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seller-dashboard.html',
  styleUrls: ['./seller-dashboard.scss']
})

export class SellerDashboard implements OnInit {
  productService = inject(ProductService);
  dialog = inject(MatDialog);
  products: Product[] = [];

  async ngOnInit(): Promise<void> {
    this.products = await this.productService.getProducts();
  }

  async goToAddProduct() {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '400px',
    });

    const result = await dialogRef.afterClosed().toPromise();
    console.log('Dialog kapandı, dönen veri:', result);
    if (result != null) {
      this.products = await this.productService.getProducts();
    }
  }

  async deleteProduct(productId: bigint) {
    const res = await this.productService.deleteProduct(productId);

    if (res == null) {
      this.products = await this.productService.getProducts();
    }
  }

}
