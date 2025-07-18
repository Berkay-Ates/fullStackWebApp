import { Component, inject, Signal, signal } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { FormsModule } from '@angular/forms';
import { UserType } from '../../static/enums/user_types';
import { RegisterCustomerRequest } from '../../core/models/Auth/requestModels/customerRegisterModel';
import { RegisterSellerRequest } from '../../core/models/Auth/requestModels/sellerRegisterModel';
import { LocalStorageService } from '../../core/storage/localStorage/service';
import { UserData } from '../../core/storage/localStorage/model';
import { LOCAL_STORAGE_KEYS } from '../../core/constants/keys';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
    authService = inject(Auth)
    email: string = '';
    password: string = '';
    name: string = '';
    surname: string = '';

    UserType = UserType;

  constructor(private router: Router) {}
  
  userType = signal(UserType.CUSTOMER);
  storageService: LocalStorageService<UserData> = new LocalStorageService();

  onUserTypeChange(newType: UserType) {
    this.userType.set(newType);
  }

  async register() {
    if (!this.email || !this.password) {
      console.log('Email ve şifre zorunlu');
      return;
    }

    const userData: UserData = {
      accessToken: '',
      userType: this.userType(),
      email: this.email,
    }

    try {
      if(this.userType() === UserType.CUSTOMER){
        const registerObject: RegisterCustomerRequest = {surname: this.surname, email: this.email, password: this.password, name: this.name}; 
        const res = await this.authService.registerCustomer(registerObject);
      
        localStorage.setItem(LOCAL_STORAGE_KEYS.user, JSON.stringify(userData));
        console.log("From LocalStorage",this.storageService.get(LOCAL_STORAGE_KEYS.user))

        this.router.navigate(['/'], { state: { 'emailCheck': false }});
      
      }else if(this.userType() === UserType.SELLER){
        const registerObject: RegisterSellerRequest = {email: this.email, password: this.password, name: this.name};
        const res = await this.authService.registerSeller(registerObject);

        localStorage.setItem(LOCAL_STORAGE_KEYS.user, JSON.stringify(userData));
        console.log("From LocalStorage", this.storageService.get(LOCAL_STORAGE_KEYS.user))

        this.router.navigate(['/'], { state: { 'emailCheck': false }});      
      }

    } catch (err: any) {
      console.error('Kayit başarisiz', err);
      // hata mesajı göster
    }
  }

}
