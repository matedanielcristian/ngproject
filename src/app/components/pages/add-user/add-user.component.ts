import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from '../../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs';
import { createLogicalAnd } from 'typescript';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnDestroy {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  error: String = "";
  userInfo: String = "";
  myForm!: FormGroup;
  type: String = "add";
  fetchedUser!: User;
  private userServiceIsLoading: Subscription = new Subscription();
  private errorSub: Subscription = new Subscription();
  private userSub: Subscription = new Subscription();

  constructor(public fb: FormBuilder, public userService: UserService, private route: ActivatedRoute, private router : Router) {}

  ngOnInit(): void {
    if(this.route.snapshot.queryParams['id']) {
      this.type = 'edit';
      this.userService.getUser(this.route.snapshot.queryParams['id']).subscribe(resData => {
        console.log('user fetched:', resData);

        this.userService.setUserFetched(resData);
      });
    }
    this.errorSub = this.userService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    })
    this.userSub = this.userService.userInfo.subscribe(data => {
      // this.userWasAdded = data;
      this.userInfo = data;
      if(data == 'fetched') {
        this.fetchedUser = this.userService.fetchedUser;
        this.reactiveForm(this.userService.fetchedUser);
      }
      if(data == 'created') {
        setTimeout(() => {
          this.myForm.reset();
          this.myForm.markAsUntouched();
          this.myForm.markAsPristine();
        }, 3000)
      }
      console.log(data);
    })

      this.reactiveForm()

  }

    // /* Reactive form */
    reactiveForm(user?: User) {
      if(user) {
        this.myForm.updateValueAndValidity()
        this.myForm = this.fb.group({
          fullName: [user.fullName, [Validators.required]],
          email: [user.email, [Validators.required, Validators.email]],
          // password: ['', Validators.required],
          userRole: [user.userRole, [Validators.required]],
          gender: ['1'],
        })

      } else {
        this.myForm = this.fb.group({
          fullName: ['', [Validators.required]],
          email: ['', [Validators.required, Validators.email]],
          gender: ['1'],
          password:  ['', [Validators.required]],
          userRole: ['USER', [Validators.required]]
        })
      }

    }

    /* Handle form errors */
    public errorHandling = (control: string, error: string) => {
      return this.myForm.controls[control].hasError(error);
    }

    submitForm() {
      console.log(this.myForm)
      if(this.myForm.valid) {
        if(this.type == 'add') {
          this.userService.createUser(this.myForm.value).subscribe(resData => {
            this.userService.setUserCreated();
          });
        } else {
          console.log("myform", this.myForm.value);
          this.userService.updateUser(this.fetchedUser.id, this.myForm.value).subscribe(resData => {
            this.userService.setUserUpdated();
            console.log('User was updated!', resData)
            setTimeout(()=> {
              this.router.navigate(['/', 'users']);
            }, 2000);
          });
        }
      }

    }


    ngOnDestroy() : void {
      this.errorSub.unsubscribe();
      this.userServiceIsLoading.unsubscribe();
      this.userSub.unsubscribe();
    }

}
