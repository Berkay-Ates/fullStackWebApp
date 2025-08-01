import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EndpointConstant } from '../../../static/constants/endpoints';
import { Customer } from '../../models/customer.model';
import { firstValueFrom } from 'rxjs';

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

}
