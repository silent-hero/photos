import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit, OnDestroy
{
  form:FormGroup;

  email:FormControl;
  password:FormControl;

  private url:string = this.userService.baseApiUrl + "/user/login";
  public errorMessage:string;

  constructor(private router:Router, private userService:UserService, private http:Http) { }

  ngOnInit()
  {
    this.CreateFormControls();
    this.CreateForm();

  }

  ngOnDestroy()
  {

  }

  public CreateFormControls()
  {
    this.email = new FormControl('', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  }

  public CreateForm()
  {
    this.form = new FormGroup
    ({
      email: this.email,
      password: this.password
    });
  }

  public LoginUser()
  {
    this.errorMessage = "";

    if(this.form.valid)
    {
      this.http.post(
      this.url,
      {email: this.email.value, password: this.password.value})
      .subscribe(
        data =>
        {
          // this.userService.username = data.
          const response = data.json();
          if(response["message"] === "OK")
          {
            this.userService.email = this.email.value;
            this.userService.id = response["id"];
            this.userService.token = response["token"];
            this.userService.name = response["name"];
            this.userService.role = response["role"];

            this.userService.SetUserLoggedIn();
            this.router.navigate([""]);
          }
          else
          {
            this.errorMessage = response["message"];
          }
        },
        error =>
        {
          this.errorMessage = error.message;
        }
      );
    }

  }
}
