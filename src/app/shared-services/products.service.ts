import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FileUploadService } from '../admin/file-upload.service';
import { CreateProductDTO } from '../shared-interfaces/create-product-dto';
import { ServerResponseDto } from '../shared-interfaces/server-response-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient,
    private fileUploadService: FileUploadService
  ) { }

  createProduct(newProduct: CreateProductDTO, files: File[]): Observable<any> {
    const subUrl = 'products/create';
    return this.fileUploadService.uploadFormData(files, subUrl, newProduct)
  }

  getAllProducts(): Observable<ServerResponseDto> {
    const subUrl = 'products/list'
    return this.http.get<ServerResponseDto>(`${environment.apiBaseUrl}/${subUrl}`)
      .pipe(
        (catchError(this.handleErrors))
      )
  }

  getProductById(productId: string): Observable<ServerResponseDto>  {
    const subUrl = `products/${productId}`
    return this.http.get<ServerResponseDto>(`${environment.apiBaseUrl}/${subUrl}`)
    .pipe(
      (catchError(this.handleErrors))
    )
  }

  private handleErrors(error: any) {
    console.log(error)
    return throwError('Could not complete this action now. Check console for more info')
  }
}
