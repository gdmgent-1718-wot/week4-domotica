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

    var id = '-KwiO6Ls6A3zydDXUtCY';
    var ref = database.ref("lightTest/" + id);
    ref.on("value", gotOne, errData);
    
    function gotOne(data) {
      let refVal = data.val();
      let changedVar;
      console.log(refVal);
      
      (refVal = "false") ? changedVar = "true" : changedVar = "false";

      database.ref("lightTest/-KwiO6Ls6A3zydDXUtCY").update({ on: changedVar });

      var updates = {};
      updates['lightTest/-KwiO6Ls6A3zydDXUtCY/on'] = refVal;
      database.ref().update(updates);

      console.log(refVal);
    }

    function errData(data){
      console.log("error");
    }

    


    //database.ref("lightTest/-KwiO6Ls6A3zydDXUtCY").update({ on: "Changed!!" });
  }



}
