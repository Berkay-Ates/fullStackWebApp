import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../../models/product.models';
import { EndpointConstant } from '../../../static/constants/endpoints';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient);

  constructor() { }

  async createProduct(productValues: Product): Promise<Product> {
    const url = `${EndpointConstant.PRODUCT.CREATE_PRODUCT}`;
    const response$ = this.http.post<Product>(url, productValues);
    return await firstValueFrom(response$);
  }

  async getProducts(): Promise<Array<Product>> {
    const url = `${EndpointConstant.PRODUCT.GET_PRODUCTS}`;
    const response$ = this.http.get<Array<Product>>(url);
    return await firstValueFrom(response$);
  }

  async getProduct(id: number): Promise<Product> {
    const url = `${EndpointConstant.PRODUCT.GET_PRODUCT}/${id}`;
    const response$ = this.http.get<Product>(url);
    return await firstValueFrom(response$);
  }

  async updateProduct(productValues: Product, id: number): Promise<Product> {
    const url = `${EndpointConstant.PRODUCT.UPDATE_PRODUCT}/${id}`;
    const response$ = this.http.post<Product>(url, productValues);
    return await firstValueFrom(response$);
  }

  async patchProduct(productValues: Product, id: number): Promise<Product> {
    const url = `${EndpointConstant.PRODUCT.PATCH_PRODUCT}/${id}`;
    const response$ = this.http.patch<Product>(url, productValues);
    return await firstValueFrom(response$);
  }

  async deleteProduct(id: bigint): Promise<Product> {
    const url = `${EndpointConstant.PRODUCT.DELETE_PRODUCT}/${id}`;
    const response$ = this.http.delete<Product>(url, {});
    return await firstValueFrom(response$);
  }
}
