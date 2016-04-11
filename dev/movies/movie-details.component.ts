import {Component, OnInit} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {DataService} from "../shared/services/data.service";
import {RouteParams, Router} from "angular2/router";

@Component({
    selector: 'movie-details',
    templateUrl: 'app/movies/movie-details.template.html',
    styleUrls: ['app/movies//movies.styles.css'],
    directives: [MATERIAL_DIRECTIVES]
})

export class MovieDetailsComponent implements OnInit {
    movie: any;
    private _index = Number(this._routeParams.get('index'));
    private _edit: string = 'edit';

    constructor(private _dataService: DataService, private _routeParams: RouteParams, private _router: Router) {}

    ngOnInit():any {
        return this._dataService.getSingleData(this._index).subscribe(
            data => {
                    if (data === null ) {
                        console.log('oops');
                        this._router.navigate(['ErrorPage'])
                    } else {
                        this.movie = data;
                    }
                //this.movie = data
                   // console.log(' this.movie',  this.movie)
            },
            error => console.log(error)
        );
    }

    onSelectEdit() {
        this._router.navigate(['MovieEdit', { index: this._index, edit: this._edit }]);
    }

    onDelete() {

        return this._dataService.deleteDataSet(this._index).subscribe(
            () =>  this._router.navigate(['MovieDetails', { index: this._index + 1 }])


        );
    }
}
