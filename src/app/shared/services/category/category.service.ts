import { inject, Injectable } from '@angular/core';
import { Category } from '../../types';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { GET_CATEGORY_BY_SLUG } from './queries/get-category-by-slug';
import { GET_CATEGORIES } from './queries/get-categories';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly apollo = inject(Apollo);

  public getCategories(): Observable<Category[]> {
    return this.apollo.query({
      query: GET_CATEGORIES,
    }).pipe(
      map(result => result.data.categories)
    );
  }

  public getCategoryBySlug(slug: string): Observable<Category> {
    return this.apollo.query({
      query: GET_CATEGORY_BY_SLUG,
      variables: {
        slug
      }
    }).pipe(
      map(result => result.data.category)
    );
  }
}
