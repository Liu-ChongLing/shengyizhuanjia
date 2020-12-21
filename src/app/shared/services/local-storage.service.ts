import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private storage: any = window.localStorage;
  constructor() { }

  get(key: string, defaultValue?: any): any {
    let value: any = this.storage.getItem(key);
    try {
      value = JSON.parse(value);
    } catch (error) {
      value = null;
    }
    if (value === null && defaultValue) {
      value = defaultValue;
    }
    return value;
  }

  insert(key: string, value: any) {
    this.set(key, value);
  }

  set(key: string, value: any) {
    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch (error) {
      this.storage.setItem(key, null);
    }
  }
  remove(key: string) {
    this.storage.removeItem(key);
  }
}
