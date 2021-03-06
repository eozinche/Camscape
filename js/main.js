	/**	//JQ 2
	 *
	 * WebCam Mesh by Felix Turner
	 * @felixturner / www.airtight.cc
	 * (c) Airtight Interactive Inc. 2012
	 *
	 * Connects HTML5 WebCam input to a WebGL 3D Mesh. It creates a 3D depth map by mapping pixel brightness to Z-depth.
	 * Perlin noise is used for the ripple effect and CSS3 filters are used for color effects.
	 * Use mouse move to tilt and scroll wheel to zoom. Requires Chrome or Opera.
	 *
	 */
	 var fov = 70;
	 var canvasWidth = 320 / 2;
	 var canvasHeight = 240 / 2;
	 var vidWidth = 320;
	 var vidHeight = 240;
	 var tiltSpeed = 0.1;
	 var tiltAmount = 0.005;

	 var perlin = new ImprovedNoise();
	 var camera, scene, renderer;
	 var mouseX = 0;
	 var mouseY = 0;
	 var windowHalfX, windowHalfY;


	/////////////////////////

	var video, videoTexture;

	/////////////////////////

	var world3D;
	var geometry;
	var vidCanvas;
	var ctx;
	var pixels;
	var noisePosn = 0;
	var wireMaterial;
	var meshMaterial;
	var container;
	var params;
	var prompt;
	var saturation;


	var index = 0;



	$( document ).ready(function() {
		console.log( "READYYYYYYYY!" );



	});
	container = document.querySelector('#container');
	prompt = document.querySelector('#prompt');
	container.style.display = 'none';

	function detectSpecs() {

		console.log( "DetectSpecs is ready" );

		if (!MediaStreamTrack) document.body.innerHTML = '<h1>Incompatible Browser Detected. Try <strong style="color:red;">Chrome Canary</strong> instead.</h1>';

		//init HTML elements



/////////////////

/////////////////

var hasWebgl = (function() {
	try {
		return !!window.WebGLRenderingContext && !! document.createElement('canvas').getContext('experimental-webgl');
	} catch (e) {
		return false;
	}
})();

var hasGetUserMedia = (function() {
	return !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
})();


if (!hasGetUserMedia) {
	prompt.innerHTML = 'This demo requires webcam support (Chrome or Opera).';
} else if (!hasWebgl) {
	prompt.innerHTML = 'No WebGL support detected. Please try restarting the browser.';
} else {
	prompt.innerHTML = 'Please allow camera access.';

			//getAllUserMedias();
	//	getCamera();



	init();
}

}

