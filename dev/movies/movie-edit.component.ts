import {Component, OnInit} from "angular2/core";
import {DataService} from "../shared/services/data.service";
import {RouteParams, Router, ROUTER_DIRECTIVES} from "angular2/router";

@Component({
    selector: 'movie-edit',
    templateUrl: 'app/movies/movie-edit.template.html',
    styleUrls: ['app/movies/movies.styles.css'],
    directives: [ROUTER_DIRECTIVES]
})

export class MovieEditComponent implements OnInit {
    movie: any;
    private _index = Number(this._routeParams.get('index'));

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
        this._dataService.updateData(this._index, this.movie).subscribe(
            data => {
                console.log(data); this._router.navigate(['MovieDetails', { index: this._index }]);
            },
            error => console.log(error)
        )
    }

    onCancel() {
        this._router.navigate(['MovieDetails', { index: this._index }]);
    }
}
