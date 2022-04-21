import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ServerResponseDto } from './shared-interfaces/server-response-dto';
export interface Email {
  subject: string;
  body: string;
  userName: string;
  email: string;
}
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(
    private http: HttpClient
  ) { }

  sendEmail(email: Email): Observable<ServerResponseDto> {
    return this.http.post<ServerResponseDto>(environment.apiBaseUrl+'/send-email', email)
      .pipe(
        (catchError(this.handleError))
      )
  }

  handleError(error: any) {
    console.error(error)
    return throwError('Could not send Email. Please check console for details');
  }
}
