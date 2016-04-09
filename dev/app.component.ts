import {Component, OnInit} from 'angular2/core';
import {AuthRouterOutlet} from "./shared/directives/auth-router-outlet.directive";
import {ROUTER_DIRECTIVES, RouteConfig, Router} from "angular2/router";
import {DataService} from "./shared/services/data.service";
import {AuthService} from "./shared/services/auth.service";
import {NavigationComponent} from "./navigation/navigation.component";
import {RegistrationComponent} from "./user/registration.component";
import {LoginComponent} from "./user/login.component";
import {StartComponent} from "./start/start.component";
import {MoviesListComponent} from "./movies/movies-list.component";


@Component({
    selector: 'movie-app',
    template: `
            <navigation></navigation>
          <md-content flex class="content">
            <auth-router-outlet></auth-router-outlet>
          </md-content>
    `,
    styles: [
        `
        .content {
            padding: 5px 40px 0;
        }
        `
    ],
    directives: [ROUTER_DIRECTIVES, NavigationComponent, AuthRouterOutlet],
    providers: [DataService]
})

@RouteConfig([
    { path: '/', name: 'Start', component: StartComponent },
    { path: '/signup', name: 'Registration', component: RegistrationComponent },
    { path: '/signin', name: 'Login', component: LoginComponent },
    { path: '/movies/...', name: 'MoviesList', component: MoviesListComponent },
])

export class AppComponent implements OnInit {
    constructor(private _router: Router, private _authService: AuthService) {};

    ngOnInit():any {
        return this._authService.getLoggedOutEvent()
            .subscribe( () => this._router.navigate(['Start']) );
    }
}
