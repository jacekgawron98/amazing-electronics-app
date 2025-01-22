import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../../types';
import { GET_PRODUCT_BY_SLUG } from './queries/get-product-by-slug';
import { Apollo } from 'apollo-angular';
import { GET_PRODUCTs_BY_CATEGORY_SLUG } from './queries/get-products-by-category-slug';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apollo: Apollo = inject(Apollo);

  public getProductsFromCategory(categorySlug: string, limit: number = 3): Observable<Product[]> {
    return this.apollo.query({
      query: GET_PRODUCTs_BY_CATEGORY_SLUG,
      variables: {
        slug: categorySlug
      }
    }).pipe(
      map(result => result.data.products.slice(0, limit)),
    );
  }

  public getProductBySlug(slug: string): Observable<Product> {
    return this.apollo.query({
      query: GET_PRODUCT_BY_SLUG,
      variables: {
        slug
      }
    }).pipe(
      map(result => result.data.product)
    );
  }
}
