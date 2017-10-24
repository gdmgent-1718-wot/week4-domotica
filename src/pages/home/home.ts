import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  doSomething(){
    console.log("Toggle lights ...");

    var database = firebase.database();

  
    /*  
    var lightData = database.ref('lightTest');
    var data = {
      on: true
    }
    lightData.push(data);
    */

    /*
    let lightSlider = document.querySelector("#lightSlider");
    var attrib = lightSlider.getAttribute('checked');
    console.log(attrib);
    */

    // let id = '-KwiO6Ls6A3zydDXUtCY';
    let ref = database.ref("lightTest/");
    ref.once("value").then(gotOne);
    
    function gotOne(data) {
      let refVal = data.val();
      let changedVar;
      console.log(refVal);
      
      (refVal.on == "false") ? changedVar = "true" : changedVar = "false";

      ref.update({ on: changedVar });
      return;
      // var updates = {};
      // updates['lightTest/-KwiO6Ls6A3zydDXUtCY/on'] = refVal;
      // database.ref().update(updates);
    }

    function errData(data){
      console.log("error");
    }

    


    //database.ref("lightTest/-KwiO6Ls6A3zydDXUtCY").update({ on: "Changed!!" });
  }



}
