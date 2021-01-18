import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {config} from '../config';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient , private router: Router, private snackBar: MatSnackBar) { }

  showMessage(msg: string):void
  {
    this.snackBar.open(msg,'X',{
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })
  }

  Login(User: {username: string, password: string}){
    this.http.post<any>(config.baseUrl+'account/login/', User).subscribe(
      result => {
        localStorage.setItem('token', result.token);
        this.router.navigate(['home']);
      },
      error => {
        this.showMessage(error.error.message);
        console.log(error);
      }
    );
  }


}
