import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ServerResponseDto } from 'src/app/shared-interfaces/server-response-dto';
import { environment } from 'src/environments/environment';
import { AdminSignInDto } from '../sign-in/admin-sign-in-dto';
import { catchError, tap } from 'rxjs/operators';
import jwt_decode from "jwt-decode";

export interface SessionDetails {
  exp: number,
  iat: number,
  userName: string,
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public readonly sessionStorageString = 'pk-xbc.9iF2';
  constructor(
    private http: HttpClient
  ) { }

  signIn(admin: AdminSignInDto): Observable<ServerResponseDto> {
    const subUrl = 'admin/sign-in';
    return this.http.post<ServerResponseDto>(`${environment.apiBaseUrl}/${subUrl}`, admin)
      .pipe(
        tap((response: ServerResponseDto) => {
          this.storeSessionDetails(response)
        }),
        (catchError(this.handleError))
      )
  }

  getActiveAdmin(): string {
    const user = localStorage.getItem(this.sessionStorageString);
    if (user) {
      let activeAdmin: SessionDetails = jwt_decode(user);
      return activeAdmin.userName;
    }

    else {
      return 'Invalid user';
    }
  }

  private storeSessionDetails(response: ServerResponseDto): void {
    localStorage.setItem(this.sessionStorageString, response.data)
  }

  private handleError(error: any) {
    console.log(error);
    return throwError('Error Signing in')
  }
}
