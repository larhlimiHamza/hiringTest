import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  form:FormGroup;

  constructor(
    public firebaseService:FirebaseService,
    private router:Router,
    private formBuilder:FormBuilder,
    private snackBar:MatSnackBar,

  ) {
    this.form = this.formBuilder.group({
      email: new FormControl('',[Validators.required, Validators.email]),
    })
  }

  ngOnInit(): void {
  }
  openSnackBar(message:string, action:string){
    this.snackBar.open(message,action,{
      duration:2000,
      verticalPosition:'top',
      panelClass:['mat-toolbar','mat-warn']

    });
  }

  submitForm(){
    if(this.form.valid){
      this.firebaseService.forgotPassword(this.form.value.email);
      this.router.navigate(['../home']);
    }
    else{
      this.openSnackBar("Enter an email !","Ok");
    }
  }

}
