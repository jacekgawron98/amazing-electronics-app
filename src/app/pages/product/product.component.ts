import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription, switchMap, tap } from "rxjs";
import { Product } from "../../shared/types";
import { ProductService } from "../../shared/services/products/products.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AsyncPipe, CurrencyPipe, NgOptimizedImage } from "@angular/common";
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { RecommendationsComponent } from "./components/recommendations/recommendations.component";
import { CountdownComponent } from "./components/countdown/countdown.component";
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { PricePipe } from "../../shared/pipes/price.pipe";

@Component({
  selector: 'product-page',
  imports: [
    AsyncPipe,
    LoaderComponent,
    RecommendationsComponent,
    CountdownComponent,
    NgOptimizedImage,
    CurrencyPipe,
    MatButtonModule,
    MatIconModule,
    PricePipe
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);
  private readonly productService: ProductService = inject(ProductService);

  protected product$: Observable<Product> = this.activatedRoute.params.pipe(
    switchMap(params => this.productService.getProductBySlug(params['productId'] || '')),
    tap(product => {
      const categorySlug = this.activatedRoute.snapshot.paramMap.get('slug');

      if (!product || product.category.slug !== categorySlug) {
        this.router.navigate(['error']);
      }
    })
  )  

  protected sameCategoryProducts$: Observable<Product[]> = this.productService.getProductsFromCategory(
    this.activatedRoute.snapshot.paramMap.get('slug') || ''
  )
}
