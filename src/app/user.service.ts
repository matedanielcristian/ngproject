import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { createLogicalAnd } from 'typescript';
import { User, UserRole } from './users/user.model';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURL= "http://localhost:8080/api/v1" + "/users";
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
    }, 3000)
  }

  setUserDeleted() {
    this.userInfo.next('deleted');
    setTimeout(() => {
      this.userInfo.next('');
    }, 3000)
  }

  setUserFetched() {
    this.userInfo.next('fetched');
    setTimeout(() => {
      this.userInfo.next('');
    }, 3000)
  }
  setUserUpdated() {
    this.userInfo.next('updated');
    setTimeout(() => {
      this.userInfo.next('');
    }, 3000)
  }



  setError(e : String) {
    this.error.next(e);
    setTimeout(() => {
      this.error.next('');
    }, 3000)
  }



  listUsers(request : any) {
    const endpoint = this.baseURL;
    const params = request;
    return this.http.get(endpoint, { params });
  }

  deleteUser(id: number) {
    const endpoint = this.baseURL + `/${id}`;
    return this.http.delete(endpoint).subscribe(res => {
      this.setUserDeleted();
    }, error => {
      this.setError(error.message);
    })
  }

  getUser(id: number) {
    const endpoint = this.baseURL + `/${id}`;
    return this.http.get(endpoint).subscribe((res: any) => {
      this.fetchedUser = res;
      this.setUserFetched();
    }, error => {
      this.setError(error.message);
    })
  }

  createUser(user: User) {
    return this.http.post(this.baseURL, user).subscribe(responseData => {
      this.setUserCreated();
      console.log(responseData);
    }, error => {
      this.setError(error.error.message);
    })
  }

  updateUser(id: number, user: any) {
    return this.http.put(this.baseURL + `/${id}`, user).subscribe(responseData => {
      this.setUserUpdated();
      console.log(responseData);
    }, error => {
      this.setError(error.error.message);
    })
  }

  constructor(private http: HttpClient) {}
}
