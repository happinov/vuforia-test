'use strict';

module.exports = function(context) {
    let cwd = process.cwd();
    let fs = require('fs');
    let path = require('path');
    let shell = context.requireCordovaModule('shelljs');
    var xcode = context.requireCordovaModule('xcode');


    let cordova_util = context.requireCordovaModule("cordova-lib/src/cordova/util");
    let ConfigParser = context.requireCordovaModule('cordova-common').ConfigParser;
    let projectRoot = cordova_util.isCordova();
    let cordovaConfig = new ConfigParser(cordova_util.projectConfig(projectRoot));
    let projectName =  cordovaConfig.doc.findtext('./name');


    console.log("On va essayer de déplacer les fichiers de assets");

    console.log("Le nom du projet est", projectName);
    let origin = path.join(cwd, 'assets',  '*');

    let androidDestination = path.join(cwd, 'platforms', 'android', 'assets');
    let iosDestination = path.join(cwd, 'platforms', 'ios', projectName, 'Resources');

    // console.log('origine:', origin);
    // console.log('Destination pour android:', androidDestination);
    // console.log('Destination pour ios:', iosDestination);
    console.log('asset files :');

    if (context.opts.platforms.indexOf('android') >= 0) {
        shell.cp('-R', origin, androidDestination);
        console.log("Copied files from", origin, 'to', androidDestination);
    }

    if (context.opts.platforms.indexOf('ios') >= 0) {
        shell.cp('-R', origin, iosDestination);
        console.log("Copied files from", origin, 'to', iosDestination);

        let projectPath = path.join(cwd, 'platforms', 'ios', projectName + '.xcodeproj', 'project.pbxproj');
        var myProj = xcode.project(projectPath);
        console.log("myProj",myProj);
        myProj.parse(function (err) {
            // myProj.addHeaderFile('foo.h');
            fs.readdir(path.join(cwd, 'assets'), function (err, files) {
                files.forEach(function (file) {
                    console.log("On ajoute la ressource :", iosDestination+"/"+file);
                    myProj.addResourceFile(iosDestination+"/"+file);
                });
                myProj.addResourceFile(path.join(cwd, 'platforms', 'android', 'assets', 'ARDemoDatabase.dat'));

            });
            fs.writeFileSync(projectPath, myProj.writeSync());
        });

    }

}
