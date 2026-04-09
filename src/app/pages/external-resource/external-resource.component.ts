import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OnInit } from '@angular/core';

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

@Component({
  selector: 'app-external-resource',
  templateUrl: './external-resource.component.html',
  styleUrls: ['./external-resource.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class ExternalResourceComponent implements OnInit {
  comments: Comment[] = [];
  loading = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchComments();
  }

  fetchComments() {
    this.loading = true;
    this.error = null;
    this.http.get<Comment[]>('https://jsonplaceholder.typicode.com/comments')
      .subscribe({
        next: (data) => {
          this.comments = data.slice(0, 20); // Show only first 20 for brevity
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load comments.';
          this.loading = false;
        }
      });
  }
}