function getCamera(){

		//make it cross browser
		window.URL = window.URL || window.webkitURL;
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
		

		//get webcam
		navigator.webkitGetUserMedia({
			video: true
		}, function(stream) {
			console.log("GET CAMERA's Streaming begins");
			//on webcam enabled
			video.src = window.URL.createObjectURL(stream);
			console.log(video);

			prompt.style.display = 'none';
			//title.style.display = 'inline';
			container.style.display = 'inline';
			//gui.domElement.style.display = 'inline';
		}, function(error) {
			prompt.innerHTML = 'WHOOOOOPS! Unable to capture WebCam. Please reload the page.';
		});

				// //init webcam texture
				video = document.createElement('video');
				video.width = vidWidth;
				video.height = vidHeight;
				video.autoplay = true;
				video.loop = true;



			}


	// function combinedCamera(media_sources){

	// 	//make it cross browser
	// 	window.URL = window.URL || window.webkitURL;
	// 	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;


	// 	var media_source = media_sources[index];
	//     if (!media_source) return;

	//     //var constraints = {};

	//     if (media_source.kind == 'video') {
	//         constraints.video = {
	//             optional: [{
	//                 sourceId: media_source.id
	//             }]
	//         };
	//     }





	// }

	function getAllUserMedias(media_sources){
		console.log( "GETALLUSERMEDIA is ready" );

		console.log("INDEX IS NOW " + index);
		 index =0;
		var media_source = media_sources[index];
		if (!media_source) return;

		console.log(media_source.id);

		var constraints = {};

		if (media_source.kind == 'video') {
			constraints.video = {
				optional: [{
					sourceId: media_source.id
				}]
			};
		}

	    //init webcam texture
	    video = document.createElement('video');
	    video.width = 320;
	    video.height = 240;
	//	video.autoplay = true;
	//	video.loop = true;

//make it cross browser
window.URL = window.URL || window.webkitURL;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;


		//get webcam
		navigator.webkitGetUserMedia( 
			constraints
			, function (stream) {
				console.log("Stream begins");
			//on webcam enabled
		//	video = document.createElement(media_source.kind); //media_source.kind
		video.src = window.URL.createObjectURL(stream);
			//container.appendChild(video);

			console.log(video);

			video.width = 320;
			video.height = 240;
			video.autoplay = true;
			video.loop = true;

			prompt.style.display = 'none';
			container.style.display = 'inline';
//			gui.domElement.style.display = 'inline';




			









			console.log("SETTING VIDEO TEXTURE");
			videoTexture = new THREE.Texture(video);

			world3D = new THREE.Object3D();
			scene.add(world3D);

		//add mirror plane
		geometry = new THREE.PlaneGeometry(640, 480, canvasWidth, canvasHeight);
		geometry.dynamic = true;
		meshMaterial = new THREE.MeshBasicMaterial({
			opacity: 0.7,
			map: videoTexture
		});
		var mirror = new THREE.Mesh(geometry, meshMaterial);
		world3D.add(mirror);

		//add wireframe plane
		wireMaterial = new THREE.MeshBasicMaterial({
			opacity: 0.1,
			color: 0xffffff,
			wireframe: true,
			blending: THREE.AdditiveBlending,
			transparent: true
		});
		var wiremirror = new THREE.Mesh(geometry, wireMaterial);
		world3D.add(wiremirror);
		wiremirror.position.z = 5;

		//init renderer
		renderer = new THREE.WebGLRenderer({
			antialias: true
		});
		renderer.sortObjects = false;
		renderer.setSize(window.innerWidth, window.innerHeight);
		container.appendChild(renderer.domElement);

		// add Stats
		//stats = new Stats();
		//document.querySelector('.fps').appendChild(stats.domElement);


	/////////////////////////
	/////////////////////////
	/////////////////////////

		//init vidCanvas - used to analyze the video pixels
		vidCanvas = document.createElement('canvas');
		document.body.appendChild(vidCanvas);
		vidCanvas.style.position = 'absolute';
		vidCanvas.style.display = 'none';
		ctx = vidCanvas.getContext('2d');

	/////////////////////////
	/////////////////////////
	/////////////////////////

		//init listeners
		document.addEventListener('mousemove', onMouseMove, false);
		window.addEventListener('resize', onResize, false);
		document.addEventListener('mousewheel', onWheel, false);

		//handle WebGL context lost
		renderer.domElement.addEventListener("webglcontextlost", function(event) {
			prompt.style.display = 'inline';
			prompt.innerHTML = 'WebGL Context Lost. Please try reloading the page.';
		}, false);

		onResize();
		animate();


	}, function(error) {
		prompt.innerHTML = 'WHOOOOOPS! Unable to capture WebCam. Please reload the page.';
	});

		// video = document.createElement('video'); 
		// video.width = vidWidth;
		// video.height = vidHeight;
		// video.autoplay = true;
		// video.loop = true;



		
		// index++;
	//	getAllUserMedias(media_sources);




}

