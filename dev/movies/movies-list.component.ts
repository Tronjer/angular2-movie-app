import {Component, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig, Router} from "angular2/router";
import {AuthRouterOutlet} from "../shared/directives/auth-router-outlet.directive";
import {MovieDetailsComponent} from "./movie-details.component";
import {DataService} from "../shared/services/data.service";
import {MATERIAL_DIRECTIVES, SidenavService} from "ng2-material/all";

@Component({
    selector: 'movies-list',
    templateUrl: 'app/movies/movies-list.template.html',
    styleUrls: ['app/movies/movies.styles.css'],
    directives: [ROUTER_DIRECTIVES, AuthRouterOutlet, MATERIAL_DIRECTIVES],
    providers: [SidenavService]
})

@RouteConfig([
    { path: '/', name: 'MovieDetails', component: MovieDetailsComponent, useAsDefault: true },
])



export class MoviesListComponent implements OnInit {
    movies: any;
    selectedMovie: any;

    constructor(private _dataService: DataService, private _router: Router, public sidenav: SidenavService) {}


    ngOnInit():any {
        this.selectedMovie = 0;

       return this._dataService.getAllData().subscribe(
            data => {
                this.movies = data
            },
            error => {
                console.log('error: ', error);
            });
    }

    open() {
        this.sidenav.show('left');
    }

    onSelect(index: string) {
        this.selectedMovie = index;
        this.sidenav.hide('left');
        this._router.navigate(['MovieDetails', {index: index}]);
    }
}