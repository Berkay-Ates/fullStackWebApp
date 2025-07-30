import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product/product';
import { ProductCategory } from '../../static/enums/product_categories';
import { LOCAL_STORAGE_KEYS } from '../../core/constants/keys';
import { Product } from '../../core/models/product.models';

@Component({
  selector: 'app-add-product-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product-dialog.html',
  styleUrls: ['./add-product-dialog.scss']

})
export class AddProductDialogComponent {
  dialogRef = inject(MatDialogRef<AddProductDialogComponent>);
  productService = inject(ProductService);
  fb = inject(FormBuilder);

  categories = Object.entries(ProductCategory).map(([key, value]) => ({
    key,
    value
  }));


  form = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    photoUrl: [''],
    price: [0, [Validators.required, Validators.min(0)]],
    category: [null, [Validators.required, Validators.min(0)]],
    stockQuantity: [0, [Validators.required, Validators.min(0)]],
  });

  async onSubmit(event: Event) {
    event.preventDefault();
    let storedUserData;
    storedUserData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.user)!);

    console.log(storedUserData);

    if (this.form.valid) {
      const productData = this.form.value;
      console.log('Saving Product:', productData);
      try {
        storedUserData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.user)!);
        const newProduct: Product = {
          ...productData as unknown as Product
        };
        newProduct.sellerId = storedUserData.userId;

        await this.productService.createProduct(newProduct);
        this.dialogRef.close('Product Saved Successfully');
      } catch (error) {
        throw new Error("There is a problem while reading the saved user information while saving the new product.");
      }

    } else {
      this.form.markAllAsTouched();
    }
  }

  close() {
    this.dialogRef.close('Product Saved Successfully');
  }

}
