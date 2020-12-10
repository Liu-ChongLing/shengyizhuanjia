import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Injectable } from '@angular/core';
import { AjaxResult } from '../interface/ajax-result';
import { CATEGORIES } from '../mock.categories';
import { Category } from '../category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  async getAll(): Promise<AjaxResult> {
    const categories = this.localStorageService.get('Category', CATEGORIES);
    return {
      targetUrl: '',
      result: categories,
      success: true,
      error: null,
      unAuthorizedRequest: false
    };
  }
  constructor(private localStorageService: LocalStorageService) { }

  isUniqueName(category: Category): boolean {
    if (category == null || (category.name === '')) {
      return false;
    }

    for (let i = 0; i < category.children.length - 1; i++) {
      for (let j = i + 1; j < category.children.length; j++) {
        if (category.children[i].name === category.children[j].name) {
          return false;
        }
      }
    }
    return true;
  }

  insert(category: Category): boolean {
    if (category == null) {
      return false;
    }
    if (this.isUniqueName(category) === false) {
      return false; // 子分类名称重复
    }
    const categories = this.localStorageService.get('Category', CATEGORIES);
    categories.push(category);
    this.localStorageService.set('Category', categories);
    return true;
  }
  insertSubCateCategory(category: Category): boolean {
    if (category === null) {
      return false;
    }
    const categories = this.localStorageService.get('Category', CATEGORIES);
    const idx = this.findCategoryIndexByName(category.name); console.log(idx);
    if (idx === -1) {
      return false; // 无索引
    }
    // tslint:disable-next-line: prefer-for-of
    for (let j = 0; j < category.children.length; j++) {
      categories[idx].children.push(category.children[j]);
    }
    if (this.isUniqueName(categories[idx]) === false) {
      return false; // 重名
    } else {
      this.localStorageService.set('Category', categories);
      return true;
    }
  }

  findCategoryIndexByName(name: string): number {
    const categories = this.localStorageService.get('Category', CATEGORIES);
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].name === name) {
        return i;
      }
    }
    return -1;
  }

  deleteSubCategoryById(category: Category, id: number): boolean {
    if (category == null) {
      return false;
    }
    for (let i = 0; i < category.children.length; i++) {
      if (category.children[i].id === id) {
        const idx = this.findCategoryIndexByName(category.name);
        const categories = this.localStorageService.get('Category', CATEGORIES);
        categories[idx].children.splice(i, 1);
        this.localStorageService.set('Category', categories);
        return true;
      }
    }
    return false;
  }

  findCategoryById(id: number): Category {
    const categories = this.localStorageService.get('Category', CATEGORIES);
    console.log(id);
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < categories.length; i++) {

      // tslint:disable-next-line: triple-equals
      if (categories[i].id == id) {
        return categories[i];
      }
    }
    return null;
  }

  deleteCategoryById(id: number): boolean {
    const categories = this.localStorageService.get('Category', CATEGORIES);
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].id === id) {
        categories.splice(i, 1);
        this.localStorageService.set('Category', categories);
        return true;
      }
    }
    return false;
  }

  findCategoryIndexById(id: number): number {
    const categories = this.localStorageService.get('Category', CATEGORIES);
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].id === id) {
        return i;
      }
    }
    return -1;
  }


  modifyCategory(category: Category): boolean {
    const idx = this.findCategoryIndexById(category.id);
    if (idx === -1) {
      return false;
    }
    const categories = this.localStorageService.get('Category', CATEGORIES);
    categories[idx] = category;
    this.localStorageService.set('Category', categories);
    return true;
  }
}
