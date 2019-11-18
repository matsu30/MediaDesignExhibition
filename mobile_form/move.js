const form = document.querySelector('#js-form');
const canvas = document.querySelector('#js-canvas');
const input = document.querySelector('#js-input');
const textarea = document.querySelector('#js-textarea');
const submitButton = document.querySelector('#js-submit');
const context = canvas.getContext('2d');

console.log(form);

form.addEventListener('submit', function(e) {
    console.log('クリックされました');
    // データの送信をキャンセルする
    e.preventDefault();

    const url = form.action;

    // 入力された文字列を取得する
    const title = input.value;
    console.log(title);

    const body = textarea.value;
    console.log(body);




        // 塗り色を決める
        context.fillStyle = "#F5D8E8";
        // canvasの左から0、上から0の位置に幅 width、高さ heightの塗りつぶしの四角形を描く
        context.fillRect(0, 0, 1024, 1024);
    
        // 以降の塗り色を決める
        context.fillStyle = "#000000";
    
        context.scale(1, -1);
        context.font = "bold 600px sans-serif";
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = '#EDA8CD';
        context.fillText(title, 512, -512, 1024);
    
        // 空のimg要素を作る
        const img = new Image();
    
        img.onload = function() {
        // img要素の読み込みが終わったらこの中が処理される
        // 画像をHTMLに追加する
        document.body.appendChild(img);
        };
    
        // img要素 srcに画像化（base64化）したcanvasの内容を反映する
        img.src = canvas.toDataURL('image/jpeg');
    
        console.log(img.src);
        

    


    //canvasの内容をbase64（文字列）にしてbase64という変数に入れておく
    const base64 = canvas.toDataURL('image/jpeg');
    
    const params = new URLSearchParams();
    params.append('title', title);
    params.append('body', body);
    params.append('base64', base64);


    axios.post(url, params)
        .then(function (response) {
        // データの送信に成功したときの処理をここに書く
            console.log(response);
            window.location.href = '/mobile_end';
        })
        .catch(function (error) {
        // データの送信に失敗したときの処理をここに書く
            console.log(error);
        });

        console.log(`
        ${url} に以下のデータを送ります
        ${title}
        ${body}
        ${base64}
        `);
});







