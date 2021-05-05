import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FirebaseService} from "../../services/firebase.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form:FormGroup;
  hide=true;
  hide_c=true;
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private snackBar:MatSnackBar,
    private firebaseService:FirebaseService
  ) {
    this.form = this.formBuilder.group({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required,,Validators.minLength(6)]),
      confirmPassword: new FormControl('',[Validators.required,,Validators.minLength(6)])

    })

  }

  ngOnInit(): void {
    if(this.firebaseService.isLoggedIn()){
      this.router.navigate(['../home']);
    }
  }
  openSnackBar(message:string, action:string){
    this.snackBar.open(message,action,{
      duration:2000,
      verticalPosition:'top',
    });
  }
  submitForm(){
    if(this.form.valid){
      if(this.form.value.password !== this.form.value.confirmPassword){
        this.openSnackBar("Passwords miss match !","Ok");
        return;
      }
      else{
        //TODO Sign up
        this.firebaseService.signUp(this.form.value.email, this.form.value.password);
      }
    }
    else{
      this.openSnackBar("Unable to log in !","Ok");
    }
  }
}
