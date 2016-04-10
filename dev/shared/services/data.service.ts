import {Injectable} from "angular2/core";
import {Http, Headers} from "angular2/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

@Injectable()

export class DataService {
    private _url = 'https://ang2-example-app.firebaseio.com/movies.json';
    private _token = localStorage.getItem('token') !== null ? '?auth=' + localStorage.getItem('token') : '' ; // authentication for firebase

    constructor (private _http: Http) {}

    getAllData(): Observable<any> {
        return this._http.get(this._url + this._token)
            .map(response => response.json());
    }

    getSingleData(index: any): Observable<any> {
        const uri = 'https://ang2-example-app.firebaseio.com/movies/' + index + '.json';

        return this._http.get(uri + this._token)
            .map(response => response.json());
    }

    addData(data: any): Observable<any> {
        const body = JSON.stringify(data);
        const headers = new Headers();

        headers.append('Content-Type', 'application/json');

        return this._http.post(this._url + this._token, body, { headers: headers })
            .map(response => response.json());

    }

    deleteAllData(): Observable<any> {
        return this._http.delete(this._url + this._token)
            .map(response => response.json());
    }
}