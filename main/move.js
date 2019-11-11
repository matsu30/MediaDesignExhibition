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
	//マウス管理
	const mouse = new THREE.Vector2();
	// canvas 要素の参照を取得する
	const canvas = document.querySelector('#myCanvas');
	// レンダラーを作成
	const renderer = new THREE.WebGLRenderer({
		canvas: canvas
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
	camera.position.set(0, 0, 15);
	// カメラコントローラーを作成
	const controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.minDistance = 10;
	controls.maxDistance = 25
	controls.maxPolarAngle = Math.PI * ( 2 / 3) ;
	controls.minPolarAngle = Math.PI * ( 1 / 3) ;

	//平行光源
	//scene.add(new THREE.DirectionalLight(0xccc1c9, 5));
	//環境光源
	scene.add(new THREE.HemisphereLight(0xB04040, 0xFF9900, 0.4)); 
	scene.add(new THREE.AmbientLight(0xF2E4EE, 1.5)); 
	scene.fog = new THREE.Fog(0xF2E4EE, 10, 30);

	// 3DS形式のモデルデータを読み込む
	const loader = new THREE.GLTFLoader();
	// テクスチャーのパスを指定
	//loader.setPath('./models');

	Heart = function(c,x,y,z){
		this.loader = new THREE.GLTFLoader();
		this.mesh = new THREE.Object3D(); 
		var mat = new THREE.MeshPhongMaterial({
			color:c,
		});


		function getRandom( min, max ) {
			return Math.floor( Math.random() * (max + 1 - min) ) + min;
		}
		
		var randomX = getRandom( -x, x );
		var randomY = getRandom( -y, y );
		var randomZ = getRandom( z-10, z+10 );

		this.mesh.position.x = randomX;
		this.mesh.position.y = randomY;
		this.mesh.position.z = randomZ;

		this.mesh.rotation.y = Math.PI*2*Math.random();


		//////////animation////////////////////////////////////////
		var tm = new TimelineMax({
			yoyo : true, 
			repeat : -1,
			onUpdate: () =>{
			;
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
			var items = ['4232590685dc1210613812.jpeg'];
			var random = Math.floor( Math.random() * items.length ); 
			console.log( items[random] );
			const texture = loader.load(items[random]);
			heart.material = new THREE.MeshStandardMaterial({
				map: texture
			});
			this.mesh.add(heart);
		});
	}

	//////////////////////////////////////

	// var geom = new THREE.BoxGeometry(4,4,.2);
	// const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
	// const ms = new THREE.Mesh(geom, material);
	// scene.add(ms);
	// objects.push(ms);



	////////////////////////////////////////////

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

			var heart = new Heart(0xaa34f1, 10, 5, 0);

			scene.add(heart.mesh);
			objects.push(heart.mesh);
		
			console.log(objects);

		});
	},  {passive: false});
	

	//追加//////////////////////////////////////////////////////////

	const raycaster = new THREE.Raycaster();
	canvas.addEventListener('mousemove', handleMouseMove,  {passive: false});

	tick();

	// マウスを動かしたときのイベント
	function handleMouseMove(event) {
		const element = event.currentTarget;
		// canvas要素上のXY座標
		const x = event.clientX - element.offsetLeft;
		const y = event.clientY - element.offsetTop;
		// canvas要素の幅・高さ
		const w = element.offsetWidth;
		const h = element.offsetHeight;
		// -1〜+1の範囲で現在のマウス座標を登録する
		mouse.x = (x / w) * 2 - 1;
		mouse.y = -(y / h) * 2 + 1;
	}

	////////////////////////////////////////////////////////////


	// 毎フレーム時に実行されるループイベントです
	function tick() {
	
		//追加//////////////////////////////////////////////////////////

		// レイキャスト = マウス位置からまっすぐに伸びる光線ベクトルを生成
		raycaster.setFromCamera(mouse, camera);
		// その光線とぶつかったオブジェクトを得る
		const intersects = raycaster.intersectObjects(objects, true);
		objects.map(heart => {
			// 交差しているオブジェクトが1つ以上存在し、
			// 交差しているオブジェクトの1番目(最前面)のものだったら
			if (intersects.length > 0 && heart.mesh === intersects[0].object) {
			// コンソール
			console.log(intersects.length);
			 } else {
			//それ以外は何もしない
			;
			};
		});

		/////////////////////////////////////////////////////////////////////



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
		if(number >= 80){
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


axios.post('/MediaDesignExhibition/api/getheart')
			.then(function (response) {
			// データの送信に成功したときの処理をここに書く
				console.log(response);
				console.log(response.data[0].title);
			})
			.catch(function (error) {
			// データの送信に失敗したときの処理をここに書く
				console.log(error);
			});