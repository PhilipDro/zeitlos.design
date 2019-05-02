import {Component, Injectable}    from '@angular/core';
import {Http, Response}           from '@angular/http';
import {Headers, RequestOptions}  from '@angular/http';
import {Observable}               from 'rxjs/Observable';
import {Mail}                    from '../models/mail';
import 'rxjs/Rx';


@Injectable({
  providedIn: 'root'
})
export class MailService {
  constructor( private _http: Http) {}

  private _mailUrl = 'app/mail.php';

  postEmail(newMail: Mail): Observable<string>{
    let body = `userId=${newMail.userId}`;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this._mailUrl, body, options)
      .map(res => <string> res.json())
      .catch(this.handleError)
  }

  private handleError(error: Response) {
    alert("still whack");
    console.error('Error in retrieving news: ' + error);
    return Observable.throw(error.json().error || 'Server error du hast verkackt');
  }
}
