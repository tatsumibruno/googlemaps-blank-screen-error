import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavMap_1Page } from '../nav-map-1/nav-map-1';
import { NavMap_2Page } from '../nav-map-2/nav-map-2';
import { NavMap_3Page } from '../nav-map-3/nav-map-3';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToPage1() {
    this.navCtrl.push(NavMap_1Page);
  }

  goToPage2() {
    this.navCtrl.push(NavMap_2Page);
  }

  goToPage3() {
    this.navCtrl.push(NavMap_3Page);
  }

  goToHome() {
	this.navCtrl.push(HomePage);
  }

}
