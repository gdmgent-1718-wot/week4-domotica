import firebase_admin
import os
import time
import datetime
from firebase_admin import credentials
from firebase_admin import db
from sense_hat import SenseHat
from picamera import PiCamera
from google.cloud import storage
from PIL import Image

#enable google cloud Storage
client = storage.Client()
#ref to an existing bucket
bucket = client.get_bucket('domotica-6490f.appspot.com')





#init camera
camera = PiCamera()
camera.resolution = (500,500)

#function to calculate cpu_temperature
def get_cpu_temp():
    res = os.popen("vcgencmd measure_temp").readline()
    t = float(res.replace("temp=","").replace("'C\n",""))
    return(t)

#init sensehat
sense = SenseHat()

#cred for firebase
cred = credentials.Certificate('domotica-6490f-firebase-adminsdk-st7uj-0ec3d86ef0.json')

default_app = firebase_admin.initialize_app(cred,{
    'databaseURL': 'https://domotica-6490f.firebaseio.com'
    })
O= [0, 0, 0]
x = [255, 0, 0]

#lightmatrix sensehat
matrix = [
O, O, O, O, O, O, O, O,
O, O, O, O, O, O, O, O,
O, O, x, O, O, x, O, O,
O, O, O, O, O, O, O, O,
O, O, O, O, O, O, O, O,
O, O, x, O, O, x, O, O,
O, O, O, x, x, O, O, O,
O, O, O, O, O, O, O, O
    ]

Tempdb = db.reference().child('Temperature')
cameraUpdate = db.reference().child('Camera')

while True:

    Lightinfo = db.reference('lightTest/').get()
    cameraInfo = db.reference('Camera/').get()
                          
    if(Lightinfo['on'] == "true"):
        sense.set_pixels(matrix)
    elif(Lightinfo['on'] == "false"):
         sense.clear()

    temperature = sense.get_temperature_from_humidity()
    cpu_temp = get_cpu_temp()
 
    temp_corr = temperature -((cpu_temp - temperature)/1.5)

    
    temp_round = int(round(temp_corr))

    Tempdb.update({'info' : temp_round})

    if(cameraInfo['on'] == "true"):

        
        camera.start_preview()
        time.sleep(1)
        camera.capture("test.jpg")
        camera.stop_preview()

        #upload local file to online bucket
        blob = bucket.blob('test.jpg')
        img = Image.open("test.jpg")
        img.save("test.jpg")
        of = open("test.jpg", 'rb')
        blob.upload_from_file(of)
        blob.upload_from_filename(filename="test.jpg")
        
        cameraUpdate.update({ 'on': "false"})
