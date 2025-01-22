import { Component, Input } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { Category } from "../../../../shared/types";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'home-item',
  imports: [MatIconModule, RouterLink],
  templateUrl: './home-item.component.html',
  styleUrl: './home-item.component.scss'
})
export class HomeItemComponent {
  @Input() public category!: Category;
}
