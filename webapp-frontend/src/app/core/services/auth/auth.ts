import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthResponse } from '../../models/Auth/responseModels/jwtResponse';
import { EndpointConstant } from '../../../static/constants/endpoints';
import { LoginEntityRequest } from '../../models/Auth/requestModels/requestLoginObject';
import { RegisterCustomerRequest } from '../../models/Auth/requestModels/customerRegisterModel';
import { RegisterSellerRequest } from '../../models/Auth/requestModels/sellerRegisterModel';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  http = inject(HttpClient);

  async loginCustomer(customerValues: LoginEntityRequest): Promise<AuthResponse> {
    let url: string = `${EndpointConstant.AUTH.LOGIN_CUSTOMER}`
    const response$ = this.http.post<AuthResponse>(url, customerValues);
    const customer = await firstValueFrom(response$);
    return customer;
  }

  async registerCustomer(customerValues: RegisterCustomerRequest): Promise<AuthResponse> {
    let url: string = `${EndpointConstant.AUTH.REGISTER_CUSTOMER}`
    const response$ = this.http.post<AuthResponse>(url, customerValues);
    const customer = await firstValueFrom(response$);
    return customer;
  }

  async registerSeller(sellerValues: RegisterSellerRequest): Promise<AuthResponse> {
    let url: string = `${EndpointConstant.AUTH.REGISTER_SELLER}`
    const response$ = this.http.post<AuthResponse>(url, sellerValues);
    const customer = await firstValueFrom(response$);
    return customer;
  }

  async loginSeller(sellerValues: LoginEntityRequest): Promise<AuthResponse> {
    let url: string = `${EndpointConstant.AUTH.LOGIN_SELLER}`
    const response$ = this.http.post<AuthResponse>(url, sellerValues);
    const customer = await firstValueFrom(response$);
    return customer;
  }

}
