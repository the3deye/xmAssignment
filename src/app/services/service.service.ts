import { HttpClient } from '@angular/common/http';
import { PicsumPhoto } from './../interfaces/picsumPhoto';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private http: HttpClient,
  ) { }

  getPhotos(): Observable<PicsumPhoto[]> {
    const url = 'https://picsum.photos/list';
    return this.http.get<PicsumPhoto[]>(url);
  }
}