function init() {

	console.log( "INIT is ready" );
		// stop the user getting a text cursor
		document.onselectstart = function() {
			return false;
		};

		MediaStreamTrack.getSources(function (media_sources) {
			console.log("WHERE ARE YOU MST?");
			var sources = [];

			for (var i = 0; i < media_sources.length; i++) {
				if(media_sources[i].kind === "video"){
					sources.push(media_sources[i]);
					console.log(media_sources[i]);	    		
				}
			}
			getAllUserMedias(sources);

		});

		 //  		    MediaStreamTrack.getSources(function (media_sources) {
	  //   	var sources = [];

	  //   	for (var i = 4; i < media_sources.length; i++) {
	  //       sources.push(media_sources[i]);
	  //   	}

	  //   	console.log("SOURCES HERE! + " + sources);
	  //   	console.log(sources);
	  //  		getAllUserMedias(sources);

			// });

		//init control panel
		params = new WCMParams();
		// gui = new dat.GUI();
		// gui.add(params, 'zoom', 0.1, 5).name('Zoom').onChange(onParamsChange);
		// gui.add(params, 'mOpac', 0, 1).name('Mesh Opacity').onChange(onParamsChange);
		// gui.add(params, 'wfOpac', 0, 0.3).name('Grid Opacity').onChange(onParamsChange);
		// gui.add(params, 'contrast', 1, 5).name('Contrast').onChange(onParamsChange);
		// gui.add(params, 'saturation', 0.0, 2).name('Saturation').onChange(onParamsChange);
		// gui.add(params, 'zDepth', 0, 1000).name('Z Depth');
		// gui.add(params, 'noiseStrength', 0, 600).name('Noise Strength');
		// gui.add(params, 'noiseSpeed', 0, 0.05).name('Noise Speed');
		// gui.add(params, 'noiseScale', 0, 0.1).name('Noise Scale');
		// gui.add(params, 'invertZ').name('Invert Z');
		// //gui.add(this, 'saveImage').name('Snapshot');
		// gui.close();
		// gui.domElement.style.display = 'none';

		//Init 3D
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 5000);
		camera.target = new THREE.Vector3(0, 0, 0);
		scene.add(camera);
		camera.position.z = 400;

		console.log("@@@@@@@@@HALO HALLLO??")

	/////////////////////////
	/////STARTTTTT///////
	/////////////////////////


	 //    MediaStreamTrack.getSources(function (media_sources) {
	 //    var sources = [];

	 //    for (var i = 4; i < media_sources.length; i++) {
	 //        sources.push(media_sources[i]);
	 //    }

	 //    console.log(sources);
	 //   	getAllUserMedias(sources);

		// });


		// //init webcam texture
		// video = document.createElement('video');
		// video.width = vidWidth;
		// video.height = vidHeight;
		// video.autoplay = true;
		// video.loop = true;

		// //make it cross browser
		// window.URL = window.URL || window.webkitURL;
		// navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
		

		// //get webcam
		// navigator.webkitGetUserMedia({
		// 	video: true
		// }, function(stream) {
		// 	//on webcam enabled
		// 	video.src = window.URL.createObjectURL(stream);

		// 	prompt.style.display = 'none';
		// 	//title.style.display = 'inline';
		// 	container.style.display = 'inline';
		// 	gui.domElement.style.display = 'inline';
		// }, function(error) {
		// 	prompt.innerHTML = 'WHOOOOOPS! Unable to capture WebCam. Please reload the page.';
		// });

	/////////////////////////
	/////////ENDDD/////////
	/////////////////////////


		//animate();

	}

	// params for dat.gui

	function WCMParams() {
		this.zoom = 0.9;
		this.mOpac = 0;
		this.wfOpac = 0.1;
		this.contrast = 2.3;
		this.saturation = 0.045;
		this.invertZ = false;
		this.zDepth = 200;
		this.noiseStrength = 53;
		this.noiseScale = 0.017;
		this.noiseSpeed = 0.005;
		//this.doSnapshot = function() {};
	}

	function onParamsChange() {
		meshMaterial.opacity = params.mOpac;
		wireMaterial.opacity = 0.9;
		container.style.webkitFilter = "contrast(" + params.contrast + ") saturate(" + 0.065 + ")";
		console.log(params.saturation);
	}

	function getSaturation() {
		saturation = params.saturation;
		return saturation;
	}

	function getZDepths() {

		noisePosn += params.noiseSpeed;

		meshMaterial.opacity = params.mOpac;
		wireMaterial.opacity = params.wfOpac;
		container.style.webkitFilter = "contrast(" + params.contrast + ") saturate(" + params.saturation + ")";
		//saturation = params.saturation;

	/////////////////////////
	/////////////////////////
	/////////////////////////

		//draw webcam video pixels to canvas for pixel analysis
		//double up on last pixel get because there is one more vert than pixels
		ctx.drawImage(video, 0, 0, canvasWidth + 1, canvasHeight + 1);
		pixels = ctx.getImageData(0, 0, canvasWidth + 1, canvasHeight + 1).data;


	/////////////////////////
	/////////////////////////
	/////////////////////////

	for (var i = 0; i < canvasWidth + 1; i++) {
		for (var j = 0; j < canvasHeight + 1; j++) {
			var color = new THREE.Color(getColor(i, j));
			//var saturation = new THREE.Saturation()
			var brightness = getBrightness(color);
			var gotoZ = params.zDepth * brightness - params.zDepth / 2;

				//add noise wobble
				gotoZ += perlin.noise(i * params.noiseScale, j * params.noiseScale, noisePosn) * params.noiseStrength;
				//invert?
				if (params.invertZ) gotoZ = -gotoZ;
				//tween to stablize
				geometry.vertices[j * (canvasWidth + 1) + i].z += (gotoZ - geometry.vertices[j * (canvasWidth + 1) + i].z) / 5;
			}
		}
		geometry.verticesNeedUpdate = true;
	}
