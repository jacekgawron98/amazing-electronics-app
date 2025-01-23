import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../../types';
import { GET_PRODUCT_BY_SLUG } from './queries/get-product-by-slug';
import { Apollo } from 'apollo-angular';
import { GET_PRODUCTS_BY_CATEGORY_SLUG } from './queries/get-products-by-category-slug';
import { GET_TOTAL_PRODUCTS_BY_CATEGORY_SLUG } from './queries/get-total-products-in-category-by-slug';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apollo: Apollo = inject(Apollo);

  public getProductsFromCategory(categorySlug: string, limit: number = 3, skip: number = 0): Observable<Product[]> {
    return this.apollo.query({
      query: GET_PRODUCTS_BY_CATEGORY_SLUG,
      variables: {
        slug: categorySlug,
        skip
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

  public getTotalProductsByCategorySlug(categorySlug: string): Observable<number> {
    return this.apollo.query({
      query: GET_TOTAL_PRODUCTS_BY_CATEGORY_SLUG,
      variables: {
        slug: categorySlug,
      }
    }).pipe(
      map(result => result.data.productsConnection.aggregate.count ?? 0),
    );
  }
}
