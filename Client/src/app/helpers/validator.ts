import jwtDecode from "jwt-decode";
import { Injectable } from '@angular/core'; // at top
import { TokenModel } from "../interfaces/tokenModel";

@Injectable({
  providedIn: 'root' // just before your class
})

export class ValidatorsHelper{


    isValid(token: string): boolean{
        var data: TokenModel = jwtDecode(token);
        if(Date.now() >= data.exp * 1000){
            localStorage.removeItem('token');
            return false;
        }
        return true;
    }

    getNameToken(token: string): string{
        var data: TokenModel = jwtDecode(token);
        return data.unique_name;
    }

    getUserIdToken(token: string): string{
        var data: TokenModel = jwtDecode(token);
        return data.UserId;
    }
}