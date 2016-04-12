import {Component} from "angular2/core";

@Component({
    selector: 'movie-error-page',
    template: `
      <h1 class="md-display-1">Ooops ...</h1>
      <p>This movie does not exist. Please choose another one.</p>
    `
})

export class MovieErrorPageComponent {}
