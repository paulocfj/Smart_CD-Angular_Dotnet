import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsHelper } from 'src/app/helpers/validator';
import { cdFormEditModel } from 'src/app/interfaces/cdFormEditModel';
import { cdFormModel } from 'src/app/interfaces/cdFormModel';
import { CdService } from 'src/app/service/cd.service';

@Component({
  selector: 'app-cd-edit',
  templateUrl: './cd-edit.component.html',
  styleUrls: ['./cd-edit.component.css']
})
export class CdEditComponent implements OnInit {

  CdId: string;
  UserId: string;
  Cd: cdFormEditModel;
  cdEdit: cdFormModel;
  token: string;
  formulario: FormGroup;
  constructor(private service: CdService, private router: Router, private helper: ValidatorsHelper, private formBilder: FormBuilder) { }

  ngOnInit(): void {

    this.formulario = this.formBilder.group({

      name: [null, Validators.required],
      artist: [null, Validators.required],
      year: [null, Validators.required],
      genre: [null, Validators.required],
      duration: [null, Validators.required],
    });

    this.CdId = localStorage.getItem('CdId');
    this.token = localStorage.getItem('token');
    this.UserId = this.helper.getUserIdToken(this.token);
    this.service.GetCd(this.UserId, this.CdId).subscribe(
      res => {this.Cd = res[0]; 
      this.fillForm();
    });
    localStorage.removeItem('CdId');
  
  }



  fillForm(){
    this.formulario.patchValue({
      name: this.Cd.cd.name,
      artist: this.Cd.cd.artist,
      genre: this.Cd.cd.genre,
      year: this.Cd.cd.year,
      duration: this.Cd.cd.year
    });
  }



onSubmit(){
  this.cdEdit = this.formulario.value;
  this.cdEdit.CdId = this.CdId;
  
  this.service.EditCd(this.cdEdit).subscribe(res =>{
    this.router.navigate(['cds']);
  });
  
}
    


cancel(){
  this.formulario.reset();
  this.router.navigate(['cds']);
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
