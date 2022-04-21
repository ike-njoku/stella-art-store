import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ServerResponseDto } from 'src/app/shared-interfaces/server-response-dto';
import { environment } from 'src/environments/environment';
export interface CreateBioDTO {
  bio: string;
}
@Injectable({
  providedIn: 'root'
})
export class BioService {

  constructor(
    private http: HttpClient
  ) { }

  updateBio(bio: CreateBioDTO): Observable<ServerResponseDto> {
    const url = environment.apiBaseUrl+'/bio';
    return this.http.post<ServerResponseDto>(url, bio)
      .pipe(
        (catchError(this.handleError))
      )
  }

  getBio(): Observable<ServerResponseDto> {
    const url = environment.apiBaseUrl+'/bio';
    return this.http.get<ServerResponseDto>(url)
    .pipe(
      (catchError(this.handleError))
    )
  }

  private handleError(error: any) {
    console.error(error);
    return throwError('Could not update bio');
  }
}
