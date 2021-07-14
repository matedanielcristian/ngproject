import { DataSource } from '@angular/cdk/table';
import { UserListResponse } from "./UserListResponse";
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from "rxjs";
import { UserService } from './user.service';
import { catchError, finalize } from "rxjs/operators";
import { User } from './users/user.model';

export class UserDataSource implements DataSource<User>{

    private userSubject = new BehaviorSubject<User[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);
    public counter$ = this.countSubject.asObservable();

    constructor(private userService: UserService) { }

    connect(collectionViewer: CollectionViewer): Observable<User[]> {
        return this.userSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.userSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }

    loadUsers(pageNumber = 0, pageSize = 10) {
        console.log('pageNumber', pageNumber);
        console.log('pageSize', pageSize);
        this.loadingSubject.next(true);
        this.userService.listUsers({ page: pageNumber, size: pageSize })
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((result: any) => {
              this.userSubject.next(result.content);
              this.countSubject.next(result.totalElements);
          }
          );
  }

}
