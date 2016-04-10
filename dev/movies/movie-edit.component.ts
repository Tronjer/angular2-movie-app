import {Component, OnInit} from "angular2/core";
import {DataService} from "../shared/services/data.service";
import {RouteParams, Router} from "angular2/router";

@Component({
    selector: 'movie-edit',
    templateUrl: 'app/movies/movie-edit.template.html',
    styleUrls: ['app/movies/movies.styles.css'],
})

export class MovieEditComponent implements OnInit {
    movie: any;
    private _index = Number(this._routeParams.get('index'));
    private _edit = Number(this._routeParams.get('edit'));

    constructor(private _dataService: DataService, private _routeParams: RouteParams, private _router: Router) {}


    ngOnInit():any {
        return this._dataService.getSingleData(this._index).subscribe(
            data => {
                this.movie = data
            },
            error => console.log(error)
        );
    }

    onSave() {
        console.log(' new obj: ',  this.movie)
    }

    onCancel() {
        window.history.back();
    }
}
