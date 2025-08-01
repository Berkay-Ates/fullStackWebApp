import { Customer } from '../../core/models/customer.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { LOCAL_STORAGE_KEYS } from '../../core/constants/keys';
import { ProfileService } from '../../core/services/profile/profile';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-profile',
  imports: [FormsModule],
  templateUrl: './customer-profile.html',
  styleUrl: './customer-profile.scss'
})
export class CustomerProfile implements OnInit {
  profileService = inject(ProfileService)

  customer!: Customer;

  constructor() { }

  ngOnInit(): void {
    console.log(this.getUserData());
    this.getInformations();
  }


  async getInformations() {
    const userId = this.getUserData().userId;
    const res = await this.profileService.getCustomerInformation(userId);
    this.customer = res;
  }

  getUserData() {
    const storedUserData = localStorage.getItem(LOCAL_STORAGE_KEYS.user);
    try {
      return storedUserData ? JSON.parse(storedUserData) : null;
    } catch (err) {
      console.warn('No JWT exists in the local storage.', err);
      return null;
    }
  }

  async updateCustomer() {
    const updatedCustomer = {
      ...this.customer
    };

    await this.profileService.updateCustomerInformation(updatedCustomer.email, updatedCustomer);
    this.getInformations();
  }


}
