import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoryService } from "../../shared/services/category/category.service";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Category, Product } from "../../shared/types";
import { CommonModule } from "@angular/common";
import { CategoryItemComponent } from "./components/category-item/category-item.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { ProductService } from "../../shared/services/products/products.service";

@Component({
  selector: 'category-page',
  imports: [CommonModule, CategoryItemComponent, MatProgressSpinnerModule, LoaderComponent, InfiniteScrollDirective],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  private readonly router: Router = inject(Router);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly categoryService: CategoryService = inject(CategoryService);
  private readonly productService: ProductService = inject(ProductService);

  private _page: number = 0;
  private _categorySlug: string | null = this.activatedRoute.snapshot.paramMap.get('slug');

  protected products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  protected category$: Observable<Category> = this.categoryService.getCategoryBySlug(
    this._categorySlug || ''
  ).pipe(
    tap(category => {
      if (!category) {
        this.router.navigate(['error']);
        
        return;
      }

      this._page = 1;
      this.products$.next(category.products);
    })
  )

  protected onScrolled(): void {
    if (!this._categorySlug) return;

    
    this.productService.getProductsFromCategory(this._categorySlug, 9, this._page * 9).subscribe(result => {
      this.products$.next(this.products$.value.concat(result))
      this._page += 1;
    })
  }
}
