import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Destiny } from './destiny';

@Injectable({
  providedIn: 'root'
})
export class DestinyService {

  private destinyUrl = 'http://localhost:3000/api/destiny';  // URL to web api

  /** GET destinies from the server */
  getDestinies(): Observable<any> {
    return this.http.get(this.destinyUrl)
    .pipe(
      catchError(this.handleError<any>('getDestinies', []))
    );
  }

  /** GET single destiny from the server */
  getDestiny(id: number): Observable<any> {
    return this.http.get(this.destinyUrl + `/${id}`)
    .pipe(
      catchError(this.handleError<any>('getDestiny', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(
    private http: HttpClient
  ) { }
}
