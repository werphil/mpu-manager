import { catchError } from 'rxjs/operators';
import { apiPath } from './config/apiconfig';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';




@Injectable()
export class SharepointIntercept implements HttpInterceptor {
    constructor(private http: HttpClient) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.method === 'POST') {
            return this.doRequest(req, next);

            /* if (localStorage.getItem('digest') !== null) {
                return this.doRequest(req, next);
            } else {
                
                this.http.post(apiPath + '_api/contextinfo', '', {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json;odata=verbose',
                        'accept': 'application/json;odata=verbose',
                    })
                }).subscribe(data => {
                    if (data['d'] && data['d'].GetContextWebInformation && data['d'].GetContextWebInformation.FormDigestValue) {
                        console.log(data['d'].GetContextWebInformation.FormDigestValue);
                        localStorage.setItem('digest', data['d'].GetContextWebInformation.FormDigestValue);
                        return this.doRequest(req, next);
                    } else {
                        return this.errorHandle(req, next);
                    }
                }, error => {
                    return this.errorHandle(req, next);
                });
            } */

        } else {
            return next.handle(req.clone());
        }
    }

    private doRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const cloned = req.clone({
            headers: req.headers.set('X-RequestDigest', localStorage.getItem('digest'))
        });

        return next.handle(cloned);
    }

    private errorHandle(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req);
    }

    private errHandle<T>(op = '', result?: T) {
        return (error: any): Observable<T> => {
            console.log(error);
            return of(result as T);
        };
    }
}
