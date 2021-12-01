import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ServerResponseDto } from '../shared-interfaces/server-response-dto';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private http: HttpClient
  ) { }

  uploadFormData(files: any[], subUrl: string, payLoad: any): Observable<any> {
    const url = `${environment.apiBaseUrl}/${subUrl}`;
    payLoad.files = files;
    let formData = new FormData();

    // append every key/value in payload to formData
    for (let [key, value] of Object.entries(payLoad)) {
       if (typeof value == 'string') {
         formData.set(key, value)
       }
    }
    // attach files to form Data
    payLoad.files.forEach((file: any) => {
      formData.append(`files`, file, file.name);
    });

    // log form data
    return this.http.post<ServerResponseDto>(url, formData)
      .pipe(
        (catchError(this.handleError))
      )
  }

  private handleError(error: any) {
    console.log(error)
    return throwError('could not upload files at this time. Check console for more details')
  }
}
