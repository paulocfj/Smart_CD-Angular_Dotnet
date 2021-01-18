import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = {
    username: "",
    password: ""
  }

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }

  loginAcess(){
    this.auth.Login(this.login);
  }


}
