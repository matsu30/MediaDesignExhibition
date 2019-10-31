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
		50,
		width / height,
		0.1,
		2000
	);
	// カメラの初期座標を設定
	camera.position.set(0, 0, 25);
	// カメラコントローラーを作成
	const controls = new THREE.OrbitControls(camera);
	// 平行光源を作成
	const directionalLight = new THREE.DirectionalLight(0xffffff,0.5);
	directionalLight.position.set(0, 1, 1);
	scene.add(directionalLight);
	// 環境光を追加
	hemisphereLight = new THREE.HemisphereLight(0xf4cccc,0xffffff);
	scene.add(hemisphereLight); 

	// 3DS形式のモデルデータを読み込む
	const loader = new THREE.GLTFLoader();
	// テクスチャーのパスを指定
	//loader.setPath('./models');

	Heart = function(c,x,y,z){

		console.log(c,x,y,z);

		this.loader = new THREE.GLTFLoader();
		this.mesh = new THREE.Object3D(); 
		var geom = new THREE.BoxGeometry(2,2,2);
		var mat = new THREE.MeshPhongMaterial({
			color:c,
		});


		function getRandom( min, max ) {
			return Math.floor( Math.random() * (max + 1 - min) ) + min;
		}
		
		var randomX = getRandom( -x, x );
		var randomY = getRandom( -y, y );
		var randomZ = getRandom( -z+15, z+13 );

		this.mesh.position.x = randomX;
		this.mesh.position.y = randomY;
		this.mesh.position.z = randomZ;

		this.mesh.rotation.y = Math.PI*2*Math.random();


	//////////animation////////////////////////////////////////
	 var tm = new TimelineMax({
	 	yoyo : true, 
		 repeat : -1,
		 onUpdate: () =>{
			 console.log('test');
		 }
	 });

	 tm.to(this.mesh.position, 3, {
	 	y : `+=${getRandom(2,0)}`,
	 	ease : Back.easeInOut
	 }, 'animate0');
    //////////////////////////////////////////////////////////////


		//this.mesh.add(new THREE.Mesh(geom, mat));
		this.loader.load('./models/glTF/Heart.glTF', object => {
			var flag = true;
			const heart = object.scene.children[0];
			const loader = new THREE.TextureLoader();
			var items = ['file2.jpg', '2-2-1.jpg'];
			var random = Math.floor( Math.random() * items.length ); 
			console.log( items[random] );
			const texture = loader.load(items[random]);
			heart.material = new THREE.MeshStandardMaterial({
				map: texture
			});
			this.mesh.add(heart);
		});
	}

	// 3dsファイルのパスを指定
	loader.load('./models/glTF/Heart.glTF', object => {
			// 読み込み後に3D空間に追加
			const heart = object.scene.children[0];

		//クリック
		btn.addEventListener('click', function() {

			console.log('クリックされました！');

			//geometry = new THREE.BoxGeometry(100, 100, 100);
			//material = new THREE.MeshBasicMaterial({color: 0x6699FF});
			//var cloneObject =  new THREE.Mesh(geom, mat);
			var randomX = getRandom( -15, 15 );
			var randomY = getRandom( -5, 5 );
			var randomZ = getRandom( -5, 13 );
			function getRandom( min, max ) {
				var randomX = Math.floor( Math.random() * (max + 1 - min) ) + min;
				return randomX;
			}

			console.log( randomX,randomY,randomZ );
			// メッシュを作成
			//const mesh = new THREE.Mesh(geometry, material);
			//cloneObject.position.set(randomX,randomY,randomZ);

			//objects.push(cloneObject);
			// 3D空間にオブジェクトを追加
			//scene.add(cloneObject);
			//scene.add(mesh);
			var heart = new Heart(0xaa34f1, 15, 5, 10);

			scene.add(heart.mesh);
			objects.push(heart.mesh);
	
			console.log(objects);
		}, false);
	
	});
	





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

//////////////////////////////////////////////////////////////////////

