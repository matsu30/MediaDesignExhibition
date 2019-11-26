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

var title = document.querySelector(".grid-title");
var body = document.querySelector(".comment-text");
var Img = document.getElementById("img");
const detail = document.getElementById("js-detail");
var close = document.getElementById("my-parts");



// ここからtree.jsの処理
window.addEventListener('load', init);

const objects = []; // 生成したハートを入れておく配列
let heartDataList = [];  //APIから取得したデータを保存する
let focusHeartId;


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

	//t　は画像ファイル名
	Heart = function(x, y, z, t){

		this.mesh = new THREE.Object3D(); 
		this.mesh.imageId = t;

		function getRandom(min, max) {
			return Math.floor(Math.random() * (max + 1 - min)) + min;
		}

		const randomX = getRandom(-x, x);
		const randomY = getRandom(-y, y);
		const randomZ = getRandom(z - 10, z + 10);

		const tm = new TimelineMax({
			yoyo: true, 
			repeat: -1,
			delay: getRandom(0, 2)
		});

		const loader = new THREE.GLTFLoader();

		this.mesh.position.x = randomX;
		this.mesh.position.y = randomY;
		this.mesh.position.z = randomZ;

		this.mesh.rotation.y = Math.PI * 2 * Math.random();

		tm.to(this.mesh.position, 3, {
			y: `+=${getRandom(2,0)}`,
			ease: Back.easeInOut
		}, 'animate0');

		loader.load('./models/glTF/Heart.glTF', object => {
			const heart = object.scene.children[0];
			const loader = new THREE.TextureLoader();
			const item = '/api/postheart/images/' + t + '.jpeg';
			const texture = loader.load(item);
			heart.material = new THREE.MeshStandardMaterial({
				map: texture
			});
			this.mesh.add(heart);
		});
	}

	const raycaster = new THREE.Raycaster();
	canvas.addEventListener('mousemove', handleMouseMove,{passive: false});
	canvas.addEventListener('click', onCanvasClick);

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

	function onCanvasClick() {
		if (typeof focusHeartId === 'undefined') {
			// マウスオンしているハートがない時
		} else {
			// マウスオンしているハートがある時
				console.log(`クリックしたハートのIDは ${focusHeartId}`);
				for (let i = 0; i < heartDataList.length; i++) {
					const heartData = heartDataList[i];
					if (heartData.img === focusHeartId) {
						console.log('クリックされてデータは', heartData);
						var tit = title.innerHTML = heartData.title;
						var msg = body.innerHTML = heartData.body;
						Img.innerHTML = `
						<div>
							<img src="/api/postheart/images/${heartData.img}.jpeg" width="300px">
						</div>
						`;
						TweenMax.to(detail, 0.6, { autoAlpha: 1.0 });
					}
			
				}
		}
	}

	close.addEventListener("click", function() {
		TweenMax.to(detail, 0.6, { autoAlpha: 0.0 });
	});

	// 毎フレーム時に実行されるループイベントです
	function tick() {
		// レイキャスト = マウス位置からまっすぐに伸びる光線ベクトルを生成
		raycaster.setFromCamera(mouse, camera);
		// その光線とぶつかったオブジェクトを得る
		const intersects = raycaster.intersectObjects(objects, true);
		objects.map(heart => { 
			// 交差しているオブジェクトが1つ以上存在し、
			// 交差しているオブジェクトの1番目(最前面)のものだったら
			if (intersects.length > 0 ){
				if(heart.children[0] === intersects[0].object) {
					heart.children[0].material.color.setHex(0xfa9bb9);
					focusHeartId = heart.imageId;
				}
			} else {
				if (heart.children[0]){
					heart.children[0].material.color.setHex(0xffffff);
				}	
			focusHeartId = undefined;
			}
		});


		console.log(focusHeartId);

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

	let limit = 80;
	let offset = 0;


	//現在時刻を表示する関数
	function showNowDate(){

		axios.get(`/api/getheart?limit=${limit}&offset=${offset}`)
		.then(function (response) {
			// データの送信に成功したときの処理をここに書く
			var num1 = parseInt(objects.length);
			var num2 = parseInt(response.data[num1].id);
			var plus = num1 + num2;
			console.log(response);
			console.log(response.data[0].img);
			console.log(response.data[0].id);
			console.log(num1);
			console.log(num2);
			console.log(num1 + num2);


			limit = 80;
			
			if (objects.length === 0) {
				for (var i = 0; i < response.data.length; i++) {
					console.log(i);
					console.log(response.data[i].id);
					const heart = new Heart(10, 5, 0, response.data[i].img);
					scene.add(heart.mesh);
					objects.push(heart.mesh);
					console.log('追加された');
				}
			} else if(response.data[0].id == plus){
				const heart = new Heart(10, 5, 0, response.data[0].img);
				scene.add(heart.mesh);
				objects.push(heart.mesh);
				console.log('追加されたyo');
			}
			heartDataList = response.data;

		})
		.catch(function (error) {
			// データの送信に失敗したときの処理をここに書く
			console.log(error);
		});

		if(objects.length >= 80){
			scene.remove(objects[0]);
			objects.shift();
		};


	};

	setInterval(showNowDate, 2000);

	tick();
};




