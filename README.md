# Domotica Project WOT
## Pieter Vleminckx & Brent De Roeck
### Assignment
Create a Domotica system with the ionic framework | firebase | raspberry pi

### Parts needed
- raspberry pi 3
- camera module 
- sensehat

#### Ionic-framework
Create first an app in ionic:
* Install: `npm install -g cordova ionic`
* Start app: `ionic serve`
* [IONIC DOCS](https://ionicframework.com)

#### Firebase
- Create a firebase database on the [Google Firebase website](https://firebase.google.com)
- Change to rules to:
```
{
  "rules": {
    ".read": "true",
    ".write": "true"
  }
}
```
###### Ps: Be awere that this is not secure at all || Also : Don't forget to link your firebase in your ionic app.
#### Raspberry Pi 3
##### Install
firebase: 
```
sudo pip3 install python-firebase
sudo pip3 install firebase-admin
```
###### Ps: Make sure your time is set. Otherwise it won't work! `dpkg-reconfigure tzdata`
google cloud:
```
sudo pip install google-cloud
gcloud auth application-default login
```