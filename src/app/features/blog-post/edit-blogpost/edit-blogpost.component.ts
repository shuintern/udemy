import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../../category/models/category.model';
import { CategoryService } from '../../category/services/category.service';

@Component({
  selector: 'app-edit-blogpost',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  id: string | null = null;
  model?: BlogPost;
  categories$?: Observable<Category[]>;
  selectedCategories?: string[];
  
  routeSubscription?: Subscription;
  deleteBlogPostSubscription?: Subscription;

  constructor(private route: ActivatedRoute, private blogPostService: BlogPostService, private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getallCategories();
    // Initialization logic can go here
    this.routeSubscription = this.route.paramMap.subscribe({
      next: params => {
        this.id = params.get('id');
        
        // Get BlogPost From API
       if (this.id) {
        this.blogPostService.getBlogPostById(this.id).subscribe({
          next:(response) => {
            // Populate the form with the blog post data
            this.model = response;
            this.selectedCategories = response.categories.map(x => x.id);
          },
          error: err => {
            console.error('Error fetching blog post:', err);
          }
        });
      }
    } 
     });
  }

  onSubmit(): void{}

  openImageSelector(): void{}

  onDelete(): void{
    if (this.id) {
      // call service and delete blogpost
      this.deleteBlogPostSubscription = this.blogPostService.deleteBlogPost(this.id)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogposts');
        }
      });
    }
  }

  closeImageSelector(): void{}

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
  }

}
