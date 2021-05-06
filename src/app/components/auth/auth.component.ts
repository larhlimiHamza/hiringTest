import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';
import {FirebaseService} from "../../services/firebase.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  form:FormGroup;
  hide=true;
  constructor(
    private formBuilder:FormBuilder,
    private router:Router,
    private snackBar:MatSnackBar,
    public firebaseService:FirebaseService
  ) {
    this.form = this.formBuilder.group({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required])
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
      this.firebaseService.signIn(this.form.value.email, this.form.value.password).then(()=>{
        this.router.navigate(['../home']);
      });
    }
    else{
      this.openSnackBar("Unable to log in !","Ok");
    }
  }
}
