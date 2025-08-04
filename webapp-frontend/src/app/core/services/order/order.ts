import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { OrderPost } from '../../models/orderModels/order.post.model';
import { OrderGet } from '../../models/orderModels/order.get.model';
import { EndpointConstant } from '../../../static/constants/endpoints';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  http = inject(HttpClient);

  constructor() { }

  async createOrder(orders: OrderPost): Promise<OrderGet> {
    const url = `${EndpointConstant.ORDER.CREATE_ORDER}`;
    const response = this.http.post<OrderGet>(url, orders);
    return await firstValueFrom(response);
  }


  async getOrders(id: number): Promise<Array<OrderGet>> {
    const url = `${EndpointConstant.ORDER.GET_ORDERS_BY_CUSTOMER}/${id}`;
    const response = this.http.get<Array<OrderGet>>(url);
    return await firstValueFrom(response);
  }

  async getOrdersBySeller(id: number): Promise<Array<OrderGet>> {
    const url = `${EndpointConstant.ORDER.GET_ORDERS_BY_SELLER}/${id}`;
    const response = this.http.get<Array<OrderGet>>(url);
    return await firstValueFrom(response);
  }

  async getOrder(id: number): Promise<OrderGet> {
    const url = `${EndpointConstant.ORDER.GET_ORDER}/${id}`;
    const response = await this.http.get<OrderGet>(url);
    return await firstValueFrom(response);
  }


}
