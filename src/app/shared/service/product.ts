import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://api.restful-api.dev/objects';

  constructor(private http: HttpClient) {}

  addProduct(product: Product): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }
}
