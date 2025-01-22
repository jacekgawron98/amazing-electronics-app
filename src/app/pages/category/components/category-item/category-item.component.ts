import { Component, inject, Input } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Product } from "../../../../shared/types";
import { PricePipe } from "../../../../shared/pipes/price.pipe";

@Component({
  selector: 'category-item',
  imports: [CommonModule, NgOptimizedImage, RouterLink, PricePipe],
  templateUrl: './category-item.component.html',
  styleUrl: './category-item.component.scss'
})
export class CategoryItemComponent {
  private readonly activeRoute: ActivatedRoute = inject(ActivatedRoute);

  @Input() product!: Product;

  protected category: string | null = this.activeRoute.snapshot.paramMap.get('slug');
}
