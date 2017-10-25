import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  temp = 0;
  constructor(public navCtrl: NavController) {
  }

  doSomething(){
    var database = firebase.database();

    let ref = database.ref("lightTest/");
    ref.once("value").then(gotOne);
    
    function gotOne(data) {
      let refVal = data.val();
      let changedVar;
      //check to see if ligt is of if so give back true
      (refVal.on == "false") ? changedVar = "true" : changedVar = "false";

      //update the db
      ref.update({ on: changedVar });
      return;
    }
  }

  ionViewDidEnter(){
    let database = firebase.database();
    let reftemp = database.ref("Temperature/");
     
    reftemp.on("value",getTemp, errData)
    
    function getTemp(data) {
      let tempVal = data.val();
      //set the temperature to the h1
      document.getElementById('temp').innerHTML = JSON.stringify(tempVal.info) + "°C";
    }
    function errData(data){
      console.log("error");
    }

  } 
  DoThething() {
    let database = firebase.database();
    let storageRef = firebase.storage();
    //choose the right firebase table
    let refCam = database.ref("Camera/");
    //make the functions execute once
    refCam.once("value").then(sendRequest).then(function(){
      //set timeout on getimage function because of the server delay
      setTimeout(getImage, 5000)
    });

    function sendRequest(data) {
      //set the camera on through firebase
      refCam.update({ on: "true"});
    }

    function getImage(){
        // Create a reference to the file we want to download
        let refImg = storageRef.ref('/test.jpg');
        console.log(refImg)
        // Get the download URL
        refImg.getDownloadURL().then(function(url) {
          document.getElementById("cameraImg").setAttribute('src', url);
        }).catch(function(error) {
          switch (error.code) {
            case 'storage/object_not_found':
              // File doesn't exist
              break;
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;

            case 'storage/canceled':
              // User canceled the upload
              break;

            case 'storage/unknown':
              // Unknown error occurred, inspect the server response
              break;
          }
        });

    }
  }


}
