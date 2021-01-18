import { Component, OnInit } from '@angular/core';
import { ValidatorsHelper } from 'src/app/helpers/validator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name: string;
  token: string = localStorage.getItem('token');
  constructor(private helper:ValidatorsHelper) { }
  

  ngOnInit(): void {
    this.name = this.helper.getNameToken(this.token);
  }



  /*
  getImportById(id: string): Observable<Import> {
    return this.http.get<Import>(this._rootUrl + id);
  }

  onLoadImport(importId) {
    this.importService.getImportById(importId).subscribe(res => {
      this.import = res;
      this.dataSource = new MatTableDataSource<Product>(res.products);
      this.setPaginator();

    });
    */

}
