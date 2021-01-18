import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {config} from '../config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { cdModel } from '../interfaces/cdModel';
import { cdFormModel } from '../interfaces/cdFormModel';
import { cdFormEditModel } from '../interfaces/cdFormEditModel';

@Injectable({
  providedIn: 'root'
})
export class CdService {

  constructor(private http:HttpClient , private router: Router, private snackBar: MatSnackBar) { }

  showMessage(msg: string):void
  {
    this.snackBar.open(msg,'X',{
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })
  }

  GetCds(UserId: string){
   return  this.http.get<cdModel[]>(config.baseUrl+'cd/'+UserId);
  }

  GetCd(UserId: string, CdId: string){
    return this.http.get<cdFormEditModel>(config.baseUrl+'cd/'+UserId+'/'+CdId);
  }

  CreateCd(cd: cdFormModel){
    return this.http.post<any>(config.baseUrl+'cd/', cd);
  }

  EditCd(cd: cdFormModel){
    return this.http.put<any>(config.baseUrl+'cd/', cd);
  }

  DeleteCd(id: string){
    return this.http.delete(config.baseUrl+'cd/'+id);
  }


}
