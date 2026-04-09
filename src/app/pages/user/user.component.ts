import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// Registration data interface matching MySQL table
interface Registration {
  id: number;
  name: string;
  email: string;
  location: string;
  course: string;
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  registrations: Registration[] = [];
  loading = true;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Registration[]>('http://localhost:3001/api/registrations')
      .subscribe({
        next: (data) => {
          this.registrations = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load registration data.';
          this.loading = false;
        }
      });
  }
}