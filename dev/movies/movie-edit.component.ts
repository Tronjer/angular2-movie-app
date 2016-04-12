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
    private _slug = this._routeParams.get('slug');

    constructor(private _dataService: DataService, private _routeParams: RouteParams, private _router: Router) {}


    ngOnInit():any {
        return this._dataService.getSingleData(this._slug).subscribe(
            data => {
                this.movie = data,
                    console.log('edit', this.movie)
            },
            error => console.log(error)
        );
    }

    onSave() {
        this._dataService.updateData(this._slug, this.movie).subscribe(
            data => {
               this._router.navigate(['MovieDetails', { slug: this._slug }]);
            },
            error => console.log(error)
        )
    }

    onCancel() {
        this._router.navigate(['MovieDetails', { slug: this._slug }]);
    }
}
