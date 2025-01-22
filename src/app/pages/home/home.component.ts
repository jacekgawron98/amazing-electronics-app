import { Component, inject } from "@angular/core";
import { CategoryService } from "../../shared/services/category/category.service";
import { Observable } from "rxjs";
import { Category } from "../../shared/types";
import { AsyncPipe } from "@angular/common";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HomeItemComponent } from "./components/home-item/home-item.component";
import { LoaderComponent } from "../../shared/components/loader/loader.component";

@Component({
  selector: 'home-page',
  imports: [AsyncPipe, MatProgressSpinnerModule, HomeItemComponent, LoaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly categoryService: CategoryService = inject(CategoryService);

  protected categories$: Observable<Category[]> = this.categoryService.getCategories();
}
