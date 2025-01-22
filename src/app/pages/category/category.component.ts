import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CategoryService } from "../../shared/services/category/category.service";
import { Observable } from "rxjs";
import { Category } from "../../shared/types";
import { CommonModule } from "@angular/common";
import { CategoryItemComponent } from "./components/category-item/category-item.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'category-page',
  imports: [CommonModule, CategoryItemComponent, MatProgressSpinnerModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly categoryService = inject(CategoryService);

  protected category$: Observable<Category> = this.categoryService.getCategoryBySlug(
    this.activatedRoute.snapshot.paramMap.get('slug') || ''
  );
}
