import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { NavMap_1Page } from '../pages/nav-map-1/nav-map-1';
import { NavMap_2Page } from '../pages/nav-map-2/nav-map-2';
import { NavMap_3Page } from '../pages/nav-map-3/nav-map-3';
import { MapProvider } from '../providers/map/map';
import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp,
	HomePage,
	NavMap_1Page,
	NavMap_2Page,
	NavMap_3Page
  ],
  imports: [
	BrowserModule,
	HttpClientModule,
	IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
	HomePage,
	NavMap_1Page,
	NavMap_2Page,
	NavMap_3Page
  ],
  providers: [
    StatusBar,
	SplashScreen,
	MapProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
