const form = document.querySelector('#js-form');
const canvas = document.querySelector('#js-canvas');
const input = document.querySelector('#js-input');
const textarea = document.querySelector('#js-textarea');
const submitButton = document.querySelector('#js-submit');

form.addEventListener('submit', function(e) {
    console.log('クリックされました');
    // データの送信をキャンセルする
    e.preventDefault();

    const url = form.action;

    // 入力された文字列を取得する
    const title = input.value;
    const body = textarea.value;



    // まつざわさんはここでbodyの内容をcanvasに書き込む
    window.onload = function(){
        var canvas = document.getElementById("canvas"),
            context = canvas.getContext("2d"),
            width = canvas.width = 1,
            height = canvas.height = 1;

        // 塗り色を決める
        context.fillStyle = "#F5D8E8";
        // canvasの左から0、上から0の位置に幅 width、高さ heightの塗りつぶしの四角形を描く
        context.fillRect(0, 0, width, height);

        // 以降の塗り色を決める
        context.fillStyle = "#000000";

        context.font = "bold 600px sans-serif";
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = '#EDA8CD';
        context.fillText(title, 500, 500, 1000);

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
    
};






    // canvas に書き込まれた内容を
    // base64（文字列）にしてbase64という変数に入れておく
    const base64 = canvas.toDataURL('image/jpeg');

    axios.post(url, {
    title: title,
    body: body, // 送信するデータPHP側で$_POSST["body"]で受け取れる
    base64: base64 // 送信するデータPHP側で$_POSST["base64"]で受け取れる
    })
    .then(function (response) {
    // データの送信に成功したときの処理をここに書く
        console.log(g);
    })
    .catch(function (error) {
    // データの送信に失敗したときの処理をここに書く
        console.log(e);
    });

    console.log(`
    ${url} に以下のデータを送ります
    ${title}
    ${body}
    ${base64}
    `);

});