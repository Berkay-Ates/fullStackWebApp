import { Component, inject } from '@angular/core';
import { Auth } from '../../core/services/auth/auth';
import { FormsModule } from '@angular/forms';
import { UserType } from '../../static/enums/user_types';
import { LoginEntityRequest } from '../../core/models/Auth/requestModels/requestLoginObject';
import { LocalStorageService } from '../../core/storage/localStorage/service';
import { LOCAL_STORAGE_KEYS } from '../../core/constants/keys';
import { UserData } from '../../core/storage/localStorage/model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})

export class Login {
  authService = inject(Auth)
  email: string = '';
  password: string = '';
  userType: UserType = UserType.CUSTOMER;

  constructor(private router: Router) { }

  storageService: LocalStorageService<UserData> = new LocalStorageService();


  // TODO: Check is the user account is activated, if yes, then forward user to the related pages
  async login() {
    if (!this.email || !this.password) {
      console.log('Email ve şifre zorunlu');
      return;
    }

    const userData: UserData = {
      userId: 0,
      accessToken: '',
      userType: this.userType,
      email: this.email,
    }


    let loginObject: LoginEntityRequest = { email: this.email, password: this.password }
    try {

      if (this.userType === UserType.CUSTOMER) {
        console.log("Customer Login")
        console.log(loginObject);

        const res = await this.authService.loginCustomer(loginObject);
        userData.accessToken = res.token;
        userData.userType = UserType.CUSTOMER
        userData.userId = res.userId;

        localStorage.setItem(LOCAL_STORAGE_KEYS.user, JSON.stringify(userData));
        console.log("From LocalStorage", this.storageService.get(LOCAL_STORAGE_KEYS.user))
        this.router.navigate(['/customerDashboard'], { state: { 'emailCheck': false } });

      } else if (this.userType === UserType.SELLER) {
        console.log("Seller Login")
        const res = await this.authService.loginSeller(loginObject);
        userData.accessToken = res.token;
        userData.userType = UserType.SELLER
        userData.userId = res.userId;

        localStorage.setItem(LOCAL_STORAGE_KEYS.user, JSON.stringify(userData));
        console.log("From LocalStorage", this.storageService.get(LOCAL_STORAGE_KEYS.user))
        this.router.navigate(['/sellerDashboard'], { state: { 'emailCheck': false } });
      }

    } catch (err: any) {
      console.error('Giriş başarisiz', err);
      console.log(err)
    }
  }
}
