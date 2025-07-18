import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService<T extends object> {
  save<K extends keyof T>(key: K, value: T[K]): void {
    localStorage.setItem(key as string, JSON.stringify(value));
  }

  get<K extends keyof T>(key: K): T[K] | null {
    const item = localStorage.getItem(key as string);
    return item ? JSON.parse(item) : null;
  }

  delete<K extends keyof T>(key: K): void {
    localStorage.removeItem(key as string);
  }

  hasKey<K extends keyof T>(key: K): boolean {
    return localStorage.getItem(key as string) !== null;
  }

  clear(): void {
    localStorage.clear();
  }
}
