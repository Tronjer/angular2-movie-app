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
    private _slug = this._routeParams.get('slug');
    private _edit: string = 'edit';

    constructor(private _dataService: DataService, private _routeParams: RouteParams, private _router: Router) {}

    ngOnInit():any {
        return this._dataService.getSingleData(this._slug).subscribe(
            data => {
                    if (data === null ) {
                        this._router.navigate(['ErrorPage'])
                    } else {
                        this.movie = data;
                    }
            },
            error => console.log(error)
        );
    }

    onSelectEdit() {
        this._router.navigate(['MovieEdit', { slug: this._slug, edit: this._edit } ]);
    }

    onDelete() {

        return this._dataService.deleteDataSet(this._slug).subscribe(
           // () =>  this._router.navigate(['MovieDetails', { slug: this._slug }])
        );
    }
}
