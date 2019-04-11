import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { NavMap_1Page } from '../nav-map-1/nav-map-1';
import { NavMap_3Page } from '../nav-map-3/nav-map-3';
import { AbstractPage } from '../pages-utils/abstract-page';
import { MapProvider } from '../../providers/map/map';

@IonicPage()
@Component({
  selector: 'page-nav-map-2',
  templateUrl: 'nav-map-2.html',
})
export class NavMap_2Page extends AbstractPage {

  @ViewChild('mapDiv') mapElement: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams,  private mapProvider: MapProvider) {
	  super(mapProvider);
  }

  ionViewDidLoad() {
	this.setMapElement(this.mapElement);
	this.initMap();
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
