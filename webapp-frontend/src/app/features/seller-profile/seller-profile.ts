import { Component, inject } from '@angular/core';
import { Seller } from '../../core/models/seller.model';
import { ProfileService } from '../../core/services/profile/profile';
import { LOCAL_STORAGE_KEYS } from '../../core/constants/keys';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seller-profile',
  imports: [FormsModule],
  templateUrl: './seller-profile.html',
  styleUrl: './seller-profile.scss'
})
export class SellerProfile {

  profileService = inject(ProfileService)

  seller!: Seller;

  constructor() { }

  ngOnInit(): void {
    console.log(this.getSellerData());
    this.getInformations();
  }

  async getInformations() {
    const userId = this.getSellerData().userId;
    const res = await this.profileService.getSellerInformation(userId);
    this.seller = res;
  }

  getSellerData() {
    const storedUserData = localStorage.getItem(LOCAL_STORAGE_KEYS.user);
    try {
      return storedUserData ? JSON.parse(storedUserData) : null;
    } catch (err) {
      console.warn('No JWT exists in the local storage.', err);
      return null;
    }
  }

  async updateSeller() {
    const updatedSeller = { ...this.seller };

    await this.profileService.updateSellerInformation(updatedSeller.email, updatedSeller);
    this.getInformations();
  }

}
