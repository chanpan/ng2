import { Component } from '@angular/core';

/** Routing **/
import { RouterModule, Router } from '@angular/router';

/** JQuery Import **/
declare var JQuery: any;
declare var $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router) { }
  goHome() {
    this.router.navigate(['/home']);
  }//goHome example routing
  MenuToggle() {
        $("#wrapper").toggleClass("toggled");
  }
}
