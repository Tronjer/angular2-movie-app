import {Component, OnInit} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {DataService} from "../shared/services/data.service";
import {RouteParams} from "angular2/router";
@Component({
    selector: 'movie-details',
    templateUrl: 'app/movies/movie-details.template.html',
    styleUrls: ['app/movies//movies.styles.css'],
    directives: [MATERIAL_DIRECTIVES]
})

export class MovieDetailsComponent implements OnInit {
    movie: any;
    private _index = Number(this._routeParams.get('index'));

    constructor(private _dataService: DataService, private _routeParams: RouteParams) {}

    ngOnInit():any {
        return this._dataService.getSingleData(this._index).subscribe(
            data => {
                this.movie = data,
                    console.log(' this.movie',  this.movie)
            },
            error => console.log(error)
        );
    }
}