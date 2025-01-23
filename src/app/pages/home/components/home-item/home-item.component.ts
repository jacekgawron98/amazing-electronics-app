import { Component, inject, Input, OnInit } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { Category } from "../../../../shared/types";
import { RouterLink } from "@angular/router";
import { ProductService } from "../../../../shared/services/products/products.service";
import { AsyncPipe } from "@angular/common";
import { Observable, of } from "rxjs";

@Component({
  selector: 'home-item',
  imports: [MatIconModule, RouterLink, AsyncPipe],
  templateUrl: './home-item.component.html',
  styleUrl: './home-item.component.scss'
})
export class HomeItemComponent implements OnInit {
  private readonly productService: ProductService = inject(ProductService);

  @Input() public category!: Category;

  protected productsCount$!: Observable<number>;

  public ngOnInit(): void {
    this.productsCount$ = this.productService.getTotalProductsByCategorySlug(this.category.slug);
  }
}
