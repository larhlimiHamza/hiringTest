import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {
  form:FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private formBuilder:FormBuilder,
    private router:Router,
    private snackBar:MatSnackBar,
    public angularFirestore:AngularFirestore,
  ) {
    this.form = this.formBuilder.group({
      status: new FormControl('',[Validators.required]),
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
      this.angularFirestore.doc(`doctest/${this.data.doc.docID}`).set({
        status:this.form.value.status
      },{
        merge:true
      }).then(()=>{
        this.openSnackBar("Updated successfully, refresh to update values !","");
        location.reload();//TODO Fix it (SPA)
        this.router.navigate(['../home']);
      })
        .catch((err)=>{
          this.openSnackBar(err,"");
        })
    }
    else{
      this.openSnackBar("Wrong value !","");
    }
  }

}
