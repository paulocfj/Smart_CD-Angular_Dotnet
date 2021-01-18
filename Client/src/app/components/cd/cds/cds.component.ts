import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidatorsHelper } from 'src/app/helpers/validator';
import { cdModel } from 'src/app/interfaces/cdModel';
import { CdService } from 'src/app/service/cd.service';

@Component({
  selector: 'app-cds',
  templateUrl: './cds.component.html',
  styleUrls: ['./cds.component.css']
})
export class CdsComponent implements OnInit {

  cds: cdModel[];
  token: string = localStorage.getItem('token');
  UserId: string;
  constructor(private service: CdService, private router: Router, private helper: ValidatorsHelper) { }

  ngOnInit(): void {
    this.UserId = this.helper.getUserIdToken(this.token);
    this.service.GetCds(this.UserId).subscribe(res => this.cds= res);
  }
  
  editCd(CdId:string){
    localStorage.setItem('CdId', CdId);
    this.router.navigate(['cdEdit']);
  }

  deleteCd(id: string){
    this.service.DeleteCd(id).subscribe(res =>{
      this.ngOnInit();
    });
    
  }

  createCd(){
    this.router.navigate(['cdCreate']);
  }

}
