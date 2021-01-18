import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {config} from '../config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { userModel } from '../interfaces/userModel';
import { userFormModel} from 'src/app/interfaces/userFormModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient , private router: Router, private snackBar: MatSnackBar) { }

  showMessage(msg: string):void
  {
    this.snackBar.open(msg,'X',{
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })
  }

  GetUsers(){
   return  this.http.get<userModel[]>(config.baseUrl+'user/');
  }

  GetUser(userId: string){
    return  this.http.get<userModel>(config.baseUrl+'user/'+userId);
   }

  DeleteUser(id: string){
    return this.http.delete(config.baseUrl+'account/'+id);
  }

  CreateUser(user: {username: string, name: string, password: string}){
      this.http.post<any>(config.baseUrl+'account/', user).subscribe(
        result => {
          this.router.navigate(['users']);
        },
        error => {
          console.log("error");
          console.log(error);
        }
      );
  }

  EditUser(user: {username: string, name: string, password: string, id: string}){
    this.http.put<any>(config.baseUrl+'account/', user).subscribe(
      result => {
        this.router.navigate(['users']);
      },
      error => {
        console.log("error");
        console.log(error);
      }
    );
}

}
