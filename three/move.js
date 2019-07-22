function toggleNav() {
	var body = document.body;
	var hamburger = document.getElementById('js-hamburger');
	var blackBg = document.getElementById('js-black-bg');
	var menu1 = document.getElementById('js-menu--1');
	var menu2 = document.getElementById('js-menu--2');
  
	hamburger.addEventListener('click', function() {
		body.classList.toggle('nav-open');
		body.classList.remove('nav-open-1');
		body.classList.remove('nav-open-2');
	});
	blackBg.addEventListener('click', function() {
		body.classList.remove('nav-open');
		body.classList.remove('nav-open-1');
		body.classList.remove('nav-open-2');
	});

	menu1.addEventListener('click', function() {
		var tl = new TimelineMax();
		tl.to(menu1,{ right:0 });
		body.classList.remove('nav-open-2');
		body.classList.toggle('nav-open-1');
	});

	menu2.addEventListener('click', function() {
		body.classList.remove('nav-open-1');
		body.classList.toggle('nav-open-2');
	});

  }
 toggleNav();

 // ここからtree.jsの処理
window.addEventListener('load', init);

function init() {
	// サイズを指定
	const width = 860;
	const height = 540;
	// レンダラーを作成
	const renderer = new THREE.WebGLRenderer({
		canvas: document.querySelector('#myCanvas')
	});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(width, height);
	// シーンを作成
	const scene = new THREE.Scene();
	// カメラを作成
	const camera = new THREE.PerspectiveCamera(
		45,
		width / height,
		0.1,
		10000
	);
	// カメラの初期座標を設定
	camera.position.set(0, 0, 1000);
	// カメラコントローラーを作成
	const controls = new THREE.OrbitControls(camera);
	// 平行光源を作成
	const directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(1, 1, 1);
	scene.add(directionalLight);
	// 環境光を追加
	const ambientLight = new THREE.AmbientLight(0xffffff);
	scene.add(ambientLight);
	// 3DS形式のモデルデータを読み込む
	const loader = new THREE.TDSLoader();
	// テクスチャーのパスを指定
	//loader.setPath('./models');
	// 3dsファイルのパスを指定
	loader.load('./models/3ds/portalgun/portalgun.3ds', object => {
		// 読み込み後に3D空間に追加
	scene.add(object);
	})

	tick();
	// 毎フレーム時に実行されるループイベントです
	function tick() {
	// レンダリング
	renderer.render(scene, camera);
	requestAnimationFrame(tick);
	}

	// 初期化のために実行
	onResize();
	// リサイズイベント発生時に実行
	window.addEventListener('resize', onResize);
	function onResize() {
		// サイズを取得
		const width = window.innerWidth;
		const height = window.innerHeight;
		// レンダラーのサイズを調整する
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(width, height);
		// カメラのアスペクト比を正す
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
	}

	var btn = document.getElementById('btn');
	btn.addEventListener('click', function() {
		console.log('クリックされました！');
		const geometry = new THREE.BoxGeometry(100, 100, 100);
		const material = new THREE.MeshBasicMaterial({color: 0x6699FF});
		var randomX = getRandom( -800, 800 );
		var randomY = getRandom( -300, 400 );
		var randomZ = getRandom( -1000, 0 );
		function getRandom( min, max ) {
			var randomX = Math.floor( Math.random() * (max + 1 - min) ) + min;
			return randomX;
		}
		console.log( randomX,randomY,randomZ );
		// メッシュを作成
		const mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(randomX,randomY,randomZ);
		// 3D空間にメッシュを追加
		scene.add(mesh);

	}, false);

	var btndel = document.getElementById('btn-delete');
	btndel.addEventListener('click', function() {
		console.log('クリックされました！');
		for(var i = mesh.length; i--; ){
			scene.remove(meshs[i]);
			delete s[i];
			}
			
			cubes.length = 0;
		
	}, false);
}