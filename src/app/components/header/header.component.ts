import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogged=false;
  constructor(
    public  firebaseService:FirebaseService
  ) { }

  ngOnInit(): void {
    this.isLogged = this.firebaseService.isLoggedIn();
  }

}
