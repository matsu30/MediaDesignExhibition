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
    context.fillText("ねこ", 500, 500, 1000);

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
