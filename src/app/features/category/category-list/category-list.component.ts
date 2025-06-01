import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  imports: [RouterLink,CommonModule],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
    // Using Observable to handle asynchronous data fetching
    // This allows the component to reactively update when the data changes
    categories$?: Observable<Category[]>;

    constructor(private categoryService: CategoryService) {
      
    }

    ngOnInit(): void {
      this.categories$ = this.categoryService.getallCategories();
    }
}
