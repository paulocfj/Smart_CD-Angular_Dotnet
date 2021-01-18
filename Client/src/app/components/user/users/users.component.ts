import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  ValidatorsHelper } from 'src/app/helpers/validator';
import { userModel } from 'src/app/interfaces/userModel';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: userModel[];
  token: string = localStorage.getItem('token');
  UserId: string;
  constructor(private service: UserService, private router: Router , private helper: ValidatorsHelper ) { }

  ngOnInit(): void {
    this.UserId = this.helper.getUserIdToken(this.token);
    this.service.GetUsers().subscribe(res => this.users= res);
  }

  editUser(id: string){
    localStorage.setItem('userId', id);
    this.router.navigate(['userEdit']);
  }

  deleteUser(id: string){
    this.service.DeleteUser(id).subscribe(res =>{
      this.ngOnInit();
    });
    
  }

  createUser(){
    this.router.navigate(['userCreate']);
  }


}
