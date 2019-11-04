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


    //canvasの内容をbase64（文字列）にしてbase64という変数に入れておく
    const base64 = canvas.toDataURL('image/jpeg');
    
    axios.post(url, {
        title: title,
        body: body, // 送信するデータPHP側で$_POSST["body"]で受け取れる
        base64: base64 // 送信するデータPHP側で$_POSST["base64"]で受け取れる
    })
        .then(function (response) {
        // データの送信に成功したときの処理をここに書く
            console.log(response);
        })
        .catch(function (error) {
        // データの送信に失敗したときの処理をここに書く
            console.log(error);
        });

});






