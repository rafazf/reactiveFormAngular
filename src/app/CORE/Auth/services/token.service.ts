import { Injectable } from '@angular/core';
const ACCESS_TOKEN = 'access-token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() { }

  public setToken(tk:string):void{
    localStorage.setItem(ACCESS_TOKEN, tk);
  }

  public getToken():string{
    return localStorage.getItem(ACCESS_TOKEN) || '';
  }

  public rmToken():void{
    localStorage.removeItem(ACCESS_TOKEN);
  }

}
