import { Component, Input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Product } from "../../../../shared/types";

@Component({
  selector: 'category-item',
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  templateUrl: './category-item.component.html',
  styleUrl: './category-item.component.scss'
})
export class CategoryItemComponent {
  @Input() product!: Product;
}
