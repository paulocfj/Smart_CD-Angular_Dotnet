import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/nav/nav.component';
import {CdsComponent} from './components/cd/cds/cds.component';
import { CdEditComponent } from './components/cd/cd-edit/cd-edit.component';
import { CdCreateComponent } from './components/cd/cd-create/cd-create.component';
import { UsersComponent } from './components/user/users/users.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { CampoControlErroComponent } from './components/campo-control-erro/campo-control-erro.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    CdsComponent,
    CdEditComponent,
    CdCreateComponent,
    UsersComponent,
    UserEditComponent,
    UserCreateComponent,
    CampoControlErroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    AppRoutingModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
