import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      //firebase
      firebase.initializeApp({
        apiKey: "AIzaSyB2U5e8m5p3iUE0ZjgWQNDMQjEzkxNIKdU",
        authDomain: "domotica-6490f.firebaseapp.com",
        databaseURL: "https://domotica-6490f.firebaseio.com",
        projectId: "domotica-6490f",
        storageBucket: "domotica-6490f.appspot.com",
        messagingSenderId: "407579583169"
      });
    });
  }
}
