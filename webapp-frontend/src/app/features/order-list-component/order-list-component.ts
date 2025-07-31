import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderGet } from '../../core/models/orderModels/order.get.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-list-component',
  templateUrl: './order-list-component.html',
  styleUrls: ['./order-list-component.scss'],
  imports: [DatePipe]
})
export class OrderListComponent {

  expandedOrders = new Set<bigint>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public orders: OrderGet[]
  ) { }

  toggleOrder(orderId: bigint) {
    if (this.expandedOrders.has(orderId)) {
      this.expandedOrders.delete(orderId);
    } else {
      this.expandedOrders.add(orderId);
    }
  }

  isExpanded(orderId: bigint): boolean {
    return this.expandedOrders.has(orderId);
  }
}
