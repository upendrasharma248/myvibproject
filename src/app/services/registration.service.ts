import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegistrationData {
  name: string;
  email: string;
  location: string;
  course: string;
}

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  private apiUrl = 'http://localhost:3001/api/register';
  private registrationsUrl = 'http://localhost:3001/api/registrations';

  constructor(private http: HttpClient) {}

  register(data: RegistrationData): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getAllRegistrations(): Observable<any[]> {
    return this.http.get<any[]>(this.registrationsUrl);
  }

  deleteRegistration(id: number): Observable<any> {
    return this.http.delete(`${this.registrationsUrl}/${id}`);
  }
}
