
var LICENSE = 'AfLI8Qb/////AAAAAFJb+k2ck0oolfb8596q1HuLWZNVTieLTx5YVS6VSGgO50Fj0bG91TnhaIr/WXf0Kb9LVqfgqcNGeWkb32GVXL/D5PcgBAFF2Qh5R8YBEiWE4pj83i2CxWzuFKPg+arr5d2mr4dR9jS0MbaI3K1CpymxGpBF/27HrDWyFUzDBoHBMjRn0A4pXzcGOPCgOvoXTdolwb/2YbS+0hWMoCiYfZolqKqoqO5vuNREeH4DczBtWrz3F1CsdswFgDDI3V4m+1x/EU8ESE1qgH1WsFC1WI/XOOyXZ1k7vYAe31rcc240Ys7vNj2VddK7EKod/k16w0EHLGHOz4nJQHFDk3Jw0vQ5h8NbGwxeN0Yjs3qpv7Cg'

function getRootFolderPath() {
	if (cordova.platformId == "android")
		return cordova.file.externalApplicationStorageDirectory;
	else
		return cordova.file.documentsDirectory;
}

function getPath(path) {
	path = path.replace(/^\//,'');
	return getRootFolderPath()+path;
}

var app = {
	initialize: function() {
		this.bindEvents();
	},
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	onDeviceReady: function() {
		console.log("L'appareil est prêt");
		screen.lockOrientation('landscape');

		function startAR() {
			console.log("VUFORIA START AR!");
			var folderPath = getPath('StonesAndChips');
//			 var folderPath = getPath('plugintest4');

			var options = {
				vuforiaLicense: LICENSE,
				overlayImageFolder: folderPath,
				databaseXmlFile: folderPath+'/database.xml'
			};

			Vuforia.openFinder(options,function(){/* do nothing */}, function(err){
				alert("Error opening Vuforia:\n"+err)
			});
		}

		function startIR() {
			console.log("VUFORIA START IR!");
			console.log(cordova.platformId);

			var absolutePath = getPath('plugintest3/database.xml');

			console.log('Le chemin absolu est', absolutePath);

			var options = {
				vuforiaLicense: LICENSE,
				targetList: [ 'clubmed','tron' ],
				databaseXmlFile: absolutePath,
			};

			Vuforia.openIRFinder(options,
				function(data){
					console.log('RESULT:',data);
					Vuforia.closeFinder();
					// alert("Image found: " + data.imageName);
				},
				function(err){
					console.error('ERROR:',err);
				}
			);
		};

		var currentFunction;
		currentFunction = startAR;
		// currentFunction = startIR;

		document.getElementById("vuforia_button").onclick = currentFunction;

		currentFunction();


		//
		// function playSound() {
		// 	// var soundPathIos = (cordova.file.documentsDirectory) + 'shutter.mp3';
		// 	var soundPathIos = 'shutter.mp3';
		// 	var soundPath = soundPathIos;
		//
		// 	var media = new Media(soundPath,function(){
		// 		console.log('Sound played.');
		// 		media.release();
		// 	}, function (err) {
		// 		console.error('Error playing sound:',err.message);
		// 		media.release();
		// 	});
		//
		// 	media.play();
		// };
		//
		// document.getElementById("sound_button").onclick = playSound;
		//
		// playSound();
	}
};

app.initialize();
