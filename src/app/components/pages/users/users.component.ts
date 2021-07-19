import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})


export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'userRole', 'actions'];
  constructor(private http: HttpClient) {

   }

  ngOnInit(): void {
  }

}
