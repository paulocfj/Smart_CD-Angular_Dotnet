import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsHelper } from 'src/app/helpers/validator';
import { CdService } from 'src/app/service/cd.service';
import {cdFormModel} from '../../../interfaces/cdFormModel';

@Component({
  selector: 'app-cd-create',
  templateUrl: './cd-create.component.html',
  styleUrls: ['./cd-create.component.css']
})
export class CdCreateComponent implements OnInit {

  formulario: FormGroup;
  cd: cdFormModel;
  token: string = localStorage.getItem('token');
  UserId: string;

  constructor(private formBuilder: FormBuilder, private router:Router, private helper: ValidatorsHelper, private service: CdService) { }

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({

      name: [null, Validators.required],
      artist: [null, Validators.required],
      year: [null, Validators.required],
      genre: [null, Validators.required],
      duration: [null, Validators.required]
    });

    this.UserId = this.helper.getUserIdToken(this.token);

  }

  onSubmit(){
      this.cd = this.formulario.value;
      this.cd.UserId = this.UserId;
      
      this.service.CreateCd(this.cd).subscribe(res =>{
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
