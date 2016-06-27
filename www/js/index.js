/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        console.log("L'appareil est prêt");
        screen.lockOrientation('landscape');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


document.getElementById("vuforia_button").onclick = function(){
    console.log("VUFORIA START!");
    console.log(cordova.platformId);
    var absolutePathIos = (cordova.file.documentsDirectory) + 'ARDemoDatabase.xml';
    var absolutePathAndroid = (cordova.file.externalApplicationStorageDirectory) + 'ARDemoDatabase.xml';

    var absolutePath = (cordova.platformId == "android")?absolutePathAndroid:absolutePathIos;

    console.log('Le chemin absolu est', absolutePath);

    navigator.VuforiaPlugin.startVuforia(
        {databaseXmlFile: absolutePath,
        targetList: [ 'test' ],
        overlayMessage: 'test',
        vuforiaLicense: 'Abl9cyr/////AAAAASvTXIbXtECnjS63XzT4JMESMOEiIiXhEWlffeXmsWoNhFroMo5NbMYXaVxDqmN1ngOv2dJEltqZeJu5f83wRTt5CqPbHuZB/RhDyf5Ur/Au07YbW8Js+XBX8jgEf06wERNOlxWTjvfo8g6nbfqCaJiDXhnKX0w7qCCrNGJTDowRRPiJydMPbKFrxlUsc1sWwe+wYoL5aQOrR2wKAWjOy/4UVzScR0yQZcsClKzaBMvvClduAxVb8OEwthHJbapu23zE+lrhILyh2d0C4VFQORKfugDcS/WwX3StNeuo1yMrCsFIO+OVJ5APabL7uZeXD10Ou8Zsc8K0WVreKUqhdHPUI2loe6Y19RcIpKHISzSF',
        showAndroidCloseButton: true,
        showDevicesIcon: false,
        // autostopOnImageFound: false
        },
        function(data){
            console.log(data);
            // alert("Image found: " + data.imageName);
        },
        function(err){
            console.error(err);
        }
    );

    // navigator.VuforiaPlugin.startVuforia(absolutePath, [ 'test' ], null,  'Abl9cyr/////AAAAASvTXIbXtECnjS63XzT4JMESMOEiIiXhEWlffeXmsWoNhFroMo5NbMYXaVxDqmN1ngOv2dJEltqZeJu5f83wRTt5CqPbHuZB/RhDyf5Ur/Au07YbW8Js+XBX8jgEf06wERNOlxWTjvfo8g6nbfqCaJiDXhnKX0w7qCCrNGJTDowRRPiJydMPbKFrxlUsc1sWwe+wYoL5aQOrR2wKAWjOy/4UVzScR0yQZcsClKzaBMvvClduAxVb8OEwthHJbapu23zE+lrhILyh2d0C4VFQORKfugDcS/WwX3StNeuo1yMrCsFIO+OVJ5APabL7uZeXD10Ou8Zsc8K0WVreKUqhdHPUI2loe6Y19RcIpKHISzSF',
    // function(data){
    //     console.log(data);
    //     alert("Image found: " + data.imageName);
    // },
    // function(err){
    //     console.error(err);
    // });
    //


};
app.initialize();
