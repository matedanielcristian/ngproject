import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserDataSource } from 'src/app/user.datasource';
import { UserService } from 'src/app/user.service';
import { createLogicalAnd } from 'typescript';
import { User, UserRole } from '../user.model';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CommonModelService } from 'src/app/common-model.service';


export interface DeleteUserDialog {
  id: string;
  name: string;
  type: 'confirmation'
}

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit, OnDestroy, AfterViewInit {
  userModalData: any = {};
  usersFromService: User[] = [];
  usersDataSource !: UserDataSource;
  dataSource = new MatTableDataSource<User>(this.usersFromService);
  displayedColumns: string[] = ['id', 'fullName', 'email', 'gender', 'userRole', 'actions'];
  error: String = "";
  userInfo: String = "";
  isLoading = false;
  private userServiceIsLoading: Subscription = new Subscription();
  private errorSub: Subscription = new Subscription();
  private userSub: Subscription = new Subscription();
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private http: HttpClient, private userService: UserService, public dialog: MatDialog, private commModel: CommonModelService) { }

  async ngOnInit() {
    this.userService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    })
    this.usersDataSource = new UserDataSource(this.userService);
    this.usersDataSource.loadUsers();
    this.userSub = this.userService.userInfo.subscribe(data => {
      this.userInfo = data;
      console.log(this.userInfo);
      if(this.userInfo == 'deleted') {
        this.loadUsers();
      }
    })
  }

  ngAfterViewInit() {

    this.usersDataSource.counter$
      .pipe(
        tap((count) => {
          this.paginator.length = count;
        })
      )
      .subscribe();

    this.paginator.page
      .pipe(
        tap(() => this.loadUsers())
      )
      .subscribe();
  }

  loadUsers() {
    this.usersDataSource.loadUsers(this.paginator.pageIndex, this.paginator.pageSize);
  }

  openDialog(id : number): void {
    this.commModel.data = {
      id: id
    };
    this.commModel.openDialog().subscribe(data =>      {
      console.log('response', data);
      this.userService.deleteUser(data.id);
      this.loadUsers();
    });
  }
  onHandleError() {
    this.error = "";
  }
  ngOnDestroy() : void {
    this.errorSub.unsubscribe();
    this.userServiceIsLoading.unsubscribe();
  }

}
