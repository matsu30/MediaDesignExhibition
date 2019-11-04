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

    // 入力された文字列を取得する
    const title = input.value;
    console.log(title);

    const body = textarea.value;
    console.log(body);

});






