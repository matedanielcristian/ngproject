import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { createLogicalAnd } from 'typescript';
import { User, UserRole } from '../../models/user.model';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURL = 'http://localhost:8080/api/v1' + '/users';
  userServiceLoading = new Subject<boolean>();
  error = new Subject<String>();
  userInfo = new Subject<String>();
  users: User[] = [];
  fetchedUser!: User;
  paginator!: MatPaginator;

  getUsers() {
    return this.users;
  }
  setUsers(users: User[]) {
    this.users = users;
  }

  setUserCreated() {
    this.userInfo.next('created');
    setTimeout(() => {
      this.userInfo.next('');
    }, 3000);
  }

  setUserDeleted() {
    this.userInfo.next('deleted');
    setTimeout(() => {
      this.userInfo.next('');
    }, 3000);
  }

  setUserFetched(user: User) {
    this.fetchedUser = user;
    this.userInfo.next('fetched');
    setTimeout(() => {
      this.userInfo.next('');
    }, 3000);
  }
  setUserUpdated() {
    this.userInfo.next('updated');
    setTimeout(() => {
      this.userInfo.next('');
    }, 5000);
  }

  setError(e: String) {
    this.error.next(e);
    setTimeout(() => {
      this.error.next('');
    }, 3000);
  }

  listUsers(request: any) {
    const endpoint = this.baseURL;
    const params = request;
    return this.http.get(endpoint, { params });
  }

  deleteUser(id: number) {
    const endpoint = this.baseURL + `/${id}`;
    return this.http.delete(endpoint).pipe(
      (resData) => {
        return resData;
      },
      catchError((error) => {
        this.setError(error.message);
        return throwError(error);
      })
    );
  }

  getUser(id: number) {
    const endpoint = this.baseURL + `/${id}`;
    return this.http.get<User>(endpoint).pipe(map(resData => {
      return resData;
    }),
      catchError((error) => {
        this.setError(error?.error?.message || error.message);
        return throwError(error);
      })
    );
  }

  createUser(user: User) {
    return this.http.post(this.baseURL, user).pipe(
      (resData) => {
        return resData;
      },
      catchError((error) => {
        this.setError(error?.error?.message || error.message);
        return throwError(error);
      })
    );
  }

  updateUser(id: number, user: any) {
    return this.http.put(this.baseURL + `/${id}`, user).pipe(
      (resData) => {
        return resData;
      },
      catchError((error) => {
        this.setError(error?.error?.message || error.message);
        return throwError(error);
      })
    );
  }

  constructor(private http: HttpClient) {}
}
