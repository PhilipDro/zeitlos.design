import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookie-disclaimer',
  templateUrl: './cookie-disclaimer.component.html',
  styleUrls: ['./cookie-disclaimer.component.scss']
})
export class CookieDisclaimerComponent implements OnInit {
  cookiesAccepted = false;

  constructor() { }

  ngOnInit() {
  }

  accept() {
    this.cookiesAccepted = true;
  }

}
