import { Component, Input } from "@angular/core";
import { Product } from "../../../../shared/types";
import { CategoryItemComponent } from "../../../category/components/category-item/category-item.component";

@Component({
  selector: 'recommendations',
  imports: [CategoryItemComponent],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.scss'
})
export class RecommendationsComponent {
    @Input() public products: Product[] | null = [];
}