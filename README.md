# Domotica Project WOT
## Pieter Vleminckx & Brent De Roeck
### Assignment
Create a Domotica system with the ionic framework | firebase | raspberry pi

### parts needed
- raspberry pi 3
- camera module 
- sensehat

#### Ionic-framework
Install: `npm install -g cordova ionic`
Start app: `ionic serve`
Docs: https://ionicframework.com

#### Raspberry Pi 3
##### Install
firebase: 
```
sudo pip3 install python-firebase
sudo pip3 install firebase-admin
```
###### Ps: Make sure your time is set. Otherwise it won't work!
google cloud:
```
sudo pip install google-cloud
gcloud auth application-default login
```