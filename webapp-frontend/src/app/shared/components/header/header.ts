import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

import { LOCAL_STORAGE_KEYS } from '../../../core/constants/keys';
import { LocalStorageService } from '../../../core/storage/localStorage/service';
import { UserData } from '../../../core/storage/localStorage/model';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})

export class Header {
  title = signal("Kafein Web App!")
  storageService: LocalStorageService<UserData> = new LocalStorageService();

  constructor(private router: Router) { }

  isAuthenticatedRoute(): boolean {
    const visibleOn = ['/sellerDashboard', '/customerDashboard', '/customerProfile'];
    return visibleOn.includes(this.router.url);
  }

  signOut(): void {
    this.storageService.delete(LOCAL_STORAGE_KEYS.user);
    this.router.navigate(['/']);
  }
}
