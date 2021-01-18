import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ValidatorsHelper } from 'src/app/helpers/validator';
import { userFormModel} from 'src/app/interfaces/userFormModel';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  constructor(private service: UserService, private router: Router , private helper: ValidatorsHelper, private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
  }

  showMessage(msg: string):void
  {
    this.snackBar.open(msg,'X',{
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })
  }

  createUser(f: NgForm){
    const user:userFormModel = f.value;
    if(user.password == user.confirmPassword){
      this.service.CreateUser(user);
    }
    else{
      this.showMessage("Atenção, as senhas não coincidem!");
    }
    
  }

  cancel(){
    this.router.navigate(['users']);
  }






}
