// these need to be accessed inside more than one function so we'll declare them first
let container;
let camera;
let controls;
let renderer;
let scene;


const mixers = [];
const clock = new THREE.Clock();

function init() {

  container = document.querySelector( '#scene-container' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x2B2B2B );

  createCamera();
  createControls();
  createLights();
  loadModels();
  createRenderer();

  renderer.setAnimationLoop( () => {

    // update();
    render();

  } );

}

function createCamera() {

  camera = new THREE.PerspectiveCamera( 35, container.clientWidth / container.clientHeight, 1, 9000 );
  camera.position.set(0,308.610,-500 );
  // rotation // UP DOWN // zoom

}

function createControls() {

  controls = new THREE.OrbitControls( camera, container );

}

function createLights() {

  const ambientLight = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d, 5 );

  const mainLight = new THREE.DirectionalLight( 0xffffff, 5 );
  mainLight.position.set( 5, 3500, 7 );



  scene.add( ambientLight );

}

function loadModels() {

  const loader = new THREE.GLTFLoader();

  // A reusable function to set up the models. We're passing in a position parameter
  // so that they can be individually placed around the scene
  const onLoad = ( gltf, position ) => {

    const model = gltf.scene.children[ 0 ];
    model.position.copy( position );
    //
    // const animation = gltf.animations[ 0 ];
    //
    // const mixer = new THREE.AnimationMixer( model );
    // mixers.push( mixer );
// only uncomment if it has an animation - use 2 loaders if some models have animation or no animations
    // const action = mixer.clipAction( animation );
    // action.play();

    scene.add( model );

  };

  // the loader will report the loading progress to this function
  const onProgress = () => {};

  // the loader will send any error messages to this function, and we'll log
  // them to to console
  const onError = ( errorMessage ) => { console.log( errorMessage ); };

  // load the first model. Each model is loaded asynchronously,
  // so don't make any assumption about which one will finish loading first
  const parrotPosition = new THREE.Vector3( 0, -200, 0 );
  loader.load( 'models/assemble.glb', gltf => onLoad( gltf, parrotPosition ), onProgress, onError );
    // loader.load( 'models/amythyst_cleaned.glb', gltf => onLoad( gltf, parrotPosition ), onProgress, onError );
// so BASICALLY - when importing from blender - make sure you do import from selection


}

function createRenderer() {

  // create a WebGLRenderer and set its width and height
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( container.clientWidth, container.clientHeight );

  renderer.setPixelRatio( window.devicePixelRatio );

  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;

  renderer.physicallyCorrectLights = true;

  container.appendChild( renderer.domElement );

}

// function update() {
//
//   const delta = clock.getDelta();
//
//   for ( const mixer of mixers ) {
//
//     mixer.update( delta );
//
//   }
//
// }
function animate() {

			render();
			requestAnimationFrame( animate );

		}

		function render() {

      // var timer = Date.now() * 0.0002;
      //
  		// 		camera.position.x = Math.cos( timer ) * 20;
  		// 		camera.position.y = 28;
  		// 		// camera.position.z = Math.sin( timer ) * 20;

  				// camera.lookAt( 0, 98, 0 );


  				renderer.render( scene, camera );

		}

    function onWindowResize() {

    			camera.aspect = window.innerWidth / window.innerHeight;
    			camera.updateProjectionMatrix();

    			renderer.setSize( window.innerWidth, window.innerHeight );

    		}

// function onWindowResize() {
//
//   camera.aspect = container.clientWidth / container.clientHeight;
//
//   // update the camera's frustum
//   camera.updateProjectionMatrix();
//
//   renderer.setSize( container.clientWidth, container.clientHeight );
//
// }

window.addEventListener( 'resize', onWindowResize );

init();