/////////////////////////////////////////////////////////////////////



	function onMouseMove(event) {
		mouseX = (event.clientX - windowHalfX) / (windowHalfX);
		//mouseY = (event.clientY - windowHalfY) / (windowHalfY);
		mouseY = event.clientY - windowHalfY;
	}

	function animate() {

		video.width = vidWidth;
		video.height = vidHeight;

		// console.log( "ANIMATE is ready");
		// console.log(video.width);
		// console.log( "What is video? -> " + video);

		if (video.readyState === video.HAVE_ENOUGH_DATA) {
			videoTexture.needsUpdate = true;
			getZDepths();
		//	getSaturation;
		}
		//stats.update();
		requestAnimationFrame(animate);
		render();
	}

	function render() {
		world3D.scale = new THREE.Vector3(params.zoom, params.zoom, 1);
		world3D.rotation.x += ((-348 * tiltAmount) - world3D.rotation.x) * tiltSpeed;
		world3D.rotation.y += ((mouseX * tiltAmount) - world3D.rotation.y) * tiltSpeed;
		//camera.lookAt(camera.target);
	//	console.log(mouseY);
		renderer.render(scene, camera);
	}

	function onResize() {
		renderer.setSize(window.innerWidth, window.innerHeight);
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;
	}

	// Returns a hexidecimal color for a given pixel in the pixel array.

	function getColor(x, y) {
		var base = (Math.floor(y) * (canvasWidth + 1) + Math.floor(x)) * 4;
		var c = {
			r: pixels[base + 0],
			g: pixels[base + 1],
			b: pixels[base + 2],
			a: pixels[base + 3]

			// var v = 0.2126*r + 0.7152*g + 0.0722*b;
			// pixels[base + 0] = pixels[base + 1] = pixels[base + 2] = v;
		};
		//return (c.r << 16) + (c.g << 8) + c.b;

		return (c.r << 16) + (c.g << 8) + c.b;
	

  // for (var i=0; i<d.length; i+=4) {
  //   var r = d[i];
  //   var g = d[i+1];
  //   var b = d[i+2];
  //   // CIE luminance for the RGB
  //   // The human eye is bad at seeing red and blue, so we de-emphasize them.
  //   var v = 0.2126*r + 0.7152*g + 0.0722*b;
  //   d[i] = d[i+1] = d[i+2] = v
  // }
  // return pixels;

	}

	//return pixel brightness between 0 and 1 based on human perceptual bias

	function getBrightness(c) {
		//return (0.34 * c.r + 0.5 * c.g + 0.16 * c.b);
		return (0.1 * (c.r + c.g + c.b));
	}


	function onWheel(event) {

		params.zoom += event.wheelDelta * 0.002;
		//limit
		params.zoom = Math.max(params.zoom, 0.1);
		params.zoom = Math.min(params.zoom, 5);

		//update gui slider
		//gui.__controllers[0].updateDisplay();
	}

	function saveImage() {
		render();
		window.open(renderer.domElement.toDataURL("image/png"));
	}

	//start the show
	detectSpecs();