import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IUser } from '../interfaces/user';
import { IAuthRes } from '../interfaces/authRes';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  httpc = inject(HttpClient);

  loginUser(user:IUser):Observable<IAuthRes> {
    return this.httpc
      .post<IAuthRes>(`${environment.apiUrlBase}auth/login`,user).pipe(
        catchError(this.handleError)
      )
  }

  private handleError(error:HttpErrorResponse){
    if(error.status === 0){
      console.log('Se ha producido un error ',error.error);
    }else{
      console.log('Backend retornó el código de error ',error.status, error.error);
    }
    return throwError(()=>new Error('Algo falló. Por favor intente nuevamente.'))
  }
}
