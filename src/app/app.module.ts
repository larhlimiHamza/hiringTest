import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from "./modules/app-material.module";   //Material Components
import { AppRoutingModule } from "./modules/app-routing.module";    //App Routing
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import {ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './components/register/register.component';

import {FirebaseService} from "./services/firebase.service";
import { HomeComponent } from './components/home/home.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    FooterComponent,
    HeaderComponent,
    RegisterComponent,
    HomeComponent,
    ForgotPasswordComponent,

  ],
  imports: [
    BrowserModule,
    AppMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBQK-omMP-wZsZYqFdKatkizhzgeuAjydM",
      authDomain: "mob-energy-hiring.firebaseapp.com",
      projectId: "mob-energy-hiring",
      storageBucket: "mob-energy-hiring.appspot.com",
      messagingSenderId: "968734734168",
      appId: "1:968734734168:web:bd210f8f1138504509d72d"
    }),
    AngularFireAuthModule,
    AngularFirestoreModule

  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent],
})
export class AppModule { }
