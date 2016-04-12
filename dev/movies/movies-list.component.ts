import {Component, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig, Router} from "angular2/router";
import {AuthRouterOutlet} from "../shared/directives/auth-router-outlet.directive";
import {MovieDetailsComponent} from "./movie-details.component";
import {DataService} from "../shared/services/data.service";
import {MATERIAL_DIRECTIVES, SidenavService} from "ng2-material/all";
import {MovieEditComponent} from "./movie-edit.component";
import {MovieErrorPageComponent} from "./movie-error-page.component";

@Component({
    selector: 'movies-list',
    templateUrl: 'app/movies/movies-list.template.html',
    styleUrls: ['app/movies/movies.styles.css'],
    directives: [ROUTER_DIRECTIVES, AuthRouterOutlet, MATERIAL_DIRECTIVES],
    providers: [SidenavService]
})

@RouteConfig([
    { path: '/', name: 'MovieDetails', component: MovieDetailsComponent, useAsDefault: true },
    { path: '/error', name: 'ErrorPage', component: MovieErrorPageComponent },
    { path: '/:slug', name: 'MovieDetails', component: MovieDetailsComponent },
    { path: '/:slug/:edit', name: 'MovieEdit', component: MovieEditComponent }
])



export class MoviesListComponent implements OnInit {
    movies: any = [];
    selectedMovie: any;

    constructor(private _dataService: DataService, private _router: Router, public sidenav: SidenavService) {}

    ngOnInit():any {
        this.selectedMovie = 0;

        return this._dataService.getAllData().subscribe(
            data => {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this.movies.push(data[key]);
                    }
                }
                return this.movies;
            },
            error => {
                console.log('error: ', error);
            });
    }

    open() {
        this.sidenav.show('left');
    }

    onSelect(index: string, slug: string) {
        console.log('index', index);
        console.log('slug', slug);
        this.selectedMovie = index;
        this.sidenav.hide('left');
        this._router.navigate(['MovieDetails', {slug: slug}]);
    }
}