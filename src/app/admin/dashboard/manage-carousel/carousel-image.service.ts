import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ServerResponseDto } from 'src/app/shared-interfaces/server-response-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarouselImageService {

  constructor(
    private http: HttpClient
  ) { }

  getCarouselImages(): Observable<ServerResponseDto> {
    return this.http.get<ServerResponseDto>(environment.apiBaseUrl + '/carousel-images')
      .pipe(
        (catchError(this.handleError))
      );
  }

  handleError(error: any) {
    console.error(error)
    return throwError('Can not complete request at this time')
  }
}
