function toggleNav() {
	var body = document.body;
	var hamburger = document.getElementById("js-hamburger");
	var blackBg = document.getElementById("js-black-bg");
	var menu1 = document.getElementById("js-menu--1");
	var menu2 = document.getElementById("js-menu--2");
  
	hamburger.addEventListener("click", function() {
	  body.classList.toggle("nav-open");
	  body.classList.remove("nav-open-1");
	  body.classList.remove("nav-open-2");
  
	  TweenMax.to(".global-nav--1", 0.6, { right: -740 });
	  TweenMax.to(".global-nav--2", 0.6, { right: -740 });
	});
  
	blackBg.addEventListener("click", function() {
	  body.classList.remove("nav-open");
	  body.classList.remove("nav-open-1");
	  body.classList.remove("nav-open-2");
  
	  TweenMax.to(".global-nav--1", 0.6, { right: -740 });
	  TweenMax.to(".global-nav--2", 0.6, { right: -740 });
	});
  
	menu1.addEventListener("click", function() {
	  var tl = new TimelineMax({
		onStart: function() {
		  // アニメーションが開始した時の処理
		  body.classList.add("nav-open-1");
		},
		onComplete: function() {
		  body.classList.remove("nav-open-2");
		}
	  });
  
	  if (body.classList.contains("nav-open-2")) {
		// .global-nav--2 が開いて入ればこの中を処理する
		// .global-nav--2 を隠す
		tl.to(".global-nav--2", 0.6, { right: -740 });
	  }
	  // .global-nav--1 を表示する
	  tl.to(".global-nav--1", 0.6, { right: 0 });
	});
  
	menu2.addEventListener("click", function() {
	  var tl = new TimelineMax({
		onStart: function() {
		  // アニメーションが開始した時の処理
		  body.classList.add("nav-open-2");
		},
		onComplete: function() {
		  body.classList.remove("nav-open-1");
		}
	  });
  
	  if (body.classList.contains("nav-open-1")) {
		// .global-nav--1 が開いて入ればこの中を処理する
		// .global-nav--1 を隠す
		tl.to(".global-nav--1", 0.6, { right: -740 });
	  }
	  // .global-nav--2 を表示する
	  tl.to(".global-nav--2", 0.6, { right: 0 });
	});
  }
  
  toggleNav();
  
 // ここからtree.jsの処理
window.addEventListener('load', init);

const objects = []; // 生成したハートを入れておく配列

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
	renderer.setClearColor(0xF2E4EE);
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
	camera.position.set(0, 0, 25);
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
	const loader = new THREE.GLTFLoader();
	const material = new THREE.MeshStandardMaterial({
		map: texture
	  });
	// テクスチャーのパスを指定
	//loader.setPath('./models');
	// 3dsファイルのパスを指定
	loader.load('./models/glTF/Heart.glTF', object => {
		// 読み込み後に3D空間に追加
		console.log(object.scene.children);
		const heart = object.scene.children[0];
		btn.addEventListener('click', function() {
			console.log('クリックされました！');
			//geometry = new THREE.BoxGeometry(100, 100, 100);
			//material = new THREE.MeshBasicMaterial({color: 0x6699FF});
			var cloneObject = heart.clone();
			var randomX = getRandom( -15, 15 );
			var randomY = getRandom( -5, 5 );
			var randomZ = getRandom( -5, 13 );
			function getRandom( min, max ) {
				var randomX = Math.floor( Math.random() * (max + 1 - min) ) + min;
				return randomX;
			}

			//文字の描写---------------------------------------
			// キャンバスの作成
			var canvas = document.createElement( 'canvas' );
			var context = canvas.getContext( '2d' );
			// キャンバスサイズの設定
			context.width = 512;
			context.height = 256;
			
			// 枠の描画開始
			context.beginPath();
			context.strokeStyle = '#FFFF00';
			context.lineWidth = 4.0;
			context.strokeRect(  0 ,  0 , 256 , 128 );
			context.stroke();
			
			// 文字の描画開始
			context.beginPath();
			// 文字色指定
			context.fillStyle = '#FFFF00';
			// フォントサイズとスタイルの定義
			context.font= '100px sans-serif';
			// 文字の表示位置指定
			context.textAlign = 'center';
			context.textBaseline = 'middle';
			// 文字、文字の開始位置、最大幅
			context.fillText('あいうえお', 128, 64, 230);
			context.fill();
			
			// テクスチャの作成
			var texture = new THREE.Texture( canvas );
			// これをやらないとマテリアルは真っ暗
			texture.needsUpdate = true;
			//ここまで------------------------------------------

			console.log( randomX,randomY,randomZ );
			// メッシュを作成
			const mesh = new THREE.Mesh(geometry, material);
			cloneObject.position.set(randomX,randomY,randomZ);

			objects.push(cloneObject);
			// 3D空間にオブジェクトを追加
			scene.add(cloneObject);
			scene.add(mesh);
		
			console.log(objects);
		}, false);
	
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
	//let mesh;
	//let geometry;
	//let material;
	

		setInterval(showNowDate, 1000);

	   
	  //現在時刻を表示する関数
	  function showNowDate(){
		const number = Object.keys(objects).length;
		if(number >= 50){
			scene.remove(objects[0]);
			objects.shift();
		};
	  };

	//var btndel = document.getElementById('btn-delete');
	//btndel.addEventListener('click', function() {
		//console.log('クリックされました！');

		//scene.remove(objects[0]);
		//objects.shift();
		//mesh.material.dispose();
		//mesh.geometry.dispose();
		
	//},false);
};