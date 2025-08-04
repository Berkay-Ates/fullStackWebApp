import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EndpointConstant } from '../../../static/constants/endpoints';
import { Customer } from '../../models/customer.model';
import { firstValueFrom } from 'rxjs';
import { Seller } from '../../models/seller.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient);

  constructor() { }

  async getCustomerInformation(id: number) {
    const url = `${EndpointConstant.PROFILE.GET_CUSTOMER_PROFILE}/${id}`;
    const response = this.http.get<Customer>(url);
    return await firstValueFrom(response);
  }

  async updateCustomerInformation(email: string, customer: Customer) {
    const url = `${EndpointConstant.PROFILE.UPDATE_CUSTOMER_PROFILE}/${email}`;
    const response = this.http.post<Customer>(url, customer);
    return await firstValueFrom(response);
  }

  async getSellerInformation(id: number) {
    const url = `${EndpointConstant.PROFILE.GET_SELLER_PROFILE}/${id}`;
    const response = this.http.get<Seller>(url);
    return await firstValueFrom(response);
  }

  async updateSellerInformation(email: string, seller: Seller) {
    const url = `${EndpointConstant.PROFILE.UPDATE_SELLER_PROFILE}/${email}`;
    const response = this.http.post<Seller>(url, seller);
    return await firstValueFrom(response);
  }
}
