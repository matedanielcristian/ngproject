import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './users/users.component';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { AngularMaterialModule } from './material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UsersTableComponent } from './users/users-table/users-table.component';
import { DialogComponent } from './dialog/dialog.component';
import { CommonModelService } from './common-model.service';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    NavbarComponent,
    AddUserComponent,
    UsersTableComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '', component: UsersComponent },
      {path: 'users', component: UsersComponent,  children: [
        { path: '', component: UsersTableComponent },
        { path: 'add', component: AddUserComponent },
        { path: 'edit', component: AddUserComponent }
      ]}
    ]),
    NgbModule,
    AngularMaterialModule
  ],
  providers: [CommonModelService],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
