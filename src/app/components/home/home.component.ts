import {Component, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {UpdateDialogComponent} from "../update-dialog/update-dialog.component";
import {AngularFirestore} from "@angular/fire/firestore";

interface documentStatus {
  docID:string,
  status:number,
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements AfterViewInit, OnInit{
   DOCUMENT_DATA:documentStatus[] = [];
   i=0;
  displayedColumns: string[] = ['docID', 'status'];
  dataSource = new MatTableDataSource<documentStatus>(this.DOCUMENT_DATA);

  constructor(
    public dialog:MatDialog,
    private angularFirestore:AngularFirestore,
  ) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    //this.getDocuments();
  }
  ngOnInit() {
    this.getDocuments();
    this.dataSource.data = this.DOCUMENT_DATA;
  }


  getDocuments(){
    this.DOCUMENT_DATA = [];
    this.angularFirestore.collection('doctest').get().subscribe((querySnapshot)=>{
      querySnapshot.forEach((doc)=>{
        this.DOCUMENT_DATA.push({
          docID:doc.id,
          status:JSON.parse(JSON.stringify(doc.data())).status,
        })
        this.dataSource.data = this.DOCUMENT_DATA;
      })
    })
  }
  openDialog(doc){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height = "40%";
    dialogConfig.width =" 45%";
    dialogConfig.data = {
      doc:doc
    }
    this.dialog.open(UpdateDialogComponent,dialogConfig)

  }

}
