import { Component, OnDestroy, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-category',
  imports: [FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
  providers: [CategoryService]
})
export class AddCategoryComponent implements OnDestroy {

  model: AddCategoryRequest;
  private addCategorySubscription?: Subscription;

  constructor(
    @Inject(CategoryService) private categoryService: CategoryService,
    @Inject(Router) private router: Router
  ) {
    this.model = {
      name: '',
      urlHandle: ''
    };
  }

  onSubmit() {
    this.categoryService.addCategory(this.model).subscribe({
      next: (response) => {
        console.log('Category added successfully');
        this.router.navigateByUrl('/admin/categories'); // Navigate to the category list after adding
        // console.log(response);
        // this.model = { name: '', urlHandle: '' }; // Reset the form
      }
      // error: (err) => {
      //   console.error('Error adding category:', err);
      // }
    });
  }

    ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }
}
