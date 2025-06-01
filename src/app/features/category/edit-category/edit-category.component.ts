import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

@Component({
  selector: 'app-edit-category',
  imports: [FormsModule,NgIf],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit , OnDestroy {

  id: string | null = null;  
  paramSubscription?: Subscription;
  editCategorySubscription?: Subscription;
  category?: Category;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService,private router: Router) {
    // You can inject the CategoryService here if you need to fetch category details

  }

  ngOnInit(): void {
   this.paramSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          this.categoryService.getCategoryById(this.id)
          .subscribe({
            next: (response) => {
              this.category = response;
            },
          });
        }
      }
    });
  }
  onSubmit(): void {
    // console.log('Form submitted', this.category);
    const updatedCategoryRequest: UpdateCategoryRequest = {
      name: this.category?.name || '',
      urlHandle: this.category?.urlHandle || '',
    };
    if (this.id) {
   this.editCategorySubscription = this.categoryService.updateCategory(this.id, updatedCategoryRequest)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/categories');
        }
      });
  }
}
  onDelete(): void {
     if (this.id) {
      this.categoryService.deleteCategory(this.id)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/categories');
        }
      })
    }
  }
  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
  }
}
