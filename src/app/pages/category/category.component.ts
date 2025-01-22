import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoryService } from "../../shared/services/category/category.service";
import { Observable, tap } from "rxjs";
import { Category } from "../../shared/types";
import { CommonModule } from "@angular/common";
import { CategoryItemComponent } from "./components/category-item/category-item.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { LoaderComponent } from "../../shared/components/loader/loader.component";

@Component({
  selector: 'category-page',
  imports: [CommonModule, CategoryItemComponent, MatProgressSpinnerModule, LoaderComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  private readonly router: Router = inject(Router);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly categoryService: CategoryService = inject(CategoryService);

  protected category$: Observable<Category> = this.categoryService.getCategoryBySlug(
    this.activatedRoute.snapshot.paramMap.get('slug') || ''
  ).pipe(
    tap(category => {
      if (!category) {
        this.router.navigate(['error']);
      }
    })
  )
}
