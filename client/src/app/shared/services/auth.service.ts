import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string = null;

  constructor(private http: HttpClient,
              private router: Router) { }

  login(user: User): Observable<{token: string}> {
    return this.http.post<{token: string}>('/api/auth/login',user)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem('auth-token',token);
            this.setToken(token);
          }
        )
      );
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('api/auth/register', user);
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
