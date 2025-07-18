import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { LOCAL_STORAGE_KEYS } from '../../core/constants/keys';
import { UserType } from '../../static/enums/user_types';
import { LocalStorageService } from '../../core/storage/localStorage/service';
import { UserData } from '../../core/storage/localStorage/model';

@Component({
  selector: 'app-welcome',
  imports: [RouterLink],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss'
})

export class Welcome {
  showEmailCheckBanner = false;
  storageService: LocalStorageService<UserData> = new LocalStorageService();

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.showEmailCheckBanner = !!nav?.extras.state?.['emailCheck'];
  }

    ngOnInit(): void {
      
      const nav = this.router.getCurrentNavigation();
      this.showEmailCheckBanner = !!nav?.extras.state?.['emailCheck'];

      const value = localStorage.getItem(LOCAL_STORAGE_KEYS.user)
      const userInformarion = value == null ? "" : JSON.parse(value)      

      const userToken = userInformarion.accessToken
      const userType = userInformarion.userType

      console.log(userInformarion);

      if (userInformarion != "" && userToken ) {
        try {
          if (userType === UserType.CUSTOMER) {

            this.router.navigate(['/customerDashboard']);
          } else if (userType=== UserType.SELLER) {
            this.router.navigate(['/sellerDashboard']);
          }
        } catch (err) {
          console.error('Invalid user data in localStorage', err);
        }
      }
  }

}