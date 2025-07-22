import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../../models/product.models';
import { EndpointConstant } from '../../../static/constants/endpoints';
import { firstValueFrom } from 'rxjs';
import { LOCAL_STORAGE_KEYS } from '../../constants/keys';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient);

  constructor() {
  }

  async createProduct(productValues: Product): Promise<Product> {
    let url: string = `${EndpointConstant.PRODUCT.CREATE_PRODUCT}`
    const headers = this.getAuthHeaders();

    const response$ = this.http.post<Product>(url, productValues, { headers });
    const product = await firstValueFrom(response$);
    return product;
  }

  async getProducts(): Promise<Array<Product>> {
    let url: string = `${EndpointConstant.PRODUCT.GET_PRODUCTS}`
    const headers = this.getAuthHeaders();

    const response$ = this.http.get<Array<Product>>(url, { headers });
    const products = await firstValueFrom(response$);
    return products;

  }

  async getProduct(id: number): Promise<Product> {
    let url: string = `${EndpointConstant.PRODUCT.GET_PRODUCT}/${id}`
    const headers = this.getAuthHeaders();

    const response$ = this.http.get<Product>(url, { headers });
    const product = await firstValueFrom(response$);
    return product;
  }


  async updateProduct(productValues: Product, id: number): Promise<Product> {
    let url: string = `${EndpointConstant.PRODUCT.UPDATE_PRODUCT}/${id}`
    const headers = this.getAuthHeaders();

    const response$ = this.http.post<Product>(url, productValues, { headers });
    const product = await firstValueFrom(response$);
    return product;

  }

  async patchProduct(productValues: Product, id: number): Promise<Product> {
    let url: string = `${EndpointConstant.PRODUCT.PATCH_PRODUCT}/${id}`
    const headers = this.getAuthHeaders();

    const response$ = this.http.patch<Product>(url, productValues, { headers });
    const product = await firstValueFrom(response$);
    return product;
  }

  async deleteProduct(id: number): Promise<Product> {
    let url: string = `${EndpointConstant.PRODUCT.DELETE_PRODUCT}/${id}`
    const headers = this.getAuthHeaders();

    const response$ = this.http.post<Product>(url, { headers });
    const product = await firstValueFrom(response$);
    return product;
  }

  private getAuthHeaders(): HttpHeaders {
    const userStr = localStorage.getItem(LOCAL_STORAGE_KEYS.user);
    const token = userStr ? JSON.parse(userStr)?.accessToken : null;

    if (!token) {
      throw new Error('There is no valid user');
    }

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

}
