import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { userFormModel } from 'src/app/interfaces/userFormModel';
import { userModel } from 'src/app/interfaces/userModel';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  formulario: FormGroup;
  UserId: string = localStorage.getItem('userId');
  user: userModel;
  userEdit: userFormModel;
  constructor(private service: UserService, private router: Router , private snackBar: MatSnackBar, private formBuilder: FormBuilder) { }
  
  
  ngOnInit(): void {
    
    this.formulario = this.formBuilder.group({

      name: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    });

    localStorage.removeItem('userId');

    this.service.GetUser(this.UserId).subscribe(res => {
      this.user = res;
      this.fillForm();
    
    });

  }

  showMessage(msg: string):void
  {
    this.snackBar.open(msg,'X',{
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })
  }

  fillForm(){
    this.formulario.patchValue({
      name: this.user.name,
      username: this.user.username,
      
    });
  }

  onSubmit(){
    this.userEdit = this.formulario.value;
    this.userEdit.id = this.UserId;

    if(this.userEdit.confirmPassword ==  this.userEdit.password){
     
     return this.service.EditUser(this.userEdit);
    }

    this.showMessage("Atenção, senhas não coincidem, por favor verificar!");
    this.formulario.get('password').reset();
    this.formulario.get('confirmPassword').reset();

  }

  cancel(){
    this.formulario.reset();
    this.router.navigate(['users']);
  }

  verificaValidTouched(campo) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  aplicaCssErro(campo) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }


}
